document.addEventListener('DOMContentLoaded', () => {
  const rowsEl = document.getElementById('artRows');

  let flatIndex = 0;
  ART_ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'art-row';

    row.forEach(column => {
      const colEl = document.createElement('div');
      colEl.className = 'art-col';

      column.forEach(filename => {
        const piece = ART_PIECES[flatIndex];
        const i = flatIndex;
        const tile = document.createElement('div');
        tile.className = 'art-tile';
        tile.innerHTML = `<img src="${piece.src}" alt="${piece.alt}" loading="lazy">`;
        tile.addEventListener('click', () => openLightbox(i));
        colEl.appendChild(tile);
        flatIndex++;
      });

      rowEl.appendChild(colEl);
    });

    rowsEl.appendChild(rowEl);
  });

  // ---- Lightbox (same pattern as album-view.js) ----
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
    const piece = ART_PIECES[currentIndex];
    lightboxImg.src = piece.src;
    lightboxImg.alt = piece.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${ART_PIECES.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + ART_PIECES.length) % ART_PIECES.length;
    renderLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % ART_PIECES.length;
    renderLightbox();
  }

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

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

  let touchStartX = 0, touchStartY = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) showPrev(); else showNext();
  }, { passive: true });

  // ---- Bottom video (same play-on-visible pattern as video.html) ----
  const artVideoSection = document.getElementById('artVideo');
  if (artVideoSection) {
    const artVideoEl = document.getElementById('artVideoEl');
    const artVideoMute = document.getElementById('artVideoMute');

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          artVideoEl.play().catch(() => {});
        } else {
          artVideoEl.pause();
        }
      });
    }, { threshold: [0, 0.6, 1] });
    videoObserver.observe(artVideoSection);

    artVideoMute.addEventListener('click', () => {
      artVideoEl.muted = !artVideoEl.muted;
      artVideoMute.textContent = artVideoEl.muted ? '🔇' : '🔊';
    });
  }
});