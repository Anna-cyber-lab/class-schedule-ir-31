// Повна база даних розкладу ІР-31 (2026-2027 рік)
const scheduleData = [
    // ПОНЕДІЛОК (day: 1)
    
    // --- 09:00-10:20 ---
    {
        day: 1,
        time: "09:00-10:20",
        name: "Теорія систем та системний аналіз (Л)",
        info: "(2т Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474514487&usg=AOvVaw0EMiLLSbrKeTt9nm5TYksU", 
        dates: [ "2026-10-19"],// і субота 17.10
        sub: 0
    },
    {
        day: 1,
        time: "09:00-10:20",
        name: "Теорія автоматичного управління (Л)",
        info: "4т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474518604&usg=AOvVaw3MRELZSI9I9CRBHvE0Az5k", 
        dates: ["2026-10-26", "2026-11-02", "2026-11-09", "2026-11-16"],
        sub: 0
    },
    {
        day: 1,
        time: "09:00-10:20",
        name: "Технологія створення програмних продуктів (Л)",
        info: "4т (доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474516159&usg=AOvVaw2AUvKP-rxdefXwIVTv1AFm", // Технології створення ПП
        dates: ["2026-09-21", "2026-09-28", "2026-10-05", "2026-10-12"],
        sub: 0
    },

    // --- 10:30-11:50 ---
    {
        day: 1,
        time: "10:30-11:50",
        name: "Філософія (Л)",
        info: "6т Савинська І.В.",
        link: "https://www.google.com/url?q=https://meet.google.com/jba-ugce-ysm?pli%3D1&sa=D&source=editors&ust=1789416474517122&usg=AOvVaw3vHJB7eyAXWebg_wzOacFZ",
        dates: ["2026-09-14", "2026-09-21", "2026-09-28", "2026-10-05", "2026-10-12", "2026-10-19"],
        sub: 0
    },
    {
        day: 1,
        time: "10:30-11:50",
        name: "Теорія автоматичного управління (Л)",
        info: "5т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474518604&usg=AOvVaw3MRELZSI9I9CRBHvE0Az5k", // ТАУ
        dates: ["2026-10-26", "2026-11-02", "2026-11-09", "2026-11-16"],// і субота  "2026-10-07"

        sub: 0
    },

    // --- 12:10-13:30 ---
    {
        day: 1,
        time: "12:10-13:30",
        name: "Кібернетична безпека підприємства (Л)",
        info: "4т (доц. Борисенко І.І.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/meet/324553793992041?p%3DWuRiPSEJsfqwU6ZB1i&sa=D&source=editors&ust=1789416474519697&usg=AOvVaw37fsDCFh7E_nDfgmJ-9AlH", // teams.microsoft
        dates: ["2026-09-04", "2026-09-21", "2026-09-28"],// і субота  "2026-10-17"
        sub: 0
    },
    {
        day: 1,
        time: "12:10-13:30",
        name: "Теорія систем та системний аналіз (Л)",
        info: "7т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474520829&usg=AOvVaw0jctevIvnMxeUv8ttIOa5_", // teams.microsoft.com
        dates: [
            "2026-10-05", 
            "2026-10-12", 
            "2026-10-19", 
            "2026-10-26", 
            "2026-11-02", 
            "2026-11-09", 
            "2026-11-16"
        ],
        sub: 0
    },
    // ВІВТОРОК (day: 2)

    // --- 09:00-10:20 ---
    {
        day: 2,
        time: "09:00-10:20",
        name: "Проектування інформаційних систем (Л)",
        info: "3т (доц. Гладка М.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253ATPmD9-2x-ev7X6k4sklG9ZO_Alne3sxs3dGitxd0S5E1%2540thread.tacv2/conversations?groupId%3D86c17497-45dd-404c-8d9d-1334a0867295%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474531338&usg=AOvVaw3F3HMjS8uZp8eKEpdijGoW", // Проектування інформаційних систем
        dates: ["2026-09-15", "2026-09-22", "2026-09-29"],
        sub: 0
    },
    {
        day: 2,
        time: "09:00-10:20",
        name: "Теорія систем та системний аналіз (Пр)",
        info: "8т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474532969&usg=AOvVaw3wrklBY4H-jauu2ZOAvQDY", // teams.microsoft.com
        dates: [
            "2026-10-06", 
            "2026-10-13", 
            "2026-10-20", 
            "2026-10-27", 
            "2026-11-03", 
            "2026-11-10", 
            "2026-11-17"
        ], // і субота 24.10 (2026-10-24)
        sub: 0
    },

    // --- 10:30-11:50 ---
    {
        day: 2,
        time: "10:30-11:50",
        name: "Проектування інформаційних систем (Л)",
        info: "(доц. Гладка М.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253ATPmD9-2x-ev7X6k4sklG9ZO_Alne3sxs3dGitxd0S5E1%2540thread.tacv2/conversations?groupId%3D86c17497-45dd-404c-8d9d-1334a0867295%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474534398&usg=AOvVaw3F3vrE1FKgcCPMKmyBVobU", // Проектування інформаційних систем
        dates: ["2026-09-15", "2026-09-22", "2026-09-29"],
        sub: 0
    },
    {
        day: 2,
        time: "10:30-11:50",
        name: "Теорія автоматичного управління (лаб)",
        info: "8т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474536054&usg=AOvVaw1qVoL5WVTI1EbAi64Ke15V", // ТАУ
        dates: [
            "2026-10-06", 
            "2026-10-13", 
            "2026-10-20", 
            "2026-10-27", 
            "2026-11-03", 
            "2026-11-10", 
            "2026-11-17"
        ], // і субота 24.10 (2026-10-24)
        sub: 0
    },

    // --- 12:10-13:30 ---
    {
        day: 2,
        time: "12:10-13:30",
        name: "Системи банківської безпеки (Л)",
        info: "(проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474537763&usg=AOvVaw00HtEs9BH8fD41MVPmmzK_", // СББ
        dates: ["2026-09-15", "2026-09-22"], // і субота 19.09 (2026-09-19)
        sub: 0
    },
    {
        day: 2,
        time: "12:10-13:30",
        name: "Системи банківської безпеки (лаб)",
        info: "8т (проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474537763&usg=AOvVaw00HtEs9BH8fD41MVPmmzK_", // СББ
        dates: [
            "2026-09-29", 
            "2026-10-06", 
            "2026-10-13", 
            "2026-10-20", 
            "2026-10-27", 
            "2026-11-03", 
            "2026-11-10", 
            "2026-11-17"
        ],
        sub: 0
    },

    // --- 13:40-15:00 ---
    {
        day: 2,
        time: "13:40-15:00",
        name: "Системи банківської безпеки (Л)",
        info: "3т (проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474541445&usg=AOvVaw2Ye94h4r1OnoA-cDF7ZmiH", // СББ
        dates: ["2026-09-15", "2026-09-22"], // і субота 19.09 (2026-09-19)
        sub: 0
    },
    {
        day: 2,
        time: "13:40-15:00",
        name: "Системи банківської безпеки (лаб)2т+ (Пр) 6т",
        info: "[29.09-17.11] (проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474541445&usg=AOvVaw2Ye94h4r1OnoA-cDF7ZmiH", // СББ
        dates: [
            "2026-09-29", 
            "2026-10-06", 
            "2026-10-13", 
            "2026-10-20", 
            "2026-10-27", 
            "2026-11-03", 
            "2026-11-10", 
            "2026-11-17"
        ],
        sub: 0
    },
    // СЕРЕДА (day: 3)

    // --- 10:30-11:50 (дві пари в різний період) ---
    {
        day: 3,
        time: "10:30-11:50",
        name: "Теорія автоматичного управління (лаб)",
        info: "8т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474558213&usg=AOvVaw2vWp4lX9UIQFyuGgL-6ILM", // ТАУ
        dates: [
            "2026-10-07", 
            "2026-10-14", 
            "2026-10-21", 
            "2026-10-28", 
            "2026-11-04", 
            "2026-11-11", 
            "2026-11-18"
        ], // і субота 31.10 (2026-10-31)
        sub: 0
    },
    {
        day: 3,
        time: "10:30-11:50",
        name: "Технологія створення програмних продуктів (лаб)",
        info: "2т (доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474559633&usg=AOvVaw2OxebUU1XtJ_OxS-ji75SA", // Технології створення ПП
        dates: ["2026-09-16", "2026-09-23"],
        sub: 0
    },

    // --- 12:10-13:30 (одна пара) ---
    {
        day: 3,
        time: "12:10-13:30",
        name: "Іноземна мова (лаб)",
        info: "10т (Красненко О.М.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AM-D3otABYH880uR3ETKK8HQuqNs3g8SROmZyHFjzkT01%2540thread.tacv2/conversations?groupId%3D5c2ea85e-43b3-403b-a148-db91a80236d6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474561803&usg=AOvVaw34c2BWLEUPjrVa-JPVsnC_", // teams.microsoft.com
        dates: [
            "2026-09-16", 
            "2026-09-23", 
            "2026-09-30", 
            "2026-10-07", 
            "2026-10-14", 
            "2026-10-21", 
            "2026-10-28", 
            "2026-11-04", 
            "2026-11-11", 
            "2026-11-18"
        ], // і суботи: 26.09 (2026-09-26), 31.10 (2026-10-31)
        sub: 0
    },

    // --- 13:40-15:00 (одна пара) ---
    {
        day: 3,
        time: "13:40-15:00",
        name: "Технологія створення програмних продуктів (Пр)",
        info: "10т (доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474563563&usg=AOvVaw0uz0YW_ea5hZWMkP3mVt7T", // Технології створення ПП
        dates: [
            "2026-09-16", 
            "2026-09-23", 
            "2026-09-30", 
            "2026-10-07", 
            "2026-10-14", 
            "2026-10-21", 
            "2026-10-28", 
            "2026-11-04", 
            "2026-11-11", 
            "2026-11-18"
        ], // і суботи: 26.09 (2026-09-26), 31.10 (2026-10-31)
        sub: 0
    },

    // --- 15:10-16:30 (одна пара) ---
    {
        day: 3,
        time: "15:10-16:30",
        name: "Технологія створення програмних продуктів (Пр)5т+ (лаб) 5т",
        info: "(доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474565585&usg=AOvVaw3Y3ds_SS4ae32S4fHGZvJc", // Технології створення ПП
        dates: [
            "2026-09-16", 
            "2026-09-23", 
            "2026-09-30", 
            "2026-10-07", 
            "2026-10-14", 
            "2026-10-21", 
            "2026-10-28", 
            "2026-11-04", 
            "2026-11-11", 
            "2026-11-18"
        ], // і суботи: 26.09 (2026-09-26), 31.10 (2026-10-31)
        sub: 0
    },
    // ЧЕТВЕР (day: 4)

    // --- 09:00-10:20 (дві пари в різний період) ---
    {
        day: 4,
        time: "09:00-10:20",
        name: "Проектування інформаційних систем (лаб)",
        info: "8т (доц. Гладка М.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253ATPmD9-2x-ev7X6k4sklG9ZO_Alne3sxs3dGitxd0S5E1%2540thread.tacv2/conversations?groupId%3D86c17497-45dd-404c-8d9d-1334a0867295%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474571697&usg=AOvVaw0nQ-KZw0Nu1nhbrD6mKGat", // Проектування інформаційних сис
        dates: [
            "2026-09-17",
            "2026-09-24",
            "2026-10-01",
            "2026-10-08",
            "2026-10-15",
            "2026-10-22",
            "2026-10-29"
        ], // і субота 3.10 (2026-10-03)
        sub: 0
    },
    {
        day: 4,
        time: "09:00-10:20",
        name: "Теорія систем та системний аналіз (Пр)",
        info: "3т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474572981&usg=AOvVaw1kXGxVxp2gccdPsNIY1BOR", // teams.microsoft.com
        dates: [
            "2026-11-05",
            "2026-11-12",
            "2026-11-19"
        ],
        sub: 0
    },

    // --- 10:30-11:50 (дві пари в різний період) ---
    {
        day: 4,
        time: "10:30-11:50",
        name: "Проектування інформаційних систем (лаб)",
        info: "8т (доц. Гладка М.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253ATPmD9-2x-ev7X6k4sklG9ZO_Alne3sxs3dGitxd0S5E1%2540thread.tacv2/conversations?groupId%3D86c17497-45dd-404c-8d9d-1334a0867295%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474574746&usg=AOvVaw2PEI17tQX6nLk4pw1c91Al", // Проектування інформаційних сис
        dates: [
            "2026-09-17",
            "2026-09-24",
            "2026-10-01",
            "2026-10-08",
            "2026-10-15",
            "2026-10-22",
            "2026-10-29"
        ], // і субота 3.10 (2026-10-03)
        sub: 0
    },
    {
        day: 4,
        time: "10:30-11:50",
        name: "Теорія автоматичного управління (лаб)",
        info: "4т (Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474576692&usg=AOvVaw0uwBieHhXo35FmPTb1Gocw", // ТАУ
        dates: [
            "2026-11-05",
            "2026-11-12",
            "2026-11-19"
        ], // і субота 7.11 (2026-11-07)
        sub: 0
    },

    // --- 12:10-13:30 (одна пара) ---
    {
        day: 4,
        time: "12:10-13:30",
        name: "Філософія (С)",
        info: "10т Савинська І.В. хз чи до 05.11 чи до 19.11",
        link: "https://www.google.com/url?q=https://meet.google.com/jba-ugce-ysm?pli%3D1&sa=D&source=editors&ust=1789416474579512&usg=AOvVaw0ZMu1hG2XdpNkSV_TZKyb2",
        dates: [
            "2026-09-17",
            "2026-09-24",
            "2026-10-01",
            "2026-10-08",
            "2026-10-15",
            "2026-10-22",
            "2026-10-29",
            "2026-11-05",
            "2026-11-12",
            "2026-11-19"
        ],
        sub: 0
    },

    // --- 13:40-15:00 (одна пара) ---
    {
        day: 4,
        time: "13:40-15:00",
        name: "Кібернетична безпека підприємства (лаб)",
        info: "10т (доц. Борисенко І.І.) хз чи до 05.11 чи до 19.11",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/meet/324553793992041?p%3DWuRiPSEJsfqwU6ZB1i&sa=D&source=editors&ust=1789416474582369&usg=AOvVaw1nqgsusvjLSXIYuZ6tU9bF", // teams.microsoft
        dates: [
            "2026-09-17",
            "2026-09-24",
            "2026-10-01",
            "2026-10-08",
            "2026-10-15",
            "2026-10-22",
            "2026-10-29",
            "2026-11-05",
            "2026-11-12",
            "2026-11-19"
        ], // і суботи: 3.10 (2026-10-03), 7.11 (2026-11-07)
        sub: 0
    },
    // П'ЯТНИЦЯ (day: 5)
    // Вільний день — пар немає

    // СУБОТА (day: 6)

    // --- 09:00-10:20 ---
    {
        day: 6,
        time: "09:00-10:20",
        name: "Теорія систем та системний аналіз (Л)",
        info: "(Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474514487&usg=AOvVaw0EMiLLSbrKeTt9nm5TYksU", // teams.microsoft.com
        dates: ["2026-10-17"],
        sub: 0
    },
    {
        day: 6,
        time: "09:00-10:20",
        name: "Теорія систем та системний аналіз (Пр)",
        info: "(Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253APi674oI2F7i62XUbZfMtVpFEf_4FUAW_MzWPUxApPiU1%2540thread.tacv2/conversations?groupId%3Db1f50dfa-1515-4667-8439-5a3a8b928aee%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474532969&usg=AOvVaw3wrklBY4H-jauu2ZOAvQDY", // teams.microsoft.com
        dates: ["2026-10-24"],
        sub: 0
    },
    {
        day: 6,
        time: "09:00-10:20",
        name: "Проектування інформаційних систем (лаб)",
        info: "(доц. Гладка М.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253ATPmD9-2x-ev7X6k4sklG9ZO_Alne3sxs3dGitxd0S5E1%2540thread.tacv2/conversations?groupId%3D86c17497-45dd-404c-8d9d-1334a0867295%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474571697&usg=AOvVaw0nQ-KZw0Nu1nhbrD6mKGat", // Проектування інформаційних сис
        dates: ["2026-10-03"],
        sub: 0
    },

    // --- 10:30-11:50 ---
    {
        day: 6,
        time: "10:30-11:50",
        name: "Проектування інформаційних систем (лаб)",
        info: "(доц. Гладка М.В.)",
        link: "", // Проектування інформаційних сис
        dates: ["2026-10-03"],
        sub: 0
    },
    {
        day: 6,
        time: "10:30-11:50",
        name: "Теорія автоматичного управління (лаб)",
        info: "(Проф. Дружинін В.А.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AClcZG5lMdMYt7hi3FdWOb1HRDIlSR0De1ZP-n-UHKME1%2540thread.tacv2/conversations?groupId%3D975bf78f-ec66-4188-b8e0-b9d6c23839a6%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474518604&usg=AOvVaw3MRELZSI9I9CRBHvE0Az5k", // ТАУ
        dates: [ "2026-10-24", "2026-10-31", "2026-11-07"],
        sub: 0

    },

    // --- 12:10-13:30 ---
    {
        day: 6,
        time: "12:10-13:30",
        name: "Системи банківської безпеки (Л)",
        info: "(проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474537763&usg=AOvVaw00HtEs9BH8fD41MVPmmzK_", // СББ
        dates: ["2026-09-19"],
        sub: 0
    },
    {
        day: 6,
        time: "12:10-13:30",
        name: "Кібернетична безпека підприємства (Л)",
        info: "(доц. Борисенко І.І.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/meet/324553793992041?p%3DWuRiPSEJsfqwU6ZB1i&sa=D&source=editors&ust=1789416474519697&usg=AOvVaw37fsDCFh7E_nDfgmJ-9AlH", // teams.microsoft
        dates: ["2026-10-17"],
        sub: 0
    },
    {
        day: 6,
        time: "12:10-13:30",
        name: "Іноземна мова (лаб)",
        info: "(Красненко О.М.)",
        link: "", // teams.microsoft.com
        dates: ["2026-09-26", "2026-10-31"],
        sub: 0
    },

    // --- 13:40-15:00 ---
    {
        day: 6,
        time: "13:40-15:00",
        name: "Системи банківської безпеки (Л)",
        info: "(проф. Трембовецький М.П.)",
        link: "https://www.google.com/url?q=https://teams.cloud.microsoft/l/message/19:dk-4vCKZTiXJNHZw7mN2jztN0I5npKfSJxqLjNphlwY1@thread.tacv2/1788164600668?tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d%26groupId%3D6ada82b5-643d-4f99-946c-e7f0b2863588%26parentMessageId%3D1788164600668%26teamName%3D%25D0%25A1%25D0%25B8%25D1%2581%25D1%2582%25D0%25B5%25D0%25BC%25D0%25B8%2520%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25BA%25D0%25BE%25D0%25B2%25D0%25BE%25D1%2597%2520%25D0%25B1%25D0%25B5%25D0%25B7%25D0%25BF%25D0%25B5%25D0%25BA%25D0%25B8%26channelName%3DGeneral%26createdTime%3D1788164600668&sa=D&source=editors&ust=1789416474541445&usg=AOvVaw2Ye94h4r1OnoA-cDF7ZmiH", // СББ
        dates: ["2026-09-19"],
        sub: 0
    },
    {
        day: 6,
        time: "13:40-15:00",
        name: "Технологія створення програмних продуктів (Пр)",
        info: "(доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474565585&usg=AOvVaw3Y3ds_SS4ae32S4fHGZvJc", // Технології створення ПП
        dates: ["2026-09-26", "2026-10-31"],
        sub: 0
    },
    {
        day: 6,
        time: "13:40-15:00",
        name: "Кібернетична безпека підприємства (лаб)",
        info: "(доц. Борисенко І.І.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/meet/324553793992041?p%3DWuRiPSEJsfqwU6ZB1i&sa=D&source=editors&ust=1789416474582369&usg=AOvVaw1nqgsusvjLSXIYuZ6tU9bF", // teams.microsoft
        dates: ["2026-10-03", "2026-11-07"],
        sub: 0
    },

    // --- 15:10-16:30 ---
    {
        day: 6,
        time: "15:10-16:30",
        name: "Технологія створення програмних продуктів (Пр) / (лаб)",
        info: "(доц. Кравченко О.В.)",
        link: "https://www.google.com/url?q=https://teams.microsoft.com/l/team/19%253AhaSU_3hbsgI58chkDy8XYQiU6ivn54k1Z4i42O6VpbI1%2540thread.tacv2/conversations?groupId%3D4113c5a6-5a26-43e8-85b1-87f3114b8d0d%26tenantId%3D11bdc4c0-f87d-4025-84ee-777d1d7ffc4d&sa=D&source=editors&ust=1789416474565585&usg=AOvVaw3Y3ds_SS4ae32S4fHGZvJc", // Технології створення ПП
        dates: ["2026-09-26", "2026-10-31"],
        sub: 0
    }
];

