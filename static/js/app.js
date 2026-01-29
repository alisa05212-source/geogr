console.log('🌊 HYDRO ATLAS: Script Loaded');

// Initialize map with Smooth Zoom
const map = L.map('map', {
    zoomControl: false,
    minZoom: 4,
    zoomSnap: 0.1,      // Smooth fractional zooming
    zoomDelta: 0.5,     // Smaller steps for buttons
    wheelPxPerZoom: 120, // Slower, smoother wheel zoom
    // Mobile padding (optional, can be dynamic)
}).setView([48.5, 31.0], 6);

// Mobile check helper
const isMobile = () => window.innerWidth <= 768;

// Zoom Control - adjusted for mobile layout via CSS
L.control.zoom({ position: 'topright' }).addTo(map);

// Dark Matter Theme
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Create Panes with better z-index separation
map.createPane('groundwaterPane');
map.getPane('groundwaterPane').style.zIndex = 250; // Move to background

map.createPane('marshPane');
map.getPane('marshPane').style.zIndex = 300;

map.createPane('waterPane');
map.getPane('waterPane').style.zIndex = 400; // Lakes / Reservoirs

map.createPane('riverPane');
map.getPane('riverPane').style.zIndex = 500; // Rivers - foreground

map.createPane('cityPane');
map.getPane('cityPane').style.zIndex = 600; // Cities - topmost

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

let layers = {};
// Global data container to avoid ReferenceError in event listeners
let GEO_DATA = [];

const RIVER_BLUE = '#00f2ff'; // Vivid Electric Cyan
const LAKE_BLUE = '#0ea5e9';

function getStyle(item, isHovered) {
    let weight = 4;
    let opacity = 0.9;
    let fillOpacity = 0.5;
    let color = item.color || RIVER_BLUE;
    let stroke = true;
    let className = 'leaflet-interactive';

    if (item.type === 'river') {
        weight = isHovered ? 8 : 5;
        color = RIVER_BLUE; // Force high visibility blue
        opacity = 1;
        className += ' river-flow';
    }
    else if (item.type === 'lake' || item.type === 'reservoir') {
        weight = isHovered ? 5 : 2;
        color = LAKE_BLUE;
        fillOpacity = isHovered ? 1 : 0.8;
        opacity = 1;
        className += ' lake-glow';
    }
    else if (item.type === 'groundwater') {
        weight = 1;
        fillOpacity = isHovered ? 0.6 : 0.4;
        stroke = false;
        color = '#a855f7';
    }
    else if (item.type === 'marsh') {
        weight = 2;
        fillOpacity = isHovered ? 0.8 : 0.6;
        opacity = 1;
        color = '#4d7c0f';
    }
    else if (item.type === 'cave') {
        weight = isHovered ? 14 : 8;
        fillOpacity = 1;
        color = '#fbbf24';
    }

    if (item.tags && item.tags.includes('top')) {
        if (!isHovered) weight += 1.5;
    }

    return {
        color: color,
        fillColor: color,
        weight: weight,
        opacity: opacity,
        fillOpacity: fillOpacity,
        lineCap: 'round',
        lineJoin: 'round',
        stroke: stroke,
        className: className
    };
}

function getImage(type) {
    // Specific, high-quality nature images
    if (type === 'river') return 'https://images.unsplash.com/photo-1546700086-4e007823f66b?auto=format&fit=crop&w=600&q=80'; // Scenic river
    if (type === 'lake') return 'https://images.unsplash.com/photo-1506543730-36a567ea349a?auto=format&fit=crop&w=600&q=80'; // Calm lake
    if (type === 'reservoir') return 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=600&q=80'; // Wide water
    if (type === 'marsh') return 'https://images.unsplash.com/photo-1440557675305-9ca58968f7aa?auto=format&fit=crop&w=600&q=80'; // Green marsh
    if (type === 'cave') return 'https://images.unsplash.com/photo-1628172813158-b0a3aa48870c?auto=format&fit=crop&w=600&q=80'; // Cave
    if (type === 'city') return 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80'; // City
    if (type === 'groundwater') return 'https://images.unsplash.com/photo-1616886365823-38363c45731f?auto=format&fit=crop&w=600&q=80'; // Water drop
    return '';
}

