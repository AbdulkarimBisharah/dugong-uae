# 6. Competition Prompt Answers

*The five questions below are reproduced as worded in the official
Prototypes for Humanity 2026 Entry Guide.*

## What problem are you addressing?

The Arabian Gulf holds the world's second-largest dugong population
(~3,000–3,500 individuals), concentrated in the Marawah / Bu Tinah region of
Abu Dhabi. Dugongs feed almost exclusively on seagrass, and that seagrass is
under measurable pressure from coastal development, dredging, desalination
discharge, marine heat, and vessel traffic. Conservation planners currently
lack a reproducible way to answer a specific question: not just "where is
there seagrass," but where seagrass presence and real threat pressure
actually overlap — the locations where habitat loss would matter most for
dugong survival, and where limited protection resources should go first.

## How are existing solutions failing?

Habitat surveys are episodic, expensive, and quickly out of date. Threat
data — development sites, discharge points, vessel routes, thermal stress —
exists scattered across sources with no standard way to combine it with
habitat data. Generic seagrass extent maps show *where seagrass is* but not
*where it is at risk*; generic environmental risk indices show *where
pressure is* but are not conditioned on whether anything of habitat value is
actually there. No existing, publicly available tool combines habitat
classification, change detection, and multi-factor threat weighting into
one reproducible, auditable risk output specific to dugong habitat.

## What is your alternative solution?

Dugong Watch is an end-to-end, open pipeline that classifies seagrass from
free Sentinel-2 satellite imagery using a Random Forest model trained
against official habitat survey data, detects seagrass change between 2019
and 2024, and combines that with five real, geographically specific threat
factors — observed loss, coastal development, thermal stress, industrial
discharge, and vessel pressure — into a single weighted risk index
(`Risk = Value × Threat`). The output is 105 ranked, specific hotspots, not
a generic map, delivered through an interactive dashboard alongside all
underlying code and data so every step can be reproduced or audited.

## How does it perform better?

The classification reaches 85.3% accuracy (class-balanced Random Forest),
within the published 73–87% range for this method. Unlike a static survey
or a generic index, the risk model is validated three specific ways: mean
risk correctly falls with distance from a real discharge point; mean risk
inside the documented dugong core is roughly 3× the reserve-wide average,
showing the model targets habitat where it actually matters; and every
weight was stress-tested by perturbing it ±10%, changing the flagged
high-risk area by no more than 3% — the output is not an artefact of one
arbitrary set of assumptions. It also runs entirely on free data and
open-source tools, so it can be re-run at effectively zero marginal cost as
new imagery becomes available, turning a one-off assessment into a
repeatable monitoring tool.

## What impact does your solution have?

Locally, it gives Abu Dhabi conservation managers a ranked, evidence-based
starting point for where to prioritise enforcement, permitting conditions,
or monitoring effort, backed by a quantified finding that risk is
concentrated where dugongs actually are. Because it relies only on free
satellite data and open tooling, the same risk-modelling structure —
combine a habitat-value layer with a weighted, distance-decayed threat
overlay, then validate against real ground truth — is directly reusable for
other single-species-dependent, threat-exposed marine habitats elsewhere in
the world, without the cost or licensing barriers that commercial imagery or
bespoke GIS consulting would otherwise impose.
