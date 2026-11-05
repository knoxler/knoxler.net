/* ============================================================
   knoxler.net — shared content helpers (Phase 2)
   Plain JS. All text is set with textContent (never innerHTML).
   External links open in a new tab with rel="noopener noreferrer".
   Missing images fall back to a labeled dashed placeholder.
   ============================================================ */
(() => {
  'use strict';

  const K = (window.Knox = window.Knox || {});
  K.render = K.render || {};

  // ---------- tiny element helper (textContent only) ----------
  K.el = function (tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  // ---------- links ----------
  K.isExternal = function (url) {
    const u = url == null ? '' : String(url).trim();
    if (!u) return false;
    if (/^(mailto:|tel:)/i.test(u)) return false;
    try {
      const resolved = new URL(u, window.location.href);
      return resolved.origin !== window.location.origin;
    } catch (err) {
      return false;
    }
  };

  K.link = function (label, url) {
    const a = document.createElement('a');
    a.textContent = label || 'Link';
    a.href = url;
    if (K.isExternal(url)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.classList.add('link-external');
    } else {
      a.classList.add('link-internal');
    }
    return a;
  };

  // ---------- placeholder box (missing images / empty states) ----------
  K.phBox = function (name, note) {
    const box = K.el('div', 'ph-box content-ph');
    box.append(K.el('span', 'ph-name', name || 'IMAGE'));
    if (note) box.append(K.el('span', 'ph-note', note));
    return box;
  };

  // Image with a graceful fallback to a labeled placeholder when the file
  // isn't there yet. `name`/`note` label the placeholder.
  K.image = function (src, alt, name, note) {
    const holder = K.el('div', 'img-slot');
    if (!src) {
      holder.append(K.phBox(name || 'IMAGE', note || 'image missing'));
      return holder;
    }
    const img = document.createElement('img');
    img.className = 'content-img';
    img.alt = alt || '';
    img.addEventListener('error', function () {
      holder.replaceChildren(K.phBox(name || src, note || 'image not found yet'));
    });
    holder.append(img);
    img.src = src; // set after the handler is attached
    return holder;
  };

  // ---------- tech + link rows ----------
  K.techChips = function (items) {
    if (!Array.isArray(items) || items.length === 0) return null;
    const row = K.el('div', 'tech-row');
    items.forEach(function (t) {
      if (t == null) return;
      row.append(K.el('span', 'tech-chip', String(t)));
    });
    return row.childNodes.length ? row : null;
  };

  K.linkRow = function (links) {
    if (!Array.isArray(links) || links.length === 0) return null;
    const row = K.el('div', 'link-row');
    links.forEach(function (l) {
      if (!l || !l.url) return;
      row.append(K.link(l.label || l.url, l.url));
    });
    return row.childNodes.length ? row : null;
  };

  // ---------- shared card (Projects + Games) ----------
  K.card = function (item) {
    item = item || {};
    const card = K.el('article', 'card');
    if (item.comingSoon) card.append(K.el('span', 'badge badge-soon', 'COMING SOON'));
    if (item.playable) card.append(K.el('span', 'badge badge-playable', 'PLAYABLE IN BROWSER'));
    if (item.screenshot) {
      card.append(K.image(item.screenshot, item.title, item.screenshot, 'screenshot'));
    }
    card.append(K.el('h3', 'card-title', item.title || 'Untitled'));
    if (item.role) card.append(K.el('p', 'card-role', item.role));
    const tech = K.techChips(item.tech);
    if (tech) card.append(tech);
    if (item.description) card.append(K.el('p', 'card-desc', item.description));
    const links = K.linkRow(item.links);
    if (links) card.append(links);
    return card;
  };

  // ---------- image viewer (Art + Field Journal) ----------
  // cfg: { image, alt, note } — the field names in each data entry.
  K.viewer = function (root, items, cfg) {
    cfg = cfg || {};
    const imgKey = cfg.image || 'image';
    const altKey = cfg.alt || 'title';
    const noteKey = cfg.note || 'note';

    if (!items.length) {
      root.append(K.el('p', 'empty-msg', 'No images yet — add some to the data file.'));
      return;
    }

    let idx = 0;
    const wrap = K.el('div', 'viewer');
    const imgHolder = K.el('div', 'viewer-img');
    const caption = K.el('div', 'viewer-caption');
    const counter = K.el('span', 'viewer-counter', '');
    const prev = K.el('button', 'viewer-btn', '←');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Previous image');
    const next = K.el('button', 'viewer-btn', '→');
    next.type = 'button';
    next.setAttribute('aria-label', 'Next image');
    const bar = K.el('div', 'viewer-bar');
    bar.append(prev, counter, next);
    wrap.append(imgHolder, caption, bar);
    root.append(wrap);

    function show(i) {
      idx = ((i % items.length) + items.length) % items.length;
      const it = items[idx];
      const src = it[imgKey];
      if (!src) {
        imgHolder.replaceChildren(K.phBox('IMAGE', 'image missing'));
      } else {
        const img = document.createElement('img');
        img.className = 'content-img';
        img.alt = it[altKey] || '';
        img.addEventListener('error', function () {
          imgHolder.replaceChildren(K.phBox(src, 'image not found yet'));
        });
        img.src = src;
        imgHolder.replaceChildren(img);
      }
      caption.replaceChildren(
        K.el('p', 'viewer-title', it[altKey] || 'Untitled'),
        K.el('p', 'viewer-note', it[noteKey] || '')
      );
      counter.textContent = (idx + 1) + ' / ' + items.length;
    }

    prev.addEventListener('click', function () { show(idx - 1); prev.focus(); });
    next.addEventListener('click', function () { show(idx + 1); next.focus(); });

    // Keyboard: arrows to move, Esc to close. Detaches itself once the
    // window (and this viewer) is removed from the DOM.
    function onKey(e) {
      if (!document.contains(wrap)) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      const target = e.target;
      if (target && target.closest && target.closest('.titlebar')) return; // let drag win
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
      else if (e.key === 'Escape') { e.preventDefault(); K.requestClose(root); }
    }
    document.addEventListener('keydown', onKey);

    show(0);
  };

  // ---------- achievements ----------
  K.achItem = function (a) {
    a = a || {};
    const li = K.el('li', 'ach-item' + (a.locked ? ' is-locked' : ''));
    li.append(K.image(a.badge, a.name, a.badge, 'badge'));
    const txt = K.el('div', 'ach-text');
    txt.append(K.el('p', 'ach-name', a.name || 'Unnamed'));
    if (a.description) txt.append(K.el('p', 'ach-desc', a.description));
    if (a.locked && a.hint) txt.append(K.el('p', 'ach-hint', 'Hint: ' + a.hint));
    li.append(txt);
    li.append(K.el('span', 'ach-points', (Number(a.points) || 0) + ' pts'));
    return li;
  };

  // ---------- data loading + error states ----------
  K.loadJSON = function (name) {
    return fetch('data/' + name + '.json', { headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(function (err) {
        throw new Error(
          'Could not read data/' + name + '.json (' + (err && err.message ? err.message : 'error') + ')'
        );
      });
  };

  // Friendly in-window message: names the broken file, points to the guide.
  K.errorBox = function (name) {
    const wrap = K.el('div', 'data-error');
    wrap.append(K.el('p', 'data-error-title', 'This window needs a fix'));
    wrap.append(K.el('p', '', 'The data file ' + name + ' could not be read, or it has a small mistake.'));
    wrap.append(
      K.el('p', '', 'Open data/README.md — it explains the three simple JSON rules and how to fix a broken file. Fix it and this window will show again.')
    );
    return wrap;
  };

  // Smaller one-line fault note (used on the Quick View page).
  K.faultNote = function (name) {
    return K.el('p', 'data-error', 'Note: ' + name + ' could not be read. See data/README.md to fix it.');
  };

  // Load a data file, render into a container, or show the friendly error.
  K.renderInto = function (container, dataName, renderFn) {
    container.replaceChildren(K.el('p', 'loading', 'Loading…'));
    K.loadJSON(dataName)
      .then(function (data) {
        try {
          container.replaceChildren();
          renderFn(container, data);
        } catch (err) {
          container.replaceChildren(K.errorBox(dataName + ' (render error)'));
        }
      })
      .catch(function () {
        container.replaceChildren(K.errorBox(dataName));
      });
  };

  // Close the enclosing window (used by the viewer's Esc key). main.js
  // listens for this bubbling event on the windows layer.
  K.requestClose = function (container) {
    const win = container && container.closest ? container.closest('.window') : null;
    if (win) win.dispatchEvent(new CustomEvent('knox:close', { bubbles: true }));
  };
})();
