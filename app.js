// =============================================
// AUTOFLO CLIENT DASHBOARD — V2
// =============================================

// ---------- CONFIG ----------
// CHANGE THIS before deploying. This is your dashboard access code.
const ACCESS_CODE = 'autoflo2026';

// ---------- STAGE DEFINITIONS ----------
const STAGES = [
  { name: 'Onboarding', icon: '\u{1F4CB}', tasks: [
    'Send client intake form', 'Receive completed intake form',
    'Get Meta ad account access', 'Create GHL sub-account',
    'Set up client login credentials', 'Schedule kickoff call'
  ]},
  { name: 'Brand Setup', icon: '\u{1F3A8}', tasks: [
    'Build GHL pipeline stages', 'Create SMS sequences (speed-to-lead, nurture, follow-up)',
    'Register A2P for client number', 'Set up missed call text-back',
    'Configure email templates', 'Import and organize contact list'
  ]},
  { name: 'Ads Launch', icon: '\u{1F680}', tasks: [
    'Install Meta Pixel on website', 'Create Meta campaigns (ABO structure)',
    'Design ad creatives (before/after, testimonials)', 'Set up lead form or landing page',
    'Launch initial ad sets', 'Verify leads flowing into GHL'
  ]},
  { name: 'AI Voice Setup', icon: '\u{1F916}', tasks: [
    'Configure Retell AI agent (Sarah)', 'Customize call script for business',
    'Test inbound call flow', 'Test outbound speed-to-lead call',
    'Connect AI agent to GHL webhook', 'Run live test with real lead'
  ]},
  { name: 'Lead Flow Active', icon: '\u{26A1}', tasks: [
    'Confirm leads coming into GHL', 'Verify SMS drip sequences firing',
    'Confirm AI voice calls connecting', 'Check appointment booking flow',
    'Notify client \u2014 leads are live', 'Monitor first 48 hours'
  ]},
  { name: 'Optimization', icon: '\u{1F4CA}', tasks: [
    'Review cost per lead (target < $25)', 'Analyze ad creative performance',
    'A/B test new creatives', 'Refine AI call script from recordings',
    'Adjust SMS sequence timing', 'Optimize audience targeting'
  ]},
  { name: 'Results & Reporting', icon: '\u{1F3C6}', tasks: [
    'Pull KPIs (leads, CPL, appointments, close rate)', 'Generate monthly client report',
    'Record Loom walkthrough of results', 'Book retention call with client',
    'Document wins and case study material', 'Plan next month strategy'
  ]}
];

// ---------- STATE ----------
const KEY = 'autoflo-crm';
let clients = [];
let activeId = null;
let searchQuery = '';

// ---------- STORAGE ----------
function save() { localStorage.setItem(KEY, JSON.stringify(clients)); }
function load() {
  try { clients = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { clients = []; }
}

// ---------- AUTH ----------
function checkAuth() {
  if (sessionStorage.getItem('autoflo-auth') === '1') {
    document.getElementById('gate').classList.add('hidden');
    return;
  }
}

document.getElementById('gateForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const pass = document.getElementById('gatePass').value;
  if (pass === ACCESS_CODE) {
    sessionStorage.setItem('autoflo-auth', '1');
    document.getElementById('gate').classList.add('hidden');
    document.getElementById('gateErr').textContent = '';
  } else {
    document.getElementById('gateErr').textContent = 'Wrong code. Try again.';
    document.getElementById('gatePass').value = '';
    document.getElementById('gatePass').focus();
  }
});

// ---------- HELPERS ----------
function find(id) { return clients.find(c => c.id === id); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }

function progress(c) {
  let t = 0, d = 0;
  c.stages.forEach(s => s.tasks.forEach(tk => { t++; if (tk.done) d++; }));
  return t === 0 ? 0 : Math.round((d / t) * 100);
}

function curStage(c) {
  for (let i = 0; i < c.stages.length; i++) {
    if (c.stages[i].tasks.some(t => !t.done)) return i;
  }
  return c.stages.length - 1;
}

function stgComp(stage) {
  const t = stage.tasks.length, d = stage.tasks.filter(tk => tk.done).length;
  return { d, t, full: d === t, pct: t === 0 ? 0 : d / t };
}

