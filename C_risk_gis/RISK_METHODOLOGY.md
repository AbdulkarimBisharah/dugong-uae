# Dugong-Habitat Risk Index — Methodology (Track C, tasks C2–C3)

This document defines the risk model that turns Track B's seagrass outputs plus the
Track C threat layers into a single, ranked **"risk to dugong habitat"** map. It is
written to be *transparent and reproducible*: every factor, weight, and formula is
stated and justified, so a reviewer can audit or re-weight it without reading code.

---

## 1. What "risk" means here

We do not map generic environmental risk. We map **risk to dugong feeding habitat** —
the chance that a given patch of sea contributes to dugong decline through loss or
degradation of the seagrass those dugongs depend on. Two things must both be true for a
pixel to be high risk:

1. **There is something to lose there** — living seagrass, in an area dugongs actually use.
2. **There is pressure acting on it** — observed loss and/or human/climate threats.

Seagrass in a calm, protected, threat-free spot is *low* risk. A busy, warming,
discharge-affected patch with *no* seagrass and no dugongs is also low risk — nothing is
at stake. Risk peaks where **high habitat value and high pressure coincide**. This is the
standard *exposure × consequence* logic of habitat risk assessment (InVEST HRA;
Arkema et al. 2014) and cumulative human-impact mapping (Halpern et al. 2008).

---

## 2. Model structure

```
Risk = Value  ×  Threat
        │          │
        │          └── Σ (weightᵢ × Threatᵢ)      (weighted overlay, MCDA)
        │
        └── Seagrass presence × Dugong-use weight
```

All inputs are rasters on the same 10 m grid, each rescaled to **0–1** before combining,
so no factor dominates through unit scale. The final index is rescaled to 0–1 and binned
into **five ranked classes** (Very Low → Very High) for the hotspot map.

### 2.1 Value (exposure) layer — *what is at stake*

```
Value = SeagrassPresence × ( 0.6 + 0.4 · DugongUse )
```

- **SeagrassPresence** — from Track B's tuned 2024 classification (`rf_final_2024`):
  1 = seagrass, 0 = non-seagrass. Non-seagrass pixels get Value ≈ 0, so risk is only ever
  assigned where there is habitat to protect. Dugongs feed almost exclusively on seagrass
  (*Halodule uninervis* dominates in the UAE), so seagrass presence is the necessary condition.
- **DugongUse** (0–1) — a distance-weighted surface built from the `dugong_areas` anchors
  (Marawah core, Bu Tinah, central foraging grounds). The whole AOI sits inside the Marawah
  Reserve and is prime dugong habitat, so the surface never drops to zero: the `0.6 + 0.4·`
  form keeps **all** AOI seagrass in play while giving documented high-density cores up to
  ~1.7× the weight of the reserve edge. This is what makes the output *dugong* risk rather
  than plain seagrass risk.

### 2.2 Threat (pressure) layer — *what is acting on it*

A weighted sum of five normalized threat factors. Weights sum to 1.0 and are set from the
conservation literature (Section 3), then stress-tested (Section 5).

| # | Threat factor | How it is measured | Weight |
|---|---------------|--------------------|:------:|
| T1 | **Seagrass loss (observed)** | Density of "loss" pixels from Track B's 2019→2024 change map, smoothed to a continuous pressure surface | **0.30** |
| T2 | **Coastal development / dredging** | Distance decay from `coastal_development` points (habitat removal + turbidity) | **0.20** |
| T3 | **Thermal stress (SST)** | Landsat 8/9 summer surface-temperature composite (`ST_B10`), normalized within AOI | **0.20** |
| T4 | **Desalination / industrial discharge** | Distance decay from `desalination_industrial` points (hypersaline + thermal effluent) | **0.15** |
| T5 | **Vessel / boat pressure** | Distance decay from ports, landings and navigation routes (`vessel_pressure`) | **0.15** |
|   | **Total** | | **1.00** |

```
Threat = 0.30·T1 + 0.20·T2 + 0.20·T3 + 0.15·T4 + 0.15·T5
```

**Distance decay.** For point/line threats (T2, T4, T5) pressure falls off with distance d as
`exp(−d / λ)`, where λ is a factor-specific decay length (e.g. λ ≈ 5 km for discharge plumes,
≈ 3 km for dredging turbidity, ≈ 4 km for vessel corridors). This is why the western regional
plants (Sir Bani Yas, Al Yasat, Barakah) contribute almost nothing inside the AOI — honest and
correct, given they are 40–120 km away — while the near Mirfa plant registers on the SE flank.

### 2.3 Combining

```
RiskRaw   = Value × Threat
Risk      = RiskRaw / max(RiskRaw)          # rescale to 0–1 over the AOI
RiskClass = quantile_bins(Risk, 5)          # 1 Very Low … 5 Very High
```

