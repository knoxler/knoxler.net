/* Commissions window — from data/commissions.json:
   intro text, example pieces, and an off-site contact link.
   Payments happen off-site; the site never takes payment details. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.commissions = function (root, data) {
    data = data || {};
    if (data.intro) root.append(K.el('p', 'doc-para', data.intro));

    (data.examples || []).forEach(function (p) {
      p = p || {};
      const card = K.el('article', 'card');
      if (p.image) card.append(K.image(p.image, p.title, p.image, 'image'));
      card.append(K.el('h3', 'card-title', p.title || 'Piece'));
      if (p.note) card.append(K.el('p', 'card-desc', p.note));
      root.append(card);
    });

    if (data.contact && data.contact.url) {
      const row = K.el('div', 'link-row');
      row.append(K.link(data.contact.label || 'Get in touch', data.contact.url));
      root.append(row);
      root.append(K.el('p', 'fine-note', 'Payments happen off-site. This site never takes payment details.'));
    }
  };
})();
