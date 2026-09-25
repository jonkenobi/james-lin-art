# James Lin Portfolio — Design Reference

Portfolio website showcasing James Lin's photos, videos, and art.

Main inspiration: https://www.davidandyasmin.com/
Static HTML, no build step. Deployed as Cloudflare Workers static assets
(`wrangler.jsonc`, `assets.directory = ./`). Pages:
- `index.html` — splash home (name + background video loop + nav)
- `photo.html` — Photo section: **album list**, one album cover per
  full-bleed screen, scroll-snap. Script: `photo-grid.js`.
- `album.html` — Photo section: **single album view** (two-column photo
  grid + lightbox), opened via `album.html?album=<id>` from `photo.html`.
  Script: `album-view.js`.
- `video.html` — Video section (reel)
- `art.html` — Art section: manual row/column image layout + lightbox +
  one bottom video. Scripts: `art-data.js`, `art-view.js`.
- `about.html` — About (portrait + bio + signature + projects banner +
  contact)

Nav on every page: Photo / Video / Art / About.

Shared data:
- `photos-data.js` — single source of truth for every album and its
  photos. `photo.html` and `album.html` both read it. Exposes
  `getAlbum(id)` and `getVisibleAlbums()`. See the comments at the top
  for how to reorder, hide an album (`include:false`), set `cover`, and
  set `coverFocus` (mobile-only `object-position` for the cover crop,
  e.g. `"83% 50%"`).
- `art-data.js` — `ART_ROWS`: array of rows, each row an array of
  columns, each column an array of filenames stacked top-to-bottom.
  Reorder by editing the array. `ART_PIECES` is derived (flattened) for
  the lightbox.

## Media hosting — Cloudflare R2, not the repo

No photos or videos live in this repo (deleted once they moved to R2).
Only `images/` is local (`me.jpg`, `about_signature.png`,
`projects-banner.png`, used by `about.html`).

Three public R2 buckets, each referenced via its `*.r2.dev` URL:
- Photos: `R2_BASE` in `photos-data.js`
  (`pub-5a148723b7864053a58c9f6ade65f125.r2.dev`). One folder per album,
  named `"<priority> <NAME>"`, e.g. `1 ICELAND PHOTOS`, `9 OTHERS`.
  Folder and file names are URL-encoded by `url()` so spaces are fine.
- Videos: `pub-c7e1b90425bb481a96e4ee0a81e7a49c.r2.dev`, hardcoded in
  `video.html` and `index.html` (`websitemainpagesizzle.mov` is the splash
  loop).
- Art: `ART_R2_BASE` in `art-data.js`
  (`pub-ef7ebd14b56d4175889bbc88a95dcb1e.r2.dev`), also hosts
  `Sequence 03.mp4` for the bottom video on `art.html`.

Uploading: `upload-file.js` (Node, `@aws-sdk/client-s3` + `lib-storage`,
multipart, for large files). Edit the path/bucket/key at the bottom and run:
```
R2_ACCOUNT_ID=xxx R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=xxx node upload-file.js
```
Small files can just be dropped in via the Cloudflare dashboard.

Listing bucket contents (replace bucket name and token):
```
curl "https://api.cloudflare.com/client/v4/accounts/de91f371fdad2a3f5568760ea834e19d/r2/buckets/images/objects?per_page=1000" \
  -H "Authorization: Bearer $token"
```
Extract the `key` values — those are the filenames to put in the data files.

### Known performance problem (as of 2026-09)

- `*.r2.dev` URLs are Cloudflare's dev endpoint: not edge-cached, rate
  limited. "Fast on second load" is only the browser cache. Fix: attach a
  custom domain to each bucket (R2 > bucket > Settings > Custom Domains),
  then add a Cache Rule (1-year edge + browser TTL) and enable Smart
  Tiered Cache. Cache Reserve (paid) stops edge eviction of rarely-viewed
  objects. Then point `R2_BASE`, `ART_R2_BASE`, and the video `src`s at
  the custom domains.
- Files in R2 are mostly camera originals (photos 18–24 MB each, reel
  `.mov` 663 MB). They were never resized per the rule below. No
  Cloudflare setting fixes that — resize/re-encode and re-upload.

