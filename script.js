// =====================================================================
//  Розклад з Google Таблиці (опублікованої в Інтернеті)
//  Посилання задається в SHEET_URL, групу обирають на сторінці.
// =====================================================================

// Посилання на опубліковану таблицю (Файл → Поділитися → Опублікувати в Інтернеті).
// Коли вийде новий розклад — просто замініть посилання тут.
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQa-DLjav3nUZLx4XUhxeNqmmHilX_FGV2_qTEetS4XryhlcNyrIgha_kjESlClKoVcqA9B88c8ZEek/pubhtml';
const DEFAULT_GROUP = 'ІР-31'; // група, яка відкривається за замовчуванням

// ---------------------------------------------------------------------
//  ПАРСЕР ТАБЛИЦІ
// ---------------------------------------------------------------------
const SheetSchedule = (() => {
    const DAYS = [["понеділ", 1], ["вівтор", 2], ["серед", 3], ["четвер", 4], ["п'ятниц", 5], ["пятниц", 5], ["субот", 6], ["неділ", 0]];
    const LAT = { A: 'А', B: 'В', C: 'С', E: 'Е', H: 'Н', I: 'І', K: 'К', M: 'М', O: 'О', P: 'Р', T: 'Т', X: 'Х', Y: 'У' };
    const TYPE_RE = /\(\s*(лек|лаб|сем|пр|л|с)\.?\s*\)/gi;
    const TEACHER_RE = /(?:(?:[Пп]роф|[Дд]оц|[Сс]т\.\s*викл|[Вв]икл|[Аа]сист?)\.?\s*)?[А-ЯІЇЄҐ][а-яіїєґ'’ʼ\-]+\s+(?:[А-ЯІЇЄҐ]\.\s*[А-ЯІЇЄҐ]\.|[А-ЯІЇЄҐ][а-яіїєґ'’ʼ]+\s+[А-ЯІЇЄҐ][а-яіїєґ'’ʼ]+(?:ович|евич|йович|івна|ївна|овна|евна|ич)(?![а-яіїєґ]))/;
    const ROOM_RE = /^(?:ауд\.?\s*)?\d{1,4}[а-яa-z]?(?:\s*[\/,]\s*\d{1,4}[а-яa-z]?)*$/i;
    const RANGE_RE = /(\d{1,2})[.,](\d{1,2})\.?\s*[-–—]\s*(\d{1,2})[.,](\d{1,2})\.?/g;
    const SINGLE_RE = /(\d{1,2})[.,](\d{1,2})(?!\d)\.?/g;

    const pad = n => String(n).padStart(2, '0');
    const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
    const fmt = d => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;

    const norm = s => s.toUpperCase()
        .replace(/[ABCEHIKMOPTXY]/g, ch => LAT[ch])
        .replace(/ПІДГРУПА|ГРУПА/g, '')
        .replace(/[^0-9А-ЯІЇЄҐ]/g, '');

    function dayOf(text) {
        const t = (text || '').toLowerCase().replace(/[’ʼ`]/g, "'").trim();
        for (const [k, v] of DAYS) if (t.startsWith(k)) return v;
        return null;
    }
    function timeOf(text) {
        const m = (text || '').match(/(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})/);
        return m ? `${pad(m[1])}:${m[2]}-${pad(m[3])}:${m[4]}` : null;
    }
    function cleanLink(href) {
        try {
            const u = new URL(href, 'https://docs.google.com');
            if (/google\./.test(u.hostname) && u.pathname === '/url' && u.searchParams.get('q')) return u.searchParams.get('q');
            return u.href;
        } catch (e) { return href; }
    }

    // ---- завантаження -------------------------------------------------
    function baseOf(url) {
        const m = (url || '').match(/spreadsheets\/d\/e\/([\w-]+)/);
        if (!m) throw new Error('Потрібне посилання на опубліковану таблицю (вигляду https://docs.google.com/spreadsheets/d/e/…/pubhtml)');
        return 'https://docs.google.com/spreadsheets/d/e/' + m[1];
    }
    async function get(url) {
        const r = await fetch(url, { cache: 'no-store' });
        if (!r.ok) throw new Error(`Не вдалося завантажити таблицю (HTTP ${r.status})`);
        return r.text();
    }
    const parseHtml = t => new DOMParser().parseFromString(t, 'text/html');
    const unesc = s => s
        .replace(/\\x([0-9a-f]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
        .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
        .replace(/\\(.)/g, '$1');

    function tabsOf(html) {
        const out = [], re = /items\.push\(\{name:\s*"((?:[^"\\]|\\.)*)",\s*pageUrl:\s*"(?:[^"\\]|\\.)*",\s*gid:\s*"(\d+)"/g;
        let m; while ((m = re.exec(html))) out.push({ name: unesc(m[1]), gid: m[2] });
        return out;
    }

    // Таблиця -> сітка, де об'єднані клітинки посилаються на один об'єкт
    function gridOf(doc) {
        doc.querySelectorAll('br').forEach(b => b.replaceWith('\n'));
        const table = doc.querySelector('table');
        if (!table) return [];
        const grid = [];
        [...table.rows].forEach((tr, r) => {
            grid[r] = grid[r] || [];
            let c = 0;
            for (const td of tr.cells) {
                while (grid[r][c]) c++;
                const cell = {
                    r, c, rs: td.rowSpan || 1, cs: td.colSpan || 1,
                    text: td.textContent.replace(/[ \t ]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim(),
                    links: [...td.querySelectorAll('a[href]')].map(a => cleanLink(a.getAttribute('href')))
                };
                for (let i = 0; i < cell.rs; i++) for (let j = 0; j < cell.cs; j++) (grid[r + i] = grid[r + i] || [])[c + j] = cell;
                c += cell.cs;
            }
        });
        return grid;
    }
    const originsInRow = (row, r) => (row || []).filter((x, c) => x && x.r === r && x.c === c);

    // ---- календар ------------------------------------------------------
    function toDate(d, m, year) {
        d = +d; m = +m;
        if (!(d >= 1 && d <= 31 && m >= 1 && m <= 12)) return null;
        return new Date(m >= 8 ? year : year + 1, m - 1, d);
    }
    function calendarOf(grid, year) {
        const weeks = [];
        grid.forEach((row, r) => {
            const cells = originsInRow(row, r);
            const dates = cells.map(c => c.text).filter(t => /^\d{1,2}\.\d{1,2}$/.test(t));
            if (dates.length >= 5) {
                const [d, m] = dates[0].split('.');
                const label = cells.map(c => c.text).join(' ').toLowerCase();
                weeks.push({ monday: toDate(d, m, year), session: /сесі|перескл|канікул/.test(label) });
            }
        });
        return weeks;
    }

    // ---- пошук групи ---------------------------------------------------
    function findGroup(grid, T) {
        for (let r = 0; r < Math.min(grid.length, 15); r++) {
            for (const x of originsInRow(grid[r], r)) {
                const n = norm(x.text);
                if (n === T || (n.startsWith(T) && !/\d/.test(n[T.length]))) return x;
            }
        }
        return null;
    }
    function headerCol(grid, maxRow, beforeCol, word) {
        let best = -1;
        for (let r = 0; r <= maxRow && r < grid.length; r++)
            for (const x of originsInRow(grid[r], r))
                if (x.text.trim().toLowerCase() === word && x.c < beforeCol && x.c > best) best = x.c;
        return best;
    }

    // ---- витягування пар з колонок групи ------------------------------
    const isTitle = t => /\(\s*(лек|лаб|сем|пр|л|с)\.?\s*\)/i.test(t);
    const hasDates = t => /\d{1,2}[.,]\d{1,2}/.test(t) && !/\d{1,2}:\d{2}/.test(t);
    const isLinkText = t => /https?:\/\/|teams\.|meet\.google|zoom\.us/i.test(t);

    function extract(grid, g) {
        const c0 = g.c, c1 = g.c + g.cs - 1, headEnd = g.r + g.rs - 1;
        // підгрупи
        let subs = [];
        for (let r = headEnd + 1; r <= headEnd + 3 && r < grid.length; r++)
            for (const x of originsInRow(grid[r], r))
                if (x.c >= c0 && x.c <= c1) {
                    // «підгрупа 1», «підгрупа КН-11/2», «2 підгрупа»
                    if (/підгруп/i.test(x.text)) {
                        const m = x.text.match(/підгрупа\s*(\d)\b/i) || x.text.match(/[\/\\](\d)\s*$/) || x.text.match(/(\d)\s*підгруп/i);
                        if (m) subs.push({ n: +m[1], a: x.c, b: x.c + x.cs - 1 });
                    }
                }
        if (subs.length < 2) subs = [];

        const dayCol = headerCol(grid, headEnd + 3, c0, 'день');
        const timeCol = headerCol(grid, headEnd + 3, c0, 'час');
        if (dayCol < 0 || timeCol < 0) return [];

        const lessons = [];
        let blockKey = null, cur = {}, last = null, free = false, pendingName = {};
        for (let r = headEnd + 1; r < grid.length; r++) {
            const row = grid[r]; if (!row) continue;
            const dc = row[dayCol], tc = row[timeCol];
            const day = dc ? dayOf(dc.text) : null, time = tc ? timeOf(tc.text) : null;
            if (day === null || !time) continue;
            if (blockKey !== dc.r + ':' + tc.r) { blockKey = dc.r + ':' + tc.r; cur = {}; last = null; free = false; pendingName = {}; }

            for (let c = c0; c <= c1; c++) {
                const x = row[c];
                if (!x || x.r !== r || x.c !== c || !x.text && !x.links.length) continue;
                if (/вільний день/i.test(x.text)) { free = true; continue; }
                if (free) continue;
                let sub = 0;
                if (subs.length) {
                    const hit = subs.filter(s => x.c <= s.b && x.c + x.cs - 1 >= s.a);
                    sub = hit.length === 1 ? hit[0].n : 0;
                }
                // Пріоритет посилань: 0 — рядок-посилання, 1 — рядок з короткою назвою,
                // 2 — сама назва пари, 3 — клітинка з викладачем (там часто випадкові посилання)
                if (isTitle(x.text)) {
                    const L = {
                        day, time, sub, title: x.text, extra: [], teacher: '', room: '', row: r,
                        links: x.links.map(u => [2, u]),
                        before: pendingName[sub] || pendingName[0] || (cur[sub] && cur[sub].subject) || ''
                    };
                    lessons.push(L); cur[sub] = L; last = L;
                    continue;
                }
                const t = x.text;
                const L = cur[sub] || cur[0] || last;
                if (!L) {
                    // назва предмета може стояти окремою клітинкою над «(Л) …»
                    if (t && !hasDates(t) && !ROOM_RE.test(t) && !isLinkText(t) && !TEACHER_RE.test(t)) pendingName[sub] = t;
                    continue;
                }
                if (ROOM_RE.test(t)) { if (!L.room.split(', ').includes(t)) L.room = L.room ? L.room + ', ' + t : t; continue; }
                if (isLinkText(t)) {
                    L.links.push(...x.links.map(u => [0, u]));
                    const u = t.match(/https?:\/\/\S+/); if (u) L.links.push([0, u[0]]);
                    continue;
                }
                const tm = t.match(TEACHER_RE);
                if (tm && !L.teacher) L.teacher = tm[0];
                L.links.push(...x.links.map(u => [tm ? 3 : 1, u]));
                if (hasDates(t)) { const e = t.replace(TEACHER_RE, '').trim(); if (!L.extra.includes(e)) L.extra.push(e); }
            }
        }
        return lessons;
    }

    // ---- розбір дат ----------------------------------------------------
    function parseDates(body, weekday, year) {
        let s = ' ' + body.replace(TEACHER_RE, ' ').replace(/https?:\/\/\S+/g, ' ') + ' ';
        const out = [];
        let hasRange = false;
        s = s.replace(RANGE_RE, (_, d1, m1, d2, m2) => {
            const a = toDate(d1, m1, year), b = toDate(d2, m2, year);
            if (a && b) {
                hasRange = true;
                let d = new Date(a);
                while (d.getDay() !== weekday && d <= b) d = addDays(d, 1);
                for (; d <= b; d = addDays(d, 7)) out.push(new Date(d));
            }
            return ' ';
        });
        const singles = [];
        s.replace(SINGLE_RE, (_, d, m) => { const x = toDate(d, m, year); if (x) singles.push(x); return ' '; });
        const bracket = hasRange || /\[[^\]]*\d{1,2}[.,]\d{1,2}/.test(body);
        return { bracket, dates: bracket ? out.concat(singles) : [], extras: bracket ? [] : singles, any: out.length + singles.length > 0 };
    }
    const typeName = t => ({ л: 'Л', лек: 'Л', пр: 'Пр', лаб: 'лаб', с: 'С', сем: 'С' })[t.toLowerCase()] || t;
    const countOf = s => { const m = s.match(/(\d+)\s*т(?![а-яіїєґa-z])/i); return m ? +m[1] : null; };

    function finalize(L, ctx) {
        const text = [L.title, ...L.extra].join(' ').replace(/\s+/g, ' ');
        if (!L.teacher) { const m = text.match(TEACHER_RE); if (m) L.teacher = m[0]; }
        const marks = [...text.matchAll(TYPE_RE)];
        const name = text.slice(0, marks[0].index).trim().replace(/[,;:\s]+$/, '') || L.before || '(без назви)';
        let segs = marks.map((m, i) => ({
            type: typeName(m[1]),
            body: text.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : text.length)
        }));
        segs.forEach(s => s.p = parseDates(s.body, L.day, ctx.year));
        if (segs.length > 1 && segs.some(s => !s.p.any)) {
            const body = segs.map(s => s.body).join(' ');
            segs = [{ type: [...new Set(segs.map(s => s.type))].join('/'), body, p: parseDates(body, L.day, ctx.year) }];
        }

        return segs.map(sg => {
            const counts = [...sg.body.matchAll(/(\d+)\s*т(?![а-яіїєґa-z])/gi)].map(m => +m[1]);
            const count = counts.length ? counts.reduce((a, b) => a + b, 0) : null;
            let dates = [], approx = false, warn = '';
            if (ctx.weekDate) {
                dates = sg.p.any ? sg.p.dates.concat(sg.p.extras) : [addDays(ctx.weekDate, (L.day + 6) % 7)];
            } else if (sg.p.bracket) {
                dates = sg.p.dates;
                const n = new Set(dates.map(iso)).size;
                if (count && count !== n && segs.length === 1 && L.extra.length) {
                    // дати можуть дублюватись в сусідніх клітинках — шукаємо варіант, що збігається з кількістю тижнів
                    const tm = [...L.title.matchAll(TYPE_RE)].pop();
                    const own = tm ? L.title.slice(tm.index + tm[0].length) : L.title;
                    const variants = [own, ...L.extra, ...L.extra.map(e => own + ' ' + e)];
                    for (const v of variants) {
                        const p = parseDates(v, L.day, ctx.year);
                        if (p.bracket && new Set(p.dates.map(iso)).size === count) { dates = p.dates; break; }
                    }
                }
                const n2 = new Set(dates.map(iso)).size;
                if (count && count !== n2) warn = `у таблиці ${count}т, а дат знайдено ${n2}`;
            } else if (count && ctx.regStart) {
                let d = addDays(ctx.regStart, (L.day + 6) % 7);
                for (let i = 0; i < count; i++, d = addDays(d, 7)) dates.push(new Date(d));
                dates = dates.concat(sg.p.extras);
                approx = true;
                warn = `дат у таблиці немає — пораховано ${count} тижнів від ${fmt(ctx.regStart)}`;
                if (ctx.teachEnd && dates.some(x => x > ctx.teachEnd)) warn += ' (виходить за межі семестру!)';
            } else if (sg.p.extras.length) {
                dates = sg.p.extras;
            } else {
                warn = 'дати в таблиці не вказані';
            }
            const ds = [...new Set(dates.map(iso))].sort();
            const links = [...new Set(L.links.filter(l => l[1]).sort((a, b) => a[0] - b[0]).map(l => l[1]))];
            return {
                day: L.day, time: L.time, sub: L.sub,
                name: `${name} (${sg.type})`,
                subject: name, type: sg.type,
                teacher: L.teacher, room: L.room,
                info: [count ? count + 'т' : '', L.teacher, L.room ? 'ауд. ' + L.room : ''].filter(Boolean).join(' · '),
                link: links[0] || '', links,
                dates: ds, approx, warn,
                raw: text, sheet: ctx.sheet
            };
        });
    }

    function mergeEntries(list) {
        const map = new Map();
        for (const e of list) {
            const k = [e.day, e.name, e.time, e.sub].join('|');
            const m = map.get(k);
            if (!m) { map.set(k, { ...e }); continue; }
            m.dates = [...new Set(m.dates.concat(e.dates))].sort();
            m.approx = m.approx || e.approx;
            m.warn = [m.warn, e.warn].filter(Boolean).join('; ');
            if (!m.link) m.link = e.link;
            if (!m.teacher) { m.teacher = e.teacher; m.info = e.info; }
        }
        return [...map.values()].filter(e => e.dates.length || e.warn);
    }

    // ---- головна функція -----------------------------------------------
    // Відкриває таблицю: список аркушів + календар. Самі аркуші вантажаться лише коли потрібні.
    async function open(url, onProgress) {
        const base = baseOf(url);
        const mainHtml = await get(base + '/pubhtml');
        const ym = mainHtml.match(/(20\d\d)\s*[-–—]\s*20\d\d/);
        const now = new Date();
        const year = ym ? +ym[1] : (now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1);
        let tabs = tabsOf(mainHtml);
        if (!tabs.length) tabs = [{ name: '', gid: (url.match(/gid=(\d+)/) || [])[1] || '0' }];
        const wb = { base, tabs, year, cache: new Map(), loaded: 0, onProgress };
        wb.calIdx = tabs.findIndex(t => /календар/i.test(t.name));
        wb.weeks = wb.calIdx >= 0 ? calendarOf(await sheet(wb, wb.calIdx), year) : [];
        return wb;
    }

    // Один аркуш (з кешем — кожен аркуш вантажиться лише раз)
    function sheet(wb, i) {
        if (!wb.cache.has(i)) {
            const url = `${wb.base}/pubhtml/sheet?headers=false&gid=${wb.tabs[i].gid}`;
            wb.cache.set(i, get(url).then(h => gridOf(parseHtml(h))).catch(() => [])
                .then(g => { wb.loaded++; if (wb.onProgress) wb.onProgress(wb.loaded, wb.tabs.length); return g; }));
        }
        return wb.cache.get(i);
    }
    const sheetIdx = wb => wb.tabs.map((t, i) => i).filter(i => i !== wb.calIdx);

    // Аркуші, де ймовірно є група: за назвою спеціальності в назві аркуша («ВЕБ, ІР, ІРма») + «робочі суботи»
    function relevantIdx(wb, group) {
        const spec = norm(group.split('-')[0] || group).replace(/\d+$/, '');
        const hit = sheetIdx(wb).filter(i => {
            const name = wb.tabs[i].name;
            if (/субот/i.test(name)) return true;
            return name.split(/[,;\/\s]+/).some(tok => tok && norm(tok) === spec);
        });
        return hit.some(i => !/субот/i.test(wb.tabs[i].name)) ? hit : sheetIdx(wb);
    }

    // Список усіх груп, що є в таблиці: «група ІР-31», «група ІПЗ-44+фмб» → ІР-31, ІПЗ-44
    async function groups(wb) {
        const idx = sheetIdx(wb).filter(i => !/^\s*\d+\s*тиж/i.test(wb.tabs[i].name));  // тижневі аркуші дублюють основні
        const grids = await Promise.all(idx.map(i => sheet(wb, i)));
        const map = new Map();
        for (const grid of grids)
            for (let r = 0; r < Math.min(grid.length, 15); r++)
                for (const x of originsInRow(grid[r], r)) {
                    if (/підгруп/i.test(x.text)) continue;
                    const m = x.text.match(/група\s*([A-Za-zА-Яа-яІіЇїЄєҐґ]{1,6}\d?\s*-\s*\d{2}|[A-Za-zА-Яа-яІіЇїЄєҐґ]{1,6}\s*\d{2})(?!\d)/i);
                    if (!m) continue;
                    const code = m[1].replace(/\s+/g, '').replace(/^([^-]*?)(\d{2})$/, '$1-$2');
                    const k = norm(code);
                    if (!map.has(k)) map.set(k, code);
                }
        return [...map.values()].sort((a, b) => a.localeCompare(b, 'uk', { numeric: true }));
    }

    // Розклад однієї групи
    async function schedule(wb, group) {
        const T = norm(group);
        if (!T) throw new Error('Оберіть групу');
        const collect = async idx => {
            const grids = await Promise.all(idx.map(i => sheet(wb, i)));
            const found = [];
            idx.forEach((i, k) => { const g = findGroup(grids[k], T); if (g) found.push({ tab: wb.tabs[i], grid: grids[k], g }); });
            return found;
        };
        let found = await collect(relevantIdx(wb, group));
        if (!found.some(f => !/субот/i.test(f.tab.name))) found = await collect(sheetIdx(wb));   // запасний варіант: шукаємо всюди
        if (!found.length) throw new Error(`Групу «${group}» не знайдено в таблиці`);

        const { weeks, year } = wb;
        const teaching = weeks.filter(w => !w.session);
        const weekNo = t => +((t.name.match(/^\s*(\d+)\s*тиж/i) || [])[1] || 0);
        const maxWeek = Math.max(0, ...found.map(f => weekNo(f.tab)));
        const regStart = teaching[maxWeek] ? teaching[maxWeek].monday : null;
        const teachEnd = teaching.length ? addDays(teaching[teaching.length - 1].monday, 6) : null;

        const entries = [];
        for (const f of found) {
            const n = weekNo(f.tab);
            const ctx = { year, sheet: f.tab.name, regStart, teachEnd, weekDate: n && weeks[n - 1] ? weeks[n - 1].monday : null };
            for (const L of extract(f.grid, f.g)) entries.push(...finalize(L, ctx));
        }
        const firstSession = weeks.find(w => w.session);
        return {
            entries: mergeEntries(entries),
            meta: {
                group, year, sheets: found.map(f => f.tab.name),
                regStart: regStart && iso(regStart),
                teachEnd: teachEnd && iso(teachEnd),
                sessionStart: firstSession ? iso(firstSession.monday) : null,
                loadedAt: new Date().toISOString()
            }
        };
    }

    async function load(url, group) { return schedule(await open(url), group); }

    return { open, groups, schedule, load, iso };
})();

// ---------------------------------------------------------------------
//  ІНТЕРФЕЙС
// ---------------------------------------------------------------------
let scheduleData = [];
let scheduleMeta = null;
let workbook = null;          // завантажена таблиця (щоб перемикати групи без повторного завантаження)
let currentView = 'day';
const isoLocal = SheetSchedule.iso;

const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
};
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Якщо в HTML немає вибору групи — додаємо його самі
function ensureControls() {
    if ($('group-select')) return;
    const box = document.querySelector('.controls') || $('content-area').parentNode;
    const row = document.createElement('div');
    row.className = 'group-row';
    row.innerHTML = `
        <select id="group-select" class="text-input"><option value="">Завантаження груп…</option></select>
        <button id="reload-btn" class="load-btn" type="button" title="Оновити розклад з таблиці">⟳</button>`;
    box.insertBefore(row, box.firstChild);
}

function setStatus(text, isError) {
    const el = $('current-info-display');
    if (el) { el.textContent = text; el.style.color = isError ? '#e06c75' : ''; }
}

function currentGroup() {
    const sel = $('group-select');
    return (sel && sel.value) || LS.get('groupName', DEFAULT_GROUP);
}

// Заповнюємо список груп, розбиваючи за спеціальностями (ІР, ВЕБ, КБ…)
function fillGroups(list) {
    const sel = $('group-select');
    const want = sel.value || LS.get('groupName', DEFAULT_GROUP);
    const bySpec = {};
    for (const g of list) (bySpec[g.split('-')[0]] = bySpec[g.split('-')[0]] || []).push(g);
    sel.innerHTML = Object.keys(bySpec).sort((a, b) => a.localeCompare(b, 'uk')).map(spec =>
        `<optgroup label="${esc(spec)}">${bySpec[spec].map(g => `<option value="${esc(g)}">${esc(g)}</option>`).join('')}</optgroup>`
    ).join('');
    const norm = s => s.toUpperCase().replace(/[^0-9А-ЯІЇЄҐA-Z]/g, '');
    const match = list.find(g => norm(g) === norm(want)) || list.find(g => norm(g) === norm(DEFAULT_GROUP)) || list[0];
    if (match) sel.value = match;
}

function applyGroupUI() {
    const g = scheduleMeta ? scheduleMeta.group : currentGroup();
    const h = document.querySelector('.header h2');
    if (h && g) h.textContent = 'Розклад групи ' + g;
    if (g) document.title = 'Розклад ' + g;

    // підгрупи показуємо тільки якщо вони є в цієї групи
    const sel = $('subgroup-select');
    if (!sel) return;
    const subs = [...new Set(scheduleData.map(l => l.sub).filter(s => s > 0))].sort();
    const saved = LS.get('subgroup', '0');
    sel.innerHTML = '<option value="0">Усі підгрупи</option>' + subs.map(s => `<option value="${s}">${s} підгрупа</option>`).join('');
    sel.value = subs.includes(+saved) ? saved : '0';
    sel.style.display = subs.length ? 'block' : 'none';
}

function showMeta() {
    if (!scheduleMeta) return;
    const t = new Date(scheduleMeta.loadedAt);
    const approx = scheduleData.filter(e => e.approx).length;
    setStatus(`Оновлено ${t.toLocaleString('uk-UA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}` +
        (approx ? ` · ⚠ у ${approx} пар дати орієнтовні` : ''));
}

// Показати розклад обраної групи
let showToken = 0;
async function showGroup(group) {
    LS.set('groupName', group);
    const my = ++showToken;
    try {
        const { entries, meta } = await SheetSchedule.schedule(workbook, group);
        if (my !== showToken) return;               // користувач уже обрав іншу групу
        scheduleData = entries.filter(e => e.dates.length);
        scheduleMeta = meta;
        LS.set('scheduleCache', JSON.stringify({ entries: scheduleData, meta }));
        applyGroupUI(); showMeta(); refreshView();
    } catch (e) {
        if (my === showToken) setStatus('Помилка: ' + e.message, true);
    }
}

// Завантажити таблицю з Google (при відкритті сторінки та кнопкою ⟳)
async function loadWorkbook() {
    const btn = $('reload-btn');
    if (btn) btn.disabled = true;
    setStatus('Завантажую розклад з таблиці…');
    try {
        workbook = await SheetSchedule.open(SHEET_URL, (n, total) => {
            if (!scheduleMeta || btn.disabled) setStatus(`Завантажую розклад з таблиці… (${n} з ${total})`);
        });
        await showGroup(currentGroup());            // спершу — розклад обраної групи (лише потрібні аркуші)
        if (btn) btn.disabled = false;
        const list = await SheetSchedule.groups(workbook);   // потім у фоні — повний список груп
        LS.set('groupsCache', JSON.stringify(list));
        fillGroups(list);
        showMeta();
    } catch (e) {
        setStatus('Не вдалося завантажити таблицю: ' + e.message + (scheduleData.length ? ' — показано збережену версію' : ''), true);
    } finally {
        if (btn) btn.disabled = false;
    }
}

function onGroupChange() {
    const g = $('group-select').value;
    LS.set('groupName', g);
    if (workbook) showGroup(g);
    else loadWorkbook();
}

function setView(view) {
    currentView = view;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tab = $('tab-' + view);
    if (tab) tab.classList.add('active');
    refreshView();
}

function selectedDate() {
    const v = $('date-picker').value;
    return v ? new Date(v + 'T00:00:00') : new Date();   // локальна дата, без зсуву UTC
}

function refreshView() {
    const sel = $('subgroup-select');
    const sub = sel ? parseInt(sel.value) || 0 : 0;
    if (sel) LS.set('subgroup', String(sub));
    const date = selectedDate();
    if (currentView === 'day') renderDay(date, sub);
    else if (currentView === 'week') renderWeek(date, sub);
    else renderFull(sub);
}

// sub = 0 — показати всі пари; інакше — спільні + обрана підгрупа
function filterLessons(iso, subGroup) {
    const seen = new Set();
    return scheduleData
        .filter(l => (subGroup === 0 || l.sub === 0 || l.sub === subGroup) && l.dates.includes(iso))
        .sort((a, b) => a.time.localeCompare(b.time) || a.sub - b.sub || (a.approx - b.approx))
        .filter(l => {   // одна й та сама пара може бути і в основному аркуші, і в «робочих суботах»
            const k = l.time + '|' + l.sub + '|' + l.name.toLowerCase();
            if (seen.has(k)) return false;
            seen.add(k); return true;
        });
}

function createCard(l) {
    const subLabel = l.sub ? `<span class="sub-badge">${l.sub} підгрупа</span>` : '';
    const warn = l.approx || l.warn
        ? `<div class="lesson-warn" title="${esc(l.raw)}">⚠ ${esc(l.warn || 'дати орієнтовні')}</div>` : '';
    return `<div class="lesson-card${l.approx ? ' approx' : ''}">
        <div class="lesson-time">${esc(l.time)} ${subLabel}</div>
        <div class="name">${esc(l.name)}</div>
        <div class="lesson-details">${esc(l.info)}</div>
        ${l.link ? `<a href="${esc(l.link)}" class="lesson-link" target="_blank" rel="noopener">Посилання</a>` : ''}
        ${warn}
    </div>`;
}

function emptyText(iso) {
    if (!scheduleData.length) return 'Розклад ще завантажується…';
    if (scheduleMeta && scheduleMeta.sessionStart && iso >= scheduleMeta.sessionStart) return 'Пар немає — сесія';
    return 'Пар немає';
}

function renderDay(date, sub) {
    const iso = isoLocal(date);
    const lessons = filterLessons(iso, sub);
    let html = `<h3>${date.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>`;
    html += lessons.length ? lessons.map(createCard).join('') : `<p class="empty">${emptyText(iso)}</p>`;
    $('content-area').innerHTML = html;
}

function renderWeek(date, sub) {
    let html = '';
    const d = new Date(date);
    d.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
    for (let i = 0; i < 6; i++) {
        const iso = isoLocal(d);
        const lessons = filterLessons(iso, sub);
        html += `<h4>${d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>`;
        html += lessons.length ? lessons.map(createCard).join('') : '<p class="empty">Вільно</p>';
        d.setDate(d.getDate() + 1);
    }
    $('content-area').innerHTML = html;
}

function renderFull(sub) {
    const all = scheduleData.flatMap(l => l.dates).sort();
    if (!all.length) { $('content-area').innerHTML = `<p class="empty">${emptyText('')}</p>`; return; }
    let html = '';
    let d = new Date(all[0] + 'T00:00:00');
    const end = new Date(all[all.length - 1] + 'T00:00:00');
    let month = -1;
    for (; d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getMonth() !== month) {
            month = d.getMonth();
            html += `<h3>${d.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' })}</h3>`;
        }
        const lessons = filterLessons(isoLocal(d), sub);
        if (!lessons.length) continue;
        html += `<h4>${d.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short' })}</h4>`;
        html += lessons.map(l => `<div class="lesson-details">• ${esc(l.time)} — ${esc(l.name)}${l.sub ? ` [${l.sub} підгр.]` : ''}${l.approx ? ' ⚠' : ''}</div>`).join('');
    }
    $('content-area').innerHTML = html;
}

window.onload = () => {
    ensureControls();
    $('date-picker').value = isoLocal(new Date());
    $('group-select').onchange = onGroupChange;
    $('reload-btn').onclick = loadWorkbook;

    // спершу показуємо збережену копію (працює й без інтернету), потім оновлюємо з таблиці
    try {
        const list = JSON.parse(LS.get('groupsCache', 'null'));
        // поки повний список не завантажився — показуємо хоча б поточну групу
        fillGroups(list && list.length ? list : [LS.get('groupName', DEFAULT_GROUP)]);
        const c = JSON.parse(LS.get('scheduleCache', 'null'));
        if (c && c.entries && c.meta) { scheduleData = c.entries; scheduleMeta = c.meta; showMeta(); }
    } catch (e) { }
    applyGroupUI();
    setView('day');
    loadWorkbook();
};
