# knoxler.net — Everything Knoxler

Knoxler's personal portfolio and "own corner of the internet," built as a fake retro computer: a CRT monitor on screen with a working Windows 98–style desktop inside. Click folders and icons to open windows.

- **Professional** — recruiters can find projects, art, resume, and contact fast (see **Quick View**).
- **Fun** — feels like a game: pixel art, a frog assistant, achievements, and a hidden easter-egg hunt (later phase).

The full plan, art direction, and rules live in **[CLAUDE.md](CLAUDE.md)**. Read it before making big changes, and keep it updated when decisions change.

---

## Where we are

| Phase | What | Status |
|---|---|---|
| **1. Static desktop** | CRT frame, placeholder wallpaper, desktop icons, draggable windows, taskbar, Quick View, Settings | ✅ Done |
| **2. Content** | Every content window filled from `data/*.json`; Quick View filled | ✅ Done |
| **3. Polish** | CRT boot animation ✅, flicker ✅, frog tips ✅ · Music Player, giscus comments, custom domain ⬜ | 🚧 **In progress (current)** |
| 4. Interactive | Layered parallax wallpaper, clickable wallpaper, achievement popups | ⬜ Not started |
| 5. The Room | Wasteland hideout around the CRT (lamp → horror mode, radio, polaroids, Mountain-Time sky) | ⬜ Not started |
| 6. Secrets | Key hunt, horror easter eggs, creepy frog | ⬜ Not started |

### What's built (Phases 1–2)

