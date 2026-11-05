/* Games window — one card per game from data/games.json.
   Coming-soon titles get a badge; links point out to itch.io (never host an .exe). */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.games = function (root, data) {
    const list = (data && data.games) || [];
    if (!list.length) {
      root.append(K.el('p', 'empty-msg', 'No games yet — add some in data/games.json.'));
      return;
    }
    list.forEach(function (g) { root.append(K.card(g)); });
  };
})();
