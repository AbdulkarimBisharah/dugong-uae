# 8. Limitations

Stated as directly and completely as possible, because a transparent
limitations section is part of this project's own design philosophy
(Section 1.3) — not a formality.

## 8.1 Data limitations

- **Threat data is partially schematic.** Built infrastructure coordinates
  (e.g. the Mirfa Power & Desalination Plant) are real and verified; the
  reserve boundary, the dugong-density surface, and navigation routes are
  documented, labelled approximations pending access to official EAD GIS
  layers (`C_risk_gis/threat_data/SOURCES.md` states exactly which is
  which). Replacing these would sharpen results without changing the model.
- **A real, known gap in the committed training data.** During development,
  a bug was found in the notebook that downloads non-seagrass training
  polygons from the EAD ArcGIS service: an un-paginated request silently
  truncated results at the server's 2,000-record limit, returning only 171
  of the true 319 non-seagrass polygons that exist within the study area.
  The download code has been fixed (it now paginates correctly), but the
  already-committed training file in `data/training/` still reflects the
  old, truncated 171-polygon set — the classifier results in Section 4.1
  were trained on this smaller set, not the corrected 319. Re-running the
  fixed download and retraining is a known, specific next step, not a
  hidden assumption.
- **Change detection (2019→2024) depends entirely on classifier accuracy at
  both time points.** Any misclassification is compounded in the "loss"
  layer, which is also the single most heavily weighted threat factor
  (0.30). Hotspots whose dominant threat is "loss" specifically should be
  read alongside the accuracy figures in Section 4.1, not treated as
  independently verified change.
- **Thermal stress uses a single seasonal snapshot** (summer 2020–2024
  median), not a multi-year heatwave-frequency climatology — it captures
  typical thermal stress, not trend or frequency of extreme events.

## 8.2 Model limitations

- **The risk index is relative, not absolute.** It ranks locations within
  this study area against each other; it is not a calibrated probability of
  habitat loss and should not be read as one.
- **Weights are documented parameters, not ground truth.** Every weight in
  the threat model is justified against a specific literature source or
  regional data point (Section 3.3, `RISK_METHODOLOGY.md` Section 3), and
  the sensitivity analysis (Section 4.4) shows the ranked output is robust
  to ±10% changes — but a different, equally defensible weighting scheme
  could be argued for, and would produce a somewhat different ranking.
- **No field validation of specific hotspots.** The model's internal
  validation (face validity, zonal comparison, weight sensitivity — Section
  4.3–4.4) demonstrates the method behaves sensibly; it does not confirm
  that any individual ranked hotspot's on-the-ground habitat condition
  matches the model's prediction. That would require an actual site visit
  or comparison against independent recent survey data, which was outside
  this project's scope and timeline.

## 8.3 Engineering / reproducibility limitations

Documented here because they affect anyone trying to reproduce or extend
this work, and because finding and fixing them was itself part of this
project's process:

- **Earth Engine's interactive request timeout (~5 minutes) limits how the
  pipeline can be queried directly.** Because nothing in the risk pipeline
  is cached, requesting results interactively re-derives the entire chain
  from raw satellite imagery every time, which can exceed this limit for
  computationally heavy steps (hotspot vectorization). The current
  implementation works around this by exporting a cached intermediate
  Earth Engine Asset once (a real batch export, with no interactive
  timeout) and reading from that for all downstream analysis — but this
  means the very first run of the pipeline after any methodology change
  requires a several-minute wait for that export to complete, which is easy
  to mistake for a hang.
- **The interactive dashboard's map tiles depend on Earth Engine
  `getMapId()` tokens, which are not permanent.** If the dashboard's map
  layers stop loading, the tokens need regenerating — instructions are in
  `D_dashboard/README.md`. A production deployment should export static map
  tiles or use a proper Earth Engine App instead.
- **The interactive dashboard prototype was built and tested by the team,
  not commissioned by, or reviewed with, the agencies who would actually
  use it.** Whether its specific layer choices, popups, and framing are
  "actionable" in a real regulatory or field context is untested (see
  Section 5.3).

## 8.4 What is genuinely not yet done

For full transparency: the seagrass-change map (before/after 2019 vs. 2024
seagrass extent, visualised as a standalone figure) and a plain static
export of the risk map itself are listed as still-open items in
`D_dashboard/figures/README.md` at the time of writing. A short
demonstration video (optional per the competition's own application
materials) has not been produced. These are not concealed — they are
tracked openly in the repository's own documentation.
