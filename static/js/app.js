console.clear();
console.log('🌊 HYDRO ATLAS v6.1: Implementing Managed State...');

/**
 * SENIOR ARCHITECTURE v6.1 (Managed State & Atomic Layers)
 */

window.AppState = {
    map: null,
    layers: {},
    geoData: [],
    currentFilter: 'all',
    dataGroup: L.featureGroup(), // Atomic group for all data layers
    isInitialized: false
};

// Constants
const RIVER_BLUE = '#00f2ff';
const LAKE_BLUE = '#0ea5e9';

// 1. Initialize Map
const map = L.map('map', {
    zoomControl: false,
    minZoom: 4,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    wheelPxPerZoom: 120,
}).setView([48.5, 31.0], 6);

window.AppState.map = map;
window.AppState.dataGroup.addTo(map);

// Theme & Panes
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

map.createPane('groundwaterPane').style.zIndex = 250;
map.createPane('marshPane').style.zIndex = 300;
map.createPane('waterPane').style.zIndex = 400;
map.createPane('riverPane').style.zIndex = 500;
map.createPane('cityPane').style.zIndex = 600;

// HELPERS
const isMobile = () => window.innerWidth <= 768;

function getStyle(item, isHovered) {
    let weight = 4;
    let opacity = 0.9;
    let fillOpacity = 0.5;
    let color = item.color || RIVER_BLUE;
    let stroke = true;
    let className = 'leaflet-interactive';

    if (item.type === 'river') {
        weight = isHovered ? 8 : 5;
        color = RIVER_BLUE;
        opacity = 1;
        className += ' river-flow';
    } else if (item.type === 'lake' || item.type === 'reservoir') {
        weight = isHovered ? 5 : 2;
        color = LAKE_BLUE;
        fillOpacity = isHovered ? 1 : 0.8;
        opacity = 1;
        className += ' lake-glow';
    } else if (item.type === 'groundwater') {
        weight = 1;
        fillOpacity = isHovered ? 0.6 : 0.4;
        stroke = false;
        color = '#a855f7';
    } else if (item.type === 'marsh') {
        weight = 2;
        fillOpacity = isHovered ? 0.8 : 0.6;
        opacity = 1;
        color = '#4d7c0f';
    } else if (item.type === 'cave') {
        weight = isHovered ? 14 : 8;
        fillOpacity = 1;
        color = '#fbbf24';
    }

    if (item.tags && item.tags.includes('top')) {
        if (!isHovered) weight += 1.5;
    }

    return {
        color, fillColor: color, weight, opacity, fillOpacity,
        lineCap: 'round', lineJoin: 'round', stroke, className
    };
}

function getImage(type) {
    const images = {
        river: 'https://images.unsplash.com/photo-1546700086-4e007823f66b?auto=format&fit=crop&w=600&q=80',
        lake: 'https://images.unsplash.com/photo-1506543730-36a567ea349a?auto=format&fit=crop&w=600&q=80',
        reservoir: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=600&q=80',
        marsh: 'https://images.unsplash.com/photo-1440557675305-9ca58968f7aa?auto=format&fit=crop&w=600&q=80',
        cave: 'https://images.unsplash.com/photo-1628172813158-b0a3aa48870c?auto=format&fit=crop&w=600&q=80',
        city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
        groundwater: 'https://images.unsplash.com/photo-1616886365823-38363c45731f?auto=format&fit=crop&w=600&q=80'
    };
    return images[type] || '';
}