function updateSidebar(item) {
    const container = document.getElementById('river-details');
    let icon = '🔹';
    if (item.type === 'marsh') icon = '🌿';
    if (item.type === 'cave') icon = '🦇';
    if (item.type === 'groundwater') icon = '💧';
    if (item.type === 'city') icon = '🏙️';

    let statsHtml = '';
    if (item.length) statsHtml += `<div class="info-stat"><span>Довжина:</span> ${item.length}</div>`;
    if (item.basin) statsHtml += `<div class="info-stat"><span>Басейн:</span> ${item.basin}</div>`;
    if (item.area) statsHtml += `<div class="info-stat"><span>Площа:</span> ${item.area}</div>`;
    if (item.depth) statsHtml += `<div class="info-stat"><span>Глибина:</span> ${item.depth}</div>`;
    if (item.source) statsHtml += `<div class="info-stat" style="width:100%; margin-top:5px; border-top:1px dashed rgba(255,255,255,0.1); padding-top:5px;"><span>↘️ Витік:</span> ${item.source}</div>`;
    if (item.mouth) statsHtml += `<div class="info-stat" style="width:100%;"><span>🌊 Гирло:</span> ${item.mouth}</div>`;

    // Facts
    let factsHtml = '';
    if (item.facts && item.facts.length > 0) {
        factsHtml = `<div class="facts-section" style="margin-top:15px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.1);">
            <h4 style="color:#94a3b8; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">Цікаві факти:</h4>
            <ul style="list-style:none; padding:0;">
                ${item.facts.map(f => `<li style="margin-bottom:5px; font-size:0.9rem; color:#cbd5e1;">• ${f}</li>`).join('')}
            </ul>
        </div>`;
    }

    // Ecology
    let ecologyHtml = '';
    if (item.ecology) {
        ecologyHtml = `<div class="ecology-section" style="margin-top:15px; background: rgba(16, 185, 129, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(16, 185, 129, 0.2);">
            <h4 style="color:#34d399; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">Екологія:</h4>
            <p style="font-size:0.9rem; color:#d1fae5; margin:0;">${item.ecology}</p>
        </div>`;
    }

    // Origin (Etymology)
    let originHtml = '';
    if (item.origin) {
        originHtml = `<div class="origin-section" style="margin-top:15px; background: rgba(245, 158, 11, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(245, 158, 11, 0.2);">
            <h4 style="color:#fbbf24; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">📜 Походження назви:</h4>
            <p style="font-size:0.9rem; color:#fef3c7; margin:0;">${item.origin}</p>
        </div>`;
    }

    // Legend
    let legendHtml = '';
    if (item.legend) {
        legendHtml = `<div class="legend-section" style="margin-top:10px; background: rgba(139, 92, 246, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(139, 92, 246, 0.2);">
            <h4 style="color:#a78bfa; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">🐉 Легенда:</h4>
            <p style="font-size:0.9rem; color:#ede9fe; margin:0;"><i>"${item.legend}"</i></p>
        </div>`;
    }

    // Wildlife (Flora & Fauna)
    let wildlifeHtml = '';
    if (item.wildlife) {
        wildlifeHtml = `<div class="wildlife-section" style="margin-top:10px; background: rgba(56, 189, 248, 0.1); padding:10px; border-radius:8px; border:1px solid rgba(56, 189, 248, 0.2);">
            <h4 style="color:#7dd3fc; font-size:0.8rem; text-transform:uppercase; margin-bottom:5px;">🐟 Флора і Фауна:</h4>
            <p style="font-size:0.9rem; color:#e0f2fe; margin:0;">${item.wildlife}</p>
        </div>`;
    }

    // NEW: Image & Google Maps Button
    const imageSrc = item.image ? item.image : getImage(item.type); // Fallback to generic if specific missing
    const googleQuery = encodeURIComponent(item.name + ' Україна природа');
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${googleQuery}`;

    // Close Button for Mobile (Chevron Down styled)
    const closeBtn = isMobile() ? `
    <button onclick="closeSidebar()" style="position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.1); border:none; color:white; width:32px; height:32px; border-radius:50%; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>` : '';

    container.innerHTML = `
        <div class="info-card fade-in" style="position:relative;">
            ${closeBtn}
            <div class="sidebar-image-container" style="margin-bottom:15px;">
                <img src="${imageSrc}" class="sidebar-image" alt="${item.name}" onerror="this.style.display='none'">
            </div>
            
            <div class="card-header">
                <h2>${icon} ${item.name}</h2>
                ${item.tags && item.tags.includes('top') ? '<span class="badge-top">★ TOP</span>' : ''}
            </div>
            
            <a href="${mapsLink}" target="_blank" class="maps-btn">
                <span>📍 Дивитись фото на карті</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>

            <p class="river-desc">${item.description || "Інформація оновлюється..."}</p>
            
            <div class="info-grid" style="margin-top:10px;">
                ${statsHtml}
            </div>
            ${factsHtml}
            ${ecologyHtml}
            ${originHtml}
            ${legendHtml}
            ${wildlifeHtml}
        </div>
    `;
}