- **The whole desktop:** monitor, 14 desktop icons, windows you can open / close / minimize / drag, taskbar, start menu, live clock, and a **Settings** window (toggle CRT flicker + motion; respects the browser's `prefers-reduced-motion`).
- **Every content window reads from its JSON file** — no hard-coded text:
  - About, Commissions, Streams, School, My Corner, Find Me → clean simple layouts.
  - **Projects / Games** → cards (screenshot, role, tech chips, description, link buttons); Games can be flagged **"coming soon."**
  - **Art / Field Journal** → an image viewer (prev/next buttons, **arrow keys** to move, **Esc** to close).
  - **Reviews** → cards with optional cover + rating badge, each linking to the full review.
  - **Achievements** → a big total score at top (sum of **unlocked** points), grouped by Work / Art / Streaming / Life, locked ones dimmed with a hint.
- **Quick View** (`quick.html`) — the clean one-page recruiter view, filled from the same data: projects, games (with role), recent reviews, skills, resume, contact.
- **Music Player and Recycle Bin** still show "Coming soon" — *intentional*; their content lands in a later phase.

### What's new in Phase 3 (so far)

- **CRT boot animation** (`js/boot.js`) — a short power-on effect on every load (black screen → bright line → wash out, ~1.2s). Skippable with any key press or click. Skipped entirely when motion is off in Settings or the OS prefers reduced motion. Quick View (`quick.html`) never boots.
- **CRT flicker + scanlines** — static scanline texture over the screen, plus a very slow (7s) gentle opacity wobble. Flicker is **on by default** (it's subtle), still toggleable in Settings, and always killed under `prefers-reduced-motion` / motion-off. No fast flashing.
- **Frog assistant tips** (`js/frog.js`) — click the frog for a speech-bubble tip. Tips live in **`data/frog-tips.json`** (a plain array of strings — add your own there). Friendly for now; the creepy frog is Phase 6.

---

## Run it locally

The data files load with `fetch()`, which browsers **block on `file://`** — so don't double-click `index.html`. Serve the folder instead:

```
npx serve .
```

(…or `python -m http.server`, or any static server.) Then open the `http://localhost:…` URL it prints.

- `index.html` → the desktop
- `quick.html` → Quick View
- `404.html` → error page

## Where things live

```
index.html            The desktop (CRT + windows)
quick.html            Quick View / Resume Mode (clean recruiter page)
404.html              Error page

css/
  main.css            Desktop shell: monitor, icons, windows, taskbar, start menu, mobile
  content.css         Window + Quick View content: cards, badges, viewer, achievements

js/
  main.js             Desktop shell: window open/close/drag, taskbar, start menu, clock, asset probing
  boot.js             CRT power-on boot (Phase 3)
  frog.js             Frog assistant tips (Phase 3)
  lib.js              Shared helpers: load data, safe links, image fallback, card, viewer, error box
  render-<name>.js    One small file per window (about, projects, games, art, reviews, …)
  quick.js            Fills quick.html from the same data

data/
  *.json              The content (one file per window)
  frog-tips.json      Frog assistant tips (Phase 3) — a plain array of strings
  README.md           How to add/edit content — a non-coder guide

assets/
  README.md           How to drop in art (exact file names + sizes)
```

## Adding content

All text lives in `data/*.json` — **no code changes** to add a project, game, review, etc.

Open **[data/README.md](data/README.md)** for the step-by-step: it explains the three simple JSON rules, how to add an entry to each file, how to check a file with a free online JSON validator, and the image/EXIF/security notes.

> **Heads up:** every `data/*.json` file currently holds **fake "replace me" example entries**. The layout and behavior are real; the words and images are placeholders. Swap in real content when ready.

## Adding art

Art is swappable by dropping a PNG into `assets/` with the exact name — **no code changes**. File names and pixel sizes are in **[assets/README.md](assets/README.md)**. Until a file exists, a labeled dashed placeholder shows in its place (name + size).

### How the "placeholder → real art" swap works

- **Desktop art** (icons, wallpaper, frog): each element has `data-asset="name"`. `js/main.js` does a `HEAD` check for `assets/name.png` and swaps in the image if it exists.
- **Content images** (screenshots, art, badges): set in the data file. `js/lib.js` tries to load it and, if the file is missing, shows a labeled dashed box instead of a broken-image icon.

## Security rules (don't break these)

- **Static only** — no server, no database, no accounts. No secrets, keys, or tokens in the repo.
- **Never** put a home address or phone number on the site. Contact by a site email + social links only.
- **Strip GPS/EXIF** from all photos before adding them.
- External links use `rel="noopener noreferrer"` (and open in a new tab).
- All text is set with `textContent`, **never** `innerHTML`.
- **Strict CSP** in each HTML `<head>`: local scripts/styles only, plus giscus. No inline scripts or inline styles.
- Games link out to **itch.io** — never host an `.exe` on this site.

## Notes & gotchas

- **The achievements total is calculated**, not stored — it sums the points of the non-locked entries. Don't hard-code a total.
- **Folder ids and data filenames don't always match:** `journal`→`field-journal.json`, `corner`→`my-corner.json`, `findme`→`find-me.json`. The mapping is `DATA_MAP` in `js/main.js`.
- **Adding a brand-new window** touches five places: an icon `<button>` in `index.html`, an entry in the `FOLDERS` list in `js/main.js`, a `render-<id>.js` file, a `data/<name>.json` file, a `<script>` tag in `index.html`, and (only if id ≠ filename) a `DATA_MAP` entry.
- **Motion is safe by default:** flicker is on by default but slow and subtle (7s wobble), everything respects `prefers-reduced-motion` plus the Settings toggles, and no animation runs under motion-off. No fast flashing.
- **CSP allows giscus** but giscus isn't wired up yet (that's Phase 3).

## What's next (Phase 3 — Polish)

Done: CRT boot animation ✅, flicker + scanlines ✅, frog assistant tips ✅.

Pick up here:

1. **Music Player** window — Winamp-style, ships with an empty playlist and a "no tracks loaded" message (only music Knoxler owns/rights to may be added).
2. **giscus comments** — needs the repo **public with Discussions turned on**; visitors sign in with GitHub.
3. **Custom domain** (knoxler.net) — wire up in GitHub Pages settings, plus HTTPS enforcement.
