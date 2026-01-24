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

let layers = {};

function getStyle(item, isHovered) {
    let weight = 3;
    let opacity = 0.8;
    let fillOpacity = 0.4;
    let color = item.color;
    let stroke = true;
    let className = 'leaflet-interactive';

    if (item.type === 'river') {
        weight = isHovered ? 6 : 4;
        opacity = 1;
        className += ' river-flow';
    }
    else if (item.type === 'lake' || item.type === 'reservoir') {
        weight = isHovered ? 4 : 2;
        fillOpacity = isHovered ? 0.9 : 0.7;
        opacity = 1;
        className += ' lake-glow';
        if (item.type === 'reservoir') fillOpacity = 0.8;
    }
    else if (item.type === 'groundwater') {
        weight = 1;
        fillOpacity = isHovered ? 0.3 : 0.05; // Extremely transparent background
        stroke = false;
    }
    else if (item.type === 'marsh') {
        weight = 0;
        fillOpacity = isHovered ? 0.6 : 0.4;
    }
    else if (item.type === 'cave') {
        weight = isHovered ? 10 : 5;
        fillOpacity = 1;
    }

    if (item.tags && item.tags.includes('top')) {
        if (!isHovered) weight += 1;
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
console.log('Rendering GEO_DATA, items count:', GEO_DATA.length);
GEO_DATA.forEach(item => {
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
            // Reset mobile view padding if needed, or just let users pan
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
                L.DomEvent.stopPropagation(e); // Prevent map click from closing it immediately
                updateSidebar(item);
                toggleMobileSidebar(true);

                // Smart FlyTo with Padding
                const padding = isMobile() ? [0, 200] : [0, 0]; // [x, y] - shift center up by 200px on mobile
                // Note: flyTo doesn't support 'padding' option uniformly like fitBounds does for off-centering.
                // We simulate it by using a latLng offset or fitBounds with paddingBottomRight.

                if (item.type === 'groundwater' || item.type === 'marsh' || item.type === 'reservoir' || item.path) {
                    // Polygons/Polylines: Use fitBounds which supports padding options
                    if (layer.getBounds) {
                        map.flyToBounds(layer.getBounds(), {
                            paddingBottomRight: isMobile() ? [0, 300] : [0, 0],
                            maxZoom: 10
                        });
                    }
                } else if (item.center) {
                    // Points: Center map but shifted
                    let target = L.latLng(item.center);
                    // On mobile, we can't easily 'shift' center with flyTo directly without projection math.
                    // Simpler: Just fly there, user can pan. Or use setView with offset logic (complex).
                    // Fallback to simple flyTo for points.
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

// Cities
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
        });
});

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const cat = e.target.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        GEO_DATA.forEach(item => {
            const layer = layers[item.id];
            if (!layer) return;

            let isVisible = false;
            if (cat === 'all') isVisible = true;
            else if (cat === 'top' && item.tags && item.tags.includes('top')) isVisible = true;
            else if (item.type === cat) isVisible = true;
            else if (cat === 'groundwater' && (item.type === 'groundwater' || item.type === 'cave')) isVisible = true;

            if (isVisible) {
                if (!map.hasLayer(layer)) map.addLayer(layer);
            } else {
                if (map.hasLayer(layer)) map.removeLayer(layer);
            }
        });
    });
});

// Mobile Sidebar Logic
function toggleMobileSidebar(expand) {
    if (!isMobile()) return;
    const sidebar = document.querySelector('.sidebar');
    if (expand) {
        sidebar.classList.remove('mobile-collapsed');
    } else {
        sidebar.classList.add('mobile-collapsed');
        // Ensure scroll resets when collapsed
        sidebar.scrollTop = 0;
    }
}

// Global Close Function
window.closeSidebar = function () {
    toggleMobileSidebar(false);
};

// Map Click to Collapse
map.on('click', function (e) {
    if (isMobile() && !e.originalEvent._stopped) {
        toggleMobileSidebar(false);
    }
});

// Initial State
if (isMobile()) {
    toggleMobileSidebar(false);

    // Allow clicking the header area to expand
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.sidebar-header'); // Target the header area for swipes

    sidebar.addEventListener('click', function (e) {
        // Expand if clicking header or general area (not buttons)
        if (e.target.closest('.filters') || e.target.closest('button')) return;
        if (sidebar.classList.contains('mobile-collapsed')) {
            toggleMobileSidebar(true);
        }
    });

    // SWIPE DOWN TO CLOSE (iOS Style)
    let touchStartY = 0;
    let touchEndY = 0;

    // Attach to sidebar, but check if we are at the top
    sidebar.addEventListener('touchstart', function (e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    sidebar.addEventListener('touchend', function (e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndY - touchStartY;
        const isAtTop = sidebar.scrollTop <= 5; // Allow small margin

        // If swiped down significantly (> 50px) and we are at the top of the content
        if (swipeDistance > 50 && isAtTop) {
            // Check if we are interacting with the handle or header area
            // Or just generally swiping down when scrolled to top
            toggleMobileSidebar(false);

            // Also reset selection if desired, or just collapse
            // window.closeSidebar(); // Uncomment if swipe should fully clear selection too
        }
    }
}

// Updated Legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');

    // Mobile Minimized State Logic
    if (isMobile()) {
        div.classList.add('minimized');
        div.setAttribute('title', 'Легенда');

        // Prevent map clicks propagating
        L.DomEvent.disableClickPropagation(div);

        // Toggle on click
        div.onclick = function (e) {
            this.classList.toggle('minimized');
        };
    }

    const grades = [
        { name: 'Річки', color: '#0ea5e9' },
        { name: 'Прісні озера', color: '#06b6d4' },
        { name: 'Солоні лимани', color: '#db2777' },
        { name: 'Болота', color: '#4d7c0f' },
        { name: 'Артезіанські', color: '#a855f7' },
        { name: 'Міста', color: '#ffffff' }
    ];

    let content = '<h4 style="margin:0 0 10px 0; font-size:0.9rem; text-transform:uppercase; color:#94a3b8;">Легенда</h4>';
    grades.forEach(item => {
        content += '<div style="display:flex; align-items:center; margin-bottom:4px;"><i style="background:' + item.color + '; width: 12px; height: 12px; display: inline-block; margin-right: 8px; border-radius:3px; box-shadow:0 0 5px ' + item.color + '"></i><span style="font-size:0.85rem;">' + item.name + '</span></div>';
    });

    if (isMobile()) {
        content += '<div style="margin-top:8px; font-size:0.7rem; color:#64748b; text-align:center;">(натисни щоб згорнути)</div>';
    }

    div.innerHTML = content;
    return div;
};
legend.addTo(map);
