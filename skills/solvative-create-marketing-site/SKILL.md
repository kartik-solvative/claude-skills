---
name: solvative-create-marketing-site
description: This skill should be used when the user wants to "create a marketing site", "build a marketing website", "generate a Solvative marketing page", "create a landing page", or wants to produce a UI-demo-first, block-based CMS marketing website powered by Hygraph with scroll-storytelling and modern immersive design.
version: 1.0.0
---

# Marketing Site Generator — Master Skill v6

## UI-Demo-First · Block-Based CMS · Hygraph MCP-Powered · Scroll-Storytelling · Modern Immersive Design

---

## Skill Adoption

This skill can absorb additional runtime skills. If the user provides extra `.md` skill files at runtime, Claude reads them first and merges their instructions into this skill before proceeding. Additional skills override or extend any section of this skill they reference. Adoption is silent.

---

## Core Philosophy — The Screen IS the Product Demo

> **The visitor must feel like they are watching the product work — not reading about it.**

Every section of every page must have a live, animated UI component that shows the product doing something real. Copy is the caption beneath the experience, not the experience itself.

**The 80/20 Rule:** 80% of every section's communication happens through the animated UI component. 20% is a tight headline + one-line description.

**Hero Rule — Full-Width Vertical Stack (NON-NEGOTIABLE):**
The hero is ALWAYS: eyebrow → headline → subheadline → CTAs → separator → full-width product demo stage. Never two columns. The demo stage spans the full container width.

**Homepage must have 7–8 sections minimum.** A site with fewer than 7 sections on the homepage does not tell a complete product story. Every section is a chapter.

**Scroll Storytelling Rule:** As the user scrolls, the product story unfolds. Each section demonstrates one specific feature or benefit — shown, not described.

---

## Customer-First Language Law — MANDATORY

Every sentence must answer: _"What does this do FOR ME?"_

**PROHIBITED:**

- Technology stack: "Built on Next.js, GraphQL, vector embeddings"
- Architecture: "Hybrid vector + knowledge graph AI"
- Jargon: "MCP-compatible API", "semantic indexing pipeline"

**REQUIRED:**

- Outcome-first: "Your customers find exactly what they're looking for — instantly"
- Proof: "47,000 products. Zero wrong results."
- Empathy: "Even when a shopper isn't sure what they want, it figures it out"

**Reframe Test:** Remove all technology names. Ask: "Does this still communicate value to a customer?" If NO → rewrite.

---

## Phase 0 — Setup: Skill Files, Design Language & Environment

### Step 0.1 — Read Additional Skill Files First

Merge any attached `.md` skill files silently before proceeding.

---

### Step 0.2 — Design Language Auto-Selection

**Do NOT ask the user.** Auto-select based on product type and announce in one sentence.

```
B2B SaaS / Enterprise      → LINEAR / VERCEL ("Dark Precision") — linear.app, vercel.com
Developer tools / APIs     → STRIPE / RESEND ("Light Authority") — stripe.com, resend.com
Consumer apps              → LOOM / NOTION ("Warm Modern") — loom.com, notion.so
Creative / Design / Media  → CRAFT / BASEMENT ("Editorial Bold") — basement.studio
Mobile / Lifestyle         → RAYCAST / ARC ("Gradient Immersive") — raycast.com, arc.net
Interactive demos          → FRAMER / WEBFLOW ("Interactive Showcase") — framer.com
```

Run these web searches to inform the selection:

```
1. "best marketing website design 2025 award winning"
2. "[product_category] marketing site design 2025"
3. "[reference_site] design language analysis"
```

---

### Step 0.3 — Color Palette (MANDATORY BEFORE CREDENTIALS)

