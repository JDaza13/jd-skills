# Diagram standard

House rules for every diagram this skill produces. The generic methodology lives in
[SKILL.md](../SKILL.md) and the colour values in [color-palette.md](color-palette.md);
this file is what makes a set of diagrams look like they belong together.

Read it before drawing, and run the checklist at the bottom before publishing.

---

## 1. Card anatomy

A card is **two text elements**, not one: a title and a body. Excalidraw has no rich text
inside a bound label, so a single element cannot make its first line stand out.

| Part  | How                                                                           |
| ----- | ----------------------------------------------------------------------------- |
| Title | Its own text element, +2px over body size, in the card's **stroke** colour    |
| Body  | Its own text element, body size, in `#334155`, or `#ffffff` on the dark fill |

**Never let the title come out lighter than the body.** On a card whose stroke is a light
grey (`#94a3b8`, `#64748b`: neutral cards, upstream systems, the service bar) the stroke
colour inverts the hierarchy, so the title takes `#1e293b` instead.

Title, body and rectangle share a `groupIds` entry so the card drags as one unit. Do **not**
use a bound label: Excalidraw lays a bound label out at the container's centre whatever
coordinates you store, which would drop the body on top of the title.

**Name the file.** Every card that stands for code carries its path or symbol —
`analytics/EventManager.ts`, `useEnrollAction()`, `store/zustand/clientStore.ts`. A reader
should be able to jump from any box to the code without searching. Cards that stand for a
concept, a rule or an external system are the exception.

**One fact per line.** Never pad with spaces to fake columns — it reads as sloppy and
collapses the moment the font metrics shift:

```
✗   browserInfo · osInfo    parsed from the user agent
    env                     production only in production

✓   browserInfo · osInfo — parsed from the user agent
    env — production only in production
```

The same rule kills space-aligned tables inside a card. If the content is genuinely tabular,
it is two cards or a lane, not one card with invisible columns.

**Blank lines separate blocks, not paragraphs.** At most one blank line inside a card, and
only to divide title-adjacent summary from detail.

**Row height comes from content, not from a round number.** Picking `h: 190` for a row and
letting the shortest card in it carry two lines leaves a block of dead space under the text —
the vertical version of the space-padded column, and just as sloppy. Compute the height a
card needs (`padding + title + gap + lines × body × lineHeight + padding`), take the tallest
in the row, and use that. A row is exactly as tall as the card that needs the most.

## 2. Type scale

| Role                  | Size | Colour    |
| --------------------- | ---- | --------- |
| Diagram title         | 32   | `#1e293b` |
| Column header chip    | 20   | stroke    |
| Subtitle              | 17   | `#64748b` |
| Rail label, lane name | 18   | `#64748b` |
| Card title            | 17   | stroke    |
| Card body             | 15   | `#334155` |
| Legend                | 16   | `#94a3b8` |

A **column header chip** is the body-less card that names a column (`PLANS`, `CLIENT STATE`).
It is the only element that outranks a card title, and its single text element is centred in
the box.

A **full-width bar** carries a title and its aside on **one line** — the title at the left in
the stroke colour, the aside continuing to its right at body size. A bar that drops its aside
onto a second line reads as a card with a stranded subtitle.

## 3. Separators

One separator per job, across every diagram:

- `·` — between peers in a list: `clientStore · uiStore · userCodeStore`
- `—` — introduces an aside or a consequence: `no events key — receives every event`
- `→` — a transformation or a call: `domain properties → wire fields`

Never `+` as a list separator, and never mix `·` and `—` for the same relationship in one
card.

## 4. Colour

Values come from [color-palette.md](color-palette.md). Two rules on top of it:

**One colour, one meaning, per diagram.** If blue means "a mounted React component" then
nothing else in that diagram is blue. A colour reused for a second meaning is worse than no
colour at all.

**The legend defines every colour that appears.** Not just the interesting ones. If a
diagram uses a dark fill, light blue, green, teal, violet, rose, amber, grey and red, the legend
has nine entries. Distinguish shades explicitly. "Dark fill = primary boundary" and "light blue =
client-side component" are two entries, never one entry called "blue".

The one that gets forgotten is the **neutral**, because white does not feel like a choice.
It usually covers more cards than any accent in the drawing, so it needs an entry at least as
much as the hue used twice.

## 5. Dashed strokes

Dashed carries two distinct meanings and the legend must name both:

| Dashed on | Means                                                         |
| --------- | ------------------------------------------------------------- |
| An arrow  | A dependency or a conditional path, not the primary flow      |
| A box     | An annotation — a note, a caveat, a gap. **Not a component.** |
| A lane    | A grouping boundary, which is why lanes use a 1px `#cbd5e1`   |

## 6. Arrows

