---
name: solvative-create-deck
description: This skill should be used when the user asks to "create a presentation", "create a deck", "make slides", "build a PPTX", "generate a presentation", or wants to produce a Solvative-branded deck for a client or internal audience. It generates polished, Google Slides-compatible PPTX files through conversational questioning, in-depth research, outline approval, and a 20-slide type template library in the Solvative design language.
version: 1.1.0
---

# Create Solvative Deck

This skill generates polished Solvative-branded PPTX presentation decks.

It follows a five-phase process: **question → research → outline → generate → iterate**.

All output uses Poppins, solid fills only, and the Solvative color palette — ensuring zero fidelity loss when the PPTX is imported into Google Slides.

---

## Quick Reference

- **Output:** `YYYY-MM-DD-<deck-name>.pptx` in current working directory
- **Slide size:** 13.333" × 7.5" (16:9 widescreen)
- **Font:** Poppins (all weights)
- **Slides:** 20 types — see Slide Library below
- **Iteration:** Unlimited — request changes and Claude regenerates

---

## Python Design System Constants

Every generated script starts with these exact imports and constants. Copy them verbatim — never change the color values or font name.

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
import os
import requests
from io import BytesIO
from datetime import date

# ── Color palette (Solvative brand) ──────────────────────────
DARK_TEAL   = RGBColor(0x00, 0x21, 0x25)  # #002125 — dark backgrounds
PRIMARY     = RGBColor(0x01, 0x5C, 0x65)  # #015C65 — primary brand teal
TEAL        = RGBColor(0x00, 0x6D, 0x77)  # #006D77 — teal accent
YELLOW      = RGBColor(0xFF, 0xC4, 0x00)  # #FFC400 — accents, CTAs
WHITE       = RGBColor(0xFF, 0xFF, 0xFF)
TEXT_DARK   = RGBColor(0x10, 0x18, 0x28)  # #101828 — headings on white
TEXT_BODY   = RGBColor(0x37, 0x41, 0x51)  # #374151 — body text on white
TEXT_MUTED  = RGBColor(0x6B, 0x72, 0x80)  # #6B7280 — captions, labels
TEAL_LIGHT  = RGBColor(0xEE, 0xF4, 0xF5)  # #EEF4F5 — card backgrounds (brand)
YELLOW_BG   = RGBColor(0xFF, 0xF8, 0xDC)  # callout background
YELLOW_BDR  = RGBColor(0xFF, 0xE5, 0x66)  # callout border
CALLOUT_TXT = RGBColor(0x5C, 0x47, 0x00)  # dark amber — callout body
CALLOUT_LBL = RGBColor(0x92, 0x70, 0x0A)  # mid amber — callout label
MUTED_DARK  = RGBColor(0x66, 0x77, 0x77)  # muted text on dark slides
ROW_ALT     = RGBColor(0xF0, 0xF7, 0xF7)  # alternating row tint
DIVIDER     = RGBColor(0xD1, 0xE5, 0xE5)  # horizontal rule on white

# ── Slide dimensions ─────────────────────────────────────────
W    = Inches(13.333)
H    = Inches(7.5)
FONT = "Poppins"

TODAY = date.today().strftime("%B %Y")   # e.g. "March 2026"
```

---

## Python Helper Functions

Every generated script includes these helpers before any slide builder function. Copy them verbatim.

```python
# ── Core helpers ─────────────────────────────────────────────

def new_prs():
    prs = Presentation()
    prs.slide_width  = W
    prs.slide_height = H
    return prs

def blank_slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])  # blank layout

