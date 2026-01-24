/**
 * GEO_DATA
 * MASSIVE LAKES EXPANSION
 * Added 15+ new lakes/ponds to satisfy "very few lakes" request.
 */

const CITIES = [
    { name: "Київ", coords: [50.45, 30.52], type: "city", description: "Столиця.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Maidan_Nezalezhnosti_in_Kyiv.jpg/800px-Maidan_Nezalezhnosti_in_Kyiv.jpg" },
    { name: "Дніпро", coords: [48.46, 35.04], type: "city", description: "Місто на Дніпрі.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dnipro_City_View.jpg/800px-Dnipro_City_View.jpg" },
    { name: "Запоріжжя", coords: [47.83, 35.13], type: "city", description: "Хортиця.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Khortytsia_Zaporizhzhia.jpg/800px-Khortytsia_Zaporizhzhia.jpg" },
    { name: "Херсон", coords: [46.63, 32.61], type: "city", description: "Дельта Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kherson_Dnieper_River.jpg/800px-Kherson_Dnieper_River.jpg" },
    { name: "Одеса", coords: [46.48, 30.72], type: "city", description: "Морські ворота.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Odessa_Opera_Theater_Front.jpg/800px-Odessa_Opera_Theater_Front.jpg" },
    { name: "Львів", coords: [49.83, 24.02], type: "city", description: "Захід.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lviv_High_Castle_View.jpg/800px-Lviv_High_Castle_View.jpg" },
    { name: "Вінниця", coords: [49.23, 28.46], type: "city", description: "Фонтан Рошен.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Vinnytsia_Roshen_Fountain.jpg/800px-Vinnytsia_Roshen_Fountain.jpg" },
    { name: "Чернігів", coords: [51.49, 31.28], type: "city", description: "Десна.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Catherine_s_Church_Chernihiv.jpg/800px-Catherine_s_Church_Chernihiv.jpg" },
    { name: "Полтава", coords: [49.58, 34.55], type: "city", description: "Ворскла.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Poltava_Eagles.jpg/800px-Poltava_Eagles.jpg" }
];

