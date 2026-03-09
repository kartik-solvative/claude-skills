---
name: create-solvative-sow
description: >
  Generate branded Solvative Statement of Work (SOW) documents as polished .docx files.
  Use this skill whenever a user asks to "create a SOW", "write a statement of work",
  "draft a proposal", "build a SOW", "prepare a scope document", or wants to produce
  a client-facing engagement document for any Solvative project. Also trigger when the
  user mentions "SOW", "scope of work", "project proposal", or references a client
  meeting transcript that needs to be turned into a formal engagement document.
  This skill handles the full end-to-end workflow: interviewing the user for project
  details, researching the client, structuring scope as EPICs and sprints, building
  Gantt timelines, and generating a Solvative-branded .docx with exact brand colors,
  logo, and design language. Always use this skill even if the user just says
  "write up the SOW" or "formalize this into a proposal."
---

# Create Solvative SOW

This skill generates polished Solvative-branded Statement of Work (.docx) documents.

It follows a six-phase process: **interview → research → structure → review → generate → iterate**.

All output uses Arial font, Solvative brand colors, and the exact document design system defined below — ensuring professional, consistent SOWs across the organization.

---

## Quick Reference

- **Output:** `SOW-<ProjectName>.docx` + PDF preview in outputs directory
- **Page size:** US Letter (8.5" × 11"), 1" margins
- **Font:** Arial throughout
- **Tool:** `npm install -g docx` (docx-js for Node.js)
- **Logo:** `/mnt/skills/organization/create-solvative-sow/assets/solvative-logo.png`
- **Brand skill:** Always also read `/mnt/skills/user/apply-solvative-brand/SKILL.md` for voice and tone
- **Docx skill:** Always also read `/mnt/skills/public/docx/SKILL.md` for docx-js best practices
- **Iteration:** Unlimited — request changes and Claude regenerates

---

## Phase 1: Interview

Conduct a conversational interview to gather all information needed. Ask questions **one or two at a time**, not as a long checklist. Use the `ask_user_input` tool for bounded choices.

### Context Check

Before asking anything, check if there is existing context available:

- **Meeting transcript** in the conversation or uploaded files → Extract details first, then confirm with user
- **Previous conversations** about this client → Search past chats
- **Uploaded documents** (RFPs, existing proposals, requirement docs) → Read and extract scope
- **Attio CRM data** → Search for the client record to get company details, contacts, deal history

If context exists, extract what you can and present it: "Based on the transcript, here's what I've gathered — let me confirm a few things."

### Required Information

Keep asking until you have all of these. Mark items as gathered from context vs. needing confirmation:

**Client & Contact:**

- Client company name and description
- Primary contact name and title
- Industry/vertical

**Project:**

- Project name / title
- Problem statement — what's broken, outdated, or needed?
- Proposed solution — what will Solvative build?
- Technology stack (frontend, backend, infrastructure)
- Key features / functional requirements (these become EPICs)

**Commercial:**

- Total investment amount
- Any discount? If so, what framing (first-engagement, volume, strategic, etc.)
- Payment schedule — how many milestones, what triggers each?
- Are there out-of-scope items to explicitly exclude?

**Timeline:**

- Desired start date
- Sprint cadence (default: 2-week sprints)
- Any hard deadlines or milestones?
- Include SolverCare post-launch support? If so, duration and complimentary or paid?

**Resources:**

- Team composition (roles, allocation: full-time/part-time, duration)

**Prerequisites:**

- What does the client need to provide before work begins?
- Any vendor dependencies or environment access needed?

**Logistics:**

- Proposal ID convention: `{Client}-{Project}-{YYYY}-{MM}-{DD}-{Seq}` (e.g., `AGIA-EAPlus-2026-03-09-001`)

### Interview Tips

- If the user provides a meeting transcript, extract 80%+ of answers from it before asking questions
- Use `ask_user_input` for choices like payment split ratios, tech stack, timeline preferences
- Don't ask what you can infer — if they say "rewrite from Angular to React", you know the tech stack
- If the user says "you have enough" or "just go", proceed immediately
- Always confirm the final investment amount and payment structure explicitly

