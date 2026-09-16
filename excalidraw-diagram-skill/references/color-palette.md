# Color Palette (Default)

A generic, brand-neutral starting palette for diagrams produced by this skill. Every
color used in a diagram should trace back to a **role** in this table, not a one-off hex
value invented on the spot.

**To brand this for your own project:** replace the hex values below with your own design
tokens (or just colors you like), keeping the same roles. Everything else in the skill
(`SKILL.md`, `references/diagram-standard.md`, `references/element-templates.md`) refers to
roles ("heading text", "primary accent", "error accent"), not literal hex codes, so a swap
here is all it takes to re-skin every diagram this skill produces.

---

## Text

| Role                                | Hex       |
| ------------------------------------ | --------- |
| Diagram title, dark-fill labels      | `#1e293b` |
| Body text inside neutral shapes      | `#334155` |
| Section / lane captions, subtitles   | `#64748b` |
| Legend, muted annotations            | `#94a3b8` |
| Text on a dark fill                  | `#ffffff` |

## Structural shapes

| Role                                    | Fill      | Stroke    |
| ---------------------------------------- | --------- | --------- |
| Neutral shape (UI surface, wire, note)   | `#ffffff` | `#94a3b8` |
| Grouping bar (service layer)             | `#f1f5f9` | `#64748b` |
| Light boundary (client-side, secondary)  | `#dbeafe` | `#2563eb` |
| **Primary boundary (anchor)**            | `#1e293b` | `#1e293b` — white text |
| External / upstream system               | `#fafafa` | `#94a3b8` |
| Lane outline (dashed)                    | none      | `#cbd5e1` |

The solid dark fill is the diagram's single strongest value. Reserve it for the one
element the diagram is arguing about — the thing everything else exists to explain.

## Semantic accents

| Role                                           | Fill      | Stroke    |
| ----------------------------------------------- | --------- | --------- |
| Gap / defect / "this doesn't work yet"          | `#fef2f2` | `#dc2626` |
| Cross-cutting dependency (lines + accent box)   | `#fef3c7` | `#d97706` |
| Success / confirmed state                       | `#f0fdf4` | `#16a34a` |

Red means _a gap in the system_, never merely "important". If everything is red, nothing is.

## Categorical hues (one per column / domain)

Assign in order so a small diagram uses only the first few, most distinct hues.

| #   | Hue    | Fill      | Stroke    |
| --- | ------ | --------- | --------- |
| 1   | Blue   | `#dbeafe` | `#2563eb` |
| 2   | Green  | `#dcfce7` | `#16a34a` |
| 3   | Teal   | `#ccfbf1` | `#0d9488` |
| 4   | Violet | `#ede9fe` | `#7c3aed` |
| 5   | Rose   | `#ffe4e6` | `#e11d48` |
| 6   | Amber  | `#fef3c7` | `#d97706` |

Amber doubles as the cross-cutting accent, so avoid it as a column hue when the diagram
also draws dependency lines.

## Arrows

| Role                     | Stroke    | Style                                                 |
| ------------------------ | --------- | ------------------------------------------------------ |
| Call path / primary flow | `#64748b` | solid, width 2                                        |
| Cross-cutting dependency | `#d97706` | dashed, width 2, `roundness: null` for square corners |

---

## Notes

- **Fill/stroke pairing.** Every pair is a light fill (~L92%) with a dark stroke (~L30-45%).
  When extending, match those levels or the new hue will read as a different weight.
- Excalidraw curves multi-point arrows unless `roundness` is `null`, and it lays an arrow's
  bound label out at the path midpoint regardless of stored coordinates — use free-floating
  text when a routed line needs a label in a specific spot.