Multiplying (rather than adding) Value and Threat enforces the "both must be present" logic:
a pixel scores high **only** when valuable habitat and real pressure overlap.

---

## 3. Why these weights (justification)

- **T1 Seagrass loss = 0.30 (highest).** It is the only *observed, already-realized* signal in
  the model — Track B measured it directly from imagery. Habitat loss/degradation is the primary
  driver of dugong decline worldwide, so an area already losing seagrass is the strongest
  evidence of active risk (IFAW; Marsh 2018; Frontiers 2025).
- **T2 Coastal development / dredging = 0.20.** Land reclamation and dredging are named as the
  leading *local* pressures on southern-Gulf seagrass — they remove habitat outright and raise
  turbidity that shades the light-limited, depth-restricted Gulf meadows (dugongseagrass.org UAE).
- **T3 Thermal stress = 0.20.** The Arabian Gulf is among the hottest seas on Earth (>36 °C);
  only three heat-tolerant seagrass species persist and marine heatwaves cause die-offs, while
  heat raises dugong thermoregulatory costs. A region-wide, worsening pressure (Wiley 2025;
  Gulf thermal-tolerance literature).
- **T4 Desalination / industrial discharge = 0.15.** Chronic hypersaline and thermal effluent
  stresses seagrass, but the effect is *localized* around outfalls, so it is weighted below the
  broad pressures. Near-AOI relevance is driven by the Mirfa plant.
- **T5 Vessel / boat pressure = 0.15.** Boat strikes and disturbance are documented dugong
  threats in shallow Gulf waters, but they act on animals more than on the seagrass substrate,
  so they modify rather than dominate habitat risk (Wiley 2025; IFAW).

Weights are **parameters, not truths.** They live in a single `WEIGHTS` dict at the top of the
notebook and are re-checked by the sensitivity analysis below.

---

## 4. Data inputs

| Input | Source | Role |
|-------|--------|------|
| `rf_final_2024` seagrass map | Track B (B8 export) | Value: seagrass presence |
| 2019→2024 change map | Track B (B6 export) | T1: observed loss |
| Landsat 8/9 `ST_B10` | Google Earth Engine (Track A A5) | T3: thermal stress |
| `threat_data/*.geojson` | Track C, C1 (see `SOURCES.md`) | T2, T4, T5 + Value's dugong weight |
| `study_area.geojson` | repo | AOI clip |

The notebook can either **ingest Track B's exported assets** (preferred, set `USE_TRACKB_ASSETS`)
or **regenerate** the 2024 map and change map inline from the repo's EAD training polygons using
Track B's exact pipeline (deterministic, `seed=42`), so Track C runs stand-alone.

---

## 5. Sanity checks & sensitivity (task C5)

1. **Face validity vs. known threats.** High-risk hotspots should line up with the Mirfa plant's
   SE flank, the mainland/dredging coast, and areas of mapped loss — not appear in open, calm,
   seagrass-free water. The notebook overlays hotspots on the threat points to confirm.
2. **Protected-core check.** Zonal mean risk is reported inside vs. outside the Bu Tinah/Marawah
   cores; the model should flag valuable core habitat wherever pressure reaches it.
3. **Weight sensitivity.** Each weight is perturbed ±0.10 (re-normalized) and the top-risk class is
   recomputed; hotspots that persist across perturbations are reported as **robust**. Hotspots that
   only appear under one weighting are flagged as **weight-sensitive** so they aren't over-claimed.

---

## 6. Limitations (state them honestly)

- Threat boundaries, the dugong-density surface, and navigation routes are **approximate**; swapping
  in official EAD layers will sharpen results.
- The model is **relative** (risk *within* this AOI), not an absolute probability of loss.
- SST from Landsat is a seasonal snapshot, not a heatwave-frequency climatology.
- Change (T1) inherits any classification error from Track B; hotspots driven purely by T1 in
  noisy areas should be read with the accuracy figures from Track B in mind.

---

## References (author-date; Track E to format)
- Halpern et al. (2008) *A global map of human impact on marine ecosystems.* Science.
- Arkema et al. (2014) / Sharp et al. — **InVEST Habitat Risk Assessment** model documentation.
- Marsh, H. et al. (2002; 2018) dugong status and threats.
- Marine Mammal Protected Areas Task Force — *Southern Gulf & Coastal Waters IMMA* factsheet.
- Environment Agency – Abu Dhabi (EAD) aerial dugong surveys (2015); Sheikh Zayed Protected Areas Network.
- Dugong & Seagrass Conservation Project — *UAE* (dugongseagrass.org).
- Wiley (2025) *Why do large dugong aggregations persist … Hawar Island, Bahrain.* Aquatic Conservation.
- UNESCO MAB — Marawah Biosphere Reserve.
