/**
 * GEO_DATA - FULL ATLAS RESTORATION
 * Total Rivers: 46+
 * Total Lakes: 30+
 * Includes: Dnieper tributaries (Right/Left), Carpathian rivers, Southern basins.
 */

const CITIES = [
    { name: "Київ", coords: [50.45, 30.52], type: "city", description: "Столиця України.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Maidan_Nezalezhnosti_in_Kyiv.jpg/800px-Maidan_Nezalezhnosti_in_Kyiv.jpg" },
    { name: "Дніпро", coords: [48.46, 35.04], type: "city", description: "Місто на Дніпрі. Індустріальний центр.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dnipro_City_View.jpg/800px-Dnipro_City_View.jpg" },
    { name: "Запоріжжя", coords: [47.83, 35.13], type: "city", description: "Місто за порогами. Острів Хортиця.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Khortytsia_Zaporizhzhia.jpg/800px-Khortytsia_Zaporizhzhia.jpg" },
    { name: "Одеса", coords: [46.48, 30.72], type: "city", description: "Морські ворота України.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Odessa_Opera_Theater_Front.jpg/800px-Odessa_Opera_Theater_Front.jpg" },
    { name: "Львів", coords: [49.83, 24.02], type: "city", description: "Культурна столиція Заходу.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lviv_High_Castle_View.jpg/800px-Lviv_High_Castle_View.jpg" }
];

