/**
 * GEO_DATA - ULTIMATE HYDROLATLAS UKRAINE (v4.0)
 * Total Entities: 80+
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
        facts: ["Третя за довжиною річка Європи.", "Має 6 величезних водосховищ.", "Згадується як Борисфен у прадавніх греків."],
        path: [[51.9, 30.6], [51.5, 30.5], [51.2, 30.45], [50.9, 30.4], [50.6, 30.45], [50.5, 30.5], [50.4, 30.55], [50.3, 30.6], [50.0, 31.0], [49.8, 31.2], [49.6, 31.4], [49.4, 31.9], [49.3, 32.2], [49.2, 32.5], [49.1, 33.0], [48.9, 33.5], [48.8, 34.0], [48.6, 34.3], [48.5, 34.6], [48.45, 35.0], [48.4, 35.1], [48.2, 35.15], [48.0, 35.1], [47.8, 35.0], [47.5, 34.8], [47.3, 34.4], [47.1, 34.0], [47.0, 33.6], [46.8, 33.3], [46.7, 33.0], [46.45, 32.1]]
    },
    {
        id: "dnister", type: "river", name: "Дністер", tags: ["top"], length: "1 362 км",
        description: "Дністровський каньйон — одне з 7 природних чудес України.", color: RIVER_COLOR,
        facts: ["Довжина каньйону близько 250 км.", "Протікає через територію України та Молдови."],
        path: [[49.2, 22.8], [49.4, 23.6], [49.2, 24.3], [49.0, 24.8], [48.8, 25.4], [48.6, 26.2], [48.5, 27.0], [48.5, 27.8], [48.0, 28.3], [47.5, 28.8], [47.0, 29.5], [46.3, 30.3]]
    },
    { id: "pivdenny_bug", type: "river", name: "Південний Буг", length: "806 км", description: "Єдина велика річка, що повністю протікає територією України.", color: RIVER_COLOR, path: [[49.6, 26.5], [49.4, 27.2], [49.3, 28.0], [49.2, 28.55], [49.0, 28.7], [48.6, 29.2], [48.2, 30.0], [47.8, 31.1], [47.3, 31.5], [46.9, 32.0]] },

    // === DNIEPER SYSTEM ===
    { id: "desna", type: "river", name: "Десна", length: "1130 км", description: "Найбільша ліва притока Дніпра.", color: RIVER_COLOR, path: [[52.2, 33.3], [51.9, 33.0], [51.6, 32.5], [51.4, 31.8], [51.2, 31.0], [50.55, 30.55]] },
    { id: "horyn", type: "river", name: "Горинь", length: "659 км", description: "Права притока Прип'яті.", color: RIVER_COLOR, path: [[50.0, 25.8], [50.5, 26.4], [51.2, 26.6], [51.8, 26.8], [52.0, 26.9]] },
    { id: "vorskla", type: "river", name: "Ворскла", length: "464 км", description: "Ліва притока Дніпра, протікає через Полтаву.", color: RIVER_COLOR, path: [[50.5, 35.8], [50.2, 35.5], [49.8, 35.0], [49.5, 34.5], [49.0, 34.2], [48.8, 34.1]] },
    { id: "psel", type: "river", name: "Псел", length: "717 км", description: "Одна з найчистіших річок України.", color: RIVER_COLOR, path: [[51.0, 35.0], [50.5, 34.5], [50.0, 34.0], [49.5, 33.8], [49.0, 33.5]] },

    // === RESERVOIRS (FULL DNIEPER CASCADE) ===
    { id: "kyiv_res", type: "reservoir", name: "Київське водосховище", tags: ["top"], area: "922 км²", description: "Відоме як 'Київське море'. Популярне місце відпочинку.", color: "#2563eb", path: [[50.55, 30.5], [51.0, 30.45], [51.15, 30.6], [50.8, 30.7], [50.55, 30.5]] },
    { id: "kaniv_res", type: "reservoir", name: "Канівське водосховище", area: "675 км²", description: "Тут розташований Канівський природний заповідник.", color: "#2563eb", path: [[50.4, 30.6], [49.8, 31.2], [49.75, 31.4], [50.3, 30.8]] },
    { id: "kremenchuk_res", type: "reservoir", name: "Кременчуцьке водосховище", area: "2250 км²", description: "Найбільше за площею водосховище в Україні.", color: "#2563eb", path: [[49.5, 32.0], [49.2, 33.0], [48.9, 33.2], [49.6, 32.2]] },
    { id: "kamianske_res", type: "reservoir", name: "Кам'янське водосховище", area: "567 км²", description: "Забезпечує водою значну частину промвузла Дніпра.", color: "#2563eb", path: [[48.9, 33.5], [48.55, 34.3], [48.65, 34.5]] },
    { id: "dnipro_res", type: "reservoir", name: "Дніпровське водосховище", area: "410 км²", description: "Утворене греблею ДніпроГЕСу в Запоріжжі.", color: "#2563eb", path: [[48.5, 35.0], [47.85, 35.1], [48.1, 35.2]] },
    { id: "kakhovka_res_rem", type: "reservoir", name: "Каховське (історичне)", area: "2155 км²", description: "Об'єкт екологічної катастрофи. Зараз відновлюється як екосистема.", color: "#3b82f6", path: [[47.7, 35.1], [46.85, 33.4], [47.4, 34.8]] },

    // === GROUNDWATER (ULTRASENSITIVE AQUIFERS) ===
    { id: "dnipro_basin", type: "groundwater", name: "Дніпровський артезіанський басейн", description: "Найбільше джерело питної води в країні.", color: GROUND_COLOR, path: [[51.8, 31.0], [51.5, 33.5], [50.5, 35.5], [49.0, 36.5], [48.0, 35.0], [48.5, 33.0], [49.5, 31.0], [51.0, 30.5], [51.8, 31.0]] },
    { id: "volyn_basin", type: "groundwater", name: "Волино-Подільський басейн", description: "Забезпечує чисту воду для всього західного регіону.", color: GROUND_COLOR, path: [[51.8, 23.5], [51.8, 27.0], [50.0, 27.5], [48.5, 24.5], [51.8, 23.5]] },
    { id: "donets_basin", type: "groundwater", name: "Дніпровсько-Донецький басейн", description: "Величезний артезіанський резервуар під Донеччиною та Харківщиною.", color: GROUND_COLOR, path: [[50.5, 36.5], [50.0, 39.0], [48.5, 39.5], [48.0, 37.0], [49.0, 35.5]] },
    { id: "blacksea_basin", type: "groundwater", name: "Причорноморський басейн", description: "Резервуар пресних і слабосолоних вод півдня України.", color: GROUND_COLOR, path: [[47.5, 30.0], [47.0, 33.0], [46.5, 34.5], [46.0, 33.0], [46.5, 30.0]] },

    // === LAKES: SHATSK GROUP (VOLYN) ===
    {
        id: "svityaz", type: "lake", name: "Світязь", tags: ["top"], area: "26.2 км²", depth: "58 м",
        description: "Найглибше озеро України, 'Український Байкал'.", color: LAKE_COLOR,
        facts: ["Вода містить срібло та гліцерин.", "Прозорість води до 8 метрів."],
        center: [51.50, 23.85], radius: 5000
    },
    { id: "lyutsymir", type: "lake", name: "Люцимир", area: "4.43 км²", description: "Третє за площею серед Шацьких озер. Вода багата на йод і магній.", color: LAKE_COLOR, center: [51.48, 23.93], radius: 2200 },
    { id: "peremut", type: "lake", name: "Перемут", area: "1.5 км²", description: "Загадкове озеро з мутистим дном, оточене густим лісом.", color: LAKE_COLOR, center: [51.55, 23.95], radius: 1300 },

    // === LAKES: CENTRAL UKRAINE & SPECIAL GEMS ===
    { id: "lake_buchak", type: "lake", name: "Озеро Бучак", description: "Атмосферний водоєм на місці недобудованої ГАЕС. Вважається 'місцем сили'.", color: LAKE_COLOR, center: [49.86, 31.42], radius: 1500 },
    { id: "cherepashyntsi", type: "lake", name: "Черепашинецький кар'єр", tags: ["top"], description: "'Вінницькі Мальдіви' з лазурною бірюзовою водою.", color: LAKE_COLOR, center: [49.49, 28.59], radius: 1200 },
    { id: "samara_plavni_c", type: "lake", name: "Самарські плавні", tags: ["top"], description: "Унікальна екосистема дельти річки Самара з багатим біорізноманіттям.", color: LAKE_COLOR, center: [48.60, 35.30], radius: 4000 },
    { id: "blue_lakes_sobkivka", type: "lake", name: "Блакитні озера (Собківка)", description: "Мальовничі піщані кар'єри з чистою водою в сосновому лісі.", color: LAKE_COLOR, center: [49.42, 34.45], radius: 1300 },
    { id: "sriberne_lake", type: "lake", name: "Срібне озеро", description: "Затоплений гранітний кар'єр в Олександрії з цілющими радоновими водами.", color: LAKE_COLOR, center: [48.66, 33.11], radius: 1000 },
    { id: "yalpuh", type: "lake", name: "Ялпуг", tags: ["top"], area: "149 км²", description: "Найбільше природне прісне озеро України.", color: LAKE_COLOR, center: [45.42, 28.60], radius: 9000 },

    // === SWAMPS & WETLANDS ===
    { id: "pripyat_swamps", type: "marsh", name: "Прип'ятські болота", area: "98 000 км²", description: "Найбільший болотяний масив Європи.", color: MARSH_COLOR, path: [[51.6, 24.0], [52.0, 25.0], [52.1, 27.0], [51.8, 29.0], [51.4, 30.0], [51.2, 28.0], [51.3, 26.0]] },
    { id: "bile_swamp", type: "marsh", name: "Болото Біле", description: "Унікальне карстове болоце на Поліссі.", color: MARSH_COLOR, center: [51.48, 26.15], radius: 4500 },

    // === KARST & CAVES (PODILLIA) ===
    { id: "optimistic_cave", type: "cave", name: "Печера Оптимістична", tags: ["top"], length: "267 км", description: "Найдовша гіпсова печера у світі та найдовша печера Євразії.", color: GROUND_COLOR, center: [48.73, 25.97], radius: 3000 },
    { id: "mlynky_cave", type: "cave", name: "Печера Млинки", length: "52 км", description: "Екстремальна лабіринтова печера на Тернопільщині.", color: GROUND_COLOR, center: [48.95, 25.87], radius: 2000 },
    { id: "crystal_cave", type: "cave", name: "Кришталева печера", description: "Знаменита своїми гіпсовими кристалами та комфортним мікрокліматом.", color: GROUND_COLOR, center: [48.68, 26.08], radius: 1500 },
    { id: "vertebrate_cave", type: "cave", name: "Печера Вертеба", description: "Унікальна печера-музей трипільської культури під землею.", color: GROUND_COLOR, center: [48.79, 25.88], radius: 1800 },
];
