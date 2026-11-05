/* Reviews window — one card per review from data/reviews.json.
   Optional cover image and rating; each links out to the full review. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.reviews = function (root, data) {
    const list = (data && data.reviews) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'No reviews yet — add some in data/reviews.json.'));
      return;
    }
    list.forEach(function (r) {
      r = r || {};
      const card = K.el('article', 'card');
      if (r.cover) card.append(K.image(r.cover, r.game, r.cover, 'cover'));
      card.append(K.el('h3', 'card-title', r.game || 'Game'));
      if (r.rating != null) card.append(K.el('span', 'badge badge-rating', 'RATING ' + r.rating));
      if (r.take) card.append(K.el('p', 'card-desc', r.take));
      if (r.date) card.append(K.el('p', 'card-date', r.date));
      if (r.link) {
        const row = K.el('div', 'link-row');
        row.append(K.link('Read the review', r.link));
        card.append(row);
      }
      root.append(card);
    });
  };
})();