## Concept

The subject is photography/film, so the design borrows from a **contact sheet /
film strip** rather than a generic portfolio grid.

- **Video** (`video.html`) is full-bleed, one-clip-per-screen, scroll-snap
  — a reel.
- **Photo** (`photo.html` + `album.html`) is organized as **albums**, and
  keeps the reel feel at the list level: `photo.html` is a full-bleed,
  one-album-per-screen scroll-snap reel, exactly like the video page,
  just showing one album cover per screen. Clicking a cover opens
  `album.html`, where that album's photos switch to a two-column masonry
  grid that opens into a full-screen lightbox. Reel to browse albums,
  grid + lightbox once inside one.
- **Art** (`art.html`) is a scrolling page of hand-laid rows (see
  `art-data.js`), same lightbox as `album.html`, and one reel-style
  video section at the bottom (same play-on-visible + mute button
  pattern as `video.html`).
- Metadata (title, location, year, credit) set in monospace — this
  carries through album titles, subtitles, and video reel captions.
- A subtle 1px inset light border on every photo/video frame.
- The splash home (`index.html`) is the one page that breaks the "one frame
  full-bleed" pattern — a static, centered title card with a muted
  autoplay video loop behind it and a dark scrim for legibility.
- Lightbox backdrop is translucent (`.35`) so the blurred grid shows
  through behind the photo.

This is the one signature idea to protect. Don't dilute it with unrelated
decorative elements (drop shadows, gradients, icons) — the whole design is
meant to read as quiet, disciplined, and slightly analog.

## Audience / platform priority

**Mobile is the primary viewport.** Most visitors will land on phones. PC
compatibility matters but is secondary — when a decision trades off between
the two, default to what works best on mobile first, then verify it still
holds up on desktop. Concretely:
- Videos use `playsinline muted loop` specifically because mobile Safari/
  Chrome will not autoplay otherwise.
- Touch scroll-snap was the deciding factor for the video reel's UX, not
  mouse-wheel behavior.
- Album covers crop with `object-fit: cover`; on mobile portrait the crop
  is steered with `coverFocus` per album so the subject stays in frame.
  Desktop ignores it. (An earlier "show full image on mobile" attempt was
  reverted — cropping + focus point won.)
- The lightbox (`album.html`, `art.html`) is swipe-first: swipe left/right
  to move between photos, tap the dark backdrop (not the photo) to close.
  Arrow keys, Escape, and an X button cover desktop/keyboard use; on-screen
  prev/next tap zones only render at wider widths.

## Tokens

### Color
```
--bg:      #121210   near-black, warm not cool
--fg:      #f3f1ea   warm off-white (not pure white)
--muted:   #8f8c81   secondary text, metadata, inactive nav
--line:    #2c2b26   hairlines, dividers
--accent:  #c9c0a6   sparing use only (link hover, active states)
```
Deliberately avoided: pure black/white, terracotta/clay tones, any bright
accent color. Monochrome-plus-warmth, matching the reference site's restraint.

### Type
- **Display** (`h1`, logo, media titles, album titles): `Space Grotesk` —
  geometric, slightly technical, weight 500/700.
- **Body** (`Inter`): bio paragraphs, footer text.
- **Mono** (`IBM Plex Mono`): metadata, nav labels, album subtitles, lightbox
  counter — this is what carries the "contact sheet" feeling. If it's a
  label or a piece of data (not a sentence), it's probably mono.

Loaded via Google Fonts in the `<head>` of each page (index.html only needs
Space Grotesk + IBM Plex Mono — no body copy there).

### Layout
- Full-bleed sections, no max-width container except: `about.html`'s bio
  column, and `album.html` / `art.html`'s content column (prose/grid
  areas that need a reading width, capped around 1040px).
- Video reel (`video.html`) is one `100svh` section per item,
  `scroll-snap-type: y mandatory` on the scroll container, media as a
  `position:absolute; inset:0; object-fit:cover` layer, title/meta centered.
- `photo.html` is the same full-bleed reel structure as `video.html`:
  one `100svh` `<a>` per album, cover image as an `object-fit:cover`
  layer, title/subtitle centered near the bottom, plus the same
  desktop-only index-dot rail.