function allDone(c) { return c.stages.every(s => s.tasks.every(t => t.done)); }

function fmtDate(iso) {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function nextAction(c) {
  if (c.nextAction) return c.nextAction;
  for (const s of c.stages) for (const t of s.tasks) if (!t.done) return t.text;
  return 'All tasks complete';
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w.charAt(0)).join('').toUpperCase();
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function trunc(s, n) { return s.length > n ? s.slice(0, n) + '\u2026' : s; }

function getFiltered() {
  if (!searchQuery) return clients;
  const q = searchQuery.toLowerCase();
  return clients.filter(c =>
    c.businessName.toLowerCase().includes(q) ||
    c.clientName.toLowerCase().includes(q)
  );
}

// ---------- EXPORT / IMPORT ----------
function exportData() {
  const json = JSON.stringify(clients, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'autoflo-clients-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Data exported');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');
      clients = data;
      save();
      renderDash();
      toast(data.length + ' clients imported');
    } catch {
      toast('Invalid file \u2014 must be a JSON export');
    }
  };
  reader.readAsText(file);
}

// ---------- RENDER DASHBOARD ----------
function renderDash() {
  const filtered = getFiltered();
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const count = document.getElementById('clientCount');

  if (clients.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    count.textContent = '';
    updateStats();
    return;
  }

  empty.style.display = 'none';

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty" style="display:flex;min-height:200px"><p>No matches found.</p></div>';
  } else {
    grid.innerHTML = filtered.map(renderCard).join('');
    grid.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => openDetail(card.dataset.id));
    });
  }

  count.textContent = searchQuery
    ? filtered.length + ' of ' + clients.length + ' clients'
    : clients.length + ' client' + (clients.length === 1 ? '' : 's');

  updateStats();
}

function renderCard(c) {
  const pct = progress(c);
  const si = curStage(c);
  const stg = c.stages[si];
  const comp = stgComp(stg);
  const done = allDone(c);
  const na = nextAction(c);
  const ini = initials(c.businessName);

  // Stage dots
  const dots = c.stages.map(s => {
    const sc = stgComp(s);
    if (sc.full) return '<div class="sdot filled"></div>';
    if (sc.d > 0) return '<div class="sdot partial"></div>';
    return '<div class="sdot"></div>';
  }).join('');

  return '<div class="card" data-id="' + c.id + '">' +
    '<div class="card-head">' +
      '<div class="card-avatar">' + ini + '</div>' +
      '<div class="card-info">' +
        '<div class="card-biz">' + esc(c.businessName) + '</div>' +
        '<div class="card-name">' + esc(c.clientName) + '</div>' +
      '</div>' +
      '<div class="card-ring">' +
        '<svg viewBox="0 0 36 36">' +
          '<path class="c-bg" d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"/>' +
          '<path class="c-fill" d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831" stroke-dasharray="' + pct + ', 100"/>' +
        '</svg>' +
        '<span class="c-txt">' + pct + '%</span>' +
      '</div>' +
    '</div>' +
    '<div class="card-mid">' +
      '<span class="badge ' + (done ? 'done' : '') + '">' + stg.icon + ' ' + stg.name + ' ' + (done ? '\u2713' : comp.d + '/' + comp.t) + '</span>' +
      '<div class="stage-dots">' + dots + '</div>' +
    '</div>' +
    '<div class="card-bar"><div class="card-bar-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="card-foot">' +
      '<span class="card-next">\u2192 ' + esc(trunc(na, 44)) + '</span>' +
      '<span class="card-date">' + fmtDate(c.dateStarted) + '</span>' +
    '</div>' +
  '</div>';
}