Ask the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 COLOR PALETTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primary brand hex (e.g. #5B3DF5)
• Secondary hex (optional)
• dark-dominant / light-dominant / balanced?

Type "default" → I'll research and propose a palette for your category.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If "default": research `"best color palette [product_category] SaaS 2025"`, derive three-token palette, show for approval, then proceed.

---

### Step 0.4 — Hygraph + Environment Setup

**Hygraph is managed EXCLUSIVELY via its MCP server throughout the entire skill execution.** The MCP server is the only interface for schema creation, content seeding, publishing, and querying during Claude's work. Direct HTTP calls are used only for the initial ping test (Step 0.5) and for batched content seeding (speed optimization). All schema work goes through MCP.

**Display this to the user:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 HYGRAPH + ENVIRONMENT SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I need 2 values from your Hygraph project to connect via MCP:

① Content API Endpoint URL
   Dashboard → Settings → API Access → Endpoints → "Content API"
   Example: https://api-eu-west-2.hygraph.com/v2/clxxxxx/master

② Permanent Auth Token (EDITOR or OWNER role)
   Dashboard → Settings → API Access → Permanent Auth Tokens
   → Create or reuse a token with OWNER role → Copy value

I will also generate your .env files. You will need to add these
to your project — they are NEVER committed to git.

⚠️  SECURITY RULES FOR CREDENTIALS:
  • Never paste credentials anywhere except this chat
  • The full token is server-side only (HYGRAPH_MUTATION_TOKEN)
  • Create a separate VIEWER token for the public frontend read
  • Never hardcode any secret in source code — always use .env.local
  • Add .env.local to .gitignore immediately

Paste both values here. I will test the connection before any work.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Generate these files immediately after credentials are provided:**

```bash
# .env.local  ← NEVER commit. Add to .gitignore.
NEXT_PUBLIC_HYGRAPH_ENDPOINT=<CONTENT_API_ENDPOINT>
NEXT_PUBLIC_HYGRAPH_TOKEN=<VIEWER_ROLE_TOKEN>
HYGRAPH_MUTATION_TOKEN=<OWNER_ROLE_TOKEN>
HYGRAPH_MANAGEMENT_ENDPOINT=https://management.hygraph.com/graphql
```

```bash
# .env.example  ← ALWAYS commit. Empty values only.
NEXT_PUBLIC_HYGRAPH_ENDPOINT=
NEXT_PUBLIC_HYGRAPH_TOKEN=
HYGRAPH_MUTATION_TOKEN=
HYGRAPH_MANAGEMENT_ENDPOINT=
```

```gitignore
# .gitignore additions
.env.local
.env.*.local
```

**Env usage rule enforced in all generated code:**

```typescript
// ✅ CORRECT — read from env
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_MUTATION_TOKEN;

// ❌ NEVER — hardcode secrets in source
const token = "eyJhbGciOi...";
```

---

### Step 0.5 — MANDATORY: Hygraph Connection Test (Hard Gate)

**Zero schema work. Zero code generation. Zero seeding. Until this passes.**

#### Test 1 — Direct HTTP Ping

```http
POST <CONTENT_API_ENDPOINT>
Authorization: Bearer <TOKEN>
Content-Type: application/json

{"query": "{ __schema { types { name } } }"}
```

✅ Success → `"Hygraph connection verified. Proceeding."`
❌ Failure → follow diagnosis tree:

```
1. Endpoint format: must be https://[region].hygraph.com/v2/[id]/master
   Fix: re-copy from Dashboard → Settings → API Access → Endpoints (single line, no spaces)

2. Token role: needs EDITOR or OWNER — VIEWER role cannot introspect schema
   Fix: create new OWNER token

3. Region mismatch: endpoint region must match project region
   Fix: confirm in Dashboard → Settings → General

4. Whitespace: token or endpoint may have trailing spaces
   Fix: re-paste carefully

After each fix: re-run ping before continuing. Max 3 attempts.
After 3 failures: direct user to status.hygraph.com
```

#### Test 2 — MCP Server Connectivity Test

After the direct ping passes, verify the MCP server is also reachable:

```
Use the Hygraph MCP server tool with the provided token to run:
  query { viewer { ... on TokenViewer { id } } }

✅ Success → MCP layer is working. Proceed to schema setup.
❌ Failure → MCP server issue (not credential issue — credential already verified).
  Common cause: MCP server not running / wrong MCP server URL in configuration.
  Fix: verify MCP server configuration, restart if needed, re-test.
```

**HARD RULE: Both Test 1 AND Test 2 must pass before any schema work begins.**

#### Hygraph MCP — Reliability Rules (Applied Throughout Execution)

```
RULE 1 — Poll every migration to SUCCESS before the next MCP call:
  Every schema mutation returns AsyncOperationPayload { migration { id status errors } }
  Poll migration(id) every 1s. Timeout: 30s. On FAILED: retry once, then surface error.

RULE 2 — Batch fields per model — one MCP call per model, not one per field.

RULE 3 — Creation order:
  Enumerations → SiteConfig, NavigationItem, Page → Block models → ContentBlock union

RULE 4 — ContentBlock union: add ALL member types in ONE mutation. Never piece by piece.

RULE 5 — Idempotency: check if model/field exists before creating. "Already exists" = skip silently.

RULE 6 — Exponential backoff on timeout: 2s → 4s → 8s → inform user.

RULE 7 — Content seeding: use direct HTTP POST with GraphQL aliases for speed (not MCP).
  MCP is for schema mutations only. Seeding records goes through direct HTTP.

RULE 8 — After seeding: publish ALL records to PUBLISHED stage.
  Unpublished records are invisible to the Content API and cause 404s.
  publishX(where: { id: "..." }, to: PUBLISHED) for every seeded record.
  Order: blocks → pages → SiteConfig → NavigationItems
```

#### Progress Reporting During Schema Setup

Never go silent for more than 5 seconds. Report every step:

```
⏳ Creating SiteConfig model... ✅ done (1.2s)
⏳ Creating HeroBlock model (8 fields)... ✅ done (2.1s)
...
✅ Schema complete. 14 models, 1 union, ~90 fields. Seeding content...
⏳ Seeding home page blocks... ✅ done
⏳ Publishing all records... ✅ done
✅ Hygraph ready. All content live.
```

---

## Phase 1 — Product Input Collection (Blocking)

No architecture, no schema, no code until all mandatory fields answered.

**🔴 = Mandatory. 🟡 = Optional.**

### Round 1 — Product Identity

```
🔴 1. Product Name
🔴 2. What it does (2–4 sentences, problem + solution, specific)
🔴 3. Product Type: A)B2B SaaS B)B2C App C)Mobile D)Web Platform E)API/Dev Tool F)Desktop G)Chrome Ext H)Other
🔴 4. Primary user: A)SMB founders B)Product/eng teams C)Marketing D)Consumers E)Developers F)Enterprise G)Other
```

### Round 2 — Features & Business Model

```
🔴 5. Key Features (4–8): "Feature Name — what it does FOR the user"
🔴 6. Pricing: A)Free B)Freemium C)Subscription D)One-time E)Usage-based F)Sales-led G)TBD
      If B/C/D/E: list tiers (name + price + 3 inclusions)
🟡 7. Integrations (or skip)
🟡 8. Testimonials (paste 2–3, or use placeholders)
🟡 9. Key stats/metrics (or research from category)
```

### Round 3 — Site Direction (All Optional)

```
🟡 10. Reference site URLs (visual feel only)
🟡 11. Pages needed (defaults: Home, Features, Pricing, Contact, How It Works)
🟡 12. Anything to avoid
```

Proceed immediately after Round 2 if no Round 3 input.

### Post-Collection Research

```
1. "[product_category] marketing site design 2025"
2. "[product_type] landing page visual storytelling"
3. "best converting [product_category] hero section"
4. "[product_category] features and benefits"
5. "[design_reference] design system breakdown"
6. "[product_category] competitor websites 2025"
```

---

## Phase 2 — Architecture Planning

Wait for user confirmation before Phase 3.

### Page Rules

```
ALWAYS: / (Home), /contact
ADD IF RELEVANT: /features, /pricing, /how-it-works, /use-cases, /integrations, /about, /docs, /security, /download
NEVER: /services, /portfolio, /hire-us, /our-work
```

### Homepage Section Requirements (7–8 Sections MINIMUM)

**Every homepage must have at minimum these sections in this order:**

```
1. HERO              — Full-width vertical stack. Gradient mesh bg. Full-width demo stage.
2. LOGO STRIP        — "Trusted by X teams at [brand names]" — social proof above the fold
3. PROBLEM SECTION   — Dramatize the pain point with a "before" animated UI simulation
4. FEATURES (BENTO)  — 5–6 features in mixed bento grid, each with live mini-demo
5. HOW IT WORKS      — ScrollPin sticky section, 3–5 steps, product UI changes per step
6. STATS BAND        — Dark background, 3–4 animated CountUp numbers
7. TESTIMONIALS      — Dual-row marquee of customer quotes
8. CTA               — Dark stage, bold headline, two buttons

Additional sections (add as needed for the product):
  - INTEGRATIONS (if 4+ integrations)
  - USE CASES (if 2+ distinct user segments)
  - COMPARISON TABLE (if there is a clear incumbent to differentiate from)
  - FAQ (always useful for reducing friction before signup)
```

### Block Selection Rules

```
Rule 1:  Hero is FULL_WIDTH_CINEMATIC — vertical stack, never split columns
Rule 2:  Every block has a live animated UI component — no exceptions
Rule 3:  The primary product concept gets a ScrollPin section
Rule 4:  No two consecutive sections with the same background
Rule 5:  Max 8 blocks homepage, 6 secondary pages
Rule 6:  Every block has a stated reason — if not, remove it
Rule 7:  Scroll-triggered animation — demos start on viewport entry, not page load
Rule 8:  UI demos look like real product screens (cards, inputs, status badges, toolbars)
Rule 9:  Design language visible in every block — colors, spacing, radius, motion
Rule 10: Demo data uses real domain vocabulary — not "Item 1", "User A", "Category X"
```

### Architecture Proposal Format

```
Product Type:    [type]
Design Language: [chosen] — [one-sentence rationale]
Font Pair:       [display font] + [body font]
Color Palette:   [primary] + [secondary] — [rationale]
Animation Level: Subtle / Moderate / Bold

HOME (/) — 8 sections:
  1. Hero         — [what demo stage shows]
  2. Logo Strip   — [brand names or "top [category] teams"]
  3. Problem      — [what the "before" state looks like as UI]
  4. Features     — [bento grid with N features, each mini-demo described]
  5. How It Works — [ScrollPin, N steps, what the right panel shows per step]
  6. Stats        — [3–4 stats with source]
  7. Testimonials — [marquee]
  8. CTA          — [headline + outcome]

[Other pages...]

SCROLL STORY:
  [3–4 sentences on how the story unfolds as user scrolls — what they understand at each chapter]

Confirm to build, or tell me what to change.
```

---

## Phase 3 — Typography & Color System

### Design Language Style Rules

```
LINEAR / VERCEL:
  bg: #0A0A0A/#111111 | cards: rgba(255,255,255,0.04) border rgba(255,255,255,0.08)
  radius: 8px | font: Geist Sans 300/400/600 tight spacing
  motion: opacity+translateY 0.3–0.45s | no rounded-3xl, no colorful illustrations

STRIPE / RESEND:
  bg: #FFFFFF/#F8F8FC | cards: white border #E4E4E7, hover shadow
  radius: 12px standard, 16px hero | font: Inter/DM Sans 400/500/700
  motion: cards rise y:40→0 stagger 80ms | no dark-dominant except CTA

LOOM / NOTION:
  bg: #FAFAF8 | cards: white warm shadow | radius: 16-24px
  font: Nunito/Plus Jakarta Sans 600/700/800 display | spring physics hover rotate 1-2°

RAYCAST / ARC:
  bg: rich gradient #1A0533→#0D1A3A | cards: rgba(255,255,255,0.08) backdrop-blur
  radius: 16px | font: Plus Jakarta Sans/Syne 700/800 | parallax glow trails

CRAFT / BASEMENT:
  bg: #FFF or #0A0A0A alternating | font: Syne oversized 80px+ | ONE vivid signal color
  motion: text scramble/reveal | radius: mix sharp 0px and very rounded 32px

FRAMER / WEBFLOW:
  hero: full-width headline + full-viewport product UI demo | cards: live interactive mini-demos
  motion: smooth continuous | never still on first viewport
```

### Font Rules (CRITICAL)

**NEVER use a display font as body font.** Always two separate CSS variables:

```tsx
// layout.tsx
const displayFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["600", "700", "800"]
});
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"]
});
```

```css
/* globals.css */
body {
  font-family: var(--font-body);
}
h1,
h2,
h3,
h4 {
  font-family: var(--font-sans);
}
```

### Typography Scale

```css
.text-display {
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.text-h1 {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.text-h2 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.text-h3 {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
}
.text-lead {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.7;
}
.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
}
.text-caption {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.text-mono {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  line-height: 1.6;
}
```

### Three-Token Color Model

```
CANVAS: canvas-base, canvas-subtle, canvas-tinted, canvas-inverse
INK:    ink-primary, ink-secondary (55%), ink-tertiary (35%), ink-inverse, ink-inverse-2 (70%)
SIGNAL: signal-primary, signal-hover (darkened 12%), signal-light (12% opacity), signal-secondary

Accessibility: ink-primary/canvas-base ≥7:1 | ink-secondary/canvas-base ≥4.5:1
               ink-inverse/signal-primary ≥4.5:1 | ink-inverse/canvas-inverse ≥7:1

Inject ALL tokens as CSS vars from Hygraph SiteConfig — never hardcode colors in components.
```

### Spacing

```
Section padding: 120px/64px desktop/mobile (major), 80px/48px (secondary)
Container: max-width 1280px, padding 1rem→2rem→4rem
```

---

## Phase 4 — Section Design: Every Section Is a Live Demo

### The Demo Design Process (Run For Every Section)

Before writing any component code, answer for each section:

```
1. WHAT IS THE FEATURE? (customer terms, not technical)
2. WHAT DOES IT LOOK LIKE ON SCREEN WHEN HAPPENING RIGHT NOW?
   Describe the actual UI — inputs, results, state changes
3. WHAT IS THE REAL DATA? (domain-authentic: product names, user names, timestamps)
4. WHAT IS THE COMPONENT NAME? e.g. SearchResultsDemo, TaskBoardDemo, OnboardingFlowDemo
   File: components/demos/[DescriptiveName]Demo.tsx
```

### Demo Component Lifecycle (Every Demo Follows This)

```
t=0–500ms    IDLE: empty inputs, neutral colors, no active states. Creates anticipation.
t=500–2000ms ACTIVATION: human-speed interaction — typing 40-60ms/char, natural pauses
t=2000–3500ms PROCESSING: loading states, progress, skeleton screens. Build suspense.
t=3500–5000ms RESULT: cascade-animate results in. Highlight key value. Satisfying payoff.
t=5000–7000ms HOLD: final state. Let user read. Don't rush.
t=7000ms+     RESET: smooth fade back to IDLE. Never a hard cut.
```

### IntersectionObserver Trigger Pattern (Standard for All Demos)

```typescript
const containerRef = useRef<HTMLDivElement>(null);
const started = useRef(false);

useEffect(() => {
  const el = containerRef.current;
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting && !started.current) {
        started.current = true;
        runDemo();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(el);
  return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

### Demo Quality Bar (Verify Before Finalizing)

```
✅ 3+ distinct visual states
✅ Realistic domain data — product names, real categories, authentic timestamps
✅ Product terminology in all labels and states
✅ Human-believable animation speed
✅ Clean smooth loop
✅ Visually self-contained — visitor understands product from demo alone
✅ Signal colors used consistently
✅ At least one "moment of delight" (counter tick-up, checkmark draw, bar fill)
❌ No Lorem ipsum | ❌ No generic icons as main visual | ❌ No diagram-style layouts
❌ No hard flash on loop | ❌ No auto-play before viewport entry
```

### Modern Design Patterns (Required: 1, 3, 6, 7, 8, 11, 12)

```
1.  BENTO GRID — mixed-size cards by feature importance. Never uniform grids.
2.  GLASSMORPHISM (dark only) — rgba(255,255,255,0.06), backdrop-blur(12px)
3.  GRADIENT MESH HERO — animated radial-gradient, never flat color. 12s+ cycle.
4.  TIGHT NEGATIVE SPACE — purposeful density, clear visual grouping
5.  TYPOGRAPHIC CONTRAST — display 700/800 vs body 300/400
6.  MICRO-INTERACTIONS — every button scale(0.97), card y:-4, input border→signal. NOTHING static.
7.  SECTION BG VARIATION — canvas-base → canvas-subtle → canvas-inverse → canvas-base. Never 3 same in a row.
8.  PILL BADGES — every section has eyebrow pill: rounded-full, signal-light bg, signal-primary text, caption size
9.  3D TILT (hero only) — perspective(1200px) rotateX(2deg) on hero demo stage
10. BORDERLESS ISLANDS — mix bordered and borderless content in same section
11. DEMO CHROME — hero and major demos have window chrome: 3 dots + product name
12. PROGRESSIVE DISCLOSURE — results arrive staggered (60-80ms each), never all at once
```

---

### Section Specifications

#### 1. HERO BLOCK — Full-Width Cinematic (MANDATORY FORMAT)

**Structure (top to bottom — NEVER two columns):**

```
[1] Eyebrow pill badge (centered)
[2] Headline — display size, centered, max 10 words
[3] Subheadline — text-lead, centered, max 2 lines, max 640px wide
[4] CTA row — centered, primary + ghost button, gap 12px
[5] Social proof strip — "X teams trust [ProductName]" or a key stat
[6] Separator line — 1px, border-subtle, full container width
[7] Full-width product demo stage — min-height 420px, border 1px border-subtle
    window chrome bar (3 dots + product name) at top
    project-specific hero demo component inside
```

**Hero Demo Stage — perspective tilt + gradient mesh bg:**

```tsx
// Background: animated gradient mesh (meshShift keyframe, 16s cycle)
// Stage: perspective(1200px) rotateX(2deg) — depth without distortion
// Chrome bar: 3 colored dots (ff5f57 / febc2e / 28c840) + centered product name
// Demo inside: shows the full product value loop in 8–12 second sequence
```

**Animation sequence:**

```
t=0      gradient mesh renders, stage scale(0.98)→(1.0)
t=150ms  eyebrow badge fades up
t=350ms  headline (word-by-word or full fade per design language)
t=600ms  subheadline fades up
t=800ms  CTA buttons scale-in spring
t=1000ms social proof strip fades up
t=1200ms stage border glows (box-shadow expand → contract)
t=1500ms hero demo starts first sequence
```

---

#### 2. LOGO STRIP — Social Proof

**Purpose:** Establishes credibility immediately after hero.

```
Single or dual-row infinite marquee, LEFT scroll at 30s duration.
Logo height 28–32px, grayscale(100%) opacity(0.5) default.
Hover: grayscale(0) opacity(1), transition 0.3s.
Fade mask both edges (64px).
Optional headline above: "Trusted by teams at [brand names]" — text-caption, ink-tertiary.
Background: canvas-subtle (1 step different from hero bg — creates separation).
```

---

#### 3. PROBLEM SECTION — The "Before" State

**Purpose:** Show the pain point as a live UI simulation. Make the visitor feel the problem.

```
Layout: two columns (text left, problem demo right) OR full-width cinematic "broken state" demo
Text side:
  - Eyebrow: "✦ THE PROBLEM" or "✦ SOUND FAMILIAR?"
  - Headline: describes the pain in the customer's words (bold, emotional)
  - 2–3 lines of empathy copy — NOT solution copy

Problem demo:
  - Shows the "broken" or "painful" state of the BEFORE version
  - Examples: a search returning 0 results, a dashboard showing outdated data,
    a workflow stuck on "pending", an inbox with 200 unread notifications
  - Use red/orange/muted colors to signal "wrong" state
  - Animate the frustration: retry spinners, empty states, error badges

IMPORTANT: This section has NO CTA. It should leave the visitor slightly
uncomfortable — that emotion creates motivation to read the next section.

Background: canvas-subtle (contrast from hero)
```

---

#### 4. FEATURES SECTION — Bento Grid

**Purpose:** Show all major features simultaneously in a visual grid.

```
Layout: 12-column CSS grid, desktop.
  HERO card (col-span 7, row-span 2): Primary feature — full demo component, 180–240px
  SECONDARY card (col-span 5): Second feature — medium demo, 140–180px
  SMALL cards (col-span 4 or 6): Supporting features — compact demo, 80–120px

Each card:
  [1] Live mini-demo component (auto-plays on viewport entry)
  [2] Feature name — text-h3, ink-primary
  [3] One benefit sentence — text-body, ink-secondary
  NOTHING ELSE — no bullet lists, no long descriptions

Hover: lift y:-6px, border → signal-light, demo intensifies/speeds up
Entry: stagger 60ms per card, left-to-right, top-to-bottom
Background: canvas-base (contrast from problem section above)

IMPORTANT: Every card must have a demo. A card with just text and an icon
is not acceptable. The mini-demo is the card.
```

**Mini-demo templates by feature type:**

```
SEARCH: input types query, skeleton → results cascade in, relevance bars
REALTIME SYNC: two panels updating simultaneously, "live" indicator pulses
ANALYTICS: chart bars rising from 0, numbers counting up
WORKFLOW/PIPELINE: stages lighting up in sequence, status badges flipping
AI/GENERATION: cursor blinks, text streams character by character
NOTIFICATIONS: cards sliding in from right, badge counter updating
FILE/UPLOAD: progress bar fills, file transforms, success checkmark draws
SETTINGS/CONFIG: form fields appear, toggle animates, "saved" confirmation
```

---

#### 5. HOW IT WORKS — ScrollPin Sticky Section

**Purpose:** Walk the visitor through the product workflow step by step using scroll.

```
LAYOUT:
  Outer wrapper: total height = (N steps × 100vh) — creates scroll space
  Inner sticky: height 100vh, position sticky top:0
  LEFT PANEL (35%): step list, active step text
  RIGHT PANEL (65%): product UI simulation that changes per step

LEFT PANEL:
  Eyebrow badge at top
  Section headline (text-h2)
  Numbered step list:
    - Inactive steps: number + step name, ink-tertiary
    - Active step: number (signal-primary circle), step name (text-h3, ink-primary),
      description (text-body, 2–3 lines max), animated underline indicator
  Vertical progress bar: thin 2px line, fills as steps advance, signal-primary color

RIGHT PANEL:
  Product demo stage (full panel height, rounded-xl, border border-subtle)
  Window chrome at top (3 dots + product name)
  Step UI component inside — DIFFERENT per step, realistic product screen
  Transition between steps: 400ms cross-fade + y:8→0

SCROLL BEHAVIOR:
  Each step = 100vh of scroll space
  useScroll + useTransform map scroll progress to step index
  On step change: left panel highlights new step, right panel transitions to new UI state

RIGHT PANEL UI STATES (each must look meaningfully different):
  Step 1: Empty/starting state of the product
  Step 2: User has provided input / configured something
  Step 3: System is processing / working
  Step 4: Output / result is shown
  Additional steps if workflow has more phases

IMPORTANT: Right panel must show ACTUAL product UI states — not diagrams.
Cards, inputs, tables, results — whatever the product actually shows.
```

---

#### 6. STATS BAND — Social Proof Through Numbers

**Purpose:** Prove scale and results with animated numbers.

```
Background: canvas-inverse (dark band — high contrast from surrounding light sections)
Layout: 3–4 stats in a row (desktop), 2×2 grid (mobile)

Per stat:
  Number: text-display size (80px+), ink-inverse, CountUp animation
  Label: text-caption, ink-inverse-2, centered below number
  Optional: small supporting text (1 line) explaining the stat's context

CountUp animation:
  Trigger: IntersectionObserver at 30% visibility
  Duration: 1.8s, easeOut curve
  Stagger: 150ms between stats
  After count: brief signal-primary glow (box-shadow 0 0 0 4px signal-primary, 300ms)

All stats MUST be sourced from:
  A) User's Round 2 answers
  B) Verified web research about the product category
  NEVER invent statistics. If unsure, research first.
