/* Field Journal window — image viewer over data/field-journal.json.
   Same prev/next + arrow keys + Esc behavior as the Art viewer. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.journal = function (root, data) {
    const items = (data && data.entries) || [];
    K.viewer(root, items, { image: 'image', alt: 'title', note: 'note' });
  };
})();
