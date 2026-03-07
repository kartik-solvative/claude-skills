---
name: solvative-create-marketing-site
description: This skill should be used when the user wants to "create a marketing site", "build a marketing website", "generate a Solvative marketing page", "create a landing page", or wants to produce a UI-demo-first, block-based CMS marketing website powered by Hygraph with scroll-storytelling and modern immersive design.
version: 1.0.0
---

# Marketing Site Generator — Master Skill v5
## UI-Demo-First · Block-Based CMS · Hygraph-Powered · Scroll-Storytelling · Modern Immersive Design

---

## Skill Adoption

This skill can absorb additional runtime skills. If the user provides extra `.md` skill files at runtime, Claude reads them first and merges their instructions into this skill before proceeding. Additional skills override or extend any section of this skill they reference. Adoption is silent — Claude does not announce it, it simply behaves as if the merged instructions were always part of this skill.

---

## Core Philosophy — The Screen IS the Product Demo

> **The visitor must feel like they are watching the product work — not reading about it.**

This is the single non-negotiable design principle. Every section must make the visitor feel like a demo is happening live on their screen. The animated UI components ARE the primary content. Copy is the caption beneath the experience, not the experience itself.

**The Product-on-Screen Rule:**
Every section of every page must have a live, animated UI component that shows the product doing something real. Not an icon. Not a screenshot. Not a diagram. A working simulation of the actual feature — auto-playing, looping, precise.

**What "demo on screen" means:**
- A search feature → a search bar typing a query, results cascading in, relevance scores animating
- An AI feature → tokens streaming character by character, UI updating in real time
- A data pipeline → stages lighting up in sequence, progress bars advancing, status flipping
- A workflow feature → cards moving, status badges changing, connectors drawing between nodes
- An integration → a terminal typing a command, a JSON response streaming in, a success state

**The 80/20 Rule — UI carries the weight:**
- 80% of every section's communication happens through the animated UI component
- 20% is a tight headline + one-line description that names what the visitor just watched
- If removing the UI component leaves a section that still communicates — the UI component was not doing its job

**Hero Rule — Flat, Full-Width, Top-to-Bottom:**
> **Never design the hero as two columns side-by-side.** The hero is always full-width, structured as a vertical stack: headline row at top → subheadline → CTAs → then a large, full-width animated product showcase below spanning the entire container. The product UI demo is the floor of the hero, not the right half. This is how Framer.com, Railway.app, and Vercel design for single products — the demo takes up the full horizontal stage.

**Scroll Storytelling Rule:**
The site tells a sequential story. As the user scrolls, the product story unfolds step by step. Each section is a chapter. Entering the viewport triggers its animation. The visitor leaves each section having understood one specific thing the product does — demonstrated, not described.

**Animation is not decoration. The UI component is the section.**

---

## Customer-First Language Law — MANDATORY ON EVERY WORD

> **This is a marketing site. Visitors are potential customers — not developers, investors, or engineers. Every sentence must answer: "What does this do FOR ME?"**

This site exists to convince shoppers, store owners, and buyers that this product will help them — not to explain how it was built. The moment a visitor reads a technical sentence, they feel the product is not for them. That is a lost customer.

### What is PROHIBITED (never write this on any site):
- Technology stack names: "Built on Next.js, GraphQL, vector embeddings, Hygraph"
- Architecture descriptions: "Hybrid vector + knowledge graph AI architecture"
- Infrastructure claims: "Multi-region failover, 99.99% SLA"
- Internal jargon: "MCP-compatible API", "real-time webhook streaming", "semantic indexing pipeline"
- Feature-first statements: "Real-time event-driven product feed ingestion"

### What is REQUIRED (always write this):
- Outcome-first: "Your customers find exactly what they're looking for — instantly"
- Shopper perspective: "Feels like a personal shopping assistant, not a search bar"
- Proof through result: "47,000 products. Zero wrong results."
- Benefit framing: "No more lost sales from bad search. Every query leads somewhere."
- Empathy-first: "Even when a shopper isn't sure what they want, findable figures it out"

### The Reframe Test (run on every sentence before finalizing):
1. Remove all technology and company names from the sentence
2. Ask: "Does this still communicate value to a customer who has never heard of this product?"
3. If YES → keep it. If NO → rewrite it from the customer's perspective.

### Before / After Examples:

| ❌ Technical (Prohibited) | ✅ Customer-First (Required) |
|---|---|
| "Powered by hybrid vector + graph AI" | "Understands what shoppers mean, not just what they type" |
| "MCP-compatible API for LLM tool use" | "Works wherever your customers shop — website, app, or chat" |
| "Ingest raw product feeds and build semantic indexes" | "Your product catalog, searchable within minutes of connecting" |
| "Multi-modal embedding with category taxonomy" | "Finds the right gift even when the customer is not sure what they want" |
| "AI-driven relevance scoring pipeline" | "Every result feels personally chosen — not algorithmically ranked" |
| "Real-time inventory sync with webhook events" | "Your store's prices and stock are always up to date" |

### Demo Copy Must Be Customer-Facing Too:
- Demo query text must be written in the customer's own words: "birthday gift for a coffee lover" not "query: semantic category:beverage"
- Product names in demos must be real-sounding items shoppers would actually search for
- Status labels must use customer-language: "Found 3 perfect picks" not "Query returned 3 results"
- Stage names must reflect customer experience: "Your catalog is live" not "Indexing complete"

---

## Phase 0 — Mandatory: Skill Files, Design Language Research & Environment Setup

### Step 0.1 — Read Any Additional Skill Files First

If the user has attached additional `.md` skill files alongside this one, read all of them before doing anything else. Merge their instructions into the working context. Proceed with the merged ruleset.

---

### Step 0.2 — Design Language Auto-Selection (NO USER INPUT REQUIRED)

**Claude automatically selects the design language based on product type and audience. Do NOT ask the user to pick a design style — most users are not designers and this question creates confusion.**

Run these web searches to inform the decision:

```
Searches to run:
1. "best marketing website design 2025 award winning"
2. "[product_category] marketing site design 2025 best examples"
3. "[chosen_reference_site] design language analysis"
```

**Auto-select design language based on product type:**

```
B2B SaaS / Enterprise tools     → LINEAR / VERCEL AESTHETIC ("Dark Precision")
                                   Deep near-black backgrounds, razor-thin borders,
                                   floating cards with subtle glow, mono accents.
                                   Reference: linear.app, vercel.com

Developer tools / APIs          → STRIPE / RESEND AESTHETIC ("Light Authority")
                                   White-dominant, strong typographic hierarchy,
                                   gradient mesh hero, clean card grids.
                                   Reference: stripe.com, resend.com

Consumer apps / marketplaces    → LOOM / NOTION AESTHETIC ("Warm Modern")
                                   Off-white canvas, warm neutrals, bold rounded
                                   typography, playful hover states.
                                   Reference: loom.com, notion.so

Creative / Design / Media       → CRAFT / BASEMENT AESTHETIC ("Editorial Bold")
                                   Large experimental typography, mixed grid layouts,
                                   one vivid signal color, asymmetric sections.
                                   Reference: basement.studio, craft.do

Mobile / Consumer / Lifestyle   → RAYCAST / ARC AESTHETIC ("Gradient Immersive")
                                   Rich gradient backgrounds, frosted glass cards,
                                   strong product-screenshot hero.
                                   Reference: raycast.com, arc.net

Interactive product demos       → FRAMER / WEBFLOW AESTHETIC ("Interactive Showcase")
                                   Product IS the hero — large animated UI demo,
                                   sections are self-contained interactive demos.
                                   Reference: framer.com, webflow.com
```

**Announce the selection to the user in one short sentence** (e.g., "I'll use a dark, precision-focused aesthetic similar to Linear — well-suited for B2B SaaS.") and continue immediately. Do not ask for approval.

**Claude applies the selected design language as a binding constraint across ALL phases.** Every color decision, spacing choice, animation style, and component shape must be consistent with the chosen reference system.

---

### Step 0.3 — Color Palette Input (MANDATORY BEFORE CREDENTIALS)

