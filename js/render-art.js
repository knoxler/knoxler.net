/* Art window — image viewer over data/art.json.
   prev/next buttons, Arrow keys to move, Esc to close. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.art = function (root, data) {
    const items = (data && data.art) || [];
    K.viewer(root, items, { image: 'image', alt: 'title', note: 'note' });
  };
})();
