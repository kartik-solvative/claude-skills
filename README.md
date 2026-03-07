# solvative-claude-skills

Shared Claude Code skills for the Solvative team.

## Install

**Step 1 — Add the Solvative marketplace** (once per machine):

```bash
claude plugin marketplace add kartik-solvative/claude-skills
```

**Step 2 — Install the plugin:**

```bash
claude plugin install solvative-claude-skills@solvative
```

## Skills

| Skill | Description | Trigger Phrases |
|---|---|---|
| `solvative-create-deck` | Generates Solvative-branded PPTX presentations | "create a presentation", "make slides", "build a deck", "create a PPTX" |
| `solvative-create-skill` | Guides authoring a new skill for this plugin | "create a new Solvative skill", "add a skill", "write a skill for Solvative" |
| `solvative-create-marketing-site` | Generates Hygraph-powered marketing sites with scroll-storytelling | "create a marketing site", "build a marketing website", "create a landing page" |

## Usage

Skills are invoked as slash commands in Claude Code:

```
/solvative-claude-skills:solvative-create-deck
```

Or Claude will pick them up automatically based on what you ask.

## Adding a New Skill

Use the meta-skill:

```
/solvative-claude-skills:solvative-create-skill
```

Or see [docs/contributing.md](docs/contributing.md) for the manual process.

## Versioning

This plugin uses [Semantic Versioning](https://semver.org/):
- **patch** — fix or improve an existing skill
- **minor** — add a new skill
- **major** — rename/remove a skill

See [CHANGELOG.md](CHANGELOG.md) for version history.
