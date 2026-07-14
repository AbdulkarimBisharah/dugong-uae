# 2. Literature Review

## 2.1 Dugong ecology, distribution, and conservation status

Marsh et al. (2002, 2011) established much
of the baseline understanding of dugong population ecology, movement, and
the threats facing dugong populations globally — habitat loss, bycatch, and
vessel strike are consistently identified as the primary drivers of decline
across dugong range states. This project's threat model (Section 3) draws
directly on that finding: observed habitat loss is weighted as the single
largest threat factor precisely because the literature treats it as the
most consequential and most directly observable driver of decline.

The Marine Mammal Protected Areas Task Force's *Southern Gulf and Coastal
Waters* Important Marine Mammal Area (IMMA) factsheet documents the Arabian
Gulf's dugong population as the second-largest globally, with Abu Dhabi
waters — and the Marawah/Bu Tinah area specifically — identified as the
area of highest regional density. This factsheet is the primary basis for
this project's "dugong use" surface (Section 3.2), which weights seagrass
value more heavily near documented high-density cores.

The Environment Agency – Abu Dhabi's 2015 aerial dugong survey provides the
most recent systematic count data for the region and corroborates the IMMA
factsheet's density pattern. The Dugong & Seagrass Conservation Project
(dugongseagrass.org, UAE chapter) documents region-specific threats —
notably land reclamation and dredging as the leading local drivers of
seagrass loss in the southern Gulf, and the fact that Gulf seagrass meadows
support only three heat-tolerant species due to the region's extreme summer
sea-surface temperatures (regularly exceeding 36°C). Both findings are
incorporated directly into this project's threat weighting (Section 3.3).

Regional studies of persistent Gulf dugong aggregations in the same
extreme-thermal, shallow-water environment as Marawah inform two specific
choices in the risk model's threat weighting: that vessel and boat
disturbance is a documented pressure on shallow-water Gulf dugong
aggregations, and that it acts primarily on the animals' behaviour rather
than on the seagrass substrate itself — which is why vessel pressure is
weighted below observed habitat loss in this project's model (Section 3.3).

## 2.2 Habitat risk assessment methodology

This project's core analytical framework — that risk should be modelled as
**exposure × consequence**, i.e. that a location is only high-risk if both
valuable habitat *and* real pressure are present simultaneously — is not
original to this project. It follows two established frameworks directly:

**Halpern et al. (2008)**, *A global map of human impact on marine
ecosystems* (*Science*), established the cumulative human-impact mapping
approach this project's threat layer (a weighted overlay of multiple
independently-sourced pressure factors) is modelled on.

**Arkema et al. (2013)** and the **InVEST Habitat Risk
Assessment (HRA)** model (Natural Capital Project) formalise
the specific exposure-times-consequence logic this project's `Risk = Value
× Threat` formula implements directly, including the practice of
normalizing each input factor to a common 0–1 scale before combination so
that no single factor dominates purely due to its units.

Together, these two sources are why this project's risk index is
structured the way it is, rather than as a simpler additive weighted sum of
threats alone (which would flag high-pressure but seagrass-free water as
"risky," which is not a meaningful output for a conservation-planning tool).

## 2.3 Regional and institutional context

The UNESCO Man and the Biosphere (MAB) Programme's designation of the
Marawah Marine Biosphere Reserve (2007), alongside its status as a Marine
Protected Area since 2001 under the Sheikh Zayed Protected Areas Network,
establishes the reserve as the largest MPA in the Arabian Gulf (4,255 km²)
and the institutional context within which this project's study area sits.
This designation is also why the project treats habitat inside this
reserve, and particularly inside the Bu Tinah no-take core, as carrying
elevated conservation weight in its threat model's "dugong use" surface.

## 2.4 Gap this project addresses

None of the sources above combine seagrass remote-sensing classification,
observed habitat change, and multi-factor threat data into a single, ranked,
reproducible risk output specific to dugong habitat for this region. Marsh
et al. and the IMMA factsheet describe *where dugongs are*; dugongseagrass.org
and the EAD survey describe *what threatens them*; Halpern et al. and the
InVEST HRA model describe *how to combine exposure and threat in general*.
This project's contribution is applying that general framework, with
region-specific data and weights justified against these regional sources,
to produce a specific, actionable, and auditable output for the Marawah /
Bu Tinah region — see `C_risk_gis/RISK_METHODOLOGY.md` for the full applied
model.
