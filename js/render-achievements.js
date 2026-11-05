/* Achievements window — Steam/Xbox-style profile from data/achievements.json.
   Big total (sum of unlocked points), grouped by category, locked ones dimmed. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });

  const ORDER = ['Work', 'Art', 'Streaming', 'Life'];

  K.render.achievements = function (root, data) {
    const list = (data && data.achievements) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'No achievements yet — add some in data/achievements.json.'));
      return;
    }

    // Total = sum of points on the unlocked entries only.
    let total = 0;
    list.forEach(function (a) {
      if (a && !a.locked) total += Number(a.points) || 0;
    });
    const header = K.el('div', 'ach-header');
    header.append(K.el('div', 'ach-total', String(total)));
    header.append(K.el('div', 'ach-total-label', 'TOTAL POINTS'));
    root.append(header);

    // Group by category, keeping a stable, friendly order.
    const groups = {};
    list.forEach(function (a) {
      const cat = (a && a.category) || 'Other';
      (groups[cat] = groups[cat] || []).push(a);
    });
    const cats = Object.keys(groups).sort(function (a, b) {
      const ia = ORDER.indexOf(a);
      const ib = ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

    cats.forEach(function (cat) {
      const section = K.el('section', 'ach-cat');
      section.append(K.el('h3', 'ach-cat-title', cat));
      const ul = K.el('ul', 'ach-list');
      groups[cat].forEach(function (a) { ul.append(K.achItem(a)); });
      section.append(ul);
      root.append(section);
    });
  };
})();
