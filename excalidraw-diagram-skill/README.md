# Excalidraw Diagram Skill

A coding agent skill that generates beautiful and practical Excalidraw diagrams from natural language descriptions. Not just boxes-and-arrows - diagrams that **argue visually**.

Compatible with any coding agent that supports skills. For agents that read from `.claude/skills/` (like [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and [OpenCode](https://github.com/nicepkg/OpenCode)), just drop it in and go.

> Based on [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) by [Cole Medin](https://github.com/coleam00). This copy generalizes the color palette (the original wired in one project's proprietary design tokens) into a brand-neutral default anyone can re-skin.

## What Makes This Different

- **Diagrams that argue, not display.** Every shape/group of shapes mirrors the concept it represents — fan-outs for one-to-many, timelines for sequences, convergence for aggregation. No uniform card grids.
- **Evidence artifacts.** As an example, technical diagrams include real code snippets and actual JSON payloads.
- **Built-in visual validation.** A Playwright-based render pipeline lets the agent see its own output, catch layout issues (overlapping text, misaligned arrows, unbalanced spacing), and fix them in a loop before delivering.
- **Brand-customizable.** All colors and brand styles live in a single file (`references/color-palette.md`), starting from a neutral default. Swap it out and every diagram follows your palette.

## Installation

Clone or download this repo, then copy this skill's folder into your project's `.claude/skills/` directory:

```bash
git clone https://github.com/JDaza13/jd-skills.git
cp -r jd-skills/excalidraw-diagram-skill .claude/skills/excalidraw-diagram
```

## Setup

The skill includes a render pipeline that lets the agent visually validate its diagrams. Pick whichever runtime you already have. You only need one.

**Option A: Ask your coding agent (easiest)**

Just tell your agent: _"Set up the Excalidraw diagram skill renderer by following the instructions in SKILL.md."_ It will run the commands for you.

**Option B: Node.js**

```bash
cd .claude/skills/excalidraw-diagram/references
npm install
npx playwright-core install chromium
```

Then render with:

```bash
node render_excalidraw.mjs <path-to-file.excalidraw>
```

**Option C: Python + uv**

```bash
cd .claude/skills/excalidraw-diagram/references
uv sync
uv run playwright install chromium
```

Then render with:

```bash
uv run python render_excalidraw.py <path-to-file.excalidraw>
```

## Usage

Ask your coding agent to create a diagram:

> "Create an Excalidraw diagram showing how the AG-UI protocol streams events from an AI agent to a frontend UI"

The skill handles the rest — concept mapping, layout, JSON generation, rendering, and visual validation.

## Customize Colors

Edit `references/color-palette.md` to match your brand. Everything else in the skill is universal design methodology.

## File Structure

```
excalidraw-diagram-skill/
  SKILL.md                          # Design methodology + workflow
  references/
    color-palette.md                # Brand colors (edit this to customize), ships with a neutral default
    diagram-standard.md             # House rules for a consistent set of diagrams
    element-templates.md            # JSON templates for each element type
    json-schema.md                  # Excalidraw JSON format reference
    render_excalidraw.py            # Render .excalidraw to PNG (Python + uv)
    render_excalidraw.mjs           # Render .excalidraw to PNG (Node.js)
    render_template.html            # Browser template used by both renderers
    pyproject.toml                  # Python dependencies (playwright)
    package.json                    # Node dependencies (playwright-core)
```
