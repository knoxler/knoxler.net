/* Find Me window — from data/find-me.json:
   a site email plus a grid of links to every account.
   No home address or phone number, per the security rules. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.findme = function (root, data) {
    data = data || {};
    if (data.email) {
      const row = K.el('div', 'link-row');
      row.append(K.link(data.email, 'mailto:' + data.email));
      root.append(row);
    }

    const links = data.links || [];
    if (links.length) {
      const grid = K.el('div', 'link-grid');
      links.forEach(function (l) {
        if (l && l.url) grid.append(K.link(l.label || l.url, l.url));
      });
      root.append(grid);
    }

    if (!data.email && !links.length) {
      root.append(K.el('p', 'empty-msg', 'No contact links yet — add some in data/find-me.json.'));
    }
  };
})();
