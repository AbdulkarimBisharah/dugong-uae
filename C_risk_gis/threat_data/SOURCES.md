# Threat-data sources (Track C — C1)

Every feature in `threat_data/*.geojson` is listed below with its basis. Point
locations for **built infrastructure and named islands are real coordinates**;
**boundaries, the dugong-density surface, and navigation routes are approximate /
schematic** and are flagged as such in each file's `note` field. Replace the
schematic layers with official **EAD** GIS layers if the team can obtain them —
the risk notebook will pick up better boundaries automatically.

## Study area
Marawah study polygon (from `data/study_area/study_area.geojson`): lon 52.98–53.32,
lat 24.19–24.48. This falls **inside** the Marawah Marine Biosphere Reserve.

## Protected areas — `protected_areas.geojson`
- **Marawah Marine Biosphere Reserve** — 4,255 km², largest MPA in the Arabian Gulf,
  MPA since 2001, UNESCO Man-and-the-Biosphere reserve since 2007; holds ~60% of the
  UAE dugong population. Boundary here is a *schematic envelope*, not the official polygon.
  Sources: UNESCO MAB (unesco.org/en/mab/marawah); IUCN; EAD Sheikh Zayed Protected Areas Network.
- **Bu Tinah no-take core** — tiny archipelago ~35 km N of Marawah Island; closed to
  visitors and fishing; EAD ranger station; key seagrass/coral/climate site. Box is schematic.
  Sources: Wikipedia "Bu Tinah"; New7Wonders.

## Dugong areas — `dugong_areas.geojson`
- Highest dugong density in the region is in **Marawah**, then **Al Yasat**; aggregations
  up to ~300 individuals; ~3,000–3,500 dugongs in Abu Dhabi waters (2nd largest population
  after Australia). Points mark documented high-density zones; the continuous density surface
  used in the model is derived from these anchors (distance-weighted), not an official surface.
  Sources: Marine Mammal Protected Areas Task Force — Southern Gulf & Coastal Waters IMMA;
  EAD (2015) aerial surveys; dugongseagrass.org (UAE).

## Desalination / industrial — `desalination_industrial.geojson`
- **Mirfa Power & Desalination Plant (MIPCO)** — **24.121, 53.447** (real), ~200,000 m³/day,
  thermal + hypersaline discharge; the closest major discharge point to the AOI (SE).
  Sources: Global Energy Observatory (geoid/4311); ENGIE press release (2017).
- **Sir Bani Yas RO** (~45,000 m³/d, 2020), **Al Yasat RO** (~10,000 m³/d, 2006),
  **Barakah Nuclear** (thermal cooling, ~24.0 N 52.2 E) — regional context to the W/SW;
  minimal in-AOI influence under distance decay. Sources: Water Desalination Report; ENEC.

## Coastal development / dredging — `coastal_development.geojson`
- Marawah jetty, Mirfa port/coastal works, Al Dhafra mainland coast (Khor al-Bazm),
  Sir Bani Yas/Delma tourism (regional). Land reclamation + dredging are documented as the
  leading local drivers of seagrass loss in the southern Gulf.
  Sources: dugongseagrass.org (UAE — land reclamation & dredging); Marawah Island (Wikipedia).

## Vessel / navigation — `vessel_pressure.geojson`
- Mirfa port, Marawah landing, and a schematic reserve access route. Boat strikes and
  disturbance are documented dugong threats in shallow Gulf waters (dugongs feed in <5 m depth).
  Route geometry is indicative only. Sources: Abu Dhabi Maritime MPA Visitor Guide (2020);
  Wiley (Hawar Island dugong-aggregation study, 2025); IFAW.

## Thermal stress (SST)
Not a vector file — derived in the notebook from **Landsat 8/9 thermal (ST_B10 surface
temperature)** summer composite (matching Track A task A5). The Arabian Gulf is one of the
warmest seas on Earth (>36 °C summer highs); only three heat-tolerant seagrass species persist,
and marine heatwaves cause seagrass die-off and raise dugong thermoregulatory costs.
Sources: dugongseagrass.org; Wiley (2025); Gulf coral thermal-tolerance literature.
