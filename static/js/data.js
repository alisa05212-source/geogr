/**
 * GEO_DATA - ULTIMATE HYDROLATLAS UKRAINE (v4.0)
 * Total Entities: 80+
 * Format: [Lat, Lng]
 */

const RIVER_COLOR = "#0ea5e9"; // Official Atlas Blue
const LAKE_COLOR = "#06b6d4";  // Freshwater Teal
const SALT_COLOR = "#db2777";  // Salty Pink
const GROUND_COLOR = "#a855f7"; // Aquifer Purple

const CITIES = [
    { name: "Київ", coords: [50.45, 30.52], type: "city", description: "Столиця України на Дніпрі." },
    { name: "Дніпро", coords: [48.46, 35.04], type: "city", description: "Мегаполіс на обох берегах Дніпра." },
    { name: "Запоріжжя", coords: [47.83, 35.13], type: "city", description: "Місто козацької слави." },
    { name: "Львів", coords: [49.83, 24.02], type: "city", description: "Серце Галичини." },
    { name: "Одеса", coords: [46.48, 30.72], type: "city", description: "Південна Пальміра." },
    { name: "Харків", coords: [49.99, 36.23], type: "city", description: "Індустріальний та студентський центр." },
    { name: "Миколаїв", coords: [46.97, 31.99], type: "city", description: "Місто корабелів." },
    { name: "Херсон", coords: [46.63, 32.61], type: "city", description: "Ключ до Криму." }
];