**Always ask the user for color direction before proceeding. Never assume.**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 COLOR PALETTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do you have a brand color? If yes, provide:
  • Primary brand hex (e.g. #5B3DF5)
  • Any secondary hex (optional)
  • Preference: dark-dominant, light-dominant, or balanced?

If you have no brand colors yet, type "default" and I will:
  1. Research the most effective color palette for your product
     category and chosen design language
  2. Generate a full three-token palette with rationale
  3. Show you the palette for approval before building

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**If the user answers "default" or provides no color:**
Use the built-in warm-earth palette below. No research needed — apply it immediately.

```
DEFAULT PALETTE — Warm Earth (light-dominant)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tea-green   50:#f4f6ee  100:#eaeedd  200:#d5dcbc  300:#c0cb9a
            400:#aaba78  500:#95a857  600:#778745  700:#5a6534
            800:#3c4323  900:#1e2211  950:#15180c

beige       50:#f7f9ec  100:#eff2d9  200:#e0e6b3  300:#d0d98c
            400:#c0cc66  500:#b0bf40  600:#8d9933  700:#6a7326
            800:#474d19  900:#23260d  950:#191b09

cornsilk    50:#fefbe6  100:#fdf7ce  200:#fcef9c  300:#fae76b
            400:#f9df39  500:#f7d708  600:#c6ac06  700:#948105
            800:#635603  900:#312b02  950:#231e01

papaya-whip 50:#fdf7e8  100:#faefd1  200:#f6dea2  300:#f1ce74
            400:#edbd45  500:#e8ad17  600:#ba8a12  700:#8b680e
            800:#5d4509  900:#2e2305  950:#201803

light-bronze 50:#f9f2eb  100:#f3e6d8  200:#e7ccb1  300:#dbb38a
             400:#cf9963  500:#c3803c  600:#9c6630  700:#754d24
             800:#4e3318  900:#271a0c  950:#1b1208

TOKEN MAPPING (light-dominant):
  canvas-base:    beige-50    (#f7f9ec)
  canvas-subtle:  beige-100   (#eff2d9)
  canvas-tinted:  tea-green-50 (#f4f6ee)
  canvas-inverse: tea-green-900 (#1e2211)

  ink-primary:    tea-green-950 (#15180c)
  ink-secondary:  tea-green-700 (#5a6534) @ 80% opacity
  ink-tertiary:   tea-green-600 (#778745) @ 60% opacity
  ink-inverse:    beige-50     (#f7f9ec)
  ink-inverse-2:  beige-200    (#e0e6b3)

  signal-primary: tea-green-500 (#95a857)
  signal-hover:   tea-green-600 (#778745)
  signal-light:   tea-green-100 (#eaeedd)
  signal-secondary: papaya-whip-500 (#e8ad17)

  border-subtle:  tea-green-200 (#d5dcbc) @ 60% opacity
  border-strong:  tea-green-400 (#aaba78)

ACCENT PALETTE (for charts, tags, match bars):
  accent-yellow:  cornsilk-500    (#f7d708)
  accent-amber:   papaya-whip-400 (#edbd45)
  accent-bronze:  light-bronze-500 (#c3803c)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Show this palette to the user for confirmation before building, then proceed.

---

### Step 0.4 — Hygraph Environment Setup (SIMPLIFIED — Two Keys Only)

**Hygraph connection requires only TWO values: the Content API Endpoint URL and a permanent auth token. Collect these before any schema or code work.**

**Display this to the user:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 HYGRAPH SETUP — 2 VALUES NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I need 2 values from your Hygraph project:

① Content API Endpoint URL
   Hygraph Dashboard → Settings → API Access → Endpoints
   → Copy the "Content API" URL
   Example: https://api-eu-west-2.hygraph.com/v2/clxxxxx/master

② Permanent Auth Token (EDITOR or OWNER role)
   Hygraph Dashboard → Settings → API Access → Permanent Auth Tokens
   → Create or reuse a token with EDITOR or OWNER role
   → Copy the token value

Paste both values here and I will test the connection immediately
before doing any other work.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Additional .env variables (auto-derived from the two keys above):**

```bash
# .env.local  (NEVER commit — add to .gitignore)
NEXT_PUBLIC_HYGRAPH_ENDPOINT=<CONTENT_API_ENDPOINT>
NEXT_PUBLIC_HYGRAPH_TOKEN=<VIEWER_TOKEN — see note below>
HYGRAPH_MUTATION_TOKEN=<FULL_TOKEN — server-side only>
```

```bash
# .env.example  (ALWAYS commit)
NEXT_PUBLIC_HYGRAPH_ENDPOINT=
NEXT_PUBLIC_HYGRAPH_TOKEN=
HYGRAPH_MUTATION_TOKEN=
```

> **Note:** The token provided is the full-access token used for schema work and mutations (`HYGRAPH_MUTATION_TOKEN`). For the frontend read-only token (`NEXT_PUBLIC_HYGRAPH_TOKEN`), ask the user to create a separate VIEWER-role token after schema setup is complete — or reuse the same token temporarily and downgrade it later. Never expose the full token in client-side code.

---

### Step 0.5 — MANDATORY: Test Hygraph Connection Before Any Further Work

**This step is a hard gate. Zero schema work, zero code generation, zero content seeding until the connection test passes.**

#### Connection Test Sequence

**Test 1 — Ping (runs immediately after credentials are provided):**

```graphql
query Ping { __schema { types { name } } }
```

Send this via HTTP POST to the endpoint with the token in the Authorization header. Do not use the MCP server for this first test — call it directly to isolate whether the issue is the endpoint/token or the MCP layer.

**On success:** Confirm and continue:
```
✅ Hygraph connection verified. Proceeding to product questions.
```

**On failure — follow this diagnosis tree exactly (do not skip steps):**

```
STEP 1 — Check endpoint format:
  Must match: https://[region].hygraph.com/v2/[projectId]/master
  Common errors:
    • Missing /master at the end
    • Using /v1/ instead of /v2/
    • Extra whitespace or line break after pasting
  Fix: Ask user to re-copy from Dashboard → Settings → API Access → Endpoints
       and paste as a single unbroken line.

STEP 2 — Check token:
  Common errors:
    • Token is VIEWER role (read-only) but schema work requires EDITOR/OWNER
    • Token was copied with a leading/trailing space
    • Token was revoked or expired
  Fix: Ask user to create a new token with OWNER role and paste again.

STEP 3 — Check region:
  Hygraph projects exist in specific regions (eu-west-2, us-east-1, ap-south-1).
  If the endpoint says eu-west-2 but the project is in us-east-1, queries fail silently.
  Fix: Ask user to confirm project region in Dashboard → Settings → General

STEP 4 — Re-test after each fix:
  After every correction, re-run the Ping query before moving on.
  Do not assume the fix worked — always verify.
```

**Maximum retry attempts: 3.** If the connection still fails after 3 rounds of diagnosis, display:
```
⚠️  Connection could not be established after multiple attempts.
    Please open Hygraph support (support.hygraph.com) or check their
    status page (status.hygraph.com) before retrying.
    I will wait here — paste new credentials when you're ready.
```

#### Hygraph MCP Server — Reliability Rules

The Hygraph MCP server is used for schema management mutations (creating models, fields, unions). It can be slow or timeout on individual calls. Apply these rules to prevent failures:

```
RULE 1 — Never chain MCP calls without polling between them:
  Every schema mutation returns an async migration ID.
  Always poll migration status to SUCCESS before issuing the next mutation.
  Polling interval: 1 second. Timeout: 30 seconds per migration.
  If a migration reaches FAILED status, log the error and retry once
  before escalating to the user.

RULE 2 — Batch field creation per model:
  Do NOT create fields one at a time with separate MCP calls.
  Create ALL fields for a single model in ONE mutation where the API supports it.
  This reduces the number of round-trips from N (one per field) to 1 per model.

RULE 3 — Sequence model creation strictly:
  Create models in dependency order:
    1. Enumerations first (no dependencies)
    2. Foundation models: SiteConfig, NavigationItem, Page
    3. All block models
    4. ContentBlock union (references all block models — must come last)
  Never create a union before all its member types exist.

RULE 4 — Use direct HTTP for read operations, MCP for write operations:
  Schema introspection (reading UUIDs, checking what exists) → direct HTTP POST
  Schema mutations (creating models, fields, unions) → MCP server
  Content seeding (creating records) → direct HTTP POST (faster, no migration overhead)

RULE 5 — Implement exponential backoff on MCP timeouts:
  If an MCP call times out:
    Retry 1: wait 2s, retry
    Retry 2: wait 4s, retry
    Retry 3: wait 8s, retry
    After 3 failures: pause and inform user, ask if they want to continue

RULE 6 — Check for existing entities before creating:
  Before creating any model or field, introspect the schema to check if it already exists.
  "Already exists" is not an error — skip it silently and continue.
  This makes the entire setup process idempotent: safe to re-run if interrupted.

RULE 7 — Never create the ContentBlock union in pieces:
  Add ALL member types to the union in a single mutation.
  Adding types to the union one at a time creates N migrations instead of 1.
```

#### Schema Setup Progress Reporting

Because schema setup can take 2–5 minutes with multiple async migrations, Claude must report progress continuously so the user knows the process is running:

```
Display live progress like:
  ⏳ Creating SiteConfig model... ✅ done (1.2s)
  ⏳ Creating Page model... ✅ done (0.9s)
  ⏳ Creating NavigationItem model... ✅ done (1.1s)
  ⏳ Creating HeroBlock model (6 fields)... ✅ done (2.4s)
  ⏳ Creating FeatureGridBlock model (4 fields)... ✅ done (1.8s)
  ...
  ⏳ Creating ContentBlock union (14 member types)... ✅ done (3.1s)
  ✅ Schema setup complete. Total: 14 models, 1 union, ~87 fields.
```

Never go silent for more than 5 seconds during schema setup.

#### Content Seeding — Speed Optimization

Content seeding (populating records in Hygraph) must be done via direct HTTP POST to the Content API, not via the MCP server. The MCP server adds overhead per call. Direct HTTP mutations are significantly faster.

```typescript
// Seed all content in a single batched mutation where possible
// Use GraphQL aliases to run multiple creates in one request:
mutation SeedHomePageContent {
  createSiteConfig(data: { ... }) { id }
  createPage(data: { title: "Home", slug: "home", ... }) { id }
  createNavigationItem(data: { label: "Features", ... }) { id }
}
// One HTTP call seeds multiple records — far faster than sequential MCP calls
```

**Seeding order (strictly follow to avoid missing reference errors):**
1. Enumerations (no dependencies)
2. SiteConfig (no dependencies)
3. NavigationItems (no dependencies)
4. Block records (no dependencies — blocks reference no other records)
5. Page records last — they reference block records via the `blocks` union field

**After seeding: publish ALL records.** Every created record must be published to the PUBLISHED stage. Call `publishX(where: { id: "..." }, to: PUBLISHED)` for every seeded record. Unpublished records are invisible to the Content API and cause 404s. Publish in the same order: blocks first, then pages, then SiteConfig, then NavigationItems.

---

## Phase 1 — Mandatory Product Input Collection

**This phase is fully blocking. No architecture planning, no schema creation, no code generation happens until all mandatory questions are answered.**

Claude collects input in three rounds. For each question, Claude provides default options the user can select. If the user types a custom answer, use that. If the user picks a default, use that. If the user provides no answer and no default is selected for a mandatory field, re-ask before moving on.

**Mandatory fields are marked 🔴. Optional fields are marked 🟡.**

> **Content alignment rule:** All site copy, feature descriptions, section headlines, and CTA text must be derived exclusively from the user's product description and answers. No generic SaaS filler copy. Every word on the site must be traceable to something the user said or to verified web research about their specific product category.

---

### Round 1 — Product Identity

Present all four together:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP 2 OF 3 — TELL ME ABOUT YOUR PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Answer these 4 questions. For each one, you can pick a suggested
option or type your own. Mandatory fields must be answered.

🔴 1. Product Name
   (Type the name of your product)

🔴 2. What does your product do?
   Describe the problem it solves and how it solves it.
   (2–4 sentences. Be specific — vague descriptions lead to generic sites.)

🔴 3. Product Type — pick one:
   A) B2B SaaS — software sold to businesses
   B) B2C / Consumer App — software for individual users
   C) Mobile App — iOS and/or Android
   D) Web Platform — browser-based tool or marketplace
   E) API / Developer Tool — built for developers
   F) Desktop Software — downloadable application
   G) Chrome Extension
   H) Other (describe)

🔴 4. Primary target user — pick closest or type your own:
   A) Small business owners / founders
   B) Product and engineering teams
   C) Marketing and growth teams
   D) Individual consumers / creatives
   E) Developers and technical users
   F) Enterprise / procurement teams
   G) Other (describe)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Do not proceed to Round 2 until all 4 Round 1 answers are received.**

---

### Round 2 — Features & Business Model

Present all together after Round 1 is complete:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 5. Key Features (list 4–8)
   For each: Feature Name — what it does FOR the user
   (Focus on outcomes, not technical descriptions)
   Example: "Real-time sync — teammates always see the latest version"

🔴 6. Pricing Model — pick one:
   A) Free only (no paid plans)
   B) Freemium (free tier + paid tiers)
   C) Subscription only (monthly/annual)
   D) One-time purchase
   E) Usage-based / metered
   F) Sales-led / custom pricing
   G) Not decided yet

   If B, C, D, or E: list your tiers (name + price + 3 key inclusions)

🟡 7. Integrations — does your product connect to other tools?
   If yes, list them. If no, skip.
   Default: Skip (no integrations section)

🟡 8. Do you have testimonials or customer quotes?
   Paste 2–3 here if yes.
   Default: I'll generate realistic placeholder quotes

🟡 9. Key metrics / stats to highlight?
   (e.g., "99.9% uptime", "50,000+ users", "saves 10 hrs/week")
   Default: I'll generate appropriate metrics from research
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Do not proceed to Round 3 until mandatory Round 2 fields (5 and 6) are answered.**

---

### Round 3 — Site Direction (optional questions only)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SITE DIRECTION (all optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 10. Any site references?
    URLs of sites whose visual feel you like (not to copy — for direction)
    Default: Claude researches the best examples for your product category

🟡 11. Pages needed — check all that apply or use my suggestion:
    □ Home (always included)
    □ Features     □ Pricing     □ Contact (always included)
    □ How It Works □ Use Cases   □ Integrations
    □ About        □ Docs        □ Security
    □ Download     □ Changelog   □ Other: ___
    Default: Claude suggests pages based on your product type

🟡 12. Anything you specifically don't want on the site?
    (sections, tones, patterns to avoid)
    Default: None
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**All fields in Round 3 are optional. Claude auto-selects visual direction from product context (see Step 0.2). Proceed to Phase 2 immediately after Round 2 if no Round 3 answers are given.**

---

### Post-Collection: Web Research

After all input is collected, Claude runs targeted web research:

```
Searches to run:
1. "[product_category] marketing site design 2025 best examples"
2. "[product_type] landing page visual storytelling"
3. "best converting [product_category] hero section"
4. "[product_category] typical features and benefits list"
5. "modern [tone_keyword] SaaS website animation examples"
6. "[chosen_design_reference] design system breakdown"
7. "[product_category] competitor website analysis 2025"

Research informs:
- Which specific block types will explain this product best
- What visual metaphors work for this product category
- What stats and social proof matter for this audience
- What the top competitors look like (to differentiate)
- What copy angle and framing converts best
- Specific UI patterns from the chosen design language that apply here
```

---

## Phase 2 — Architecture Planning

Present the full architecture proposal. Wait for confirmation before Phase 3.

### Page Selection Rules

```
ALWAYS:
  /         Home
  /contact  Contact

ADD IF RELEVANT:
  /features          → 4+ distinct features worth deep-diving
  /pricing           → paid tiers exist
  /how-it-works      → onboarding or process is complex
  /use-cases         → 2+ clearly different user segments
  /integrations      → 4+ integrations worth showcasing
  /about             → origin story or team builds trust for this type
  /docs              → technical documentation needed
  /security          → product handles sensitive data
  /download          → downloadable product
  /changelog         → product ships updates regularly

NEVER ADD (these are agency pages):
  /services  /portfolio  /hire-us  /our-work
```

### Block Selection Rules

For each page, select blocks based on product type, tone, and research. Apply these rules:

```
Rule 1: Every page's first block is a Hero — always FULL_WIDTH_CINEMATIC, never split columns
Rule 2: Every block must have a live animated UI component — no exceptions, no icons as substitutes
Rule 3: The most important product concept gets a full ScrollPin section — full viewport, sticky left panel
Rule 4: No two consecutive blocks with the same background style
Rule 5: Maximum 8 blocks on homepage, 6 on secondary pages
Rule 6: Every block must have a stated reason — if you can't state it, remove it
Rule 7: Prefer scroll-triggered animation over auto-play where possible
Rule 8: Every feature section demonstrates the feature via a UI simulation — keyboard input, data flowing, states changing
Rule 9: Design language from Step 0.2 must be visible in every block —
         spacing, colors, typography, border radius, and motion must all
         match the chosen reference system
Rule 10: UI demo components must look like real product screens — not simplified diagrams.
          Cards, inputs, labels, status badges, toolbars, sidebars — whatever the product
          actually has, simulate it at 80% fidelity.
```

### Architecture Proposal Format

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP 3 OF 3 — YOUR SITE ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Type:    [type]
Tone:            [tone]
Design Language: [chosen reference — e.g. "Linear / Vercel Aesthetic"]
Font Pair:       [fonts] — [reason]
Color Palette:   [primary hex] + [secondary hex] — [reason]
Animation Level: [Subtle / Moderate / Bold] — matched to tone

PAGES & BLOCKS
──────────────

Home (/)
  1. [BlockType] — [visual explanation of what this will show]
     ↳ Hero structure: full-width headline row → subheadline → CTAs → full-width animated product UI below
     ↳ Demo component: [what the hero demo will simulate — the full product value in one loop]
  2. [BlockType] — [visual explanation]
     ↳ Demo component: [what the inline demo will simulate]
  ...

Features (/features)
  1. ...

[Other pages]

DESIGN APPROACH
───────────────
[3–4 sentences: what the site will feel like in motion, what the scroll story
is, how each section's UI demo advances the product narrative, and specifically
how the chosen design language manifests in the animated components]

Does this look right? Confirm to start building, or tell me what to change.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Phase 3 — Typography & Color System

### Design Language Application Rules

**The chosen design language from Step 0.2 overrides all defaults below where there is a conflict.** These are the binding style rules per design language:

```
LINEAR / VERCEL AESTHETIC:
  Background base:    #0A0A0A or #111111
  Card backgrounds:   rgba(255,255,255,0.04) with border rgba(255,255,255,0.08)
  Border radius:      rounded-lg (8px) — sharp, no pill shapes except badges
  Shadow:             0 0 0 1px rgba(255,255,255,0.08), glow on hover
  Typography:         Geist Sans — weight 300/400/600, very tight letter-spacing
  Motion:             opacity+translateY only, duration 0.3–0.45s, ease.standard
  Highlights:         Single accent color glow (box-shadow spread on hover)
  Section dividers:   Thin 1px lines, never background-color blocks
  NO:                 Gradients on text (except hero), no heavy drop shadows,
                      no rounded-3xl, no colorful illustrations

STRIPE / RESEND AESTHETIC:
  Background base:    #FFFFFF or #F8F8FC
  Card backgrounds:   White with border #E4E4E7, hover shadow
  Border radius:      rounded-xl (12px) standard, rounded-2xl (16px) for hero cards
  Shadow:             0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)
  Typography:         Inter or DM Sans — weight 400/500/700
  Motion:             cards rise on scroll (y:40→0), stagger 80ms, opacity fade
  Highlights:         Purple/indigo gradient mesh in hero background
  Section dividers:   Background color change between sections
  NO:                 Dark-dominant sections except CTA band, no heavy animations

