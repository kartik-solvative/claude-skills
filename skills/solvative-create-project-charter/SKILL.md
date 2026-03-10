---
name: solvative-create-project-charter
description: This skill should be used when the user asks to "create a project charter", "generate a charter", "write a project charter", "draft a project charter for a client", or wants to produce a Solvative-branded Project Charter document for any engagement. Also trigger when the user mentions "charter document", "project charter template", or wants to formally document project scope, milestones, and team for a new engagement. It guides the user through a conversational interview, presents a structure for review, and generates a polished Solvative-branded editable .docx Project Charter.
version: 1.0.0
---

# Create Solvative Project Charter

This skill generates a Solvative-branded, editable Project Charter `.docx` document.

It follows a five-phase process: **interview → review → generate → deliver → iterate**.

The output includes a cover page with the Solvative logo, Document History table, and all seven standard sections (A–G) covering general info, objective, scope, milestones, team roles, client contacts, and resource links — styled with teal table headers, yellow section accents, and a confidential footer.

---

## Quick Reference

- **Output:** `ProjectCharter-<ProjectTitle>.docx` in `/mnt/user-data/outputs/`
- **Page size:** US Letter (8.5" × 11"), 1" margins
- **Font:** Arial throughout
- **Tool:** `npm install -g docx` (docx-js for Node.js)
- **Logo:** `/mnt/skills/organization/create-solvative-sow/assets/solvative-logo.png`
- **Brand skill:** Always also read `/mnt/skills/user/apply-solvative-brand/SKILL.md` for voice and tone
- **Docx skill:** Always also read `/mnt/skills/public/docx/SKILL.md` for docx-js best practices
- **Reference template:** `/mnt/skills/organization/create-solvative-sow/assets/sow-template.js` (copy patterns, adapt for charter)
- **Iteration:** Unlimited — request changes and Claude regenerates

---

## Process

### Phase 1: Interview

Before asking questions, check for existing context:
- **Uploaded documents** (existing charter draft, SOW, meeting notes) → extract details, then confirm
- **Meeting transcript** → extract scope, team, milestones first, then ask for gaps only
- **Previous conversation context** → reuse any project details already shared

If context exists: "Based on what you've shared, here's what I've gathered — let me confirm a few details."

Ask **one or two questions at a time**, not a full checklist. Gather all of the following:

**General Information:**
- Project title
- Short description (1–2 sentences summarizing the engagement)
- Prepared by (name of the PM or author)
- Document date
- Starting version (default: 1.0)

**Project Objective:**
- What is the full objective? (What will be built, for whom, and why?)
- What does success look like?

**Project Scope:**
- What systems, sites, or platforms are in scope?
- What specific features, configurations, or deliverables are included?
- Anything explicitly out of scope worth noting? (optional)

**Project Milestones:**
- Project start date
- Key milestone names and target dates (e.g., Initial Testing, UAT, Release Ready, Go-Live)

**Roles and Responsibilities (Solvative Team):**
- For each team member: Name, Role, Contact Email

**Client Point of Contact:**
- Primary contact: Name, Role, Email
- Secondary contact: Name, Role, Email (optional — leave blank if none)

**Resource Links:**
- SOW document link
- Project kickoff presentation link
- JIRA board link and Epic name/ID
- Status update notebook link
- Any other relevant resource links

**Interview Tips:**
- If the user provides a meeting transcript or existing doc, extract 80%+ of answers from it before asking
- If the user says "you have enough" or "just go", proceed immediately
- Don't ask for info you can infer — if they mention a specific JIRA epic, capture it directly

---

### Phase 2: Review

Present the gathered information in a compact, scannable summary for the user to approve before generating.