```

---

#### 7. TESTIMONIALS — Social Proof Through People

**Purpose:** Show real humans getting real results.

```
MARQUEE LAYOUT (recommended):
  Two rows, opposite scroll directions (row 1 LEFT 40s, row 2 RIGHT 36s)
  pauseOnHover: both rows pause simultaneously
  Fade mask left + right edges (80px, canvas-base gradient)

Per card:
  Avatar circle (initials or photo placeholder, 40px)
  Name (text-body font-medium, ink-primary)
  Role + Company (text-caption, ink-secondary)
  Quote (italic, ink-secondary, 2–3 lines max)
  Card: canvas-subtle bg, border border-subtle, rounded-xl, padding 24px

MASONRY layout (for 6+ testimonials):
  Pinterest-style, varying heights, stagger reveal
  Left-border 3px signal-primary per card

If no real testimonials: generate 4–6 realistic placeholder quotes.
Quotes must be outcome-focused ("Our conversion rate went up 23% in the first week")
not feature-focused ("The search feature is really good").
```

---

#### 8. CTA SECTION — The Close

**Purpose:** Convert the now-informed, now-convinced visitor.

```
Background: canvas-inverse (dark stage)
Signal glow: radial-gradient(ellipse at top, rgba(signal,0.15), transparent 60%)
  positioned above the headline — creates a "spotlight" effect

