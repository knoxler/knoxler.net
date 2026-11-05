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

## Not wired up yet

- CRT monitor frame (size TBD)
- Start button / taskbar art (size TBD)
- Achievement badges (32×32 each, Phase 2)

## Rules

- PNG format. `image-rendering: pixelated` is applied, so pixel art stays crisp.
- Strip EXIF/location data from photos before adding (Field Journal, Phase 2).
- Only Knoxler's own art — no logos, sprites, or assets from other games or companies.
