console.clear();
console.log('🌊 HYDRO ATLAS v6.3: Multi-River Support & Stability...');

/**
 * ARCHITECTURE v6.3:
 * 1. Global AppState (Namespaced)
 * 2. Unified Initialization Sequence (Sequential Boot)
 * 3. Atomic Layer Management (FeatureGroup)
 */

window.AppState = {
    map: null,
    layers: {},
    geoData: [],
    currentCategory: 'hydrosphere', // Default sphere
    currentFilter: 'all',
    dataGroup: L.featureGroup(),
    isInitialized: false,

    // UI CONFIG
    cities: [
        { name: "Київ", coords: [50.45, 30.52], description: "Столиця України на Дніпрі." },
        { name: "Дніпро", coords: [48.46, 35.04], description: "Мегаполіс на обох берегах Дніпра." },
        { name: "Запоріжжя", coords: [47.83, 35.13], description: "Місто козацької слави." },
        { name: "Львів", coords: [49.83, 24.02], description: "Серце Галичини." },
        { name: "Одеса", coords: [46.48, 30.72], description: "Південна Пальміра." },
        { name: "Харків", coords: [49.99, 36.23], description: "Індустріальний та студентський центр." },
        { name: "Миколаїв", coords: [46.97, 31.99], description: "Місто корабелів." },
        { name: "Херсон", coords: [46.63, 32.61], description: "Ключ до Криму." }
    ]
};

// --- SPHERE CONFIGURATION ---
const SPHERE_CONFIG = {
    hydrosphere: {
        name: "Гідросфера",
        color: "#3b82f6",
        filters: [
            { id: "all", label: "Всі" },
            { id: "river", label: "Річки" },
            { id: "lake", label: "Озера" },
            { id: "reservoir", label: "Водосховища" },
            { id: "groundwater", label: "Підземні" },
            { id: "marsh", label: "Болота" }
        ]
    },
    lithosphere: {
        name: "Літосфера",
        color: "#e11d48",
        filters: [
            { id: "all", label: "Всі" },
            { id: "mineral", label: "Копалини" },
            { id: "relief", label: "Рельєф" },
            { id: "plate", label: "Тектоніка" }
        ]
    },
    atmosphere: {
        name: "Атмосфера",
        color: "#0ea5e9",
        filters: [
            { id: "all", label: "Всі" },
            { id: "climate", label: "Клімат" },
            { id: "wind", label: "Ветра" },
            { id: "temperature", label: "Температура" }
        ]
    },
    biosphere: {
        name: "Біосфера",
        color: "#22c55e",
        filters: [
            { id: "all", label: "Всі" },
            { id: "reserve", label: "Заповідники" },
            { id: "soil", label: "Грунти" },
            { id: "vegetation", label: "Рослинність" }
        ]
    }
};

// --- STYLING CONSTANTS ---
const RIVER_COLOR = '#0ea5e9';
const LAKE_COLOR = '#38bdf8';
const SALT_COLOR = '#f472b6';
const GROUND_COLOR = '#8b5cf6';
const MARSH_COLOR = '#22c55e';
const CAVE_COLOR = '#fbbf24';

const isMobile = () => window.innerWidth <= 768;

function getStyle(item, isHovered) {
    let weight = item.type === 'river' ? (isHovered ? 8 : 4.5) : (isHovered ? 4 : 2);
    let color = item.color || RIVER_COLOR;
    let opacity = 0.95;
    let fillOpacity = isHovered ? 0.9 : 0.7;
    let className = 'leaflet-interactive';

    if (item.type === 'river') {
        className += ' river-flow';
        opacity = 1;
    } else if (item.type === 'lake' || item.type === 'reservoir') {
        className += ' lake-glow';
    }

    return {
        color, fillColor: color, weight, opacity, fillOpacity,
        lineCap: 'round', lineJoin: 'round', className: className
    };
}

// 1. Core Map Boot
const map = L.map('map', {
    zoomControl: false,
    minZoom: 4,
    zoomSnap: 0.1,
    wheelPxPerZoom: 120,
}).setView([48.5, 31.0], 6);

window.AppState.map = map;
window.AppState.dataGroup.addTo(map);