let currentView = 'day';

function setView(view) {
    currentView = view;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + view).classList.add('active');
    refreshView();
}

function refreshView() {
    const sub = parseInt(document.getElementById('subgroup-select').value);
    const pickerValue = document.getElementById('date-picker').value;
    const date = pickerValue ? new Date(pickerValue) : new Date();
    
    if (currentView === 'day') renderDay(date, sub);
    else if (currentView === 'week') renderWeek(date, sub);
    else renderFull(sub);
}

// Покращена логіка фільтрації: підгрупа + спільні пари
function filterLessons(iso, dayNum, subGroup) {
    return scheduleData.filter(l => {
        const isSubMatch = (l.sub === 0 || l.sub === subGroup); // Показуємо спільні АБО обрану підгрупу
        const dateMatch = l.dates && l.dates.includes(iso);
        const rangeMatch = l.range && dayNum === l.day && 
            (new Date(iso) >= new Date(l.range[0]) && new Date(iso) <= new Date(l.range[1]));
        
        return isSubMatch && (dateMatch || rangeMatch);
    });
}

function createCard(l) {
    const typeColor = l.sub === 0 ? '#4285F4' : '#34A853'; // Різні кольори для спільних і груп
    return `<div class="lesson-card" style="border-left-color: ${typeColor}">
        <span class="subgroup-label" style="background: ${typeColor}22; color: ${typeColor}">
            ${l.sub === 0 ? 'Спільна' : l.sub + ' підгрупа'}
        </span>
        <div class="lesson-time">${l.time}</div>
        <div class="name">${l.name}</div>
        <div class="lesson-details">${l.info}</div>
        
        ${l.link ? `<a href="${l.link}" class="lesson-link" target="_blank">Посилання</a>` : ''}
    </div>`;
}