// ---------- RENDER DETAIL ----------
function renderDetail(id) {
  const c = find(id);
  if (!c) return;
  const pct = progress(c);
  const cur = curStage(c);
  const circ = 2 * Math.PI * 30;
  const ini = initials(c.businessName);

  const completedStages = c.stages.filter(s => s.tasks.every(t => t.done)).length;
  const fillPct = completedStages <= 0 ? 0 : Math.min(100, ((completedStages - 0.5) / (c.stages.length - 1)) * 100);

  const body = document.getElementById('panelBody');
  body.innerHTML =
    // SVG gradient definition
    '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
    '<stop offset="0%" style="stop-color:#C8A84C"/><stop offset="100%" style="stop-color:#E0C068"/>' +
    '</linearGradient></defs></svg>' +

    '<div class="d-head">' +
      '<div style="display:flex;align-items:center">' +
        '<div class="d-avatar">' + ini + '</div>' +
        '<div class="d-info"><div class="d-biz">' + esc(c.businessName) + '</div><div class="d-name">' + esc(c.clientName) + '</div></div>' +
      '</div>' +
      '<div class="d-ring">' +
        '<svg viewBox="0 0 72 72">' +
          '<circle cx="36" cy="36" r="30" class="r-bg"/>' +
          '<circle cx="36" cy="36" r="30" class="r-fill" stroke-dasharray="' + ((pct / 100) * circ) + ' ' + circ + '" transform="rotate(-90 36 36)"/>' +
        '</svg>' +
        '<span class="r-txt">' + pct + '%</span>' +
      '</div>' +
    '</div>' +

    '<div class="d-contacts">' +
      (c.phone ? '<span class="d-chip">\u{1F4DE} ' + esc(c.phone) + '</span>' : '') +
      (c.email ? '<span class="d-chip">\u2709\uFE0F ' + esc(c.email) + '</span>' : '') +
      '<span class="d-chip">\u{1F4C5} Started ' + fmtDate(c.dateStarted) + '</span>' +
    '</div>' +

    '<div class="timeline"><div class="tl-track">' +
      '<div class="tl-bar"><div class="tl-fill" style="width:' + fillPct + '%"></div></div>' +
      c.stages.map(function(stg, i) {
        var comp = stgComp(stg);
        var cls = 'dot';
        if (comp.full) cls += ' done';
        else if (i === cur) cls += ' active';
        return '<div class="' + cls + '" title="' + stg.name + ': ' + comp.d + '/' + comp.t + '">' +
          '<div class="dot-c">' + (comp.full ? '\u2713' : stg.icon) + '</div>' +
          '<span class="dot-l">' + stg.name.split(' ')[0] + '</span></div>';
      }).join('') +
    '</div></div>' +

    '<div class="stages">' +
      c.stages.map(function(stg, i) {
        var comp = stgComp(stg);
        var isCur = i === cur;
        return '<div class="stg ' + (isCur ? 'cur' : '') + '">' +
          '<div class="stg-hd" data-tog="' + i + '">' +
            '<div class="stg-hd-l">' +
              '<span class="stg-ico">' + stg.icon + '</span>' +
              '<span class="stg-nm">' + stg.name + '</span>' +
              '<span class="stg-cnt ' + (comp.full ? 'dn' : '') + '">' + comp.d + '/' + comp.t + '</span>' +
            '</div>' +
            '<span class="stg-arr ' + (isCur ? 'open' : '') + '">\u25BE</span>' +
          '</div>' +
          '<div class="stg-body ' + (isCur ? 'open' : '') + '">' +
            stg.tasks.map(function(tk, ti) {
              return '<label class="task ' + (tk.done ? 'ck' : '') + '">' +
                '<input type="checkbox" ' + (tk.done ? 'checked' : '') + ' data-c="' + id + '" data-s="' + i + '" data-t="' + ti + '">' +
                '<span class="tbox"></span><span class="ttxt">' + esc(tk.text) + '</span></label>';
            }).join('') +
          '</div></div>';
      }).join('') +
    '</div>' +

    '<div class="d-fields">' +
      '<div><label>Next Action</label>' +
        '<input class="d-input" id="inNext" value="' + esc(nextAction(c)) + '" placeholder="What needs to happen next?"></div>' +
      '<div><label>Notes</label>' +
        '<textarea class="d-ta" id="inNotes" rows="4" placeholder="Client notes, preferences, context...">' + esc(c.notes || '') + '</textarea></div>' +
    '</div>';

  // Bind events
  body.querySelectorAll('[data-tog]').forEach(function(hd) {
    hd.addEventListener('click', function() {
      hd.closest('.stg').querySelector('.stg-body').classList.toggle('open');
      hd.querySelector('.stg-arr').classList.toggle('open');
    });
  });

  body.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
    cb.addEventListener('change', function(e) {
      toggleTask(e.target.dataset.c, +e.target.dataset.s, +e.target.dataset.t);
    });
  });

  document.getElementById('inNext').addEventListener('change', function(e) {
    var cl = find(activeId);
    if (cl) { cl.nextAction = e.target.value; save(); }
  });

  document.getElementById('inNotes').addEventListener('change', function(e) {
    var cl = find(activeId);
    if (cl) { cl.notes = e.target.value; save(); }
  });
}

