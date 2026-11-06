/* ============================================================
   knoxler.net — Phase 3: CRT power-on boot
   Runs after main.js (it reads the data-motion value main.js
   applied). Skippable with any key press or click.
   Reduced motion (OS setting or Settings toggle) skips it
   entirely — the desktop just appears.
   ============================================================ */
(() => {
  'use strict';

  const boot = document.getElementById('crt-boot');
  if (!boot) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionOff = document.documentElement.dataset.motion === 'off';

  // No animation allowed: no boot at all.
  if (reducedMotion || motionOff) {
    boot.remove();
    return;
  }

  // Unhide; the CSS keyframes (boot-glow, boot-label, boot-fade) drive the
  // whole effect. Total ~1.25s, nothing faster than ~300ms, low amplitude.
  boot.hidden = false;

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    window.removeEventListener('keydown', onSkip, true);
    window.removeEventListener('pointerdown', onSkip, true);
    boot.remove();
  }

  // Skip: quick fade-out instead of the full power-on.
  function onSkip() {
    boot.classList.add('boot-skipped');
    window.setTimeout(finish, 260);
  }

  window.addEventListener('keydown', onSkip, true);
  window.addEventListener('pointerdown', onSkip, true);

  // Normal end of the animation.
  boot.addEventListener('animationend', (e) => {
    if (e.animationName === 'boot-fade') finish();
  });

  // Safety net: never leave the overlay if an animation got killed
  // (e.g. Settings flipped to motion-off mid-boot).
  window.setTimeout(finish, 1800);
})();
