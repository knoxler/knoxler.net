/* ============================================================
   knoxler.net — Phase 1: static desktop
   Plain JS, no frameworks. DOM built with createElement/textContent only.
   ============================================================ */
(() => {
  'use strict';

  // ---------- safe localStorage (storage may be blocked) ----------
  const store = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (err) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (err) {
        return false;
      }
    },
  };

  // ---------- settings (CRT flicker + motion) ----------
  const SETTINGS_KEY = 'knoxler.settings';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isOnOrOff = (v) => v === 'on' || v === 'off';

  let storedSettings = null;
  const rawSettings = store.get(SETTINGS_KEY);
  if (rawSettings) {
    try {
      storedSettings = JSON.parse(rawSettings);
    } catch (err) {
      storedSettings = null;
    }
  }

  const settings = {
    // Phase 3: flicker is slow and subtle, so it ships ON. It is still
    // auto-off under reduced motion (the motion default + CSS guards) and
    // always toggleable in Settings.
    flicker: storedSettings && isOnOrOff(storedSettings.flicker) ? storedSettings.flicker : 'on',
    // Respect the system reduced-motion preference until the user chooses.
    motion:
      storedSettings && isOnOrOff(storedSettings.motion)
        ? storedSettings.motion
        : reducedMotion.matches
          ? 'off'
          : 'on',
  };
  const userChose = {
    flicker: !!(storedSettings && isOnOrOff(storedSettings.flicker)),
    motion: !!(storedSettings && isOnOrOff(storedSettings.motion)),
  };

  function applySettings() {
    document.documentElement.dataset.flicker = settings.flicker;
    document.documentElement.dataset.motion = settings.motion;
  }

  function saveSettings() {
    store.set(SETTINGS_KEY, JSON.stringify(settings));
  }

  applySettings();

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', () => {
      if (!userChose.motion) {
        settings.motion = reducedMotion.matches ? 'off' : 'on';
        applySettings();
      }
    });
  }

  // ---------- folders (titles stay plain and obvious) ----------
  const FOLDERS = [
    { id: 'about', title: 'About Me' },
    { id: 'projects', title: 'Projects' },
    { id: 'games', title: 'Games' },
    { id: 'art', title: 'Art' },
    { id: 'commissions', title: 'Commissions' },
    { id: 'streams', title: 'Streams' },
    { id: 'reviews', title: 'Reviews' },
    { id: 'school', title: 'School' },
    { id: 'achievements', title: 'Achievements' },
    { id: 'journal', title: 'Field Journal' },
    { id: 'corner', title: 'My Corner' },
    { id: 'findme', title: 'Find Me' },
    { id: 'music', title: 'Music Player' },
    { id: 'recycle', title: 'Recycle Bin' },
  ];

  const windowsLayer = document.getElementById('windows');
  const taskbarWindows = document.getElementById('taskbar-windows');
  const taskbarEl = document.getElementById('taskbar');
  const isCoarse = () => window.matchMedia('(pointer: coarse)').matches;

  // ---------- fit the monitor to the window (no page scroll) ----------
  // The CRT is a fixed-size design canvas; --scale shrinks/grows the whole
  // monitor so it always fits the viewport. Phones skip scaling (the
  // full-bleed mobile layout fills the viewport instead).
  const crtEl = document.querySelector('.crt');
  let currentScale = 1;

  function fitCrt() {
    if (!crtEl) return;
    if (window.innerWidth <= 720) {
      currentScale = 1;
      document.documentElement.style.setProperty('--scale', '1');
      return;
    }
    const pad = 20;
    const scale = Math.min(
      (window.innerWidth - pad) / crtEl.offsetWidth,
      (window.innerHeight - pad) / crtEl.offsetHeight,
      1.25,
    );
    currentScale = Math.max(scale, 0.1);
    document.documentElement.style.setProperty('--scale', String(currentScale));
  }

  fitCrt();
  window.addEventListener('resize', fitCrt);

  let zCounter = 10;
  const openWindows = new Map(); // id -> { root, titlebar, taskBtn, minimized }

  function bringToFront(root) {
    zCounter += 1;
    root.style.zIndex = String(zCounter);
  }

  function makeButton(text, ariaLabel, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }

  function comingSoonBody() {
    const body = document.createElement('div');
    const heading = document.createElement('p');
    heading.className = 'coming-soon';
    heading.textContent = 'Coming soon';
    const note = document.createElement('p');
    note.className = 'coming-note';
    note.textContent = 'This window arrives in a later update.';
    body.append(heading, note);
    return body;
  }

  function settingsBody() {
    const body = document.createElement('div');
    const rows = [
      { key: 'flicker', label: 'CRT flicker' },
      { key: 'motion', label: 'Motion effects' },
    ];
    rows.forEach((row) => {
      const label = document.createElement('label');
      label.className = 'setting-row';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = settings[row.key] === 'on';
      input.addEventListener('change', () => {
        settings[row.key] = input.checked ? 'on' : 'off';
        userChose[row.key] = true;
        applySettings();
        saveSettings();
      });
      const text = document.createElement('span');
      text.textContent = row.label;
      label.append(input, text);
      body.append(label);
    });
    const note = document.createElement('p');
    note.className = 'coming-note';
    note.textContent =
      'Choices are saved in this browser. ' +
      'Your system reduced-motion preference is respected automatically.';
    body.append(note);
    return body;
  }

  // ---------- window lifecycle ----------

  function positionInitial(root) {
    if (isCoarse()) return; // mobile: CSS positions windows as a sheet
    const n = openWindows.size % 8;
    root.style.left = 24 + n * 22 + 'px';
    root.style.top = 18 + n * 18 + 'px';
  }

  function enableDrag(root, titlebar) {
    // Pointer drag (fine pointers only).
    titlebar.addEventListener('pointerdown', (e) => {
      if (isCoarse() || e.button !== 0 || e.target.closest('button')) return;
      e.preventDefault();
      bringToFront(root);
      // getBoundingClientRect is post-transform; convert to design px by
      // dividing by the current CRT scale so 1:1 drag feels right.
      const s = Math.max(currentScale, 0.05);
      const rect = root.getBoundingClientRect();
      const layerRect = windowsLayer.getBoundingClientRect();
      const rectW = rect.width / s;
      const rectH = rect.height / s;
      const dx = (e.clientX - rect.left) / s;
      const dy = (e.clientY - rect.top) / s;
      const layerW = layerRect.width / s;
      const layerH = layerRect.height / s;
      const tbH = taskbarEl ? taskbarEl.offsetHeight : 0;
      root.classList.add('dragging');

      const move = (ev) => {
        const maxX = Math.max(0, layerW - rectW);
        const maxY = Math.max(0, layerH - tbH - rectH); // stop above the taskbar
        const x = Math.min(Math.max((ev.clientX - layerRect.left - dx) / s, 0), maxX);
        const y = Math.min(Math.max((ev.clientY - layerRect.top - dy) / s, 0), maxY);
        root.style.left = x + 'px';
        root.style.top = y + 'px';
      };
      const stop = () => {
        window.removeEventListener('pointermove', move, true);
        window.removeEventListener('pointerup', stop, true);
        window.removeEventListener('pointercancel', stop, true);
        root.classList.remove('dragging');
      };
      window.addEventListener('pointermove', move, true);
      window.addEventListener('pointerup', stop, true);
      window.addEventListener('pointercancel', stop, true);
    });

    // Keyboard drag: arrow keys move the focused window (Shift = bigger steps).
    titlebar.addEventListener('keydown', (e) => {
      if (isCoarse()) return;
      const step = e.shiftKey ? 24 : 8;
      let dx = 0;
      let dy = 0;
      if (e.key === 'ArrowLeft') dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else if (e.key === 'ArrowUp') dy = -step;
      else if (e.key === 'ArrowDown') dy = step;
      else return;
      e.preventDefault();
      const x = (parseFloat(root.style.left) || root.offsetLeft) + dx;
      const y = (parseFloat(root.style.top) || root.offsetTop) + dy;
      root.style.left = Math.max(0, x) + 'px';
      root.style.top = Math.max(0, y) + 'px';
    });
  }

  function createWindow(id, winTitle, bodyNode) {
    const root = document.createElement('div');
    root.className = 'window';
    root.dataset.window = id;
    root.setAttribute('role', 'dialog');

    const titlebar = document.createElement('div');
    titlebar.className = 'titlebar';
    titlebar.tabIndex = 0;
    titlebar.setAttribute('aria-label', winTitle + ' window — drag with arrow keys');

    const titleEl = document.createElement('span');
    titleEl.className = 'title';
    titleEl.id = 'win-title-' + id;
    titleEl.textContent = winTitle;
    root.setAttribute('aria-labelledby', titleEl.id);

    const buttons = document.createElement('span');
    buttons.className = 'titlebar-buttons';
    buttons.append(
      makeButton('—', 'Minimize ' + winTitle, () => minimize(id)),
      makeButton('×', 'Close ' + winTitle, () => closeWindow(id)),
    );

    titlebar.append(titleEl, buttons);

    const body = document.createElement('div');
    body.className = 'window-body';
    body.append(bodyNode);

    root.append(titlebar, body);
    windowsLayer.append(root);
    positionInitial(root);
    enableDrag(root, titlebar);
    root.addEventListener('pointerdown', () => bringToFront(root));
    bringToFront(root);

    const taskBtn = makeButton(winTitle, winTitle + ' — restore or minimize', () => {
      const w = openWindows.get(id);
      if (!w) return;
      if (w.minimized) restore(id);
      else minimize(id);
    });
    taskBtn.className = 'taskbtn';
    taskBtn.setAttribute('aria-pressed', 'false');
    taskbarWindows.append(taskBtn);

    openWindows.set(id, { root, titlebar, taskBtn, minimized: false });
    titlebar.focus();
  }

  function minimize(id) {
    const w = openWindows.get(id);
    if (!w) return;
    w.minimized = true;
    w.root.hidden = true;
    w.taskBtn.classList.add('is-minimized');
    w.taskBtn.setAttribute('aria-pressed', 'true');
  }

  function restore(id) {
    const w = openWindows.get(id);
    if (!w) return;
    w.minimized = false;
    w.root.hidden = false;
    w.taskBtn.classList.remove('is-minimized');
    w.taskBtn.setAttribute('aria-pressed', 'false');
    bringToFront(w.root);
    w.titlebar.focus();
  }

  function closeWindow(id) {
    const w = openWindows.get(id);
    if (!w) return;
    w.root.remove();
    w.taskBtn.remove();
    openWindows.delete(id);
  }

  // The image viewer (Esc) asks its window to close via this bubbling event.
  windowsLayer.addEventListener('knox:close', (e) => {
    const win = e.target && e.target.closest ? e.target.closest('.window') : null;
    if (win && win.dataset.window) closeWindow(win.dataset.window);
  });

  // window id -> data file (folder ids and file names don't always match:
  // journal->field-journal, corner->my-corner, findme->find-me)
  const DATA_MAP = {
    about: 'about.json',
    projects: 'projects.json',
    games: 'games.json',
    art: 'art.json',
    commissions: 'commissions.json',
    streams: 'streams.json',
    reviews: 'reviews.json',
    school: 'school.json',
    achievements: 'achievements.json',
    journal: 'field-journal.json',
    corner: 'my-corner.json',
    findme: 'find-me.json',
  };

  function showFolder(folder) {
    if (openWindows.has(folder.id)) {
      restore(folder.id);
      return;
    }
    const K = window.Knox;
    const renderFn = K && K.render ? K.render[folder.id] : null;
    const dataName = DATA_MAP[folder.id];
    const container = document.createElement('div');
    container.className = 'window-content';
    if (renderFn && dataName) {
      K.renderInto(container, dataName, renderFn);
    } else {
      // No content yet (Music Player, Recycle Bin) — keep the coming-soon body.
      container.append(comingSoonBody());
    }
    createWindow(folder.id, folder.title, container);
  }

  function openSettings() {
    if (openWindows.has('settings')) {
      restore('settings');
      return;
    }
    createWindow('settings', 'Settings', settingsBody());
  }

  // ---------- desktop icons ----------
  // Double-click opens (mouse). Single tap opens (touch).
  // Enter / Space opens (keyboard).
  document.querySelectorAll('.icon[data-window]').forEach((icon) => {
    const folder = FOLDERS.find((f) => f.id === icon.dataset.window);
    if (!folder) return;
    icon.addEventListener('dblclick', () => showFolder(folder));
    icon.addEventListener('click', () => {
      if (isCoarse()) showFolder(folder);
    });
    icon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showFolder(folder);
      }
    });
  });

  // ---------- start menu ----------
  const startBtn = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  const menuFolders = document.getElementById('start-menu-folders');
  const menuSystem = document.getElementById('start-menu-system');

  FOLDERS.forEach((folder) => {
    const item = makeButton(folder.title, 'Open ' + folder.title, () => {
      hideStartMenu();
      showFolder(folder);
    });
    item.className = 'start-item';
    menuFolders.append(item);
  });

  const settingsItem = makeButton('Settings', 'Open Settings', () => {
    hideStartMenu();
    openSettings();
  });
  settingsItem.className = 'start-item';
  const quickLink = document.createElement('a');
  quickLink.className = 'start-item';
  quickLink.href = 'quick.html';
  quickLink.textContent = 'Quick View';
  menuSystem.append(settingsItem, quickLink);

  function showStartMenu() {
    startMenu.hidden = false;
    startBtn.setAttribute('aria-expanded', 'true');
    const first = startMenu.querySelector('.start-item');
    if (first) first.focus();
  }

  function hideStartMenu() {
    startMenu.hidden = true;
    startBtn.setAttribute('aria-expanded', 'false');
  }

  startBtn.addEventListener('click', () => {
    if (startMenu.hidden) showStartMenu();
    else hideStartMenu();
  });
  startBtn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && startMenu.hidden) {
      e.preventDefault();
      showStartMenu();
    }
  });
  document.addEventListener('click', (e) => {
    if (startMenu.hidden || e.target === startBtn || startMenu.contains(e.target)) return;
    hideStartMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !startMenu.hidden) {
      hideStartMenu();
      startBtn.focus();
    }
  });

  // ---------- taskbar clock ----------
  const clockEl = document.getElementById('clock');
  function tickClock() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = h + ':' + m + ' ' + (now.getHours() >= 12 ? 'PM' : 'AM');
  }
  tickClock();
  window.setInterval(tickClock, 15000);

  // ---------- art placeholders: swap in real files when they appear ----------
  // Every [data-asset] element is probed; a matching /assets/<name>.png
  // replaces the dashed box. No code changes needed when art lands.
  function probeAsset(name) {
    return fetch('assets/' + name + '.png', { method: 'HEAD' })
      .then((res) => res.ok)
      .catch(() => false);
  }

  function fillAssetBox(box) {
    const name = box.dataset.asset;
    if (!name) return Promise.resolve();
    return probeAsset(name).then((ok) => {
      if (!ok) return;
      const img = document.createElement('img');
      img.className = 'asset-img';
      img.src = 'assets/' + name + '.png';
      img.alt = ''; // decorative; real alt text arrives with Phase 2 content
      box.classList.add('has-asset');
      box.replaceChildren(img);
    });
  }

  const WALLPAPER_LAYERS = [
    'wallpaper-sky',
    'wallpaper-mountains',
    'wallpaper-midground',
    'wallpaper-foreground',
  ];

  function initAssets() {
    const boxes = Array.from(document.querySelectorAll('.icon-box[data-asset], .frog[data-asset]'));
    Promise.all(boxes.map((box) => fillAssetBox(box).catch(() => {}))).catch(() => {});

    Promise.all(WALLPAPER_LAYERS.map((name) => probeAsset(name).then((ok) => ({ name, ok }))))
      .then((results) => {
        let allPresent = true;
        results.forEach((r) => {
          if (!r.ok) {
            allPresent = false;
            return;
          }
          const layer = document.querySelector('.wallpaper-layer[data-asset="' + r.name + '"]');
          if (!layer) return;
          const img = document.createElement('img');
          img.className = 'asset-img';
          img.src = 'assets/' + r.name + '.png';
          img.alt = '';
          layer.append(img);
        });
        if (allPresent) {
          const ph = document.getElementById('wallpaper-placeholder');
          if (ph) ph.hidden = true;
        }
      })
      .catch(() => {});
  }

  initAssets();
})();
