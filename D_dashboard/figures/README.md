# figures — Track D: labelled figures for the write-up (D3)

Generated from real, verified numbers already produced by Track B and Track C
(not fabricated) — see each notebook for where every value comes from.

| File | Source | Shows |
|---|---|---|
| `B4_confusion_matrices.png` | `M2_classification/Seagrass_Dugong_Mapping.ipynb`, cell 69 comparison table | Original vs. class-balanced Random Forest confusion matrices |
| `B4_accuracy_comparison.png` | same | Overall accuracy, kappa, producer's/user's accuracy, both models, vs. the 73-87% published target range |
| `B5_feature_importance.png` | same, cell 70 | Random Forest feature importance (balanced model) — spectral indices vs. raw bands |
| `C5_weight_sensitivity.png` | `C_risk_gis/Dugong_Habitat_Risk.ipynb`, weight-sensitivity cell (verified live, 2026-07-04) | % change in high-risk area for each +/-0.10 weight perturbation |
| `C4_hotspot_ranking.png` | `C_risk_gis/dugong_risk_hotspots_ranked.csv` | All 15 ranked hotspots by area, coloured by dominant threat |

Regenerate any of these from the script that produced them if the underlying
numbers change (e.g. a re-run notebook produces different accuracy figures) —
ask for the generator script, it isn't checked in since it's a one-off tool,
not part of the pipeline.

## Still needed for D3

- A labelled "before/after" seagrass change map (2019 vs 2024) — needs Track
  B's B6 change-detection cell to actually be run and its output shared.
- A static export of the risk-class map itself (the live dashboard shows this,
  but the written report needs a plain image) — take a screenshot of
  `D_dashboard/index.html` with only the "Risk class" layer + AOI + legend
  visible.