function renderDay(date, sub) {
    const iso = date.toISOString().split('T')[0];
    const lessons = filterLessons(iso, date.getDay(), sub);
    let html = `<h3>${date.toLocaleDateString('uk-UA', {weekday: 'long', day: 'numeric', month: 'long'})}</h3>`;
    html += lessons.length ? lessons.map(createCard).join('') : '<p class="empty">Пар немає</p>';
    document.getElementById('content-area').innerHTML = html;
}

function renderWeek(date, sub) {
    let html = '';
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() - (tempDate.getDay() === 0 ? 6 : tempDate.getDay() - 1));
    for (let i = 0; i < 6; i++) {
        const iso = tempDate.toISOString().split('T')[0];
        const lessons = filterLessons(iso, tempDate.getDay(), sub);
        html += `<h4 style="border-bottom: 1px solid #ddd; padding-top:10px;">${tempDate.toLocaleDateString('uk-UA', {weekday: 'long', day: 'numeric'})}</h4>`;
        html += lessons.length ? lessons.map(createCard).join('') : '<p style="color:#999; font-size:0.8rem;">Вільно</p>';
        tempDate.setDate(tempDate.getDate() + 1);
    }
    document.getElementById('content-area').innerHTML = html;
}

function renderFull(sub) {
    let html = '<div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">';
    html += '<h3 style="text-align:center;">Повний розклад ІР-3 1 за датами</h3>';

    let current = new Date("2026-09-14");
    let endDate = new Date("2026-12-06");
    let currentMonth = -1;

    while (current <= endDate) {
        if (current.getMonth() !== currentMonth) {
            currentMonth = current.getMonth();
            html += `<h2 style="background:#4285F4; color:white; padding:10px; border-radius:5px; margin-top:30px;">${current.toLocaleDateString('uk-UA', {month: 'long', year: 'numeric'})}</h2>`;
        }

        const iso = current.toISOString().split('T')[0];
        const lessons = filterLessons(iso, current.getDay(), sub);

        if (lessons.length > 0) {
            html += `<div style="margin-bottom:12px; padding:10px; border-bottom:1px solid #eee;">`;
            html += `<strong style="color:#333;">${current.toLocaleDateString('uk-UA', {weekday: 'short', day: 'numeric'})}:</strong>`;
            lessons.forEach(l => {
                const label = l.sub === 0 ? '[Спільна]' : `[${l.sub} підгр.]`;
                html += `<div style="font-size:0.85rem; margin-left:20px; color:#555;">• ${label} ${l.time} - ${l.name}</div>`;
            });
            html += `</div>`;
        }
        current.setDate(current.getDate() + 1);
    }
    html += '</div>';
    document.getElementById('content-area').innerHTML = html;
}

window.onload = () => {
    document.getElementById('date-picker').value = new Date().toISOString().split('T')[0];
    setView('day');
};