// Render Water Data
async function initApp() {
    try {
        const response = await fetch('/api/geo-data');
        if (!response.ok) throw new Error('Network response was not ok');

        // Global variable for search and other functions
        GEO_DATA = await response.json();
        window.GEO_DATA = GEO_DATA; // Keep window ref just in case helpers use it

        console.group('🔍 HydroAtlas Diagnostics');
        console.log('Total items loaded from DB:', window.GEO_DATA.length);
        console.log('Rivers count:', window.GEO_DATA.filter(x => x.type === 'river').length);
        console.groupEnd();

        renderMap(window.GEO_DATA);

    } catch (error) {
        console.error('Failed to load geographical data:', error);
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
                layer = L.polyline(item.path, { ...style, pane: pane });
            }
            else if (item.type === 'lake' || item.type === 'reservoir' || item.type === 'cave' || (item.type === 'marsh' && item.center)) {
                if (item.path) {
                    layer = L.polygon(item.path, { ...style, pane: pane });
                } else {
                    layer = L.circle(item.center, {
                        radius: item.radius || 3000,
                        ...style,
                        pane: pane
                    });
                }
            }
            else if (item.type === 'groundwater' || item.type === 'marsh') {
                if (item.path) {
                    layer = L.polygon(item.path, { ...style, pane: pane });
                } else if (item.center) {
                    layer = L.circle(item.center, {
                        radius: item.radius || 3000,
                        ...style,
                        pane: pane
                    });
                }
            }

            // Mobile Sidebar Logic
            window.closeSidebar = function () {
                document.getElementById('river-details').innerHTML = '<div class="placeholder-text"><p>Оберіть об\'єкт...</p></div>';
            };

            if (layer) {
                layer.addTo(map);
                layers[item.id] = layer;

                layer.on('mouseover', function () {
                    this.setStyle(getStyle(item, true));
                });

                layer.on('mouseout', function () {
                    this.setStyle(getStyle(item, false));
                });

                layer.on('click', function (e) {
                    L.DomEvent.stopPropagation(e);
                    updateSidebar(item);
                    toggleMobileSidebar(true);

                    const padding = isMobile() ? [0, 200] : [0, 0];

                    if (item.type === 'groundwater' || item.type === 'marsh' || item.type === 'reservoir' || item.path) {
                        if (layer.getBounds) {
                            map.flyToBounds(layer.getBounds(), {
                                paddingBottomRight: isMobile() ? [0, 300] : [0, 0],
                                maxZoom: 10
                            });
                        }
                    } else if (item.center) {
                        map.flyTo(item.center, 10);
                    }
                });

                layer.bindTooltip(item.name, {
                    permanent: false,
                    direction: 'center',
                    className: 'custom-tooltip'
                });
            }
        } catch (e) {
            console.warn('Skipping invalid item:', item.id, e);
        }
    });
}

// Start App is now handled in DOMContentLoaded to prevent race conditions.
// initApp(); <- REMOVED to fix duplicated logic

// Cities logic moved to DOMContentLoaded initialization block.