Layout: centered column, max-width 640px
  Eyebrow badge (optional)
  Headline: text-h1, ink-inverse, max 10 words, names the OUTCOME not the action
  Subheadline: text-lead, ink-inverse-2, 1–2 lines, reinforces the headline
  CTA row: primary button (signal-primary, filled) + ghost button (border: white 30%)
  Trust signal below buttons: "Free 14-day trial · No credit card · Cancel anytime"

CTA copy rules:
  ✅ "Start finding products instantly →"
  ✅ "See [ProductName] in action — free"
  ❌ "Get started"
  ❌ "Sign up today"

Entry animation:
  Headline fades up → subheadline → buttons scale-in spring → trust signal fades
  Glow pulses once on entry (opacity 0→0.15→0.12, 1s)
```

---

#### 9. FEATURE DEEP-DIVE ROWS (For /features page or supplemental homepage section)

**Purpose:** Give each feature a full-width row with more depth.

```
Layout: alternating zigzag rows
  ODD rows:  TEXT left (45%), DEMO right (55%)
  EVEN rows: DEMO left (55%), TEXT right (45%)

Text side per row:
  Eyebrow badge (feature category)
  Feature name (text-h2)
  Bold benefit claim (1 sentence — the outcome)
  Supporting detail (2–3 lines, mechanism explained in customer language)
  Optional: 3–4 bullet points with check icons
  Optional: micro-CTA link "See how it works →"

