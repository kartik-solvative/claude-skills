---
name: solvative-create-skill
description: This skill should be used when the user wants to "create a new Solvative skill", "add a skill to the solvative-claude-skills plugin", "write a skill for Solvative", or contribute a new reusable skill for the team. It guides the user through authoring a well-structured SKILL.md and submitting it to the solvative-claude-skills repository.
version: 1.0.0
---

# Create Solvative Skill

This skill guides you through creating a new skill for the `solvative-claude-skills` plugin.

---

## Quick Reference

- **Repository:** `github:solvative/claude-skills`
- **Skills live in:** `skills/<solvative-verb-noun>/SKILL.md`
- **Naming convention:** `solvative-<verb>-<noun>` (e.g. `solvative-create-deck`, `solvative-review-pr`)
- **After adding a skill:** bump `version` in `plugin.yaml` (minor bump) and add entry to `CHANGELOG.md`

---

## Process

Follow these steps in order:

### Phase 1: Define the Skill

Ask the user:
1. **What is this skill for?** Get a clear one-sentence description of what the skill does.
2. **When should it trigger?** Collect 4-6 trigger phrases (e.g. "create a deck", "make slides").
3. **What is the step-by-step process?** Walk through the workflow the skill should encode.
4. **Are there Solvative-specific conventions, colors, or brand guidelines involved?** Capture them.

Ask one question at a time.

### Phase 2: Draft the SKILL.md

Use this exact template:

```markdown
---
name: solvative-<verb>-<noun>
description: This skill should be used when the user asks to "<trigger 1>", "<trigger 2>", "<trigger 3>", "<trigger 4>", "<trigger 5>", or <natural language summary of when to use>. It <one sentence describing what it does>.
version: 1.0.0
---

# <Human-Readable Skill Title>

<One paragraph describing what this skill does and when to use it.>

---

## Quick Reference

- **Output:** <what the skill produces>
- **Key conventions:** <any Solvative-specific rules>

---

## Process

<Step-by-step instructions Claude should follow. Use numbered phases with clear headings.>
```

### Phase 3: Place the File

```bash
mkdir -p skills/solvative-<verb>-<noun>
# Write the SKILL.md to skills/solvative-<verb>-<noun>/SKILL.md
```

### Phase 4: Version Bump

In `plugin.yaml`, increment the minor version:
- `1.0.0` → `1.1.0` when adding the first new skill
- `1.1.0` → `1.2.0` for each subsequent skill

### Phase 5: Update CHANGELOG.md

Add an entry at the top of `CHANGELOG.md`:

```markdown
## [1.x.0] - YYYY-MM-DD
### Added
- `solvative-<verb>-<noun>` skill — <one-line description>
```

### Phase 6: Commit and Push

```bash
git add skills/solvative-<verb>-<noun>/SKILL.md plugin.yaml CHANGELOG.md
git commit -m "feat: add solvative-<verb>-<noun> skill"
git tag v1.x.0
git push origin main --tags
```

---

## Naming Convention Rules

| Rule | Example |
|---|---|
| Always prefix with `solvative-` | `solvative-create-deck` |
| Use verb-noun format | `create-deck`, `review-pr`, `setup-storyblok` |
| Lowercase, hyphen-separated | `solvative-generate-report` |
| Be specific, not generic | `solvative-create-deck` not `solvative-presentation` |

---

## References

- See `docs/contributing.md` for full contribution guide
- See existing skills in `skills/` for examples
- Official plugin-dev reference: use `plugin-dev:skill-development` skill