def set_bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_rect(slide, left, top, width, height, fill_color,
             border_color=None, border_width=Pt(0)):
    shape = slide.shapes.add_shape(1, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb  = border_color
        shape.line.width      = border_width
    else:
        shape.line.fill.background()
    return shape

def add_tb(slide, text, left, top, width, height,
           size=Pt(14), bold=False, italic=False,
           color=WHITE, align=PP_ALIGN.LEFT, wrap=True):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf    = txBox.text_frame
    tf.word_wrap = wrap
    p   = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text           = text
    run.font.name      = FONT
    run.font.size      = size
    run.font.bold      = bold
    run.font.italic    = italic
    run.font.color.rgb = color
    return txBox

def yellow_rule(slide, left, top, width=Inches(0.55)):
    add_rect(slide, left, top, width, Pt(4), YELLOW)

def add_slide_number(slide, num, total):
    """Bottom-right corner number. Skip on Cover (num=1) and Thank You (num=total)."""
    if num == 1 or num == total:
        return
    add_tb(slide, f"{num}",
           W - Inches(0.9), H - Inches(0.38),
           Inches(0.7), Inches(0.28),
           size=Pt(9), color=TEXT_MUTED, align=PP_ALIGN.RIGHT)

LOGO_PNG = "/tmp/solvative-logo.png"  # transparent bg — download once at start of session

def _ensure_logo():
    """Download and cache the official Solvative logo PNG if not already present."""
    import os, requests
    from io import BytesIO
    if not os.path.exists(LOGO_PNG):
        r = requests.get(
            "https://solvative.com/_next/static/media/solvative-logo.d15f1b37.svg",
            timeout=8)
        # Convert SVG → PNG via rsvg-convert (requires librsvg: brew install librsvg)
        import subprocess, tempfile
        with tempfile.NamedTemporaryFile(suffix=".svg", delete=False) as f:
            f.write(r.content)
            svg_path = f.name
        subprocess.run(["rsvg-convert", "-w", "440", "-h", "92",
                        svg_path, "-o", LOGO_PNG], check=True)

def no_shadow(shape):
    """Explicitly disable all shadow/glow effects on a shape."""
    from lxml import etree
    spPr = shape._element.spPr
    for tag in [qn('a:effectLst'), qn('a:effectDag')]:
        el = spPr.find(tag)
        if el is not None:
            spPr.remove(el)
    etree.SubElement(spPr, qn('a:effectLst'))

def add_logo_solvative_dark(slide):
    """White rounded-rectangle pill with official Solvative logo — for dark background slides."""
    _ensure_logo()
    pill_w, pill_h = Inches(2.5), Inches(0.56)
    pill_x, pill_y = Inches(0.45), Inches(0.18)
    shape = slide.shapes.add_shape(5, pill_x, pill_y, pill_w, pill_h)
    shape.fill.solid(); shape.fill.fore_color.rgb = WHITE; shape.line.fill.background()
    no_shadow(shape)
    prstGeom = shape._element.spPr.find(qn('a:prstGeom'))
    if prstGeom:
        avLst = prstGeom.find(qn('a:avLst'))
        if avLst:
            for gd in avLst.findall(qn('a:gd')):
                if gd.get('name') == 'adj': gd.set('fmla', 'val 50000')
    img_w = Inches(1.95)
    # Pass width only — python-pptx auto-calculates height to preserve aspect ratio (no skew)
    pic = slide.shapes.add_picture(LOGO_PNG,
        pill_x + (pill_w - img_w) / 2,
        pill_y + Inches(0.09),
        img_w)
    no_shadow(pic)

def add_logo_solvative_light(slide):
    """Official Solvative logo top-right, no container — for light background slides."""
    _ensure_logo()
    img_w = Inches(2.4)
    # Pass width only — height auto-calculated from aspect ratio
    pic = slide.shapes.add_picture(LOGO_PNG,
        W - img_w - Inches(0.45), Inches(0.14), img_w)
    no_shadow(pic)

def add_logo_client(slide, client_logo):
    """
    Add client logo top-right.
    client_logo: URL string, local file path string, or None.
    Always placed in a white pill at top-right corner.
    """
    pill_w, pill_h = Inches(2.2), Inches(0.46)
    pill_x = W - pill_w - Inches(0.45)
    pill_y = Inches(0.22)
    add_rect(slide, pill_x, pill_y, pill_w, pill_h, WHITE)

    img_added = False
    if client_logo:
        if client_logo.startswith("http"):
            try:
                r = requests.get(client_logo, timeout=6)
                r.raise_for_status()
                slide.shapes.add_picture(
                    BytesIO(r.content),
                    pill_x + Inches(0.12), pill_y + Inches(0.06),
                    Inches(1.96), Inches(0.34))
                img_added = True
            except Exception:
                pass
        elif os.path.exists(client_logo):
            try:
                slide.shapes.add_picture(
                    client_logo,
                    pill_x + Inches(0.12), pill_y + Inches(0.06),
                    Inches(1.96), Inches(0.34))
                img_added = True
            except Exception:
                pass

    if not img_added:
        label = (client_logo or "CLIENT LOGO")[:18].upper()
        add_tb(slide, label,
               pill_x, pill_y, pill_w, pill_h,
               size=Pt(9), bold=True, color=DARK_TEAL, align=PP_ALIGN.CENTER)
```

---

## Slide Library

> **For Claude generating a deck:** Copy each relevant slide builder function below, fill in the actual content, assemble in `main()`, call `prs.save(output_path)`.

---

### 1. Cover

Dark teal background. Solvative logo pill top-left. Client logo pill top-right. Eyebrow label, large title, yellow rule, subtitle, bottom bar.

```python
def slide_cover(prs, slide_num, total, title, subtitle,
                eyebrow="DISCOVERY SESSION", client_logo=None):
    slide = blank_slide(prs)
    set_bg(slide, DARK_TEAL)

    add_logo_solvative_dark(slide)
    add_logo_client(slide, client_logo)

    add_tb(slide, eyebrow,
           Inches(0.6), Inches(1.85), Inches(10), Inches(0.38),
           size=Pt(10), bold=True, color=YELLOW)

    add_tb(slide, title,
           Inches(0.6), Inches(2.35), Inches(11.8), Inches(1.7),
           size=Pt(64), bold=True, color=WHITE, wrap=True)

    yellow_rule(slide, Inches(0.6), Inches(4.3))

    add_tb(slide, subtitle,
           Inches(0.6), Inches(4.6), Inches(9), Inches(1.2),
           size=Pt(20), color=RGBColor(0xCC, 0xCC, 0xCC), wrap=True)

    add_tb(slide, f"Prepared by Solvative · {TODAY}",
           Inches(0.6), Inches(6.9), Inches(5.5), Inches(0.4),
           size=Pt(11), color=MUTED_DARK)
    add_tb(slide, "Confidential",
           Inches(10.0), Inches(6.9), Inches(3.0), Inches(0.4),
           size=Pt(11), color=MUTED_DARK, align=PP_ALIGN.RIGHT)
    # No slide number on cover
```

---

### 2. Agenda

Dark teal header bar with logo + session label. 2×N grid of agenda items. Each item: number badge, title, description, duration. Last item uses dark teal card (closing stop).

```python
def slide_agenda(prs, slide_num, total, items, session_label="TODAY'S SESSION"):
    """
    items: list of dicts:
      { "num": "1", "title": "...", "desc": "...", "time": "10 min",
        "yellow_badge": True/False, "is_last": False }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)

    # Dark teal header
    add_rect(slide, 0, 0, W, Inches(1.38), DARK_TEAL)
    add_logo_solvative_dark(slide)
    add_tb(slide, session_label,
           Inches(3.5), Inches(0.24), Inches(6.5), Inches(0.35),
           size=Pt(9), bold=True, color=YELLOW, align=PP_ALIGN.CENTER)
    add_tb(slide, "Agenda",
           Inches(0.6), Inches(0.62), Inches(6), Inches(0.55),
           size=Pt(26), bold=True, color=WHITE)

    # Total duration pill (top right)
    total_mins = sum(
        int(it["time"].replace(" min", "")) for it in items
        if it["time"].endswith("min"))
    add_rect(slide, Inches(11.3), Inches(0.52), Inches(1.7), Inches(0.4), TEAL)
    add_tb(slide, f"~{total_mins} min",
           Inches(11.3), Inches(0.52), Inches(1.7), Inches(0.4),
           size=Pt(12), bold=True, color=WHITE, align=PP_ALIGN.CENTER)

    col_w   = Inches(6.2)
    row_h   = Inches(1.35)
    col_x   = [Inches(0.3), Inches(6.83)]
    start_y = Inches(1.48)

    for i, item in enumerate(items):
        col   = i % 2
        row   = i // 2
        x     = col_x[col]
        y     = start_y + row * row_h
        is_last = item.get("is_last", False)

        bg = DARK_TEAL if is_last else TEAL_LIGHT
        add_rect(slide, x, y, col_w, Inches(1.22), bg)

        badge_c = YELLOW if item["yellow_badge"] else TEAL
        num_c   = DARK_TEAL if item["yellow_badge"] else WHITE
        add_rect(slide, x + Inches(0.15), y + Inches(0.32),
                 Inches(0.42), Inches(0.42), badge_c)
        add_tb(slide, item["num"],
               x + Inches(0.15), y + Inches(0.32),
               Inches(0.42), Inches(0.42),
               size=Pt(14), bold=True, color=num_c, align=PP_ALIGN.CENTER)

        title_c = WHITE if is_last else TEXT_DARK
        desc_c  = RGBColor(0xBB, 0xCC, 0xCC) if is_last else TEXT_MUTED
        time_c  = YELLOW if is_last else TEAL

        add_tb(slide, item["title"],
               x + Inches(0.65), y + Inches(0.18), Inches(4.6), Inches(0.4),
               size=Pt(13), bold=True, color=title_c)
        add_tb(slide, item["desc"],
               x + Inches(0.65), y + Inches(0.58), Inches(4.5), Inches(0.58),
               size=Pt(10), color=desc_c, wrap=True)
        add_tb(slide, item["time"],
               x + Inches(5.35), y + Inches(0.28), Inches(0.75), Inches(0.35),
               size=Pt(11), bold=True, color=time_c, align=PP_ALIGN.RIGHT)

    add_slide_number(slide, slide_num, total)
```

---

### 3. Section Divider

Dark teal background. Ghost watermark number. Section title, one-line goal, yellow rule. Used between major deck sections.

```python
def slide_section_divider(prs, slide_num, total, section_num, title, goal):
    slide = blank_slide(prs)
    set_bg(slide, DARK_TEAL)

    add_logo_solvative_dark(slide)

    # Ghost watermark number
    add_tb(slide, str(section_num).zfill(2),
           Inches(7.5), Inches(0.8), Inches(5.5), Inches(5.5),
           size=Pt(260), bold=True,
           color=RGBColor(0x00, 0x30, 0x38),   # barely-visible teal
           align=PP_ALIGN.RIGHT)

    add_tb(slide, f"SECTION {str(section_num).zfill(2)}",
           Inches(0.65), Inches(1.8), Inches(7), Inches(0.38),
           size=Pt(10), bold=True, color=YELLOW)

    add_tb(slide, title,
           Inches(0.65), Inches(2.25), Inches(8.5), Inches(1.6),
           size=Pt(52), bold=True, color=WHITE, wrap=True)

    yellow_rule(slide, Inches(0.65), Inches(4.1))

    add_tb(slide, goal,
           Inches(0.65), Inches(4.4), Inches(8), Inches(1.0),
           size=Pt(18), color=RGBColor(0xAA, 0xCC, 0xCC), wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 4. Two-Column Contrast

Two panels side by side. Teal left panel + white right panel (or both white). Use for Problem/Solution, Current/Future, Before/After.

```python
def slide_two_column_contrast(prs, slide_num, total,
                               title,
                               left_label, left_points,
                               right_label, right_points,
                               left_dark=True):
    """
    left_points / right_points: list of strings (bullet items)
    left_dark: if True, left panel is TEAL (dark); if False, both panels are light
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    # Title bar
    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    add_rect(slide, Inches(0.55), Inches(1.55), Inches(12.3), Pt(2), YELLOW)

    panel_y = Inches(1.72)
    panel_h = Inches(5.45)
    panel_w = Inches(5.9)
    gap     = Inches(0.5)
    lx      = Inches(0.55)
    rx      = lx + panel_w + gap

    left_bg   = TEAL      if left_dark else TEAL_LIGHT
    left_col  = WHITE     if left_dark else TEXT_DARK
    left_lbl  = RGBColor(0xAA, 0xCC, 0xCC) if left_dark else TEXT_MUTED

    add_rect(slide, lx, panel_y, panel_w, panel_h, left_bg)
    add_rect(slide, rx, panel_y, panel_w, panel_h, TEAL_LIGHT)

    # Left panel content
    add_tb(slide, left_label.upper(),
           lx + Inches(0.3), panel_y + Inches(0.3), panel_w - Inches(0.4), Inches(0.35),
           size=Pt(9), bold=True, color=left_lbl)
    for j, pt in enumerate(left_points):
        add_tb(slide, f"→  {pt}",
               lx + Inches(0.3),
               panel_y + Inches(0.75) + j * Inches(0.75),
               panel_w - Inches(0.4), Inches(0.65),
               size=Pt(13), color=left_col, wrap=True)

    # Right panel content
    add_tb(slide, right_label.upper(),
           rx + Inches(0.3), panel_y + Inches(0.3), panel_w - Inches(0.4), Inches(0.35),
           size=Pt(9), bold=True, color=TEXT_MUTED)
    for j, pt in enumerate(right_points):
        add_tb(slide, f"→  {pt}",
               rx + Inches(0.3),
               panel_y + Inches(0.75) + j * Inches(0.75),
               panel_w - Inches(0.4), Inches(0.65),
               size=Pt(13), color=TEXT_DARK, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 5. Three-Column Comparison

Three equal-width columns. Each column: icon placeholder rectangle, label, heading, body text. Use for value props, feature comparisons, three-way options.

```python
def slide_three_column(prs, slide_num, total, title, columns):
    """
    columns: list of 3 dicts:
      { "label": "DIFFERENTIATOR", "heading": "Real-time Processing",
        "body": "Multi-line description text here." }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    add_rect(slide, Inches(0.55), Inches(1.55), Inches(12.3), Pt(2), YELLOW)

    col_w   = Inches(3.9)
    col_h   = Inches(5.3)
    col_y   = Inches(1.75)
    gap     = Inches(0.25)
    start_x = Inches(0.55)

    for i, col in enumerate(columns):
        cx = start_x + i * (col_w + gap)

        add_rect(slide, cx, col_y, col_w, col_h, TEAL_LIGHT)

        # Icon placeholder (yellow square)
        add_rect(slide, cx + Inches(0.3), col_y + Inches(0.35),
                 Inches(0.55), Inches(0.55), YELLOW)

        add_tb(slide, col["label"].upper(),
               cx + Inches(0.3), col_y + Inches(1.05),
               col_w - Inches(0.4), Inches(0.32),
               size=Pt(8), bold=True, color=TEXT_MUTED)

        add_tb(slide, col["heading"],
               cx + Inches(0.3), col_y + Inches(1.42),
               col_w - Inches(0.4), Inches(0.75),
               size=Pt(18), bold=True, color=TEXT_DARK, wrap=True)

        yellow_rule(slide, cx + Inches(0.3), col_y + Inches(2.28), Inches(0.38))

        add_tb(slide, col["body"],
               cx + Inches(0.3), col_y + Inches(2.52),
               col_w - Inches(0.4), Inches(2.5),
               size=Pt(12), color=TEXT_BODY, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 6. Big Statement

Single large centered statement or principle on white. Yellow rule. Optional one-line attribution.

```python
def slide_big_statement(prs, slide_num, total, statement, attribution=None):
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    yellow_rule(slide, Inches(6.3), Inches(2.55), Inches(0.55))

    add_tb(slide, statement,
           Inches(0.9), Inches(2.0), Inches(11.5), Inches(2.5),
           size=Pt(42), bold=True, color=TEXT_DARK,
           align=PP_ALIGN.CENTER, wrap=True)

    if attribution:
        add_tb(slide, f"— {attribution}",
               Inches(0.9), Inches(5.1), Inches(11.5), Inches(0.45),
               size=Pt(14), italic=True, color=TEXT_MUTED,
               align=PP_ALIGN.CENTER)

    add_slide_number(slide, slide_num, total)
```

---

### 7. Bullet Content

White slide. Title. 1–2 column structured bullet list (up to 6 bullets per column). Optional callout box at bottom.

```python
def slide_bullet_content(prs, slide_num, total, title, bullets,
                          two_col=False, callout=None):
    """
    bullets: list of strings
    two_col: if True, split bullets into 2 columns
    callout: optional string shown in yellow callout box at bottom
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    content_y = Inches(1.78)
    content_h = Inches(4.9) if not callout else Inches(3.8)

    if two_col:
        mid = (len(bullets) + 1) // 2
        left_b, right_b = bullets[:mid], bullets[mid:]
        for j, pt in enumerate(left_b):
            add_tb(slide, f"·  {pt}",
                   Inches(0.55), content_y + j * Inches(0.7),
                   Inches(5.9), Inches(0.62),
                   size=Pt(14), color=TEXT_BODY, wrap=True)
        for j, pt in enumerate(right_b):
            add_tb(slide, f"·  {pt}",
                   Inches(6.95), content_y + j * Inches(0.7),
                   Inches(5.9), Inches(0.62),
                   size=Pt(14), color=TEXT_BODY, wrap=True)
    else:
        for j, pt in enumerate(bullets):
            add_tb(slide, f"·  {pt}",
                   Inches(0.55), content_y + j * Inches(0.7),
                   Inches(12.3), Inches(0.62),
                   size=Pt(14), color=TEXT_BODY, wrap=True)

    if callout:
        cal_y = Inches(5.75)
        add_rect(slide, Inches(0.55), cal_y, Inches(12.3), Inches(1.3),
                 YELLOW_BG, border_color=YELLOW_BDR, border_width=Pt(1))
        add_rect(slide, Inches(0.55), cal_y, Inches(0.08), Inches(1.3), YELLOW)
        add_tb(slide, callout,
               Inches(0.75), cal_y + Inches(0.32), Inches(12.0), Inches(0.85),
               size=Pt(13), color=CALLOUT_TXT, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 8. Metrics / Stats

2–4 large KPI figures in a row. Each: large number, label, supporting context line.

```python
def slide_metrics(prs, slide_num, total, title, metrics):
    """
    metrics: list of dicts (2–4 items):
      { "value": "87%", "label": "Adherence Rate",
        "context": "Up 4.2 pts vs. prior quarter" }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n      = len(metrics)
    card_w = Inches(12.3 / n) - Inches(0.15)
    card_h = Inches(4.6)
    card_y = Inches(1.9)
    start_x = Inches(0.55)

    for i, m in enumerate(metrics):
        cx = start_x + i * (card_w + Inches(0.15))
        add_rect(slide, cx, card_y, card_w, card_h, TEAL_LIGHT)

        yellow_rule(slide, cx + Inches(0.3), card_y + Inches(0.35),
                    Inches(0.45))

        add_tb(slide, m["value"],
               cx + Inches(0.3), card_y + Inches(0.65), card_w - Inches(0.4),
               Inches(1.8), size=Pt(64), bold=True, color=TEAL)

        add_tb(slide, m["label"],
               cx + Inches(0.3), card_y + Inches(2.6), card_w - Inches(0.4),
               Inches(0.5), size=Pt(15), bold=True, color=TEXT_DARK, wrap=True)

        add_tb(slide, m["context"],
               cx + Inches(0.3), card_y + Inches(3.2), card_w - Inches(0.4),
               Inches(1.0), size=Pt(11), color=TEXT_MUTED, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 9. Timeline / Roadmap

Horizontal phase steps connected by a spine line. Each phase: number badge, name, date range, 2–3 bullet points.

```python
def slide_timeline(prs, slide_num, total, title, phases):
    """
    phases: list of dicts (3–5 items):
      { "num": "1", "name": "Discovery", "dates": "Mar – Apr 2026",
        "bullets": ["Requirements gathering", "Architecture design"] }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n       = len(phases)
    ph_w    = Inches(12.3 / n) - Inches(0.2)
    spine_y = Inches(3.0)
    start_x = Inches(0.55)

    # Spine line
    add_rect(slide, start_x, spine_y - Pt(2),
             Inches(12.3), Pt(4), TEAL)

    for i, ph in enumerate(phases):
        px = start_x + i * (ph_w + Inches(0.2))

        # Badge circle (rectangle approximation)
        add_rect(slide, px + Inches(0.1), spine_y - Inches(0.3),
                 Inches(0.6), Inches(0.6), YELLOW)
        add_tb(slide, ph["num"],
               px + Inches(0.1), spine_y - Inches(0.3),
               Inches(0.6), Inches(0.6),
               size=Pt(14), bold=True, color=DARK_TEAL, align=PP_ALIGN.CENTER)

        # Phase name above spine
        add_tb(slide, ph["name"],
               px, Inches(2.1), ph_w, Inches(0.55),
               size=Pt(15), bold=True, color=TEXT_DARK, wrap=True)

        # Dates
        add_tb(slide, ph["dates"],
               px, Inches(2.68), ph_w, Inches(0.35),
               size=Pt(10), color=TEAL, wrap=True)

        # Bullets below spine
        for j, b in enumerate(ph["bullets"]):
            add_tb(slide, f"·  {b}",
                   px, spine_y + Inches(0.55) + j * Inches(0.65),
                   ph_w, Inches(0.58),
                   size=Pt(11), color=TEXT_BODY, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 10. Case Study

Three-panel: Problem (teal) → Approach (white) → Result (dark teal with metric).

```python
def slide_case_study(prs, slide_num, total, title,
                      problem, approach_points, result, result_metric=None):
    """
    approach_points: list of strings (3–4 steps)
    result_metric: optional dict { "value": "40%", "label": "cost reduction" }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.22), Inches(12.3), Inches(0.55),
           size=Pt(22), bold=True, color=TEXT_DARK)

    panel_y = Inches(0.88)
    panel_h = Inches(6.35)
    pw      = Inches(4.1)
    gap     = Inches(0.25)

    # Problem panel (TEAL)
    add_rect(slide, Inches(0.25), panel_y, pw, panel_h, TEAL)
    add_tb(slide, "PROBLEM",
           Inches(0.55), panel_y + Inches(0.3), pw - Inches(0.2), Inches(0.32),
           size=Pt(9), bold=True, color=RGBColor(0xAA, 0xCC, 0xCC))
    yellow_rule(slide, Inches(0.55), panel_y + Inches(0.72), Inches(0.42))
    add_tb(slide, problem,
           Inches(0.55), panel_y + Inches(1.0), pw - Inches(0.2), Inches(5.0),
           size=Pt(15), color=WHITE, wrap=True)

    # Approach panel (white)
    ax = Inches(0.25) + pw + gap
    add_rect(slide, ax, panel_y, pw, panel_h, TEAL_LIGHT)
    add_tb(slide, "OUR APPROACH",
           ax + Inches(0.3), panel_y + Inches(0.3), pw - Inches(0.4), Inches(0.32),
           size=Pt(9), bold=True, color=TEXT_MUTED)
    yellow_rule(slide, ax + Inches(0.3), panel_y + Inches(0.72), Inches(0.42))
    for j, pt in enumerate(approach_points):
        add_tb(slide, f"{j+1}.  {pt}",
               ax + Inches(0.3),
               panel_y + Inches(1.05) + j * Inches(1.1),
               pw - Inches(0.4), Inches(1.0),
               size=Pt(13), color=TEXT_DARK, wrap=True)

    # Result panel (DARK_TEAL)
    rx = ax + pw + gap
    add_rect(slide, rx, panel_y, pw, panel_h, DARK_TEAL)
    add_tb(slide, "RESULT",
           rx + Inches(0.3), panel_y + Inches(0.3), pw - Inches(0.4), Inches(0.32),
           size=Pt(9), bold=True, color=RGBColor(0xAA, 0xCC, 0xCC))
    yellow_rule(slide, rx + Inches(0.3), panel_y + Inches(0.72), Inches(0.42))
    if result_metric:
        add_tb(slide, result_metric["value"],
               rx + Inches(0.3), panel_y + Inches(1.0), pw - Inches(0.4), Inches(1.3),
               size=Pt(56), bold=True, color=YELLOW)
        add_tb(slide, result_metric["label"],
               rx + Inches(0.3), panel_y + Inches(2.35), pw - Inches(0.4), Inches(0.45),
               size=Pt(13), bold=True, color=WHITE, wrap=True)
        add_tb(slide, result,
               rx + Inches(0.3), panel_y + Inches(3.0), pw - Inches(0.4), Inches(3.0),
               size=Pt(12), color=RGBColor(0xCC, 0xDD, 0xDD), wrap=True)
    else:
        add_tb(slide, result,
               rx + Inches(0.3), panel_y + Inches(1.0), pw - Inches(0.4), Inches(5.0),
               size=Pt(14), color=WHITE, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 11. Team

3–4 person cards. Each: photo placeholder, name, title, one-line bio.

```python
def slide_team(prs, slide_num, total, title, members):
    """
    members: list of dicts (3–4):
      { "name": "Kartik Sorathiya", "role": "CEO & Co-founder",
        "bio": "15 years building enterprise software." }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n       = len(members)
    card_w  = Inches(12.3 / n) - Inches(0.2)
    card_h  = Inches(5.1)
    card_y  = Inches(1.78)
    start_x = Inches(0.55)

    for i, m in enumerate(members):
        cx = start_x + i * (card_w + Inches(0.2))
        add_rect(slide, cx, card_y, card_w, card_h, TEAL_LIGHT)

        # Photo placeholder
        add_rect(slide, cx + Inches(0.25), card_y + Inches(0.3),
                 card_w - Inches(0.5), Inches(2.4), TEAL)
        add_tb(slide, "PHOTO",
               cx + Inches(0.25), card_y + Inches(1.25),
               card_w - Inches(0.5), Inches(0.5),
               size=Pt(11), bold=True,
               color=RGBColor(0xAA, 0xCC, 0xCC), align=PP_ALIGN.CENTER)

        add_tb(slide, m["name"],
               cx + Inches(0.25), card_y + Inches(2.85),
               card_w - Inches(0.3), Inches(0.5),
               size=Pt(14), bold=True, color=TEXT_DARK, wrap=True)

        add_tb(slide, m["role"],
               cx + Inches(0.25), card_y + Inches(3.38),
               card_w - Inches(0.3), Inches(0.38),
               size=Pt(11), color=TEAL, wrap=True)

        yellow_rule(slide, cx + Inches(0.25), card_y + Inches(3.82), Inches(0.32))

        add_tb(slide, m["bio"],
               cx + Inches(0.25), card_y + Inches(4.08),
               card_w - Inches(0.3), Inches(0.75),
               size=Pt(10), color=TEXT_MUTED, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 12. Testimonial / Quote

Dark teal background. Large pull quote centered. Yellow rule. Attribution.

```python
def slide_testimonial(prs, slide_num, total, quote, name, company):
    slide = blank_slide(prs)
    set_bg(slide, DARK_TEAL)
    add_logo_solvative_dark(slide)

    add_tb(slide, "\u201C",
           Inches(0.55), Inches(1.0), Inches(2.0), Inches(1.5),
           size=Pt(96), bold=True, color=YELLOW)

    add_tb(slide, quote,
           Inches(0.8), Inches(1.8), Inches(11.5), Inches(3.2),
           size=Pt(26), color=WHITE, wrap=True, align=PP_ALIGN.LEFT)

    yellow_rule(slide, Inches(0.8), Inches(5.2), Inches(0.55))

    add_tb(slide, name,
           Inches(0.8), Inches(5.52), Inches(8), Inches(0.42),
           size=Pt(14), bold=True, color=WHITE)
    add_tb(slide, company,
           Inches(0.8), Inches(5.96), Inches(8), Inches(0.38),
           size=Pt(12), color=RGBColor(0xAA, 0xCC, 0xCC))

    add_slide_number(slide, slide_num, total)
```

---

### 13. Pricing / Investment

2–3 tier cards. Each: tier label, headline description, feature list, CTA label.

```python
def slide_pricing(prs, slide_num, total, title, tiers):
    """
    tiers: list of dicts (2–3):
      { "label": "PHASE 1", "heading": "Foundation Build",
        "features": ["Requirements & architecture", "Core dashboard MVP", "3 health systems"],
        "cta": "~12 weeks",
        "highlight": False }   # highlight=True = teal card
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n       = len(tiers)
    card_w  = Inches(12.3 / n) - Inches(0.2)
    card_h  = Inches(5.3)
    card_y  = Inches(1.78)
    start_x = Inches(0.55)

    for i, t in enumerate(tiers):
        cx = start_x + i * (card_w + Inches(0.2))
        bg = TEAL if t.get("highlight") else TEAL_LIGHT
        tc = WHITE if t.get("highlight") else TEXT_DARK
        mc = RGBColor(0xAA, 0xCC, 0xCC) if t.get("highlight") else TEXT_MUTED

        add_rect(slide, cx, card_y, card_w, card_h, bg)

        add_tb(slide, t["label"],
               cx + Inches(0.3), card_y + Inches(0.3),
               card_w - Inches(0.4), Inches(0.32),
               size=Pt(9), bold=True, color=mc)

        add_tb(slide, t["heading"],
               cx + Inches(0.3), card_y + Inches(0.65),
               card_w - Inches(0.4), Inches(0.8),
               size=Pt(18), bold=True, color=tc, wrap=True)

        add_rect(slide, cx + Inches(0.3), card_y + Inches(1.55),
                 card_w - Inches(0.6), Pt(1),
                 WHITE if t.get("highlight") else DIVIDER)

        for j, f in enumerate(t["features"]):
            add_tb(slide, f"✓  {f}",
                   cx + Inches(0.3),
                   card_y + Inches(1.72) + j * Inches(0.62),
                   card_w - Inches(0.4), Inches(0.55),
                   size=Pt(12), color=tc, wrap=True)

        # CTA bar at bottom
        cta_bg = YELLOW if t.get("highlight") else DARK_TEAL
        cta_tc = DARK_TEAL if t.get("highlight") else WHITE
        add_rect(slide, cx, card_y + card_h - Inches(0.62),
                 card_w, Inches(0.62), cta_bg)
        add_tb(slide, t["cta"],
               cx, card_y + card_h - Inches(0.62),
               card_w, Inches(0.62),
               size=Pt(13), bold=True, color=cta_tc, align=PP_ALIGN.CENTER)

    add_slide_number(slide, slide_num, total)
```

---

### 14. Thank You

Dark teal background. Large "Thank you." Tagline. Contact line. Both logos.

```python
def slide_thank_you(prs, slide_num, total, tagline,
                     contact="hello@solvative.com · solvative.com",
                     client_logo=None):
    slide = blank_slide(prs)
    set_bg(slide, DARK_TEAL)

    add_logo_solvative_dark(slide)
    add_logo_client(slide, client_logo)

    add_tb(slide, "Thank you.",
           Inches(0.6), Inches(2.3), Inches(12.0), Inches(1.9),
           size=Pt(88), bold=True, color=WHITE, align=PP_ALIGN.CENTER)

    yellow_rule(slide, Inches(6.2), Inches(4.45), Inches(0.55))

    add_tb(slide, tagline,
           Inches(0.6), Inches(4.75), Inches(12.0), Inches(0.55),
           size=Pt(20), color=RGBColor(0xCC, 0xCC, 0xCC), align=PP_ALIGN.CENTER)

    add_tb(slide, contact,
           Inches(0.6), Inches(6.9), Inches(5.5), Inches(0.4),
           size=Pt(11), color=MUTED_DARK)
    add_tb(slide, "Confidential",
           Inches(10.0), Inches(6.9), Inches(3.0), Inches(0.4),
           size=Pt(11), color=MUTED_DARK, align=PP_ALIGN.RIGHT)
    # No slide number on Thank You
```

---

### 15. Architecture Overview

Layered zone rectangles (Data / Service / Presentation layers). Labeled component boxes inside each zone. Use as a placeholder — client fills in real component names during session.

```python
def slide_architecture(prs, slide_num, total, title, layers):
    """
    layers: list of dicts (2–4), top to bottom:
      { "name": "Presentation Layer", "color": TEAL_LIGHT,
        "components": ["React Dashboard", "Google Slides Export", "Mobile App"] }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n       = len(layers)
    zone_h  = Inches(5.1 / n) - Inches(0.12)
    zone_w  = Inches(12.3)
    start_x = Inches(0.55)
    start_y = Inches(1.72)
    gap     = Inches(0.12)

    colors = [TEAL_LIGHT, RGBColor(0xCC, 0xE8, 0xE8),
              RGBColor(0xE8, 0xF4, 0xF4), TEAL_LIGHT]

    for i, layer in enumerate(layers):
        zy = start_y + i * (zone_h + gap)
        bg = layer.get("color", colors[i % len(colors)])
        add_rect(slide, start_x, zy, zone_w, zone_h, bg,
                 border_color=DIVIDER, border_width=Pt(1))

        add_tb(slide, layer["name"].upper(),
               start_x + Inches(0.2), zy + Inches(0.12),
               Inches(3.0), Inches(0.32),
               size=Pt(8), bold=True, color=TEAL)

        # Component pills
        comp_x = start_x + Inches(0.2)
        comp_y = zy + Inches(0.55)
        for comp in layer["components"]:
            add_rect(slide, comp_x, comp_y, Inches(2.8), Inches(0.5), WHITE,
                     border_color=TEAL, border_width=Pt(1))
            add_tb(slide, comp, comp_x, comp_y, Inches(2.8), Inches(0.5),
                   size=Pt(11), bold=True, color=TEXT_DARK, align=PP_ALIGN.CENTER)
            comp_x += Inches(3.0)

    add_slide_number(slide, slide_num, total)
```

---

### 16. Feature Roadmap

Three-column matrix: Now / Next / Later. Each column: header, 4–6 feature cards.

```python
def slide_feature_roadmap(prs, slide_num, total, title, columns):
    """
    columns: list of 3 dicts:
      { "label": "NOW", "subtitle": "Q1–Q2 2026",
        "features": [
          { "name": "Core dashboard MVP", "desc": "5 report types" }, ...
        ]
      }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    col_w   = Inches(3.9)
    gap     = Inches(0.25)
    start_x = Inches(0.55)
    col_y   = Inches(1.75)
    col_h   = Inches(5.3)

    header_colors = [DARK_TEAL, TEAL, RGBColor(0x33, 0x77, 0x7F)]

    for i, col in enumerate(columns):
        cx   = start_x + i * (col_w + gap)
        hc   = header_colors[i]

        # Column header
        add_rect(slide, cx, col_y, col_w, Inches(0.7), hc)
        add_tb(slide, col["label"],
               cx, col_y, col_w, Inches(0.42),
               size=Pt(14), bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        add_tb(slide, col["subtitle"],
               cx, col_y + Inches(0.38), col_w, Inches(0.3),
               size=Pt(9), color=RGBColor(0xAA, 0xCC, 0xCC), align=PP_ALIGN.CENTER)

        # Feature cards
        for j, feat in enumerate(col["features"]):
            fy = col_y + Inches(0.78) + j * Inches(0.8)
            add_rect(slide, cx, fy, col_w, Inches(0.72), TEAL_LIGHT)
            add_tb(slide, feat["name"],
                   cx + Inches(0.2), fy + Inches(0.08),
                   col_w - Inches(0.25), Inches(0.32),
                   size=Pt(12), bold=True, color=TEXT_DARK)
            add_tb(slide, feat["desc"],
                   cx + Inches(0.2), fy + Inches(0.38),
                   col_w - Inches(0.25), Inches(0.3),
                   size=Pt(10), color=TEXT_MUTED)

    add_slide_number(slide, slide_num, total)
```

---

### 17. Requirements Matrix

Three-column table: Must Have / Should Have / Nice to Have. Rows grouped by functional area.

```python
def slide_requirements_matrix(prs, slide_num, total, title, groups):
    """
    groups: list of dicts:
      { "area": "Core Dashboards",
        "must": ["Real-time KPIs", "Role-based views"],
        "should": ["Export to PDF"],
        "nice": ["Natural language queries"] }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    # Header row
    hdr_y   = Inches(1.72)
    col_xs  = [Inches(0.55), Inches(4.0), Inches(7.4), Inches(10.8)]
    col_ws  = [Inches(3.35), Inches(3.3), Inches(3.3), Inches(2.3)]
    headers = ["Functional Area", "Must Have", "Should Have", "Nice to Have"]
    hdr_cs  = [DARK_TEAL, TEAL, RGBColor(0x22, 0x55, 0x5F), RGBColor(0x44, 0x77, 0x7F)]

    for j, (hx, hw, hdr, hc) in enumerate(zip(col_xs, col_ws, headers, hdr_cs)):
        add_rect(slide, hx, hdr_y, hw, Inches(0.44), hc)
        add_tb(slide, hdr, hx + Inches(0.12), hdr_y + Inches(0.07),
               hw - Inches(0.15), Inches(0.32),
               size=Pt(10), bold=True, color=WHITE)

    row_h = Inches(0.82)
    for i, grp in enumerate(groups):
        ry   = hdr_y + Inches(0.44) + i * row_h
        bg   = TEAL_LIGHT if i % 2 == 0 else WHITE

        for j, (rx, rw) in enumerate(zip(col_xs, col_ws)):
            add_rect(slide, rx, ry, rw, row_h, bg,
                     border_color=DIVIDER, border_width=Pt(1))

        add_tb(slide, grp["area"],
               col_xs[0] + Inches(0.12), ry + Inches(0.15),
               col_ws[0] - Inches(0.15), row_h - Inches(0.1),
               size=Pt(12), bold=True, color=TEXT_DARK, wrap=True)

        for col_i, key in enumerate(["must", "should", "nice"]):
            items = grp.get(key, [])
            text  = "\n".join(f"·  {it}" for it in items)
            add_tb(slide, text,
                   col_xs[col_i + 1] + Inches(0.12),
                   ry + Inches(0.1),
                   col_ws[col_i + 1] - Inches(0.15),
                   row_h - Inches(0.1),
                   size=Pt(10), color=TEXT_BODY, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 18. Process Flow

Numbered horizontal steps with descriptions. 4–7 steps.

```python
def slide_process_flow(prs, slide_num, total, title, steps):
    """
    steps: list of dicts (4–7):
      { "num": "1", "name": "Intake", "desc": "Prescription received via EHR integration." }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n       = len(steps)
    step_w  = Inches(12.3 / n) - Inches(0.15)
    start_x = Inches(0.55)
    spine_y = Inches(3.5)

    # Connector spine
    add_rect(slide, start_x, spine_y - Pt(2), Inches(12.3), Pt(4), DIVIDER)

    for i, st in enumerate(steps):
        sx = start_x + i * (step_w + Inches(0.15))

        # Badge
        add_rect(slide, sx + step_w / 2 - Inches(0.3),
                 spine_y - Inches(0.3),
                 Inches(0.6), Inches(0.6), YELLOW)
        add_tb(slide, st["num"],
               sx + step_w / 2 - Inches(0.3),
               spine_y - Inches(0.3),
               Inches(0.6), Inches(0.6),
               size=Pt(14), bold=True, color=DARK_TEAL, align=PP_ALIGN.CENTER)

        add_tb(slide, st["name"],
               sx, Inches(2.05), step_w, Inches(0.55),
               size=Pt(14), bold=True, color=TEXT_DARK,
               align=PP_ALIGN.CENTER, wrap=True)

        add_tb(slide, st["desc"],
               sx, spine_y + Inches(0.55), step_w, Inches(2.0),
               size=Pt(11), color=TEXT_BODY,
               align=PP_ALIGN.CENTER, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 19. Data Dashboard

4–6 KPI blocks in a 2×N or 3×2 grid. Each block: metric name, large value, trend, context.

```python
def slide_data_dashboard(prs, slide_num, total, title, kpis):
    """
    kpis: list of dicts (4–6):
      { "name": "Adherence Rate", "value": "87.3%",
        "trend": "+2.1 pts", "trend_up": True,
        "context": "vs. 85.2% prior quarter" }
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    cols    = 3
    rows    = (len(kpis) + cols - 1) // cols
    card_w  = Inches(12.3 / cols) - Inches(0.2)
    card_h  = Inches(5.1 / rows) - Inches(0.15)
    start_x = Inches(0.55)
    start_y = Inches(1.78)

    for i, kpi in enumerate(kpis):
        col = i % cols
        row = i // cols
        cx  = start_x + col * (card_w + Inches(0.2))
        cy  = start_y + row * (card_h + Inches(0.15))

        add_rect(slide, cx, cy, card_w, card_h, TEAL_LIGHT)
        yellow_rule(slide, cx + Inches(0.25), cy + Inches(0.22), Inches(0.32))

        add_tb(slide, kpi["name"],
               cx + Inches(0.25), cy + Inches(0.52),
               card_w - Inches(0.3), Inches(0.35),
               size=Pt(10), bold=True, color=TEXT_MUTED)

        add_tb(slide, kpi["value"],
               cx + Inches(0.25), cy + Inches(0.9),
               card_w - Inches(0.3), Inches(0.9),
               size=Pt(36), bold=True, color=TEAL)

        trend_c = RGBColor(0x16, 0xA3, 0x4A) if kpi.get("trend_up") else RGBColor(0xDC, 0x26, 0x26)
        add_tb(slide, kpi.get("trend", ""),
               cx + Inches(0.25), cy + card_h - Inches(0.72),
               card_w - Inches(0.3), Inches(0.32),
               size=Pt(11), bold=True, color=trend_c)

        add_tb(slide, kpi.get("context", ""),
               cx + Inches(0.25), cy + card_h - Inches(0.42),
               card_w - Inches(0.3), Inches(0.35),
               size=Pt(9), color=TEXT_MUTED, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

### 20. Table

Structured data table. Dark teal header row. Alternating row shading.

```python
def slide_table(prs, slide_num, total, title, headers, rows):
    """
    headers: list of column header strings
    rows: list of lists (each inner list = one row of cell strings)
    """
    slide = blank_slide(prs)
    set_bg(slide, WHITE)
    add_logo_solvative_light(slide)

    add_tb(slide, title,
           Inches(0.55), Inches(0.9), Inches(12.3), Inches(0.6),
           size=Pt(28), bold=True, color=TEXT_DARK)
    yellow_rule(slide, Inches(0.55), Inches(1.55))

    n_cols  = len(headers)
    col_w   = Inches(12.3 / n_cols)
    start_x = Inches(0.55)
    tbl_y   = Inches(1.78)
    hdr_h   = Inches(0.48)
    row_h   = Inches(5.1 / len(rows)) - Inches(0.05)

    # Header row
    for j, hdr in enumerate(headers):
        hx = start_x + j * col_w
        add_rect(slide, hx, tbl_y, col_w, hdr_h, DARK_TEAL)
        add_tb(slide, hdr,
               hx + Inches(0.12), tbl_y + Inches(0.08),
               col_w - Inches(0.15), hdr_h - Inches(0.1),
               size=Pt(11), bold=True, color=WHITE)

    # Data rows
    for i, row in enumerate(rows):
        ry = tbl_y + hdr_h + i * row_h
        bg = TEAL_LIGHT if i % 2 == 0 else WHITE
        for j, cell in enumerate(row):
            cx = start_x + j * col_w
            add_rect(slide, cx, ry, col_w, row_h, bg,
                     border_color=DIVIDER, border_width=Pt(1))
            add_tb(slide, str(cell),
                   cx + Inches(0.12), ry + Inches(0.08),
                   col_w - Inches(0.15), row_h - Inches(0.1),
                   size=Pt(11), color=TEXT_DARK, wrap=True)

    add_slide_number(slide, slide_num, total)
```

---

## Skill Instructions — What To Do When Invoked

When this skill is invoked, follow these five phases in order. Do not skip any phase.

---

### Phase 1: Questioning

Ask questions **one at a time**, conversationally. Ask follow-up questions based on each answer. Do not use a fixed questionnaire — let the conversation guide what to ask next.

Keep asking until you know:
- **Purpose:** What is this deck trying to achieve? What action should the audience take?
- **Audience:** Who exactly is in the room? Names, roles, seniority level, what they already know.
- **Client/subject:** Who or what is this deck about? Company name, industry, domain.
- **Tone:** Executive, technical, persuasive, informational?
- **Scope:** Approximate slide count? Any hard constraints (time limit, specific topics to cover or avoid)?
- **Assets:** Any source URLs or text to incorporate? Client logo URL or file path?
- **Deck type:** Is this a proposal, discovery deck, project update, case study, technical deep-dive, or something else?

**Do not ask all of these at once.** Start with the most important unknown and branch from there.

**Stop asking** when you have enough to research and write genuinely specific content. If the user says "just go" or "you have enough," proceed immediately.

---

### Phase 2: Research

Before writing a single slide, do in-depth research:

1. **Client research:** Search for the company — industry, size, leadership, recent news, strategic priorities, known technology stack, public pain points. Do not invent facts; only use what research confirms.

2. **Domain research:** Research the subject matter — technology landscape, regulatory environment (e.g. HIPAA, 340B, SOC 2), market benchmarks, competitor positioning, industry-standard approaches.

3. **Evidence research:** Find relevant statistics, case studies, third-party studies, and proof points that strengthen the deck's argument.

The more specific the research, the better the content. Cite sources in your working notes (do not put citations on slides).

---

### Phase 3: Outline Approval

Present the full proposed slide structure before writing any code. Format it exactly like this:

```
Proposed slide outline — please approve or request changes:

 1. Cover           — "LRX Command Center: Custom BI Platform Proposal"
 2. Agenda          — 6 stops, ~60 minutes
 3. Section Divider — Section 01: The Problem
 4. Two-Column      — Power BI today vs. what LRX needs
 5. Metrics/Stats   — 3 KPIs: report count, refresh lag, manual workaround hours
 6. Section Divider — Section 02: Our Approach
 7. Three-Column    — Build · Integrate · Scale
 8. Timeline        — 4 phases: Discovery → Build → Pilot → Scale
 9. Case Study      — Comparable healthcare BI implementation
10. Pricing         — Phase 1 / Phase 2 / Full Platform
11. Next Steps      — Bullet Content with callout
12. Thank You       — "Let's build something great together."

Ready to generate? Or would you like to adjust any slides?
```

Wait for approval. Accept add/remove/reorder/swap-type requests and update the outline until the user confirms.

---

### Phase 4: Generation

Once the outline is approved:

1. **Write a complete Python script** — one file, no imports missing, all slide builders included, `main()` function assembles slides in order and calls `prs.save(output_path)`.

2. **Use the patterns above** — copy each slide builder function from the Slide Library section, fill in the actual researched content. Do not leave placeholder text.

3. **Compute total slide count** before writing — pass it to every `add_slide_number()` call.

4. **Set `output_path`** to: `os.path.join(os.getcwd(), f"{date.today().isoformat()}-<deck-name>.pptx")`

5. **Run the script:**

```bash
python3 /tmp/generate-deck.py
```

6. **Report the result:**
```
✅ Deck generated: 2026-03-03-lrx-proposal.pptx (12 slides)
Slide summary:
  1. Cover — "LRX Command Center: Custom BI Platform Proposal"
  2. Agenda — 6 stops
  ...
```

---

### Phase 5: Iteration

After delivering the PPTX, stay in the conversation and accept any changes:

- **"Change slide 4 to a Three-Column"** → Update that slide builder, regenerate full script, re-run.
- **"Add a Case Study after slide 6"** → Insert the new builder in `main()`, renumber slides, regenerate.
- **"Rewrite the agenda descriptions"** → Update the `items` list in `slide_agenda()`, regenerate.
- **"The client logo URL is: ..."** → Update `client_logo` parameter everywhere, regenerate.

Always regenerate the **entire file** — never try to patch a running PPTX in-place.

Confirm after each iteration:
```
✅ Regenerated: 2026-03-03-lrx-proposal.pptx (13 slides — Case Study added at slide 7)
```

---

## Quick Slide Type Reference

| When the user says... | Use this slide type |
|---|---|
| "Problem", "Challenge", "Current state vs. goal" | Two-Column Contrast |
| "Why us", "Differentiators", "Three things" | Three-Column Comparison |
| "Key point", "Principle", "Mission statement" | Big Statement |
| "Bullets", "Key points", "Talking points" | Bullet Content |
| "Numbers", "KPIs", "Metrics", "Results" | Metrics / Stats |
| "Roadmap", "Timeline", "Phases" | Timeline / Roadmap |
| "How it works", "Process", "Steps" | Process Flow |
| "Case study", "Client story", "Example" | Case Study |
| "Team", "Who we are", "People" | Team |
| "Quote", "Testimonial", "What they said" | Testimonial / Quote |
| "Pricing", "Investment", "Phases and costs" | Pricing / Investment |
| "Architecture", "Tech stack diagram" | Architecture Overview |
| "Roadmap", "Features by quarter" | Feature Roadmap |
| "Requirements", "MoSCoW", "Must/Should/Nice" | Requirements Matrix |
| "Dashboard", "Live metrics", "At a glance" | Data Dashboard |
| "Table", "Data", "Comparison matrix" | Table |
| "Section", "Break", "Moving to..." | Section Divider |
