// Earth Engine tile layer URLs for the Dugong Watch risk dashboard.
//
// These come from ee.Image.getMapId() against the cached risk asset at
// projects/seagrass-uae-project/assets/dugong-uae/dugong_risk_cache.
// IMPORTANT: these map tile tokens are not permanent - Earth Engine's
// getMapId() tokens can expire. If tiles stop loading, regenerate them by
// re-running the tile-URL cell (see D_dashboard/README.md) and pasting the
// new URLs in here.

const EE_TILE_URLS = {
  riskClass: "https://earthengine.googleapis.com/v1/projects/seagrass-uae-project/maps/8960608785aa49c68d48c9890b1817c9-dcc1aae4f9370f69e18279cfecef2031/tiles/{z}/{x}/{y}",
  threat: "https://earthengine.googleapis.com/v1/projects/seagrass-uae-project/maps/3d7f16dc757cacc2f4ff4c0cd8a616ec-bd626e0c6ca3cce974d66b5d0a89c7dd/tiles/{z}/{x}/{y}",
  riskContinuous: "https://earthengine.googleapis.com/v1/projects/seagrass-uae-project/maps/7ef86c7034e3b9ea93bb1ee659718a45-59879fb8c3b5b624f51563506473b79e/tiles/{z}/{x}/{y}",
};

const RISK_PALETTE = ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c"];
const RISK_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];

const THREAT_STYLE = {
  protected:   { color: "#22c55e", label: "Protected areas" },
  dugong:      { color: "#2563eb", label: "Dugong areas" },
  discharge:   { color: "#dc2626", label: "Desalination / industrial" },
  development: { color: "#f97316", label: "Coastal development / dredging" },
  vessel:      { color: "#7c3aed", label: "Vessel / navigation pressure" },
};
