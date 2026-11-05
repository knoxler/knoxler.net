/* Streams window — from data/streams.json:
   intro line, channel links (Twitch / YouTube), and favorite clips. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.streams = function (root, data) {
    data = data || {};
    if (data.intro) root.append(K.el('p', 'doc-para', data.intro));

    const channels = data.channels || [];
    if (channels.length) {
      root.append(K.el('h3', 'card-title', 'Channels'));
      const row = K.el('div', 'link-row');
      channels.forEach(function (c) {
        if (c && c.url) row.append(K.link(c.label || 'channel', c.url));
      });
      root.append(row);
    }

    const clips = data.clips || [];
    if (clips.length) root.append(K.el('h3', 'card-title', 'Favorite clips'));
    clips.forEach(function (c) {
      c = c || {};
      const card = K.el('article', 'card');
      card.append(K.el('h3', 'card-title', c.title || 'Clip'));
      if (c.note) card.append(K.el('p', 'card-desc', c.note));
      if (c.url) {
        const row = K.el('div', 'link-row');
        row.append(K.link('Watch', c.url));
        card.append(row);
      }
      root.append(card);
    });

    if (!clips.length && !channels.length) {
      root.append(K.el('p', 'empty-msg', 'No streams or clips yet — add some in data/streams.json.'));
    }
  };
})();
