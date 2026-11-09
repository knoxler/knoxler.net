# How to edit the content (for a non-coder)

Each file in this folder is a **JSON file**. That's just a fancy name for "a list of stuff with labels." You edit the words, and the website shows them. No coding needed.

## The golden rules of JSON (the only three that matter)

1. **Every word and number goes in quotes** — `"like this"` — but true/false and numbers like points don't: `true`, `100`.
2. **Commas go between items, never after the last one.** A comma after the final thing is the #1 mistake and the #1 reason pages break.
3. **Keep the curly and square brackets where they are.** You're changing the words inside, not the shape around them.

When in doubt: copy an existing example entry, paste a new one right after it, and just change the words. That's the safest way to add something.

## How to add an entry (the same for every file)

1. Open the file in Notepad (or any text editor).
2. Find the last example entry and copy it.
3. Paste a new copy right after it.
4. Put a comma at the end of the *old* last entry (between the two), and make sure the *new* one has no comma after its closing `}`.
5. Change the words to your own.
6. Save the file.
7. **Check it with a JSON checker (next section) before uploading.**

## Checking your work with a free online checker

1. Open **jsonformatter.org** or **jsonlint.com** in your browser (both are free, no signup).
2. Open your edited file in Notepad, select all (Ctrl+A), copy (Ctrl+C).
3. Paste (Ctrl+V) into the checker's box and click Format / Validate.
4. If it says **valid**, you're good. If it points at a line, fix that line (usually a missing comma or a missing quote) and check again.

## What each file is for

| File | What it holds | How to add |
|---|---|---|
| `about.json` | Your intro, skills list, resume link | Add a skill to the `skills` list; change `intro` paragraphs; point `resume.url` at your PDF |
| `projects.json` | Programming projects | Copy one object in the `projects` list; set `title`, `description`, `role`, `screenshot`, `tech` (a list like `["Java"]`), `links` (a list of `{ "label": "...", "url": "..." }`), and `playable` (`true` or `false`) |
| `games.json` | Games you made art for | Same as projects, plus `comingSoon` (`true` shows the "coming soon" teaser). Link out to itch.io — never upload an `.exe` to the site |
| `art.json` | Gallery pieces | Copy one object in the `art` list; set `title`, `image`, `note` |
| `commissions.json` | What you offer + example pieces | Change the `intro` text; add pieces to the `examples` list; point `contact.url` at your Ko-fi / VGen link |
| `streams.json` | Twitch/YouTube + favorite clips | Change `channels` links; add clips to the `clips` list |
| `school.json` | Courses and what you learned | Copy one object in the `entries` list; set `title` and `note` |
| `find-me.json` | Email + every social link | Change `email`; add or edit items in the `links` list |
| `achievements.json` | Your Steam-style profile | Copy one object in the `achievements` list; set `name`, `description`, `points`, `badge`, `category` (Work, Art, Streaming, or Life), and `locked` (`true` = a future goal — add a `hint` for those). The total score is added up by the site automatically, so you never add it yourself |
| `field-journal.json` | Travel / camping / truck / dirt bike photos | Copy one object in the `entries` list; set `title`, `image`, `note` |
| `my-corner.json` | Favorite repos, games, things to share | Copy one object in the `things` list; set `title`, `note`, `url` |
| `reviews.json` | Your horror game reviews | Copy one object in the `reviews` list; set `game`, `take`, `link`. `cover`, `rating`, and `date` are optional — leave them off if you don't have them |
| `comments.json` | Setup for the comments at the bottom of the My Corner window | Special — usually you don't touch this. It holds the comment setup for the site (the "repo" and "category" names, plus two ID codes). While the two ID codes (`repoId` and `categoryId`) are blank, the window shows "Comments are coming soon." and no comments load. To turn comments on, you'll fill those two codes in here (you'll get them from a comments tool) — ask a coder for help with that one |

## Putting images where they belong

The `image` / `screenshot` / `badge` / `cover` fields point to files in the `assets/` folder, e.g. `assets/art/cool-piece.png`. So:

1. Save your image into the right folder (make the folder if it's missing).
2. Use the file's real name, folder and all, in the JSON: `"image": "assets/art/cool-piece.png"`.
3. **Strip the GPS/location data (EXIF) from any photo** before you put it in the folder — a quick online EXIF remover is enough.
4. Don't put your home address, phone number, or any secret/password/token in any file.

## After you save

1. Run the file through the JSON checker (above).
2. Commit and push the change (GitHub will take care of publishing it), or drop the files into the site if you're uploading by hand.
3. Open knoxler.net and click around to make sure your new entry shows up.
