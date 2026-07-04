# 3. Methodology

The full, executable methodology lives in this project's codebase and is
summarised here; every number in this section is drawn directly from
`M2_classification/Seagrass_Dugong_Mapping.ipynb` (classification) and
`C_risk_gis/Dugong_Habitat_Risk.ipynb` / `RISK_METHODOLOGY.md` (risk model),
both of which have been run against live data and verified.

## 3.1 Study area and data

The study area is a 774.6 km² polygon covering the Marawah / Bu Tinah
region of the Arabian Gulf, Abu Dhabi (lon 52.98–53.32, lat 24.19–24.48),
falling entirely inside the Marawah Marine Biosphere Reserve.

**Satellite imagery:** Sentinel-2 Surface Reflectance (Level-2A,
`COPERNICUS/S2_SR_HARMONIZED`), accessed via Google Earth Engine, cloud
masked using the QA60 band (cloud and cirrus bits), median-composited per
year. For 2024, 222 individual Sentinel-2 scenes contributed to the
cloud-free composite. Two annual composites are built for comparison: 2019
(past) and 2024 (current).

**Thermal data:** Landsat 8/9 Collection 2 surface temperature (`ST_B10`),
summer months only (June–September, the annual thermal maximum), converted
to Celsius and masked to water pixels only (using the Sentinel-2 composite's
MNDWI band) so that hot dry land cannot skew the thermal-stress signal.

**Training and reference data:** vector habitat polygons from the
Environment Agency – Abu Dhabi (EAD), clipped to the study area:
- 118 seagrass-bed polygons and 171 unconsolidated-bottom (non-seagrass)
  polygons, used as positive/negative training data.
- A further 118-polygon EAD seagrass layer, kept entirely separate from
  training, used as an independent reference/validation layer.
- A region-wide EAD seagrass layer (1,954 polygons, ~2,922 km²) used for
  broader context, not for training or accuracy assessment.

All vector data uses WGS84/CRS84 coordinates. The binary class scheme
(`1 = seagrass`, `0 = non-seagrass`) was locked to match this training
data's own structure, replacing an earlier four-class design.

## 3.2 Seagrass classification (Track B)

**Feature stack:** each annual composite is reduced to 14 predictor bands —
the raw Sentinel-2 bands B2, B3, B4, B5, B6, B7, B8, B8A, B11, B12, plus four
derived spectral indices computed from them: NDVI (vegetation), NDWI and
MNDWI (water, two formulations), and BSI (bare-soil index).

**Training samples:** stratified random points are drawn from inside the
training polygons — not one sample per polygon, since polygon sizes vary by
orders of magnitude (up to ~61 km²) — and each point's 14 predictor-band
values are extracted from the composite at 10 m resolution.

**Model:** a Random Forest classifier (`ee.Classifier.smileRandomForest`,
100 trees, fixed seed for reproducibility), trained on an 80/20 train/test
split. Two versions were built and compared: the original model trained on
the natural (imbalanced) class distribution, and a class-balanced version
trained on an equal number of seagrass and non-seagrass samples per class.
The balanced model outperformed the original on every accuracy metric
(Section 4) and is the model used for all downstream risk modelling.

**Change detection:** the same trained classifier is applied to both the
2019 and 2024 feature stacks (not retrained separately per period, so that
any difference in output reflects real change on the ground rather than
model drift), and the two classified rasters are differenced into four
categories: stable non-seagrass, stable seagrass, gain, and loss.

## 3.3 Habitat-risk model (Track C)

The risk model follows an **exposure × consequence** structure (justified
in Section 2.2): `Risk = Value × Threat`, so that a location scores high
only when valuable habitat and real pressure coincide.

**Value (exposure) layer** — what is at stake:
```
Value = SeagrassPresence × (0.6 + 0.4 × DugongUse)
```
`SeagrassPresence` comes directly from the 2024 classification. `DugongUse`
is a continuous 0–1 surface built by distance-decay from documented
high-density dugong location anchors (Marawah core, Bu Tinah, central
foraging grounds), so that seagrass inside a known dugong core is weighted
up to ~1.7× more heavily than seagrass at the reserve's edge — while every
seagrass pixel in the reserve still retains some value, since the entire
AOI sits inside prime dugong habitat.

**Threat (pressure) layer** — what is acting on it — is a weighted sum of
five normalized (0–1) factors:

| Factor | Measured as | Weight |
|---|---|:---:|
| Observed seagrass loss (2019→2024) | Smoothed density of "loss" change pixels | 0.30 |
| Coastal development / dredging | Distance decay from mapped development points | 0.20 |
| Thermal stress | Landsat summer surface temperature, water-masked | 0.20 |
| Desalination / industrial discharge | Distance decay from mapped discharge points | 0.15 |
| Vessel / navigation pressure | Distance decay from ports, landings, routes | 0.15 |

Distance-decay factors use `exp(-distance/λ)` with factor-specific decay
lengths (λ ≈ 3–5 km depending on the factor), so that, for example, regional
desalination plants 40–120 km from the study area correctly contribute
almost nothing to in-AOI risk, while the nearer Mirfa plant registers on the
reserve's southeast flank. Every weight and decay length, and the reasoning
behind each value, is documented in full in `RISK_METHODOLOGY.md`.

**Threat data sources:** built infrastructure and named-location coordinates
(e.g. the Mirfa Power & Desalination Plant at 24.121°N, 53.447°E) are real;
reserve boundaries, the dugong-density surface, and navigation routes are
explicitly flagged as schematic approximations pending official EAD GIS
layers (`C_risk_gis/threat_data/SOURCES.md` documents the exact basis for
every feature).

**Combining and classifying:** `RiskRaw = Value × Threat` is rescaled to
0–1 across the study area, then binned into five ranked classes (Very
Low → Very High) using quantile breaks computed over seagrass pixels only,
since non-seagrass pixels have nothing at stake by construction.

## 3.4 Validation approach

Three checks, beyond standard classifier accuracy metrics, were run
specifically to test whether the risk model's outputs are trustworthy
rather than an artefact of its parameter choices (Section 4.3–4.4 reports
the results):

1. **Face validity** — does mean risk fall with distance from a known real
   discharge point, as the model's own construction should produce?
2. **Zonal comparison** — is mean risk inside the documented dugong core
   meaningfully higher than the reserve-wide average?
3. **Weight sensitivity** — does perturbing each of the five threat weights
   by ±10% materially change which areas are flagged high-risk, or are the
   resulting hotspots robust to the exact weighting chosen?

## 3.5 Implementation and reproducibility

The entire pipeline runs in Google Earth Engine via Python (the `earthengine-api`
and `geemap` libraries), authenticated per-user against a personal GEE
project. All code is version-controlled and available in this repository;
`M2_classification/Seagrass_Dugong_Mapping.ipynb` and
`C_risk_gis/Dugong_Habitat_Risk.ipynb` can be re-run end-to-end by anyone
with Earth Engine access, using only the vector data already committed to
this repository plus Earth Engine's own public Sentinel-2/Landsat archives
— no proprietary or purchased data is required anywhere in the pipeline.
