# James Lin Portfolio — Design Reference

This is a portfolio website to showcase the portfolio of James lin in photos/videos. 

Main inspiration is this site: https://www.davidandyasmin.com/
Static HTML proof-of-concept, no build step. Four top-level pages:
- `index.html` — splash home (name + background video loop + links to the
  three sections below)
- `photo.html` — Photo section
- `video.html` — Video section
- `about.html` — About (portrait + bio + contact)

Static asset folders sit flat next to the HTML files:
- `photos/` — read by `photo.html`
- `videos/` — read by `video.html` and `index.html` (shared background loop)
- `images/` — read by `about.html` (portrait)

Read this before adding pages, sections, or editing styles, so new work stays
consistent with what's already built.

## Concept

The subject is photography/film, so the design borrows from a **contact sheet /
film strip** rather than a generic portfolio grid. Photo and Video are both
full-bleed, one-piece-of-media-per-screen, scroll-snap experiences — the site
behaves like flipping through a reel or a stack of prints one at a time,
rather than browsing a grid.
- Metadata (title, location, year, credit) set in monospace, centered at the
  bottom of each frame, ~56px from the bottom edge (40px on mobile).
- A subtle 1px inset light border on every photo/video frame.
- A right-side index-dot rail (desktop only) shows position in the
  sequence and lets you jump directly to a frame.
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
- The desktop index-dot rail is a decorative extra that disappears under
  760px — never load-bearing for navigation.
- Videos use `playsinline muted loop` specifically because mobile Safari/
  Chrome will not autoplay otherwise.
- Touch scroll-snap was the deciding factor for both the photo and video
  reel's UX, not mouse-wheel behavior.

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
- **Display** (`h1`, logo, media titles): `Space Grotesk` — geometric,
  slightly technical, weight 500/700.
- **Body** (`Inter`): bio paragraphs, footer text.
- **Mono** (`IBM Plex Mono`): metadata, nav labels, splash tagline — this is
  what carries the "contact sheet" feeling. If it's a label or a piece of
  data (not a sentence), it's probably mono.

Loaded via Google Fonts in the `<head>` of each page (index.html only needs
Space Grotesk + IBM Plex Mono — no body copy there).

### Layout
- Full-bleed sections, no max-width container (except `about.html`'s bio
  column, which is prose and needs a reading width).
- Photo reel (`photo.html`) and video reel (`video.html`) share the same
  pattern: one `100svh` section per item, `scroll-snap-type: y mandatory`
  on the scroll container, media as a `position:absolute; inset:0;
  object-fit:cover` layer, title/meta centered.
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
- Photos (`photo.html`, full-bleed at up to viewport size): resize to a
  ~2400px long edge, JPEG quality ~85.
- Portrait (`about.html`, displayed in a ~380px box): resize to a ~1600px
  long edge, JPEG quality ~85–90.
- Videos aren't covered by this — `.mov` files are fine to use as-is, but
  see the codec note below.

## Conventions when adding media

**Photos** (`photo.html`, inside `.reel`):
```html
<section class="shot" data-title="…" data-meta="Location — Year">
  <img src="photos/…jpg" alt="…" loading="lazy">
  <div class="info"><div class="title">…</div><div class="meta">Location — Year</div></div>
</section>
```
- Local photo files live in a `photos/` folder next to `photo.html`, resized
  per the rule above before adding.
- `data-meta` (and the `.meta` div) are optional — omit both if you don't
  have a location/year worth stating, don't fabricate one.
- No frame-number tags or captions-on-hover — title/meta are always visible,
  centered at the bottom.

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

- `photo.html` — 4 real photos in place (Liberty Crossing, Air, Skyline,
  Dusk).
- `video.html` — 2 real videos in place (Animation Reel, Iceland).
- `index.html` — background loop set to the animation reel.
- `about.html` — real portrait in place; bio paragraphs are still
  placeholder text, clearly marked, meant to be swapped for real
  background/focus/work.
- Contact footer (`about.html`) has placeholder email/phone/socials.

## Open decisions / not yet built

- Each page still has its own duplicated `<style>` block (no shared CSS
  file) — fine for a proof of concept, but worth consolidating into one
  stylesheet if this grows past four pages.
- No lightbox/detail view on the photo or video reels — each item is
  already full-bleed, so this may not be needed.