L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Panes for Z-Index Control
map.createPane('groundwaterPane').style.zIndex = 250;
map.createPane('marshPane').style.zIndex = 300;
map.createPane('waterPane').style.zIndex = 400;
map.createPane('riverPane').style.zIndex = 500;
map.createPane('cityPane').style.zIndex = 600;

// RESTORED: Map Legend Logic
function addLegend() {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'legend');
        div.id = 'map-legend';
        div.innerHTML = `
            <div class="legend-header" onclick="toggleLegend(event)">
                <h4>Легенда</h4>
                <span id="legend-toggle-icon">▼</span>
            </div>
            <div id="legend-content">
                <div class="legend-item"><span style="background:${RIVER_COLOR}"></span> Річки</div>
                <div class="legend-item"><span style="background:${LAKE_COLOR}"></span> Прісні озера</div>
                <div class="legend-item"><span style="background:${SALT_COLOR}"></span> Солоні лимани</div>
                <div class="legend-item"><span style="background:${MARSH_COLOR}"></span> Болота</div>
                <div class="legend-item"><span style="background:${GROUND_COLOR}"></span> Підземні води</div>
                <div class="legend-item"><span style="background:${CAVE_COLOR}"></span> Печери</div>
            </div>`;
        return div;
    };
    legend.addTo(map);
}

window.toggleLegend = function (e) {
    if (e) e.stopPropagation();
    const content = document.getElementById('legend-content');
    const icon = document.getElementById('legend-toggle-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block'; icon.innerText = '▼';
    } else {
        content.style.display = 'none'; icon.innerText = '▲';
    }
};

// 2. Data Loading
async function initData() {
    try {
        const response = await fetch('/api/geo-data');
        if (!response.ok) throw new Error('API unreachable');

        // GEOJSON PARSING
        const data = await response.json();
        // The API returns { type: "FeatureCollection", features: [...] }
        window.AppState.geoData = data.features;

        window.AppState.geoData.forEach(feature => {
            const item = feature.properties;
            const geo = feature.geometry;
            const id = feature.id; // Top level ID in GeoJSON feature

            // --- LAYER LOGIC ---
            let pane = 'overlayPane';
            if (item.type === 'river') pane = 'riverPane';
            else if (item.type === 'lake' || item.type === 'reservoir') pane = 'waterPane';
            else if (item.type === 'marsh') pane = 'marshPane';
            else if (item.type === 'groundwater') pane = 'groundwaterPane';
            else if (item.type === 'cave') pane = 'riverPane';

            const style = getStyle(item, false);
            let layer;

            // --- GEOMETRY HANDLING (Adapted for Leaflet) ---
            if (geo.type === 'LineString') {
                // GeoJSON LineString: [[lat, lng], [lat, lng]] (In our implementation)
                // If standard GeoJSON [lng, lat] was used, we would need L.geoJSON or swap coordinates.
                // Current Schema implementation kept it as [lat, lng] for simplicity.
                layer = L.polyline(geo.coordinates, { ...style, pane });
            }
            else if (geo.type === 'Polygon') {
                // Polygon coordinates are nested: [[[lat, lng], ...]]
                // Leaflet takes [[lat, lng], ...] for simple polygon, or [[[lat, lng]..]] for holes.
                // Our schema wrapped it in a list, so we take the first ring.
                layer = L.polygon(geo.coordinates[0], {
                    color: item.color,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.4,
                    pane: pane
                });
            }
            else if (geo.type === 'Point') {
                if (item.type === 'wind') {
                    // Custom Wind Marker
                    const rotation = item.attributes?.rotation || 0; // Access attributes for extra data
                    const iconHtml = `<div style="transform: rotate(${rotation}deg); color: ${item.color || '#fff'};">➤</div>`;
                    layer = L.marker(geo.coordinates, {
                        icon: L.divIcon({
                            className: 'wind-icon',
                            html: iconHtml,
                            iconSize: [30, 30],
                            iconAnchor: [15, 15]
                        }),
                        pane: pane
                    });
                } else {
                    // Default Circle Marker (cities, minerals, etc)
                    layer = L.circleMarker(geo.coordinates, {
                        radius: item.radius ? item.radius / 1000 * 0.5 : 6,
                        fillColor: item.color,
                        color: "#fff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8,
                        pane: pane
                    });

                    if (['mineral', 'relief'].includes(item.type)) {
                        layer.setStyle({ radius: 8, weight: 1, fillOpacity: 0.9 });
                    }
                }
            }

            if (layer) {
                window.AppState.dataGroup.addLayer(layer);
                window.AppState.layers[id] = layer;

                layer.on('mouseover', function () { this.setStyle(getStyle(item, true)); });
                layer.on('mouseout', function () { this.setStyle(getStyle(item, false)); });
                layer.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    updateSidebar(item);
                    toggleMobileSidebar(true);

                    if (layer.getBounds) map.flyToBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 10 });
                    else map.flyTo(geo.coordinates, 10);
                });
                layer.bindTooltip(item.name, { permanent: false, className: 'custom-tooltip' });
            }
        });

        // Initial Render
        updateMapLayers();

        console.log(`📦 Registry Ready: ${window.AppState.geoData.length} features synced.`);
    } catch (e) {
        console.error('Core Boot Failure:', e);
    }
}

