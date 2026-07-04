# Visual identity (Track D, D4 — starting point)

**Caveat:** this isn't matched against an actual slide deck (I don't have
access to one) — it's the consistent palette/typography already applied
across the dashboard (`D_dashboard/index.html`) and the report figures
(`D_dashboard/figures/`), documented so whoever builds the slide deck can
either adopt it or deliberately deviate.

## Colors

**Risk scale (blue → red, colour-blind safe)** — used everywhere risk is shown:

| Class | Hex |
|---|---|
| Very Low | `#2c7bb6` |
| Low | `#abd9e9` |
| Moderate | `#ffffbf` |
| High | `#fdae61` |
| Very High | `#d7191c` |

**Text / neutrals:**
- Dark text: `#0f172a`
- Secondary text / axis labels: `#475569`

**Threat-layer accent colors** (dashboard + hotspot chart):

| Threat | Hex |
|---|---|
| Protected areas | `#22c55e` |
| Dugong areas | `#2563eb` |
| Desalination / industrial | `#dc2626` |
| Coastal development | `#f97316` |
| Vessel pressure | `#7c3aed` |

## Typography

System sans-serif stack (`-apple-system, Segoe UI, Roboto, Arial`) — no custom
font loaded, for zero-dependency portability. Headings bold, body regular.

## Applying this elsewhere (slide deck, PDF)

If Track E's deck uses a different palette, the one hard constraint to keep is
the **risk 5-class blue→red ramp** — it's referenced in `RISK_METHODOLOGY.md`,
the dashboard legend, and the figures, so changing it means updating all three
consistently.
