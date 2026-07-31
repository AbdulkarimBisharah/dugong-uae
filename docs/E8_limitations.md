# 6. Limitations

Stated directly, because transparency is part of the project's design
(Section 1.3).

**Data.** Threat data is partially schematic: built-infrastructure coordinates
are real, but the reserve boundary, dugong-density surface, and navigation
routes are documented approximations pending official EAD GIS layers —
replacing them would sharpen results without changing the method. There is also
a known training-data gap: a pagination bug truncated the non-seagrass training
set to 171 of the true 319 polygons; the download is fixed, but the committed
results were trained on the smaller set, so retraining on the full 319 is a
specific, disclosed next step. Change detection depends on classifier accuracy at
both time points, so loss-dominated hotspots should be read alongside the
accuracy figures (Section 4.1). Thermal stress uses a summer 2020–2024 median —
typical stress, not heatwave frequency.

**Model.** The index is **relative**, not a calibrated probability of loss.
Weights are documented, literature-justified parameters shown robust to ±10%
perturbation (Section 4.4), but a different defensible weighting would shift the
ranking somewhat. Internal validation (Section 4.3–4.4) shows the method behaves
sensibly; it does not field-verify any individual hotspot's on-the-ground
condition — that would need a site visit or independent recent survey.

**Engineering.** Earth Engine's ~5-minute interactive timeout is worked around
by caching an intermediate asset once, so the first run after any change requires
a several-minute export. The dashboard's map tiles use non-permanent
`getMapId()` tokens that need periodic regeneration (a production version should
use static tiles or an Earth Engine App). The dashboard was built and tested by
the team, not yet reviewed with the agencies who would use it.

**Not yet done.** A standalone before/after seagrass-change figure, a short
demonstration video (optional per the entry guide), and field validation of
specific hotspots remain open — tracked openly in the repository.
