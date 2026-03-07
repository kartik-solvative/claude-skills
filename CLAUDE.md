# CLAUDE.md — solvative-claude-skills

Project-level instructions for Claude Code when working in this repository.

---

## Project Overview

This is a **Claude Code plugin** repository — not a web application. There are no React components, CSS frameworks, or build systems. The repo contains **skills**: markdown instruction files that Claude follows when users invoke specific workflows.

---

## Repository Structure

```
solvative-claude-skills/
├── .claude-plugin/
│   └── plugin.json          ← plugin manifest (Claude Code reads this)
├── plugin.yaml              ← human-readable version reference (keep in sync with plugin.json)
├── README.md
├── CHANGELOG.md
├── skills/
│   └── solvative-<verb>-<noun>/
│       └── SKILL.md         ← the only file in each skill directory
└── docs/
    └── plans/               ← design and implementation docs (do not modify without reason)
```

---

## Skill Conventions

### Naming

- All skills must follow `solvative-<verb>-<noun>` — lowercase, hyphen-separated, verb first
- Examples: `solvative-create-deck`, `solvative-review-pr`, `solvative-setup-storyblok`
- Prefix `solvative-` is mandatory — never omit it

### SKILL.md Structure

Every skill must have this exact frontmatter:

```markdown
---
name: solvative-<verb>-<noun>
description: This skill should be used when the user asks to "<trigger 1>", "<trigger 2>", "<trigger 3>", "<trigger 4>", or <natural language summary>. It <one sentence on what it does>.
version: 1.0.0
---
```

- `description` must have **4+ distinct trigger phrases** covering different ways a user might phrase the request
- After frontmatter: a `# Title`, one-paragraph description, `## Quick Reference`, then `## Process`
- Process must be **numbered phases** with clear headings — not vague prose

### Versioning

Two files must always stay in sync: `plugin.yaml` and `.claude-plugin/plugin.json`

| Change | Bump |
|---|---|
| Fix or improve an existing skill | patch (`1.1.0` → `1.1.1`) |
| Add a new skill | minor (`1.1.0` → `1.2.0`) |
| Rename or remove a skill | major (`1.1.0` → `2.0.0`) |

Always update `CHANGELOG.md` with a new entry at the top when bumping versions.

---

## Solvative Brand System

These values are canonical and must be used exactly — never approximate or substitute.

### Colors

Sourced from the official Solvative Brand Identity document and live website (solvative.com).

| Token | Hex |
|---|---|
| Dark teal (primary background) | `#002125` |
| Primary teal | `#015C65` |
| Teal accent | `#006D77` |
| Yellow (highlight/CTA) | `#FFC400` |
| White | `#FFFFFF` |
| Dark text | `#101828` |
| Light teal bg | `#EEF4F5` |

### Typography

- **Primary font:** Poppins (all weights) — official brand font per Brand Identity document
- Used in both PPTX output and generated HTML/CSS marketing sites
- IMPORTANT: Never substitute with another font family

### PPTX Design Constants

When working with the `solvative-create-deck` skill or generating Python-pptx scripts, use these exact constants:

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# Slide dimensions: 13.333" × 7.5" (16:9 widescreen)
SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

# Color palette (sourced from Brand Identity PDF + solvative.com)
COLOR_DARK_TEAL  = RGBColor(0x00, 0x21, 0x25)  # #002125 — dark backgrounds
COLOR_PRIMARY    = RGBColor(0x01, 0x5C, 0x65)  # #015C65 — primary brand teal
COLOR_TEAL       = RGBColor(0x00, 0x6D, 0x77)  # #006D77 — teal accent
COLOR_YELLOW     = RGBColor(0xFF, 0xC4, 0x00)  # #FFC400 — yellow CTA
COLOR_WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
COLOR_TEXT_DARK  = RGBColor(0x10, 0x18, 0x28)  # #101828 — body text
COLOR_LIGHT_BG   = RGBColor(0xEE, 0xF4, 0xF5)  # #EEF4F5 — card backgrounds

FONT_NAME = "Poppins"
```

IMPORTANT: Never change these color values or the font name when generating PPTX scripts.

---

## Figma MCP Integration Rules

These rules apply whenever implementing or updating any generated HTML/CSS output within skills (e.g., marketing site demos, UI mockups, animated components).

### Required Flow (do not skip)

1. Run `get_design_context` first to fetch the structured representation for the exact node(s)
2. If the response is too large or truncated, run `get_metadata` to get the high-level node map, then re-fetch only the required node(s) with `get_design_context`
3. Run `get_screenshot` for a visual reference of the node variant being implemented
4. Only after you have both `get_design_context` and `get_screenshot`, download any assets needed and start implementation
5. Translate the output into this project's conventions: Solvative brand colors, Poppins font, inline CSS or `<style>` blocks
6. Validate against Figma for 1:1 look and behavior before marking complete

### Implementation Rules

- Treat Figma MCP output (React + Tailwind) as a design reference — translate it to the skill's target output format (plain HTML/CSS/JS, Python-pptx, etc.)
- IMPORTANT: Always substitute Tailwind/hex colors with the Solvative palette values above
- IMPORTANT: Always substitute font references with Poppins
- Do not introduce external CSS frameworks (Tailwind, Bootstrap) into skill-generated HTML unless the skill explicitly requires it
- Reuse animated UI patterns from existing skill templates before creating new ones
- Strive for 1:1 visual parity with the Figma design

### Asset Handling

- IMPORTANT: If the Figma MCP server returns a localhost source for an image or SVG, use that source directly
- IMPORTANT: Do NOT add new icon packages or CDN icon libraries — use inline SVG or Figma-provided assets
- IMPORTANT: Do NOT use placeholders if a localhost source is provided
- Store any downloaded static assets alongside the skill file or in `docs/` if they are documentation assets

---

## Marketing Site Design Rules

When implementing or modifying the `solvative-create-marketing-site` skill or its generated output:

### Layout Principles

- Hero sections are always **full-width vertical stacks** — never two-column side-by-side
- Structure: headline → subheadline → CTAs → full-width animated product showcase
- Every section must have a live, animated UI component demonstrating the product feature
- 80% of communication happens through the animated UI; 20% through headline + one-liner

### Animation

- Animations must auto-play and loop
- Entry animations trigger on viewport intersection (IntersectionObserver)
- No decorative animations — every animation demonstrates a real product behavior

### Copy Rules

- IMPORTANT: All copy must be customer-first — never use technology stack names, architecture jargon, or internal terms
- IMPORTANT: Every sentence must answer "What does this do FOR ME?" from the customer's perspective

---

## What NOT to Do

- Do not create files outside of `skills/`, `docs/`, or root config files unless explicitly requested
- Do not add `node_modules/`, lock files, or build artifacts — this repo has no build system
- Do not modify `.git/` files
- Do not create additional `SKILL.md` files without following the full contribution process (version bump + changelog)
- Do not remove the `.claude-plugin/` directory or `marketplace.json` removal note from README
