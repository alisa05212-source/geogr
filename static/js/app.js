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
        window.AppState.geoData = await response.json();

        window.AppState.geoData.forEach(item => {
            let pane = 'overlayPane';
            if (item.type === 'river') pane = 'riverPane';
            else if (item.type === 'lake' || item.type === 'reservoir') pane = 'waterPane';
            else if (item.type === 'marsh') pane = 'marshPane';
            else if (item.type === 'groundwater') pane = 'groundwaterPane';
            else if (item.type === 'cave') pane = 'riverPane';

            const style = getStyle(item, false);
            let layer;

            if (item.type === 'river' && item.path) {
                layer = L.polyline(item.path, { ...style, pane });
            } else if (item.path) {
                layer = L.polygon(item.path, { ...style, pane });
            } else if (item.center) {
                layer = L.circle(item.center, { radius: item.radius || 3000, ...style, pane });
            }

            if (layer) {
                window.AppState.dataGroup.addLayer(layer);
                window.AppState.layers[item.id] = layer;

                layer.on('mouseover', function () { this.setStyle(getStyle(item, true)); });
                layer.on('mouseout', function () { this.setStyle(getStyle(item, false)); });
                layer.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    updateSidebar(item);
                    toggleMobileSidebar(true);
                    if (layer.getBounds) map.flyToBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 10 });
                    else map.flyTo(item.center, 10);
                });
                layer.bindTooltip(item.name, { permanent: false, className: 'custom-tooltip' });
            }
        });
        console.log(`📦 Registry Ready: ${window.AppState.geoData.length} objects synced.`);
    } catch (e) {
        console.error('Core Boot Failure:', e);
    }
}

// 3. UI Initialization
function initUI() {
    // FILTERS
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-filter');
            if (window.AppState.currentFilter === cat) return;
            window.AppState.currentFilter = cat;

            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            window.AppState.dataGroup.clearLayers();

            window.AppState.geoData.forEach(item => {
                let isVisible = (cat === 'all') ||
                    (cat === 'top' && item.tags?.includes('top')) ||
                    (cat === 'groundwater' && (item.type === 'groundwater' || item.type === 'cave')) ||
                    (item.type === cat);

                if (isVisible && window.AppState.layers[item.id]) {
                    window.AppState.dataGroup.addLayer(window.AppState.layers[item.id]);
                }
            });
        });
    });

    // SEARCH
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) { searchResults.style.display = 'none'; return; }

            const matches = window.AppState.geoData.filter(it => it.name.toLowerCase().includes(query)).slice(0, 10);
            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(it => `
                    <div class="search-result-item" onclick="handleSearchSelect('${it.id}')">
                        <span class="item-name">${it.name}</span>
                        <span class="item-type">${it.type}</span>
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
}

// --- GLOBAL HELPERS ---
window.handleSearchSelect = function (id) {
    const item = window.AppState.geoData.find(x => x.id === id);
    const layer = window.AppState.layers[id];
    if (!item || !layer) return;

    if (!window.AppState.dataGroup.hasLayer(layer)) {
        window.AppState.dataGroup.addLayer(layer);
    }

    document.getElementById('search-results').style.display = 'none';
    if (document.getElementById('search-input')) document.getElementById('search-input').value = '';

    updateSidebar(item);
    toggleMobileSidebar(true);

    if (layer.getBounds) map.flyToBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 12 });
    else map.flyTo(item.center, 12);
};

function updateSidebar(item) {
    const container = document.getElementById('river-details');
    if (!container) return;
    const imageSrc = item.image || `https://images.unsplash.com/photo-1546700086-4e007823f66b?auto=format&fit=crop&w=600&q=80`;

    container.innerHTML = `
        <div class="info-card fade-in">
            <div class="sidebar-image-container"><img src="${imageSrc}" class="sidebar-image"></div>
            <div class="card-header">
                <h2>${item.name}</h2>
                ${item.tags?.includes('top') ? '<span class="badge-top">★ TOP</span>' : ''}
            </div>
            <p class="river-desc">${item.description || "Опис завантажується..."}</p>
            <div class="info-grid">
                ${item.length ? `<div class="info-stat"><span>Довжина:</span> ${item.length}</div>` : ''}
                ${item.area ? `<div class="info-stat"><span>Площа:</span> ${item.area}</div>` : ''}
                ${item.basin ? `<div class="info-stat"><span>Басейн:</span> ${item.basin}</div>` : ''}
            </div>
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
