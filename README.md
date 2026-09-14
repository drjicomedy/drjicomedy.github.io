# Ji Son · Comedy

Stand-up where you accidentally learn something. A plain HTML/CSS site hosted on GitHub Pages, with no build step.

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

- **Headshot:** save it as `images/headshot.jpg` (a portrait around 4:5 works best).
- **Gallery:** add image files to `images/` and list them:

```json
"photos": [
  { "file": "onstage-1.jpg", "caption": "Explaining number sense to a bar crowd" }
]
```

Resize photos to about 1600px wide before uploading so the site stays fast.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Still to do

- [ ] Replace the booking email in `index.html` (search for `TODO`)
- [ ] Replace the social media handles
- [ ] Add `images/headshot.jpg`
- [ ] (Optional) Buy a domain and add it under Settings → Pages → Custom domain
