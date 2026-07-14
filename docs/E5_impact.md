# 5. Impact

## 5.1 Local impact — Abu Dhabi / UAE

**Direct conservation planning use.** The ranked hotspot output (Section
4.2) is designed to answer a specific, practical question for regulators
and conservation managers: given limited enforcement, monitoring, or
restoration budget, which specific locations should be prioritised first?
Rather than a generic habitat map, the output ranks 105 concrete locations
by a transparent, defensible combination of habitat value and real
pressure — the kind of output that can directly inform where a protected-
area boundary review, a dredging permit condition, or a monitoring buoy
placement should be targeted.

**A monitoring baseline, not a one-off snapshot.** Because the pipeline is
built entirely on free, continuously updated Sentinel-2 and Landsat data
and open-source tooling (Section 3.5), it can be re-run in future years at
effectively zero marginal data cost. The 2019→2024 change layer already
demonstrates this: the same pipeline that produced this project's results
can be re-run against any future date range to track whether identified
hotspots are stabilising, worsening, or responding to intervention —
turning a static assessment into a repeatable monitoring tool.

**Support for the Marawah Marine Biosphere Reserve's own mandate.** The
reserve's UNESCO Man and the Biosphere designation and Marine Protected
Area status (Section 2.3) already commit it to evidence-based management.
This project's zonal finding — that mean risk inside the documented dugong
core is roughly 3× the reserve-wide average (Section 4.3) — gives that
mandate a concrete, quantified starting point, rather than a general
statement that "the core matters."

## 5.2 Regional and global scale

**A reusable model, not a one-off map.** The exposure × consequence risk
structure (Section 3.3), the specific threat factors modelled, and the
validation approach (face validity, zonal comparison, weight sensitivity)
are not specific to seagrass or to the Arabian Gulf. The same structure —
combine a habitat-value layer with a weighted, distance-decayed threat
overlay, validate against known ground truth, and stress-test the weights —
applies directly to other single-species-dependent, threat-exposed marine
habitats: for example, dugong populations elsewhere in the Indo-Pacific,
manatee seagrass habitat in the Americas, or other coastal species whose
survival is tied to a mappable, satellite-visible habitat type.

**Addressing a documented gap with free tools.** As established in Section
2.4, no existing public tool combines seagrass classification, change
detection, and multi-factor threat weighting into one reproducible,
auditable output for dugong conservation specifically. Because this project
relies exclusively on free Sentinel-2/Landsat imagery via Google Earth
Engine, publicly available EAD-style habitat records, and open-source
Python tooling, the barrier to adopting or adapting this approach elsewhere
is primarily know-how, not cost or licensing — relevant for conservation
programmes in lower-resource settings where commercial imagery or bespoke
GIS consulting is not a realistic option.

## 5.3 Scope of these claims

Dugong Watch is a working, validated prototype. The impact described above is
what its outputs are built to enable; realising it in practice is the natural
next step — putting the tool in front of the agencies and researchers who would
use it, and replacing the model's schematic inputs with official GIS layers
where available. Section 8 sets out these limitations in full, and does so
deliberately: a tool that documents its own assumptions is more trustworthy to
act on, not less.
