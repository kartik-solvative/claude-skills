# solvative-claude-skills

Shared Claude Code skills for the Solvative team.

## Install

```bash
claude plugin install github:solvative/claude-skills
```

## Skills

| Skill | Description | Trigger Phrases |
|---|---|---|
| `solvative-create-deck` | Generates Solvative-branded PPTX presentations | "create a presentation", "make slides", "build a deck", "create a PPTX" |
| `solvative-create-skill` | Guides authoring a new skill for this plugin | "create a new Solvative skill", "add a skill", "write a skill for Solvative" |

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
