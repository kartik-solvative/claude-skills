# Solvative Claude Skills Repository — Design

**Date:** 2026-03-05
**Status:** Approved

---

## Overview

A shared Claude Code plugin repository for the Solvative team. Team members install once via git URL and get access to all Solvative-specific skills in Claude Code.

**Install command:**
```bash
claude plugin install github:solvative/claude-skills
```

---

## Repository Structure

```
solvative-claude-skills/
├── plugin.yaml                       ← plugin manifest
├── README.md                         ← install guide + skills catalogue
├── CHANGELOG.md                      ← version history
├── skills/
│   ├── solvative-create-deck/        ← migrated from ~/.claude/plugins/local/solvative-deck/
│   │   └── SKILL.md
│   └── solvative-create-skill/       ← meta-skill for authoring new Solvative skills
│       └── SKILL.md
└── docs/
    ├── plans/                        ← design docs
    └── contributing.md               ← skill template + contribution guide
```

---

## Plugin Manifest

```yaml
name: solvative-claude-skills
version: 1.0.0
description: Shared Claude Code skills for the Solvative team
```

---

## Skills in v1.0.0

| Skill | Directory | Description | Source |
|---|---|---|---|
| `solvative-create-deck` | `skills/solvative-create-deck/` | Generates Solvative-branded PPTX presentations | Migrated from local plugin |
| `solvative-create-skill` | `skills/solvative-create-skill/` | Guides authoring a new skill for this plugin | New |

**Naming convention:** All skills follow `solvative-<verb>-<noun>` pattern.

**Invocation:** `solvative-claude-skills:solvative-create-deck`

---

## Versioning Policy

Single plugin-level semver. All skills bump together.

| Bump | When |
|---|---|
| `patch` (1.0.x) | Fix a bug or improve instructions in an existing skill |
| `minor` (1.x.0) | Add a new skill |
| `major` (x.0.0) | Rename/remove a skill or change invocation |

---

## README Structure

1. One-line install command
2. Skills catalogue table (name, description, trigger phrases)
3. Versioning policy summary
4. Link to `docs/contributing.md`

---

## CHANGELOG Format

```markdown
## [1.0.0] - 2026-03-05
### Added
- `solvative-create-deck` skill — generates Solvative-branded PPTX presentations
- `solvative-create-skill` skill — meta-skill for authoring new Solvative skills
```

---

## Contributing Guide (`docs/contributing.md`)

Will include:
- Skill SKILL.md frontmatter template
- Step-by-step: write → test locally → PR → version bump
- Naming convention rules
- Link to official plugin-dev skill for reference
