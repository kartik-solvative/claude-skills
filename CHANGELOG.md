# Changelog

All notable changes to the `solvative-claude-skills` plugin are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/):
- **patch** (1.0.x) — fix or improve an existing skill
- **minor** (1.x.0) — add a new skill
- **major** (x.0.0) — rename/remove a skill or change invocation

---

## [1.5.1] - 2026-03-23

### Changed
- `solvative-architect-qa-ecosystem`: Phase 6 is now stack-agnostic — Claude asks the user for a delivery destination (markdown file, test management system, inline, or skip) instead of hardcoding TestDino

---

## [1.5.0] - 2026-03-23

### Added
- `solvative-architect-qa-ecosystem` skill — orchestrates a fully autonomous, multi-agent AI QA pipeline from feature analysis through Playwright test generation, quality gating (No Exceptions policy), 5-cycle self-healing execution, and TestDino documentation sync. Includes 6 sequential phase agents (Discovery Specialist, QA Strategist, Test Developer, Quality Guardian, Self-Correction Engine, Documentation Specialist) plus an Independent Auditor for GitHub PR review mode.

---

## [1.4.0] - 2026-03-10

### Added
- `solvative-create-project-charter` skill — generates Solvative-branded editable Project Charter (.docx) documents via a 5-phase workflow (interview → review → generate → deliver → iterate). Covers all 7 standard sections (A–G: General Information, Objective, Scope, Milestones, Roles & Responsibilities, Client Contacts, Resource Links) plus a Document History table. Styled with teal table headers, yellow section accents, Solvative logo cover, and confidential footer. Reuses SOW skill's docx-js patterns and logo asset.

---

## [1.3.0] - 2026-03-09

### Added
- `solvative-create-sow` skill — generates Solvative-branded Statement of Work (.docx) documents via a 6-phase conversational workflow (interview → research → structure → review → generate → iterate). Includes complete docx-js template with brand colors, logo, cover page, EPIC-based scope tables, sprint plan with EPIC sub-headers, Gantt chart, resource allocation, pricing with discount framing, and signature block. Bundled assets include the official Solvative logo and a reference template.

---

## [1.2.0] - 2026-03-07

### Changed
- `solvative-create-deck`: Updated brand constants — font changed from Montserrat to **Poppins** (official brand font per Brand Identity document); added `PRIMARY = #015C65` teal; updated `TEAL_LIGHT` to `#EEF4F5` (brand-accurate); updated `add_logo_solvative_dark/light` helpers to use the official Solvative logo SVG (fetched from solvative.com) inside a rounded-rectangle pill on dark slides
- Updated `CLAUDE.md` brand system constants to match official Brand Identity PDF (Poppins, #015C65, #EEF4F5)

---

## [1.1.0] - 2026-03-07

### Added
- `solvative-create-marketing-site` skill — generates UI-demo-first, block-based CMS marketing sites powered by Hygraph with scroll-storytelling and modern immersive design

### Fixed
- Added `.claude-plugin/marketplace.json` so the plugin is installable via `claude plugin marketplace add`
- Added `version` field to `.claude-plugin/plugin.json`
- Made repository public
- Added `.gitignore`

---

## [1.0.0] - 2026-03-05

### Added
- `solvative-create-deck` skill — generates Solvative-branded PPTX presentations via conversational questioning, research, outline approval, and a 20-slide template library
- `solvative-create-skill` skill — meta-skill that guides authoring and submitting new skills to this plugin
