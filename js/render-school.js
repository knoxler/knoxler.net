/* School window — from data/school.json:
   one card per course with a short note about what was learned. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.school = function (root, data) {
    const list = (data && data.entries) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'No courses yet — add some in data/school.json.'));
      return;
    }
    list.forEach(function (e) {
      e = e || {};
      const card = K.el('article', 'card');
      card.append(K.el('h3', 'card-title', e.title || 'Course'));
      if (e.note) card.append(K.el('p', 'card-desc', e.note));
      root.append(card);
    });
  };
})();
