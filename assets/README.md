# Art assets

Drop PNG files into this folder with **exactly** these names. The desktop detects new files on load and replaces the matching dashed placeholder automatically — no code changes needed.

## Wallpaper — 480×270 each, pixel art

The screen is 960×540, so 480×270 artwork scales to **exactly 2×** with no cropping. Draw at 480×270 and the layers align perfectly.

| File | Layer | Notes |
|---|---|---|
| `wallpaper-sky.png` | sky | Pastel/neon New Mexico desert dusk |
| `wallpaper-mountains.png` | mountains | Transparent background |
| `wallpaper-midground.png` | midground | Abandoned gas station + neon sign, transparent background |
| `wallpaper-foreground.png` | foreground | Fence, cactus, tumbleweed, transparent background |

Layers render in the order above (sky at the back). The wallpaper placeholder hides once **all four** exist.

## Desktop icons — 32×32 each, pixel art

`icon-about.png`, `icon-projects.png`, `icon-games.png`, `icon-art.png`, `icon-commissions.png`, `icon-streams.png`, `icon-reviews.png`, `icon-school.png`, `icon-achievements.png`, `icon-journal.png`, `icon-corner.png`, `icon-find-me.png`, `icon-music.png`, `icon-recycle.png`

## Frog assistant — 64×64

`frog.png` — idle frame. Talking frames later (Phase 3).

## The Room (Phase 5) — sizes TBD until the room layout is drawn

The room the CRT sits in (salvaged wasteland hideout). File names below are suggestions — they lock in when Phase 5 is built.

| File | Purpose |
|---|---|
| `room-wall.png` | Hideout wall / background |
| `room-desk.png` | The desk |
| `room-lamp-on.png` / `room-lamp-off.png` | Desk lamp states (off = lights out, horror mode) |
| `room-radio.png` | Old radio (opens the Music Player) |
| `room-polaroids.png` | Polaroid stack (opens the Field Journal) |
| `room-sticky-notes.png` | Sticky notes on the bezel (opens Find Me) |
| `room-shelf.png` | Shelf with the 3D printed figure |
| `room-dirtbike.png` | Toy dirt bike |
| `room-window-sunrise.png` | Window sky — sunrise |
| `room-window-day.png` | Window sky — day |
| `room-window-sunset.png` | Window sky — sunset |
| `room-window-night.png` | Window sky — stars |
| `room-keys.png` | The key-hunt keys |

All room art starts as labeled placeholders. The room is hidden on phones.

## Not wired up yet

- CRT monitor frame (size TBD)
- Start button / taskbar art (size TBD)
- Achievement badges (32×32 each, Phase 2)

## Rules

- PNG format. `image-rendering: pixelated` is applied, so pixel art stays crisp.
- Strip EXIF/location data from photos before adding (Field Journal, Phase 2).
- Only Knoxler's own art — no logos, sprites, or assets from other games or companies.
