/**
 * Revhero + RoomPulse client feedback survey.
 *
 * A static page on GitHub Pages talking to the Eden API. The question set in
 * assets/questions.js is generated from the same source the API validates
 * against, so the two cannot disagree about what is being asked.
 *
 * Answers are held in localStorage as they are typed, so a closed tab, a dead
 * battery or a tunnel does not cost someone five minutes of their time.
 */
(function () {
  'use strict';

  // Eden, on Railway. NOT app.revhero.com — that is the RevHero RMS product on
  // AWS, whose API Eden consumes; it is a different system and 403s everything.
  var API = 'https://eden-production-b111.up.railway.app/api';

  // Only ever pointed elsewhere from a local dev server. Honouring an ?api=
  // parameter on the live site would let a link posted by someone else
  // redirect a client's answers to a server they control.
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    var override = new URLSearchParams(location.search).get('api');
    if (override) API = override;
  }

  var DRAFT_KEY = 'revhero-survey-draft-v1';
  var SURVEY = window.SURVEY;

  // ---- copy that is not part of the question set -------------------------
  var UI = {
    en: {
      start: 'Start', next: 'Next', back: 'Back', submit: 'Send my answers',
      sending: 'Sending…',
      introTitle: 'Tell us what you think',
      introBody: [
        'We are working out what to build next in Revhero and RoomPulse, and we would rather ask you than guess.',
        'It takes about five minutes. You can skip every question but one.'
      ],
      introPoints: [
        'Your answers are anonymous unless you choose to leave your details.',
        'Your progress is saved on this device, so you can come back to it.'
      ],
      required: 'This one is needed before you can carry on.',
      doneTitle: 'Thank you — genuinely.',
      doneBody: [
        'Every response is read by the people who build Revhero and RoomPulse, and the themes go straight into what we work on next.',
        'You can close this page now.'
      ],
      failed: 'We could not send that just now. Your answers are still here — try again in a moment.',
      offline: 'You appear to be offline. Your answers are saved on this device; try again when you are back.',
      savedNote: 'Saved on this device',
      restart: 'Start again',
      of: 'of'
    },
    el: {
      start: 'Ξεκινήστε', next: 'Επόμενο', back: 'Πίσω', submit: 'Αποστολή απαντήσεων',
      sending: 'Γίνεται αποστολή…',
      introTitle: 'Πείτε μας τη γνώμη σας',
      introBody: [
        'Ετοιμάζουμε το πλάνο μας για το Revhero και το RoomPulse και προτιμούμε να ρωτήσουμε εσάς παρά να υποθέσουμε.',
        'Θα σας πάρει περίπου πέντε λεπτά. Μπορείτε να παραλείψετε κάθε ερώτηση εκτός από μία.'
      ],
      introPoints: [
        'Οι απαντήσεις σας είναι ανώνυμες, εκτός αν επιλέξετε να αφήσετε τα στοιχεία σας.',
        'Η πρόοδός σας αποθηκεύεται σε αυτή τη συσκευή, ώστε να μπορείτε να επιστρέψετε.'
      ],
      required: 'Χρειαζόμαστε αυτή την απάντηση για να συνεχίσετε.',
      doneTitle: 'Ευχαριστούμε — ειλικρινά.',
      doneBody: [
        'Κάθε απάντηση διαβάζεται από τους ανθρώπους που φτιάχνουν το Revhero και το RoomPulse, και όσα μας λέτε περνούν κατευθείαν στο τι θα δουλέψουμε στη συνέχεια.',
        'Μπορείτε να κλείσετε αυτή τη σελίδα.'
      ],
      failed: 'Δεν μπορέσαμε να το στείλουμε αυτή τη στιγμή. Οι απαντήσεις σας είναι εδώ — δοκιμάστε ξανά σε λίγο.',
      offline: 'Φαίνεται ότι είστε εκτός σύνδεσης. Οι απαντήσεις σας αποθηκεύτηκαν σε αυτή τη συσκευή· δοκιμάστε ξανά όταν συνδεθείτε.',
      savedNote: 'Αποθηκεύτηκε σε αυτή τη συσκευή',
      restart: 'Ξεκινήστε ξανά',
      of: 'από'
    }
  };

  // ---- state --------------------------------------------------------------
  var lang = 'en';
  var answers = {};
  var screen = 'intro';          // 'intro' | section id | 'done'
  var history = [];
  var startedAt = null;
  var sending = false;
  var banner = null;

  var app = document.getElementById('app');
  var rail = document.getElementById('rail');
  var langsw = document.getElementById('langsw');
  var footnote = document.getElementById('footnote');

  function pack() { return SURVEY.packs[lang]; }
  function t() { return UI[lang]; }
  function sections() { return pack().sections; }
  function section(id) { return sections().find(function (s) { return s.id === id; }); }
  function item(id) {
    var found = null;
    sections().forEach(function (s) {
      s.items.forEach(function (i) { if (i.id === id) found = i; });
    });
    return found;
  }

  // ---- draft --------------------------------------------------------------
  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        lang: lang, answers: answers, screen: screen, history: history, startedAt: startedAt
      }));
    } catch (e) { /* private mode, or storage full — the survey still works */ }
  }
  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (d && SURVEY.packs[d.lang]) {
        lang = d.lang;
        answers = d.answers || {};
        history = Array.isArray(d.history) ? d.history : [];
        startedAt = d.startedAt || null;
        // Only resume onto a screen that still exists in this version.
        if (d.screen && (d.screen === 'intro' || section(d.screen))) screen = d.screen;
      }
    } catch (e) { /* ignore a corrupt draft rather than trapping the respondent */ }
  }
  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  }

  // ---- branching ----------------------------------------------------------
  function nextOf(id) {
    var order = sections().map(function (s) { return s.id; });
    var sec = section(id);
    var last = sec.items[sec.items.length - 1];
    if (last.goto) {
      var i = (last.opts || []).indexOf(answers[last.id]);
      if (i !== -1) return last.goto[i];
    }
    var at = order.indexOf(id);
    return at < order.length - 1 ? order[at + 1] : null;
  }

  function answered(it) {
    var v = answers[it.id];
    if (it.t === 'check') return Array.isArray(v) && v.length > 0;
    if (it.t === 'grid') return v && Object.keys(v).length > 0;
    if (it.t === 'text' || it.t === 'para') return typeof v === 'string' && v.trim() !== '';
    return v !== undefined && v !== null && v !== '';
  }

  // ---- rendering ----------------------------------------------------------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderLangSwitch() {
    langsw.innerHTML = '';
    Object.keys(SURVEY.packs).forEach(function (code) {
      var b = el('button', null, SURVEY.packs[code].label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(code === lang));
      b.addEventListener('click', function () {
        if (code === lang) return;
        // Stored answers are option LABELS, which differ per language, so a
        // half-finished run cannot be carried across. Only the intro is safe.
        if (screen !== 'intro' && Object.keys(answers).length) {
          answers = {}; history = []; screen = 'intro'; startedAt = null;
        }
        lang = code;
        document.documentElement.lang = code;
        saveDraft(); render();
      });
      langsw.appendChild(b);
    });
  }

  function renderRail() {
    rail.innerHTML = '';
    var ids = sections().map(function (s) { return s.id; });
    ids.forEach(function (id) {
      var s = el('span');
      if (screen === 'done') s.className = 'on';
      else if (history.indexOf(id) !== -1) s.className = (id === screen) ? 'now' : 'on';
      rail.appendChild(s);
    });
  }

  function questionNode(it) {
    var interactive = it.t === 'choice' || it.t === 'check' || it.t === 'scale' || it.t === 'grid';
    var box = document.createElement(interactive ? 'fieldset' : 'div');
    box.className = 'q';
    box.dataset.qid = it.id;

    var title = document.createElement(interactive ? 'legend' : 'label');
    if (!interactive) {
      title.className = 'q-title';
      title.setAttribute('for', 'f-' + it.id);
    }
    title.appendChild(document.createTextNode(it.q));
    if (it.req) {
      var star = el('span', 'req', '*');
      star.setAttribute('aria-hidden', 'true');
      title.appendChild(star);
      box.setAttribute('aria-required', 'true');
    }
    box.appendChild(title);

    if (it.help) box.appendChild(el('p', 'help', it.help));

    if (it.t === 'text' || it.t === 'para') {
      var input = document.createElement(it.t === 'para' ? 'textarea' : 'input');
      if (it.t !== 'para') input.type = (it.id === 'email') ? 'email' : 'text';
      input.id = 'f-' + it.id;
      input.value = answers[it.id] || '';
      if (it.id === 'email') input.autocomplete = 'email';
      input.addEventListener('input', function () {
        answers[it.id] = input.value;
        clearError(box);
        touch();
      });
      box.appendChild(input);
    }

    if (it.t === 'choice' || it.t === 'check') {
      var group = el('div', 'opts');
      it.opts.forEach(function (opt, i) {
        var label = el('label', 'opt');
        var input2 = document.createElement('input');
        input2.type = (it.t === 'choice') ? 'radio' : 'checkbox';
        input2.name = it.id;
        input2.value = opt;
        input2.checked = (it.t === 'choice')
          ? answers[it.id] === opt
          : (answers[it.id] || []).indexOf(opt) !== -1;
        if (input2.checked) label.classList.add('sel');
        input2.addEventListener('change', function () {
          if (it.t === 'choice') {
            answers[it.id] = opt;
            Array.prototype.forEach.call(group.children, function (c) { c.classList.remove('sel'); });
            label.classList.add('sel');
          } else {
            var list = answers[it.id] || [];
            if (input2.checked) { if (list.indexOf(opt) === -1) list.push(opt); }
            else { list = list.filter(function (x) { return x !== opt; }); }
            answers[it.id] = list;
            label.classList.toggle('sel', input2.checked);
          }
          clearError(box);
          touch();
        });
        label.appendChild(input2);
        label.appendChild(document.createTextNode(opt));
        group.appendChild(label);
      });
      box.appendChild(group);
    }

    if (it.t === 'scale') {
      var wrap = el('div', 'scale');
      for (var v = it.min; v <= it.max; v++) {
        (function (val) {
          var b = el('button', null, String(val));
          b.type = 'button';
          b.setAttribute('aria-pressed', String(answers[it.id] === val));
          b.setAttribute('aria-label', String(val));
          b.addEventListener('click', function () {
            answers[it.id] = val;
            Array.prototype.forEach.call(wrap.children, function (c) {
              c.setAttribute('aria-pressed', 'false');
            });
            b.setAttribute('aria-pressed', 'true');
            clearError(box);
            touch();
          });
          wrap.appendChild(b);
        })(v);
      }
      var ends = el('div', 'scale-ends');
      ends.appendChild(el('span', null, it.lo));
      ends.appendChild(el('span', null, it.hi));
      box.appendChild(wrap);
      box.appendChild(ends);
    }

    if (it.t === 'grid') {
      var cols = (it.scale === 'agree') ? pack().agreeCols : pack().ratingCols;
      var grid = el('div', 'grid');
      it.rows.forEach(function (row) {
        var rowBox = el('div', 'grid-row');
        var rowId = 'g-' + it.id + '-' + it.rows.indexOf(row);
        var rowLabel = el('span', 'rowlabel', row);
        rowLabel.id = rowId;
        rowBox.appendChild(rowLabel);

        var seg = el('div', 'seg');
        seg.setAttribute('role', 'group');
        seg.setAttribute('aria-labelledby', rowId);
        cols.forEach(function (col) {
          var b = el('button', null, col);
          b.type = 'button';
          var current = (answers[it.id] || {})[row];
          b.setAttribute('aria-pressed', String(current === col));
          b.addEventListener('click', function () {
            var g = answers[it.id] || {};
            g[row] = col;
            answers[it.id] = g;
            Array.prototype.forEach.call(seg.children, function (c) {
              c.setAttribute('aria-pressed', 'false');
            });
            b.setAttribute('aria-pressed', 'true');
            touch();
          });
          seg.appendChild(b);
        });
        rowBox.appendChild(seg);
        grid.appendChild(rowBox);
      });
      box.appendChild(grid);
    }

    return box;
  }

  function clearError(box) {
    var e = box.querySelector('.q-err');
    if (e) e.remove();
    box.removeAttribute('aria-invalid');
  }

  function touch() {
    if (startedAt === null) startedAt = Date.now();
    saveDraft();
  }

  // ---- screens ------------------------------------------------------------
  function renderIntro() {
    app.innerHTML = '';
    var card = el('div', 'card');
    var head = el('div', 'card-head');
    head.appendChild(el('h1', null, t().introTitle));
    card.appendChild(head);

    var prose = el('div', 'prose');
    t().introBody.forEach(function (p) { prose.appendChild(el('p', null, p)); });
    var ul = document.createElement('ul');
    t().introPoints.forEach(function (p) { ul.appendChild(el('li', null, p)); });
    prose.appendChild(ul);
    card.appendChild(prose);

    var nav = el('div', 'nav');
    nav.appendChild(el('div', 'spacer'));
    var go = el('button', 'btn primary', t().start);
    go.type = 'button';
    go.addEventListener('click', function () {
      screen = sections()[0].id;
      history = [screen];
      if (startedAt === null) startedAt = Date.now();
      saveDraft(); render();
    });
    nav.appendChild(go);
    card.appendChild(nav);
    app.appendChild(card);
  }

  function renderSection() {
    var sec = section(screen);
    app.innerHTML = '';

    var card = el('div', 'card');
    var head = el('div', 'card-head');
    var order = sections().map(function (s) { return s.id; });
    head.appendChild(el('h2', null, sec.title));
    if (sec.help) head.appendChild(el('p', null, sec.help));
    card.appendChild(head);

    if (banner) {
      var b = el('div', 'banner', banner);
      b.setAttribute('role', 'alert');
      card.appendChild(b);
    }

    var body = el('div', 'card-body');
    var form = document.createElement('form');
    form.noValidate = true;
    form.addEventListener('submit', function (ev) { ev.preventDefault(); goNext(); });

    sec.items.forEach(function (it) { form.appendChild(questionNode(it)); });

    // Honeypot, once, on the first section.
    if (order.indexOf(screen) === 0) {
      var hp = el('div', 'hp');
      var hpi = document.createElement('input');
      hpi.type = 'text'; hpi.name = 'website'; hpi.id = 'website';
      hpi.tabIndex = -1; hpi.autocomplete = 'off';
      hpi.setAttribute('aria-hidden', 'true');
      var hpl = el('label', null, 'Leave this field empty');
      hpl.setAttribute('for', 'website');
      hp.appendChild(hpl); hp.appendChild(hpi);
      form.appendChild(hp);
      window.__hp = hpi;
    }

    body.appendChild(form);
    card.appendChild(body);

    var nav = el('div', 'nav');
    if (history.length > 1) {
      var back = el('button', 'btn', t().back);
      back.type = 'button';
      back.addEventListener('click', function () {
        history.pop();
        screen = history[history.length - 1];
        banner = null;
        saveDraft(); render();
      });
      nav.appendChild(back);
    }
    nav.appendChild(el('div', 'spacer'));

    var isLast = nextOf(screen) === null;
    var next = el('button', 'btn primary', sending ? t().sending : (isLast ? t().submit : t().next));
    next.type = 'button';
    next.disabled = sending;
    next.addEventListener('click', goNext);
    nav.appendChild(next);
    card.appendChild(nav);

    if (Object.keys(answers).length) {
      card.appendChild(el('div', 'saved', t().savedNote));
    }

    app.appendChild(card);
  }

  function goNext() {
    var sec = section(screen);
    var missing = null;
    sec.items.forEach(function (it) {
      if (!missing && it.req && !answered(it)) missing = it;
    });

    if (missing) {
      var box = app.querySelector('[data-qid="' + missing.id + '"]');
      if (box && !box.querySelector('.q-err')) {
        var e = el('p', 'q-err', t().required);
        e.setAttribute('role', 'alert');
        box.appendChild(e);
        box.setAttribute('aria-invalid', 'true');
      }
      if (box) {
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var focusable = box.querySelector('input, textarea, button');
        if (focusable) focusable.focus({ preventScroll: true });
      }
      return;
    }

    var nx = nextOf(screen);
    if (nx) {
      screen = nx;
      history.push(nx);
      banner = null;
      saveDraft(); render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      submit();
    }
  }

  function renderDone() {
    app.innerHTML = '';
    var card = el('div', 'card');
    var body = el('div', 'prose');
    body.style.paddingTop = '26px';
    var icon = el('div', 'done-icon', '✓');
    icon.setAttribute('aria-hidden', 'true');
    body.appendChild(icon);
    var h = el('h1', null, t().doneTitle);
    h.style.margin = '0 0 12px';
    h.style.fontSize = 'var(--text-2xl)';
    h.style.color = 'var(--heading)';
    h.style.letterSpacing = 'var(--tracking-tight)';
    body.appendChild(h);
    t().doneBody.forEach(function (p) { body.appendChild(el('p', null, p)); });
    card.appendChild(body);
    app.appendChild(card);
    rail.innerHTML = '';
    footnote.textContent = '';
  }

  // ---- submit -------------------------------------------------------------
  function submit() {
    if (sending) return;

    if (navigator.onLine === false) {
      banner = t().offline;
      render();
      return;
    }

    sending = true;
    banner = null;
    render();

    var payload = {
      language: lang,
      durationMs: startedAt ? (Date.now() - startedAt) : null,
      website: (window.__hp && window.__hp.value) || '',
      answers: answers
    };

    fetch(API + '/survey/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().then(function (j) { return { ok: r.ok, body: j }; });
    }).then(function (res) {
      sending = false;
      if (res.ok) {
        clearDraft();
        screen = 'done';
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        banner = (res.body && res.body.error) ? res.body.error : t().failed;
        render();
      }
    }).catch(function () {
      sending = false;
      banner = t().failed;
      render();
    });
  }

  // ---- boot ---------------------------------------------------------------
  function render() {
    renderLangSwitch();
    renderRail();
    if (screen === 'done') return renderDone();
    if (screen === 'intro') return renderIntro();
    renderSection();
  }

  if (!SURVEY || !SURVEY.packs) {
    app.innerHTML = '<div class="card"><div class="card-body">' +
      '<p class="loading">The survey could not load. Please refresh the page.</p></div></div>';
    return;
  }

  loadDraft();
  document.documentElement.lang = lang;
  render();
})();
