# Dr. Ji · Comedy

Stand-up where you accidentally learn something. A plain HTML/CSS site hosted on GitHub Pages, with no build step.

**Live site:** https://drjicomedy.github.io

Changes pushed to `main` go live in about a minute.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page text: bio, section titles, contact links |
| `content.json` | **The file you'll edit most:** shows, clips, photos |
| `images/` | Headshot and photos |
| `style.css`, `main.js` | Look and behavior (rarely need touching) |

## Adding a show

Open `content.json` and add an entry to `"shows"`. You can do this from your phone: open the file on github.com and tap the pencil icon. Past shows hide themselves automatically, so you never need to delete them.

```json
"shows": [
  {
    "date": "2026-10-03",
    "time": "8 PM",
    "title": "Lectures on Tap",
    "venue": "Venue name",
    "city": "Los Angeles, CA",
    "link": "https://tickets.example.com",
    "linkText": "Tickets",
    "note": "I'm emceeing!"
  }
]
```

Only `date` (in `YYYY-MM-DD` format) and `title` are required. Put a comma between entries, but not after the last one.

## Adding a clip

Paste any YouTube link (a regular video, youtu.be, or Shorts):

```json
"clips": [
  { "youtube": "https://www.youtube.com/watch?v=XXXXXXXXXXX", "title": "Housing policy bit, Open Mic 2026" }
]
```

## Photos

All images go in the `images/` folder. Use lowercase names with hyphens and no spaces.

| File | Where it shows up | Shape / size |
| --- | --- | --- |
| `headshot.jpg` | Next to the bio | Portrait, 4:5 (e.g. 1200×1500) |
| `share.jpg` | Preview image when the link is texted or posted | Landscape, exactly 1200×630 |
| `onstage-01.jpg`, `onstage-02.jpg`, … | Photo gallery | Landscape works best (cropped to 4:3) |

The headshot and share image appear automatically once the files exist. Gallery photos also need to be listed in `content.json`:

```json
"photos": [
  { "file": "onstage-01.jpg", "caption": "Explaining number sense to a bar crowd" }
]
```

Keep each photo under about 500 KB. On a Mac: open it in Preview → Tools → Adjust Size → width 1600 → File → Export as JPEG, quality around 70%.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Still to do

- [ ] Replace the booking email in `index.html` (search for `TODO`)
- [ ] Replace the social media handles
- [ ] Add `images/headshot.jpg` and `images/share.jpg`
- [ ] (Optional) Buy a domain and add it under Settings → Pages → Custom domain