function updateSidebar(item) {
    const container = document.getElementById('river-details');
    if (!container) return;

    const icons = { marsh: '🌿', cave: '🦇', groundwater: '💧', city: '🏙️', river: '🔹' };
    const icon = icons[item.type] || '🔹';

    let statsHtml = '';
    if (item.length) statsHtml += `<div class="info-stat"><span>Довжина:</span> ${item.length}</div>`;
    if (item.basin) statsHtml += `<div class="info-stat"><span>Басейн:</span> ${item.basin}</div>`;
    if (item.area) statsHtml += `<div class="info-stat"><span>Площа:</span> ${item.area}</div>`;
    if (item.depth) statsHtml += `<div class="info-stat"><span>Глибина:</span> ${item.depth}</div>`;
    if (item.source) statsHtml += `<div class="info-stat" style="width:100%; border-top:1px dashed rgba(255,255,255,0.1); padding-top:5px;"><span>↘️ Витік:</span> ${item.source}</div>`;
    if (item.mouth) statsHtml += `<div class="info-stat" style="width:100%;"><span>🌊 Гирло:</span> ${item.mouth}</div>`;

    const factsHtml = (item.facts && item.facts.length > 0) ? `
        <div class="facts-section" style="margin-top:15px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.1);">
            <h4 style="color:#94a3b8; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">Цікаві факти:</h4>
            <ul style="list-style:none; padding:0;">
                ${item.facts.map(f => `<li style="margin-bottom:5px; font-size:0.9rem; color:#cbd5e1;">• ${f}</li>`).join('')}
            </ul>
        </div>` : '';

    const imageSrc = item.image || getImage(item.type);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Україна природа')}`;

    container.innerHTML = `
        <div class="info-card fade-in" style="position:relative;">
            <div class="sidebar-image-container" style="margin-bottom:15px;">
                <img src="${imageSrc}" class="sidebar-image" alt="${item.name}" onerror="this.style.display='none'">
            </div>
            <div class="card-header">
                <h2>${icon} ${item.name}</h2>
                ${item.tags?.includes('top') ? '<span class="badge-top">★ TOP</span>' : ''}
            </div>
            <a href="${mapsLink}" target="_blank" class="maps-btn">
                <span>📍 Дивитись фото на карті</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <p class="river-desc">${item.description || "Інформація оновлюється..."}</p>
            <div class="info-grid">${statsHtml}</div>
            ${factsHtml}
        </div>
    `;
}

// 2. Load Data
async function initApp() {
    try {
        const response = await fetch('/api/geo-data');
        if (!response.ok) throw new Error('Network failure');
        window.AppState.geoData = await response.json();
        console.log(`📦 Data Loaded: ${window.AppState.geoData.length} objects.`);
        renderMap(window.AppState.geoData);
    } catch (e) {
        console.error('Core Load Error:', e);
    }
}

function renderMap(data) {
    data.forEach(item => {
        try {
            let layer;
            let pane = 'overlayPane';
            if (item.type === 'river') pane = 'riverPane';
            else if (item.type === 'lake' || item.type === 'reservoir') pane = 'waterPane';
            else if (item.type === 'marsh') pane = 'marshPane';
            else if (item.type === 'groundwater') pane = 'groundwaterPane';
            else if (item.type === 'cave') pane = 'riverPane';

            const style = getStyle(item, false);

            if (item.type === 'river') {
                layer = L.polyline(item.path, { ...style, pane });
            } else if (item.path) {
                layer = L.polygon(item.path, { ...style, pane });
            } else if (item.center) {
                layer = L.circle(item.center, { radius: item.radius || 3000, ...style, pane });
            }

            if (layer) {
                // ADD TO DATA GROUP INSTEAD OF DIRECT MAP
                window.AppState.dataGroup.addLayer(layer);
                window.AppState.layers[item.id] = layer;

                layer.on('mouseover', function () { this.setStyle(getStyle(item, true)); });
                layer.on('mouseout', function () { this.setStyle(getStyle(item, false)); });
                layer.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    updateSidebar(item);
                    toggleMobileSidebar(true);
                    if (layer.getBounds) {
                        window.AppState.map.flyToBounds(layer.getBounds(), { padding: [20, 20], maxZoom: 10 });
                    } else {
                        window.AppState.map.flyTo(item.center, 10);
                    }
                });

                layer.bindTooltip(item.name, { permanent: false, className: 'custom-tooltip' });
            }
        } catch (e) {
            console.warn('Skipping invalid item:', item.id);
        }
    });
}

