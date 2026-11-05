/* My Corner window — from data/my-corner.json:
   a list of favorite repos, games, and other things worth sharing. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.corner = function (root, data) {
    const list = (data && data.things) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'Nothing shared yet — add some in data/my-corner.json.'));
      return;
    }
    list.forEach(function (t) {
      t = t || {};
      const card = K.el('article', 'card');
      card.append(K.el('h3', 'card-title', t.title || 'Thing'));
      if (t.note) card.append(K.el('p', 'card-desc', t.note));
      if (t.url) {
        const row = K.el('div', 'link-row');
        row.append(K.link('Open', t.url));
        card.append(row);
      }
      root.append(card);
    });
  };
})();