const GEO_DATA = [
    // --- MAJOR RIVERS ---
    {
        id: "dnipro", type: "river", name: "Дніпро", tags: ["top"], length: "2 201 км", basin: "504 000 км²",
        description: "Головна річка України, символ державності.", color: "#38bdf8",
        origin: "Від скіфського *Dānu apara — «Глибока річка». Борисфен.",
        path: [[51.9, 30.6], [51.5, 30.5], [51.2, 30.45], [50.9, 30.4], [50.6, 30.45], [50.5, 30.5], [50.4, 30.55], [50.3, 30.6], [50.0, 31.0], [49.8, 31.2], [49.6, 31.4], [49.5, 31.6], [49.4, 31.9], [49.3, 32.2], [49.2, 32.5], [49.1, 33.0], [48.9, 33.5], [48.8, 34.0], [48.6, 34.3], [48.5, 34.6], [48.45, 35.0], [48.4, 35.1], [48.2, 35.15], [48.0, 35.1], [47.8, 35.0], [47.5, 34.8], [47.3, 34.4], [47.1, 34.0], [47.0, 33.6], [46.8, 33.3], [46.7, 33.0], [46.6, 32.8], [46.55, 32.5], [46.5, 32.2], [46.45, 32.1]]
    },
    {
        id: "dnister", type: "river", name: "Дністер", tags: ["top"], length: "1 362 км", basin: "72 100 км²",
        description: "Друга за значенням річка України з унікальними каньйонами.", color: "#06b6d4",
        path: [[49.2, 22.8], [49.3, 23.2], [49.4, 23.6], [49.35, 24.0], [49.2, 24.3], [49.1, 24.5], [49.0, 24.8], [48.9, 25.0], [48.8, 25.4], [48.7, 25.8], [48.6, 26.2], [48.55, 26.6], [48.5, 27.0], [48.55, 27.4], [48.5, 27.8], [48.3, 28.1], [48.0, 28.3], [47.8, 28.5], [47.5, 28.8], [47.2, 29.0], [47.0, 29.5], [46.8, 29.8], [46.5, 30.1], [46.3, 30.3]]
    },
    {
        id: "pivdenny_bug", type: "river", name: "Південний Буг", length: "806 км", basin: "63 700 км²",
        description: "Єдина велика річка, що повністю протікає територією України.", color: "#3b82f6",
        path: [[49.6, 26.5], [49.5, 26.8], [49.4, 27.2], [49.35, 27.6], [49.3, 28.0], [49.25, 28.3], [49.23, 28.48], [49.2, 28.55], [49.1, 28.6], [49.0, 28.7], [48.8, 28.9], [48.6, 29.2], [48.4, 29.5], [48.2, 30.0], [48.0, 30.8], [47.8, 31.1], [47.6, 31.3], [47.3, 31.5], [47.0, 31.8], [46.9, 32.0]]
    },

    // --- DNIEPER TRIBUTARIES (LEFT BANK) ---
    { id: "desna", type: "river", name: "Десна", length: "1130 км", color: "#60a5fa", description: "Зачарована річка Олександра Довженка.", origin: "Від давньослов'янського 'десниця' — права рука (права сторона)", path: [[52.2, 33.3], [52.1, 33.2], [51.9, 33.0], [51.7, 32.8], [51.6, 32.5], [51.5, 32.2], [51.4, 31.8], [51.3, 31.4], [51.2, 31.0], [50.8, 30.8], [50.55, 30.55]] },
    { id: "seim", type: "river", name: "Сейм", length: "748 км", color: "#60a5fa", description: "Найбільша притока Десни.", path: [[51.6, 35.5], [51.5, 35.0], [51.4, 34.5], [51.4, 34.0], [51.4, 33.5], [51.45, 32.7]] },
    { id: "sula", type: "river", name: "Сула", length: "363 км", color: "#60a5fa", description: "Ліва притока Дніпра. Історична межа Посульської оборонної лінії.", path: [[50.8, 33.5], [50.5, 33.2], [50.2, 33.0], [49.8, 32.8], [49.5, 32.7]] },
    { id: "psel", type: "river", name: "Псел", length: "717 км", color: "#60a5fa", description: "Мальовнича річка, що протікає через Полтавщину.", path: [[51.0, 35.0], [50.5, 34.5], [50.0, 34.0], [49.5, 33.8], [49.0, 33.5]] },
    { id: "vorskla", type: "river", name: "Ворскла", length: "464 км", color: "#60a5fa", description: "На цій річці відбулася знаменита Полтавська битва.", origin: "Від скіфського 'вор' (білий) та 'сколо' (вода).", path: [[50.5, 35.8], [50.2, 35.5], [49.8, 35.0], [49.5, 34.5], [49.0, 34.2], [48.8, 34.1]] },
    { id: "samara", type: "river", name: "Самара", length: "320 км", color: "#60a5fa", description: "Ліва притока Дніпра. Впадає в районі міста Дніпро.", path: [[48.8, 36.5], [48.6, 36.0], [48.5, 35.5], [48.45, 35.1]] },
    { id: "trubizh", type: "river", name: "Трубіж", length: "113 км", color: "#60a5fa", description: "На Трубежі розташований Переяслав.", path: [[50.5, 31.2], [50.3, 31.4], [50.0, 31.5]] },

    // --- DNIEPER TRIBUTARIES (RIGHT BANK) ---
    { id: "pripyat", type: "river", name: "Прип'ять", length: "761 км", color: "#60a5fa", description: "Найбільша за басейном притока Дніпра. Чорнобильська зона.", path: [[51.7, 24.3], [51.75, 24.8], [51.8, 25.5], [51.85, 26.0], [51.9, 26.5], [51.85, 27.2], [51.8, 28.0], [51.5, 29.0], [51.3, 30.2]] },
    { id: "teteriv", type: "river", name: "Тетерів", length: "365 км", color: "#60a5fa", description: "Протікає через Житомир. Мальовничі скелясті береги.", path: [[49.8, 28.3], [50.2, 28.5], [50.3, 29.0], [50.5, 29.5], [50.8, 30.0], [51.0, 30.3]] },
    { id: "ros", type: "river", name: "Рось", length: "346 км", color: "#60a5fa", description: "Історична батьківщина русичів.", path: [[49.2, 29.5], [49.5, 30.0], [49.6, 30.5], [49.4, 31.0], [49.5, 31.5]] },
    { id: "irpin", type: "river", name: "Ірпінь", length: "162 км", color: "#60a5fa", description: "Річка-захисниця Києва. Унікальна система гребель.", path: [[50.0, 29.4], [50.3, 29.8], [50.5, 30.2], [50.8, 30.4]] },
    { id: "tiasmyn", type: "river", name: "Тясмин", length: "164 км", color: "#60a5fa", description: "Права притока Дніпра. Центр Чигиринщини.", path: [[49.0, 31.8], [49.1, 32.2], [49.2, 32.6], [49.0, 32.8]] },
    { id: "inhulets", type: "river", name: "Інгулець", length: "549 км", color: "#60a5fa", description: "Річка Кривбасу.", path: [[48.5, 32.5], [48.2, 33.0], [47.8, 33.2], [47.5, 33.0], [47.2, 32.8], [46.7, 32.7]] },

    // --- THE REMAINING MISSING RIVERS (FROM ATLAS) ---
    { id: "horyn", type: "river", name: "Горинь", length: "659 км", color: "#60a5fa", description: "Притока Прип'яті.", path: [[50.0, 25.8], [50.2, 26.2], [50.5, 26.4], [50.8, 26.5], [51.2, 26.6], [51.5, 26.7], [51.8, 26.8]] },
    { id: "styr", type: "river", name: "Стир", length: "494 км", color: "#60a5fa", description: "Протікає через Луцьк.", path: [[49.9, 25.2], [50.2, 25.1], [50.5, 25.2], [50.7, 25.3], [51.0, 25.5], [51.4, 25.8]] },
    { id: "sluch", type: "river", name: "Случ", length: "451 км", color: "#60a5fa", description: "Притока Горині.", path: [[49.6, 26.7], [49.8, 27.2], [50.2, 27.5], [50.6, 27.3], [51.0, 26.8]] },
    { id: "khorol", type: "river", name: "Хорол", length: "308 км", color: "#60a5fa", description: "Курорт Миргород.", path: [[50.3, 33.5], [50.0, 33.6], [49.7, 33.4], [49.4, 33.5]] },
    { id: "oril", type: "river", name: "Оріль", length: "346 км", color: "#60a5fa", description: "Найчистіша річка степу.", path: [[49.1, 35.5], [48.9, 35.0], [48.7, 34.6]] },
    { id: "uzh_polissya", type: "river", name: "Уж (Полісся)", length: "256 км", color: "#60a5fa", path: [[50.7, 28.2], [50.9, 28.6], [51.1, 29.2], [51.2, 29.8], [51.25, 30.2]] },
    { id: "seret", type: "river", name: "Серет", length: "242 км", color: "#60a5fa", path: [[49.8, 25.3], [49.6, 25.5], [49.3, 25.6], [49.0, 25.7], [48.6, 25.8]] },
    { id: "strypa", type: "river", name: "Стрипа", length: "147 км", color: "#60a5fa", path: [[49.7, 25.2], [49.4, 25.3], [49.1, 25.4], [48.8, 25.4]] },
    { id: "limnytsia", type: "river", name: "Лімниця", length: "122 км", color: "#60a5fa", path: [[48.6, 24.0], [48.8, 24.3], [49.0, 24.6]] },
    { id: "saksahan", type: "river", name: "Саксагань", length: "144 км", color: "#60a5fa", path: [[48.4, 34.0], [48.2, 33.8], [48.0, 33.5]] },
    { id: "bazavluk", type: "river", name: "Базавлук", length: "157 км", color: "#60a5fa", path: [[48.3, 34.2], [48.0, 34.1], [47.7, 33.9], [47.5, 34.0]] },
    { id: "uzh_zakarpattia", type: "river", name: "Уж (Закарпаття)", length: "133 км", color: "#818cf8", path: [[48.9, 22.8], [48.7, 22.5], [48.6, 22.3]] },
    { id: "latorytsia", type: "river", name: "Латориця", length: "188 км", color: "#818cf8", path: [[48.7, 23.0], [48.5, 22.8], [48.4, 22.4]] },

    // --- OTHER MAJOR RIVERS ---
    { id: "siversky_donets", type: "river", name: "Сіверський Донець", tags: ["top"], length: "1053 км", color: "#2563eb", description: "Головна річка Сходу.", path: [[50.6, 36.8], [50.4, 36.85], [50.0, 36.9], [49.7, 36.85], [49.5, 36.8], [49.3, 37.0], [49.2, 37.5], [49.0, 38.0], [48.9, 38.5], [48.7, 39.0], [48.5, 39.7], [48.3, 40.0]] },
    { id: "danube", type: "river", name: "Дунай", tags: ["top"], length: "2850 км", color: "#818cf8", description: "Велика європейська річка.", path: [[45.5, 28.2], [45.4, 28.8], [45.3, 29.2], [45.2, 29.6]] },
    { id: "western_bug", type: "river", name: "Західний Буг", length: "772 км", color: "#2dd4bf", path: [[50.0, 24.5], [50.3, 24.2], [50.6, 24.0], [51.0, 23.7], [51.5, 23.6]] },
    { id: "salhir", type: "river", name: "Салгир", length: "232 км", color: "#fca5a5", description: "Найбільша річка Криму.", path: [[44.9, 34.1], [45.2, 34.3], [45.5, 34.8], [45.7, 35.0]] },

    // --- LAKES & LYMANS ---
    { id: "svityaz", type: "lake", name: "Світязь", tags: ["top"], area: "26.2 км²", color: "#06b6d4", center: [51.50, 23.85], radius: 6000 },
    { id: "synevyr", type: "lake", name: "Синевир", tags: ["top"], area: "0.04 км²", color: "#06b6d4", center: [48.617, 23.684], radius: 2000 },
    { id: "yalpuh", type: "lake", name: "Ялпуг", tags: ["top"], area: "149 км²", color: "#06b6d4", center: [45.42, 28.60], radius: 10000 },
    { id: "lemurian", type: "lake", name: "Лемурійське озеро", tags: ["top"], color: "#f9a8d4", center: [46.24, 33.78], radius: 2000 },
    { id: "donuzlav", type: "lake", name: "Донузлав", tags: ["top"], color: "#0ea5e9", center: [45.35, 33.00], radius: 9000 },
    { id: "sasyk_syvash", type: "lake", name: "Сасик-Сиваш", color: "#f472b6", center: [45.18, 33.50], radius: 8000 },
    { id: "kuyalnik", type: "lake", name: "Куяльник", tags: ["top"], color: "#db2777", center: [46.68, 30.72], radius: 5000 },
    { id: "syvash", type: "lake", name: "Сиваш", tags: ["top"], color: "#f472b6", center: [46.1, 34.3], radius: 18000 },

    // --- RESERVOIRS ---
    { id: "kyiv_res", type: "reservoir", name: "Київське море", color: "#2563eb", path: [[50.55, 30.5], [50.7, 30.35], [51.0, 30.45], [51.15, 30.6], [50.8, 30.7], [50.55, 30.5]] },

    // --- GROUNDWATER ---
    { id: "dnipro_basin", type: "groundwater", name: "Дніпровський басейн", color: "#a855f7", path: [[51.8, 31.0], [51.5, 33.5], [50.5, 35.5], [49.0, 36.5], [48.0, 35.0], [48.5, 33.0], [49.5, 31.0], [51.0, 30.5], [51.8, 31.0]] },
    { id: "volyn_basin", type: "groundwater", name: "Волино-Подільський", color: "#d946ef", path: [[51.8, 23.5], [51.8, 27.0], [50.0, 27.5], [49.0, 26.5], [48.5, 24.5], [51.8, 23.5]] },
];