---

## Phase 2: Research

Before structuring the SOW, gather additional context:

1. **Client research:** Web search for the company — industry, size, products, recent news. This enriches the Executive Summary.
2. **Technology research:** If the project involves specific tech (e.g., migrating from AngularJS), search for current version info, EOL dates, migration considerations. This adds credibility.
3. **Attio CRM:** Search for existing client records, deal history, past engagements.

Keep research light — 2-5 searches max. The goal is to write an Executive Summary that demonstrates Solvative understands the client's business, not to write a research paper.

---

## Phase 3: Structure

Organize the gathered information into the SOW structure. Present this to the user for approval before generating.

### Proposal ID

Use the convention: `{Client}-{Project}-{YYYY}-{MM}-{DD}-{Seq}`

Example: `AGIA-EAPlus-2026-03-09-001`

### EPICs

Break the project scope into EPICs (E1, E2, E3...). Each EPIC is a functional area:

```
E1 — Authentication & Navigation
E2 — Client Management
E3 — User Administration
...
```

Present as a table: EPIC ID | Name | Description

### Sprint Plan

Map EPICs to sprints. Each sprint section should:

- Have a heading with sprint name + date range
- Contain a table with EPIC sub-headers (light teal rows) grouping tasks

Always include these phases:

- Prerequisites / Kick-Off (1 week)
- Technical Discovery (1 week)
- Development Sprints (2 weeks each)
- UAT Sprint
- Production Deployment Sprint
- SolverCare (if applicable)

### Gantt Chart

Build a week-by-week visual timeline table. Use teal fills for active sprint weeks, yellow fills for SolverCare weeks.

### Present for Approval

Show the user:

1. Executive Summary draft (2-3 paragraphs)
2. EPICs table
3. Sprint plan outline (phases + date ranges)
4. Pricing breakdown (original, discount if any, final)
5. Payment schedule
6. Resource allocation
7. Out-of-scope items
8. Key assumptions

Wait for approval before generating. Accept changes and iterate.

---

## Phase 4: Review

After presenting the structure, the user may want changes. Common adjustments:

- Add/remove EPICs
- Adjust sprint assignments
- Change pricing or payment milestones
- Add/remove team members
- Modify timeline
- Adjust assumptions or out-of-scope items

Iterate on the structure until the user approves.

---

## Phase 5: Generation

Once approved, generate the .docx using the template system.

### Setup

```bash
npm install -g docx
```

### Read Required Skills

Before writing code, always read:

1. `/mnt/skills/public/docx/SKILL.md` — for docx-js patterns and validation
2. `/mnt/skills/user/apply-solvative-brand/SKILL.md` — for brand colors and voice
3. The template file: `/mnt/skills/organization/create-solvative-sow/assets/sow-template.js`

### Template Usage

The template file at `assets/sow-template.js` contains the complete document generation code from a reference SOW. **Copy and adapt it** for each new SOW — do not start from scratch. The template includes:

- Solvative brand color constants
- Reusable helper functions (headerCell, bodyCell, sectionHeading, etc.)
- Cover page layout with logo
- Header with logo + project name (table-based for vertical alignment)
- Footer with "Confidential | Solvative LLC"
- All section structures (Document History, Executive Summary, EPICs, Sprint Plan, Gantt, Resources, Prerequisites, Pricing, Payment, Out-of-Scope, Assumptions, Signatures)

### Key Design Rules

