# James Lin Portfolio — Design Reference

This is a portfolio website to showcase the portfolio of James lin in photos/videos.

Main inspiration is this site: https://www.davidandyasmin.com/
Static HTML proof-of-concept, no build step. Pages:
- `index.html` — splash home (name + background video loop + links to the
  three sections below)
- `photo.html` — Photo section: **album list**, one album cover per
  full-bleed screen, scroll-snap — same reel pattern as `video.html`,
  just one album per "shot" instead of one photo
- `album.html` — Photo section: **single album view** (two-column photo
  grid + lightbox), opened by clicking an album cover on `photo.html`
- `video.html` — Video section
- `about.html` — About (portrait + bio + contact)

Shared data:
- `photos-data.js` — single source of truth for every album and its
  photos. Both `photo.html` and `album.html` read from this file. See
  the comments at the top of that file for how to reorder albums/photos,
  hide an album, and set covers.

Static asset folders sit flat next to the HTML files:
- `photos/<album-id>/` — one folder per album; `cover.jpg` plus numbered
  photos, read by `photo.html` (cover only) and `album.html` (full set)
- `videos/` — read by `video.html` and `index.html` (shared background loop)
- `images/` — read by `about.html` (portrait)

Read this before adding pages, sections, or editing styles, so new work stays
consistent with what's already built.

## Concept

The subject is photography/film, so the design borrows from a **contact sheet /
film strip** rather than a generic portfolio grid.

- **Video** (`video.html`) is full-bleed, one-clip-per-screen, scroll-snap
  — a reel.
- **Photo** (`photo.html` + `album.html`) is organized as **albums**, and
  keeps the reel feel at the list level: `photo.html` is a full-bleed,
  one-album-per-screen scroll-snap reel, exactly like the video page,
  just showing one album cover per screen instead of one photo. Clicking
  a cover is the one place the pattern changes — it opens `album.html`,
  where that album's photos switch to a two-column masonry grid that
  opens into a full-screen lightbox. So: reel to browse albums, grid +
  lightbox once you're inside one.
- Metadata (title, location, year, credit) set in monospace — this
  carries through album titles, subtitles, and video reel captions.
- A subtle 1px inset light border on every photo/video frame.
- The splash home (`index.html`) is the one page that breaks the "one frame
  full-bleed" pattern — it's a static, centered title card with a muted
  autoplay video loop behind it and a dark scrim for legibility, similar to
  the reference site's own homepage treatment.

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
- The album lightbox (`album.html`) is swipe-first: swipe left/right to
  move between photos, tap the dark backdrop (not the photo) to close.
  Arrow keys and an X button cover desktop/keyboard use, and on-screen
  prev/next tap zones only render at wider widths — mobile is expected to
  use swipe, not buttons.

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
  column, and `photo.html`/`album.html`'s content column (both prose/grid
  areas that need a reading width, capped around 1040px).
- Video reel (`video.html`) is one `100svh` section per item,
  `scroll-snap-type: y mandatory` on the scroll container, media as a
  `position:absolute; inset:0; object-fit:cover` layer, title/meta centered.
- `photo.html` is the same full-bleed reel structure as `video.html`:
  one `100svh` `<a>` per album, `scroll-snap-type: y mandatory` on the
  scroll container, cover image as a `position:absolute; inset:0;
  object-fit:cover` layer, title/subtitle centered near the bottom, plus
  the same desktop-only index-dot rail.
- `album.html` is a two-column masonry layout (photos keep their
  natural aspect ratio — no cropping — split alternately left/right in
  the order set in `photos-data.js`), opening into a full-screen lightbox
  on click.
- `index.html` is a static viewport-height splash — no scroll-snap, single
  screen, background video is decorative only (not part of the reel
  pattern).

## Media sizing — learned the hard way

Camera-original files are too large to drop straight into the site. A
3072×4797 / 15MB portrait rendered visibly grainy/soft in Chrome (large
source images downscaled a lot in-browser can look worse than a properly
pre-sized version, not better) and full-res photos ran up to 27MB, which is
a real load-time problem on mobile.

**Rule: resize before adding any photo/portrait to the site.**
- Album photos (`album.html`, full-bleed at up to viewport size in the
  lightbox): resize to a ~2400px long edge, JPEG quality ~85.
- Album covers (`photo.html`, full-bleed at up to viewport size, same as
  a video reel frame): resize to a ~2400px long edge, JPEG quality ~85.
