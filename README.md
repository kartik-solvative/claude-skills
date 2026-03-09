# solvative-claude-skills

Shared Claude Code skills for the Solvative team. Install once, get access to all Solvative-specific skills in Claude Code.

---

## Install

**Option A — Marketplace install (recommended):**

```bash
claude plugin marketplace add kartik-solvative/claude-skills
claude plugin install solvative-claude-skills@solvative
```

**Option B — Manual local install:**

```bash
git clone https://github.com/kartik-solvative/claude-skills.git /tmp/solvative-skills
cp -r /tmp/solvative-skills/plugins/solvative-claude-skills ~/.claude/plugins/local/
rm -rf /tmp/solvative-skills
```

Then restart Claude Code.

**Staying up to date (Option B):**

```bash
cd /tmp && git clone https://github.com/kartik-solvative/claude-skills.git solvative-skills && cp -r solvative-skills/plugins/solvative-claude-skills/* ~/.claude/plugins/local/solvative-claude-skills/ && rm -rf /tmp/solvative-skills
```

---

## Skills

| Skill | What it does | When Claude uses it |
|---|---|---|
| `solvative-create-deck` | Generates Solvative-branded PPTX presentations via 5-phase conversational flow | "create a presentation", "make slides", "build a deck", "create a PPTX" |
| `solvative-create-skill` | Guides authoring and submitting a new skill to this plugin | "create a new Solvative skill", "add a skill", "write a skill for Solvative" |
| `solvative-create-marketing-site` | Generates Hygraph-powered marketing sites with block-based CMS and scroll-storytelling | "create a marketing site", "build a marketing website", "create a landing page" |

---

## Usage

### Automatic invocation

Claude picks up skills based on what you ask. Just describe what you want:

> "Create a deck for our Q2 investor update"

> "Build a marketing site for the new product"

Claude will invoke the right skill automatically.

### Manual invocation

Use a slash command to explicitly trigger a skill:

```
/solvative-claude-skills:solvative-create-deck
/solvative-claude-skills:solvative-create-skill
/solvative-claude-skills:solvative-create-marketing-site
```

### How skills work

Skills are instructions that Claude follows step-by-step. When a skill is invoked:

1. Claude reads the skill's `SKILL.md` — a structured guide with phases, rules, and Solvative-specific conventions
2. Claude follows the defined process (asking questions, researching, generating output)
3. You interact at defined checkpoints — approving outlines, requesting changes, iterating

Skills are **not one-shot prompts** — they define a full workflow with human-in-the-loop steps.

---

## Contributing

### Fastest path: use the meta-skill

Inside Claude Code, run:

```
/solvative-claude-skills:solvative-create-skill
```

Claude will ask you questions one at a time and write the skill for you, then handle the version bump and commit.

### Manual path

**1. Name your skill** using the `solvative-<verb>-<noun>` convention:

```
solvative-create-deck      ✓
solvative-review-pr        ✓
solvative-setup-storyblok  ✓
solvative-presentation     ✗  (missing verb, too generic)
create-deck                ✗  (missing solvative- prefix)
```

**2. Create the skill directory:**

```bash
mkdir -p skills/solvative-<verb>-<noun>
```

**3. Write `skills/solvative-<verb>-<noun>/SKILL.md`** using this template:

```markdown
---
name: solvative-<verb>-<noun>
description: This skill should be used when the user asks to "<trigger 1>", "<trigger 2>", "<trigger 3>", "<trigger 4>", or <natural language summary>. It <one sentence on what it does>.
version: 1.0.0
---

# <Human-Readable Title>

<One paragraph describing what this skill does and when to use it.>

---

## Quick Reference

- **Output:** <what the skill produces>
- **Key conventions:** <any Solvative-specific rules>

---

## Process

<Numbered phases with clear headings. Each phase has explicit steps.>
```

**4. Bump versions** — update `version` in `plugin.yaml` and `.claude-plugin/plugin.json` (minor bump: `1.1.0` → `1.2.0`).

**5. Update `CHANGELOG.md`** — add an entry at the top:

```markdown
## [1.2.0] - YYYY-MM-DD
### Added
- `solvative-<verb>-<noun>` skill — one-line description
```

**6. Commit, tag, push:**

```bash
git add skills/solvative-<verb>-<noun>/SKILL.md plugin.yaml .claude-plugin/ CHANGELOG.md README.md
git commit -m "feat: add solvative-<verb>-<noun> skill"
git tag v1.2.0
git push origin main --tags
```

### Skill quality standards

Before submitting, verify:

- [ ] Name follows `solvative-<verb>-<noun>` — lowercase, hyphen-separated, verb first
- [ ] `description` frontmatter has **4+ distinct trigger phrases** covering different ways a user might ask
- [ ] Process is written as **numbered phases** with explicit steps — not vague prose
- [ ] Any Solvative brand/convention details are **explicit and complete** (colors, fonts, file naming, output format)
- [ ] Skill has a **Quick Reference** section at the top for at-a-glance use
- [ ] Version bumped in `plugin.yaml` and `.claude-plugin/plugin.json`
- [ ] `CHANGELOG.md` updated
- [ ] README skills table updated

### What makes a good skill

**Good trigger phrases** — cover the range of ways a user might ask, not just the obvious one:

```yaml
# Too narrow
description: Use when user says "create a deck"

# Good
description: Use when user asks to "create a presentation", "make slides",
  "build a deck", "create a PPTX", "generate a presentation", or wants to
  produce a Solvative-branded deck for a client or internal audience.
```

**Good process sections** — numbered phases, explicit steps, not hand-wavy:

```markdown
# Bad
## Process
Ask the user what they want and generate it.

# Good
## Process

### Phase 1: Gather requirements
Ask the user (one question at a time):
1. Who is the audience?
2. What is the goal of the presentation?
3. How many slides?

### Phase 2: Research
Use WebSearch to gather supporting data for each slide topic...
```

**Capture Solvative conventions explicitly** — don't assume Claude knows:

```markdown
## Brand Rules
- Font: Montserrat (all weights)
- Primary: #002125 (dark teal), #006D77 (teal), #FFC400 (yellow)
- Output: YYYY-MM-DD-<name>.pptx in the current working directory
```

---

## Versioning

This plugin uses [Semantic Versioning](https://semver.org/). Two files must stay in sync: `plugin.yaml` and `.claude-plugin/plugin.json`.

| Change | Bump | Example |
|---|---|---|
| Fix or improve an existing skill | patch | `1.1.0` → `1.1.1` |
| Add a new skill | minor | `1.1.0` → `1.2.0` |
| Rename or remove a skill | major | `1.1.0` → `2.0.0` |

See [CHANGELOG.md](CHANGELOG.md) for full version history.

---

## Repo structure

```
solvative-claude-skills/
├── .claude-plugin/
│   ├── plugin.json          ← plugin manifest (Claude Code reads this)
│   └── marketplace.json     ← marketplace manifest
├── plugin.yaml              ← human-readable version reference
├── README.md
├── CHANGELOG.md
├── skills/
│   ├── solvative-create-deck/
│   │   └── SKILL.md
│   ├── solvative-create-skill/
│   │   └── SKILL.md
│   └── solvative-create-marketing-site/
│       └── SKILL.md
└── docs/
    ├── contributing.md      ← detailed contribution guide
    └── plans/               ← design and implementation docs
```