1. **Logo:** Always use the logo at `assets/solvative-logo.png` — type `"jpg"` (it's a JPEG despite the name)
   - Cover page: `transformation: { width: 220, height: 38 }`
   - Header: `transformation: { width: 75, height: 13 }` inside a borderless table for vertical alignment

2. **Colors** (hex without #):

   ```
   TEAL:        006D77   — accent, headings, EPIC headers
   TEAL_DK:     015C65   — EPIC sub-header text
   DARK:        001D23   — primary dark, section headings
   YELLOW:      FFC400   — SolverCare / attention (Gantt bars)
   INK:         101828   — near-black headlines
   GRAY:        344054   — body text
   MUTED:       4B5563   — secondary text
   TEAL_TINT:   E1F0F0   — total row backgrounds
   TEAL_LIGHT:  E6F3F4   — EPIC sub-header row backgrounds
   LIGHT_GRAY:  F2F4F7   — alternating row backgrounds
   BORDER_GRAY: D0D5DD   — table borders
   WHITE:       FFFFFF
   ```

3. **Tables:** Always use `WidthType.DXA`, never percentages. Set both `columnWidths` on table AND `width` on each cell. Use `ShadingType.CLEAR`.

4. **Page size:** US Letter — `width: 12240, height: 15840` DXA. Content width with 1" margins: `9360` DXA.

5. **No page numbers** in footer.

6. **Header layout:** Borderless table with logo in left cell, text in right cell, both `VerticalAlign.CENTER`.

7. **Sprint Plan tables:** One per sprint phase. EPIC names as `columnSpan: 2` sub-header rows with `TEAL_LIGHT` background.

8. **Gantt chart:** Use colored cell fills (teal for sprints, yellow for SolverCare). No text in cells, just the fill color.

9. **Pricing:** Show original price (strikethrough), discount line in teal, total row with `TEAL_TINT` background. Frame discount subtly as first-engagement/introductory unless told otherwise.

10. **Signature block:** Borderless two-column table — client on left, Solvative on right.

### After Generation

1. Validate: `python scripts/office/validate.py <file>.docx`
2. Convert to PDF: `python scripts/office/soffice.py --headless --convert-to pdf <file>.docx`
3. Copy both to `/mnt/user-data/outputs/`
4. Present files to user

---

## Phase 6: Iteration

After delivering the SOW, stay in the conversation and accept changes:

- **"Change the pricing to $X"** → Update pricing table, payment schedule, exec summary
- **"Add another sprint"** → Update sprint plan, Gantt, timeline text, resource durations
- **"Remove the discount line"** → Update pricing table
- **"Use a different payment split"** → Update payment schedule
- **"Add SolverCare"** → Add sprint, update Gantt with yellow bars, update timeline

Always regenerate the **entire file** — never try to patch XML in-place.

After each iteration, validate, convert to PDF, and present both files.

---

## Document Sections Reference

Every Solvative SOW includes these sections in this order:

| #   | Section                         | Notes                                                                                                   |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | Cover Page                      | Logo, title, metadata table (Prepared for, Prepared by, Proposal ID, Date, Version), CONFIDENTIAL label |
| 2   | Document History                | Version table                                                                                           |
| 3   | Executive Summary               | 2-3 tight paragraphs. Client context → problem → solution → timeline + investment                       |
| 4   | Scope of Work: EPICs            | Table: EPIC ID, Name, Description                                                                       |
| 5   | Sprint Plan                     | Subsection per sprint with EPIC-grouped task tables                                                     |
| 6   | Project Timeline                | Gantt chart table + start/end date text                                                                 |
| 7   | Resource Allocation             | Role, Allocation, Duration, Responsibilities                                                            |
| 8   | Prerequisites                   | Artifact table with what client must provide                                                            |
| 9   | Pricing and Payment             | Investment summary (with discount if applicable) + Payment schedule                                     |
| 10  | Out-of-Scope Work               | Bullet list of explicit exclusions                                                                      |
| 11  | Assumptions and Dependencies    | Numbered list including timeline protection clause                                                      |
| 12  | Project Approval and Acceptance | Two-column signature block                                                                              |

### Sections to move to MSA (NOT in SOW)

The following belong in the Master Service Agreement, not the SOW:

- Travel/lodging/meal reimbursement details
- Detailed cancellation terms
- Interest on late payments
- General liability clauses
- Detailed payment procedures

The SOW should reference the MSA: "This Statement of Work is governed by the Master Service Agreement (MSA) executed between [Client] and Solvative."

---

## Voice and Tone

Follow Solvative brand voice from the brand skill:

- Confident and direct, not arrogant
- Technically credible, no jargon
- Outcomes-focused
- Never use emoji in SOW documents
- Use professional, concise language throughout
