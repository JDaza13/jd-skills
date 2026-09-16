# jd-skills

A collection of agent skills (for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and other agents that read from a `.claude/skills/` style directory).

## Skills

- [excalidraw-diagram-skill](excalidraw-diagram-skill/) — generates Excalidraw diagrams that argue visually, with a render-and-validate loop. Based on [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill), generalized to a brand-neutral default palette.

## Installation

Each skill is self-contained. Clone this repo and copy the skill you want into your project's `.claude/skills/` directory:

```bash
git clone https://github.com/JDaza13/jd-skills.git
cp -r jd-skills/<skill-name> your-project/.claude/skills/<skill-name>
```

See each skill's own README for setup and usage.