- `album.html` is a two-column masonry layout (photos keep their
  natural aspect ratio — no cropping — split alternately left/right in
  the order set in `photos-data.js`), opening into a full-screen lightbox
  on click.
- `art.html` rows: columns in a row share width equally; images keep
  natural aspect ratio, so uneven column heights are expected.
- `index.html` is a static viewport-height splash — no scroll-snap, single
  screen, background video is decorative only.

## Media sizing — learned the hard way

Camera-original files are too large to serve straight from R2. A
3072×4797 / 15MB portrait rendered visibly grainy/soft in Chrome (large
source images downscaled a lot in-browser can look worse than a properly
pre-sized version), and full-res photos run 18–27MB, a real load-time
problem on mobile.

**Rule: resize before uploading any photo/portrait to R2.**
- Album photos and covers (full-bleed at up to viewport size): ~2400px
  long edge, JPEG quality ~85.
- Art pieces: same as album photos.
- Portrait (`about.html`, displayed in a ~380px box): ~1600px long edge,
  JPEG quality ~85–90.
- Videos: convert to H.264 `.mp4` before upload. `.mov` straight from an
  editor may not play in Chrome/Firefox and is usually huge.

## Upload priority / storage

Albums carry a `priority` field in `photos-data.js` (1 = highest); the R2
folder name is prefixed with the same number. If total storage becomes a
problem, cut from the bottom of that order first (Iceland alone is ~400MB
unresized).

Expected cadence: roughly one new album per year, with photos added to
existing albums 2–3 times per year. Reordering albums or photos is just
reordering entries in `photos-data.js` — no renaming files required.

## Conventions when adding media

**Adding a whole new album:**
1. Resize photos, then upload them to the photos bucket under a folder
   named `"<priority> <NAME>"`.
2. Add a new entry to `ALBUMS` in `photos-data.js` (copy an existing
   entry as a template; use `url(folder, file)` / `photos(folder, files,
   alt)`). Title is location-only; ask James for a subtitle, a cover
   pick, and a `coverFocus` if the subject is off-center.
3. That's it — no HTML edits needed.

**Adding photos to an existing album:**
- Resize, upload to that album's R2 folder, append filenames to the
  album's `photos(...)` list in the order they should appear.

**Adding art:**
- Upload to the art bucket, add the filename into `ART_ROWS` in
  `art-data.js` at the row/column position wanted.

**Reordering:**
- Album order on the reel = order of entries in `ALBUMS`.
- Photo order within an album = order in that album's `photos` list (also
  the lightbox order).
- Art order = position in `ART_ROWS`.

**Videos** (`video.html`, inside `.reel`):
```html
<section class="clip" data-title="…" data-meta="Type — Credit — Year">
  <video src="https://<videos-bucket>.r2.dev/….mp4" muted loop playsinline preload="metadata"></video>
  <div class="info"><div class="title">…</div><div class="meta">…</div></div>
  <button class="mute-btn" aria-label="Toggle sound">🔇</button>
</section>
```
- Keep `muted loop playsinline` on every `<video>` — required for autoplay.
- `preload="metadata"` (not `auto`) — keeps initial page weight down; the
  IntersectionObserver plays/pauses based on which clip is on screen.

**Splash background video** (`index.html`):
```html
<div class="bg-video">
  <video src="https://<videos-bucket>.r2.dev/…" autoplay muted loop playsinline preload="auto"></video>
</div>
```
- `preload="auto"` here since it's the only video on the page and should
  start immediately.

**About** (`about.html`):
- Portrait at `images/me.jpg`, signature at `images/about_signature.png`,
  projects banner at `images/projects-banner.png` (full strip shown on
  desktop, cropped on mobile).
- Bio is plain paragraphs in `.bio` — keep it to a few short paragraphs.

## Open decisions / not yet built

- Each page still has its own duplicated `<style>` block (no shared CSS
  file), and `album-view.js` / `art-view.js` duplicate the lightbox code.
  Fine for now; consolidate if pages keep growing.
- No pinch-to-zoom in the lightbox. Revisit if James wants zoom.
- R2 custom domain + caching and media resizing (see "Known performance
  problem" above) are the next infra tasks.