// 3. UI Initialization
function initUI() {
    // 3.1 SPHERE SWITCHER
    document.querySelectorAll('.sphere-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sphere = btn.getAttribute('data-sphere');
            if (window.AppState.currentCategory === sphere) return;

            // Update State
            window.AppState.currentCategory = sphere;
            window.AppState.currentFilter = 'all';

            // Update UI Buttons
            document.querySelectorAll('.sphere-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Re-render Filters & Map
            renderFilters(sphere);
            updateMapLayers();

            // Update Title
            const sphereName = SPHERE_CONFIG[sphere].name;
            document.querySelector('.sidebar-header h1').innerHTML = `${sphereName} <span class="badge-v">v6.0</span>`;
        });
    });

    // Initial Filter Render
    renderFilters(window.AppState.currentCategory);
}

function renderFilters(sphere) {
    const container = document.getElementById('dynamic-filters');
    const config = SPHERE_CONFIG[sphere];
    if (!container || !config) return;

    container.innerHTML = config.filters.map((f, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${f.id}">
            ${f.label}
        </button>
    `).join('');

    // Re-attach event listeners to new buttons
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-filter');
            if (window.AppState.currentFilter === cat) return;
            window.AppState.currentFilter = cat;

            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateMapLayers();
        });
    });
}

function updateMapLayers() {
    window.AppState.dataGroup.clearLayers();
    const sphere = window.AppState.currentCategory;
    const filter = window.AppState.currentFilter; // 'all' or specific type

    window.AppState.geoData.forEach(feature => {
        const item = feature.properties;
        const id = feature.id;

        // 1. Filter by Sphere (Category)
        const itemCategory = item.category || 'hydrosphere';
        if (itemCategory !== sphere) return;

        // 2. Filter by Type
        let isVisible = (filter === 'all') || (item.type === filter);

        // Special case for 'groundwater' filter which includes 'cave'
        if (filter === 'groundwater' && item.type === 'cave') isVisible = true;

        if (isVisible && window.AppState.layers[id]) {
            window.AppState.dataGroup.addLayer(window.AppState.layers[id]);
        }
    });
}



// SEARCH
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) { searchResults.style.display = 'none'; return; }

        const matches = window.AppState.geoData
            .filter(f => f.properties.name.toLowerCase().includes(query)) // Search in props
            .slice(0, 10);

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(f => `
                    <div class="search-result-item" onclick="handleSearchSelect('${f.id}')">
                        <span class="item-name">${f.properties.name}</span>
                        <span class="item-type">${f.properties.type}</span>
                    </div>`).join('');
            searchResults.style.display = 'block';
        } else { searchResults.style.display = 'none'; }
    });
}

// RESET
const resetBtn = document.getElementById('reset-view');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        map.setView([48.5, 31.0], 6);
        window.closeSidebar();
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.click();
    });
}

// --- GLOBAL HELPERS ---
window.handleSearchSelect = function (id) {
    // Find nested property search
    const feature = window.AppState.geoData.find(x => x.id === id);
    if (!feature) return;

    const item = feature.properties;
    const layer = window.AppState.layers[id];
    if (!layer) return;

    if (!window.AppState.dataGroup.hasLayer(layer)) {
        window.AppState.dataGroup.addLayer(layer);
    }

    document.getElementById('search-results').style.display = 'none';
    if (document.getElementById('search-input')) document.getElementById('search-input').value = '';

    updateSidebar(item);
    toggleMobileSidebar(true);

    if (layer.getBounds) map.flyToBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 12 });
    else map.flyTo(feature.geometry.coordinates, 12); // Use geometry coords
};

function updateSidebar(item) {
    const container = document.getElementById('river-details');
    if (!container) return;
    // IMAGE LOGIC: Prioritize DB image -> specific type placeholder -> default
    let imageSrc = item.image;
    if (!imageSrc || imageSrc === "null" || imageSrc === "") {
        if (item.type === 'lake' || item.type === 'reservoir') imageSrc = '/static/assets/placeholder_lake.svg';
        else if (item.type === 'river') imageSrc = '/static/assets/placeholder_river.svg';
        else imageSrc = '/static/assets/placeholder_default.svg';
    }

    container.innerHTML = `
        <div class="info-card fade-in">
            <div class="sidebar-image-container"><img src="${imageSrc}" class="sidebar-image"></div>
            <div class="card-header">
                <div class="header-row">
                    <h2>${item.name}</h2>
                    <button class="mobile-close-btn" onclick="window.closeSidebar()">✕</button>
                </div>
                ${item.tags?.includes('top') ? '<span class="badge-top">★ TOP</span>' : ''}
            </div>
            
            <div class="info-section">
                <p class="river-desc">${item.description || "Опис завантажується..."}</p>
                ${item.origin ? `<p class="origin-text"><strong>Походження назви:</strong> ${item.origin}</p>` : ''}
                ${item.legend ? `<div class="legend-box">📜 <strong>Легенда:</strong> ${item.legend}</div>` : ''}
            </div>

            <div class="info-grid">
                ${item.length ? `<div class="info-stat"><span>Довжина:</span> ${item.length}</div>` : ''}
                ${item.area ? `<div class="info-stat"><span>Площа:</span> ${item.area}</div>` : ''}
                ${item.depth ? `<div class="info-stat"><span>Глибина:</span> ${item.depth}</div>` : ''}
                ${item.basin ? `<div class="info-stat"><span>Басейн:</span> ${item.basin}</div>` : ''}
            </div>

            ${item.wildlife ? `<div class="info-block"><h3>🐟 Флора і фауна</h3><p>${item.wildlife}</p></div>` : ''}
            ${item.ecology ? `<div class="info-block"><h3>⚠️ Екологія</h3><p>${item.ecology}</p></div>` : ''}

            ${item.facts ? `
            <div class="info-block">
                <h3>💡 Цікаві факти</h3>
                <ul class="facts-list">
                    ${item.facts.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>` : ''}

            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Україна')}" 
               target="_blank" class="google-maps-btn">
               🗺️ Показати на Google Maps
            </a>
        </div>`;
}

function toggleMobileSidebar(expand) {
    if (!isMobile()) return;
    const s = document.querySelector('.sidebar');
    if (s) {
        if (expand) s.classList.remove('mobile-collapsed');
        else s.classList.add('mobile-collapsed');
    }
}
window.closeSidebar = () => toggleMobileSidebar(false);

// --- MAIN BOOT ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cities (Static Boot)
    const cityIcon = L.divIcon({
        className: 'city-icon',
        html: '<div style="background:#fff; width:8px; height:8px; border-radius:50%; box-shadow:0 0 10px #fff;"></div>',
        iconSize: [8, 8]
    });
    window.AppState.cities.forEach(c => {
        L.marker(c.coords, { icon: cityIcon, pane: 'cityPane', title: c.name })
            .addTo(map)
            .bindTooltip(c.name, { permanent: true, direction: 'right', className: 'city-tooltip' })
            .on('click', () => {
                updateSidebar(c);
                map.flyTo(c.coords, 10);
                if (isMobile()) toggleMobileSidebar(true);
            });
    });

    // 2. Data & Legend
    await initData();
    addLegend();

    // 3. UI
    initUI();

    window.AppState.isInitialized = true;
    console.log('✅ HydroAtlas v6.3: Data Synchronized & Features Restored');
});
