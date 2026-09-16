# jd-skills

A collection of agent skills (for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and other agents that read from a `.claude/skills/` style directory).

## Skills

- [excalidraw-diagram-skill](excalidraw-diagram-skill/): generates Excalidraw diagrams that argue visually, with a render-and-validate loop. Based on [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill), generalized to a brand-neutral default palette.

## Installation

Each skill is self-contained. Clone this repo and copy the skill you want into your project's `.claude/skills/` directory:

```bash
git clone https://github.com/JDaza13/jd-skills.git
cp -r jd-skills/<skill-name> your-project/.claude/skills/<skill-name>
```

See each skill's own README for setup and usage.

## A note on provenance

Everything in this repo is a skill I've used and tweaked for my own workflow, not
original work I'm claiming credit for. Where a skill is based on someone else's work,
that source is credited by name and link, both here and in the skill's own README. This
repo is personal and non-commercial. I won't sell it or profit from it in any way. If
you're a credited source and want the attribution changed, or want a skill taken down,
open an issue and I'll act on it promptly.
