# Element Templates

Copy-paste JSON templates for each Excalidraw element type. The `strokeColor` and `backgroundColor` values are placeholders — always pull actual colors from `color-palette.md` based on the element's semantic purpose.

## Free-Floating Text (no container)

```json
{
  "type": "text",
  "id": "label1",
  "x": 100,
  "y": 100,
  "width": 200,
  "height": 25,
  "text": "Section Title",
  "originalText": "Section Title",
  "fontSize": 20,
  "fontFamily": 3,
  "textAlign": "left",
  "verticalAlign": "top",
  "strokeColor": "<title color from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 11111,
  "version": 1,
  "versionNonce": 22222,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "containerId": null,
  "lineHeight": 1.25
}
```

## Line (structural, not arrow)

```json
{
  "type": "line",
  "id": "line1",
  "x": 100,
  "y": 100,
  "width": 0,
  "height": 200,
  "strokeColor": "<structural line color from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 44444,
  "version": 1,
  "versionNonce": 55555,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "points": [
    [0, 0],
    [0, 200]
  ]
}
```

## Small Marker Dot

```json
{
  "type": "ellipse",
  "id": "dot1",
  "x": 94,
  "y": 94,
  "width": 12,
  "height": 12,
  "strokeColor": "<marker dot color from palette>",
  "backgroundColor": "<marker dot color from palette>",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 66666,
  "version": 1,
  "versionNonce": 77777,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false
}
```

## Diamond (decision)

A diamond's text sits inside the inscribed rhombus, not the bounding box, so usable space
is roughly **half** the box's width and height. Undersizing this is the most common cause
of clipped or overflowing decision labels.

**Sizing formula:**

```
box width  ≥ (longest line's pixel width ÷ 0.5) + 40px padding
box height ≥ (number of lines × fontSize × 1.25 ÷ 0.5) + 40px padding
```

Keep diamond text to at most two short lines. If the condition needs more than that, it's
not a diamond, it's a card. Rewrite it as a rectangle instead.

*Example:* the label "chart in preview?" at `fontSize: 17` (monospace, so each character
is about `0.6 × fontSize` ≈ 10px wide) is 2 lines of up to 9 characters ≈ 90px wide. That
needs `box width ≥ 90/0.5 + 40 = 220px` and `box height ≥ (2 × 17 × 1.25)/0.5 + 40 ≈ 125px`.

```json
{
  "type": "diamond",
  "id": "gate_diamond",
  "x": 500,
  "y": 500,
  "width": 220,
  "height": 125,
  "strokeColor": "<stroke from palette based on semantic purpose>",
  "backgroundColor": "<fill from palette based on semantic purpose>",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 88888,
  "version": 1,
  "versionNonce": 99999,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": [{ "id": "gate_label", "type": "text" }],
  "link": null,
  "locked": false,
  "roundness": null
}
```

Text is free-floating, never a bound label. A bound label centers on the bounding box,
which happens to work for the label itself, but arrows bound to the diamond will still
target the box's vertices per the fan-out recipe below, so keep the two independent:

```json
{
  "type": "text",
  "id": "gate_label",
  "x": 550,
  "y": 540,
  "width": 120,
  "height": 45,
  "text": "chart in\npreview?",
  "originalText": "chart in\npreview?",
  "fontSize": 17,
  "fontFamily": 3,
  "textAlign": "center",
  "verticalAlign": "middle",
  "strokeColor": "<text color from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 13131,
  "version": 1,
  "versionNonce": 14141,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "containerId": null,
  "lineHeight": 1.25
}
```

**Arrow exits.** See `diagram-standard.md` §6 for the full diamond fan-out recipe. In short:
a diamond's only real connection points are its four vertices, so a two-way branch exits
from the left and right vertices (not the bottom, and never from an arbitrary point along
an edge), and `startBinding`/`endBinding` on a diamond needs `gap: 8-12` instead of the
usual `gap: 2`, because Excalidraw's binding hit-test uses the bounding box, not the visible
diamond outline.

## Labeled ellipse (single short line)