// ---------- ACTIONS ----------
function addClient(data) {
  var c = {
    id: uid(),
    clientName: data.name,
    businessName: data.biz,
    phone: data.phone,
    email: data.email,
    notes: data.notes,
    nextAction: '',
    dateStarted: new Date().toISOString(),
    stages: STAGES.map(function(s) {
      return { name: s.name, icon: s.icon, tasks: s.tasks.map(function(t) { return { text: t, done: false }; }) };
    })
  };
  clients.unshift(c);
  save();
  renderDash();
  toast(c.businessName + ' added');
}

function deleteClient(id) {
  var c = find(id);
  if (!c || !confirm('Delete ' + c.businessName + '?\n\nThis cannot be undone.')) return;
  clients = clients.filter(function(x) { return x.id !== id; });
  save();
  closeDetail();
  renderDash();
  toast(c.businessName + ' removed');
}

function toggleTask(cid, si, ti) {
  var c = find(cid);
  if (!c) return;
  c.stages[si].tasks[ti].done = !c.stages[si].tasks[ti].done;
  save();
  renderDetail(cid);
  renderDash();
}

// ---------- UI ----------
function openDetail(id) {
  activeId = id;
  renderDetail(id);
  document.getElementById('detailOv').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  activeId = null;
  document.getElementById('detailOv').classList.remove('open');
  document.body.style.overflow = '';
}

function openModal() {
  document.getElementById('modalOv').classList.add('open');
  setTimeout(function() { document.getElementById('fName').focus(); }, 100);
}

function closeModal() {
  document.getElementById('modalOv').classList.remove('open');
  document.getElementById('form').reset();
}

function toast(msg) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(function() { el.classList.remove('show'); }, 2800);
}

function updateStats() {
  document.getElementById('sTotal').textContent = clients.length;
  var a = clients.filter(function(c) { return !allDone(c); }).length;
  var d = clients.filter(function(c) { return allDone(c); }).length;
  document.getElementById('sActive').textContent = a;
  document.getElementById('sComplete').textContent = d;
  if (clients.length > 0) {
    var avg = Math.round(clients.reduce(function(sum, c) { return sum + progress(c); }, 0) / clients.length);
    document.getElementById('sAvg').textContent = avg + '%';
  } else {
    document.getElementById('sAvg').textContent = '0%';
  }
}

// ---------- EVENT BINDINGS ----------
document.getElementById('btnAdd').addEventListener('click', openModal);
document.getElementById('btnBack').addEventListener('click', closeDetail);
document.getElementById('btnDel').addEventListener('click', function() { if (activeId) deleteClient(activeId); });
document.getElementById('btnX').addEventListener('click', closeModal);

document.getElementById('btnExport').addEventListener('click', exportData);
document.getElementById('btnImport').addEventListener('click', function() {
  document.getElementById('fileIn').click();
});
document.getElementById('fileIn').addEventListener('change', function(e) {
  if (e.target.files[0]) importData(e.target.files[0]);
  e.target.value = '';
});

document.getElementById('search').addEventListener('input', function(e) {
  searchQuery = e.target.value.trim();
  renderDash();
});

document.getElementById('modalOv').addEventListener('click', function(e) {
  if (e.target === document.getElementById('modalOv')) closeModal();
});
document.getElementById('detailOv').addEventListener('click', function(e) {
  if (e.target === document.getElementById('detailOv')) closeDetail();
});

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  addClient({
    name: document.getElementById('fName').value.trim(),
    biz: document.getElementById('fBiz').value.trim(),
    phone: document.getElementById('fPhone').value.trim(),
    email: document.getElementById('fEmail').value.trim(),
    notes: document.getElementById('fNotes').value.trim()
  });
  closeModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('modalOv').classList.contains('open')) closeModal();
    else if (document.getElementById('detailOv').classList.contains('open')) closeDetail();
  }
});

// ---------- INIT ----------
load();
checkAuth();
renderDash();
