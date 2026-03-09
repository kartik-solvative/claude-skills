# Contributing to solvative-claude-skills

> For a quick overview, see the Contributing section in [README.md](../README.md).
> This document covers the full process in detail.

---

## Fastest Path: Use the Meta-Skill

Inside Claude Code, run:

```
/solvative-claude-skills:solvative-create-skill
```

Claude will walk you through the entire process interactively — asking questions one at a time, drafting the skill, handling version bumps, and committing. Use this unless you have a specific reason to go manual.

---

## Manual Process

### Step 1: Name your skill

All skills follow the `solvative-<verb>-<noun>` convention:

| Rule | Good | Bad |
|---|---|---|
| Always prefix `solvative-` | `solvative-create-deck` | `create-deck` |
| Verb first, then noun | `solvative-review-pr` | `solvative-pr-review` |
| Lowercase, hyphen-separated | `solvative-setup-storyblok` | `solvative_SetupStoryblok` |
| Specific, not generic | `solvative-create-deck` | `solvative-presentation` |

### Step 2: Create the directory

```bash
cd ~/Projects/claude-skills   # or wherever you cloned it
mkdir -p skills/solvative-<verb>-<noun>
```

### Step 3: Write the SKILL.md

Create `skills/solvative-<verb>-<noun>/SKILL.md`:

```markdown
---
name: solvative-<verb>-<noun>
description: This skill should be used when the user asks to "<trigger 1>",
  "<trigger 2>", "<trigger 3>", "<trigger 4>", or <natural language summary>.
  It <one sentence describing what it does>.
version: 1.0.0
---

# <Human-Readable Title>

<One paragraph describing what this skill does and when to use it.>

---

## Quick Reference

- **Output:** <what the skill produces>
- **Key conventions:** <Solvative-specific rules — brand colors, fonts, file naming, etc.>

---

## Process

### Phase 1: <Name>

<Numbered, explicit steps. Not "ask the user what they want." Instead:>

1. Ask: "Who is the primary audience for this?"
2. Ask: "What is the main goal — inform, persuade, or sell?"
3. Ask: "Do you have existing brand assets to reference?"

Ask one question per message. Wait for an answer before proceeding.

### Phase 2: <Name>

...
```

**Quality bar for `description`:** Must include 4+ trigger phrases that cover different ways a user might ask — not just the most obvious one. Think about how a non-technical PM, a developer, and a designer would each phrase the same request.

**Quality bar for `Process`:** Each phase must have numbered, actionable steps. No vague instructions like "generate the output". Instead: "Run the Python script, passing `--output YYYY-MM-DD-<name>.pptx`."

**Solvative conventions must be explicit.** Do not assume Claude knows:

```markdown
## Brand Rules
- Font: Montserrat (all weights, via Google Fonts)
- Background dark: #002125  Background light: #FFFFFF
- Primary accent: #006D77   Secondary accent: #FFC400
- Output file: YYYY-MM-DD-<deck-name>.pptx in the current working directory
- Slide size: 13.333" × 7.5" (16:9 widescreen)
```

### Step 4: Bump version in three files

Adding a skill = **minor bump** (`1.1.0` → `1.2.0`).

Update the version field in all three files:

```bash
# plugin.yaml (line 2)
version: 1.2.0

# .claude-plugin/plugin.json (line 3)
"version": "1.2.0",

# .claude-plugin/marketplace.json (line 13)
"version": "1.2.0",
```

These three must always be in sync. A mismatch will cause confusing install behaviour.

### Step 5: Update CHANGELOG.md

Add a new entry at the very top, after the header block:

```markdown
## [1.2.0] - YYYY-MM-DD

### Added
- `solvative-<verb>-<noun>` skill — one-line description of what it does
```

### Step 6: Update README.md skills table

Add a row to the Skills table in `README.md`:

```markdown
| `solvative-<verb>-<noun>` | <one-line description> | "<trigger 1>", "<trigger 2>", "<trigger 3>" |
```

### Step 7: Commit, tag, push

```bash
git add skills/solvative-<verb>-<noun>/SKILL.md \
        plugin.yaml \
        .claude-plugin/plugin.json \
        .claude-plugin/marketplace.json \
        CHANGELOG.md \
        README.md

git commit -m "feat: add solvative-<verb>-<noun> skill"

git tag v1.2.0
git push origin main --tags
```

---

## Fixing or Improving an Existing Skill

Fixes = **patch bump** (`1.1.0` → `1.1.1`).

1. Edit the `SKILL.md` directly
2. Bump version in all three files (patch)
3. Update `CHANGELOG.md` under `### Fixed` or `### Changed`
4. Commit, tag, push

```bash
git add skills/<skill-name>/SKILL.md plugin.yaml .claude-plugin/ CHANGELOG.md
git commit -m "fix: improve <what you fixed> in solvative-<verb>-<noun>"
git tag v1.1.1
git push origin main --tags
```

---

## Versioning Reference

Three files must stay in sync: `plugin.yaml`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`.

| Change type | Bump | Example |
|---|---|---|
| Fix or improve an existing skill | patch | `1.1.0` → `1.1.1` |
| Add a new skill | minor | `1.1.0` → `1.2.0` |
| Rename or remove a skill | major | `1.1.0` → `2.0.0` |

---

## Pre-submission Checklist

- [ ] Name follows `solvative-<verb>-<noun>` — lowercase, hyphen-separated, verb first
- [ ] `description` frontmatter has 4+ distinct trigger phrases
- [ ] Process is written as numbered phases with explicit steps
- [ ] Solvative brand/convention details are explicit and complete
- [ ] Skill has a `## Quick Reference` section
- [ ] Version bumped in `plugin.yaml`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`
- [ ] `CHANGELOG.md` updated with correct version and date
- [ ] README skills table updated
- [ ] Committed with `feat:` prefix, tagged, pushed with `--tags`

---

## Team install reminder

After pushing and tagging, team members update with:

```bash
cd ~/.claude/plugins/local/solvative-claude-skills && git pull
```

Then restart Claude Code.
