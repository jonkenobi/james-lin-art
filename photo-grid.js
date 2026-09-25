document.addEventListener('DOMContentLoaded', () => {
  const reel = document.getElementById('reel');
  const rail = document.getElementById('indexRail');
  const albums = getVisibleAlbums();

  if (!albums.length) {
    reel.innerHTML = `<div class="empty-state">No albums yet.</div>`;
    return;
  }

  albums.forEach(album => {
    const cover = album.cover || (album.photos[0] && album.photos[0].src);

    const shot = document.createElement('a');
    shot.className = 'shot';
    shot.href = `album.html?album=${encodeURIComponent(album.id)}`;
    shot.dataset.title = album.title;
    shot.dataset.meta = album.subtitle || '';

    shot.innerHTML = `
      <img src="${cover}" alt="${album.title}" loading="lazy"${album.coverFocus ? ` style="--focus:${album.coverFocus}"` : ""}>
      <div class="info">
        <div class="title">${album.title}</div>
        ${album.subtitle ? `<div class="meta">${album.subtitle}</div>` : ''}
      </div>
    `;

    reel.appendChild(shot);
  });

  // Index-dot rail — same pattern as video.html's reel.
  const shots = Array.from(reel.querySelectorAll('.shot'));

  shots.forEach((shot, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to ' + shot.dataset.title);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      shot.scrollIntoView({ behavior: 'smooth' });
    });
    rail.appendChild(dot);
  });
  const dots = Array.from(rail.children);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const i = shots.indexOf(entry.target);
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        dots.forEach(d => d.classList.remove('active'));
        if (dots[i]) dots[i].classList.add('active');
      }
    });
  }, { threshold: [0, 0.6, 1] });

  shots.forEach(shot => observer.observe(shot));
});
