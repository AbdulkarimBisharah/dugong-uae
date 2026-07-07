# diagrams — clean monochrome flow & architecture diagrams

Six black-and-white diagrams of the Dugong Watch project, for the report and
presentation. Each is provided as an editable Graphviz source (`.dot`), a
scalable vector (`.svg`), and a high-resolution raster (`.png`).

| # | File | Shows |
|---|---|---|
| 1 | `1_system_architecture` | End-to-end architecture: data sources → Earth Engine → ML → risk model → delivery |
| 2 | `2_five_track_pipeline` | The five tracks (A–E) and what each one produces |
| 3 | `3_classification_workflow` | Track B: Sentinel-2 → feature stack → Random Forest → seagrass map + accuracy |
| 4 | `4_change_detection` | Track B: one classifier on 2019 & 2024 → stable / gain / loss change classes |
| 5 | `5_risk_model` | Track C: Value × Threat → rescale → 5 risk classes → ranked hotspots |
| 6 | `6_threat_model` | Track C: five weighted threat factors → combined threat pressure surface |

## Regenerating

Requires [Graphviz](https://graphviz.org/). From this folder:

```bash
for f in *.dot; do
  dot -Tsvg "$f" -o "${f%.dot}.svg"
  dot -Tpng -Gdpi=170 "$f" -o "${f%.dot}.png"
done
```

Style is monochrome by design (white / grey fills, black strokes) — no colour.
Edit the `.dot` files to change wording or layout, then re-render.
