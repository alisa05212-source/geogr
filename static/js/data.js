/**
 * GEO_DATA - ULTIMATE HYDROLATLAS UKRAINE (v5.0)
 * Total Entities: 100+
 * Format: [Lat, Lng]
 */

const RIVER_COLOR = "#0ea5e9";  // Official Atlas Blue
const LAKE_COLOR = "#38bdf8";   // Brighter Freshwater Blue
const SALT_COLOR = "#f472b6";   // Vivid Pink for Salty Waters
const GROUND_COLOR = "#c084fc"; // Brighter Aquifer Purple
const MARSH_COLOR = "#4ade80";  // Emerald Green for Swamps

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
        description: "Головна річка України, символ державності.", color: RIVER_COLOR,
        path: [[51.9, 30.6], [51.5, 30.5], [51.2, 30.45], [50.9, 30.4], [50.6, 30.45], [50.5, 30.5], [50.4, 30.55], [50.3, 30.6], [50.0, 31.0], [49.8, 31.2], [49.6, 31.4], [49.4, 31.9], [49.3, 32.2], [49.2, 32.5], [49.1, 33.0], [48.9, 33.5], [48.8, 34.0], [48.6, 34.3], [48.5, 34.6], [48.45, 35.0], [48.4, 35.1], [48.2, 35.15], [48.0, 35.1], [47.8, 35.0], [47.5, 34.8], [47.3, 34.4], [47.1, 34.0], [47.0, 33.6], [46.8, 33.3], [46.7, 33.0], [46.45, 32.1]]
    },
    {
        id: "dnister", type: "river", name: "Дністер", tags: ["top"], length: "1 362 км",
        description: "Дністровський каньйон — одне з 7 природних чудес України.", color: RIVER_COLOR,
        path: [[49.2, 22.8], [49.4, 23.6], [49.2, 24.3], [49.0, 24.8], [48.8, 25.4], [48.6, 26.2], [48.5, 27.0], [48.5, 27.8], [48.0, 28.3], [47.5, 28.8], [47.0, 29.5], [46.3, 30.3]]
    },
    { id: "pivdenny_bug", type: "river", name: "Південний Буг", length: "806 км", description: "Єдина велика річка, що повністю протікає територією України.", color: RIVER_COLOR, path: [[49.6, 26.5], [49.4, 27.2], [49.3, 28.0], [49.2, 28.55], [49.0, 28.7], [48.6, 29.2], [48.2, 30.0], [47.8, 31.1], [47.3, 31.5], [46.9, 32.0]] },

    // === DNIEPER SYSTEM (LEFT BANK) ===
    { id: "desna", type: "river", name: "Десна", length: "1130 км", description: "Найбільша ліва притока Дніпра.", color: RIVER_COLOR, path: [[52.2, 33.3], [51.9, 33.0], [51.6, 32.5], [51.4, 31.8], [51.2, 31.0], [50.55, 30.55]] },
    { id: "seim", type: "river", name: "Сейм", length: "748 км", description: "Притока Десни, протікає через Суми.", color: RIVER_COLOR, path: [[51.6, 35.5], [51.4, 34.5], [51.4, 33.5], [51.45, 32.7]] },
    { id: "sula", type: "river", name: "Сула", length: "363 км", description: "Ліва притока Дніпра в Полтавській області.", color: RIVER_COLOR, path: [[50.8, 33.5], [50.5, 33.2], [50.2, 33.0], [49.8, 32.8], [49.5, 32.7]] },
    { id: "psel", type: "river", name: "Псел", length: "717 км", description: "Одна з найчистіших річок України.", color: RIVER_COLOR, path: [[51.0, 35.0], [50.5, 34.5], [50.0, 34.0], [49.5, 33.8], [49.0, 33.5]] },
    { id: "vorskla", type: "river", name: "Ворскла", length: "464 км", description: "Ліва притока Дніпра, протікає через Полтаву.", color: RIVER_COLOR, path: [[50.5, 35.8], [50.2, 35.5], [49.8, 35.0], [49.5, 34.5], [49.0, 34.2], [48.8, 34.1]] },
    { id: "oril", type: "river", name: "Оріль", length: "346 км", description: "Ліва притока Дніпра на Дніпропетровщині.", color: RIVER_COLOR, path: [[49.1, 35.5], [48.9, 35.0], [48.7, 34.6]] },
    { id: "samara", type: "river", name: "Самара", length: "320 км", description: "Ліва притока Дніпра біля міста Дніпро.", color: RIVER_COLOR, path: [[48.8, 36.5], [48.6, 36.0], [48.5, 35.5], [48.45, 35.1]] },

    // === DNIEPER SYSTEM (RIGHT BANK) ===
    { id: "pripyat", type: "river", name: "Прип'ять", length: "761 км", description: "Права притока Дніпра, протікає через Чорнобильську зону.", color: RIVER_COLOR, path: [[51.7, 24.3], [51.85, 26.0], [51.8, 28.0], [51.3, 30.2]] },
    { id: "horyn", type: "river", name: "Горинь", length: "659 км", description: "Права притока Прип'яті.", color: RIVER_COLOR, path: [[50.0, 25.8], [50.5, 26.4], [51.2, 26.6], [51.8, 26.8], [52.0, 26.9]] },
    { id: "styr", type: "river", name: "Стир", length: "494 км", description: "Права притока Прип'яті на Волині.", color: RIVER_COLOR, path: [[49.9, 25.2], [50.5, 25.2], [51.0, 25.5], [51.8, 26.1]] },
    { id: "sluch", type: "river", name: "Случ", length: "451 км", description: "Права притока Горині.", color: RIVER_COLOR, path: [[49.6, 26.7], [50.2, 27.5], [51.0, 26.8], [51.4, 26.6]] },
    { id: "teteriv", type: "river", name: "Тетерів", length: "365 км", description: "Права притока Дніпра під Києвом.", color: RIVER_COLOR, path: [[49.8, 28.3], [50.3, 29.0], [50.8, 30.0], [51.0, 30.3]] },
    { id: "ros", type: "river", name: "Рось", length: "346 км", description: "Права притока Дніпра в Київській і Черкаській областях.", color: RIVER_COLOR, path: [[49.2, 29.5], [49.6, 30.5], [49.5, 31.5]] },
    { id: "inhulets", type: "river", name: "Інгулець", length: "549 км", description: "Права притока Дніпра в Криворізькому регіоні.", color: RIVER_COLOR, path: [[48.5, 32.5], [48.2, 33.0], [47.2, 32.8], [46.7, 32.7]] },

    // === DNIESTER SYSTEM ===
    { id: "stryi", type: "river", name: "Стрий", length: "232 км", description: "Притока Дністра в Карпатах.", color: RIVER_COLOR, path: [[49.0, 23.2], [49.2, 23.9], [49.3, 24.2]] },
    { id: "seret", type: "river", name: "Серет", length: "242 км", description: "Права притока Дністра на Тернопільщині.", color: RIVER_COLOR, path: [[49.8, 25.3], [49.3, 25.6], [48.6, 25.8]] },
    { id: "zbruch", type: "river", name: "Збруч", length: "244 км", description: "Історичний кордон, притока Дністра.", color: RIVER_COLOR, path: [[49.6, 26.2], [49.0, 26.2], [48.5, 26.4]] },

    // === SOUTHERN BASINS ===
    { id: "inhul", type: "river", name: "Інгул", length: "354 км", description: "Річка на Миколаївщині.", color: RIVER_COLOR, path: [[48.7, 32.2], [48.0, 32.4], [47.0, 32.0]] },

    // === DANUBE & CARPATHIANS ===
    { id: "tysa", type: "river", name: "Тиса", length: "966 км", description: "Найбільша річка Закарпаття.", color: "#818cf8", path: [[48.0, 24.2], [48.2, 23.5], [48.1, 23.0]] },
    { id: "prut", type: "river", name: "Прут", length: "967 км", description: "Ліва притока Дунаю.", color: "#818cf8", path: [[48.4, 24.5], [48.2, 26.5], [47.0, 28.0], [46.0, 28.2]] },

    // === AZOV & DONBAS ===
    { id: "siversky_donets", type: "river", name: "Сіверський Донець", tags: ["top"], length: "1053 км", description: "Головна річка Донбасу.", color: "#2563eb", path: [[50.6, 36.8], [50.0, 36.9], [49.3, 37.0], [48.7, 39.0], [48.3, 40.0]] },
    { id: "oskil", type: "river", name: "Оскіл", length: "472 км", description: "Притока Сіверського Дінця.", color: "#2563eb", path: [[50.5, 37.8], [49.5, 37.5], [49.1, 37.4]] },
    { id: "kalmius", type: "river", name: "Кальміус", length: "209 км", description: "Річка, що протікає через Маріуполь.", color: "#f472b6", path: [[48.0, 37.8], [47.4, 37.7], [47.1, 37.6]] },

    // === RESERVOIRS (FULL DNIEPER CASCADE) ===
    { id: "kyiv_res", type: "reservoir", name: "Київське водосховище", tags: ["top"], area: "922 км²", description: "Відоме як 'Київське море'.", color: "#2563eb", path: [[50.55, 30.5], [51.0, 30.45], [51.15, 30.6], [50.8, 30.7], [50.55, 30.5]] },
    { id: "kaniv_res", type: "reservoir", name: "Канівське водосховище", area: "675 км²", description: "Тут Канівський природний заповідник.", color: "#2563eb", path: [[50.4, 30.6], [49.8, 31.2], [49.75, 31.4], [50.3, 30.8]] },
    { id: "kremenchuk_res", type: "reservoir", name: "Кременчуцьке водосховище", area: "2250 км²", description: "Найбільше водосховище України.", color: "#2563eb", path: [[49.5, 32.0], [49.2, 33.0], [48.9, 33.2], [49.6, 32.2]] },
    { id: "kamianske_res", type: "reservoir", name: "Кам'янське водосховище", area: "567 км²", description: "Забезпечує водою промвузол Дніпра.", color: "#2563eb", path: [[48.9, 33.5], [48.55, 34.3], [48.65, 34.5]] },
    { id: "dnipro_res", type: "reservoir", name: "Дніпровське водосховище", area: "410 км²", description: "Утворене греблею ДніпроГЕСу.", color: "#2563eb", path: [[48.5, 35.0], [47.85, 35.1], [48.1, 35.2]] },
    { id: "kakhovka_res_rem", type: "reservoir", name: "Каховське (історичне)", area: "2155 км²", description: "Об'єкт екологічної катастрофи.", color: "#3b82f6", path: [[47.7, 35.1], [46.85, 33.4], [47.4, 34.8]] },
    { id: "dniester_res", type: "reservoir", name: "Дністровське водосховище", area: "142 км²", description: "На Дністрі біля Новодністровська.", color: "#2563eb", path: [[48.5, 27.2], [48.5, 27.8], [48.4, 27.5]] },

    // === GROUNDWATER (AQUIFERS) ===
    { id: "dnipro_basin", type: "groundwater", name: "Дніпровський артезіанський басейн", description: "Найбільше джерело питної води.", color: GROUND_COLOR, path: [[51.8, 31.0], [51.5, 33.5], [50.5, 35.5], [49.0, 36.5], [48.0, 35.0], [48.5, 33.0], [49.5, 31.0], [51.0, 30.5], [51.8, 31.0]] },
    { id: "volyn_basin", type: "groundwater", name: "Волино-Подільський басейн", description: "Чиста вода для заходу України.", color: GROUND_COLOR, path: [[51.8, 23.5], [51.8, 27.0], [50.0, 27.5], [48.5, 24.5], [51.8, 23.5]] },
    { id: "donets_basin", type: "groundwater", name: "Дніпровсько-Донецький басейн", description: "Артезіанський резервуар під Донеччиною.", color: GROUND_COLOR, path: [[50.5, 36.5], [50.0, 39.0], [48.5, 39.5], [48.0, 37.0], [49.0, 35.5]] },
    { id: "blacksea_basin", type: "groundwater", name: "Причорноморський басейн", description: "Води півдня України.", color: GROUND_COLOR, path: [[47.5, 30.0], [47.0, 33.0], [46.5, 34.5], [46.0, 33.0], [46.5, 30.0]] },

    // === LAKES: SHATSK GROUP ===
    { id: "svityaz", type: "lake", name: "Світязь", tags: ["top"], area: "26.2 км²", description: "Найглибше озеро України.", color: LAKE_COLOR, center: [51.50, 23.85], radius: 5000 },
    { id: "pulemetske", type: "lake", name: "Пулемецьке", area: "16.4 км²", description: "Друге за площею на Шацьких озерах.", color: LAKE_COLOR, center: [51.56, 23.77], radius: 3000 },
    { id: "lyutsymir", type: "lake", name: "Люцимир", area: "4.43 км²", description: "Вода багата на йод і магній.", color: LAKE_COLOR, center: [51.48, 23.93], radius: 2200 },

    // === LAKES: SOUTH (DANUBE & CRIMEA) ===
    { id: "yalpuh", type: "lake", name: "Ялпуг", tags: ["top"], area: "149 км²", description: "Найбільше природне прісне озеро.", color: LAKE_COLOR, center: [45.42, 28.60], radius: 9000 },
    { id: "kugurluy", type: "lake", name: "Кугурлуй", area: "82 км²", description: "Озеро на Дунайській рівнині.", color: LAKE_COLOR, center: [45.28, 28.65], radius: 6000 },
    { id: "kahul", type: "lake", name: "Кагул", area: "90 км²", description: "Озеро біля кордону з Молдовою.", color: LAKE_COLOR, center: [45.37, 28.40], radius: 5000 },
    { id: "sasyk_kundyuk", type: "lake", name: "Сасик", tags: ["top"], area: "210 км²", description: "Прісноводне озеро біля Чорного моря.", color: LAKE_COLOR, center: [45.65, 29.80], radius: 12000 },
    { id: "donuzlav", type: "lake", name: "Донузлав", tags: ["top"], area: "48 км²", description: "Найглибша бухта Криму.", color: LAKE_COLOR, center: [45.35, 33.00], radius: 7000 },

    // === LAKES: SALT & LIMANS ===
    { id: "syvash", type: "lake", name: "Сиваш", tags: ["top"], area: "2500 км²", description: "Гниле море, унікальна екосистема.", color: SALT_COLOR, center: [46.1, 34.3], radius: 15000 },
    { id: "kuyalnik", type: "lake", name: "Куяльник", tags: ["top"], area: "60 км²", description: "Відомий лікувальними грязями.", color: SALT_COLOR, center: [46.68, 30.72], radius: 5000 },
    { id: "lemurian", type: "lake", name: "Лемурійське озеро", tags: ["top"], description: "Рожеве озеро на Херсонщині.", color: SALT_COLOR, center: [46.24, 33.78], radius: 3000 },
    { id: "hadzhibey_l", type: "lake", name: "Хаджибейський лиман", description: "Великий лиман біля Одеси.", color: SALT_COLOR, center: [46.6, 30.6], radius: 15000 },
    { id: "tyligul_l", type: "lake", name: "Тилігульський лиман", description: "Найдовший лиман України (80 км).", color: SALT_COLOR, center: [46.85, 31.15], radius: 20000 },

    // === LAKES: CENTRAL & SPECIAL ===
    { id: "synevyr", type: "lake", name: "Синевир", tags: ["top"], area: "0.04 км²", description: "Морське око Карпат.", color: LAKE_COLOR, center: [48.617, 23.684], radius: 2000 },
    { id: "lake_buchak", type: "lake", name: "Озеро Бучак", description: "Місце сили на Черкащині.", color: LAKE_COLOR, center: [49.86, 31.42], radius: 1500 },
    { id: "cherepashyntsi", type: "lake", name: "Черепашинецький кар'єр", tags: ["top"], description: "'Вінницькі Мальдіви'.", color: LAKE_COLOR, center: [49.49, 28.59], radius: 1200 },
    { id: "samara_plavni_c", type: "lake", name: "Самарські плавні", tags: ["top"], description: "Унікальна дельта біля Дніпра.", color: LAKE_COLOR, center: [48.60, 35.30], radius: 4000 },
    { id: "blue_lakes_sobkivka", type: "lake", name: "Блакитні озера (Собківка)", description: "Чисті кар'єри біля Полтави.", color: LAKE_COLOR, center: [49.42, 34.45], radius: 1300 },

    // === SWAMPS & WETLANDS ===
    { id: "pripyat_swamps", type: "marsh", name: "Прип'ятські болота", area: "98 000 км²", description: "Найбільший болотяний масив Європи.", color: MARSH_COLOR, path: [[51.6, 24.0], [52.0, 25.0], [52.1, 27.0], [51.8, 29.0], [51.4, 30.0], [51.2, 28.0], [51.3, 26.0]] },
    { id: "bile_swamp", type: "marsh", name: "Болото Біле", description: "Унікальне карстове болоце.", color: MARSH_COLOR, center: [51.48, 26.15], radius: 4500 },

    // === KARST & CAVES ===
    { id: "optimistic_cave", type: "cave", name: "Печера Оптимістична", tags: ["top"], length: "267 км", description: "Найдовша гіпсова печера світу.", color: GROUND_COLOR, center: [48.73, 25.97], radius: 3000 },
    { id: "mlynky_cave", type: "cave", name: "Печера Млинки", length: "52 км", description: "Екстремальна лабіринтова печера.", color: GROUND_COLOR, center: [48.95, 25.87], radius: 2000 },
    { id: "crystal_cave", type: "cave", name: "Кришталева печера", description: "Знаменита гіпсовими кристалами.", color: GROUND_COLOR, center: [48.68, 26.08], radius: 1500 },
    { id: "vertebrate_cave", type: "cave", name: "Печера Вертеба", description: "Печера-музей трипільської культури.", color: GROUND_COLOR, center: [48.79, 25.88], radius: 1800 },

    // === ADDITIONAL RIVERS ===
    { id: "uzh_zh", type: "river", name: "Уж (Житомирщина)", length: "256 км", description: "Права притока Прип'яті через Коростень.", color: RIVER_COLOR, path: [[50.8, 29.0], [51.0, 29.3], [51.2, 29.1], [51.4, 28.8], [51.6, 28.5]] },
    { id: "latoritsa", type: "river", name: "Латориця", length: "188 км", description: "Закарпатська річка з мальовничою долиною.", color: "#818cf8", path: [[48.4, 22.3], [48.5, 22.7], [48.55, 23.1]] },
    { id: "uzh_zak", type: "river", name: "Уж (Закарпаття)", length: "127 км", description: "Річка, що протікає через Ужгород.", color: "#818cf8", path: [[48.6, 22.3], [48.62, 22.5], [48.85, 22.8]] },
    { id: "molochna", type: "river", name: "Молочна", length: "197 км", description: "Річка Запорізької області, впадає в Молочний лиман.", color: RIVER_COLOR, path: [[47.5, 35.8], [47.2, 35.5], [46.8, 35.3], [46.5, 35.3]] },
    { id: "berda", type: "river", name: "Берда", length: "125 км", description: "Річка Приазов'я з порогами.", color: RIVER_COLOR, path: [[47.4, 36.8], [47.1, 36.5], [46.8, 36.2]] },
    { id: "kinska", type: "river", name: "Кінська", length: "178 км", description: "Права притока Дніпра на Запоріжжі.", color: RIVER_COLOR, path: [[47.8, 35.5], [47.5, 35.2], [47.3, 34.9], [47.1, 34.5]] },
    { id: "lopan", type: "river", name: "Лопань", length: "96 км", description: "Річка, що протікає через центр Харкова.", color: RIVER_COLOR, path: [[50.3, 36.3], [50.1, 36.25], [49.95, 36.23]] },
    { id: "ingulets_small", type: "river", name: "Базавлук", length: "137 км", description: "Ліва притока Інгульця.", color: RIVER_COLOR, path: [[47.8, 33.5], [47.5, 33.8], [47.3, 34.0]] },
    { id: "irpin", type: "river", name: "Ірпінь", length: "162 км", description: "Права притока Дніпра біля Києва, історичне місце.", color: RIVER_COLOR, path: [[50.2, 29.5], [50.35, 29.8], [50.45, 30.1], [50.52, 30.35]] },
    { id: "udai", type: "river", name: "Удай", length: "327 км", description: "Ліва притока Сули через Пирятин.", color: RIVER_COLOR, path: [[50.5, 32.5], [50.3, 32.3], [50.0, 32.5], [49.7, 32.7]] },

    // === ADDITIONAL LAKES ===
    { id: "pisochne", type: "lake", name: "Пісочне озеро", area: "0.8 км²", description: "Чисте озеро біля Чернігова.", color: LAKE_COLOR, center: [51.45, 31.35], radius: 1000 },
    { id: "blue_oleshky", type: "lake", name: "Голубі озера Олешшя", tags: ["top"], description: "Бірюзові кар'єри у Херсонській області.", color: LAKE_COLOR, center: [46.62, 32.78], radius: 2500 },
    { id: "svitle", type: "lake", name: "Озеро Світле", description: "Прозоре озеро на Волині.", color: LAKE_COLOR, center: [51.42, 23.95], radius: 1500 },
    { id: "biloozero", type: "lake", name: "Біле озеро (Рівненщина)", area: "4.7 км²", description: "Одне з найчистіших карстових озер.", color: LAKE_COLOR, center: [51.11, 26.18], radius: 2000 },
    { id: "katlabuh", type: "lake", name: "Катлабух", area: "68 км²", description: "Прісноводне озеро на Одещині.", color: LAKE_COLOR, center: [45.53, 28.72], radius: 5500 },
    { id: "molochnyi_liman", type: "lake", name: "Молочний лиман", area: "168 км²", description: "Солоний лиман Приазов'я.", color: SALT_COLOR, center: [46.58, 35.35], radius: 9000 },
    { id: "utlyuk_liman", type: "lake", name: "Утлюцький лиман", area: "70 км²", description: "Мілководний лиман, місце гніздування птахів.", color: SALT_COLOR, center: [46.35, 35.05], radius: 6000 },
];
