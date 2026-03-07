# Contributing to solvative-claude-skills

## Adding a New Skill

The fastest way to add a skill is to use the `solvative-create-skill` skill in Claude Code:

```
/solvative-claude-skills:solvative-create-skill
```

It will guide you through the entire process interactively.

---

## Manual Process

### 1. Name your skill

All skills follow the `solvative-<verb>-<noun>` convention:
- `solvative-create-deck`
- `solvative-review-pr`
- `solvative-setup-storyblok`

### 2. Create the skill directory and SKILL.md

```bash
mkdir -p skills/solvative-<verb>-<noun>
touch skills/solvative-<verb>-<noun>/SKILL.md
```

### 3. SKILL.md template

```markdown
---
name: solvative-<verb>-<noun>
description: This skill should be used when the user asks to "<trigger 1>", "<trigger 2>", or <summary>. It <one sentence on what it does>.
version: 1.0.0
---

# <Human-Readable Title>

<Description paragraph>

---

## Process

<Step-by-step instructions>
```

### 4. Bump plugin version

In `plugin.yaml`, increment the **minor** version (e.g. `1.0.0` → `1.1.0`).

### 5. Update CHANGELOG.md

Add a new entry at the top:

```markdown
## [1.x.0] - YYYY-MM-DD
### Added
- `solvative-<verb>-<noun>` skill — one-line description
```

### 6. Commit, tag, and push

```bash
git add skills/solvative-<verb>-<noun>/SKILL.md plugin.yaml CHANGELOG.md
git commit -m "feat: add solvative-<verb>-<noun> skill"
git tag v1.x.0
git push origin main --tags
```

---

## Versioning Reference

| Change type | Version bump | Example |
|---|---|---|
| Fix/improve existing skill | patch | 1.0.0 → 1.0.1 |
| Add new skill | minor | 1.0.0 → 1.1.0 |
| Rename/remove skill | major | 1.0.0 → 2.0.0 |

---

## Skill Quality Checklist

Before submitting, verify:
- [ ] Name follows `solvative-<verb>-<noun>` convention
- [ ] `description` in frontmatter includes 4+ trigger phrases
- [ ] Process is written as numbered steps, not vague prose
- [ ] Any Solvative brand/convention details are explicit (colors, fonts, file naming)
- [ ] `plugin.yaml` version bumped
- [ ] `CHANGELOG.md` updated
