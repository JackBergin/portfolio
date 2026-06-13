# Style Context — "Bold & Playful Paper" UI

Paste this whole file into your agent (Cursor) as context, or commit it as `STYLE.md` in your repo and tell the agent: *"Follow STYLE.md for all styling."* It captures the look & feel of the workshop deck so you can reuse it in a static HTML/CSS site on GitHub Pages.

---

## 1. The feeling in one paragraph

Warm off-white "paper" background, near-black ink, and four punchy flat accents. Everything is built from **big geometric shapes** (circles, pills, chunky rounded rectangles) with **thick black borders** and **hard offset shadows** (no blur). No gradients, no soft drop-shadows, no glassmorphism. Generous whitespace, oversized display type, and small monospace labels used like stamps. One idea per screen, big.

**Do:** flat fills, 4px black borders, hard `10px 10px 0` shadows, rounded corners, mono "kicker" labels in ALL-CAPS.
**Don't:** gradients, blurry shadows, thin hairline borders, tiny text, more than ~2 accent colors in one component, emoji as decoration.

---

## 2. Design tokens (drop into `:root`)

```css
:root {
  /* Surfaces & ink */
  --bg:    #F7F4EC;   /* warm paper — page background */
  --panel: #EFEAE0;   /* muted panel / placeholder fills */
  --card:  #FFFDF8;   /* near-white card surface */
  --ink:   #201D18;   /* near-black — text, borders, shadows */

  /* Accents — flat, punchy, used sparingly */
  --a1: #E25C33;   /* coral  */
  --a2: #3D5FD0;   /* cobalt */
  --a3: #2E9E5B;   /* green  */
  --a4: #EFC93F;   /* yellow */

  /* Structure */
  --border: 4px solid var(--ink);
  --shadow: 10px 10px 0 var(--ink);   /* hard, no blur */
  --radius-card: 24px;
  --radius-pill: 999px;

  /* Type */
  --font-display: "Archivo Black", sans-serif;  /* headings */
  --font-body:    "Archivo", sans-serif;        /* body 500/700 */
  --font-mono:    "Space Mono", monospace;       /* labels, code */
}
```

**Alternate accent palettes** (same energy, different mood — swap the four `--a*` values):
- Magenta set: `#E0489E  #7A4FD8  #1FA89B  #F2C84B`
- Citrus set:  `#F08C00  #1E66C7  #5CA021  #F2D03B`

---

## 3. Fonts

Load from Google Fonts in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700&family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

| Role | Font | Notes |
|---|---|---|
| Headings / numbers | **Archivo Black** | ALL-CAPS, tight letter-spacing (`-1px`), `line-height: 1.02` |
| Body | **Archivo** (500 / 700) | `line-height: 1.3`, `text-wrap: pretty` |
| Labels / code / kickers | **Space Mono** (400 / 700) | ALL-CAPS, `letter-spacing: 1px`, used as small "stamps" |

Type scale (desktop): display ~100px, h1 ~64px, h2 ~40px, body ~20–22px, label ~16px. Scale down ~40% for mobile. **Never** go below 14px.

---

## 4. The signature rules

These five things create the whole aesthetic — keep them consistent everywhere:

1. **Thick borders.** `border: 4px solid var(--ink)` on every card, chip, button, input, and shape.
2. **Hard shadows.** Featured/elevated elements get `box-shadow: 10px 10px 0 var(--ink)` — solid, no blur, offset down-right. Use it to mark the *one* important element, not everything.
3. **Rounded, chunky corners.** Cards `24px`, inputs/code `10–12px`, pills/chips `999px`.
4. **Flat fills only.** Accents are solid blocks of color. Never gradient.
5. **Mono kicker labels.** Small ALL-CAPS Space Mono tags ("PHASE 02 · SETUP") sit above headings and in footers like rubber stamps.

---

## 5. Component recipes

```css
/* Card */
.card {
  background: var(--card);
  border: var(--border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow);   /* drop on non-featured cards if it's too busy */
  padding: 32px;
}

/* Chip / pill label */
.chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 26px;
  border: var(--border);
  border-radius: var(--radius-pill);
  background: var(--a4);
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Button — primary */
.btn {
  border: var(--border);
  border-radius: 12px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-mono);
  font-weight: 700;
  padding: 16px 28px;
  cursor: pointer;
  transition: transform .08s ease, box-shadow .08s ease;
}
.btn:hover { box-shadow: var(--shadow); }
.btn:active { transform: translate(4px, 4px); box-shadow: none; }  /* "press into the shadow" */

/* Input */
.input {
  border: var(--border);
  border-radius: 12px;
  background: var(--card);
  padding: 14px 18px;
  font-family: var(--font-mono);
}

/* Kicker label */
.kicker {
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--ink);
}

/* Decorative shape — the playful bit */
.shape { border: var(--border); }
.shape--circle { border-radius: 50%; }
.shape--pill   { border-radius: 999px; }
.shape--square { border-radius: 36px; }
```

**Layout:** always use `display: flex` / `grid` with `gap:` for spacing between siblings — never margins-between or whitespace. Section padding ~80–100px desktop.

**Motion (optional, subtle):** quick entrance rise on load —
```css
@media (prefers-reduced-motion: no-preference) {
  .rise { animation: rise .45s ease-out both; }
  @keyframes rise { from { opacity:0; transform: translateY(14px) } to { opacity:1; transform:none } }
}
```

---

## 6. Resume-site composition cheat

- **Hero:** big Archivo Black name, mono one-liner kicker, a couple of floating decorative `.shape` blocks bleeding off one edge.
- **Experience:** roles as `.card`s in a grid; give each card a different accent as a left strip or a small colored corner block.
- **Skills:** chips (`.chip`) in a flex-wrap row.
- **Contact:** one featured card *with* the hard shadow; everything else flat. Featured = shadow earns attention.
- Keep to **one accent per card**; let the paper background breathe.

---

## 7. Prompt to hand the agent

> "Style this site per STYLE.md: warm-paper background, near-black ink, the four flat accents, 4px black borders, hard `10px 10px 0` offset shadows (no blur), rounded chunky corners, Archivo Black headings + Space Mono ALL-CAPS labels. Flat fills only — no gradients. Use flex/grid with gap for all spacing. Reserve the hard shadow for the one most important element per section."
