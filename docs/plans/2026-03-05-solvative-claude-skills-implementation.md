# Solvative Claude Skills Plugin — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the `solvative-claude-skills` Claude Code plugin with two initial skills, a versioned README, CHANGELOG, and contributing guide.

**Architecture:** Single monorepo plugin following the standard Claude Code plugin format (`plugin.yaml` + `skills/` directory). Skills are installed org-wide via `claude plugin install github:solvative/claude-skills`. All skills use the `solvative-<verb>-<noun>` naming convention.

**Tech Stack:** YAML (plugin manifest), Markdown (SKILL.md files), Git (versioning via semver tags)

---

## Reference Material

- Existing skill to migrate: `~/.claude/plugins/local/solvative-deck/skills/create-solvative-deck/SKILL.md`
- Official plugin structure reference: `~/.claude/plugins/cache/claude-plugins-official/plugin-dev/205b6e0b3036/skills/skill-development/SKILL.md`
- Approved design doc: `docs/plans/2026-03-05-solvative-skills-repo-design.md`

---

## Task 1: Create plugin.yaml

**Files:**
- Create: `plugin.yaml`

**Step 1: Create the file**

```yaml
name: solvative-claude-skills
version: 1.0.0
description: Shared Claude Code skills for the Solvative team
```

**Step 2: Verify the file exists and looks correct**

```bash
cat plugin.yaml
```

Expected: the three fields above, nothing else.

**Step 3: Commit**

```bash
git add plugin.yaml
git commit -m "feat: add plugin.yaml manifest"
```

---

## Task 2: Migrate solvative-create-deck skill

**Files:**
- Create: `skills/solvative-create-deck/SKILL.md`

**Step 1: Create the skills directory and copy the existing skill**

```bash
mkdir -p skills/solvative-create-deck
cp ~/.claude/plugins/local/solvative-deck/skills/create-solvative-deck/SKILL.md skills/solvative-create-deck/SKILL.md
```

**Step 2: Update the skill name in frontmatter**

Open `skills/solvative-create-deck/SKILL.md` and change the YAML frontmatter:

```yaml
---
name: solvative-create-deck
description: This skill should be used when the user asks to "create a presentation", "create a deck", "make slides", "build a PPTX", "generate a presentation", or wants to produce a Solvative-branded deck for a client or internal audience. It generates polished, Google Slides-compatible PPTX files through conversational questioning, in-depth research, outline approval, and a 20-slide type template library in the Solvative design language.
version: 1.0.0
---
```

Only the `name` field changes (from `create-solvative-deck` to `solvative-create-deck`). The rest of the file stays identical.

**Step 3: Verify the name was updated correctly**

```bash
head -5 skills/solvative-create-deck/SKILL.md
```

Expected: frontmatter with `name: solvative-create-deck`

**Step 4: Commit**

```bash
git add skills/solvative-create-deck/SKILL.md
git commit -m "feat: add solvative-create-deck skill (migrated from local plugin)"
```

---

## Task 3: Create solvative-create-skill (meta-skill)

**Files:**
- Create: `skills/solvative-create-skill/SKILL.md`

**Step 1: Create the directory**

```bash
mkdir -p skills/solvative-create-skill
```

**Step 2: Write the SKILL.md**

Create `skills/solvative-create-skill/SKILL.md` with this content:

````markdown
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
description: This skill should be used when the user asks to "<trigger 1>", "<trigger 2>", "<trigger 3>", or <natural language summary of when to use>. It <one sentence describing what it does>.
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
````

**Step 3: Verify the file was created**

```bash
head -10 skills/solvative-create-skill/SKILL.md
```

Expected: YAML frontmatter with `name: solvative-create-skill`

**Step 4: Commit**

```bash
git add skills/solvative-create-skill/SKILL.md
git commit -m "feat: add solvative-create-skill meta-skill"
```

---

## Task 4: Create CHANGELOG.md

**Files:**
- Create: `CHANGELOG.md`

**Step 1: Write the file**

```markdown
# Changelog

All notable changes to the `solvative-claude-skills` plugin are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/):
- **patch** (1.0.x) — fix or improve an existing skill
- **minor** (1.x.0) — add a new skill
- **major** (x.0.0) — rename/remove a skill or change invocation

---

## [1.0.0] - 2026-03-05

### Added
- `solvative-create-deck` skill — generates Solvative-branded PPTX presentations via conversational questioning, research, outline approval, and a 20-slide template library
- `solvative-create-skill` skill — meta-skill that guides authoring and submitting new skills to this plugin
```

**Step 2: Verify**

```bash
cat CHANGELOG.md
```

**Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: add CHANGELOG.md for v1.0.0"
```

---

## Task 5: Create docs/contributing.md

**Files:**
- Create: `docs/contributing.md`

**Step 1: Write the file**

```markdown
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
```

**Step 2: Commit**

```bash
git add docs/contributing.md
git commit -m "docs: add contributing guide"
```

---

## Task 6: Create README.md

**Files:**
- Create: `README.md`

**Step 1: Write the file**

```markdown
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
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with install instructions and skill catalogue"
```

---

## Task 7: Tag v1.0.0

**Step 1: Verify all files are committed**

```bash
git status
git log --oneline
```

Expected: clean working tree, 6+ commits.

**Step 2: Tag the release**

```bash
git tag v1.0.0
```

**Step 3: Verify tag**

```bash
git tag
```

Expected: `v1.0.0`

**Step 4: Push to remote (once repo is on GitHub)**

```bash
git push origin main --tags
```

> Note: The GitHub remote needs to be set up first (`git remote add origin git@github.com:solvative/claude-skills.git`). If the remote isn't ready yet, skip the push — the tag is committed locally.

---

## Final Verification

After all tasks complete:

```bash
ls -la
# Expected: plugin.yaml  README.md  CHANGELOG.md  skills/  docs/

ls skills/
# Expected: solvative-create-deck/  solvative-create-skill/

cat plugin.yaml
# Expected: name: solvative-claude-skills, version: 1.0.0

git log --oneline
# Expected: 7+ commits from feat/docs tasks
```