Demo side per row:
  Full-height demo panel (min-height 320px, border, rounded-xl, canvas-subtle bg)
  Full live demo component — auto-starts on viewport entry
  Distinct from bento mini-demo — this is the full-fidelity version

Entry animation:
  Text side: x:-24→0, opacity 0→1, 0.5s
  Demo side: x:24→0, opacity 0→1, 0.5s, 120ms stagger after text
```

---

#### 10. FAQ SECTION (Reduces Pre-Signup Friction)

**Purpose:** Answer the 5–6 questions that stop people from converting.

```
Questions must be written as the customer would actually ask them:
  ✅ "How long does setup take?"
  ✅ "Does it work with my existing product catalog?"
  ❌ "What is the indexing latency?"

Layout: centered column, max-width 720px, accordion items
  Each item: question (text-h3, ink-primary) + answer (text-body, ink-secondary)
  Open/close: AnimatePresence, height 0→auto, 250ms ease.standard
  Icon: chevron rotates 0→180deg on open

Background: canvas-subtle

Minimum 5 questions. Questions sourced from:
  A) Common objections for this product category (research)
  B) Pricing/support questions
  C) Technical compatibility questions in customer language
```

---

#### 11. INTEGRATIONS SECTION (If applicable)

**Purpose:** Show the product fits into the customer's existing stack.

```
ORBIT DEMO (for 4–8 integrations):
  Center: product logo (pulsing glow)
  Surrounding: integration logos orbiting or connected by animated lines
  Connection lines: stroke-dashoffset animation, draws in on entry
  Each logo: appears with stagger, slight float animation

GRID (for 8+ integrations):
  Logo grid, grayscale default, color on hover
  "Works with [X] tools" headline above

Background: canvas-base
Copy: "[ProductName] connects to the tools your team already uses."
      List integration names in natural language: "Slack, Shopify, Salesforce, and 40+ more."
```

---

## Phase 5 — Hygraph Schema

### Foundation Models

```graphql
SiteConfig {
  productName String!, tagline String!
  primaryColor String!, primaryColorDark String!, secondaryColor String
  canvasBase String!, canvasSubtle String!, canvasInverse String!
  inkPrimary String!, inkSecondary String!
  borderSubtle String!, borderStrong String!
  designLanguage String!
  fontSans String!, fontBody String!, fontMono String
  logoLight Asset!, logoDark Asset!, favicon Asset!, socialShareImage Asset
  footerTagline String, copyrightText String!
  showSolvativeCredit Boolean!, solvativeCreditText String, solvativeCreditUrl String
  twitterUrl String, linkedinUrl String, githubUrl String, youtubeUrl String
  gtmId String, gaId String
}

Page {
  title String!, slug String!
  metaTitle String!, metaDescription String!, ogImage Asset, noIndex Boolean, canonicalUrl String
  blocks [ContentBlock!]!
  isPublished Boolean!
}

NavigationItem {
  label String!, url String!, isExternal Boolean
  showInHeader Boolean, showInFooter Boolean, footerGroup String, displayOrder Int!
}

ContactSubmission {
  fullName String!, email String!, company String, message String!
  source String, submittedAt DateTime!
  submissionStatus Enum[NEW, READ, REPLIED, ARCHIVED]  ← NOT "status" (reserved)
  adminNotes String
}
```

### Block Models (all include `id ID!` and `isVisible Boolean!`)

**CRITICAL: All shared field names (headline, subheadline, eyebrowLabel, demoType, etc.) must have IDENTICAL `isRequired` settings across ALL block models. Use nullable (non-required) for all shared fields to prevent GraphQL union validation errors.**

**`demoType` field:** Plain `String` (nullable) on every demo-bearing block. Values are project-specific strings decided in Phase 2 and stored in Hygraph. Examples: `"SEARCH_RESULTS"`, `"TASK_BOARD"`, `"LIVE_SYNC"`. Map to React components via switch statement.

### ContentBlock Union

Add ALL member types in ONE mutation (RULE 4). Never piece by piece.

Admin label pattern: `"[emoji] [Section Name]"` — e.g. `"🚀 Hero Section"`, `"✦ Problem Section"`

---

## Phase 6 — Project Generation (Zero-Error Startup)

### 404 Prevention Rules

```
Rule 1: Home page slug = "home". Route: app/(site)/page.tsx → fetches slug:"home"
Rule 2: Other pages: app/(site)/[slug]/page.tsx. generateStaticParams() excludes "home"
Rule 3: /contact follows [slug] pattern — NOT a special route
Rule 4: generateStaticParams() returns [] on CMS error — build always succeeds
Rule 5: Every page.tsx: try/catch around fetch. On error: console.error + notFound()
Rule 6: PUBLISH ALL RECORDS after seeding. Unpublished = invisible to Content API = 404
```

### Hygraph Client — Env-Based, No Hardcoded Secrets

```typescript
// lib/hygraph/client.ts
import { GraphQLClient } from "graphql-request";

// All secrets come from env — never hardcoded
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
if (!endpoint)
  throw new Error("NEXT_PUBLIC_HYGRAPH_ENDPOINT not set. Check .env.local");

// Public read-only client — Server Components only
export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
  },
  next: { revalidate: 60 }
});

