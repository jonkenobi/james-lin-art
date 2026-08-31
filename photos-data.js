/**
 * Album + photo data for the Photo section.
 *
 * HOW TO USE THIS FILE (for James / whoever maintains the site)
 * ---------------------------------------------------------------
 * - Each object in ALBUMS is one album. Order in this array = display
 *   order on the album grid (photo.html), so drag an object up/down in
 *   this list to reorder albums.
 * - Within an album, the `photos` array order = display order in the
 *   album grid AND lightbox. Reorder photos by reordering this array.
 * - `priority` is just documentation of upload priority (1 = do first).
 *   It doesn't drive anything in code — the array order does. Keep it
 *   here so it's easy to remember which albums matter most if storage
 *   ever gets tight.
 * - `include: false` fully hides an album from the site (grid + direct
 *   link) without deleting its data — use this if storage size forces
 *   cutting an album, so it's easy to switch back on later.
 * - `cover` is the "main page" photo James picks per album. If it's
 *   missing, the first photo in `photos` is used as a fallback — but
 *   ask James for a real cover pick rather than relying on that.
 * - Title is location-only ("Iceland"). `subtitle` is optional, free
 *   text James can add later (e.g. a date range or a short line).
 *
 * ---------------------------------------------------------------

 */

const SAMPLE_PHOTOS = [
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/1%20ICELAND%20PHOTOS/DSC09890.jpg", alt: "Iceland" },
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/2%20JAPAN%20PHOTOS/MAIN%20PAGE.jpg", alt: "Japan" },
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/3%20NEW%20YORK%20PHOTOS/MAIN%20PAGE.jpg", alt: "New York" },
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/4%20CHICAGO%20PHOTOS/MAIN%20PAGE.jpg", alt: "Chicago" },
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/5%20TAIWAN%20PHOTOS/MAIN%20PAGE.jpg", alt: "Taiwan" },
  { src: "https://pub-5a148723b7864053a58c9f6ade65f125.r2.dev/6%20HAWAII%20PHOTOS/MAIN%20PAGE.jpg", alt: "Hawaii" }
];

function samplePhoto(i) {
  return SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length];
}

const ALBUMS = [
  {
    id: "iceland",
    title: "Iceland",
    subtitle: "",
    priority: 1,
    include: true,
    cover: samplePhoto(0).src,
    photos: [
      samplePhoto(0), samplePhoto(1), samplePhoto(2),
      samplePhoto(3), samplePhoto(0), samplePhoto(1)
    ]
  },
  {
    id: "japan",
    title: "Japan",
    subtitle: "",
    priority: 2,
    include: true,
    cover: samplePhoto(1).src,
    photos: [samplePhoto(1), samplePhoto(2)]
  },
  {
    id: "album-3",
    title: "New York",
    subtitle: "",
    priority: 3,
    include: true,
    cover: samplePhoto(2).src,
    photos: [samplePhoto(2), samplePhoto(3)]
  },
  {
    id: "album-4",
    title: "Chicago",
    subtitle: "",
    priority: 4,
    include: true,
    cover: samplePhoto(3).src,
    photos: [samplePhoto(3)]
  },
  {
    id: "album-5",
    title: "Taiwan",
    subtitle: "",
    priority: 5,
    include: true,
    cover: samplePhoto(4).src,
    photos: [samplePhoto(4)]
  },
  {
    id: "album-6",
    title: "Hawaii",
    subtitle: "",
    priority: 6,
    // Example of an album excluded for storage reasons — flip to true
    // once there's room, no need to delete the entry.
    include: true,
    cover: samplePhoto(5).src,
    photos: [samplePhoto(5)]
  },
  {
    id: "album-7",
    title: "Others",
    subtitle: "",
    priority: 7,
    include: true,
    cover: samplePhoto(6).src,
    photos: [samplePhoto(6)]
  }
];

function getAlbum(id) {
  return ALBUMS.find(a => a.id === id);
}

function getVisibleAlbums() {
  return ALBUMS.filter(a => a.include !== false);
}