- One arrowhead style (`arrow`) and `strokeWidth: 2` everywhere.
- **Arrowhead size comes from the last segment, not the stroke width.** Excalidraw renders
  it at `min(30, finalSegmentLength / 2)`, so a 300px arrow, a 28px arrow and a routed
  fan-out ending in a 14px drop produce three visibly different heads no matter how equal
  their `strokeWidth` is. Every arrow therefore ends in a segment of exactly **28px**:
  - shorter than 28 — widen the gutter. A fan-out needs **60px** between the rows it
    connects (6px standoff, a 20px drop to the bus line, then the 28px final drop).
  - longer than 28 — insert a **collinear** point 28px from the tip, and set the arrow's
    `roundness` to `null` in the same edit. The geometry and the approach angle are
    unchanged; only the size calculation sees the extra point.

  The `roundness` half is not optional. A three-point arrow left at `roundness: {type: 2}`
  is fitted with a curve, and when the first segment dwarfs the last — a 291px run into a
  28px tip — the end tangent flips and **the arrowhead renders backwards**, pointing out of
  the box it should point into. Short first segments hide it, so it surfaces only on the
  longest arrows in the drawing.

  Checking `strokeWidth` does not catch this. Measure the final segment.

- Solid `#64748b` for the primary flow; dashed `#d97706` for a dependency.
- Vertical arrows are generated from the box edges, never hand-placed, so every arrow in a
  row is identical. Keep connected rows exactly **40px** apart and every arrow is 28px.
- Routed (multi-point) arrows need `roundness: null` or Excalidraw curves them into spaghetti.
- A fan-out leaves **one** origin — a bar or a single box edge. An arrow positioned by x
  alone will silently appear to leave whichever box happens to sit at that x. When one card
  in a row continues the flow, put it in **column 0** so the spine runs straight down instead
  of doubling back across the row.
- **A dependency crosses the drawing on the outside.** A dashed line routed straight from one
  card to another two rows away will cut through whatever sits between them. Send it down the
  margin beyond the last column, and put the card it leaves in the outermost column so it
  reaches that margin without crossing a sibling.
- **Two arrows leaving the same card need two exits.** A solid arrow and a dashed dependency
  both dropped from the card's centre x overlap for their whole shared run. Leave the centre
  to the primary flow and drop the dependency from a quarter point.

## 7. Rails, rows and lanes

- Every row gets a left-rail label at `x = -300`, vertically centred on the row — including
  full-width bars like `track()` or `dispatchToProviders()`. An unlabelled row makes the
  reader infer the spine.
- Rail labels are the diagram's table of contents: they should read top-to-bottom as the
  story (`Domain events → Enrichment → Adapters → Destinations`).
- A lane groups cards that share a caveat (`Outside the event bus — these never call track()`).

## 8. Grid

Columns are 420 wide on a 460 pitch; full-width bars span the whole column set. Connected
rows sit 40px apart. Keep the spacing when adding a row — it is what makes the arrows uniform.

## 9. Excalidraw mechanics worth knowing

- A **bound label is laid out at its container's centre** (and at the path midpoint for an
  arrow) regardless of the coordinates you store. Anything needing a specific position —
  a card title, a label beside a routed line — must be free-floating text.
- **Empty text elements** bound to an arrow render as an empty label box. Delete them.
- Element **ids are semantic**: `hdr_*` / `ui_*` / `hooks_*` / `wire_*` per column, `up_*` per
  upstream, `a_<from>_<to>` for arrows. A generated id like `cKWeGvQRHVlvOkwV0CGPK` makes the
  next diff unreadable.
- **Render before you believe it.** Text overflow, wrong-origin arrows and unbalanced
  whitespace are invisible in JSON. See the render loop in [SKILL.md](../SKILL.md).

## 10. Checklist

1. Every code card names its file or symbol
2. Card titles are separate elements, +2px, in the stroke colour
3. No space-padded columns anywhere
4. Separators are `·` / `—` / `→`, used for one job each
5. Every colour in the drawing has a legend entry, shades distinguished
6. Dashed boxes and dashed arrows are both explained in the legend
7. All arrows are strokeWidth 2 with the same arrowhead
8. Every row, bars included, has a rail label
9. Connected rows are 40px apart, fan-out gutters 60px; arrows generated from box edges
10. Every arrow ends in a 28px segment, and no multi-point arrow kept its `roundness`
11. No card has dead space under its last line
12. Rendered to PNG and actually looked at

Item 12 is the one that finds things. Several rules here — arrowhead size, a reversed end
tangent, a dependency crossing a card, two arrows sharing a run — are **derived** at render
time and are invisible in the JSON. An audit that reads stored properties will report a clean
drawing while the PNG shows the defect: `strokeWidth: 2` on every arrow says nothing about
whether the heads match. Measure what the renderer measures, then crop the PNG and look at
the spots the measurement flagged.