// --- INTERACTIONS INITIALIZATION ---
function initInteractions() {
    console.log('🚀 HydroAtlas initialization started...');

    // 1. Search Logic
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            if (!GEO_DATA || GEO_DATA.length === 0) return;

            const filtered = GEO_DATA.filter(item =>
                item.name.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query))
            ).slice(0, 10);

            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(item => `
                    <div class="search-result-item" onclick="handleSearchSelect('${item.id}')">
                        <span class="item-name">${item.name}</span>
                        <span class="item-type">${item.type === 'river' ? 'річка' : item.type === 'lake' ? 'озеро' : 'об\'єкт'}</span>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    // 2. Reset View Logic
    const resetBtn = document.getElementById('reset-view');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (map) map.setView([48.5, 31.0], 6);
            if (window.closeSidebar) window.closeSidebar();

            // 🔥 Reset filters too
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) allBtn.click();
        });
    }

    // --- FILTER HELPERS ---
    const hideAllLayers = () => {
        Object.values(layers).forEach(layer => {
            if (map.hasLayer(layer)) map.removeLayer(layer);
        });
    };

    // 3. Filters Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = btn.getAttribute('data-filter');

                // UI Toggle
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 1. CLEAR EVERYTHING FIRST (ChatGPT Rule #1)
                hideAllLayers();

                const dataList = window.GEO_DATA || GEO_DATA;
                if (!dataList) return;

                // 2. SHOW ONLY SELECTED (Replacement Strategy)
                Object.keys(layers).forEach(id => {
                    const item = dataList.find(x => x.id === id);
                    if (!item) return;

                    let isVisible = false;
                    if (cat === 'all') isVisible = true;
                    else if (cat === 'top' && item.tags && item.tags.includes('top')) isVisible = true;
                    else if (cat === 'groundwater' && (item.type === 'groundwater' || item.type === 'cave')) isVisible = true;
                    else if (item.type === cat) isVisible = true;

                    if (isVisible) {
                        const layer = layers[id];
                        map.addLayer(layer);
                    }
                });
            });
        });
    }

    // 4. Mobile Logic
    if (isMobile()) {
        toggleMobileSidebar(false); // Start collapsed

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.addEventListener('click', (e) => {
                if (e.target.closest('.filters') || e.target.closest('button') || e.target.closest('input')) return;
                if (sidebar.classList.contains('mobile-collapsed')) {
                    toggleMobileSidebar(true);
                }
            });

            // Swipe logic
            let touchStartY = 0;
            sidebar.addEventListener('touchstart', (e) => {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            sidebar.addEventListener('touchend', (e) => {
                const swipeDistance = e.changedTouches[0].screenY - touchStartY;
                if (swipeDistance > 50 && sidebar.scrollTop <= 5) {
                    toggleMobileSidebar(false);
                }
            }, { passive: true });
        }
    }

    console.log('✅ HydroAtlas interactions ready');
}

// Mobile Sidebar Logic
function toggleMobileSidebar(expand) {
    if (!isMobile()) return;
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    if (expand) {
        sidebar.classList.remove('mobile-collapsed');
    } else {
        sidebar.classList.add('mobile-collapsed');
        sidebar.scrollTop = 0;
    }
}

// Global Close Function
window.closeSidebar = function () {
    toggleMobileSidebar(false);
};

// Map Click to Collapse
map.on('click', (e) => {
    if (isMobile()) {
        toggleMobileSidebar(false);
    }
});

// Global Search Select
window.handleSearchSelect = function (id) {
    const list = window.GEO_DATA || GEO_DATA;
    if (!list) return;

    const item = list.find(x => x.id === id);
    const layer = layers[id];

    if (!item || !layer) return;

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.style.display = 'none';

    updateSidebar(item);
    toggleMobileSidebar(true);

    layer.fire('mouseover');
    setTimeout(() => layer.fire('mouseout'), 2000);

    if (item.path) {
        map.flyToBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 10 });
    } else if (item.center) {
        map.flyTo(item.center, 10);
    }
};

// Start Everything
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render cities (independent logic)
    const cityIcon = L.divIcon({
        className: 'city-icon',
        html: '<div style="background:#fff; width:8px; height:8px; border-radius:50%; box-shadow:0 0 10px #fff;"></div>',
        iconSize: [8, 8]
    });

    CITIES.forEach(city => {
        L.marker(city.coords, {
            icon: cityIcon,
            pane: 'cityPane',
            title: city.name
        })
            .addTo(map)
            .bindTooltip(city.name, {
                permanent: true,
                direction: 'right',
                offset: [10, 0],
                className: 'city-tooltip'
            })
            .on('click', () => {
                updateSidebar(city);
                map.flyTo(city.coords, 10);
                if (isMobile()) toggleMobileSidebar(true);
            });
    });

    // 2. Initialize App Data
    initApp();

    // 3. Initialize Interactions
    initInteractions();
});
