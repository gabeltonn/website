# gabeharder.com

Plain HTML, no build step. Three pages share `style.css`; the media on Selects is driven by `works.js`.

## Add or swap a sample

Open `works.js` and edit the `WORKS` object. Each entry needs a `title`, a `type`, and an `id`:

| type    | id is…                                   | shape |
|---------|------------------------------------------|-------|
| `yt`    | the YouTube video ID (`?v=THIS`)         | 16:9  |
| `short` | the YouTube ID of a vertical video/Short | 9:16  |
| `vimeo` | the Vimeo numeric ID (add `vertical: true` for 9:16) | 16:9 |
| `audio` | a path like `audio/cold-open.mp3`        | player row |
| `sq`    | raw embed HTML (e.g. a Spotify embed)    | 1:1   |

An empty `id: ""` shows a "coming soon" tile. If the item has an external `link`, the tile opens that destination instead, which is useful for work hosted only on Instagram or TikTok.

**Your own thumbnails:** drop an image in `thumbs/` and add `thumb: "thumbs/name.jpg"` to the entry. It replaces the YouTube still (and is the only way to get a still on a Vimeo tile). Use 16:9 (1280×720 is plenty) for horizontal tiles and 9:16 (720×1280) for vertical ones; keep them under ~300 KB each.

Before/after for the audio band: fill in `WORKS.ab.before` and `.after` with two audio paths. Leave both empty and the block hides itself.

Keep self-hosted audio small (a few MB each). Video goes on YouTube/Vimeo — unlisted is fine.

## Contact form

`hire.html` posts to Formspree. Create a free form at formspree.io, then replace `YOUR_FORM_ID` in the `<form action="…">`.

## Deploy on GitHub Pages

1. Put these files at the root of a repo named `<username>.github.io` (or any repo with Pages enabled on the main branch, root folder).
2. Push. The site is live at `https://<username>.github.io/` within a minute or two.
3. Custom domain: add a file named `CNAME` containing `gabeharder.com`, then in your DNS set `A` records for the apex to GitHub's four IPs (185.199.108.153, .109.153, .110.153, .111.153) and a `CNAME` for `www` → `<username>.github.io`. In the repo's Settings → Pages, enter the domain and tick "Enforce HTTPS" once it validates.

## Retune the look

All colors, fonts, and radii are tokens at the top of `style.css`.
