document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get('album');
  const album = albumId ? getAlbum(albumId) : null;

  const heading = document.getElementById('albumHeading');
  const colLeft = document.getElementById('colLeft');
  const colRight = document.getElementById('colRight');

  if (!album) {
    heading.innerHTML = `<div class="title">Album not found</div>`;
    return;
  }

  heading.innerHTML = `
    <div class="title">${album.title}</div>
    ${album.subtitle ? `<div class="subtitle">${album.subtitle}</div>` : ''}
  `;

  // Distribute photos left/right in order, so reading order down the
  // page matches the order James set in photos-data.js.
  album.photos.forEach((photo, i) => {
    const fig = document.createElement('div');
    fig.className = 'grid-photo';
    fig.dataset.index = i;
    fig.innerHTML = `<img src="${photo.src}" alt="${photo.alt || album.title}" loading="lazy">`;
    fig.addEventListener('click', () => openLightbox(i));
    (i % 2 === 0 ? colLeft : colRight).appendChild(fig);
  });

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    const photo = album.photos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt || album.title;
    lightboxCounter.textContent = `${currentIndex + 1} / ${album.photos.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + album.photos.length) % album.photos.length;
    renderLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % album.photos.length;
    renderLightbox();
  }

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

  // Click on the dark backdrop (not the image itself) closes the lightbox.
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch swipe (left/right) to navigate between photos.
  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Ignore mostly-vertical swipes so scroll gestures aren't hijacked.
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx > 0) showPrev(); else showNext();
  }, { passive: true });
});
