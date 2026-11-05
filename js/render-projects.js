/* Projects window — one card per project from data/projects.json. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.projects = function (root, data) {
    const list = (data && data.projects) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'No projects yet — add some in data/projects.json.'));
      return;
    }
    list.forEach(function (p) { root.append(K.card(p)); });
  };
})();
