# Visual identity (Track D, D4)

**Verified, not assumed:** the colors below were extracted directly from
`layers.js`, `figures/` (matplotlib), and `deck/build.js` and cross-checked —
this document matches what's actually shipped, not what was originally
intended. (An earlier version of this file drifted out of sync with the deck;
this revision reconciles both.)

There are two layers to this identity, used for different purposes:

## 1. Risk ramp — functional, data-driven, do not change lightly

Used everywhere risk/threat data is actually visualized: the dashboard's risk
layer, every matplotlib figure, and the deck's chart images and legend. This
is a **hard constraint**, referenced by `RISK_METHODOLOGY.md` — changing it
means updating the dashboard, all 5 figures, and the deck consistently.

| Class | Hex |
|---|---|
| Very Low | `#2c7bb6` |
| Low | `#abd9e9` |
| Moderate | `#ffffbf` |
| High | `#fdae61` |
| Very High | `#d7191c` |

**Threat-layer accent colors** (dashboard threat toggles + hotspot chart):

| Threat | Hex |
|---|---|
| Protected areas | `#22c55e` |
| Dugong areas | `#2563eb` |
| Desalination / industrial | `#dc2626` |
| Coastal development | `#f97316` |
| Vessel pressure | `#7c3aed` |

**Neutral text** (dashboard legend text, chart labels, deck body text — same
values in both):

| Role | Hex |
|---|---|
| Primary text | `#0f172a` |
| Secondary / muted text | `#475569` |

## 2. Brand identity — deck-only, not used in the functional dashboard

The dashboard itself has no "theme" beyond the risk ramp + neutrals above —
it's a functional map UI, not a branded product surface. The deck needed more
than that (title slides, section backgrounds, cards), so it adds an **Ocean
Gradient** theme on top, chosen to fit the marine-conservation topic:

| Role | Hex | Used for |
|---|---|---|
| Midnight | `#0b1f3a` | Title/closing slide backgrounds |
| Deep blue | `#065a82` | Primary brand color — process-flow cards, stat callouts |
| Teal | `#1c7293` | Secondary accent |
| Ice | `#f4f9fb` | Light content-slide background |

The risk-red (`#d7191c`) doubles as the deck's sharp accent color for stat
numbers (e.g. "105", "3x" on the Track C slide) — this is the one deliberate
tie-back between the two layers, so the deck doesn't feel like an unrelated
document.

**If you extend the dashboard's own visual chrome** (not just its data
layers) beyond plain functional UI, use this same Ocean Gradient palette
rather than inventing a third one.

## Typography — different by medium, intentionally

| Medium | Choice | Why |
|---|---|---|
| Dashboard (web) | System sans-serif stack (`-apple-system, Segoe UI, Roboto, Arial`) | Zero-dependency, no font loading, portable across any machine viewing the HTML |
| Deck (PowerPoint) | Cambria (headers) + Calibri (body) | Both ship with Office and render true-to-width in any PDF/QA preview, so text never overflows unexpectedly — a real risk with decorative fonts in `.pptx` |
| Figures (matplotlib) | Default sans-serif | Matches the dashboard's plain, functional feel |

This isn't an inconsistency to fix — a slide deck and a web page have
different rendering guarantees, and picking fonts for each medium's actual
constraints is the correct call, not a shortcut.

## Applying this to Track E's final submission

Per the official Prototypes for Humanity 2026 entry guide, there's no
required slide deck for submission — the actual deliverable is a
comprehensive PDF plus supporting images/diagrams. If that PDF or any
diagrams reuse this project's colors, follow the **risk ramp** above for any
data visualization, and the **Ocean Gradient** only if you want a cohesive
"branded" look for section dividers or cover pages.