Show:
1. **General Info** — project title, prepared by, date, version
2. **Objective** — full paragraph draft (write it from the user's input, ready to use)
3. **Scope** — bulleted list of in-scope items + any out-of-scope notes
4. **Milestones** — simple table (Milestone | Date)
5. **Team** — table (Name | Role | Email)
6. **Client Contacts** — primary and secondary
7. **Resource Links** — list of all links with their labels

Say: "Here's the structure I'll use — let me know if anything needs to change before I generate the document."

Accept changes, update the summary, and re-confirm if needed. Only proceed to generation after the user approves.

---

### Phase 3: Generation

Once approved, generate the `.docx` using docx-js.

#### Setup

```bash
npm install -g docx
```

#### Required Reading Before Writing Code

Before writing any generation code, always read:
1. `/mnt/skills/public/docx/SKILL.md` — for docx-js patterns and API reference
2. `/mnt/skills/user/apply-solvative-brand/SKILL.md` — for brand voice and color values
3. `/mnt/skills/organization/create-solvative-sow/assets/sow-template.js` — **copy and adapt** helper functions, color constants, logo setup, header/footer patterns

#### Color Constants

```javascript
// All hex values without #
const TEAL        = "006D77";   // table headers, section accent borders
const DARK        = "001D23";   // cover title, section letter headings
const YELLOW      = "FFC400";   // thin accent rule below section headings
const INK         = "101828";   // bold label text in tables
const GRAY        = "344054";   // body text
const TEAL_LIGHT  = "E6F3F4";   // alternating/sub-header rows
const LIGHT_GRAY  = "F2F4F7";   // alternating body rows
const BORDER_GRAY = "D0D5DD";   // table borders
const WHITE       = "FFFFFF";
```

#### Page Setup

```javascript
// US Letter, 1" margins
// width: 12240, height: 15840 (DXA)
// Content width with 1" margins: 9360 DXA
// All table widths must use WidthType.DXA — never percentages
```

#### Document Structure

Generate sections in this exact order:

**1. Cover Page**
- Top-right block: Solvative logo (`transformation: { width: 220, height: 38 }`), address (9393 West 110th Street STE 500, Overland Park, KS 66210), phone (913.871.5154), email (contact@solvative.com), website (www.solvative.com)
- Centered bold title: **"Project Charter"** — large, dark (`DARK` color)
- Below title: italic line with project title + version (e.g., *Advanced Promotions Configuration | v1.0*)
- A horizontal rule separator
- Bottom metadata block: Prepared By, Date

**2. Page Header (all pages after cover)**
- Borderless two-column table: logo left (`transformation: { width: 75, height: 13 }`), "Project Charter | [Project Title]" right — both `VerticalAlign.CENTER`

**3. Page Footer (all pages)**
- Centered: `Confidential | Internal Use Only | © Solvative`

**4. Document History Table**
- Section heading: "Document History" (bold, `DARK` color, with thin `YELLOW` bottom border)
- 4 columns: Version | Date | Prepared By | Description
- Header row: `TEAL` background, white text
- First data row pre-populated with v1.0 data from the interview
- Column widths (DXA): 900 | 1500 | 2160 | 4800

**5. Section A — General Information**
- Heading: **"A.  General Information"** (bold, `DARK`, `YELLOW` accent rule below)
- 2-column table with italic left labels and content on the right
- Rows: Project Title | Description | Prepared By | Date + Version (Date in one cell, "Version:" label + value in remaining columns)
- Column widths (DXA): 2160 | 7200
- Borders: `BORDER_GRAY`, 1pt

**6. Section B — Project Objective**
- Heading: **"B.  Project Objective"** (same heading style)
- Indented narrative paragraph (body text, `GRAY` color)

**7. Section C — Project Scope**
- Heading: **"C.  Project Scope"**
- Intro paragraph
- Numbered list for target systems/sites
- Bulleted list for deliverables/features
- Optional: out-of-scope note as a separate paragraph in italic if provided

**8. Section D — Project Milestones**
- Heading: **"D.  Project Milestones"**
- Intro paragraph (e.g., "Below are the key milestones for this engagement.")
- 2-column table: Milestone | Target Date
- Header row: `TEAL` background, white text
- Alternating rows: `LIGHT_GRAY` / `WHITE`
- Column widths (DXA): 5460 | 3900

**9. Section E — Roles and Responsibilities**
- Heading: **"E.  Roles and Responsibilities"**
- 3-column table: Name | Role | Contact Email
- Header row: `TEAL` background, white text
- Alternating rows: `LIGHT_GRAY` / `WHITE`
- Column widths (DXA): 2340 | 2340 | 4680

**10. Section F — Client Point of Contact**
- Heading: **"F.  Client Point of Contact"**
- 3-column table: Name | Role | Contact Email
- Header row: `TEAL` background, white text
- Two data rows: Primary Contact, Secondary Contact (leave name/email blank if not provided)
- Column widths (DXA): 2340 | 2340 | 4680

**11. Section G — Resource Links**
- Heading: **"G.  Resource Links"**
- 2-column table: Resource | Link
- Header row: `TEAL` background, white text
- One row per link provided
- Links as plain text (Word will auto-hyperlink URLs)
- Column widths (DXA): 2700 | 6660

#### Key Implementation Rules (from SOW skill)

1. **Logo:** Always use the logo at `assets/solvative-logo.png` — type `"jpg"` (JPEG despite the .png name)
2. **Tables:** Use `WidthType.DXA` everywhere. Set both `columnWidths` on the table AND `width` on each cell. Use `ShadingType.CLEAR` for all shading.
3. **Section headings:** Use a paragraph with bold `DARK` text + a bottom border in `YELLOW` (2pt) to create the accent line effect.
4. **Header layout:** Borderless table — logo in left cell, text in right cell, both `VerticalAlign.CENTER`. No visible borders.
5. **Table borders:** All data tables use `BORDER_GRAY` 1pt borders on all sides.
6. **Body text:** `GRAY` (`344054`) color, 10–11pt Arial, left-aligned.
7. **No "PMO" or "Project Management Office"** anywhere in the document.

---

### Phase 4: Deliver

After generating the file:
1. Validate: `python scripts/office/validate.py ProjectCharter-<ProjectTitle>.docx`
2. Copy to: `/mnt/user-data/outputs/`
3. Present the `.docx` file to the user — no PDF conversion needed (user wants an editable file)

---

### Phase 5: Iterate

After delivering, remain in the conversation and accept any changes:
- **"Update the objective"** → rewrite the B section paragraph
- **"Add a team member"** → add row to section E table
- **"Change a milestone date"** → update section D table
- **"Add another resource link"** → add row to section G table
- **"The client contact changed"** → update section F

Always regenerate the **entire file** — never try to patch XML in-place.
After each iteration, validate and re-deliver.

---

## Document Sections Reference

| # | Section | Notes |
|---|---|---|
| — | Cover Page | Solvative logo, project title, version, prepared by, date |
| — | Document History | Version table: Version, Date, Prepared By, Description |
| A | General Information | Metadata table |
| B | Project Objective | 1–2 paragraph narrative |
| C | Project Scope | Intro + numbered/bulleted list |
| D | Project Milestones | Intro text + milestone table |
| E | Roles and Responsibilities | Solvative team table |
| F | Client Point of Contact | Client contacts table |
| G | Resource Links | Links table |

---

## Voice and Tone

- Professional and concise — this is an internal/external project document
- Objective section should be written from a project delivery perspective — what will be built, for whom, and the business value it delivers
- Avoid marketing language; stay factual and precise
- No emoji in the document
