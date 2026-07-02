# M2 — Classification & ML (Track B)

`Seagrass_Dugong_Mapping.ipynb` — runs end-to-end in Google Earth Engine (Colab): pulls the Sentinel-2 composite, builds the cloud-free feature stack (NDVI/NDWI/MNDWI/BSI), downloads EAD seagrass/non-seagrass habitat data, trains an `ee.Classifier.smileRandomForest` (original + class-balanced versions), assesses accuracy (confusion matrix, kappa, producer's/user's accuracy), computes feature importance, and exports the classified rasters to Google Drive.

Set your own GEE project ID in the `PROJECT` variable before running.
