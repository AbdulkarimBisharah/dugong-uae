# C_risk_gis — Track C: Habitat-Risk Layer & GIS

Turns Track B's seagrass outputs into a ranked **"risk to dugong habitat"** map for the
Marawah / Bu Tinah region. Runs end-to-end in Google Earth Engine (Colab), same stack as
`M2_classification/`.

```
C_risk_gis/
├── Dugong_Habitat_Risk.ipynb   # the pipeline (C1–C6) — run this
├── RISK_METHODOLOGY.md         # C2: transparent, explainable weighting scheme
├── README.md                   # this file (run guide + M4 handoff schema)
└── threat_data/                # C1: threat layers (GeoJSON) + SOURCES.md
    ├── protected_areas.geojson
    ├── dugong_areas.geojson
    ├── desalination_industrial.geojson
    ├── coastal_development.geojson
    ├── vessel_pressure.geojson
    └── SOURCES.md
```

## What it does (C1–C6)
1. **C1** — loads real regional threat data (protected areas, dugong cores, desalination/
   industrial discharge, coastal development/dredging, vessels) + a Landsat thermal (SST) layer.
2. **C2** — normalizes each factor to 0–1 and combines them with a documented, tunable
   weighting scheme (`WEIGHTS` in the config cell; rationale in `RISK_METHODOLOGY.md`).
3. **C3** — builds the risk index: `Risk = Value × Threat` (exposure × consequence).
4. **C4** — maps 5 ranked risk classes and extracts/ranks the top hotspots.
5. **C5** — sanity-checks hotspots against real threats + runs a weight-sensitivity test.
6. **C6** — exports everything to Drive `dugong_uae/` for Track D's dashboard.

## How to run
1. Open `Dugong_Habitat_Risk.ipynb` in Google Colab.
2. In the **CONFIG** cell set `PROJECT` to your GEE project ID.
3. Leave `USE_TRACKB_ASSETS = False` to regenerate Track B's habitat + change maps inline
   (self-contained). If you have ingested Track B's exported GeoTIFFs as EE assets, set it
   `True` and paste the asset IDs.
4. Run all cells. Make sure the repo `data/` folder is available (clone the repo in Colab,
   or upload `study_area.geojson` + the two `data/training/*.geojson` files to `/content`).
5. Exports appear under Earth Engine → Tasks; when done, share Drive `dugong_uae/` with Track D.

## Handoff to Track D — output schema & symbology (C6)

**Rasters** (GeoTIFF, WGS84, 10 m):
| File | Values | Use in dashboard |
|------|--------|------------------|
| `dugong_risk_class.tif` | 1–5 (Very Low→Very High) | **main layer** |
| `dugong_risk_index.tif` | 0–1000 int (=risk×1000) | continuous heat layer |
| `dugong_value_layer.tif` | 0–1000 int | "what's at stake" drill-down |
| `dugong_threat_layer.tif` | 0–1000 int | "what's the pressure" drill-down |

**Risk-class colour ramp** (blue → red, colour-blind safe):
`1 #2c7bb6 · 2 #abd9e9 · 3 #ffffbf · 4 #fdae61 · 5 #d7191c`

**Vectors** (GeoJSON, WGS84):
- `dugong_risk_hotspots.geojson` — ranked polygons. Fields: `priority`, `mean_risk` (0–1),
  `area_ha`, `dominant_threat` (loss/development/thermal/discharge/vessel), plus each factor's
  weighted value. Suggested popup: **"Hotspot #{rank} — {area_ha} ha, mean risk {mean_risk},
  driven by {dominant_threat}."**
- `threat_*.geojson` — toggleable context layers (see `threat_data/SOURCES.md` for symbology hints).

**Suggested layer order (bottom→top):** satellite basemap → risk_class → threat context →
hotspot markers → AOI outline.

See `RISK_METHODOLOGY.md` for the model, weights, justification, and limitations.
