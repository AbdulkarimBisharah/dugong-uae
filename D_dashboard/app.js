const STUDY_AREA_CENTER = [24.3312, 53.1496]; // [lat, lon]

const map = L.map("map", { zoomControl: true }).setView(STUDY_AREA_CENTER, 11);

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "Esri World Imagery", maxZoom: 18 }
).addTo(map);

const osmLabels = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
  { attribution: "CARTO", maxZoom: 18, opacity: 0.8 }
);

// ---- Earth Engine risk layers ----
const riskClassLayer = L.tileLayer(EE_TILE_URLS.riskClass, {
  attribution: "Earth Engine — Dugong Watch risk model",
  opacity: 0.75,
}).addTo(map);

const threatLayer = L.tileLayer(EE_TILE_URLS.threat, {
  attribution: "Earth Engine — combined threat pressure",
  opacity: 0.75,
});

const riskContinuousLayer = L.tileLayer(EE_TILE_URLS.riskContinuous, {
  attribution: "Earth Engine — continuous risk index",
  opacity: 0.75,
});

// ---- Load local data (AOI boundary, threat context layers, hotspots) ----
fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    buildAoiLayer(data.study_area);
    buildThreatLayers(data.threats);
    buildHotspotLayer(data.hotspots);
    buildLegend();
    buildLayerControl();
  });

function buildAoiLayer(studyAreaGeoJSON) {
  const aoi = L.geoJSON(studyAreaGeoJSON, {
    style: { color: "#ffffff", weight: 2, fill: false, dashArray: "4 4" },
  }).addTo(map);
  window.__aoiLayer = aoi;
}

function buildThreatLayers(threats) {
  window.__threatLayers = {};
  for (const [key, style] of Object.entries(THREAT_STYLE)) {
    const fc = threats[key];
    if (!fc) continue;
    const layer = L.geoJSON(fc, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          color: style.color,
          fillColor: style.color,
          fillOpacity: 0.85,
          weight: 1,
        }),
      style: () => ({ color: style.color, weight: 2, fillOpacity: 0.15 }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        const rows = Object.entries(p)
          .map(([k, v]) => `<div><b>${k}:</b> ${v}</div>`)
          .join("");
        layer.bindPopup(`<div class="hotspot-popup"><b>${style.label}</b>${rows}</div>`);
      },
    });
    window.__threatLayers[key] = layer;
  }
}

function buildHotspotLayer(hotspots) {
  const layer = L.layerGroup();
  hotspots.forEach((h) => {
    const risk = parseFloat(h.mean_risk);
    const color = riskToColor(risk);
    const marker = L.circleMarker([parseFloat(h.lat), parseFloat(h.lon)], {
      radius: 7 + Math.min(6, Math.sqrt(parseFloat(h.area_ha)) / 12),
      color: "#111827",
      weight: 1.5,
      fillColor: color,
      fillOpacity: 0.9,
    });
    marker.bindPopup(
      `<div class="hotspot-popup">` +
        `<b>Hotspot #${h.rank}</b><br>` +
        `${h.area_ha} ha, mean risk ${h.mean_risk}<br>` +
        `Dominant threat: <b>${h.dominant_threat}</b>` +
        `</div>`
    );
    layer.addLayer(marker);
  });
  layer.addTo(map);
  window.__hotspotLayer = layer;
}

function riskToColor(v) {
  // 0-1 continuous risk -> 5-class palette, matching the risk_class breaks
  if (v < 0.35) return RISK_PALETTE[1];
  if (v < 0.45) return RISK_PALETTE[2];
  if (v < 0.55) return RISK_PALETTE[3];
  return RISK_PALETTE[4];
}

function buildLegend() {
  const legend = L.control({ position: "bottomleft" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "legend");
    let rows = "<h4>Risk to dugong habitat</h4>";
    RISK_PALETTE.forEach((c, i) => {
      rows += `<div class="row"><span class="swatch" style="background:${c}"></span>${RISK_LABELS[i]}</div>`;
    });
    rows += "<h4 style='margin-top:8px'>Hotspot markers</h4>";
    rows += "<div class='row'>size = area, colour = mean risk</div>";
    div.innerHTML = rows;
    return div;
  };
  legend.addTo(map);
}

function buildLayerControl() {
  const baseLayers = {
    "Satellite (Esri)": satellite,
  };
  const overlays = {
    "Risk class (5 classes)": riskClassLayer,
    "Risk index (continuous)": riskContinuousLayer,
    "Combined threat pressure": threatLayer,
    "Hotspot markers": window.__hotspotLayer,
    "AOI boundary": window.__aoiLayer,
    "Place labels": osmLabels,
  };
  for (const [key, style] of Object.entries(THREAT_STYLE)) {
    if (window.__threatLayers[key]) {
      overlays[style.label] = window.__threatLayers[key];
    }
  }
  L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);
}