LOOM / NOTION AESTHETIC:
  Background base:    #FAFAF8 or #FFFFFF
  Card backgrounds:   White, warm shadow (rgba(0,0,0,0.05))
  Border radius:      rounded-2xl (16px) or rounded-3xl (24px)
  Typography:         Nunito or Plus Jakarta Sans — weight 600/700/800 display
  Motion:             Spring physics, slight rotation on hover (rotate: 1°–2°)
  Highlights:         Pastel accent blocks, emoji or illustration accents
  Section dividers:   Pastel or very light background fills

RAYCAST / ARC AESTHETIC:
  Background base:    Rich gradient (#1A0533 → #0D1A3A or similar)
  Card backgrounds:   rgba(255,255,255,0.08) frosted glass, backdrop-blur
  Border radius:      rounded-2xl (16px)
  Typography:         Plus Jakarta Sans or Syne — weight 700/800 display
  Motion:             Parallax scroll, glow trails, scale on hover
  Highlights:         Vivid gradient accents, glow halos on key elements
  Section dividers:   Gradient transitions between sections

CRAFT / BASEMENT AESTHETIC:
  Background base:    #FFFFFF or #0A0A0A (alternating sections)
  Typography:         Syne or variable font — oversized display (80px+)
  Motion:             Text scramble/reveal, section wipe transitions
  Highlights:         ONE vivid signal color; everything else neutral
  Border radius:      Mix of sharp (0px) and very rounded (32px)

FRAMER / WEBFLOW AESTHETIC:
  Hero:               Full-width headline row + full-viewport animated product UI below
  Cards:              Each feature card contains a live interactive mini-demo
  Typography:         Clean sans — weight contrast between display and body
  Motion:             Smooth, continuous — never still on first viewport
  Section philosophy: Every section is a demonstration, none are explanations
```

### Typography Philosophy

**Principle: Type does work, not decoration.**
- Headlines make a claim or ask a question — they are never neutral
- Body text is secondary — if a visual can replace a paragraph, use the visual
- Type size differences must be dramatic enough to create clear hierarchy
- Line length on body text: 60–75 characters maximum (readability)
- Never center-align body copy longer than 2 lines
- Avoid typesetting more than 3 lines of uppercase text

### Font Pairing System — Critical Rules

**NEVER use a display/geometric font as the body font.** Display fonts (Syne, Space Grotesk, Bricolage Grotesque) look great at headline sizes but are hard to read in paragraphs. Always use a two-font system:

```
body { font-family: var(--font-body); }   ← readable font for all prose/UI text
h1, h2, h3 { font-family: var(--font-sans); }  ← display font for headings only
```

In Next.js, always load both fonts and assign separate CSS variables:
```tsx
const displayFont = Plus_Jakarta_Sans({ variable: '--font-sans', subsets: ['latin'], weight: ['600','700','800'] })
const bodyFont = Inter({ variable: '--font-body', subsets: ['latin'], weight: ['400','500'] })
// In globals.css: body { font-family: var(--font-body); }
```

Select one pair based on product type. Load all via `next/font/google`.

```
PROFESSIONAL & TRUSTWORTHY:
  Display: "DM Sans" weights 400,500,600,700
  Mono accent: "DM Mono" weight 400,500

BOLD & ENERGETIC:
  Display: "Plus Jakarta Sans" weights 400,600,700,800
  Body: "Inter" weights 400,500

FRIENDLY & APPROACHABLE:
  Display: "Nunito" weights 400,500,600,700,800
  Body: "Inter" weights 400,500

MINIMAL & CLEAN:
  Display: "Geist" weights 300,400,500,600,700
  Mono accent: "Geist Mono" weight 400

TECHNICAL & PRECISE:
  Display: "IBM Plex Sans" weights 400,500,600,700
  Mono accent: "IBM Plex Mono" weights 400,500

CREATIVE & EXPRESSIVE:
  Display: "Syne" weights 400,500,600,700,800
  Body: "Inter" weights 400,500
```

### Typography Scale

Apply this scale universally. All values in rem. Use `clamp()` for fluid scaling.

```css
.text-display { font-size: clamp(2.75rem, 6vw, 5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; }
.text-h1      { font-size: clamp(2.25rem, 5vw, 3.75rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
.text-h2      { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.01em; }
.text-h3      { font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 600; line-height: 1.3; }
.text-lead    { font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 400; line-height: 1.7; }
.text-body    { font-size: 1rem; font-weight: 400; line-height: 1.7; }
.text-caption { font-size: 0.8125rem; font-weight: 500; line-height: 1.5; letter-spacing: 0.04em; text-transform: uppercase; }
.text-mono    { font-family: var(--font-mono); font-size: 0.9375rem; line-height: 1.6; }
```

### Color Philosophy — Three-Token Model

```
TOKEN 1: CANVAS     — what content sits on (background layers)
TOKEN 2: INK        — what communicates (text, icons, borders)
TOKEN 3: SIGNAL     — what demands attention (CTAs, highlights, accents)
```

**Derivation from primary color (user-provided brand):**

```
CANVAS: canvas-base (#FAFAFA light or #0A0A0A dark), canvas-subtle (primary@4%),
        canvas-inverse (#0C0C0F), canvas-tinted (primary@10%)
INK:    ink-primary (#0C0C0F), ink-secondary (55% opacity), ink-tertiary (35% opacity),
        ink-inverse (#FFF), ink-inverse-2 (70% white)
SIGNAL: signal-primary (primaryColor), signal-hover (darkened 12%),
        signal-light (primary@12%), signal-secondary (complementary)
```

**If no brand color is provided (default palette), use the Warm Earth token mapping above — those exact hex values, not derived from opacity.**

**Accessibility (non-negotiable):**
```
ink-primary on canvas-base:    ≥ 7:1 (AAA)
ink-secondary on canvas-base:  ≥ 4.5:1 (AA)
ink-inverse on signal-primary: ≥ 4.5:1 (AA)
ink-inverse on canvas-inverse: ≥ 7:1 (AAA)
```

**Inject as CSS custom properties from Hygraph SiteConfig at runtime.**

### Spacing & Layout System

```
Section padding: 120px desktop / 64px mobile (major), 80px desktop / 48px mobile (secondary)
Container: max-width 1280px, padding 1rem→2rem→4rem
Grid gap: 24px component-level, 48px section-level
Card padding: 32px standard, 24px compact
Border radius by personality: PROFESSIONAL 8px, BOLD 12px, FRIENDLY 16-24px, MINIMAL 8px, TECHNICAL 6px, CREATIVE mixed
Override with chosen design language rules where there is conflict.
```

---

## Phase 4 — UI-Demo-First Block Design: Every Section Is a Live Demo

**This is the highest-priority section. The animated UI component is the primary content of every block.**

### Demo Component Design Process — Do This For Every Section

**Demo components are NOT pre-built. They are designed fresh for every project based on its features.**

Before writing a single line of component code, answer these 4 questions for each section:

```
1. WHAT IS THE FEATURE?
   Name it in customer terms: "instant product search", "smart recommendations",
   "one-click onboarding", "real-time collaboration"

2. WHAT WOULD THIS LOOK LIKE ON SCREEN IF IT WERE HAPPENING RIGHT NOW?
   Describe the actual UI the product shows when a user uses this feature.
   This description becomes the demo.
   Example: "A search bar where the user types a natural-language request.
   The product thinks for a moment (spinner), then 4 results slide in from below,
   each with a relevance percentage bar and a price."

3. WHAT IS THE DATA THIS FEATURE USES?
   Name the actual objects, labels, and states your product shows.
   Never use "Item 1", "User A", or "Category X".
   Use domain-authentic data that a real customer in this market would recognize.

4. WHAT IS THE COMPONENT'S NAME?
   Name it after what it demonstrates, not how it works:
   ✅ SearchResultsDemo   ✅ OnboardingFlowDemo   ✅ TeamDashboardDemo
   ✅ LiveSyncDemo        ✅ ReportBuilderDemo     ✅ CheckoutPreviewDemo
   ❌ Demo1               ❌ FeatureComponent      ❌ AnimatedBox
```

**The component file lives at:** `components/demos/[DescriptiveName]Demo.tsx`

**Each block section owns its own demo component.** Do not reuse a demo across multiple sections unless the feature being shown is literally identical. Each section demonstrates ONE thing, and its demo is purpose-built for that one thing.

**Hero demo = the most important component you will write.** It demonstrates the product's entire core value loop in a single animated sequence. It is the first and longest-running animation on the page. For the hero, build a full product UI simulation — sidebar, search area, results panel, status indicators — whatever the actual product interface looks like when it is doing its primary job.

**The demoType field in Hygraph is a project-specific string.** During Phase 2 (Architecture Planning), decide the demo name for each block. Store the name as a string in Hygraph's `demoType` field (e.g., `"SEARCH_RESULTS"`, `"ONBOARDING_FLOW"`, `"LIVE_SYNC"`). In the React component, map this string to the correct demo component via a switch statement. The values are invented per project — there is no fixed list.

---

### The Fundamental Rule: Real UI, Not Diagrams

Every feature demo component must simulate a real product interface — not a simplified widget or icon animation. The difference:

```
❌ Wrong: An animated icon of a magnifying glass bouncing
✅ Right: A search input where a query types itself, autocomplete dropdown appears,
          results load with skeleton → content transition, relevance scores pulse

❌ Wrong: Three boxes with arrows between them lighting up
✅ Right: A mini-dashboard showing actual data cards, a status column advancing
          through states (Pending → Processing → Complete), numbers updating

❌ Wrong: A generic spinner with "Processing..." text
✅ Right: A pipeline view with named stages, progress bars per stage, log lines
          streaming in monospace, a final "✓ Ready" state that glows briefly
```

**Fidelity requirements for demo components:**
- Use the actual UI vocabulary of the product (the right terminology, the right data shapes)
- Show realistic data — product names, user names, categories, timestamps that match the product's domain
- Include UI chrome — toolbars, sidebars, tabs, status bars where appropriate
- States must be named correctly — not "Step 1/2/3" but the actual state names the product uses
- Color coding must follow the product's signal system — green = success, signal-primary = active/focus
- Typography inside demos must match the site's font system

### The Product-on-Screen Demo Pattern

Every demo component follows this pattern:

```
Phase 1 — IDLE STATE (0ms–500ms after viewport entry):
  Show the "before" state — empty inputs, neutral colors, no active states
  This creates anticipation. The user sees what the UI looks like at rest.

Phase 2 — ACTIVATION (500ms–2000ms):
  The user interaction begins — typing, clicking, selecting
  Animate at human speed — typing at 40–60ms per character, pauses at natural breaks

Phase 3 — PROCESSING (2000ms–3500ms):
  Show the system working — loading states, progress, skeleton screens
  This is the "magic moment" setup — build suspense before the result

Phase 4 — RESULT (3500ms–5000ms):
  The output arrives — cascade animate results in, highlight the key value
  This is the payoff. Make it satisfying — smooth transitions, subtle glow, counter tick-up

Phase 5 — HOLD (5000ms–7000ms):
  Show the final state. Let the user read it. Do not rush to reset.

Phase 6 — RESET (7000ms+):
  Fade back to Phase 1 and loop. Smooth reset — never a hard cut.
```

### Scroll-Triggered Animation System

All demo components use `IntersectionObserver` for trigger. The animation does NOT auto-play on page load — it starts when the section enters the viewport. This makes each section feel like a live demo happening for the visitor specifically.

```typescript
// Standard trigger pattern for all demo components
const containerRef = useRef<HTMLDivElement>(null)
const started = useRef(false)

useEffect(() => {
  const el = containerRef.current
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting && !started.current) {
        started.current = true
        runDemo() // starts the full demo sequence
      }
    },
    { threshold: 0.4 } // fires when 40% of the component is visible
  )
  observer.observe(el)
  return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

### Demo Component Quality Bar — Minimum Acceptable Standard

Before finalizing any demo component, verify against this checklist:

```
✅ Has at least 3 distinct visual states (idle → processing → result)
✅ Shows realistic domain data (not "Item 1", "User A", "Value X")
✅ Uses product-specific terminology in labels and states
✅ Animates at human-believable speed (not too fast, not too slow)
✅ Has a clean loop — the reset is smooth, not a hard flash
✅ Is visually self-contained — a visitor who has never seen the product can
   understand what it does from watching this demo alone
✅ Uses the site's signal colors consistently
✅ Has at least one "moment of delight" — a satisfying micro-transition
   (e.g., a check appearing, a number counting up, a bar filling)

❌ Does NOT use Lorem ipsum data
❌ Does NOT use generic icons as the main visual
❌ Does NOT flash or stutter on loop
❌ Does NOT look like a diagram — must look like a real UI
❌ Does NOT auto-play before entering viewport
```

### Hero Block — FULL_WIDTH_CINEMATIC (MANDATORY FORMAT)

> **The hero is ALWAYS a full-width vertical stack. Never two columns side-by-side. This is non-negotiable.**

**Structure (top to bottom):**
```
[1] EYEBROW BADGE                    — centered, pill shape, signal-light bg
[2] HEADLINE                         — centered, display size, max 10 words
[3] SUBHEADLINE                      — centered, text-lead, max 2 lines, max 640px wide
[4] CTA ROW                          — centered, primary button + ghost button, gap 12px
[5] SOCIAL PROOF STRIP               — centered, small text: "Trusted by X teams" or stat
[6] ─────────────── [full-width separator line, 1px, border-subtle] ───────────────
[7] FULL-WIDTH PRODUCT DEMO STAGE    — the entire product experience in one animated UI
    width: 100% of container (max 1280px)
    min-height: 420px, border-radius: 16px, border: 1px solid border-subtle
    background: canvas-subtle or glassmorphism
    Contains: the hero demo component — a comprehensive multi-feature animation
              that demonstrates the product's core value loop in 8–12 seconds
```

**Hero Demo Stage requirements:**
- Must look like the actual product UI — chrome bar at top (window dots + product name), then the product interface
- Must demonstrate the product's primary value proposition in a single continuous loop
- Must include: user input → system processing → meaningful output
- The demo stage width creates a "cinema screen" effect — the product is on display, not hidden
- Subtle CSS perspective tilt (perspective: 1200px, rotateX: 2deg) gives the stage depth without distortion
- Gradient mesh behind the whole hero section animates slowly (12s–18s cycle)

**Hero animation sequence:**
```
t=0ms     gradient mesh renders, stage appears with subtle scale(0.98)→scale(1)
t=150ms   eyebrow badge fades up
t=350ms   headline animates in (word by word or full fade — match design language)
t=600ms   subheadline fades up
t=800ms   CTA buttons scale in (spring physics)
t=1000ms  social proof strip fades up
t=1200ms  stage border glows briefly (box-shadow 0 0 0 2px signal-light → back)
t=1500ms  hero demo component starts its first sequence
```

### Stats Block

```
CountUp: 0 → value over 1.8s, easeOut, IntersectionObserver trigger, stagger 150ms.
Layout: DARK BAND preferred (canvas-inverse, numbers at 80px+).
After count completes: brief signal-primary glow on each number, then steady state.
Below each number: small label in ink-tertiary caption style.
All stats must be traceable to user input or web research.
```

### Bento Grid Block

```
Purpose: Show 4–6 product features simultaneously in a visual grid.
Layout: CSS grid, 12 columns desktop. Mix card sizes:
  HERO card (col-span 7, row-span 2): Primary feature — large live demo component
  SECONDARY card (col-span 5): Second most important feature — medium demo
  SMALL cards (col-span 4 or col-span 6): Supporting features — compact demos

Each card contains:
  [1] Live mini-demo component (auto-plays on viewport entry)
  [2] Feature name — text-h3, ink-primary
  [3] One-sentence benefit — text-body, ink-secondary
  NOTHING ELSE — no long descriptions, no bullet lists

Card hover: lift y:-6px, glow border (border → signal-light), demo intensifies/speeds up
Entry: stagger 60ms per card, left-to-right then top-to-bottom

Mini-demo size guidelines:
  HERO card: full demo component, 180–240px height
  SECONDARY: compact version, 140–180px height
  SMALL: icon-sized animated state, 80–120px height — just the key moment
```

### Scroll Demo Block (Pinned Scroll Storytelling)

```
This is the most important section type for explaining a multi-step product.
It tells the product's story through scroll position.

LAYOUT:
  position: sticky container, 100vh height, overflow: hidden
  LEFT PANEL (35% width, sticky):
    - Section eyebrow badge
    - Section headline
    - Step list: numbered steps, active step highlighted with signal-primary
    - Active step shows: title (text-h3) + description (text-body, 2–3 lines)
    - Progress bar: thin vertical line, fills as steps advance
  RIGHT PANEL (65% width, sticky):
    - Product demo stage (full panel height)
    - Shows a DIFFERENT animated UI state per step
    - Transition between states: 400ms cross-fade + slight y translate
    - Each step's UI state must look meaningfully different from the others

SCROLL BEHAVIOR:
  Each step occupies 100vh of scroll space.
  As user scrolls, the step index advances.
  The right panel transitions to the next UI state.
  This creates the "sticky demo" effect used by Linear, Vercel, and Framer.

RIGHT PANEL UI STATES:
  Must show the actual product UI at each step of the workflow.
  State 1: Empty/starting state
  State 2: Input/configuration in progress
  State 3: Processing/running state
  State 4: Result/output state
  Each state must be a realistic product screen, not a diagram.

IMPLEMENTATION:
  Use useScroll + useTransform from Framer Motion, or IntersectionObserver
  on spacer divs to track which step is active.
  Each step's UI state is a separate component, shown/hidden based on activeStep.
  Transitions use AnimatePresence with initial/exit variants.
```

### Feature Grid Block (Per-Feature Deep-Dive)

```
Layout: Full-width section. Content stacks vertically — each feature is its own row.
Each feature row alternates: [text left, demo right] → [demo left, text right] → repeat
This zigzag layout creates visual rhythm and prevents monotony.

Per feature row:
  TEXT SIDE (45% width):
    - Eyebrow badge: feature category
    - Feature name: text-h2
    - Benefit headline: one bold claim (not a description)
    - Proof detail: 2–3 lines maximum explaining the mechanism
    - Optional: 3–4 bullet points with check icons (from Hygraph detailsJson)
    - Optional: micro-CTA link ("See how it works →")

  DEMO SIDE (55% width):
    - Full-height demo panel (min-height 320px)
    - Live animated demo component (product-specific)
    - Background: canvas-subtle with border
    - Demo auto-starts on viewport entry

Row entry animation:
  TEXT SIDE: fades in + slides from left (x: -24 → 0)
  DEMO SIDE: fades in + slides from right (x: 24 → 0)
  Stagger: text 0ms, demo 120ms
  Duration: 0.5s, ease.standard
```

### Testimonials Block

```
MARQUEE (recommended): Two rows scrolling opposite directions, pauseOnHover.
Per card: avatar circle (initials or image) + name + role + company + quote
Quote: italic, ink-secondary, 2–3 lines maximum
Card background: canvas-subtle, border: border-subtle, border-radius: 12px, padding: 24px

Row 1 scrolls LEFT at 40s duration.
Row 2 scrolls RIGHT at 36s duration (slightly different speed for visual interest).
Fade mask on left and right edges (linear-gradient to canvas-base, 80px wide).
pauseOnHover: add transition: animation-play-state on hover.
```

### Logo Marquee Block

```
Single row (or two rows for 8+ logos), scrolls LEFT at 30s duration.
Logo height: 28px–32px, filter: grayscale(100%) opacity(0.5) default.
Hover: grayscale(0) opacity(1), transition 0.3s ease.
Fade mask on both edges (64px).
Headline above marquee: optional, text-caption style, ink-tertiary, centered.
```

### CTA Block

```
DARK_STAGE (recommended): canvas-inverse background.
  - Signal glow: radial-gradient positioned above headline (rgba(signal,0.15))
  - Headline: text-h1, ink-inverse, centered, max 640px
  - Subheadline: text-lead, ink-inverse-2, centered, 1–2 lines
  - CTA row: primary button (filled, signal-primary) + ghost button (border: ink-inverse @30%)
  - Entry: headline fades up, CTAs scale in with spring physics, glow pulses once

CTA copy must be product-specific — name the outcome, not the action:
  "Start finding products instantly →" not "Get started"
  "See [ProductName] in action" not "Request demo"
```

### Contact Form Block

```
SPLIT layout:
  LEFT (40%): headline (text-h2) + subheadline + contact details (email, phone, address)
  RIGHT (60%): form

Form fields: full-name, email, company (optional), message (textarea, 5 rows)
Focus state: border-color → signal-primary, subtle box-shadow glow
Error state: border-color → #ef4444, shake animation (2px left-right, 3 cycles)
Submit states:
  DEFAULT: "Send Message" text, normal opacity
  LOADING: spinner icon + "Sending…" text, opacity 0.7, disabled
  SUCCESS: fields fade out → centered check icon (signal-primary) + "Message sent!" h3 + subtext
  ERROR: inline error text below submit button, red, with retry option

CONTACT SUBMISSION — HYGRAPH ONLY (mandatory, no exceptions):
  Every form submission MUST be stored in Hygraph via the ContactSubmission model.
  The API route (app/api/contact/route.ts) must call createContactSubmission mutation.
  No email-only solutions. No third-party form services. Hygraph is the single source of truth.

  Required fields to save:
    fullName: String!
    email: String!
    company: String (optional)
    message: String!
    submittedAt: DateTime! (use new Date().toISOString())
    submissionStatus: NEW (the Hygraph enum value — NOT the string "NEW")

  IMPORTANT: The field is named "submissionStatus" — NOT "status" (reserved word in Hygraph).

  API route pattern:
    POST /api/contact → validate with Zod → createContactSubmission mutation → return { success: true }
    Use hygraphMutationClient (server-only, never exposed client-side) for the mutation.
    Records are created in DRAFT stage by default — this is correct for ContactSubmission
    (admin reads them via management API or CMS dashboard, not via public content query).
```

---

## Phase 4b — Scroll Animation Design: The Flow Design Principle

The site must feel like a product story unfolding as the user scrolls. This section defines how to achieve that.

### Section Entry Patterns

Every section has an entry animation triggered by IntersectionObserver at 30% visibility:

```
FADE UP (default):
  initial: { opacity: 0, y: 32 }
  animate: { opacity: 1, y: 0 }
  duration: 0.5s, ease: [0.22, 1, 0.36, 1]

STAGGER CONTAINER (grids, lists):
  Parent: staggerChildren: 0.08
  Children: FADE UP with custom delay index

SLIDE IN (feature rows):
  TEXT SIDE: initial { opacity: 0, x: -28 } → { opacity: 1, x: 0 }
  DEMO SIDE: initial { opacity: 0, x: 28 } → { opacity: 1, x: 0 }
  Both: duration 0.5s, stagger 0.12s between them

SCALE IN (CTA blocks, stat numbers):
  initial: { opacity: 0, scale: 0.94 }
  animate: { opacity: 1, scale: 1 }
  duration: 0.4s, spring physics preferred
```

### Section Background Variation (Required)

Never place two sections with the same background color adjacent to each other. Follow this alternating pattern:

```
Section 1: canvas-base        (default: beige-50 #f7f9ec — warm off-white)
Section 2: canvas-subtle      (default: beige-100 #eff2d9 — slightly richer, breathing room)
Section 3: canvas-base
Section 4: canvas-inverse     (default: tea-green-900 #1e2211 — high contrast, dark green
                               reserved for CTA, stats, or hero moments)
Section 5: canvas-base
```

The alternation makes each section feel like a new chapter. The visitor's eye resets. The section feels fresh.

### The "Demo On Screen" Atmosphere

Beyond individual components, the page as a whole should feel like a product in motion. Achieve this with:

```
1. BACKGROUND GRADIENTS THAT DRIFT:
   Sections use radial-gradient meshes that animate position very slowly (15s–20s).
   The canvas never feels completely static. There is always subtle life in the background.

2. BORDER GLOW ON DEMO PANELS:
   Demo stage borders pulse once when the demo starts (box-shadow expands then contracts).
   This draws the eye: "something is happening here."

3. TYPING CURSORS:
   Any component that simulates text input must show a blinking cursor (▋ or |).
   This is the universal signal: a human is here, something is about to happen.

4. STATUS BADGE TRANSITIONS:
   When a state changes (Pending → Active → Complete), the badge does not just swap text.
   It fades out on a 150ms scale, then fades in the new state on 150ms scale.
   Color transitions simultaneously. This makes state changes feel intentional.

5. PROGRESSIVE REVEAL IN RESULT STATES:
   When results appear, each result item arrives separately (stagger 60–80ms each).
   Never reveal all results simultaneously — staggered arrival feels like real data loading.
```

### Animation Language Reference

```
FADE IN + RISE       → "This appears / becomes available" — section reveals
DRAW / BUILD         → "Being constructed / generated" — charts, code, connections
COUNTER              → "Scale and momentum" — user counts, uptime, savings
SEQUENCE             → "This is a process" — step-by-step, workflows
MORPH / TRANSITION   → "Before and after" — problem→solution, feature demos
PARALLAX             → "Depth / layers" — hero backgrounds, feature illustrations
PULSE / GLOW         → "Live / active / real-time" — status indicators, live data
ORBIT / FLOW         → "Integration / ecosystem" — integration sections, platforms
TYPEWRITER           → "Input / query / command" — search, chat, terminal
STREAM               → "Continuous output / generation" — AI tokens, data feeds
```

### Easing Curves (never use linear)

```typescript
export const ease = {
  standard:     [0.22, 1, 0.36, 1],
  entrance:     [0.0, 0.0, 0.2, 1],
  exit:         [0.4, 0, 1, 1],
  spring:       { type: 'spring', stiffness: 400, damping: 28 },
  gentleSpring: { type: 'spring', stiffness: 200, damping: 24 },
}
export const duration = { instant: 0.1, fast: 0.25, standard: 0.45, slow: 0.65, dramatic: 0.9 }
```

### Modern Design Patterns (Required Minimums: 1, 3, 6, 7, 8, 11, 12)

```
PATTERN 1 — Bento Grid: Mixed-size cards, feature importance determines size. Primary feature = large card with full live demo. Not uniform grids.
PATTERN 2 — Glassmorphism (dark): background rgba(255,255,255,0.06), backdrop-filter blur(12px), border rgba(255,255,255,0.10). Max 2 depth levels.
PATTERN 3 — Gradient Mesh Hero: CSS radial-gradient mesh or SVG noise. Never flat color. Animate position slowly (12s+). Always behind the hero demo stage.
PATTERN 4 — Tight Negative Space: Purposeful density, elements closer than expected, unified by visual grouping.
PATTERN 5 — Typographic Contrast: Display headlines dramatically larger than body. Mix weight 300 body with 700/800 headlines.
PATTERN 6 — Micro-interactions: Every button scale(0.97) active. Every card y:-4 hover. Every input border→signal-primary focus. Demo components speed up on hover. Nothing static.
PATTERN 7 — Section Background Variation: canvas-base → canvas-subtle → canvas-inverse → canvas-base. Never 3 same-color sections in a row.
PATTERN 8 — Pill Badges / Eyebrow Labels: Every section preceded by pill badge ("✦ FEATURES"). rounded-full, signal-light bg, signal-primary text, caption size.
PATTERN 9 — Subtle 3D Tilt on Demo Stages: CSS transform perspective(1200px) rotateX(2deg) for hero demo. Gives depth without distortion. Use sparingly — hero only.
PATTERN 10 — Borderless Islands: Mix bordered and borderless content in the same section. Some content floats on background with only spacing as structure.
PATTERN 11 — Demo Stage Chrome: Hero demo and major demo panels have a mock window chrome bar at top (3 colored dots + title text). This signals "this is a real UI" immediately.
PATTERN 12 — Progressive Disclosure: Results, outputs, and data in demos always arrive one item at a time (stagger), never all at once. This mimics real system behavior.
```

---

## Phase 5 — Hygraph Schema (Block-Based)

### Foundation Models

#### SiteConfig (singleton)

```graphql
SiteConfig {
  productName String!, tagline String!
  primaryColor String!, primaryColorDark String!, secondaryColor String
  canvasBase String!, canvasSubtle String!, canvasInverse String!
  inkPrimary String!, inkSecondary String!
  designLanguage String!
  fontSans String!, fontMono String
  logoLight Asset!, logoDark Asset!, favicon Asset!, socialShareImage Asset
  footerTagline String, copyrightText String!
  showSolvativeCredit Boolean!, solvativeCreditText String, solvativeCreditUrl String
  twitterUrl String, linkedinUrl String, githubUrl String, youtubeUrl String
  gtmId String, gaId String
}
```

#### Page

```graphql
Page {
  title String!, slug String!
  metaTitle String!, metaDescription String!, ogImage Asset, noIndex Boolean, canonicalUrl String
  blocks [ContentBlock!]!
  isPublished Boolean!
}
```

#### NavigationItem

```graphql
NavigationItem {
  label String!, url String!, isExternal Boolean
  showInHeader Boolean, showInFooter Boolean, footerGroup String, displayOrder Int!
}
```

#### ContactSubmission

```graphql
ContactSubmission {
  fullName String!, email String!, company String, message String!
  source String, ipCountry String, submittedAt DateTime!
  submissionStatus Enum[NEW, READ, REPLIED, ARCHIVED]  ← NOTE: "submissionStatus" not "status" (reserved word)
  adminNotes String
}
```

### ContentBlock Union

All block models are members of this union. Add ALL member types in a single mutation (see Phase 0.5 RULE 7).

**Block admin label pattern:** `"[emoji] [Section Type Name]"` — e.g. `"🚀 Hero Section"`, `"✨ Features Grid"`

Every block includes `id ID!` and `isVisible Boolean!`.

**Union field type consistency (CRITICAL):**
Fields with the same name across multiple block models MUST have identical `isRequired` settings. Mixing `String!` and `String` for the same field name across union members causes GraphQL validation errors at build time. Make ALL shared field names consistently nullable (non-required) using Management API `updateSimpleField` if needed.

**The `demoType` field is a plain `String` — NOT an enum:**
```graphql
# Add this field to every block model that renders a live demo component:
demoType String   # nullable String — value is decided per project, per section

# Examples of values you might seed (these are project-specific — invent your own):
#   A project management tool:  "TASK_BOARD", "TEAM_TIMELINE", "LIVE_NOTIFICATIONS"
#   A finance tool:             "SPEND_CHART", "BUDGET_TRACKER", "INVOICE_FLOW"
#   An e-commerce search tool:  "SEARCH_RESULTS", "CATALOG_SYNC", "SHOPPER_INTENT"
#
# The values you choose here must match exactly the case strings in your
# DemoForType switch statement in the React components.
# There is no global fixed list — decide during Phase 2 architecture planning.
```

All other block fields follow Phase 4 specifications.

---

## Phase 6 — Project Generation (Zero-Error Startup)

### Critical 404 Prevention Rules

```
Rule 1: Home page slug in Hygraph MUST be "home". Route: app/(site)/page.tsx fetches slug:"home".
Rule 2: All other pages: app/(site)/[slug]/page.tsx. generateStaticParams() excludes "home".
Rule 3: /contact is NOT a special route — it follows the same [slug] pattern.
Rule 4: generateStaticParams() returns [] on error — build succeeds even if CMS is unreachable.
Rule 5: Every page.tsx wraps fetch in try/catch. On error: console.error + notFound().
Rule 6: After seeding ALL content, publish every record to PUBLISHED stage via publishX mutations.
        Unpublished records are invisible to the Content API default stage and cause 404s.
```

**Startup guarantee:**
```bash
pnpm install && pnpm typecheck && pnpm lint && pnpm build && pnpm start
# All must succeed. Home page must load with no 404.
```

### package.json

```json
{
  "name": "product-marketing-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "postbuild": "next-sitemap"
  },
  "dependencies": {
    "next": "^15.1.0", "react": "^19.0.0", "react-dom": "^19.0.0",
    "framer-motion": "^11.15.0", "graphql-request": "^7.1.0", "graphql": "^16.9.0",
    "lucide-react": "^0.468.0", "react-hook-form": "^7.54.0", "zod": "^3.24.0",
    "@hookform/resolvers": "^3.9.0", "clsx": "^2.1.0", "tailwind-merge": "^2.5.0",
    "@tailwindcss/typography": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0", "@types/react": "^19.0.0", "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0", "tailwindcss": "^4.0.0", "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9.0.0", "eslint-config-next": "^15.1.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0", "@typescript-eslint/parser": "^8.0.0",
    "prettier": "^3.4.0", "prettier-plugin-tailwindcss": "^0.6.0",
    "next-sitemap": "^4.2.0", "vitest": "^2.1.0", "@vitejs/plugin-react": "^4.3.0",
    "@testing-library/react": "^16.0.0", "@testing-library/jest-dom": "^6.6.0"
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.graphassets.com' },
      { protocol: 'https', hostname: 'media.graphassets.com' },
      { protocol: 'https', hostname: 'us-east-1.graphassets.com' },
      { protocol: 'https', hostname: 'eu-west-2.graphassets.com' },
    ],
  },
  experimental: { typedRoutes: true, ppr: 'incremental' },
}
export default nextConfig
```

### Hygraph Client (two-key model)

```typescript
// lib/hygraph/client.ts
import { GraphQLClient } from 'graphql-request'
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT
if (!endpoint) throw new Error('NEXT_PUBLIC_HYGRAPH_ENDPOINT is not set.')

// Read-only: used in Server Components
export const hygraphClient = new GraphQLClient(endpoint, {
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}` },
  next: { revalidate: 60 },
})

// Write: used only in API routes (never exposed client-side)
export const hygraphMutationClient = new GraphQLClient(endpoint, {
  headers: { Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}` },
})
```

### App Structure

```typescript
// app/(site)/page.tsx — HOME
export const revalidate = 60
export default async function HomePage() {
  try {
    const { pages } = await hygraphClient.request(GET_PAGE, { slug: 'home' })
    const page = pages?.[0]
    if (!page?.isPublished) notFound()
    const validated = PageSchema.parse(page)
    return <main>{validated.blocks.map(b => <BlockRenderer key={b.id} block={b} />)}</main>
  } catch (error) { console.error(error); notFound() }
}

// app/(site)/[slug]/page.tsx — ALL OTHER PAGES
export const revalidate = 60
export const dynamicParams = true
export async function generateStaticParams() {
  try {
    const { pages } = await hygraphClient.request(GET_ALL_SLUGS)
    return pages.filter((p: { slug: string }) => p.slug !== 'home').map((p: { slug: string }) => ({ slug: p.slug }))
  } catch { return [] }
}
// NOTE: Use pages(where:{slug:$slug}, first:1) — NOT page(where:{slug:$slug})
// Always read data.pages?.[0], never data.page
```

### HeroBlock Component Structure

The HeroBlock layout is fixed — always a vertical stack. The **hero demo component is project-specific** and is created fresh for every project during Phase 4. Name it after what it demonstrates (e.g., `SearchDashboardDemo`, `ProjectTimelineDemo`, `RealtimeFeedDemo`).

```tsx
// The hero is ALWAYS a vertical stack — never split columns
// Structure: eyebrow → headline → subheadline → CTAs → separator → demo stage
//
// ⚠️  The demo component imported here is PROJECT-SPECIFIC.
//     During Phase 4, design and build a hero demo that simulates
//     the product's full core value loop. Name it descriptively.
//     Example imports (names vary per project):
//       import { SearchDashboardDemo } from '@/components/demos/SearchDashboardDemo'
//       import { ProjectTimelineDemo } from '@/components/demos/ProjectTimelineDemo'
//       import { RealtimeFeedDemo }    from '@/components/demos/RealtimeFeedDemo'

export function HeroBlock({ data }: Props) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '140px' }}>
      {/* Animated gradient mesh background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: GRADIENT_MESH, animation: 'meshShift 16s ease-in-out infinite' }} />

      {/* TOP: centered text content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {data.eyebrowLabel && <PillBadge label={data.eyebrowLabel} />}
        <h1 className="text-display" style={{ marginTop: '1.25rem' }}>{data.headline}</h1>
        {data.subheadline && <p className="text-lead" style={{ marginTop: '1.25rem' }}>{data.subheadline}</p>}
        {/* CTA row — centered */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2.5rem' }}>
          {data.primaryCtaLabel && data.primaryCtaUrl && (
            <Link href={data.primaryCtaUrl} className="btn-primary">
              {data.primaryCtaLabel} <ArrowRight size={16} />
            </Link>
          )}
          {data.secondaryCtaLabel && data.secondaryCtaUrl && (
            <Link href={data.secondaryCtaUrl} className="btn-outline">{data.secondaryCtaLabel}</Link>
          )}
        </div>
      </div>

      {/* Separator line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.75, duration: 0.7 }}
        style={{ height: '1px', background: 'var(--border-subtle)', margin: '4rem 2rem 0', transformOrigin: 'left' }}
      />

      {/* BOTTOM: full-width product demo stage */}
      <motion.div
        initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 0', perspective: '1200px' }}
      >
        <div style={{
          transform: 'rotateX(2deg)',
          borderRadius: '16px 16px 0 0',
          border: '1px solid var(--border-subtle)',
          borderBottom: 'none',
          overflow: 'hidden',
          background: 'rgba(13,18,23,0.98)',
        }}>
          {/* Window chrome bar — always present */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-tertiary)' }}>
              {/* Show product name from CMS — e.g. "acme.io — Dashboard" */}
              {data.eyebrowLabel ?? 'Product'}
            </span>
          </div>
          {/* ↓ Replace with the project-specific hero demo component */}
          {/* <ProjectHeroDemo /> */}
        </div>
      </motion.div>
    </section>
  )
}
```

### BlockRenderer

The BlockRenderer is a switch that maps each Hygraph block `__typename` to its React component. The block types are determined in Phase 2 (Architecture) and implemented in Phase 4. The list is project-specific — add only the blocks the project actually uses.

```typescript
// components/blocks/BlockRenderer.tsx
// ⚠️  Block types in this switch are determined per project during Phase 2.
//     The list below is a TEMPLATE. Add, remove, or rename cases to match
//     the block models you created in Hygraph for this project.

import dynamic from 'next/dynamic'
import type { ContentBlock } from '@/lib/schemas/blocks'

// Dynamic imports for blocks with heavy demo components (reduces initial JS)
const HeroBlock       = dynamic(() => import('./HeroBlock').then(m => ({ default: m.HeroBlock })))
const BentoGridBlock  = dynamic(() => import('./BentoGridBlock').then(m => ({ default: m.BentoGridBlock })))
const ScrollDemoBlock = dynamic(() => import('./ScrollDemoBlock').then(m => ({ default: m.ScrollDemoBlock })))
const FeatureGridBlock= dynamic(() => import('./FeatureGridBlock').then(m => ({ default: m.FeatureGridBlock })))

// Static imports for lightweight blocks (no heavy demos)
import { StatsBlock }       from './StatsBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { LogoMarqueeBlock }  from './LogoMarqueeBlock'
import { CtaBlock }          from './CtaBlock'
import { FaqBlock }          from './FaqBlock'
import { ContactFormBlock }  from './ContactFormBlock'

export function BlockRenderer({ block }: { block: ContentBlock }): React.JSX.Element | null {
  if (!block.isVisible) return null
  switch (block.__typename) {
    // ↓ Adjust this list to match the block models for THIS project
    case 'HeroBlock':         return <HeroBlock data={block} />
    case 'StatsBlock':        return <StatsBlock data={block} />
    case 'BentoGridBlock':    return <BentoGridBlock data={block} />
    case 'ScrollDemoBlock':   return <ScrollDemoBlock data={block} />
    case 'FeatureGridBlock':  return <FeatureGridBlock data={block} />
    case 'TestimonialsBlock': return <TestimonialsBlock data={block} />
    case 'LogoMarqueeBlock':  return <LogoMarqueeBlock data={block} />
    case 'CtaBlock':          return <CtaBlock data={block} />
    case 'FaqBlock':          return <FaqBlock data={block} />
    case 'ContactFormBlock':  return <ContactFormBlock data={block} />
    default:                  return null
  }
}
```

**DemoForType inside demo-aware blocks** (BentoGridBlock, FeatureGridBlock, ScrollDemoBlock) also uses a project-specific switch:

```typescript
// ⚠️  demoType strings are decided in Phase 2 and stored in Hygraph.
//     These are invented per project — there is no global fixed list.
//     Name them to describe what the demo shows, not how it works.
//     Example for a project management tool:
function DemoForType({ demoType }: { demoType: string }) {
  switch (demoType) {
    case 'TASK_BOARD':        return <TaskBoardDemo />       // shows kanban moving
    case 'TEAM_TIMELINE':     return <TeamTimelineDemo />    // shows gantt chart building
    case 'LIVE_NOTIFICATIONS':return <LiveNotificationsDemo />// shows alert stream
    case 'REPORT_BUILDER':    return <ReportBuilderDemo />   // shows chart generating
    default:                  return null
  }
}
// Replace the above with the actual demo types for this project.
```

### Footer — Solvative Credit (Fully Dynamic)

```typescript
{siteConfig.showSolvativeCredit && (
  <div className="border-t border-white/10 mt-10 pt-8 text-center">
    <p className="text-sm" style={{ color: 'var(--ink-inverse-2)' }}>
      {siteConfig.copyrightText}{' '}
      <a href={siteConfig.solvativeCreditUrl ?? 'https://solvative.com'} target="_blank" rel="noopener noreferrer"
         className="underline underline-offset-2 hover:opacity-80 transition-opacity">
        {siteConfig.solvativeCreditText ?? 'Developed by Solvative'}
      </a>
    </p>
  </div>
)}
```

---

## Phase 7 — Code Standards

### Line Limits

```
app/**/page.tsx              ≤ 80 lines
app/**/layout.tsx            ≤ 100 lines
components/blocks/*.tsx      ≤ 200 lines
components/ui/*.tsx          ≤ 80 lines
components/animations/*.tsx  ≤ 60 lines
components/demos/*.tsx       ≤ 350 lines
lib/hygraph/queries/*.ts     ≤ 200 lines
lib/schemas/*.ts             ≤ 200 lines
Any single function          ≤ 40 lines
```

### TypeScript `tsconfig.json` (strict)

```json
{ "compilerOptions": { "strict": true, "noUnusedLocals": true, "noUnusedParameters": true,
  "noImplicitReturns": true, "forceConsistentCasingInFileNames": true } }
```

### ESLint

```json
{ "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": { "@typescript-eslint/no-explicit-any": "error", "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": "error", "no-console": ["warn", { "allow": ["error"] }],
    "prefer-const": "error", "react/no-unused-prop-types": "error" } }
```

### Prettier

```json
{ "semi": false, "singleQuote": true, "trailingComma": "es5", "printWidth": 100,
  "tabWidth": 2, "plugins": ["prettier-plugin-tailwindcss"] }
```

---

## Phase 8 — Final Delivery Checklist

### Input Collection ✓
- [ ] Design language auto-selected (Step 0.2) — announced in one sentence, binding for all phases
- [ ] Color palette confirmed — user input or researched default shown for approval
- [ ] Hygraph endpoint URL and token collected (Step 0.4)
- [ ] Hygraph connection test GREEN before any further work (Step 0.5)
- [ ] All 3 rounds of product questions answered
- [ ] Post-collection web research completed
- [ ] Architecture proposal confirmed by user

### Hygraph Setup ✓
- [ ] Schema created using batched mutations (RULE 2) — not one field at a time
- [ ] Every migration polled to SUCCESS before next mutation (RULE 1)
- [ ] Models created in dependency order: enumerations → foundation → blocks → union (RULE 3)
- [ ] ContentBlock union created in single mutation with all member types (RULE 7)
- [ ] All shared field names have consistent isRequired across all union member models
- [ ] Content seeded via direct HTTP POST batched mutations, not MCP (seeding speed rule)
- [ ] Seeding order: enumerations → SiteConfig → NavigationItems → blocks → pages
- [ ] ALL seeded records published to PUBLISHED stage via publishX mutations
- [ ] Home page slug is exactly "home"
- [ ] All content is product-specific — no Lorem ipsum, no generic copy
- [ ] ContactSubmission uses `submissionStatus` field, not `status`
- [ ] showSolvativeCredit, solvativeCreditText, solvativeCreditUrl seeded

### Code: Zero-Error Startup ✓
- [ ] pnpm install, typecheck, lint, build, start — all succeed
- [ ] Page queries use `pages(where:{slug:$slug}, first:1)` not `page(where:{slug:$slug})`
- [ ] All internal links use `<Link>` from `next/link`, never `<a href="/">`
- [ ] body uses `--font-body` var (readable font), headings use `--font-sans` (display font)
- [ ] Unused imports removed — TypeScript strict will fail build otherwise
- [ ] Home page loads, all seeded pages load, /contact form renders and submits

### Design: UI-Demo-First Standards ✓
- [ ] Hero is FULL_WIDTH_CINEMATIC — vertical stack, never two columns side-by-side
- [ ] Hero demo stage spans full container width (max 1280px), min-height 420px
- [ ] Hero demo stage has window chrome bar (3 dots + product name)
- [ ] Hero demo component shows the full product value loop in one sequence
- [ ] Every block has a live animated UI component — no icons, no static screenshots
- [ ] Every demo component has idle → processing → result → hold → reset phases
- [ ] Every demo component triggers on IntersectionObserver (not on page load)
- [ ] Demo components use realistic domain data (product names, real categories, timestamps)
- [ ] Demo components look like real product screens (not diagrams or widgets)
- [ ] At least one ScrollPin section (sticky left panel + advancing right panel per scroll)
- [ ] PATTERN 1 (bento grid) applied to at least one feature section
- [ ] PATTERN 3 (gradient mesh) applied to hero background, animating slowly
- [ ] PATTERN 6 (micro-interactions) on all interactive elements + demo hover states
- [ ] PATTERN 7 (alternating section backgrounds) — no 3 same-color sections in a row
- [ ] PATTERN 8 (pill badges) on all section eyebrow labels
- [ ] PATTERN 11 (demo stage chrome) on hero and major demo panels
- [ ] PATTERN 12 (progressive disclosure) on all result states in demos
- [ ] CountUp animations on all stats
- [ ] Stagger animations on all grids/lists
- [ ] Gradient mesh behind hero animates (12s+ cycle)

### Content Alignment ✓
- [ ] Every headline traceable to user's product description
- [ ] No generic filler copy ("Supercharge your workflow", "Take it to the next level")
- [ ] All feature names from user's Round 2 input
- [ ] All pricing tiers from user's Round 2 input
- [ ] All stats from user input or verified research
- [ ] Demo components use domain-specific data from the product's actual domain

### Customer-First Language ✓
- [ ] Zero technology mentions in customer-facing copy (no "Next.js", "GraphQL", "AI embeddings", "vector search")
- [ ] Every sentence passes the Reframe Test (remove product name → still communicates customer value)
- [ ] Demo query text written in the customer's own words (natural language, not technical queries)
- [ ] Product names and categories in demos are real domain items, not "Item 1", "Category A"
- [ ] Stage names in pipeline/flow demos use customer language: "Your catalog is live" not "Indexing complete"
- [ ] Status badges use outcome language: "Found 3 perfect picks" not "Query returned 3 results"
- [ ] All CTAs name the customer outcome: "Start finding products" not "Get started"

### Contact Form → Hygraph ✓
- [ ] app/api/contact/route.ts exists and POSTs to Hygraph createContactSubmission mutation
- [ ] Uses hygraphMutationClient (server-only) — never exposed to client
- [ ] Saves fullName, email, company, message, submittedAt, submissionStatus: NEW
- [ ] Field named "submissionStatus" not "status" (Hygraph reserved word)
- [ ] Zod validation runs before the mutation — invalid data is rejected with 400
- [ ] Returns { success: true } on success, { error: string } with 4xx/5xx on failure
- [ ] ContactForm UI shows loading → success/error states clearly

### SEO ✓
- [ ] generateMetadata() on every page.tsx
- [ ] Open Graph title, description, image on every page
- [ ] next-sitemap generates sitemap.xml + robots.txt on build

### Accessibility ✓
- [ ] All text/bg combinations meet WCAG AA (4.5:1 minimum)
- [ ] Focus rings visible on all interactive elements
- [ ] ARIA labels on icon-only buttons
- [ ] Semantic heading hierarchy per page
- [ ] Demo components have aria-hidden="true" (they are decorative)
- [ ] prefers-reduced-motion respected — wrap all animations in motion.div with reducedMotion check

### Content: 100% Dynamic ✓
- [ ] Zero hardcoded strings in JSX
- [ ] All colors from Hygraph SiteConfig via CSS vars
- [ ] All fonts from Hygraph SiteConfig via CSS vars
- [ ] isVisible toggle works on every block
- [ ] New block in Hygraph reflects on site within 60s (ISR revalidate: 60)

---

## Phase 9 — Adding a New Block Type

```
1. HYGRAPH (2 min): Create model, add to ContentBlock union, seed content, publish
2. GRAPHQL (2 min): Add inline fragment to GET_PAGE query (NOT named fragment — avoids field conflict errors)
3. ZOD SCHEMA (3 min): Add schema, add to ContentBlockSchema union
4. REACT COMPONENT (15–30 min): Create block + demo component, apply design language + Phase 4 standards
5. BLOCK RENDERER (30 sec): Add one case to switch statement
Total: ~20–35 min. No routing changes. No schema migration required.
```

---

## Phase 10 — Technical Lessons Learned (Production-Verified)

Apply these preventively — do not wait for errors.

### Hygraph GraphQL — Query Patterns

**Slug queries:**
- WRONG: `page(where: { slug: $slug })` — fails if `slug` not unique in schema
- CORRECT: `pages(where: { slug: $slug }, first: 1)` — always use plural + first:1
- Read response as `data.pages?.[0]`, not `data.page`

**Union fragments:**
- WRONG: named fragments (`fragment HeroBlockFields on HeroBlock`) — causes cross-type field conflict errors in Hygraph validation
- CORRECT: inline fragments (`... on HeroBlock { headline }`) — avoids merge validation across union member types

**Union field type consistency:**
- Fields with the same name appearing in multiple block models MUST have identical `isRequired` settings across all models
- Mixing `String!` and `String` for the same field name across union members causes HTTP 400 from Hygraph at query time
- Fix: use Management API `updateSimpleField` to set `isRequired: false` on all conflicting fields
- All shared fields (headline, subheadline, eyebrowLabel, primaryCtaLabel, primaryCtaUrl, demoType, etc.) should be nullable

### Hygraph Content API — Publishing

**Every created record must be explicitly published:**
- Records created via mutation are in DRAFT stage by default
- DRAFT records are invisible to queries without `stage: DRAFT`
- After seeding, call `publishX(where: { id: "..." }, to: PUBLISHED)` for every record
- Order: publish blocks first, then pages, then SiteConfig, then NavigationItems
- Verify: query without `stage: DRAFT` after publishing — if array is empty, records were not published

### Hygraph Management API v2 — Schema Mutations

**All mutations are async:**
- Returns `AsyncOperationPayload { migration { id status errors } }` — NOT the created entity
- Poll `migration(id: $id) { status errors }` every 1s until SUCCESS or FAILED
- Never proceed to the next mutation before the previous one reaches SUCCESS

**Authentication context:**
- Permanent tokens authenticate as `TokenViewer` not `UserViewer`
- Use `viewer { ... on TokenViewer { projectByIdentifier(identifier: "PROJECT_ID") { ... } } }`

**Required inputs:**
- `CreateSimpleFieldInput`: `modelId` (UUID), `apiId`, `type` (STRING/BOOLEAN/INT/DATETIME uppercase), `displayName`, `isRequired`, `isUnique`, `isList`, `isLocalized`
- `CreateEnumerableFieldInput`: `enumerationId` (UUID), `type: ENUMERATION`, rest same as above
- `CreateUnionFieldInput`: requires `reverseSide: { apiId, displayName, isList }` — missing this = "Reverse side field details missing"
- Always use internal UUIDs, not API IDs. Load UUIDs first via schema introspection.

**Idempotency:**
- "Already exists" errors from migrations = skip silently, treat as success
- Check error messages before throwing

**Reserved field names:**
- `status` is reserved in Hygraph — use `submissionStatus` for ContactSubmission

### Next.js App Router

**Internal links:**
- `<a href="/">` causes ESLint build error `@next/next/no-html-link-for-pages`
- Always use `<Link href="/">` from `next/link` for all internal navigation including logo links

**Unused imports:**
- TypeScript strict + Next.js lint fails build on unused imports
- Remove all unused imported variables before finalizing

**useEffect deps:**
- Animation functions defined inside the component and called from useEffect cause `react-hooks/exhaustive-deps` warnings
- Add `// eslint-disable-next-line react-hooks/exhaustive-deps` on the closing `}, [])` line
- This is correct behavior — these functions are intentionally only called once

### Customer-First Content — Common Mistakes

**The technology trap:**
When writing demo copy or section headlines, developers instinctively write how the feature works. Marketing copy must describe what the customer gets. These are different sentences.

- "Hybrid vector + graph search" → the mechanism. Customer doesn't care.
- "Finds what shoppers mean, not just what they type" → the outcome. This is what goes on the site.

**The jargon filter:**
Every piece of copy must survive this filter: if a non-technical shopper reads it and asks "what does that mean?", it failed. Rewrite in plain language that a customer who has never heard of AI would understand.

**Demo data must be real domain data:**
- Search demos must use real product categories and realistic query phrasing
- Stage labels must use customer-language: "Your catalog is searchable" not "Index built"
- Result items must be products shoppers would actually search for

### Contact Form API Route

- ContactSubmission uses `submissionStatus: NEW` not `status: NEW` (reserved word)

### Hero Design

- The hero MUST be a vertical stack: headline row → CTAs → full-width demo stage
- NEVER implement the hero as a two-column split (text left, demo right)
- The full-width demo stage creates a "cinema screen" effect — the product is on display
- The demo stage must have window chrome (3 colored dots + product name in toolbar)
- Gradient mesh behind the hero must animate (meshShift keyframe, 12s+)

---

## Notes for Claude

- **Never start generating code before Phases 0 and 1 are fully complete**
- **Never proceed past Step 0.5 until Hygraph connection test returns green — no exceptions**
- **Schema mutations must use batched field creation and poll migrations to SUCCESS before continuing**
- **Content seeding must use direct HTTP POST batched mutations, not MCP, for speed**
- **After seeding, publish ALL records to PUBLISHED stage — unpublished records cause 404s**
- **Hero is ALWAYS full-width vertical stack — never two columns side-by-side. Non-negotiable.**
- **Design language is auto-selected — do NOT ask the user.** Announce in one sentence and proceed.
- **Every section must have a live UI demo component** — static icons and screenshots are not acceptable
- **Demo components must look like real product screens** — fidelity matters, diagrams are not acceptable
- **The demo-on-screen philosophy applies to every block** — the UI component is the section
- **Scroll storytelling is the organizing principle** — each section is a chapter, scroll advances the story
- **Content must be project-specific** — if copy could appear on a competitor's site unchanged, rewrite it
- **Patterns 1, 3, 6, 7, 8, 11, 12 are required minimums** on every project
- **Animation must communicate** — if removing it reduces understanding, keep it. If not, replace it.
- **Every word on the site must pass the Customer-First Language Law** — no technology mentions, no architecture descriptions, only customer outcomes
- **Contact form submissions go to Hygraph only** — use createContactSubmission mutation via hygraphMutationClient, no email services, no third parties
- **Demo data must use real customer language** — shopper queries in natural language, product names real shoppers would search for, outcome-language in all status labels
- **Solvative credit is a first-class CMS field** — fully dynamic, never hardcoded
- **404 prevention rules in Phase 6 are absolute** — use `pages(where, first:1)` not `page(where)`
- **Body font MUST be a readable font** — never set `body { font-family: var(--font-sans) }` if `--font-sans` is a display font. Always load a separate `--font-body` variable.
- **The three-token color model (canvas/ink/signal) is the only color system used**
- **Union field type consistency is mandatory** — all shared field names must have identical nullability across all block models
- **Skill adoption is silent** — merge additional skill files without announcing it