// Server-side write client — API routes only, NEVER exposed to browser
export const hygraphMutationClient = new GraphQLClient(endpoint, {
  headers: { Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}` }
});
```

### App Structure (Correct Query Pattern)

```typescript
// CORRECT: always use plural query + first:1
const { pages } = await hygraphClient.request(GET_PAGE, { slug: "home" });
const page = pages?.[0]; // ← read [0], never data.page

// WRONG: singular query fails if slug not @unique in schema
// const { page } = await hygraphClient.request(GET_PAGE, { slug: 'home' }) ❌

// CORRECT: inline fragments — never named fragments (causes union field conflict errors)
// ... on HeroBlock { headline }        ✅
// fragment HeroFields on HeroBlock     ❌
```

### Contact Form API Route

```typescript
// app/api/contact/route.ts
// MUST store submissions in Hygraph via createContactSubmission mutation
// MUST use hygraphMutationClient (server-only)
// Field: submissionStatus NOT status (Hygraph reserved word)
// After create: do NOT publish ContactSubmission — stays in DRAFT (admin reads via dashboard)

const mutation = gql`
  mutation CreateSubmission($data: ContactSubmissionCreateInput!) {
    createContactSubmission(data: $data) {
      id
    }
  }
`;
// data includes: fullName, email, company, message, submittedAt, submissionStatus: NEW
```

---

## Phase 6b — Hygraph End-to-End Verification: STRICT MANDATORY PROTOCOL

> **This is the most important phase. The task is NOT complete until every test below passes. "Complete" means the frontend is 100% driven by Hygraph — no hardcoded content, no static fallbacks, no mock data. If any test fails, fix the root cause and re-run the full suite from Test 1.**

### The Headless CMS Contract

This skill produces a **headless CMS marketing site**. That means:

- **Every visible string on every page comes from Hygraph.** Not a single headline, button label, nav item, footer line, or section description is hardcoded in JSX.
- **Every page route is backed by a Hygraph Page record.** There are no Next.js pages that render without fetching from Hygraph first.
- **Every contact form submission creates a Hygraph ContactSubmission record.** No email-only fallback. No third-party form service. Hygraph is the single source of truth.
- **Every CSS color and font token comes from Hygraph SiteConfig.** Components use CSS variables injected at runtime from CMS data — not hardcoded hex values.

Violating any of the above means the CMS integration is incomplete. The task is not done.

---

### Pre-Test Checklist (Run Before Starting the Test Suite)

Before running any test, confirm all of these are true:

```
□ pnpm install — no errors
□ pnpm typecheck — zero TypeScript errors
□ pnpm lint — zero ESLint errors
□ pnpm build — successful Next.js build
□ .env.local has all 4 vars: NEXT_PUBLIC_HYGRAPH_ENDPOINT, NEXT_PUBLIC_HYGRAPH_TOKEN,
  HYGRAPH_MUTATION_TOKEN, HYGRAPH_MANAGEMENT_ENDPOINT
□ All Hygraph records were published (publishX mutations ran after seeding)
□ No hardcoded strings visible in any .tsx file (grep for any visible text in JSX)
```

If any pre-test item fails → fix before running tests. Do not run tests against a broken build.

---

### The Test Suite — 15 Tests. All Must Pass.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 HYGRAPH FULL-STACK INTEGRATION TEST SUITE — v6
 Run in order. Fix failures immediately. All 15 must pass.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─── GROUP A: SCHEMA & DATA INTEGRITY ───────────────────────

TEST A1 — Schema Existence
  Method: GraphQL introspection via direct HTTP POST to Content API endpoint
  Query:  { __schema { types { name } } }
  PASS:   The following type names are ALL present in the response:
          SiteConfig, Page, NavigationItem, ContactSubmission,
          HeroBlock, [all other block models created in Phase 5],
          ContentBlock (the union type)
  FAIL:   Any expected type missing
  Fix:    Re-run Phase 0.5 schema setup (idempotent — safe). Poll every migration
          to SUCCESS. Confirm union includes all member types. Re-test.

TEST A2 — All Records Published
  Method: Query Content API without stage: DRAFT filter
  Queries:
    { pages { id title slug isPublished } }
    { siteConfigs { id productName } }
    { navigationItems { id label } }
  PASS:   pages array has at least 2 records (home + contact)
          siteConfigs array has exactly 1 record with productName populated
          navigationItems array has at least 2 records
  FAIL:   Any array is empty, or records missing
  Fix:    For each missing record type: run publishX(where:{id:"..."}, to:PUBLISHED)
          Verify by re-running the query. Repeat until all non-empty.

TEST A3 — Block Records Attached to Pages
  Method: Query home page with all block fields
  Query:
    { pages(where: { slug: "home" }, first: 1) {
        id slug isPublished
        blocks {
          __typename
          ... on HeroBlock { id headline isVisible }
          ... on StatsBlock { id isVisible }
          [inline fragment for every block type on home page]
        }
    } }
  PASS:   pages[0] exists, slug === "home", isPublished === true,
          blocks array has 7+ items, every block has __typename populated,
          HeroBlock headline is non-null and non-empty
  FAIL:   Empty blocks array, or fewer than 7 blocks, or null headlines
  Fix:    Re-seed blocks. Re-connect blocks to page via updatePage(data:{blocks:{connect:[...]}}).
          Publish page again. Re-test.

TEST A4 — All Block Content Fields Populated
  Method: Fetch full home page with ALL block field fragments
  For each block in the response:
    Check: headline/title field is non-null and non-empty string
    Check: isVisible is true (unless intentionally hidden)
    Check: demoType is non-null if block is a demo-bearing type
  PASS:   Every block has at minimum a populated headline and isVisible: true
  FAIL:   Any block has null/empty headline or missing demoType
  Fix:    Update that specific block record in Hygraph with the missing data.
          Publish the block. Re-test A3 and A4.

TEST A5 — SiteConfig Token Completeness
  Method: Query all SiteConfig fields
  Query:
    { siteConfigs(first: 1) {
        productName tagline
        primaryColor primaryColorDark canvasBase canvasSubtle canvasInverse
        inkPrimary inkSecondary borderSubtle
        fontSans fontBody
        designLanguage
        copyrightText showSolvativeCredit
    } }
  PASS:   All fields above are non-null. primaryColor matches format #[0-9a-fA-F]{6}.
          fontSans and fontBody are different values (never the same font).
  FAIL:   Any null field, or fontSans === fontBody
  Fix:    Update SiteConfig record with missing fields. Publish. Re-test.

TEST A6 — All Page Slugs Registered
  Method: Query all pages
  Query:  { pages { id title slug isPublished } }
  PASS:   Every page defined in the architecture proposal exists as a record.
          All have isPublished: true. Home slug is exactly "home".
          Contact slug is exactly "contact". No slug is null or empty.
  FAIL:   Missing page, wrong slug, or isPublished: false
  Fix:    Create missing page records. Fix slug values. Publish. Re-test.

─── GROUP B: FRONTEND RENDERING ────────────────────────────

TEST B1 — Home Page Renders (No 404, No Blank Page)
  Method: pnpm dev → open http://localhost:3000
  PASS:   HTTP 200. Page title in browser tab matches productName from Hygraph.
          Hero section is visible with headline text.
          At least 7 sections visible on scroll.
          No JavaScript errors in browser console.
          No "undefined" or "[object Object]" visible anywhere on page.
  FAIL VARIANTS:
    404 → home page slug is not "home", or page not published, or GET_PAGE query broken
    Blank/white page → SiteConfig fetch failed (check console.error), or CSS vars empty
    Sections missing → blocks isVisible: false, or blocks not connected to page
    "undefined" text → component renders field before data arrives (add null checks)
  Fix:    Per variant above. Re-run until all pass.

TEST B2 — All Seeded Pages Render (No 404)
  Method: For each page slug in Hygraph (other than "home"):
          open http://localhost:3000/[slug]
  PASS:   Every page returns HTTP 200. Every page shows its Hygraph content.
          No page returns 404. No page shows blank content.
  FAIL:   Any slug returns 404 or blank
  Fix:    Verify generateStaticParams() returns that slug.
          Verify page record is published.
          Verify [slug]/page.tsx uses pages(where:{slug:$slug}, first:1) correctly.
          Re-run next build if using static generation. Re-test.

TEST B3 — CSS Variables Applied From Hygraph
  Method: Open http://localhost:3000 in browser.
          DevTools → Elements → select <html> element → Computed tab → filter "css-"
  PASS:   All of these CSS variables are present and non-empty:
          --canvas-base, --canvas-subtle, --canvas-inverse
          --signal-primary, --signal-hover, --signal-light
          --ink-primary, --ink-secondary, --ink-tertiary
          --font-sans, --font-body
          Values must match what was seeded in SiteConfig (verify by comparing hex values)
  FAIL:   Variables missing, empty, or show browser defaults
  Fix:    Verify layout.tsx fetches SiteConfig and injects vars into <html style={{...}}>.
          Verify SiteConfig fetch returns data (add console.error logging if null).
          Re-test.

TEST B4 — Navigation Links From Hygraph
  Method: Open http://localhost:3000. Inspect the header navigation.
  PASS:   Nav links match NavigationItem records in Hygraph (same labels, same URLs).
          Clicking each nav link navigates correctly (no 404).
          Footer links match NavigationItems where showInFooter: true.
  FAIL:   Nav shows hardcoded links, wrong labels, or wrong URLs
  Fix:    Verify layout.tsx fetches NavigationItems and passes to Header component.
          Verify Header renders from data array, not hardcoded JSX.
          Re-test.

TEST B5 — Zero Hardcoded Content in JSX (Source Audit)
  Method: Search all .tsx files for visible customer-facing strings hardcoded in JSX.
  Run:    grep -r ">[A-Z][a-z]" src/components/blocks/ --include="*.tsx"
          grep -r ">[A-Z][a-z]" src/app/ --include="*.tsx"
  PASS:   No customer-visible text strings found hardcoded in JSX.
          All text comes from props fed by Hygraph data.
          Only UI chrome strings (aria labels, "..." placeholders) are acceptable.
  FAIL:   Any headline, button label, section description found hardcoded
  Fix:    Move hardcoded string to Hygraph as a field.
          Fetch it from CMS. Pass as prop. Remove hardcoded string.
          Re-test B5.

TEST B6 — ISR Content Update Propagation
  Method:
    1. Note the current hero headline shown at http://localhost:3000
    2. In Hygraph CMS: edit the HeroBlock headline → change to a unique test string
    3. Click "Publish" in Hygraph
    4. Wait 65 seconds (ISR revalidate: 60 + buffer)
    5. Hard-reload http://localhost:3000 (Ctrl+Shift+R)
  PASS:   Updated headline is now visible on page. Old headline gone.
  FAIL:   Old headline still showing after 65s
  Fix:    Verify hygraphClient has next: { revalidate: 60 }
          Verify NEXT_PUBLIC_HYGRAPH_TOKEN has read permission on updated content.
          Verify the published stage query returns updated data:
            { pages(where:{slug:"home"},first:1) { blocks { ... on HeroBlock { headline } } } }
          Re-test.

─── GROUP C: CONTACT FORM → HYGRAPH RECORDS ────────────────

TEST C1 — Contact Form Submits Successfully
  Method:
    1. Open http://localhost:3000/contact
    2. Fill form: Name="Test User", Email="test@example.com",
       Company="Test Co", Message="This is a test submission [timestamp]"
    3. Click submit button
  PASS:   Button shows loading state during submission.
          Success state appears (checkmark + success message from Hygraph CMS).
          No JavaScript errors in console.
          Network tab shows POST /api/contact returning 200 with { success: true }
  FAIL:   Error state shown, or network shows 4xx/5xx
  Fix:    Check /api/contact/route.ts exists.
          Check HYGRAPH_MUTATION_TOKEN is set in .env.local.
          Check Zod validation is not rejecting the payload.
          Check createContactSubmission mutation field names (submissionStatus not status).
          Fix and re-submit.

TEST C2 — Submission Record Exists in Hygraph
  Method: After TEST C1 passes, query Hygraph for the record:
  Query (run via direct HTTP with HYGRAPH_MUTATION_TOKEN):
    { contactSubmissions(orderBy: submittedAt_DESC, first: 5) {
        id fullName email company message submittedAt submissionStatus
    } }
  PASS:   The test submission from C1 appears as the most recent record.
          fullName === "Test User", email === "test@example.com"
          submissionStatus === NEW
          submittedAt is a valid ISO datetime (not null)
          message contains the test string submitted in C1
  FAIL:   Record not found, or fields are null/wrong
  Fix:    If record not found: mutation did not execute. Check /api/contact server logs.
          If submissionStatus is null: field named wrong in mutation (use submissionStatus).
          If submittedAt is null: add submittedAt: new Date().toISOString() to mutation input.
          Fix, resubmit form, re-query, re-test.

TEST C3 — Multiple Submissions Create Separate Records
  Method:
    1. Submit the contact form a second time with different data:
       Name="Second User", Email="second@example.com", Message="Second test [timestamp]"
    2. Query Hygraph:
       { contactSubmissions(orderBy: submittedAt_DESC, first: 5) { id fullName email } }
  PASS:   Two separate records exist — "Test User" AND "Second User".
          Each has a unique id. No records were overwritten.
  FAIL:   Only one record, or second submission overwrote first
  Fix:    Verify mutation uses createContactSubmission (not upsert or update).
          Re-test C1 and C2 after fix.

TEST C4 — Contact Form Field Validation (Frontend)
  Method: Submit the form with invalid data:
    - Empty name field → submit
    - Invalid email (no @ symbol) → submit
  PASS:   Form does NOT submit. Validation errors shown inline per field.
          Error styling applied (red border, error message text).
          No network request sent for invalid submissions.
  FAIL:   Invalid data submitted to API, or no error messages shown
  Fix:    Verify react-hook-form + Zod schema validates fields before submission.
          Verify error message text comes from Hygraph (not hardcoded).
          Re-test.

TEST C5 — API Route Rejects Bad Payloads (Server Validation)
  Method: Send a malformed POST to /api/contact directly:
    curl -X POST http://localhost:3000/api/contact \
      -H "Content-Type: application/json" \
      -d '{"fullName":"","email":"not-an-email","message":""}'
  PASS:   API returns 400 with { error: "Validation failed" } or similar.
          No ContactSubmission record created in Hygraph for this bad payload.
  FAIL:   API returns 200, or creates a record with empty/invalid fields
  Fix:    Add Zod .parse() on the request body before the Hygraph mutation.
          Return 400 on ZodError. Re-test.

─── FINAL GATE ─────────────────────────────────────────────

TEST GATE — All Tests Pass Confirmation

  Before marking the task as complete, Claude must output this block
  with every checkbox confirmed:

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HYGRAPH INTEGRATION VERIFICATION REPORT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [A1] Schema existence              ✅ PASS
  [A2] All records published         ✅ PASS
  [A3] Blocks attached to pages      ✅ PASS
  [A4] All block fields populated    ✅ PASS
  [A5] SiteConfig token completeness ✅ PASS
  [A6] All page slugs registered     ✅ PASS
  [B1] Home page renders             ✅ PASS
  [B2] All pages render (no 404)     ✅ PASS
  [B3] CSS vars from Hygraph         ✅ PASS
  [B4] Nav links from Hygraph        ✅ PASS
  [B5] Zero hardcoded content        ✅ PASS
  [B6] ISR update propagates         ✅ PASS
  [C1] Contact form submits          ✅ PASS
  [C2] Record exists in Hygraph      ✅ PASS
  [C3] Multiple records separate     ✅ PASS
  [C4] Frontend validation works     ✅ PASS
  [C5] API rejects bad payloads      ✅ PASS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  All 17 tests passed. Hygraph integration verified.
  Frontend content is 100% CMS-driven. Task complete.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  If ANY test shows ❌ — the task is NOT complete.
  Fix the failure, re-run that test group, re-confirm.
  Do not output "Task complete" with any ❌ present.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Test Failure Protocol — Quick Reference

| Test | Most Common Cause                 | Quick Fix                                           |
| ---- | --------------------------------- | --------------------------------------------------- |
| A1   | Schema creation failed silently   | Re-run Phase 0.5, poll migrations to SUCCESS        |
| A2   | Forgot to publish after seeding   | Run publishX for every record type                  |
| A3   | Blocks not connected to page      | updatePage with blocks:{connect:[ids]}              |
| A4   | Seeding mutation missed fields    | Update specific block record, publish               |
| A5   | SiteConfig seeded with nulls      | Update all SiteConfig fields, publish               |
| A6   | Page slug typo or not created     | Create/fix page record, publish                     |
| B1   | Slug mismatch or not published    | Verify slug="home" and isPublished:true             |
| B2   | generateStaticParams missing slug | Verify query returns all slugs, rebuild             |
| B3   | layout.tsx not injecting vars     | Add style={{--var:value}} to <html> from siteConfig |
| B4   | Nav hardcoded in Header           | Fetch NavigationItems, map to nav links             |
| B5   | Strings hardcoded in JSX          | Move every string to Hygraph field                  |
| B6   | revalidate not set                | Add next:{revalidate:60} to hygraphClient           |
| C1   | /api/contact route missing        | Create route.ts with createContactSubmission        |
| C2   | Wrong field name in mutation      | Use submissionStatus not status                     |
| C3   | Using upsert instead of create    | Use createContactSubmission only                    |
| C4   | No frontend validation            | Add Zod schema + react-hook-form resolver           |
| C5   | No server-side validation         | Add zod.parse() before mutation, return 400         |

---

## Phase 7 — Code Standards

```
components/blocks/*.tsx      ≤ 200 lines
components/demos/*.tsx       ≤ 350 lines
components/ui/*.tsx          ≤ 80 lines
app/**/page.tsx              ≤ 80 lines
app/**/layout.tsx            ≤ 100 lines
Any function                 ≤ 40 lines
```

```json
// tsconfig.json
{ "compilerOptions": { "strict": true, "noUnusedLocals": true, "noUnusedParameters": true,
  "noImplicitReturns": true, "forceConsistentCasingInFileNames": true } }

// .eslintrc
{ "extends": ["next/core-web-vitals","next/typescript"],
  "rules": { "@typescript-eslint/no-explicit-any": "error", "no-console": ["warn",{"allow":["error"]}],
    "@typescript-eslint/no-unused-vars": "error", "prefer-const": "error" } }

// prettier
{ "semi": false, "singleQuote": true, "trailingComma": "es5", "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"] }
```

**Startup guarantee:** `pnpm install && pnpm typecheck && pnpm lint && pnpm build && pnpm start` — all must pass.

---

## Phase 8 — Final Delivery Checklist

### Hygraph Setup ✓

- [ ] Test 1–10 (Phase 6b) all passing
- [ ] Schema created with batched mutations, polled to SUCCESS
- [ ] All records published to PUBLISHED stage
- [ ] SiteConfig seeded with all color + font tokens
- [ ] Home page slug is exactly "home"
- [ ] All block content seeded — product-specific, no Lorem ipsum
- [ ] ContactSubmission model uses `submissionStatus` not `status`
- [ ] showSolvativeCredit, solvativeCreditText, solvativeCreditUrl seeded
- [ ] All secrets in .env.local only — never hardcoded in source

### Code: Zero-Error Startup ✓

- [ ] Page queries use `pages(where:{slug:$slug}, first:1)` — never singular `page`
- [ ] All internal links use `<Link>` never `<a href="/">`
- [ ] body uses `--font-body`, headings use `--font-sans` — separate vars
- [ ] Unused imports removed (TypeScript strict fails build otherwise)
- [ ] CSS vars injected from Hygraph SiteConfig in layout.tsx
- [ ] /api/contact → Hygraph createContactSubmission → submissionStatus: NEW

### Design: UI-Demo-First ✓

- [ ] Homepage has 7–8 sections minimum (Hero, Logo, Problem, Features, How It Works, Stats, Testimonials, CTA)
- [ ] Hero is full-width vertical stack — NEVER two columns
- [ ] Hero demo stage spans full container width, min-height 420px, window chrome present
- [ ] Every section has a live animated UI component — no static icons
- [ ] Problem section shows "before" broken state with emotional tension
- [ ] Features bento grid: mixed sizes, each card has live mini-demo
- [ ] How It Works: ScrollPin sticky section, UI changes per step
- [ ] Stats band: dark background, CountUp animations
- [ ] Testimonials: dual-row marquee
- [ ] CTA: dark stage, outcome-named headline, glow effect
- [ ] All demos: idle→processing→result→hold→reset lifecycle
- [ ] All demos trigger on IntersectionObserver (not page load)
- [ ] Patterns 1, 3, 6, 7, 8, 11, 12 applied
- [ ] Section backgrounds alternate (never 3 same-color adjacent)
- [ ] Gradient mesh behind hero animates (12s+ cycle)

### Content Alignment ✓

- [ ] Every headline passes Reframe Test
- [ ] Zero technology mentions in customer-facing copy
- [ ] Demo data uses real domain vocabulary
- [ ] All stats sourced from user input or research
- [ ] CTA copy names customer outcomes, not actions

### SEO ✓

- [ ] generateMetadata() on every page.tsx (data from Hygraph)
- [ ] Open Graph tags on every page
- [ ] next-sitemap generates sitemap.xml + robots.txt

### Accessibility ✓

- [ ] WCAG AA (4.5:1) on all text/bg combinations
- [ ] prefers-reduced-motion respected in all animations
- [ ] Demo components: aria-hidden="true"
- [ ] Focus rings on all interactive elements
- [ ] Semantic heading hierarchy per page

---

## Phase 9 — Technical Lessons Learned (Production-Verified)

```
QUERY PATTERN:   pages(where:{slug:$slug}, first:1) + data.pages?.[0]  — NEVER singular page()
FRAGMENTS:       Inline only: ... on HeroBlock { headline }  — NEVER named fragments
FIELD TYPES:     All shared fields (headline, subheadline, demoType) MUST be nullable on all block models
PUBLISHING:      Every created record needs publishX() call — DRAFT = invisible to Content API
RESERVED WORDS:  Use submissionStatus not status in ContactSubmission
LINKS:           <Link href="/"> not <a href="/"> — ESLint build error otherwise
FONTS:           --font-body for body, --font-sans for display — NEVER same var for both
IMPORTS:         Remove all unused imports — TypeScript strict fails build
USEEFFECT DEPS:  Animation functions called once: add eslint-disable-next-line react-hooks/exhaustive-deps
MCP AUTH:        Permanent tokens = TokenViewer, not UserViewer — use projectByIdentifier wrapper
FIELD UUIDS:     Management API uses modelId (UUID), not modelApiId — introspect UUIDs first
MIGRATIONS:      Always async — poll status every 1s until SUCCESS before next mutation
SEEDING:         Direct HTTP POST with GraphQL aliases — faster than MCP for content records
CONTACT FORM:    hygraphMutationClient server-only — NEVER import in client components
```

---

## Notes for Claude

- **Never start generating code before Phases 0 and 1 are complete**
- **Both Hygraph connection tests (direct HTTP + MCP) must pass before schema work**
- **Run all 10 Phase 6b tests before delivery — fix every failure before shipping**
- **Homepage = minimum 7 sections. Fewer sections = incomplete product story**
- **Hero = full-width vertical stack. Non-negotiable. Never two columns.**
- **Every section has a live animated UI demo. Static icons are not acceptable.**
- **Problem section is mandatory — show the pain, not just the solution**
- **Design language auto-selected — announce in one sentence, proceed immediately**
- **All secrets in .env.local only — enforce in every generated file**
- **Hygraph MCP is the exclusive interface for schema management throughout execution**
- **Content seeding uses direct HTTP POST for speed, not MCP**
- **After seeding, publish ALL records — unpublished records cause 404s**
- **Solvative credit is fully CMS-controlled — never hardcoded**
- **Union shared fields must be nullable — enforce before building ContentBlock union**
- **Body font and display font are separate CSS variables — never share one var for both**
- **Skill adoption is silent — merge attached skill files without announcing**
