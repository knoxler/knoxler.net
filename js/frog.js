/* ============================================================
   knoxler.net — Phase 3: frog assistant tips
   Click the frog to toggle a speech-bubble tip.
   Tips live in data/frog-tips.json (a plain array of strings) —
   add more there, no code changes needed.
   ============================================================ */
(() => {
  'use strict';

  const frog = document.querySelector('.frog[data-asset="frog"]');
  if (!frog) return;

  const FALLBACK_TIP = 'The frog is a little shy. Come back soon!';
  let tips = [];
  let lastIndex = -1;
  let bubble = null;

  fetch('data/frog-tips.json')
    .then((res) => {
      if (!res.ok) throw new Error('tips unavailable');
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        tips = data.filter((t) => typeof t === 'string' && t.trim().length > 0);
      }
    })
    .catch(() => {
      tips = [];
    });

  // Random tip, never repeating the previous one (until we've gone round).
  function pickTip() {
    if (tips.length === 0) return FALLBACK_TIP;
    let i = Math.floor(Math.random() * tips.length);
    if (tips.length > 1) {
      while (i === lastIndex) i = Math.floor(Math.random() * tips.length);
    }
    lastIndex = i;
    return tips[i];
  }

  function closeBubble() {
    if (bubble) {
      bubble.remove();
      bubble = null;
    }
  }

  function showBubble() {
    closeBubble();
    const b = document.createElement('div');
    b.className = 'frog-bubble';
    b.setAttribute('role', 'status'); // read aloud by screen readers
    b.textContent = pickTip();
    const screen = document.querySelector('.screen');
    (screen || document.body).appendChild(b);
    bubble = b;
  }

  frog.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bubble) closeBubble();
    else showBubble();
  });

  // Click anywhere else closes it.
  document.addEventListener('click', (e) => {
    if (!bubble) return;
    if (frog.contains(e.target) || bubble.contains(e.target)) return;
    closeBubble();
  });

  // Esc closes it.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBubble();
  });
})();
