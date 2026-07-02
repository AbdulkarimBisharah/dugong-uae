# Dugong Watch — Seagrass Habitat Risk Mapping (UAE)

ML-powered mapping of seagrass meadows and habitat-risk ranking for dugong conservation in the **Marawah / Bu Tinah** region of the Arabian Gulf (Abu Dhabi). Uses free **Sentinel-2** imagery via **Google Earth Engine** and a **Random Forest** classifier.

Built for **Prototypes for Humanity 2026** (Dubai summit, 15–19 Nov 2026; submission deadline **1 Aug 2026**).

## Class scheme (BINARY)
`0 = non-seagrass` · `1 = seagrass`

## Repository structure
```
dugong-uae/
├── A_data_gee/          # Track A — GEE data pipeline
│   └── A2_SetupEnvironment.ipynb   # run first, every session
├── M2_classification/   # Track B — scikit-learn RF, change detection, accuracy
├── data/
│   ├── study_area/      # AOI boundary polygon
│   ├── training/        # labeled seagrass (1) + non-seagrass (0) polygons
│   ├── reference/       # EAD reference layers for validation
│   ├── outputs/         # exported composites/CSVs/maps (git-ignored)
│   └── README.md        # full data dictionary — read this
└── docs/                # Track E — writeup, competition prompts, citations
```

## Getting started
1. Open `A_data_gee/A2_SetupEnvironment.ipynb` in Google Colab.
2. Set your **own** GEE project ID and the repo clone URL in the marked cells.
3. Run all cells — it installs libraries, connects Earth Engine, and verifies the data loads with the correct binary class values.

## Tracks
- **Track A** — data & GEE pipeline (Sentinel-2 retrieval, cloud/glint correction, feature stack, sample export). *Delivered.*
- **Track B** — ML: Random Forest classification, change detection, accuracy evaluation. *Starts once `dugong_samples_csv` is available.*
- **Track E** — research & writing: competition prompts, PDF, citations, narrative.

## Data source & attribution
Marine habitat polygons: **Environment Agency – Abu Dhabi (EAD)**. Satellite imagery: **Copernicus Sentinel-2** (ESA), accessed via Google Earth Engine.
