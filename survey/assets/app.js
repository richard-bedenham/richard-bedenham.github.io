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

  // Two versions of the same survey. ?v=short serves the 10-question one.
  // Anything else, including no parameter at all, serves the full 27.
  // Pinned by /survey/short/index.html, so the client-facing link needs no
  // query string. ?v=short still works, for testing and for anyone who has it.
  var VARIANT = (window.SURVEY_VARIANT === 'short' ||
                 new URLSearchParams(location.search).get('v') === 'short')
    ? 'short' : 'full';

  // Separate drafts, so someone who starts the long one and is then sent the
  // short link does not resume half a different survey.
  var DRAFT_KEY = 'revhero-survey-draft-v1-' + VARIANT;

  var RAW = window.SURVEY;
  // The short variant rides alongside the full one in the generated file.
  var SURVEY = (VARIANT === 'short' && RAW && RAW.short)
    ? { packs: RAW.short.packs, questionCount: RAW.short.questionCount }
    : RAW;

  // ---- copy that is not part of the question set -------------------------
  var UI = {
    en: {
      start: 'Start', next: 'Next', back: 'Back', submit: 'Send my answers',
      sending: 'Sending…',
      introTitle: 'What should we build next?',
      introBody: [
        'We are continuously improving the Revhero and RoomPulse service we offer, and we want to hear your honest feedback.',
        'It takes five to seven minutes. Every question needs an answer, and every answer is read by the team that builds the system.'
      ],
      introBodyShort: [
        'We are continuously improving the Revhero and RoomPulse service we offer, and we want to hear your honest feedback.',
        'Ten questions, about two minutes. Every one needs an answer, and there is a box at the end for anything else you want to say.'
      ],
      introPoints: [
        'We ask for your property and your email so we can follow up on what you say. We will not add you to a mailing list.',
        'Your progress is saved on this device, so you can come back to it.'
      ],
      required: 'This one is needed before you can carry on.',
      requiredGrid: 'Every row needs an answer. Use "Not used" or "Not sure" if that is the honest one.',
      doneTitle: 'Thank you — genuinely.',
      doneBody: [
        'Every response is read by the people who build Revhero and RoomPulse, and the themes go straight into what we work on next.',
        'You can close this page now.'
      ],
      failed: 'We could not send that just now. Your answers are still here — try again in a moment.',
      retrying: 'Sending your answers. This is taking a moment — please leave this page open.',
      stillTrying: 'We still cannot reach the server. Your answers are saved on this device — reopen this page later and they will send themselves.',
      resuming: 'Finishing sending your answers…',
      offline: 'You appear to be offline. Your answers are saved on this device; try again when you are back.',
      savedNote: 'Saved on this device',
      restart: 'Start again',
      of: 'of'
    },
    el: {
      start: 'Ξεκινήστε', next: 'Επόμενο', back: 'Πίσω', submit: 'Αποστολή απαντήσεων',
      sending: 'Γίνεται αποστολή…',
      introTitle: 'Τι να φτιάξουμε στη συνέχεια;',
      introBody: [
        'Βελτιώνουμε συνεχώς την υπηρεσία Revhero και RoomPulse που σας προσφέρουμε, και θέλουμε να ακούσουμε την ειλικρινή σας γνώμη.',
        'Θα σας πάρει πέντε με επτά λεπτά. Όλες οι ερωτήσεις χρειάζονται απάντηση, και κάθε απάντηση διαβάζεται από την ομάδα που φτιάχνει το σύστημα.'
      ],
      introBodyShort: [
        'Βελτιώνουμε συνεχώς την υπηρεσία Revhero και RoomPulse που σας προσφέρουμε, και θέλουμε να ακούσουμε την ειλικρινή σας γνώμη.',
        'Δέκα ερωτήσεις, περίπου δύο λεπτά. Όλες χρειάζονται απάντηση, και στο τέλος υπάρχει χώρος για ό,τι άλλο θέλετε να μας πείτε.'
      ],
      introPoints: [
        'Ζητάμε το ξενοδοχείο και το email σας για να επικοινωνήσουμε μαζί σας για όσα μας πείτε. Δεν θα σας προσθέσουμε σε λίστα newsletter.',
        'Η πρόοδός σας αποθηκεύεται σε αυτή τη συσκευή, ώστε να μπορείτε να επιστρέψετε.'
      ],
      required: 'Χρειαζόμαστε αυτή την απάντηση για να συνεχίσετε.',
      requiredGrid: 'Κάθε γραμμή χρειάζεται απάντηση. Χρησιμοποιήστε «Δεν το χρησιμοποιώ» ή «Δεν γνωρίζω» αν αυτή είναι η ειλικρινής απάντηση.',
      doneTitle: 'Ευχαριστούμε — ειλικρινά.',
      doneBody: [
        'Κάθε απάντηση διαβάζεται από τους ανθρώπους που φτιάχνουν το Revhero και το RoomPulse, και όσα μας λέτε περνούν κατευθείαν στο τι θα δουλέψουμε στη συνέχεια.',
        'Μπορείτε να κλείσετε αυτή τη σελίδα.'
      ],
      failed: 'Δεν μπορέσαμε να το στείλουμε αυτή τη στιγμή. Οι απαντήσεις σας είναι εδώ — δοκιμάστε ξανά σε λίγο.',
      retrying: 'Στέλνουμε τις απαντήσεις σας. Παίρνει λίγο χρόνο — παρακαλούμε αφήστε τη σελίδα ανοιχτή.',
      stillTrying: 'Ακόμη δεν μπορούμε να συνδεθούμε. Οι απαντήσεις σας είναι αποθηκευμένες σε αυτή τη συσκευή — ανοίξτε ξανά τη σελίδα αργότερα και θα σταλούν μόνες τους.',
      resuming: 'Ολοκληρώνουμε την αποστολή των απαντήσεών σας…',
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
  // Stable across every retry, so the server can recognise a repeat and store
  // it once. Persisted with the draft, so it survives a reload mid-send.
  var submissionId = null;
  // Set the moment the respondent hits send, cleared only when the server has
  // confirmed. While it is set, this response is owed to us.
  var pendingSince = null;

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
        lang: lang, answers: answers, screen: screen, history: history,
        startedAt: startedAt, submissionId: submissionId, pendingSince: pendingSince
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
        submissionId = d.submissionId || null;
        pendingSince = d.pendingSince || null;
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
    // A required grid means every row. Both scales carry an escape column
    // ("Not used" / "Not sure") so there is always an honest answer.
    if (it.t === 'grid') return !!v && Object.keys(v).length === it.rows.length;
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
    var body = (VARIANT === 'short' && t().introBodyShort) ? t().introBodyShort : t().introBody;
    body.forEach(function (p) { prose.appendChild(el('p', null, p)); });
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
    //
    // Deliberately NOT called "website", "email", "name" or anything else a
    // browser or password manager recognises: autofill putting a value in here
    // would flag a real client's response. autocomplete is off, it is not
    // reachable by keyboard, and it is hidden from assistive technology.
    if (order.indexOf(screen) === 0) {
      var hp = el('div', 'hp');
      var hpi = document.createElement('input');
      hpi.type = 'text'; hpi.name = 'hp_ref'; hpi.id = 'hp_ref';
      hpi.tabIndex = -1;
      hpi.autocomplete = 'off';
      hpi.setAttribute('aria-hidden', 'true');
      hp.setAttribute('aria-hidden', 'true');
      hp.appendChild(hpi);
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
        var msg = (missing.t === 'grid') ? t().requiredGrid : t().required;
        var e = el('p', 'q-err', msg);
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
  //
  // A response that reached the end of the survey must not be lost to one bad
  // moment on the network, a Railway redeploy, or a rate limit. So:
  //
  //   - it retries, with a widening gap, rather than failing on the first try
  //   - the draft is kept until the server has actually confirmed it
  //   - a page that is closed mid-send picks the attempt back up on next load
  //   - every attempt carries the SAME submissionId, so retries cannot create
  //     duplicate rows however many times they land
  //
  // Delays in seconds. The last one is long on purpose: a Railway deploy takes
  // a couple of minutes and there is no point hammering it meanwhile.
  var RETRY_DELAYS = [2, 5, 12, 30, 60, 120];

  function newSubmissionId() {
    try {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch (e) { /* fall through */ }
    // Fallback for older browsers: not cryptographically strong, but it only
    // has to be unique among this respondent's own retries.
    var s = '';
    for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
    return s.slice(0, 8) + '-' + s.slice(8, 12) + '-4' + s.slice(13, 16) + '-a' +
           s.slice(17, 20) + '-' + s.slice(20, 32);
  }

  function submit(attempt) {
    attempt = attempt || 0;
    if (sending && attempt === 0) return;

    if (!submissionId) submissionId = newSubmissionId();
    pendingSince = pendingSince || Date.now();
    sending = true;
    banner = null;
    saveDraft();
    if (attempt === 0) render();

    var payload = {
      submissionId: submissionId,
      variant: VARIANT,
      language: lang,
      durationMs: startedAt ? (Date.now() - startedAt) : null,
      hp_ref: (window.__hp && window.__hp.value) || '',
      answers: answers
    };

    fetch(API + '/survey/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().catch(function () { return {}; })
        .then(function (j) { return { status: r.status, ok: r.ok, body: j }; });
    }).then(function (res) {
      if (res.ok) return succeed();

      // 4xx other than 429 means the server will never accept this payload,
      // so retrying is pointless — show what it said.
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        sending = false;
        pendingSince = null;
        banner = (res.body && res.body.error) ? res.body.error : t().failed;
        saveDraft(); render();
        return;
      }

      var wait = (res.status === 429 && res.body && res.body.retryAfter)
        ? Number(res.body.retryAfter) : null;
      again(attempt, wait);
    }).catch(function () {
      again(attempt);
    });
  }

  function succeed() {
    sending = false;
    pendingSince = null;
    clearDraft();
    screen = 'done';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function again(attempt, waitSeconds) {
    if (attempt >= RETRY_DELAYS.length) {
      // Out of automatic attempts. The answers are still on this device and
      // still pending, so a reload — or coming back online — tries again.
      sending = false;
      banner = t().stillTrying;
      render();
      return;
    }
    var wait = waitSeconds || RETRY_DELAYS[attempt];
    banner = t().retrying;
    render();
    setTimeout(function () { submit(attempt + 1); }, wait * 1000);
  }

  // Coming back online is the most likely moment for a stuck send to work.
  window.addEventListener('online', function () {
    if (pendingSince && !sending) submit(0);
  });

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

  // A response that was submitted but never confirmed is owed to us. Pick it
  // up automatically rather than waiting for someone to think to try again —
  // they will not. The submissionId makes this safe to repeat.
  if (pendingSince && Object.keys(answers).length) {
    banner = t().resuming;
    render();
    submit(0);
  } else {
    render();
  }
})();
