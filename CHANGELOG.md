# Changelog

All notable changes to the `solvative-claude-skills` plugin are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/):
- **patch** (1.0.x) — fix or improve an existing skill
- **minor** (1.x.0) — add a new skill
- **major** (x.0.0) — rename/remove a skill or change invocation

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
