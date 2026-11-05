/* About Me window — text-document layout from data/about.json:
   intro paragraphs, a skills row, and a resume (PDF) link. */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  K.render.about = function (root, data) {
    data = data || {};
    (data.intro || []).forEach(function (p) { root.append(K.el('p', 'doc-para', p)); });

    const skills = data.skills || [];
    if (skills.length) {
      root.append(K.el('h3', 'card-title', 'Skills'));
      root.append(K.techChips(skills) || K.el('p', 'empty-msg', '—'));
    }

    if (data.resume && data.resume.url) {
      const row = K.el('div', 'link-row');
      row.append(K.link(data.resume.label || 'Resume (PDF)', data.resume.url));
      root.append(row);
    }
  };
})();
