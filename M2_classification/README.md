# M2 — Classification & ML (Track B)

`Seagrass_Dugong_Mapping.ipynb` — runs end-to-end in Google Earth Engine (Colab): pulls the Sentinel-2 composite, builds the cloud-free feature stack (NDVI/NDWI/MNDWI/BSI), downloads EAD seagrass/non-seagrass habitat data, trains an `ee.Classifier.smileRandomForest` (original + class-balanced versions), assesses accuracy (confusion matrix, kappa, producer's/user's accuracy), computes feature importance, and exports the classified rasters to Google Drive.

Set your own GEE project ID in the `PROJECT` variable before running.

**B5 — tuning:** hyperparameter grid search + band pruning on the balanced model, keeping whichever config (`final_rf_classifier` / `final_bands`) scores highest.

**B6 — change detection:** classifies a 2019 and a 2024 composite with the same `final_rf_classifier`, diffs them into a 4-class change map (stable non-seagrass / stable seagrass / gain / loss), reports area in hectares per class, and exports the change raster to Drive.

**B8 (final export):** exports the 2024 habitat map classified with the tuned `final_rf_classifier` (`rf_final_2024`) to Drive, separate from the change raster — this is the map to hand off to Track C/D, superseding the earlier original/balanced exports.

**B7 (stretch) — deep learning vs. Random Forest:** trains an MLP on the same point-sampled features (a true CNN needs labeled image patches with spatial context, which this project doesn't have) and compares accuracy against the tuned Random Forest.
