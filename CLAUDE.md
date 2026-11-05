# knoxler.net — Project Brief

This file is the plan for knoxler.net. Read it fully before making changes, and keep it updated when decisions change.

## What this is

knoxler.net is Knoxler's personal portfolio and "own corner of the internet." It is built as a fake retro computer: a CRT monitor on screen, with a working Windows 98–style desktop inside it. Visitors click folders and icons to open windows, the way you'd explore a real old PC. Inspiration for the explore-the-desktop feeling: the game *Heaven Does Not Respond*.

It has two jobs that must never fight each other:
1. **Professional** — recruiters and clients can find projects, art, resume, and contact info fast and without confusion.
2. **Fun** — it feels like a game: pixel art, CRT flicker, a frog assistant, achievements, and a hidden easter-egg hunt.

## Art direction

- Style: 90s retro desktop (Windows 98, but way better), pastel + neon colors, light post-apocalyptic "salvaged terminal" flavor (think Fallout / Stalker / Metro mood). Horror is a core part of who Knoxler is (horror streamer and horror game reviewer), so retro/analog horror shows up openly in the Streams and Reviews windows and heavily in the hidden layer, while the main desktop stays welcoming and easy to use.
- The wasteland vibe is **flavor only** (visuals, sounds, secrets). Icon and window names stay plain and obvious (Projects, Art, Commissions, etc.).
- **All art is Knoxler's own.** Never use logos, sprites, or assets from other games or companies.
- **Every art spot starts as a placeholder**: a box with a dashed border showing the asset name and exact pixel size (e.g. `WALLPAPER — 480×270`). Art must be swappable by replacing a file in `/assets/`, with no code changes.
- Pixel art must render crisp: use `image-rendering: pixelated` and integer scaling.

### Art needed (placeholders until Knoxler draws them)

| Asset | Size | Notes |
|---|---|---|
| Wallpaper — sky layer | 480×270 | Pastel/neon New Mexico desert dusk |
| Wallpaper — mountains layer | 480×270 | Transparent PNG |
| Wallpaper — midground layer | 480×270 | Abandoned gas station, neon sign. Transparent PNG |
| Wallpaper — foreground layer | 480×270 | Fence, cactus, tumbleweed. Transparent PNG |
| Desktop icons | 32×32 each | One per desktop item |
| Frog assistant sprite | 64×64 | Idle + talking frames later |
| CRT monitor frame | TBD | Bezel around the screen |
| Achievement badges | 32×32 each | One per achievement |
| Start button / taskbar art | TBD | Win98-style |
| Room — hideout wall | TBD | Salvaged wasteland hideout behind the desk |
| Room — desk | TBD | The desk the CRT sits on |
| Room — desk lamp | TBD | Two states: on / off |
| Room — old radio | TBD | Click opens the Music Player |
| Room — polaroids | TBD | Click opens the Field Journal |
| Room — sticky notes | TBD | On the bezel; click opens Find Me |
| Room — shelf + 3D printed figure | TBD | Flavor / secret |
| Room — toy dirt bike | TBD | Flavor / secret |
| Room — window sky | TBD | Four states: sunrise, day, sunset, stars (real Mountain Time) |
| Room — set of keys | TBD | Key-hunt prop |

Wallpaper layers are separate so the interactive (mouse parallax) version can be added later without redrawing.

## Desktop contents

- **About Me** — opens like a text document. Short intro + link to resume PDF.
- **Projects** — programming work. Each project opens its own window: description, screenshots/GIF, what Knoxler did, GitHub link. Web-playable projects can run inside the window.
- **Games** — games Knoxler has worked on as the artist (with a game dev partner). Screenshots, clips, blurb, and Knoxler's role. Upcoming games get a "coming soon" teaser. Downloads link out to itch.io — **never host .exe files on this site.**
- **Art** — image-viewer style gallery.
- **Commissions** — example pieces, what's offered, how to reach out. Payments handled off-site (Ko-fi or VGen link). The site never touches payment info.
- **Streams** — Twitch and YouTube channels and favorite clips. Knoxler is a horror streamer, so this window leans into that (horror-themed styling, favorite horror streams/clips).
- **Reviews** — Knoxler's horror game reviews and coverage as a creator on Keymailer. Each review gets a card (game, short take, link to the full review or VOD). This is professional work: it shows Knoxler's eye for games and the relationships with studios, so it must be easy to find and read.
- **School** — coursework and things learned.
- **Achievements** — Steam/Xbox-style profile: total score at top, each achievement has a pixel badge, name, short description, and points. Covers all of life (game art, commissions, streaming, 3D printing, truck camper build, trips, dirt bike rides, etc.). Some can be "locked" with a hint as future goals. Optional popup the first time a visitor opens a folder ("Achievement Unlocked: Found the Art Folder").
- **Field Journal** — photo folder for travel, camping, the truck camper build, dirt biking.
- **My Corner** — favorite repos, games, and stuff Knoxler wants to share.
- **Find Me** — contacts window with links to every account across the internet.
- **Music Player** — Winamp-style retro player. **No tracks yet**: ship with an empty playlist and a "no tracks loaded" message. Only music Knoxler owns or has rights to may be added later.
- **Recycle Bin** — looks normal, holds the first clue of the hidden key hunt.
- **Frog assistant** — Clippy-style frog in the corner that pops up with tips ("Try opening the Art folder"). Later: gets creepy if poked too many times.

