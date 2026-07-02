# Data — Dugong Watch / Seagrass Habitat Risk (UAE)

All vector data is **EAD (Environment Agency – Abu Dhabi)** marine habitat data, clipped to the Marawah / Bu Tinah region. Coordinates are lon/lat degrees (**WGS84 / CRS84**).

## Class scheme (BINARY — locked)

| class | meaning                          | source habitat type      |
|-------|----------------------------------|--------------------------|
| `1`   | seagrass                         | "Seagrass bed"           |
| `0`   | non-seagrass (bare sediment)     | "Unconsolidated bottom"  |

> The project previously used a 4-class scheme (deep water / sand / seagrass / other). It was changed to **binary** to match the training data Track A delivered. All Track B work uses 0/1.

## Files

### `study_area/study_area.geojson`
- 1 polygon, `name = "Marawah_Study_Area"`.
- Bounding box: **lon 52.98 → 53.32, lat 24.19 → 24.48**.
- Use as the clip / area-of-interest boundary for the GEE pipeline.

### `training/marawah_seagrass_training.geojson`
- **118 polygons**, all `class = 1` (seagrass beds).
- Positive training samples for the classifier.

### `training/marawah_non_seagrass_training.geojson`
- **171 polygons**, all `class = 0` (unconsolidated bottom).
- Negative training samples. Note: a few polygons are very large (up to ~61 km²) — fine for stratified point sampling in GEE, but do **not** treat one polygon as one sample; sample points within them.

### `reference/marawah_ead_seagrass_reference.geojson`
- **118 seagrass polygons** for the Marawah area, **without** a `class` field.
- Independent reference/validation layer — the "ground truth" seagrass extent for accuracy checks. Keep separate from training.

### `reference/ead_seagrass_full.geojson`
- **1,954 seagrass polygons**, region-wide (full EAD seagrass layer, ~2,922 km² total).
- Broader reference for context maps and regional comparison. Larger than the study area.

## Handoff note (Track A → Track B)
Track A's GEE pipeline samples Sentinel-2 spectral features at points drawn from the two `training/` files and exports `dugong_samples_csv` to Google Drive. That CSV — spectral bands + `class` column — is the input to Track B's scikit-learn Random Forest in `M2_classification/`.

## Outputs
`outputs/` holds exported composites, sample CSVs, and classified maps — **git-ignored** (too large / regenerable). Share via Google Drive.
