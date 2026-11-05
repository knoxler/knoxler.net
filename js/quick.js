/* Quick View (quick.html) — fills the clean recruiter page from the SAME
   data files as the desktop. Text via textContent only; external links open
   in a new tab with rel="noopener noreferrer". */
(() => {
  'use strict';
  const K = (window.Knox = window.Knox || { render: {} });
  const N = 3; // keep it short and scannable

  function fill(id, dataName, build) {
    const el = document.getElementById(id);
    if (!el) return;
    el.replaceChildren(K.el('p', 'loading', 'Loading…'));
    K.loadJSON(dataName)
      .then(function (data) {
        try { el.replaceChildren(); build(el, data); }
        catch (err) { el.replaceChildren(K.faultNote(dataName)); }
      })
      .catch(function () { el.replaceChildren(K.faultNote(dataName)); });
  }

  // Projects — title, role, first link
  fill('quick-projects-fill', 'projects.json', function (el, data) {
    const list = (data && data.projects) || [];
    if (!list.length) { el.append(K.el('p', 'empty-msg', 'No projects yet.')); return; }
    const ul = K.el('ul');
    list.slice(0, N).forEach(function (p) {
      p = p || {};
      const li = K.el('li');
      li.append(K.el('strong', '', p.title || 'Untitled'));
      if (p.role) li.append(K.el('div', 'quick-sub', p.role));
      const first = p.links && p.links[0];
      if (first && first.url) li.append(K.link(first.label || 'View', first.url));
      ul.append(li);
    });
    el.append(ul);
  });

  // Games — title, my role, first link (downloads go to itch.io, never the site)
  fill('quick-games-fill', 'games.json', function (el, data) {
    const list = (data && data.games) || [];
    if (!list.length) { el.append(K.el('p', 'empty-msg', 'No games yet.')); return; }
    const ul = K.el('ul');
    list.slice(0, N).forEach(function (g) {
      g = g || {};
      const li = K.el('li');
      li.append(K.el('strong', '', g.title || 'Untitled'));
      if (g.comingSoon) li.append(K.el('span', 'badge badge-soon', ' coming soon'));
      if (g.role) li.append(K.el('div', 'quick-sub', 'My role: ' + g.role));
      const first = g.links && g.links[0];
      if (first && first.url) li.append(K.link(first.label || 'View', first.url));
      ul.append(li);
    });
    el.append(ul);
  });

  // Reviews — game, short take, link to the full review
  fill('quick-reviews-fill', 'reviews.json', function (el, data) {
    const list = (data && data.reviews) || [];
    if (!list.length) { el.append(K.el('p', 'empty-msg', 'No reviews yet.')); return; }
    const ul = K.el('ul');
    list.slice(0, N).forEach(function (r) {
      r = r || {};
      const li = K.el('li');
      li.append(K.el('strong', '', r.game || 'Game'));
      if (r.take) li.append(K.el('div', 'quick-sub', r.take));
      if (r.link) li.append(K.link('Read review', r.link));
      ul.append(li);
    });
    el.append(ul);
  });

  // Skills
  fill('quick-skills-fill', 'about.json', function (el, data) {
    const skills = (data && data.skills) || [];
    if (!skills.length) { el.append(K.el('p', 'empty-msg', 'No skills listed yet.')); return; }
    el.append(K.techChips(skills));
  });

  // Resume
  fill('quick-resume-fill', 'about.json', function (el, data) {
    const resume = data && data.resume;
    if (resume && resume.url) el.append(K.link(resume.label || 'Resume (PDF)', resume.url));
    else el.append(K.el('p', 'empty-msg', 'Resume coming soon.'));
  });

  // Contact — site email + every account link
  fill('quick-contact-fill', 'find-me.json', function (el, data) {
    data = data || {};
    const hasEmail = !!data.email;
    const links = data.links || [];
    if (!hasEmail && !links.length) { el.append(K.el('p', 'empty-msg', 'Contact links coming soon.')); return; }
    if (hasEmail) el.append(K.link(data.email, 'mailto:' + data.email));
    const grid = K.el('div', 'link-grid');
    links.forEach(function (l) { if (l && l.url) grid.append(K.link(l.label || l.url, l.url)); });
    if (grid.childNodes.length) el.append(grid);
  });
})();