Taskbar: start button, open-window buttons, clock, small mascot spot.

## Hidden layer (later phase)

A *Welcome to the Game*–style key hunt: hidden files and clues spread across the desktop, retro horror touches (glitches, rare creepy events). Recruiters should never need to touch it.

## The Room (Phase 5)

The area outside the CRT becomes a room: the computer sits on a pixel art desk in a salvaged wasteland hideout — the Fallout / Stalker / Metro flavor from the art direction, made real. The room is a frame around the desktop, not a replacement for it: everything important still lives on the desktop, so the room is entirely optional for recruiters.

Clickable objects:

- **Desk lamp** — turns the room lights off: the CRT glows in the dark, the site switches to a creepier horror mode, and that mode leads into the hidden key hunt.
- **Old radio** on the desk — opens the Music Player.
- **Stack of polaroids** — opens the Field Journal.
- **Sticky notes** on the monitor bezel — open Find Me.
- **Shelf** with small items (3D printed figure, toy dirt bike) — flavor and hidden secrets.
- **Window** behind the desk — the New Mexico sky, changing with the real time of day in Mountain Time (sunrise, day, sunset, stars).
- **A set of keys** — part of the hidden key hunt.

Rules:

- Room objects are shortcuts to windows that already exist on the desktop (radio → Music Player, polaroids → Field Journal, sticky notes → Find Me). The desktop stays the source of truth; the room adds atmosphere and secrets, never required content.
- Horror mode (lamp) is the on-ramp into the key hunt. It must never block access to the desktop or Quick View — the lights can always be turned back on, restoring normal mode at any time.
- The window sky is flavor: it reads the visitor's local clock, converts to Mountain Time, and picks the sky state. Nothing important depends on it.
- Hidden on phones: at small screens the CRT fills the viewport and the room is not drawn at all.
- All room art starts as labeled placeholders (name + pixel size), swappable via `/assets/` like everything else.

## Must-haves for quality

- **Quick View / Resume Mode** button always visible: one clean, plain page with projects, skills, resume, and contact links for busy recruiters.
- **Settings window** with toggles to turn off CRT flicker and motion. Also respect the browser's `prefers-reduced-motion` setting automatically. No fast flashing ever.
- Works on phones: on small screens the desktop becomes a simple, tappable icon grid.
- Keyboard-usable windows and proper labels for screen readers.
- Fast loading: small images, no huge libraries.
- Content lives in data files (e.g. `/data/projects.json`, `/data/achievements.json`) so Knoxler can add things without editing code.

## Tech decisions

- Plain **HTML, CSS, and JavaScript**. No framework and no build step, to keep it simple and reduce dependencies.
- Hosted on **GitHub Pages** from this repo, with the custom domain **knoxler.net**.
- Comments: **giscus** (stores comments as GitHub Discussions on this repo; visitors sign in with GitHub; moderated from GitHub). Requires the repo to be public with Discussions turned on.

## Security rules

- Static site only: no server, no database, no user accounts.
- No secrets, keys, or tokens anywhere in the repo.
- Never put home address or phone number on the site. Contact by a dedicated site email and social links.
- Strip GPS/location data (EXIF) from all photos before adding them.
- External links use `rel="noopener noreferrer"`.
- Never insert untrusted text with `innerHTML`; use `textContent`.
- Add a Content Security Policy that only allows this site plus giscus.
- Enable HTTPS enforcement in GitHub Pages settings, Dependabot alerts, and 2FA on the GitHub account.

## Build phases

1. **Static desktop** — CRT frame, static wallpaper placeholder, desktop icons, draggable windows, taskbar, Quick View, Settings. All art as placeholders.
2. **Content** — fill windows from the data files: About, Projects, Games, Art, Commissions, Streams, School, Find Me, Achievements, Field Journal, My Corner.
3. **Polish** — CRT flicker/boot animation, music player, frog assistant tips, giscus comments, custom domain.
4. **Interactive** — layered parallax wallpaper, clickable wallpaper events, achievement popups.
5. **The Room** — the wasteland hideout around the CRT: desk, lamp (horror-mode on-ramp), radio, polaroids, sticky notes, shelf, Mountain-Time sky window, key-hunt keys. Hidden on phones; room art as labeled placeholders.
6. **Secrets** — key hunt, horror easter eggs, creepy frog.
