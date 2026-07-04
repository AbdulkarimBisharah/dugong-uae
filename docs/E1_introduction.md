# 1. Introduction & Problem Statement

## 1.1 Background

The dugong (*Dugong dugon*) is a marine mammal whose survival is bound
almost entirely to a single resource: seagrass. Dugongs feed nearly
exclusively on seagrass meadows, and the Arabian Gulf population — centred
on the waters of Abu Dhabi — is the second-largest in the world after
Australia's, with an estimated 3,000–3,500 individuals. The Marawah Marine
Biosphere Reserve, encompassing Marawah Island and the wider Bu Tinah
archipelago, holds the highest concentration of this population and is
recognised by UNESCO as a Man and the Biosphere reserve.

This population's survival depends on the condition of seagrass meadows
that are themselves under measurable pressure: coastal development and
dredging, desalination and industrial discharge, marine heatwaves in one of
the hottest seas on Earth, and vessel traffic in the shallow (under 5 m)
waters where dugongs feed. Conservation and development planning in the
region therefore requires a way to answer a specific, practical question —
not simply "where is there seagrass," but **where is seagrass both present
and under enough pressure that its loss would matter for dugong survival**.

## 1.2 Problem statement

At present, answering that question requires combining several kinds of
information that are not usually brought together: habitat maps (which
seagrass exists, and where), habitat change over time (is it being lost),
and threat data (what human and environmental pressures act on a given
location). Habitat surveys are episodic and expensive to run at scale;
threat data exists in scattered, non-standardised sources; and there is, to
our knowledge, no publicly available, reproducible model that combines
these into a single, ranked map of *risk to dugong habitat specifically* —
as opposed to generic seagrass extent maps or generic environmental risk
indices that are not conditioned on dugong presence.

This creates a gap between the data that exists (increasingly high-quality
free satellite imagery, and habitat records held by agencies such as the
Environment Agency – Abu Dhabi) and the decision-relevant product that
conservation planners, regulators, and researchers actually need: a
transparent, updatable, and auditable answer to "if we can only act in a
few places, where should we act first?"

## 1.3 Project objective

**Dugong Watch** builds an end-to-end, reproducible pipeline that:

1. Classifies seagrass presence from free Sentinel-2 satellite imagery using
   a supervised machine-learning model, trained and validated against
   official Environment Agency – Abu Dhabi (EAD) habitat survey data;
2. Detects seagrass change between two time periods from the same imagery
   source;
3. Combines that habitat information with five real, geographically
   specific threat factors — observed seagrass loss, coastal development,
   thermal stress, industrial/desalination discharge, and vessel pressure —
   into a single, weighted, and explicitly justified risk index; and
4. Surfaces the result as a ranked, interactive map that a non-technical
   stakeholder can use directly, alongside the underlying data and code so
   that every step of the model can be audited, reproduced, or challenged.

The guiding design principle throughout is **transparency over
sophistication**: every weight in the risk model is a documented, justified
parameter rather than a black box, every threat layer's provenance is
labelled as real-coordinate or schematic, and the model's own sensitivity to
its assumptions is tested and reported rather than assumed.

## 1.4 Scope

This project focuses on the Marawah / Bu Tinah region of the Arabian Gulf,
Abu Dhabi, UAE, using 2019 and 2024 as the compared time periods (matching
the years of best available cloud-free Sentinel-2 coverage). The seagrass
classification uses a binary scheme (`1 = seagrass`, `0 = non-seagrass`),
locked to match the structure of the training data supplied by EAD. The
risk model is explicitly scoped as a **relative** risk index — it ranks
locations within the study area against each other, not against an absolute
probability of habitat loss.
