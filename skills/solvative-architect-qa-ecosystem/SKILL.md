---
name: solvative-architect-qa-ecosystem
description: This skill should be used when the user asks to "check the test coverage of this PR", "run a smoke test on the latest build", "audit this function for edge cases", "analyze this new feature for potential breaking changes", "review the code for performance bottlenecks", "setup AI QA", "build autonomous testing system", or wants to establish or operate a fully autonomous AI-driven QA pipeline. It orchestrates a multi-agent, self-healing QA ecosystem that takes a feature or codebase from initial analysis through Playwright test generation, quality gating, autonomous self-correction, and TestDino documentation with near-zero human oversight.
version: 1.0.0
---

# Solvative Autonomous AI QA Ecosystem

This skill architects and operates a fully autonomous, multi-agent QA ecosystem that independently navigates the software lifecycle — from feature analysis and code auditing to Playwright test generation, self-healing execution, and TestDino documentation. It is designed for near-zero human oversight across both OSS and Enterprise environments.

---

## Quick Reference

- **Output:** Feature Design Document (FDD), tiered test strategy, Playwright POM test suite, quality audit report, self-healed passing tests, TestDino sync
- **Stack:** Playwright (Page Object Model), TestDino (test management), GitHub PRs
- **Test priority tiers:** P0 (mission-critical), P1 (core functionality), P2 (edge cases)
- **Self-healing loop:** 5 iterative cycles before escalating
- **Key conventions:** Solvative brand colors and Poppins font in all documents/reports; strict "No Exceptions" quality gate

---

## Process

### Strategic Lead — Mission Control

Before engaging any phase agent, the Strategic Lead must:

1. **Classify the request** — determine whether it targets OSS or Enterprise functionality and route accordingly
2. **Identify the scope** — is this a PR review, a new feature, a smoke test, a full audit, or ecosystem setup?
3. **Select active phases** — not every request needs all 6 phases. Map the request type to required phases:

| Request Type | Active Phases |
|---|---|
| PR review / E2E audit | Independent Auditor only |
| New feature / breaking-change analysis | Phase 1 → 2 → 3 → 4 → 5 → 6 |
| Smoke test on existing build | Phase 3 → 4 → 5 → 6 |
| Edge-case audit of a function | Phase 1 → 2 → 4 |
| Full ecosystem setup | All phases + Independent Auditor |

4. **Confirm with the user** — present the selected phase plan and ask for approval before proceeding
5. **Gate each phase transition** — only advance to the next phase when the current phase has produced its required output

---

### Phase 1 — Discovery Specialist

**Goal:** Produce the Feature Design Document (FDD) — the blueprint for the entire testing cycle.

1. Introspect the provided source code, feature spec, or PR diff
2. Extract all `data-test`, `data-testid`, `aria-label`, and other stable selectors
3. Map user workflows end-to-end: entry points → state transitions → exit conditions
4. Identify latent edge cases: boundary values, race conditions, null states, permission variants
5. Document OSS vs Enterprise feature splits if applicable
6. **Output:** FDD containing:
   - Feature summary
   - Selector inventory (element name → selector string)
   - Workflow map (numbered happy paths + alternate flows)
   - Edge case register (description, risk level, reproduction steps)

---

### Phase 2 — QA Strategist

**Goal:** Transform the FDD into a rigorous, tiered testing hierarchy.

1. Ingest the FDD from Phase 1
2. Classify every workflow and edge case by priority:
   - **P0** — mission-critical paths; system is broken without these passing
   - **P1** — core functionality; key user journeys that must work
   - **P2** — edge cases, negative paths, and lower-risk scenarios
3. Define test execution order: P0 → P1 → P2
4. Estimate coverage ROI: flag which P2 cases are high-effort/low-value and mark as optional
5. **Output:** Test Strategy Document (TSD) — a structured list of test cases with priority, description, preconditions, and expected outcomes

---

### Phase 3 — Test Developer

**Goal:** Build a production-grade Playwright test suite using strict Page Object Model (POM).