// 3. Interactions logic
function initInteractions() {
    // FILTERS
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-filter');

            // GUARD: Prevent redundant processing
            if (window.AppState.currentFilter === cat) return;
            window.AppState.currentFilter = cat;

            console.log(`🧹 Atomic Registry Cleansing for category: ${cat}`);

            // UI Toggle
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 1. ATOMIC CLEAR (Using managed FeatureGroup)
            window.AppState.dataGroup.clearLayers();

            // 2. RE-ADD CATEGORY
            window.AppState.geoData.forEach(item => {
                let isVisible = false;
                if (cat === 'all') isVisible = true;
                else if (cat === 'top' && item.tags?.includes('top')) isVisible = true;
                else if (cat === 'groundwater' && (item.type === 'groundwater' || item.type === 'cave')) isVisible = true;
                else if (item.type === cat) isVisible = true;

                if (isVisible && window.AppState.layers[item.id]) {
                    window.AppState.dataGroup.addLayer(window.AppState.layers[item.id]);
                }
            });
        });
    });

    // Reset View
    const resetBtn = document.getElementById('reset-view');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            window.AppState.map.setView([48.5, 31.0], 6);
            window.closeSidebar();
            // This will trigger the GUARD check and filter reset
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) allBtn.click();
        });
    }

    // Search
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) { searchResults.style.display = 'none'; return; }
            const filtered = window.AppState.geoData.filter(it => it.name.toLowerCase().includes(query)).slice(0, 10);
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(it => `
                    <div class="search-result-item" onclick="handleSearchSelect('${it.id}')">
                        <span class="item-name">${it.name}</span>
                        <span class="item-type">${it.type}</span>
                    </div>`).join('');
                searchResults.style.display = 'block';
            } else { searchResults.style.display = 'none'; }
        });
    }

    console.log('✅ HydroAtlas v6.1: Advanced State Online');
}

// Global functions
window.handleSearchSelect = function (id) {
    const item = window.AppState.geoData.find(x => x.id === id);
    const layer = window.AppState.layers[id];
    if (!item || !layer) return;

    // Ensure the layer is actually on the map if filtered out
    if (!window.AppState.dataGroup.hasLayer(layer)) {
        window.AppState.dataGroup.addLayer(layer);
    }

    document.getElementById('search-results').style.display = 'none';
    updateSidebar(item);
    toggleMobileSidebar(true);
    if (layer.getBounds) window.AppState.map.flyToBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 14 });
    else window.AppState.map.flyTo(item.center, 14);
};

function toggleMobileSidebar(expand) {
    if (!isMobile()) return;
    const s = document.querySelector('.sidebar');
    if (s) {
        if (expand) s.classList.remove('mobile-collapsed');
        else s.classList.add('mobile-collapsed');
    }
}

window.closeSidebar = () => toggleMobileSidebar(false);

// BOOTSTRAP
document.addEventListener('DOMContentLoaded', async () => {
    if (window.AppState.isInitialized) return;

    await initApp();

    const cityIcon = L.divIcon({
        className: 'city-icon',
        html: '<div style="background:#fff; width:8px; height:8px; border-radius:50%; box-shadow:0 0 10px #fff;"></div>',
        iconSize: [8, 8]
    });

    CITIES.forEach(c => {
        L.marker(c.coords, { icon: cityIcon, pane: 'cityPane', title: c.name })
            .addTo(window.AppState.map)
            .bindTooltip(c.name, { permanent: true, direction: 'right', className: 'city-tooltip' })
            .on('click', () => {
                updateSidebar(c);
                window.AppState.map.flyTo(c.coords, 10);
                if (isMobile()) toggleMobileSidebar(true);
            });
    });

    initInteractions();
    window.AppState.isInitialized = true;
});
