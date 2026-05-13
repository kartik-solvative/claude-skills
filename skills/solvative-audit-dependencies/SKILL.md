---
name: solvative-audit-dependencies
description: This skill should be used when the user asks to "check vulnerabilities", "audit dependencies", "security scan", "run npm audit", "find CVEs in node_modules", or wants to generate a vulnerability report for a Node.js/npm-ecosystem project. It auto-detects the package manager, runs the correct audit command, groups findings by severity, and delivers a clear summary with recommended remediation steps.
version: 1.0.0
---

# Dependency Security Audit

Automatically detect the package manager, run the correct audit command, group vulnerabilities by severity, and deliver a clear summary with recommended remediation steps for any Node.js or npm-ecosystem project.

---

## Quick Reference

| Severity | Action |
|---|---|
| **Critical** | Fix immediately — active exploit risk |
| **High** | Fix this sprint |
| **Moderate** | Fix within 30 days |
| **Low** | Fix at next opportunity |
| **Info** | No direct exploit — review when convenient |

---

## Process

### Phase 1 — Detect Package Manager

Check for lock files in the project root in this order:

| Lock File | Package Manager |
|---|---|
| `bun.lockb` | bun |
| `pnpm-lock.yaml` | pnpm |
| `yarn.lock` | yarn (check version next) |
| `package-lock.json` or `npm-shrinkwrap.json` | npm |

If no lock file exists, check the `packageManager` field in `package.json`. Fallback: `npm`.

For yarn, detect major version:
```bash
yarn --version   # 1.x → yarn v1 | 2.x+ → yarn berry
```

### Phase 2 — Run Audit

If `node_modules` is missing, install dependencies first:
```bash
<pm> install --frozen-lockfile
```

Run the audit command for the detected package manager:

| Package Manager | Command |
|---|---|
| npm | `npm audit --json 2>&1 \|\| true` |
| pnpm | `pnpm audit --json 2>&1 \|\| true` |
| yarn v1 | `yarn audit --json 2>&1 \|\| true` |
| yarn berry | `yarn npm audit --all --json 2>&1 \|\| true` |
| bun | `bun audit 2>&1 \|\| true` (text output — no JSON flag) |

The `|| true` prevents non-zero exit code from halting execution when vulnerabilities are found.

### Phase 3 — Parse and Group Results

From the output, extract each vulnerability and group by severity: **Critical → High → Moderate → Low → Info**.

For each vulnerability, capture:
- Package name and affected version range
- CVE identifier (if available)
- Whether an auto-fix is available (`fixAvailable` in npm/pnpm JSON)
- Recommended safe version

### Phase 4 — Report to User

Present a concise report:

1. **Totals by severity** — e.g. "3 Critical · 5 High · 12 Moderate · 4 Low"
2. **Auto-fixable** — list packages resolvable via `<pm> audit fix`, then offer to run it
3. **Manual upgrades required** — list package name, current version → safe version, with the exact install command
4. **Active exploits** — prominently flag any CVEs with known active exploits
5. **Next command** — give one clear copy-paste command for the highest-impact fix