- Portrait (`about.html`, displayed in a ~380px box): resize to a ~1600px
  long edge, JPEG quality ~85–90.
- Videos aren't covered by this — `.mov` files are fine to use as-is, but
  see the codec note below.

## Upload priority / storage

There are 7 albums planned in total. If total storage becomes a problem,
cut from the bottom of this priority order first (sample: the No. 1 album,
Iceland, is 400MB on its own, so a handful of albums can add up fast):

1. Highest priority — upload/finish first.
2. ...
3. ...
(See `priority` field per album in `photos-data.js` — that's the
canonical list, keep it in sync with reality as albums are added.)

Expected cadence: roughly one new album per year, with photos added to
existing albums 2–3 times per year. Reordering albums or photos within an
album is just reordering entries in `photos-data.js` — no renaming files
required.

## Conventions when adding media

**Adding a whole new album:**
1. Create `photos/<album-id>/` with a resized `cover.jpg` and numbered
   photos.
2. Add a new entry to `ALBUMS` in `photos-data.js` (copy an existing
   entry as a template). Title is location-only; ask James for a
   subtitle and a cover pick if one isn't obvious.
3. That's it — `photo.html` and `album.html` both read from this file,
   no HTML edits needed.

**Adding photos to an existing album:**
- Resize per the rule above, drop the files into `photos/<album-id>/`,
  and append entries to that album's `photos` array in
  `photos-data.js`, in the order they should appear.

**Reordering:**
- Album order on the grid = order of entries in the `ALBUMS` array.
- Photo order within an album = order of entries in that album's
  `photos` array (also the order the lightbox steps through).

**Videos** (`video.html`, inside `.reel`):
```html
<section class="clip" data-title="…" data-meta="Type — Credit — Year">
  <video src="videos/…mp4" muted loop playsinline preload="metadata"></video>
  <div class="info"><div class="title">…</div><div class="meta">…</div></div>
  <button class="mute-btn" aria-label="Toggle sound">🔇</button>
</section>
```
- Keep `muted loop playsinline` on every `<video>` — required for autoplay,
  not optional styling.
- `preload="metadata"` (not `auto`) — keeps initial page weight down; the
  IntersectionObserver in the page script plays/pauses based on which clip
  is on screen.
- Local video files live in a `videos/` folder next to `video.html`.
- `.mov` files (e.g. exported straight from an editor) may not play in all
  browsers depending on codec — Safari is usually fine, Chrome/Firefox can
  be hit or miss. Convert to H.264 `.mp4` if a clip doesn't play.

**Splash background video** (`index.html`):
```html
<div class="bg-video">
  <video src="videos/…mov" autoplay muted loop playsinline preload="auto"></video>
</div>
```
- Reads from the same `videos/` folder as `video.html` — no need to
  duplicate the file, just point `src` at whichever clip you want looping.
- `preload="auto"` here (not `metadata`) since it's the only video on the
  page and should start immediately.

**About** (`about.html`):
- Portrait image lives at `images/me.jpg` (or update the `src` in
  `.portrait img`), resized per the rule above.
- Bio is plain paragraphs in `.bio` — no special markup needed, just keep
  it to a few short paragraphs.

## Current content status

- `photo.html` / `album.html` — rebuilt around albums (list stays a
  full-bleed reel, grid + lightbox only inside an album); `photos-data.js`
  currently has 7 album placeholders (`iceland` + 6 stubs) with
  placeholder image paths — none of the real image files exist on disk
  yet, so covers/photos will 404 until real files are dropped in.
- `video.html` — 2 real videos in place (Animation Reel, Iceland).
- `index.html` — background loop set to the animation reel.
- `about.html` — real portrait in place; bio paragraphs are still
  placeholder text, clearly marked, meant to be swapped for real
  background/focus/work.
- Contact footer (`about.html`) has placeholder email/phone/socials.

## Open decisions / not yet built

- Each page still has its own duplicated `<style>` block (no shared CSS
  file) — fine for a proof of concept, but worth consolidating into one
  stylesheet if this grows past the current page count.
- No pinch-to-zoom in the lightbox — swipe-to-navigate and tap-backdrop-
  to-close only, matching the "don't make it tedious to click through"
  brief. Revisit if James wants zoom.
- Real album covers are needed from James for every album beyond
  Iceland — ask before launch.