const GEO_DATA = [
    // --- MAJOR RIVERS ---
    {
        id: "dnipro", type: "river", name: "Дніпро", tags: ["top"], length: "2 201 км", basin: "504 000 км²",
        description: "Велична річка, символ України.",
        color: "#38bdf8",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dnieper_River_in_Kyiv_2.jpg/800px-Dnieper_River_in_Kyiv_2.jpg",
        origin: "Від скіфського *Dānu apara — «Глибока річка». У давнину називався Борисфен.",
        legend: "Легенда про трьох братів - Кия, Щека, Хорива, які заснували місто на Дніпрі.",
        wildlife: "Соми-велетні, щуки, річкові раки. У плавнях гніздяться чаплі та лебеді.",
        source: "Валдайська височина (с. Бочарово)",
        mouth: "Чорне море (Дніпровсько-Бузький лиман)",
        path: [
            [51.9, 30.6], [51.5, 30.5], [51.2, 30.45], [50.9, 30.4], [50.6, 30.45], [50.5, 30.5],
            [50.4, 30.55], [50.3, 30.6], [50.0, 31.0], [49.8, 31.2], [49.6, 31.4], [49.5, 31.6],
            [49.4, 31.9], [49.3, 32.2], [49.2, 32.5], [49.1, 33.0], [48.9, 33.5], [48.8, 34.0],
            [48.6, 34.3], [48.5, 34.6], [48.45, 35.0], [48.4, 35.1], [48.2, 35.15], [48.0, 35.1],
            [47.8, 35.0], [47.5, 34.8], [47.3, 34.4], [47.1, 34.0], [47.0, 33.6], [46.8, 33.3],
            [46.7, 33.0], [46.6, 32.8], [46.55, 32.5], [46.5, 32.2], [46.45, 32.1]
        ]
    },
    {
        id: "dnister", type: "river", name: "Дністер", tags: ["top"], length: "1 362 км", basin: "72 100 км²",
        description: "Дністровський каньйон.",
        color: "#06b6d4",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Zalishchyky_Dniester_Canyon.jpg/800px-Zalishchyky_Dniester_Canyon.jpg",
        source: "Карпати (г. Розлуч, с. Вовче)",
        mouth: "Дністровський лиман",
        path: [
            [49.2, 22.8], [49.3, 23.2], [49.4, 23.6], [49.35, 24.0], [49.2, 24.3], [49.1, 24.5],
            [49.0, 24.8], [48.9, 25.0], [48.8, 25.4], [48.7, 25.8], [48.6, 26.2], [48.55, 26.6],
            [48.5, 27.0], [48.55, 27.4], [48.5, 27.8], [48.3, 28.1], [48.0, 28.3], [47.8, 28.5],
            [47.5, 28.8], [47.2, 29.0], [47.0, 29.5], [46.8, 29.8], [46.5, 30.1], [46.3, 30.3]
        ]
    },
    {
        id: "pivdenny_bug", type: "river", name: "Південний Буг", tags: [], length: "806 км", basin: "63 700 км²",
        description: "Мигійські пороги.",
        color: "#3b82f6",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Southern_Bug_Migeya.jpg/800px-Southern_Bug_Migeya.jpg",
        source: "Подільська височина (Хмельниччина)",
        mouth: "Бузький лиман",
        path: [
            [49.6, 26.5], [49.5, 26.8], [49.4, 27.2], [49.35, 27.6], [49.3, 28.0],
            [49.25, 28.3], [49.23, 28.48], [49.2, 28.55], [49.1, 28.6],
            [49.0, 28.7], [48.8, 28.9], [48.6, 29.2], [48.4, 29.5], [48.2, 30.0],
            [48.0, 30.8], [47.8, 31.1], [47.6, 31.3], [47.3, 31.5], [47.0, 31.8], [46.9, 32.0]
        ]
    },

    // --- TRIBUTARIES (DNIPRO) ---
    { id: "desna", type: "river", name: "Десна", length: "1130 км", color: "#60a5fa", description: "Зачарована річка.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Desna_River_near_Chernihiv.jpg/800px-Desna_River_near_Chernihiv.jpg", origin: "Від старослов'янського «деснъ» — «правий». Географічно це права притока Дніпра (якщо йти вгору за течією).", source: "Смоленська височина", mouth: "Дніпро (біля Києва)", path: [[52.2, 33.3], [52.1, 33.2], [51.9, 33.0], [51.7, 32.8], [51.6, 32.5], [51.5, 32.2], [51.4, 31.8], [51.3, 31.4], [51.2, 31.0], [50.8, 30.8], [50.55, 30.55]] },
    { id: "sula", type: "river", name: "Сула", length: "363 км", color: "#60a5fa", description: "Ліва притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sula_River_Poltava.jpg/800px-Sula_River_Poltava.jpg", path: [[50.8, 33.5], [50.5, 33.2], [50.2, 33.0], [49.8, 32.8], [49.5, 32.7]] },
    { id: "psel", type: "river", name: "Псел", length: "717 км", color: "#60a5fa", description: "Ліва притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Psel_river_near_Hadyach.jpg/800px-Psel_river_near_Hadyach.jpg", path: [[51.0, 35.0], [50.5, 34.5], [50.0, 34.0], [49.5, 33.8], [49.0, 33.5]] },
    { id: "vorskla", type: "river", name: "Ворскла", length: "464 км", color: "#60a5fa", description: "Битва на Ворсклі.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vorskla_River_Poltava.jpg/800px-Vorskla_River_Poltava.jpg", path: [[50.5, 35.8], [50.2, 35.5], [49.8, 35.0], [49.5, 34.5], [49.0, 34.2], [48.8, 34.1]] },
    { id: "samara", type: "river", name: "Самара", length: "320 км", color: "#60a5fa", description: "Ліва притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Samara_River_Dnipro.jpg/800px-Samara_River_Dnipro.jpg", path: [[48.8, 36.5], [48.6, 36.0], [48.5, 35.5], [48.45, 35.1]] },
    { id: "ros", type: "river", name: "Рось", length: "346 км", color: "#60a5fa", description: "Права притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Ros_River_Bila_Tserkva.jpg/800px-Ros_River_Bila_Tserkva.jpg", path: [[49.2, 29.5], [49.5, 30.0], [49.6, 30.5], [49.4, 31.0], [49.5, 31.5]] },
    { id: "inhulets", type: "river", name: "Інгулець", length: "549 км", color: "#60a5fa", description: "Права притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Inhulets_River_Kryvyi_Rih.jpg/800px-Inhulets_River_Kryvyi_Rih.jpg", path: [[48.5, 32.5], [48.2, 33.0], [47.8, 33.2], [47.5, 33.0], [47.2, 32.8], [46.7, 32.7]] },

    // --- TRIBUTARIES (OTHERS) ---
    { id: "seim", type: "river", name: "Сейм", length: "748 км", color: "#93c5fd", description: "Найбільша ліва притока Десни.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Seim_River_Baturyn.jpg/800px-Seim_River_Baturyn.jpg", origin: "Назва може походити від давньоіндійського 'syama' (темна річка) або від старослов'янського 'сімь' (сімейний).", path: [[51.6, 35.5], [51.5, 35.0], [51.4, 34.5], [51.4, 34.0], [51.4, 33.5], [51.45, 32.7]] },
    { id: "pripyat", type: "river", name: "Прип'ять", length: "761 км", color: "#60a5fa", description: "Головна річка Полісся. Найбільша за площею басейну та довжиною права притока Дніпра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pripyat_River_bridge.jpg/800px-Pripyat_River_bridge.jpg", origin: "Від праслов'янського 'pri-pęt' (притока, що примикає) або 'пріп'ять' (піниста).", path: [[51.7, 24.3], [51.75, 24.8], [51.8, 25.5], [51.85, 26.0], [51.9, 26.5], [51.85, 27.2], [51.8, 28.0], [51.5, 29.0], [51.3, 30.2]] },

    // --- DNIEPER TRIBUTARIES (NEW EXPANSION) ---
    { id: "horyn", type: "river", name: "Горинь", length: "659 км", color: "#60a5fa", description: "Найбільша притока Прип'яті. Протікає через Тернопільську, Хмельницьку та Рівненську області.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Horyn_River_near_Netishyn.jpg/800px-Horyn_River_near_Netishyn.jpg", origin: "Від старослов'янського 'горина' (гірська місцевість) або 'горіти' (через швидку течію).", path: [[50.0, 25.8], [50.2, 26.2], [50.5, 26.4], [50.8, 26.5], [51.2, 26.6], [51.5, 26.7], [51.8, 26.8], [52.0, 26.9]] },
    { id: "styr", type: "river", name: "Стир", length: "494 км", color: "#60a5fa", description: "Права притока Прип'яті. На Стиру розташоване місто Луцьк.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Styr_River_Lutsk.jpg/800px-Styr_River_Lutsk.jpg", origin: "Від балтійського 'stora' (велика, сильна) або від праслов'янського 'стир' (застигла, тиха вода).", path: [[49.9, 25.2], [50.2, 25.1], [50.5, 25.2], [50.7, 25.3], [51.0, 25.5], [51.4, 25.8], [51.8, 26.1]] },
    { id: "sluch", type: "river", name: "Случ", length: "451 км", color: "#60a5fa", description: "Притока Горині. Мальовнича річка Полісся.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Sluch_River_Novohrad.jpg/800px-Sluch_River_Novohrad.jpg", origin: "Від 'сполучати' (вона сполучає багато дрібних річок) або від литовського 'sluogas' (болото).", path: [[49.6, 26.7], [49.8, 27.2], [50.2, 27.5], [50.6, 27.3], [51.0, 26.8], [51.4, 26.6]] },
    { id: "teteriv", type: "river", name: "Тетерів", length: "365 км", color: "#60a5fa", description: "Права притока Дніпра. На ній розташований Житомир.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Teteriv_River_Zhytomyr.jpg/800px-Teteriv_River_Zhytomyr.jpg", origin: "Ймовірно від птаха тетерука, яких колись було дуже багато в лісах навколо річки.", path: [[49.8, 28.3], [50.2, 28.5], [50.3, 29.0], [50.5, 29.5], [50.8, 30.0], [51.0, 30.3]] },
    { id: "irpin", type: "river", name: "Ірпінь", length: "162 км", color: "#60a5fa", description: "Річка-фортеця. Мала стратегічне значення в обороні Києва.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Irpin_River_Kyiv_Region.jpg/800px-Irpin_River_Kyiv_Region.jpg", origin: "Від балтійського 'erpu' (повільний, лінивий) або від слова 'єри' (болота).", path: [[50.0, 29.4], [50.3, 29.8], [50.5, 30.2], [50.8, 30.4]] },

    // --- SIVERSKYI DONETS BASIN ---
    { id: "siversky_donets", type: "river", name: "Сіверський Донець", tags: ["top"], length: "1053 км", color: "#2563eb", description: "Святі Гори.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Svyati_Gory_Donets.jpg/800px-Svyati_Gory_Donets.jpg", path: [[50.6, 36.8], [50.4, 36.85], [50.0, 36.9], [49.7, 36.85], [49.5, 36.8], [49.3, 37.0], [49.2, 37.5], [49.0, 38.0], [48.9, 38.5], [48.7, 39.0], [48.5, 39.7], [48.3, 40.0]], source: "Середньоросійська височина", mouth: "Дон" },
    { id: "oskil", type: "river", name: "Оскіл", length: "472 км", color: "#2563eb", description: "Ліва притока Дінця.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Oskil_River.jpg/800px-Oskil_River.jpg", path: [[50.5, 37.8], [50.0, 37.6], [49.5, 37.5], [49.1, 37.4]] },
    { id: "aidar", type: "river", name: "Айдар", length: "264 км", color: "#2563eb", description: "Ліва притока Дінця.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Aidar_River.jpg/800px-Aidar_River.jpg", path: [[50.0, 38.8], [49.5, 39.0], [49.0, 39.2], [48.7, 39.3]] },

    // --- DESNA TRIBUTARIES ---
    { id: "snov", type: "river", name: "Снов", length: "253 км", color: "#93c5fd", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Snov_River_Sedniv.jpg/800px-Snov_River_Sedniv.jpg", path: [[52.2, 32.0], [52.0, 31.95], [51.9, 31.9], [51.7, 31.8], [51.5, 31.6]] },
    { id: "oster", type: "river", name: "Остер", length: "199 км", color: "#93c5fd", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Oster_River_Nizhyn.jpg/800px-Oster_River_Nizhyn.jpg", path: [[51.1, 31.9], [50.9, 31.5], [50.9, 30.9]] },

    // --- DNIESTER BASIN ---
    { id: "stryi", type: "river", name: "Стрий", length: "232 км", color: "#06b6d4", description: "Права притока Дністра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stryi_River.jpg/800px-Stryi_River.jpg", path: [[49.0, 23.2], [49.1, 23.5], [49.2, 23.9], [49.3, 24.2]] },
    { id: "zbruch", type: "river", name: "Збруч", length: "244 км", color: "#06b6d4", description: "Ліва притока Дністра.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Zbruch_River.jpg/800px-Zbruch_River.jpg", path: [[49.6, 26.2], [49.3, 26.3], [49.0, 26.2], [48.5, 26.4]] },

    // --- SOUTHERN BUG BASIN ---
    { id: "syniukha", type: "river", name: "Синюха", length: "111 км", color: "#3b82f6", description: "Ліва притока Південного Бугу.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Syniukha_River.jpg/800px-Syniukha_River.jpg", path: [[48.8, 30.6], [48.6, 30.7], [48.4, 30.8], [48.1, 30.9]] },
    { id: "inhul", type: "river", name: "Інгул", length: "354 км", color: "#3b82f6", description: "Ліва притока Південного Бугу.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Inhul_River.jpg/800px-Inhul_River.jpg", path: [[48.7, 32.2], [48.4, 32.3], [48.0, 32.4], [47.5, 32.1], [47.0, 32.0]] },

    // --- DANUBE BASIN ---
    { id: "danube", type: "river", name: "Дунай", tags: ["top"], length: "2850 км", basin: "817 000 км²", description: "Друга за довжиною річка Європи.", color: "#818cf8", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Danube_at_Budapest_with_Parliament.jpg/800px-Danube_at_Budapest_with_Parliament.jpg", path: [[45.5, 28.2], [45.4, 28.8], [45.3, 29.2], [45.2, 29.6]], wildlife: "Пелікани (Дельта Дунаю), білуга, осетрові риби. Унікальний біосферний заповідник.", source: "Шварцвальд (Німеччина)", mouth: "Чорне море (Дельта Дунаю)" },
    { id: "tysa", type: "river", name: "Тиса", length: "966 км", color: "#818cf8", description: "Притока Дунаю.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tisa_River_Hungary.jpg/800px-Tisa_River_Hungary.jpg", path: [[48.0, 24.2], [48.1, 23.8], [48.2, 23.5], [48.1, 23.0]] },
    { id: "prut", type: "river", name: "Прут", length: "967 км", color: "#818cf8", description: "Притока Дунаю.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Prut_River_Yaremche.jpg/800px-Prut_River_Yaremche.jpg", path: [[48.4, 24.5], [48.5, 25.0], [48.4, 25.5], [48.2, 26.5], [47.8, 27.5], [47.0, 28.0], [46.0, 28.2]] },

    // --- BALTIC BASIN ---
    { id: "western_bug", type: "river", name: "Західний Буг", length: "772 км", color: "#2dd4bf", description: "Басейн Балтійського моря.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Western_Bug_River.jpg/800px-Western_Bug_River.jpg", path: [[50.0, 24.5], [50.3, 24.2], [50.6, 24.0], [51.0, 23.7], [51.5, 23.6]] },

    // --- AZOV & BLACK SEA RIVERS ---
    { id: "kalmius", type: "river", name: "Кальміус", length: "209 км", color: "#f472b6", description: "Впадає в Азовське море.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kalmius_River_Donetsk.jpg/800px-Kalmius_River_Donetsk.jpg", path: [[48.0, 37.8], [47.7, 37.9], [47.4, 37.7], [47.1, 37.6]] },
    { id: "salhir", type: "river", name: "Салгир", length: "232 км", color: "#fca5a5", description: "Найдовша річка Криму.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Salgir_River_Simferopol.jpg/800px-Salgir_River_Simferopol.jpg", path: [[44.9, 34.1], [45.2, 34.3], [45.5, 34.8], [45.7, 35.0]] },
    { id: "molochna", type: "river", name: "Молочна", length: "197 км", color: "#fca5a5", description: "Впадає в Молочний лиман.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Molochna_River.jpg/800px-Molochna_River.jpg", path: [[47.2, 35.8], [47.0, 35.5], [46.7, 35.3]] },

    // --- LAKES ---
    // SHATSKY GROUP
    { id: "svityaz", type: "lake", name: "Світязь", tags: ["top"], area: "26.2 км²", description: "Шацькі озера.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Svityaz_Lake_Sunset_2019.jpg/800px-Svityaz_Lake_Sunset_2019.jpg", color: "#06b6d4", center: [51.50, 23.85], radius: 6000, origin: "Від старослов'янського «світити» (чиста, світла вода) або від скандинавського імені Світинг.", wildlife: "Вугор європейський (делікатес), лебеді." },
    { id: "pulemetske", type: "lake", name: "Пулемецьке", area: "16.4 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shatsky_Lakes_Boat.jpg/800px-Shatsky_Lakes_Boat.jpg", color: "#06b6d4", center: [51.56, 23.77], radius: 3500 },
    { id: "luke", type: "lake", name: "Люцимер", area: "4.3 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shatsky_Lakes_Boat.jpg/800px-Shatsky_Lakes_Boat.jpg", color: "#06b6d4", center: [51.48, 23.93], radius: 2500 },
    { id: "peremut", type: "lake", name: "Перемут", area: "1.46 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shatsky_Lakes_Boat.jpg/800px-Shatsky_Lakes_Boat.jpg", color: "#06b6d4", center: [51.52, 23.95], radius: 2000 },
    { id: "pisochne", type: "lake", name: "Пісочне", area: "1.38 км²", description: "Чиста вода, санаторій Лісова Пісня.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lake_Pisochne_Shatsky_NP.jpg/800px-Lake_Pisochne_Shatsky_NP.jpg", color: "#06b6d4", center: [51.56, 23.92], radius: 1800 },

    // PINK & SALT LAKES (UNIQUE)
    { id: "lemurian", type: "lake", name: "Лемурійське озеро", tags: ["top"], area: "Рожеве", description: "Українське Мертве море. Рожева вода.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Lemurian_Lake_Kherson.jpg/800px-Lemurian_Lake_Kherson.jpg", color: "#f9a8d4", center: [46.24, 33.78], radius: 2000, origin: "Названо на честь міфічного континенту Лемурія. Вважається залишками стародавнього моря." },
    { id: "koyashskoye", type: "lake", name: "Кояське озеро", tags: ["top"], area: "5 км²", description: "Рожеве солоне озеро в Криму.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Koyashskoye_Lake_Crimea.jpg/800px-Koyashskoye_Lake_Crimea.jpg", color: "#f472b6", center: [45.04, 36.18], radius: 3000 },
    { id: "solotvyno", type: "lake", name: "Солотвинські озера", area: "Курорт", description: "Солоні шахтні озера.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Solotvyno_Salt_Lakes.jpg/800px-Solotvyno_Salt_Lakes.jpg", color: "#a5f3fc", center: [47.96, 23.87], radius: 1500 },

    // SCENIC SPOTS
    { id: "bakota", type: "lake", name: "Бакота", tags: ["top"], area: "Затока", description: "Затоплене село, неймовірний краєвид на Дністер.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Bakota_Bay_Dniester.jpg/800px-Bakota_Bay_Dniester.jpg", color: "#3b82f6", center: [48.58, 26.99], radius: 4000 },

    // CARPATHIAN LAKES
    { id: "synevyr", type: "lake", name: "Синевир", tags: ["top"], area: "0.04 км²", description: "Морське Око.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Synevyr_Lake_Carpathians.jpg/800px-Synevyr_Lake_Carpathians.jpg", color: "#06b6d4", center: [48.617, 23.684], radius: 2000, origin: "Назва походить від поєднання слів «синь» та «вир».", legend: "Легенда про кохання пастуха Вира та графської доньки Синь. Озеро утворилося зі сліз Сині.", wildlife: "Річкова форель (ловля заборонена!), річкові раки. Навколо - смерекові ліси, бурі ведмеді." },
    { id: "nesamovyte", type: "lake", name: "Несамовите", area: "0.003 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nesamovyte_Lake_Chornohora.jpg/800px-Nesamovyte_Lake_Chornohora.jpg", color: "#06b6d4", center: [48.13, 24.53], radius: 1000, wildlife: "Карпатські тритони (червонокнижні види)." },
    { id: "brebeneskul", type: "lake", name: "Бребенескул", area: "0.006 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Brebeneskul_Lake_Ukraine.jpg/800px-Brebeneskul_Lake_Ukraine.jpg", color: "#06b6d4", center: [48.10, 24.56], radius: 800 },
    { id: "maricheika", type: "lake", name: "Марічейка", area: "0.01 км²", description: "Озеро в ялиновому лісі.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Maricheika_Lake.jpg/800px-Maricheika_Lake.jpg", color: "#06b6d4", center: [48.01, 24.65], radius: 900 },
    { id: "herashaska", type: "lake", name: "Герашаська", area: "0.015 км²", description: "Льодовикове озеро на Свидовці.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Herashaska_Lake.jpg/800px-Herashaska_Lake.jpg", color: "#06b6d4", center: [48.26, 24.16], radius: 950 },
    { id: "vorozheska", type: "lake", name: "Ворожеська", area: "0.007 км²", description: "Високогірне озеро.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Vorozheska_Lake.jpg/800px-Vorozheska_Lake.jpg", color: "#0ea5e9", center: [48.27, 24.19], radius: 800 },
    { id: "apshynets", type: "lake", name: "Апшинець", area: "0.012 км²", description: "З кришталево чистою водою.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Apshynets_Lake.jpg/800px-Apshynets_Lake.jpg", color: "#0ea5e9", center: [48.28, 24.15], radius: 850 },

    // DANUBE & SOUTH
    { id: "yalpuh", type: "lake", name: "Ялпуг", tags: ["top"], area: "149 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Yalpug_lake.jpg/800px-Yalpug_lake.jpg", color: "#06b6d4", center: [45.42, 28.60], radius: 10000 },
    { id: "kugurluy", type: "lake", name: "Кугурлуй", area: "82 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Danube_Delta_Pelicans.jpg/800px-Danube_Delta_Pelicans.jpg", color: "#06b6d4", center: [45.28, 28.65], radius: 8000 },
    { id: "kahul", type: "lake", name: "Кагул", area: "90 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Danube_Delta_Pelicans.jpg/800px-Danube_Delta_Pelicans.jpg", color: "#06b6d4", center: [45.37, 28.40], radius: 6000 },
    { id: "katlabuh", type: "lake", name: "Катлабух", area: "67 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Danube_Delta_Pelicans.jpg/800px-Danube_Delta_Pelicans.jpg", color: "#06b6d4", center: [45.52, 28.98], radius: 7000 },
    { id: "kitay", type: "lake", name: "Китай", area: "60 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Danube_Delta_Pelicans.jpg/800px-Danube_Delta_Pelicans.jpg", color: "#06b6d4", center: [45.65, 29.30], radius: 5000 },
    { id: "donuzlav", type: "lake", name: "Донузлав", tags: ["top"], area: "48 км²", description: "Найглибше озеро Криму. Солоне озеро, з'єднане з морем.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Donuzlav_Lake.jpg/800px-Donuzlav_Lake.jpg", color: "#0ea5e9", center: [45.35, 33.00], radius: 9000 },
    { id: "sasyk_syvash", type: "lake", name: "Сасик-Сиваш", area: "75 км²", description: "Найбільше озеро Криму. Відоме своїми соляними промислами та рожевим відтінком.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sasyk_Syvash_Lake.jpg/800px-Sasyk_Syvash_Lake.jpg", color: "#f472b6", center: [45.18, 33.50], radius: 8000 },
    { id: "molochnyi", type: "lake", name: "Молочний лиман", area: "168 км²", description: "Унікальний орнітологічний заказник міжнародного значення.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Molochnyi_Lyman_Sunset.jpg/800px-Molochnyi_Lyman_Sunset.jpg", color: "#2dd4bf", center: [46.52, 35.35], radius: 7500 },

    // OTHER POPULAR LAKES
    { id: "blue_lakes", type: "lake", name: "Голубі озера", description: "Олешня, Чернігівщина. Кар'єрні озера.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Blue_Lakes_Oleshnya.jpg/800px-Blue_Lakes_Oleshnya.jpg", color: "#06b6d4", center: [51.96, 31.15], radius: 1500 }, // NEW
    { id: "shelekhivske", type: "lake", name: "Шелехівське", description: "Найдавніше озеро (Льодовиковий період).", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Shelekhivske_Lake.jpg/800px-Shelekhivske_Lake.jpg", color: "#06b6d4", center: [50.71, 34.50], radius: 1200 }, // NEW
    { id: "bile", type: "lake", name: "Біле озеро", area: "4.53 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Bile_Lake_Rivne.jpg/800px-Bile_Lake_Rivne.jpg", color: "#e0ffff", center: [51.48, 25.75], radius: 2500 },
    { id: "nobel", type: "lake", name: "Нобель", area: "4.99 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nobel_lake.jpg/800px-Nobel_lake.jpg", color: "#06b6d4", center: [51.86, 25.76], radius: 3000 },

    // CITY LAKES
    { id: "vishenske", type: "lake", name: "Вишенське озеро", area: "0.2 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Vishenske_Lake_Vinnytsia.jpg/800px-Vishenske_Lake_Vinnytsia.jpg", color: "#0ea5e9", center: [49.23, 28.43], radius: 1200 },
    { id: "ternopil_pond", type: "lake", name: "Тернопільський став", area: "3.2 км²", description: "Окраса міста Тернопіль.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ternopil_Pond_Sunset.jpg/800px-Ternopil_Pond_Sunset.jpg", color: "#3b82f6", center: [49.55, 25.57], radius: 3000 }, // NEW
    { id: "basiv_kut", type: "lake", name: "Басів Кут", area: "1 км²", description: "Рівне.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Basiv_Kut_Lake_Rivne.jpg/800px-Basiv_Kut_Lake_Rivne.jpg", color: "#3b82f6", center: [50.60, 26.24], radius: 2000 }, // NEW

    // --- LYMANS ---
    { id: "kuyalnik", type: "lake", name: "Куяльник", tags: ["top"], area: "56 км²", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Kuyalnik_Estuary_Salt.jpg/800px-Kuyalnik_Estuary_Salt.jpg", color: "#db2777", center: [46.68, 30.72], radius: 5000 },
    { id: "dnister_liman", type: "lake", name: "Дністровський лиман", tags: ["top"], area: "360 км²", image: "https://images.unsplash.com/photo-1585822765692-a169b472e391?auto=format&fit=crop&w=600&q=80", color: "#3b82f6", center: [46.15, 30.35], radius: 11000 },
    { id: "sasik", type: "lake", name: "Сасик", area: "210 км²", image: "https://images.unsplash.com/photo-1496504175726-0e6d63bb1c58?auto=format&fit=crop&w=600&q=80", color: "#06b6d4", center: [45.65, 29.65], radius: 9000 },
    { id: "alibey", type: "lake", name: "Алібей", area: "72 км²", image: "https://images.unsplash.com/photo-1621262070805-4c01fe43372c?auto=format&fit=crop&w=600&q=80", color: "#2dd4bf", center: [45.78, 30.00], radius: 5000 },
    { id: "shagany", type: "lake", name: "Шагани", area: "70 км²", image: "https://images.unsplash.com/photo-1596706037582-7aa7c1809033?auto=format&fit=crop&w=600&q=80", color: "#2dd4bf", center: [45.72, 29.85], radius: 4500 },
    { id: "burnas", type: "lake", name: "Бурнас", area: "60 км²", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", color: "#2dd4bf", center: [45.83, 30.12], radius: 4000 },
    { id: "tyligul", type: "lake", name: "Тилігул", area: "135 км²", image: "https://images.unsplash.com/photo-1596541655077-d4f107c87c06?auto=format&fit=crop&w=600&q=80", color: "#3b82f6", center: [46.85, 31.10], radius: 6000 },
    { id: "syvash", type: "lake", name: "Сиваш", tags: ["top"], area: "2560 км²", image: "https://images.unsplash.com/photo-1618239021482-1e967a659cc6?auto=format&fit=crop&w=600&q=80", color: "#f472b6", center: [46.1, 34.3], radius: 18000 },

    // --- RESERVOIRS ---
    { id: "kyiv_res", type: "reservoir", name: "Київське море", area: "922 км²", color: "#2563eb", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kyiv_Reservoir_View.jpg/800px-Kyiv_Reservoir_View.jpg", path: [[50.55, 30.5], [50.7, 30.35], [51.0, 30.45], [51.15, 30.6], [50.8, 30.7]] },
    { id: "kaniv_res", type: "reservoir", name: "Канівське", area: "675 км²", color: "#2563eb", image: "https://images.unsplash.com/photo-1582223783936-23b9b4f23b7e?auto=format&fit=crop&w=600&q=80", path: [[50.4, 30.6], [50.1, 30.8], [49.8, 31.2], [49.75, 31.4]] },
    { id: "kremenchuk_res", type: "reservoir", name: "Кременчуцьке", area: "2250 км²", color: "#2563eb", image: "https://images.unsplash.com/photo-1563720223523-49035ee8b1ef?auto=format&fit=crop&w=600&q=80", path: [[49.5, 32.0], [49.3, 32.5], [49.2, 33.0], [49.4, 32.8], [49.6, 32.2]] },
    { id: "dnipro_res", type: "reservoir", name: "Дніпровське", area: "410 км²", color: "#2563eb", image: "https://images.unsplash.com/photo-1596706782352-09411833503f?auto=format&fit=crop&w=600&q=80", path: [[48.5, 35.0], [48.3, 35.2], [48.0, 35.1]] },
    { id: "kakhovka_res", type: "reservoir", name: "Каховське", area: "2150 км²", color: "#64748b", image: "https://images.unsplash.com/photo-1614713702119-94b155550a6a?auto=format&fit=crop&w=600&q=80", path: [[47.7, 35.1], [47.5, 34.5], [47.2, 34.0], [46.8, 33.4], [47.4, 34.8]] },

    // --- MARSHES & CAVES ---
    { id: "polissya", type: "marsh", name: "Поліські болота", description: "'Легені' України.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Polissya_Nature_Reserve_Forest.jpg/800px-Polissya_Nature_Reserve_Forest.jpg", color: "#4d7c0f", path: [[51.5, 24.5], [51.8, 25.5], [51.8, 27.5], [51.4, 27.5], [51.2, 25.5]] },
    { id: "opt", type: "cave", name: "Оптимістична", description: "Печера.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Optymistychna_Cave_Gallery.jpg/800px-Optymistychna_Cave_Gallery.jpg", color: "#ffffff", center: [48.73, 25.98], radius: 1200 },

    // --- AQUFIERS ---
    { id: "dnipro_basin", type: "groundwater", name: "Дніпровський басейн", color: "#a855f7", description: "Центральна Україна.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Central_Ukraine_Landscape.jpg/800px-Central_Ukraine_Landscape.jpg", path: [[51.8, 31.0], [51.5, 33.5], [50.5, 35.5], [49.0, 36.5], [48.0, 35.0], [48.5, 33.0], [49.5, 31.0], [51.0, 30.5], [51.8, 31.0]] },
    { id: "volyn_basin", type: "groundwater", name: "Волино-Подільський", color: "#d946ef", description: "Волинське Полісся.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Volyn_Forest_Road.jpg/800px-Volyn_Forest_Road.jpg", path: [[51.8, 23.5], [51.8, 27.0], [50.0, 27.5], [49.0, 26.5], [48.5, 24.5], [51.8, 23.5]] },
    { id: "black_sea_basin", type: "groundwater", name: "Причорноморський", color: "#8b5cf6", description: "Причорноморський степ.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Askania_Nova_Steppe.jpg/800px-Askania_Nova_Steppe.jpg", path: [[46.8, 29.5], [47.5, 32.0], [47.2, 35.5], [46.0, 35.0], [45.5, 30.0], [46.8, 29.5]] }
];
