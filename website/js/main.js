/* =========================================================
   Veterans' Voices — marketing site behavior
   Plain vanilla JS, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- sample data (mirrors the app's seed stories) ---------- */
  var BRANCH_COLOR = {
    Army: '#4B5320', Navy: '#243A5E', 'Marine Corps': '#6E2B2B',
    'Air Force': '#2E4A63', 'Space Force': '#1E2E52', 'Coast Guard': '#7A4A1E',
    'National Guard': '#3B4A2E', Other: '#4A5666'
  };
  var MEDIA = {
    written: { icon: '📝', label: 'Written' },
    audio: { icon: '🎧', label: 'Audio' },
    video: { icon: '🎬', label: 'Video' },
    mixed: { icon: '🎧', label: 'Audio + Text' }
  };
  var CONFLICTS = ['World War I', 'World War II', 'Korean War', 'Vietnam War', 'Gulf War',
    'War on Terror', 'Iraq War', 'Afghanistan War', 'Cold War', 'Peacetime Service', 'Other'];
  var BRANCHES = ['Army', 'Navy', 'Marine Corps', 'Air Force', 'Space Force', 'Coast Guard', 'National Guard', 'Other'];

  var STORIES = [
    { id: 'nick-bernadino', title: 'Learning to Carry It', veteran: 'Nick Bernardino', rank: 'Machine Gunner', branch: 'Marine Corps', conflict: 'Vietnam War', theater: 'Da Nang', years: '1968–1969', media: 'mixed', featured: true,
      summary: 'A Marine machine gunner in Vietnam, Nick Bernardino carried the memories of combat in silence for nearly fifty years — and now devotes himself to helping fellow veterans heal.' },
    { id: '1', title: 'Signals in the Dark', veteran: 'James Halloran', rank: 'Radioman Second Class', branch: 'Navy', conflict: 'World War II', theater: 'Pacific Theater', years: '1942–1945', media: 'mixed',
      summary: 'A radioman aboard a heavy cruiser in the Pacific, Jim Halloran spent the war translating the sea into signals — and learned to carry the silences between them.' },
    { id: '2', title: 'The Long Road Out of Chosin', veteran: 'Raymond Delgado', rank: 'Corporal', branch: 'Marine Corps', conflict: 'Korean War', theater: 'Chosin Reservoir', years: '1950–1951', media: 'audio',
      summary: 'A Marine at the Chosin Reservoir, Corporal Ray Delgado marched out of the mountains in the coldest winter of the war — and never forgot the men beside him.' },
    { id: '3', title: 'What the River Remembered', veteran: 'Thomas Nakamura', rank: 'Specialist Five', branch: 'Army', conflict: 'Vietnam War', theater: 'Mekong Delta', years: '1968–1969', media: 'written',
      summary: 'A river patrol crewman in the Mekong Delta, Tom Nakamura kept his war folded away for decades before he found the words.' },
    { id: '4', title: 'The Weight of the Vest', veteran: 'Marcus Bell', rank: 'Sergeant', branch: 'Marine Corps', conflict: 'Iraq War', theater: 'Al Anbar Province', years: '2004–2006', media: 'audio',
      summary: 'A squad leader in Al Anbar, Sergeant Marcus Bell learned that leadership was mostly about the letters you wrote and the people you brought home.' },
    { id: '5', title: 'Dust and Distance', veteran: 'Elena Vasquez', rank: 'Staff Sergeant', branch: 'Army', conflict: 'Afghanistan War', theater: 'Helmand Province', years: '2010–2011', media: 'video',
      summary: 'A medic in Helmand Province, Staff Sergeant Elena Vasquez spent her tour keeping others alive — and came home to learn how to let herself be cared for, too.' }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initial(name) { return (name.trim()[0] || 'V').toUpperCase(); }
  function grad(branch) { return 'linear-gradient(135deg,#1b3358,' + (BRANCH_COLOR[branch] || '#5C6142') + ')'; }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }

  /* ---------- sticky nav shadow ---------- */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = $('#burger'), links = $('#navLinks');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- FAQ accordions ---------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var q = $('.faq__q', item), a = $('.faq__a', item);
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : null;
    });
  });

  /* ---------- interactive Browse demo ---------- */
  function optionize(sel, all, list) {
    var html = '<option value="">' + all + '</option>';
    list.forEach(function (v) { html += '<option value="' + esc(v) + '">' + esc(v) + '</option>'; });
    sel.innerHTML = html;
  }
  var dSearch = $('#demoSearch'), dConflict = $('#demoConflict'), dBranch = $('#demoBranch'),
      dGrid = $('#demoGrid'), dCount = $('#demoCount'), dEmpty = $('#demoEmpty');
  optionize(dConflict, 'All Conflicts', CONFLICTS);
  optionize(dBranch, 'All Branches', BRANCHES);

  function storyCardHTML(s) {
    var m = MEDIA[s.media];
    return '<article class="scard">' +
      '<div class="scard__banner" style="background:' + grad(s.branch) + '">' +
        '<span class="scard__initial">' + initial(s.veteran) + '</span>' +
        '<span class="scard__chip">' + m.icon + ' ' + m.label + '</span>' +
      '</div>' +
      '<div class="scard__body">' +
        '<div class="scard__badges">' +
          '<span class="tag tag--navy">' + esc(s.conflict) + '</span>' +
          '<span class="tag" style="background:' + hexA(BRANCH_COLOR[s.branch], .16) + ';color:' + BRANCH_COLOR[s.branch] + '">' + esc(s.branch) + '</span>' +
        '</div>' +
        '<h3 class="scard__title">' + esc(s.title) + '</h3>' +
        '<div class="scard__vet">' + esc(s.veteran) + ' · ' + esc(s.rank) + '</div>' +
        '<p class="scard__sum">' + esc(s.summary) + '</p>' +
        '<div class="scard__foot"><span class="scard__media">' + m.icon + ' ' + m.label + '</span><span class="scard__years">' + esc(s.years) + '</span></div>' +
      '</div>' +
    '</article>';
  }
  function hexA(hex, a) {
    var h = hex.replace('#', '');
    return 'rgba(' + parseInt(h.substr(0, 2), 16) + ',' + parseInt(h.substr(2, 2), 16) + ',' + parseInt(h.substr(4, 2), 16) + ',' + a + ')';
  }
  function renderDemo() {
    var q = dSearch.value.trim().toLowerCase(), c = dConflict.value, b = dBranch.value;
    var out = STORIES.filter(function (s) {
      if (c && s.conflict !== c) return false;
      if (b && s.branch !== b) return false;
      if (!q) return true;
      return [s.title, s.veteran, s.theater, s.summary].some(function (f) { return f.toLowerCase().indexOf(q) > -1; });
    });
    dGrid.innerHTML = out.map(storyCardHTML).join('');
    dCount.textContent = out.length + (out.length === 1 ? ' story' : ' stories');
    dEmpty.hidden = out.length !== 0;
  }
  [dSearch, dConflict, dBranch].forEach(function (el) {
    el.addEventListener('input', renderDemo);
    el.addEventListener('change', renderDemo);
  });
  renderDemo();
})();