An ellipse curves inward on all four sides, so its usable text area is smaller than a
rectangle's: roughly **70% of width, 50% of height**, centered. This template is for a
single short line only (a start/end node, a small state marker). It is not a card: never
add a second (body) text element inside an ellipse. If the concept needs a title and a
body, use a rectangle instead, see `diagram-standard.md` §1.

**Sizing formula:**

```
box width  ≥ (label pixel width ÷ 0.7) + 20px padding
box height ≥ (fontSize × 1.25 ÷ 0.5) + 20px padding
```

```json
{
  "type": "ellipse",
  "id": "start_node",
  "x": 100,
  "y": 100,
  "width": 140,
  "height": 70,
  "strokeColor": "<stroke from palette based on semantic purpose>",
  "backgroundColor": "<fill from palette based on semantic purpose>",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 15151,
  "version": 1,
  "versionNonce": 16161,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": [{ "id": "start_label", "type": "text" }],
  "link": null,
  "locked": false
}
```

## Legend entry (swatch + label)

A legend entry is a small filled rectangle showing the actual color, paired with
free-floating text. Never describe a color by name alone ("blue = X") without the swatch;
the reader should not have to guess which blue you mean. Repeat this pair once per legend
row, stacked with consistent vertical spacing (28-32px between rows).

```json
{
  "type": "rectangle",
  "id": "legend_swatch_1",
  "x": 100,
  "y": 100,
  "width": 24,
  "height": 16,
  "strokeColor": "<the exact stroke this entry explains>",
  "backgroundColor": "<the exact fill this entry explains>",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 17171,
  "version": 1,
  "versionNonce": 18181,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "roundness": { "type": 3 }
}
```

```json
{
  "type": "text",
  "id": "legend_label_1",
  "x": 132,
  "y": 100,
  "width": 220,
  "height": 20,
  "text": "existing merge detect",
  "originalText": "existing merge detect",
  "fontSize": 16,
  "fontFamily": 3,
  "textAlign": "left",
  "verticalAlign": "middle",
  "strokeColor": "<legend text color from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 19191,
  "version": 1,
  "versionNonce": 20202,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "containerId": null,
  "lineHeight": 1.25
}
```

## Rectangle

```json
{
  "type": "rectangle",
  "id": "elem1",
  "x": 100,
  "y": 100,
  "width": 180,
  "height": 90,
  "strokeColor": "<stroke from palette based on semantic purpose>",
  "backgroundColor": "<fill from palette based on semantic purpose>",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 12345,
  "version": 1,
  "versionNonce": 67890,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": [{ "id": "text1", "type": "text" }],
  "link": null,
  "locked": false,
  "roundness": { "type": 3 }
}
```

## Text (centered in shape)

```json
{
  "type": "text",
  "id": "text1",
  "x": 130,
  "y": 132,
  "width": 120,
  "height": 25,
  "text": "Process",
  "originalText": "Process",
  "fontSize": 16,
  "fontFamily": 3,
  "textAlign": "center",
  "verticalAlign": "middle",
  "strokeColor": "<text color — match parent shape's stroke or use 'on light/dark fills' from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 11111,
  "version": 1,
  "versionNonce": 22222,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "containerId": "elem1",
  "lineHeight": 1.25
}
```

## Arrow

```json
{
  "type": "arrow",
  "id": "arrow1",
  "x": 282,
  "y": 145,
  "width": 118,
  "height": 0,
  "strokeColor": "<arrow color — typically matches source element's stroke from palette>",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "angle": 0,
  "seed": 33333,
  "version": 1,
  "versionNonce": 44444,
  "isDeleted": false,
  "groupIds": [],
  "boundElements": null,
  "link": null,
  "locked": false,
  "points": [
    [0, 0],
    [118, 0]
  ],
  "startBinding": { "elementId": "elem1", "focus": 0, "gap": 2 },
  "endBinding": { "elementId": "elem2", "focus": 0, "gap": 2 },
  "startArrowhead": null,
  "endArrowhead": "arrow"
}
```

For curves: use 3+ points in `points` array.
