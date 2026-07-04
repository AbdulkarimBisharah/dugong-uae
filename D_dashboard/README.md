# D_dashboard — Track D: Dashboard, Visuals & Video

Interactive risk dashboard prototype (D1/D2). Static site — no build step, no
server framework — `index.html` + `layers.js` + `app.js` + `data.json`.

```
D_dashboard/
├── index.html      # page shell, loads Leaflet from CDN
├── layers.js        # Earth Engine tile URLs + risk palette + threat styling
├── app.js           # map setup, layer control, legend, hotspot popups
├── data.json        # AOI boundary + threat_data/*.geojson + ranked hotspot table (local, static)
├── figures/         # D3 — labelled static figures for the write-up (real data)
├── STYLE_GUIDE.md   # D4 — colors/typography already applied here, as a starting point
└── README.md        # this file
```

## Running it

Any static file server works, e.g. from this folder:

```
python -m http.server 8123
```

then open `http://localhost:8123`.

## What it shows

- **Base map:** Esri World Imagery satellite.
- **Risk class (5 classes)** — main layer, live Earth Engine tiles from the
  cached risk asset (`dugong_risk_class`, blue→red).
- **Risk index (continuous)** and **Combined threat pressure** — drill-down
  layers, same source.
- **Hotspot markers** — from `C_risk_gis/dugong_risk_hotspots_ranked.csv`
  (marker size = area, colour = mean risk). Click for rank/area/risk/dominant
  threat.
- **Threat context layers** (protected areas, dugong areas, discharge,
  development, vessel pressure) — from `C_risk_gis/threat_data/*.geojson`,
  toggleable, same styling as `RISK_METHODOLOGY.md`.
- **AOI boundary** — the Marawah study area outline.

## Known limitation — Earth Engine tile URLs expire

`layers.js`'s `EE_TILE_URLS` come from a one-off `ee.Image.getMapId()` call
against `projects/seagrass-uae-project/assets/dugong-uae/dugong_risk_cache`.
These tokens are **not permanent** — if the map tiles stop loading, regenerate
them:

```python
import ee
ee.Initialize(project="seagrass-uae-project")
cached = ee.Image("projects/seagrass-uae-project/assets/dugong-uae/dugong_risk_cache").divide(1000)

risk_class_vis = {"min": 1, "max": 5, "palette": ["2c7bb6","abd9e9","ffffbf","fdae61","d7191c"]}
print(cached.select("risk_class").round().toByte().getMapId(risk_class_vis)["tile_fetcher"].url_format)
```

Paste the new URL into `EE_TILE_URLS.riskClass` (and similarly for `threat` /
`riskContinuous`, weighting T1-T5 from the cache — see
`C_risk_gis/Dugong_Habitat_Risk.ipynb`, the C6 section, for the exact weights).

For a durable, non-expiring version: export `dugong_risk_class.tif` etc. as
static map tiles (or host via a proper Earth Engine App) instead of live
`getMapId()` tokens.

## Track D status

- **D1** (pick a format) — done: static Leaflet web map.
- **D2** (build the dashboard) — done, verified in-browser (see above).
- **D3** (labelled figures) — `figures/` has 5 real figures from Track B/C's
  actual numbers (accuracy, feature importance, weight sensitivity, ranked
  hotspots). Still missing: a before/after seagrass-change map and a plain
  static export of the risk map itself — see `figures/README.md`.
- **D4** (visual identity) — `STYLE_GUIDE.md` documents the palette/type
  already used consistently here, as a starting point (not matched against an
  actual slide deck, since none was available).
- **D5** (short video) — not started; needs an actual person recording/editing,
  not something buildable here.
- **D6** (final deck polish) — blocked on Track E's write-up existing first.