const GEO_DATA = [
    // === MAJOR ARTERIES ===
    {
        id: "dnipro", type: "river", name: "Дніпро", tags: ["top"], length: "2 201 км",
        description: "Головна річка України.", color: RIVER_COLOR,
        path: [[51.9, 30.6], [51.5, 30.5], [51.2, 30.45], [50.9, 30.4], [50.6, 30.45], [50.5, 30.5], [50.4, 30.55], [50.3, 30.6], [50.0, 31.0], [49.8, 31.2], [49.6, 31.4], [49.4, 31.9], [49.3, 32.2], [49.2, 32.5], [49.1, 33.0], [48.9, 33.5], [48.8, 34.0], [48.6, 34.3], [48.5, 34.6], [48.45, 35.0], [48.4, 35.1], [48.2, 35.15], [48.0, 35.1], [47.8, 35.0], [47.5, 34.8], [47.3, 34.4], [47.1, 34.0], [47.0, 33.6], [46.8, 33.3], [46.7, 33.0], [46.45, 32.1]]
    },
    {
        id: "dnister", type: "river", name: "Дністер", tags: ["top"], length: "1 362 км",
        description: "Дністровський каньйон - одне з 7 чудес України.", color: RIVER_COLOR,
        path: [[49.2, 22.8], [49.4, 23.6], [49.2, 24.3], [49.0, 24.8], [48.8, 25.4], [48.6, 26.2], [48.5, 27.0], [48.5, 27.8], [48.0, 28.3], [47.5, 28.8], [47.0, 29.5], [46.3, 30.3]]
    },
    {
        id: "pivdenny_bug", type: "river", name: "Південний Буг", length: "806 км",
        description: "Мигійські пороги, рафтинг.", color: RIVER_COLOR,
        path: [[49.6, 26.5], [49.4, 27.2], [49.3, 28.0], [49.2, 28.55], [49.0, 28.7], [48.6, 29.2], [48.2, 30.0], [47.8, 31.1], [47.3, 31.5], [46.9, 32.0]]
    },

    // === DNIEPER SYSTEM (LEFT BANK) ===
    { id: "desna", type: "river", name: "Десна", length: "1130 км", color: RIVER_COLOR, path: [[52.2, 33.3], [51.9, 33.0], [51.6, 32.5], [51.4, 31.8], [51.2, 31.0], [50.55, 30.55]] },
    { id: "seim", type: "river", name: "Сейм", length: "748 км", color: RIVER_COLOR, path: [[51.6, 35.5], [51.4, 34.5], [51.4, 33.5], [51.45, 32.7]] },
    { id: "snov", type: "river", name: "Снов", length: "253 км", color: RIVER_COLOR, path: [[52.2, 32.0], [51.9, 31.9], [51.5, 31.6]] },
    { id: "oster", type: "river", name: "Остер", length: "199 км", color: RIVER_COLOR, path: [[51.1, 31.9], [50.9, 31.5], [50.9, 30.9]] },
    { id: "trubizh", type: "river", name: "Трубіж", length: "113 км", color: RIVER_COLOR, path: [[50.5, 31.2], [50.3, 31.4], [50.0, 31.5]] },
    { id: "supiy", type: "river", name: "Супій", length: "144 км", color: RIVER_COLOR, path: [[50.4, 31.8], [50.1, 31.9], [49.8, 32.0]] },
    { id: "sula", type: "river", name: "Сула", length: "363 км", color: RIVER_COLOR, path: [[50.8, 33.5], [50.5, 33.2], [50.2, 33.0], [49.8, 32.8], [49.5, 32.7]] },
    { id: "psel", type: "river", name: "Псел", length: "717 км", color: RIVER_COLOR, path: [[51.0, 35.0], [50.5, 34.5], [50.0, 34.0], [49.5, 33.8], [49.0, 33.5]] },
    { id: "khorol", type: "river", name: "Хорол", length: "308 км", color: RIVER_COLOR, path: [[50.3, 33.5], [50.0, 33.6], [49.7, 33.4], [49.4, 33.5]] },
    { id: "vorskla", type: "river", name: "Ворскла", length: "464 км", color: RIVER_COLOR, path: [[50.5, 35.8], [50.2, 35.5], [49.8, 35.0], [49.5, 34.5], [49.0, 34.2], [48.8, 34.1]] },
    { id: "oril", type: "river", name: "Оріль", length: "346 км", color: RIVER_COLOR, path: [[49.1, 35.5], [48.9, 35.0], [48.7, 34.6]] },
    { id: "samara", type: "river", name: "Самара", length: "320 км", color: RIVER_COLOR, path: [[48.8, 36.5], [48.6, 36.0], [48.5, 35.5], [48.45, 35.1]] },
    { id: "vovcha_samara", type: "river", name: "Вовча", length: "323 км", color: RIVER_COLOR, path: [[48.0, 37.5], [48.1, 36.8], [48.3, 36.2], [48.5, 35.8]] },

    // === DNIEPER SYSTEM (RIGHT BANK) ===
    { id: "pripyat", type: "river", name: "Прип'ять", length: "761 км", color: RIVER_COLOR, path: [[51.7, 24.3], [51.85, 26.0], [51.8, 28.0], [51.3, 30.2]] },
    { id: "horyn", type: "river", name: "Горинь", length: "659 км", color: RIVER_COLOR, path: [[50.0, 25.8], [50.5, 26.4], [51.2, 26.6], [51.8, 26.8], [52.0, 26.9]] },
    { id: "styr", type: "river", name: "Стир", length: "494 км", color: RIVER_COLOR, path: [[49.9, 25.2], [50.5, 25.2], [51.0, 25.5], [51.8, 26.1]] },
    { id: "sluch", type: "river", name: "Случ", length: "451 км", color: RIVER_COLOR, path: [[49.6, 26.7], [50.2, 27.5], [51.0, 26.8], [51.4, 26.6]] },
    { id: "uzh_pol", type: "river", name: "Уж (Полісся)", length: "256 км", color: RIVER_COLOR, path: [[50.7, 28.2], [51.1, 29.2], [51.25, 30.2]] },
    { id: "teteriv", type: "river", name: "Тетерів", length: "365 км", color: RIVER_COLOR, path: [[49.8, 28.3], [50.3, 29.0], [50.8, 30.0], [51.0, 30.3]] },
    { id: "irpin", type: "river", name: "Ірпінь", length: "162 км", color: RIVER_COLOR, path: [[50.0, 29.4], [50.5, 30.2], [50.8, 30.4]] },
    { id: "ros", type: "river", name: "Рось", length: "346 км", color: RIVER_COLOR, path: [[49.2, 29.5], [49.6, 30.5], [49.5, 31.5]] },
    { id: "tiasmyn", type: "river", name: "Тясмин", length: "164 км", color: RIVER_COLOR, path: [[49.0, 31.8], [49.2, 32.6], [49.0, 32.8]] },
    { id: "inhulets", type: "river", name: "Інгулець", length: "549 км", color: RIVER_COLOR, path: [[48.5, 32.5], [48.2, 33.0], [47.2, 32.8], [46.7, 32.7]] },
    { id: "saksahan", type: "river", name: "Саксагань", length: "144 км", color: RIVER_COLOR, path: [[48.4, 34.0], [48.0, 33.5], [47.9, 33.3]] },
    { id: "bazavluk", type: "river", name: "Базавлук", length: "157 км", color: RIVER_COLOR, path: [[48.3, 34.2], [47.7, 33.9], [47.5, 34.0]] },

    // === DNIESTER SYSTEM TRIBUTARIES ===
    { id: "stryi", type: "river", name: "Стрий", length: "232 км", color: RIVER_COLOR, path: [[49.0, 23.2], [49.2, 23.9], [49.3, 24.2]] },
    { id: "limnytsia", type: "river", name: "Лімниця", length: "122 км", color: RIVER_COLOR, path: [[48.6, 24.0], [48.8, 24.3], [49.0, 24.6]] },
    { id: "bystrytsia", type: "river", name: "Бистриця", length: "101 км", color: RIVER_COLOR, path: [[48.5, 24.4], [48.7, 24.6], [48.9, 24.8]] },
    { id: "seret", type: "river", name: "Серет", length: "242 км", color: RIVER_COLOR, path: [[49.8, 25.3], [49.3, 25.6], [48.6, 25.8]] },
    { id: "strypa", type: "river", name: "Стрипа", length: "147 км", color: RIVER_COLOR, path: [[49.7, 25.2], [49.1, 25.4], [48.8, 25.4]] },
    { id: "zbruch", type: "river", name: "Збруч", length: "244 км", color: RIVER_COLOR, path: [[49.6, 26.2], [49.0, 26.2], [48.5, 26.4]] },

    // === SOUTHERN BASINS ===
    { id: "syniukha", type: "river", name: "Синюха", length: "111 км", color: RIVER_COLOR, path: [[48.8, 30.6], [48.4, 30.8], [48.1, 30.9]] },
    { id: "inhul", type: "river", name: "Інгул", length: "354 км", color: RIVER_COLOR, path: [[48.7, 32.2], [48.0, 32.4], [47.0, 32.0]] },

    // === DANUBE & CARPATHIANS ===
    { id: "danube", type: "river", name: "Дунай", length: "2850 км", color: "#818cf8", path: [[45.5, 28.2], [45.4, 28.8], [45.2, 29.6]] },
    { id: "tysa", type: "river", name: "Тиса", length: "966 км", color: "#818cf8", path: [[48.0, 24.2], [48.2, 23.5], [48.1, 23.0]] },
    { id: "prut", type: "river", name: "Прут", length: "967 км", color: "#818cf8", path: [[48.4, 24.5], [48.2, 26.5], [47.0, 28.0], [46.0, 28.2]] },
    { id: "latorytsia", type: "river", name: "Латориця", length: "188 км", color: "#818cf8", path: [[48.7, 23.0], [48.5, 22.8], [48.4, 22.4]] },
    { id: "uzh_zak", type: "river", name: "Уж (Закарпаття)", length: "133 км", color: "#818cf8", path: [[48.9, 22.8], [48.7, 22.5], [48.6, 22.3]] },

    // === AZOV & CRIMEAN RIVERS ===
    { id: "siversky_donets", type: "river", name: "Сіверський Донець", tags: ["top"], length: "1053 км", color: "#2563eb", path: [[50.6, 36.8], [50.0, 36.9], [49.3, 37.0], [48.7, 39.0], [48.3, 40.0]] },
    { id: "oskil", type: "river", name: "Оскіл", length: "472 км", color: "#2563eb", path: [[50.5, 37.8], [49.5, 37.5], [49.1, 37.4]] },
    { id: "aidar", type: "river", name: "Айдар", length: "264 км", color: "#2563eb", path: [[50.0, 38.8], [49.0, 39.2], [48.7, 39.3]] },
    { id: "kalmius", type: "river", name: "Кальміус", length: "209 км", color: "#f472b6", path: [[48.0, 37.8], [47.4, 37.7], [47.1, 37.6]] },
    { id: "molochna", type: "river", name: "Молочна", length: "197 км", color: "#fca5a5", path: [[47.2, 35.8], [46.7, 35.3]] },
    { id: "salhir", type: "river", name: "Салгир", length: "232 км", color: "#fca5a5", path: [[44.9, 34.1], [45.5, 34.8], [45.7, 35.0]] },

    // === LAKES (ALL RESTORED + NEW) ===
    { id: "svityaz", type: "lake", name: "Світязь", tags: ["top"], area: "26.2 км²", color: LAKE_COLOR, center: [51.50, 23.85], radius: 5000 },
    { id: "pulemetske", type: "lake", name: "Пулемецьке", area: "16.4 км²", color: LAKE_COLOR, center: [51.56, 23.77], radius: 3000 },
    { id: "synevyr", type: "lake", name: "Синевир", tags: ["top"], area: "0.04 км²", color: LAKE_COLOR, center: [48.617, 23.684], radius: 2000 },
    { id: "yalpuh", type: "lake", name: "Ялпуг", tags: ["top"], area: "149 км²", color: LAKE_COLOR, center: [45.42, 28.60], radius: 9000 },
    { id: "kugurluy", type: "lake", name: "Кугурлуй", area: "82 км²", color: LAKE_COLOR, center: [45.28, 28.65], radius: 6000 },
    { id: "kahul", type: "lake", name: "Кагул", area: "90 км²", color: LAKE_COLOR, center: [45.37, 28.40], radius: 5000 },
    { id: "katlabuh", type: "lake", name: "Катлабух", area: "67 км²", color: LAKE_COLOR, center: [45.52, 28.98], radius: 4500 },
    { id: "kitay", type: "lake", name: "Китай", area: "60 км²", color: LAKE_COLOR, center: [45.65, 29.30], radius: 4000 },
    { id: "donuzlav", type: "lake", name: "Донузлав", tags: ["top"], area: "48 км²", color: LAKE_COLOR, center: [45.35, 33.00], radius: 7000 },
    { id: "sasyk_syvash", type: "lake", name: "Сасик-Сиваш", color: SALT_COLOR, center: [45.18, 33.50], radius: 6000 },
    { id: "lemurian", type: "lake", name: "Лемурійське озеро", tags: ["top"], color: SALT_COLOR, center: [46.24, 33.78], radius: 3000 },
    { id: "kuyalnik", type: "lake", name: "Куяльник", tags: ["top"], color: SALT_COLOR, center: [46.68, 30.72], radius: 5000 },
    { id: "syvash", type: "lake", name: "Сиваш", tags: ["top"], color: SALT_COLOR, center: [46.1, 34.3], radius: 15000 },
    { id: "molochnyi_liman", type: "lake", name: "Молочний лиман", color: LAKE_COLOR, center: [46.52, 35.35], radius: 7000 },
    { id: "blue_lakes", type: "lake", name: "Голубі озера", color: LAKE_COLOR, center: [51.96, 31.15], radius: 2000 },
    { id: "shelekhiv", type: "lake", name: "Шелехівське", color: LAKE_COLOR, center: [50.71, 34.50], radius: 1000 },

    // === RESERVOIRS ===
    { id: "kyiv_res", type: "reservoir", name: "Київське море", color: "#2563eb", path: [[50.55, 30.5], [51.0, 30.45], [51.15, 30.6], [50.8, 30.7], [50.55, 30.5]] },
    { id: "kaniv_res", type: "reservoir", name: "Канівське", color: "#2563eb", path: [[50.4, 30.6], [49.8, 31.2], [49.75, 31.4]] },
    { id: "kremenchuk_res", type: "reservoir", name: "Кременчуцьке", color: "#2563eb", path: [[49.5, 32.0], [49.2, 33.0], [49.6, 32.2]] },
    { id: "kakhovka_res", type: "reservoir", name: "Каховське", color: "#2563eb", path: [[47.7, 35.1], [46.8, 33.4], [47.4, 34.8]] },

    // === AQUIFERS (GROUNDWATER) ===
    { id: "dnipro_basin", type: "groundwater", name: "Дніпровський басейн", color: GROUND_COLOR, path: [[51.8, 31.0], [51.5, 33.5], [50.5, 35.5], [49.0, 36.5], [48.0, 35.0], [48.5, 33.0], [49.5, 31.0], [51.0, 30.5], [51.8, 31.0]] },
    { id: "volyn_basin", type: "groundwater", name: "Волино-Подільський", color: GROUND_COLOR, path: [[51.8, 23.5], [51.8, 27.0], [50.0, 27.5], [48.5, 24.5], [51.8, 23.5]] },
];