1. Ingest the TSD from Phase 2 and the selector inventory from the FDD
2. Create one Page Object class per UI component or page — never inline selectors in test files
3. Use **only** verified selectors from the FDD — never guess or invent selectors
4. Structure:
   ```
   /tests
     /pages          ← Page Object classes
     /specs          ← Test files (import from /pages only)
     /fixtures       ← Shared test data and setup hooks
   ```
5. Follow Playwright best practices:
   - All interactions must be `await`ed
   - Use `expect(locator).toBeVisible()` over existence checks
   - Parameterize test data — no hardcoded values in specs
   - Each test must be independently runnable (no shared mutable state)
6. **Output:** Complete Playwright test suite ready for Phase 4 audit

---

### Phase 4 — Quality Guardian

**Goal:** Gate the test suite. Block the pipeline on any critical violation.

Audit the generated code for:

| Category | Checks |
|---|---|
| Framework violations | Missing `await`, incorrect Playwright API usage, wrong assertion style |
| Brittle locators | XPath, CSS nth-child, text-based locators without `data-test` backing |
| Anti-patterns | Shared state between tests, hardcoded timeouts (`page.waitForTimeout`), test interdependency |
| Security | Credentials or secrets in test files, unsafe eval patterns |
| POM compliance | Selectors outside Page Objects, business logic in spec files |

**Enforcement policy — No Exceptions:**
- **CRITICAL violations** → block pipeline, return to Phase 3 with specific remediation instructions
- **WARNING violations** → log and allow continuation, flag for Phase 6 documentation
- **PASS** → advance to Phase 5

**Output:** Quality Audit Report — categorized finding list with severity, file location, line number, and remediation guidance

---

### Phase 5 — Self-Correction Engine

**Goal:** Execute tests and autonomously repair all failures. Achieve a passing suite with no human intervention.

1. Execute the full Playwright suite
2. For each failing test, diagnose the root cause:
   - **Selector drift** — element selector has changed; re-introspect source and update POM
   - **Timing bug** — race condition or missing wait; add appropriate `waitFor` assertion
   - **State leak** — previous test left residual state; add teardown or isolate
   - **Environment issue** — flag for human escalation (do not consume healing cycles)
3. Apply fix and re-execute — repeat up to **5 cycles**
4. If a test still fails after 5 cycles:
   - Mark the test as `ESCALATE`
   - Document the failure pattern, all attempted fixes, and the suspected root cause
   - Notify the user with a clear summary before proceeding
5. **Output:** Stabilized, passing Playwright suite + Self-Healing Log (cycle-by-cycle repair history)

---

### Phase 6 — Documentation Specialist

**Goal:** Close the loop. Sync all artifacts to TestDino as the single source of truth.

1. Collect all outputs from Phases 1–5:
   - FDD, TSD, Quality Audit Report, Self-Healing Log, final test suite
2. Sync to **TestDino**:
   - Create or update test cases mapped to the feature
   - Attach the FDD and TSD as supporting documents
   - Log all Quality Guardian findings and their resolution status
   - Record self-healing cycle history against each test
   - Mark escalated tests with `NEEDS_HUMAN_REVIEW` status
3. Generate a stakeholder-ready **QA Summary Report**:
   - Formatted using Solvative brand colors (`#002125` background, `#FFC400` accents, Poppins font)
   - Sections: Coverage Summary, P0/P1/P2 pass rates, Critical Findings, Escalations, Recommendations
4. **Output:** TestDino updated, QA Summary Report delivered to user

---

### Independent Auditor — PR Review Mode

**Goal:** Review human-contributed E2E changes in GitHub PRs to the same standard as the Quality Guardian.

This agent operates **outside the standard pipeline** and is triggered independently when:
- A PR containing Playwright test changes is opened or updated
- The user asks to audit a specific PR or diff

Process:
1. Fetch the PR diff (E2E test files and Page Objects only)
2. Apply all Phase 4 Quality Guardian checks
3. Check for selector consistency against the existing POM inventory
4. Verify new tests follow P0/P1/P2 priority classification
5. **Output:** PR Audit Report — inline comments mapped to file + line number, overall pass/block verdict, and required changes before merge approval
