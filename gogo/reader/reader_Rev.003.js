// Shared Phase 1-6 Live Document Reader & Accelerated Learning Suite
(function () {
  'use strict';

  const STORAGE_KEY = 'dc36_eu_ireland_tracker_v1';
  const PROFILE_STORAGE_KEY = 'dc36_eu_profile_id_v1';
  const SIDEBAR_STORAGE_KEY = 'dc45_phase1_sidebar_hidden';
  const LOCAL_REPO_ROOT = 'G:\\My Drive\\7. AI\\DataCenter_EU_Ireland\\';
  const DATA = window.PHASE_PORTAL_DATA || window.PHASE1_PORTAL_DATA || { modules: [], masterWorkbooks: {} };
  const STORE = window.DC45_LEARNING_STORE;
  const SANDBOX = window.DC45_EXCEL_SANDBOX;

  let activeDocId = '';
  let activeSheetName = '';
  let showFormulas = false;
  let catFilter = 'ALL';
  let searchQuery = '';
  let cloudReady = false;
  let sidebarHidden = localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  let extrasState = STORE ? STORE.loadExtras() : { acronymHighlight: true, interactiveSandbox: true, srs: {}, notes: {}, sandbox: {} };
  const expandedModules = {};
  const revealedCards = {};

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function saveExtrasState() {
    if (STORE) STORE.saveExtras(extrasState);
  }

  function getActiveModuleId() {
    const m = /^(?:PKG|PM)-\d+/i.exec(activeDocId);
    if (m) return m[0].toUpperCase();
    return (DATA.modules && DATA.modules[0] && DATA.modules[0].id) || 'PKG-01';
  }

  function initExpandedModules() {
    const activeMid = getActiveModuleId();
    (DATA.modules || []).forEach(m => {
      if (typeof expandedModules[m.id] !== 'boolean') {
        expandedModules[m.id] = (m.id === activeMid);
      }
    });
  }

  function getOrderedDocEntries() {
    const list = [];
    (DATA.modules || []).forEach(m => {
      list.push({ id: `${m.id}-README`, modId: m.id, title: `00_README_${m.id}.md` });
      (m.docs || []).forEach(d => {
        list.push({ id: d.docId, modId: m.id, title: d.title });
      });
    });
    return list;
  }

  function stepDoc(delta) {
    const ordered = getOrderedDocEntries();
    if (!ordered.length) return;
    const idx = ordered.findIndex(x => x.id === activeDocId);
    const nextIdx = idx < 0 ? 0 : (idx + delta);
    if (nextIdx < 0 || nextIdx >= ordered.length) return;
    navigateToDoc(ordered[nextIdx].id);
  }

  function navigateToDoc(docId) {
    activeDocId = docId;
    activeSheetName = '';
    expandedModules[getActiveModuleId()] = true;
    window.history.replaceState(null, '', `#${activeDocId}`);
    hideAbbrPopover();
    renderSidebar();
    renderViewer();
    const pane = document.getElementById('p1-viewer');
    if (pane) pane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function applySidebarVisibility() {
    const layout = document.querySelector('.reader-layout');
    const sidebar = document.getElementById('p1-sidebar');
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const floatBtn = document.getElementById('btn-floating-sidebar');

    if (layout) layout.classList.toggle('is-sidebar-hidden', sidebarHidden);
    if (sidebar) sidebar.setAttribute('aria-hidden', sidebarHidden ? 'true' : 'false');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', sidebarHidden ? 'false' : 'true');
      toggleBtn.classList.toggle('is-hidden-state', sidebarHidden);
      const lbl = toggleBtn.querySelector('.sidebar-toggle-label');
      if (lbl) lbl.textContent = sidebarHidden ? 'Show Sidebar' : 'Hide Sidebar';
    }
    if (floatBtn) floatBtn.hidden = !sidebarHidden;
  }

  function setSidebarHidden(nextHidden) {
    sidebarHidden = Boolean(nextHidden);
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarHidden ? 'true' : 'false');
    } catch {
      // Ignore storage quota errors
    }
    applySidebarVisibility();
  }

  function getProfileId() {
    const p = (localStorage.getItem(PROFILE_STORAGE_KEY) || 'dc36-quan-eu').trim();
    return p.length >= 3 ? p : 'dc36-quan-eu';
  }

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        modules: raw.modules || {},
        portfolio: raw.portfolio || {},
        interviews: raw.interviews || {},
        docChecks: raw.docChecks || {}
      };
    } catch {
      return { modules: {}, portfolio: {}, interviews: {}, docChecks: {} };
    }
  }

  let appState = loadState();

  function saveState(st) {
    appState = st;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    updateStats();
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  function updateStats() {
    let done = 0;
    let total = 0;
    (DATA.modules || []).forEach(m => {
      (m.docs || []).forEach(d => {
        total += 1;
        if (appState.docChecks[`${m.id}::${d.idx0}`]) done += 1;
      });
    });
    const el = document.getElementById('stat-done');
    if (el) el.textContent = `${done} / ${total}`;
  }

  function getDocTextHaystack(mod, d) {
    const parts = [mod.id, mod.title, d.docId, d.cat, d.title, d.ref, d.why, d.fileName];
    if (d.docx && d.docx.blocks) {
      d.docx.blocks.forEach(b => {
        if (b.text) parts.push(b.text);
        if (b.rows) b.rows.forEach(r => parts.push(r.join(' ')));
      });
    }
    const wb = d.renderType === 'xlsx_master' ? (DATA.masterWorkbooks || {})[d.masterKey] : d.xlsx;
    if (wb && wb.sheets) {
      wb.sheets.forEach(s => {
        parts.push(s.name);
        s.rows.forEach(r => r.forEach(c => { if (c.v) parts.push(c.v); }));
      });
    }
    if (d.companionXlsx && d.companionXlsx.sheets) {
      d.companionXlsx.sheets.forEach(s => {
        parts.push(s.name);
        s.rows.forEach(r => r.forEach(c => { if (c.v) parts.push(c.v); }));
      });
    }
    return parts.join(' ').toLowerCase();
  }

  const LEGACY_DOC_ALIAS = {
    'PM-01-D1': 'PKG-01-D1',
    'PM-01-D2': 'PKG-01-D1',
    'PM-01-D3': 'PKG-01-D2',
    'PM-01-D4': 'PKG-01-D4',
    'PM-01-README': 'PKG-01-README',
    'PM-06-D1': 'PKG-01-D1',
    'PM-06-D2': 'PKG-01-D3',
    'PM-06-D3': 'PKG-01-D3',
    'PM-06-D4': 'PKG-01-D4',
    'PM-06-README': 'PKG-01-README',
    'PM-02-D1': 'PKG-02-D1',
    'PM-02-D2': 'PKG-02-D1',
    'PM-02-D3': 'PKG-02-D2',
    'PM-02-D4': 'PKG-02-D2',
    'PM-02-README': 'PKG-02-README',
    'PM-03-D1': 'PKG-02-D3',
    'PM-03-D2': 'PKG-02-D3',
    'PM-03-D3': 'PKG-02-D4',
    'PM-03-D4': 'PKG-02-D4',
    'PM-03-README': 'PKG-02-README',
    'PM-04-D1': 'PKG-03-D1',
    'PM-04-D2': 'PKG-03-D1',
    'PM-04-D3': 'PKG-03-D2',
    'PM-04-D4': 'PKG-03-D2',
    'PM-04-README': 'PKG-03-README',
    'PM-05-D1': 'PKG-03-D4',
    'PM-05-D2': 'PKG-03-D3',
    'PM-05-D3': 'PKG-03-D4',
    'PM-05-D4': 'PKG-03-D4',
    'PM-05-README': 'PKG-03-README',
  };

  function resolveInitialTarget() {
    const firstMod = (DATA.modules || [])[0];
    if (firstMod && firstMod.docs && firstMod.docs[0]) {
      activeDocId = firstMod.docs[0].docId;
    } else if (firstMod) {
      activeDocId = `${firstMod.id}-README`;
    }
    const rawH = (window.location.hash || '').replace(/^#/, '').trim();
    if (!rawH) return;
    const h = LEGACY_DOC_ALIAS[rawH] || rawH;
    for (const m of DATA.modules || []) {
      if (h === `${m.id}-README`) {
        activeDocId = h;
        return;
      }
      for (const d of m.docs || []) {
        if (d.docId === h) {
          activeDocId = h;
          return;
        }
      }
    }
  }

  function renderChips() {
    const host = document.getElementById('p1-cat-chips');
    if (!host) return;
    let docCount = 0;
    const catSet = new Set();
    (DATA.modules || []).forEach(m => {
      (m.docs || []).forEach(d => {
        docCount += 1;
        if (d.cat) catSet.add(d.cat);
      });
    });
    const opts = ['ALL', ...Array.from(catSet)];
    const chipsHtml = opts.map(k => {
      const tagAttr = k === 'ALL' ? 'ALL' : k.toUpperCase();
      const label = k === 'ALL' ? `All Documents (${docCount})` : k;
      return `<button type="button" class="chip ${catFilter === k ? 'active' : ''}" data-cat-val="${k}" data-cat="${tagAttr}">${escapeHtml(label)}</button>`;
    }).join('');
    const acronymBtnHtml = `<button type="button" id="btn-toggle-acronyms" class="btn-toolbar-toggle ${extrasState.acronymHighlight ? 'is-active' : ''}" title="Highlight & explain DC45-EU engineering/statutory acronyms on hover">Acronyms: ${extrasState.acronymHighlight ? 'ON' : 'OFF'}</button>`;
    host.innerHTML = chipsHtml + acronymBtnHtml;

    host.querySelectorAll('.chip').forEach(btn => {
      btn.onclick = () => {
        catFilter = btn.dataset.catVal;
        if (sidebarHidden) setSidebarHidden(false);
        renderChips();
        renderSidebar();
      };
    });

    const acrBtn = document.getElementById('btn-toggle-acronyms');
    if (acrBtn) {
      acrBtn.onclick = () => {
        extrasState.acronymHighlight = !extrasState.acronymHighlight;
        saveExtrasState();
        hideAbbrPopover();
        renderChips();
        renderViewer();
      };
    }
  }

  function renderSidebar() {
    const host = document.getElementById('p1-sidebar');
    if (!host) return;
    initExpandedModules();
    const q = searchQuery.trim().toLowerCase();
    const filtering = Boolean(q || catFilter !== 'ALL');
    const mods = DATA.modules || [];
    const phaseNum = DATA.phaseNum || 1;
    const allExpanded = mods.length > 0 && mods.every(m => Boolean(expandedModules[m.id]));
    const chevronSvg = '<svg class="nav-mod-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 6 8 10 12 6"></polyline></svg>';

    const html = mods.map(m => {
      const matching = (m.docs || []).filter(d => {
        if (catFilter !== 'ALL' && d.cat !== catFilter) return false;
        if (q && !getDocTextHaystack(m, d).includes(q)) return false;
        return true;
      });
      if (!matching.length && filtering) return '';
      let doneCount = 0;
      (m.docs || []).forEach(d => {
        if (appState.docChecks[`${m.id}::${d.idx0}`]) doneCount += 1;
      });
      const isExpanded = filtering ? true : Boolean(expandedModules[m.id]);
      const readmeActive = activeDocId === `${m.id}-README` ? 'active' : '';
      const readmeRow = (catFilter === 'ALL' || (q && `readme ${m.id} ${m.title}`.toLowerCase().includes(q))) ? `
        <button type="button" class="nav-doc-btn ${readmeActive}" data-doc="${m.id}-README">
          <span class="nav-cat-tag" data-cat="README">README</span>
          <span class="nav-doc-title">00_README_${m.id}.md</span>
        </button>` : '';
      const docsHtml = matching.map(d => {
        const k = `${m.id}::${d.idx0}`;
        const isDone = Boolean(appState.docChecks[k]);
        const isAct = activeDocId === d.docId ? 'active' : '';
        return `
          <button type="button" class="nav-doc-btn ${isAct} ${isDone ? 'is-done' : ''}" data-doc="${d.docId}">
            <span class="nav-cat-tag" data-cat="${escapeHtml(d.cat.toUpperCase())}">${escapeHtml(d.cat)}</span>
            <span class="nav-doc-title">${isDone ? '[Done] ' : ''}${escapeHtml(d.title)}</span>
          </button>
        `;
      }).join('');
      return `
        <div class="nav-module-group">
          <button type="button" class="nav-module-toggle" data-mod-toggle="${m.id}" aria-expanded="${isExpanded ? 'true' : 'false'}">
            <span>${escapeHtml(m.id)}: ${escapeHtml(m.title)}</span>
            <span class="nav-module-meta">
              <span class="nav-mod-count">${doneCount}/${(m.docs || []).length}</span>
              ${chevronSvg}
            </span>
          </button>
          <div class="nav-module-items ${isExpanded ? '' : 'is-collapsed'}">
            ${readmeRow}
            ${docsHtml}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    const controlsHtml = `
      <div class="sidebar-controls">
        <span class="sidebar-controls-label">Phase ${phaseNum} Modules (${mods.length})</span>
        <div class="sidebar-controls-actions">
          <button type="button" id="btn-toggle-all" class="sidebar-all-btn">${allExpanded ? 'Collapse All' : 'Expand All'}</button>
          <button type="button" id="btn-sidebar-hide" class="sidebar-all-btn" title="Hide sidebar (shortcut: ])">Hide</button>
        </div>
      </div>
    `;

    host.innerHTML = controlsHtml + (html || `<div style="padding:12px;font-size:13px;">No Phase ${phaseNum} documents match current search or filter.</div>`);

    const hideSidebarBtn = document.getElementById('btn-sidebar-hide');
    if (hideSidebarBtn) hideSidebarBtn.onclick = () => setSidebarHidden(true);

    const toggleAllBtn = document.getElementById('btn-toggle-all');
    if (toggleAllBtn) {
      toggleAllBtn.onclick = () => {
        const nextVal = !allExpanded;
        mods.forEach(m => { expandedModules[m.id] = nextVal; });
        renderSidebar();
      };
    }

    host.querySelectorAll('[data-mod-toggle]').forEach(btn => {
      btn.onclick = () => {
        const mid = btn.dataset.modToggle;
        expandedModules[mid] = !Boolean(expandedModules[mid]);
        renderSidebar();
      };
    });

    host.querySelectorAll('[data-doc]').forEach(btn => {
      btn.onclick = () => navigateToDoc(btn.dataset.doc);
    });
  }

  function renderDocxBlocks(blocks) {
    return (blocks || []).map(b => {
      if (b.type === 'banner') return `<div class="docx-banner">${escapeHtml(b.text)}</div>`;
      if (b.type === 'h1') return `<h3 class="docx-h1">${escapeHtml(b.text)}</h3>`;
      if (b.type === 'bullet') return `<li class="docx-bullet">${escapeHtml(b.text)}</li>`;
      if (b.type === 'table') {
        const trs = (b.rows || []).map((row, rIdx) => {
          const cells = row.map(c => rIdx === 0 ? `<th>${escapeHtml(c)}</th>` : `<td>${escapeHtml(c)}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<div class="table-scroll"><table class="detail-table">${trs}</table></div>`;
      }
      return `<p class="docx-p">${escapeHtml(b.text)}</p>`;
    }).join('');
  }

  function isEditableSandboxCell(cell) {
    if (!cell || cell.kind !== 'input' || (cell.f && cell.f.startsWith('='))) return false;
    if (typeof cell.raw === 'number') return true;
    const v = String(cell.v ?? '').trim();
    if (v === '') return true;
    return /^(YES|NO|Y|N|TRUE|FALSE|-?[\d,.]+%?)$/i.test(v);
  }

  function getWorkbookSandboxKey(docKey, fileName) {
    return `${docKey}::${fileName || 'wb'}`;
  }

  function renderWorkbook(wbObj, preferredSheet, labelPrefix, workbookKey, allowSandbox) {
    const sheets = (wbObj && wbObj.sheets) || [];
    if (!sheets.length) return '<p>No worksheet data available.</p>';
    const currentName = (sheets.find(s => s.name === activeSheetName) ? activeSheetName : (sheets.find(s => s.name === preferredSheet) ? preferredSheet : sheets[0].name));
    const current = sheets.find(s => s.name === currentName) || sheets[0];

    const sbOverrides = (allowSandbox && extrasState.interactiveSandbox && extrasState.sandbox[workbookKey]) ? extrasState.sandbox[workbookKey] : {};
    const ovCount = Object.keys(sbOverrides).length;
    const evaluated = (allowSandbox && SANDBOX) ? SANDBOX.evaluateWorkbook(wbObj, sbOverrides) : null;
    const sheetEval = evaluated && evaluated.sheets ? (evaluated.sheets[current.name] || {}) : {};

    const tabsHtml = sheets.map(s =>
      `<button type="button" class="sheet-tab-btn ${s.name === current.name ? 'active' : ''}" data-sheet="${escapeHtml(s.name)}">${escapeHtml(s.name)}${s.formulaCount ? ` (${s.formulaCount}f)` : ''}</button>`
    ).join('');

    const CELL_CLASS_BY_KIND = {
      banner: 'cell-banner',
      header: 'cell-header',
      section: 'cell-section',
      input: 'cell-input',
      total: 'cell-total',
      alert: 'cell-alert',
      pass: 'cell-pass',
      warn: 'cell-warn',
    };

    const hasAnyEditable = allowSandbox && current.rows.some(r => r.some(c => isEditableSandboxCell(c)));

    const rowsHtml = (current.rows || []).map(row => {
      const tds = row.filter(cell => !cell.skip).map(cell => {
        const cls = CELL_CLASS_BY_KIND[cell.kind] || 'cell-plain';
        const coord = cell.coord || '';
        const fullKey = coord ? `${current.name}!${coord}` : '';
        const evalEntry = coord && sheetEval[coord] ? sheetEval[coord] : null;
        const dispVal = evalEntry ? evalEntry.displayVal : cell.v;
        const recalcCls = (evalEntry && evalEntry.recalced) ? ' is-sandbox-recalc' : '';
        const fBadge = showFormulas && cell.f ? `<span class="formula-hint">${escapeHtml(cell.f)}</span>` : '';
        const spanAttrs = `${cell.rspan > 1 ? ` rowspan="${cell.rspan}"` : ''}${cell.cspan > 1 ? ` colspan="${cell.cspan}"` : ''}`;

        if (allowSandbox && extrasState.interactiveSandbox && coord && isEditableSandboxCell(cell)) {
          const curInputVal = Object.prototype.hasOwnProperty.call(sbOverrides, fullKey) ? sbOverrides[fullKey] : cell.v;
          const isDirty = Object.prototype.hasOwnProperty.call(sbOverrides, fullKey);
          return `<td class="${cls}"${spanAttrs} title="Editable What-If Input (${escapeHtml(coord)})"><input type="text" class="sandbox-cell-input ${isDirty ? 'is-dirty' : ''}" data-wbkey="${escapeHtml(workbookKey)}" data-sheet="${escapeHtml(current.name)}" data-coord="${escapeHtml(coord)}" value="${escapeHtml(curInputVal)}" />${fBadge}</td>`;
        }
        return `<td class="${cls}${recalcCls}"${spanAttrs}${coord ? ` data-cell-coord="${escapeHtml(coord)}"` : ''} title="${cell.f ? escapeHtml(cell.f) : ''}">${escapeHtml(dispVal)}${fBadge}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    }).join('');

    const formulaCount = typeof current.formulaCount === 'number'
      ? current.formulaCount
      : (current.rows || []).reduce((acc, r) => acc + r.filter(c => c && c.f).length, 0);

    const sandboxControlsHtml = hasAnyEditable ? `
      <label style="font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
        <input type="checkbox" class="toggle-sandbox-chk" ${extrasState.interactiveSandbox ? 'checked' : ''} />
        <span>What-If Inputs</span>
      </label>
      ${ovCount > 0 ? `<button type="button" class="btn-ui btn-sandbox-reset" data-wbkey="${escapeHtml(workbookKey)}" style="padding:4px 10px;font-size:11px;">Reset Inputs (${ovCount})</button>` : ''}
    ` : '';

    return `
      <div class="sheet-tabs-bar">
        <div class="chip-row">${tabsHtml}</div>
        <div class="sheet-controls-right">
          ${sandboxControlsHtml}
          <label style="font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <input type="checkbox" class="toggle-formulas-chk" ${showFormulas ? 'checked' : ''} />
            <span>Show Excel Formulas (${formulaCount})</span>
          </label>
        </div>
      </div>
      <div class="mono" style="font-size:11.5px;color:#44474f;margin-bottom:6px;">${escapeHtml(labelPrefix || wbObj.fileName)} | Active Sheet: ${escapeHtml(current.name)}${hasAnyEditable ? ' | Blue cells = live What-If inputs (recalculates in browser)' : ''}</div>
      <div class="table-scroll"><table class="detail-table" data-sb-table="${escapeHtml(workbookKey)}" data-sb-sheet="${escapeHtml(current.name)}">${rowsHtml}</table></div>
    `;
  }

  function updateSandboxTableInPlace(tableEl, wbObj, workbookKey) {
    if (!tableEl || !wbObj || !SANDBOX) return;
    const sheetName = tableEl.dataset.sbSheet;
    const sheetObj = (wbObj.sheets || []).find(s => s.name === sheetName);
    if (!sheetObj) return;
    const sbOverrides = extrasState.sandbox[workbookKey] || {};
    const evaluated = SANDBOX.evaluateWorkbook(wbObj, sbOverrides);
    const sheetEval = evaluated.sheets[sheetName] || {};

    const cellLookup = {};
    (sheetObj.rows || []).forEach(r => r.forEach(c => { if (c.coord) cellLookup[c.coord] = c; }));

    tableEl.querySelectorAll('td[data-cell-coord]').forEach(td => {
      const coord = td.dataset.cellCoord;
      const cell = cellLookup[coord];
      const evalEntry = sheetEval[coord];
      if (!cell || !evalEntry) return;
      td.classList.toggle('is-sandbox-recalc', Boolean(evalEntry.recalced));
      const fHint = td.querySelector('.formula-hint');
      if (fHint) {
        td.innerHTML = `${escapeHtml(evalEntry.displayVal)}<span class="formula-hint">${escapeHtml(cell.f)}</span>`;
      } else {
        td.textContent = evalEntry.displayVal;
      }
    });
  }

  function renderKeyFactsHtml(mod) {
    const facts = (mod && mod.keyFacts) || [];
    if (!facts.length) return '';
    return `
      <div class="keyfacts-strip">
        <div class="keyfacts-title">${escapeHtml(mod.id)} Numbers &amp; Thresholds Cheat Sheet</div>
        <div class="keyfacts-pills">${facts.map(f => `<span class="keyfact-pill">${escapeHtml(f)}</span>`).join('')}</div>
      </div>
    `;
  }

  function renderStepperHtml() {
    const ordered = getOrderedDocEntries();
    const idx = ordered.findIndex(x => x.id === activeDocId);
    const prev = idx > 0 ? ordered[idx - 1] : null;
    const next = (idx >= 0 && idx + 1 < ordered.length) ? ordered[idx + 1] : null;
    return `
      <div class="doc-stepper-bar" aria-label="Sequential document navigation">
        <button type="button" class="stepper-btn btn-step-prev" ${prev ? '' : 'disabled'} title="Previous document (Alt+LeftArrow)">
          <span>&lt;- Prev</span>
          <span class="stepper-btn-text">${prev ? escapeHtml(`${prev.modId}: ${prev.title}`) : 'Start of Phase'}</span>
        </button>
        <span class="stepper-pos-label">${idx >= 0 ? `${idx + 1} / ${ordered.length}` : ''}</span>
        <button type="button" class="stepper-btn btn-step-next" ${next ? '' : 'disabled'} title="Next document (Alt+RightArrow)">
          <span class="stepper-btn-text">${next ? escapeHtml(`${next.modId}: ${next.title}`) : 'End of Phase'}</span>
          <span>Next -&gt;</span>
        </button>
      </div>
    `;
  }

  function renderLearningSuiteHtml(modId, docId) {
    const noteObj = extrasState.notes[docId] || { text: '', updatedAt: null };
    const curMod = (DATA.modules || []).find(m => m.id === modId);
    const legacyIds = (curMod && curMod.legacyModIds) || [];
    const cards = (window.DC45_FLASHCARDS || []).filter(c => c.modId === modId || legacyIds.includes(c.modId));
    const now = Date.now();

    const cardsHtml = cards.map(c => {
      const st = extrasState.srs[c.id];
      const due = STORE ? STORE.isCardDue(st, now) : true;
      const dueLbl = STORE ? STORE.formatDueLabel(st, now) : 'New Card';
      const isShown = Boolean(revealedCards[c.id]);
      return `
        <div class="srs-card ${due ? 'is-due' : ''}" data-srs-card="${escapeHtml(c.id)}">
          <div>
            <div class="srs-card-top">
              <span class="mono" style="font-size:11px;font-weight:800;color:#44474f;">${escapeHtml(c.id)} | ${escapeHtml(c.cat)}</span>
              <span class="srs-due-badge ${due ? '' : 'is-scheduled'}">${escapeHtml(dueLbl)}</span>
            </div>
            <div class="srs-question" style="margin-top:6px;">${escapeHtml(c.q)}</div>
          </div>
          <div>
            ${isShown
              ? `<div class="srs-answer">${escapeHtml(c.a)}</div>
                 <div class="srs-rating-row" style="margin-top:8px;">
                   <button type="button" class="btn-srs-rate" data-card="${escapeHtml(c.id)}" data-rate="0">Again (&lt;10m)</button>
                   <button type="button" class="btn-srs-rate" data-card="${escapeHtml(c.id)}" data-rate="1">Hard (1d)</button>
                   <button type="button" class="btn-srs-rate" data-card="${escapeHtml(c.id)}" data-rate="2">Good (3d+)</button>
                   <button type="button" class="btn-srs-rate" data-card="${escapeHtml(c.id)}" data-rate="3">Easy (7d+)</button>
                 </div>`
              : `<button type="button" class="btn-ui btn-ui-tonal btn-reveal-card" data-card="${escapeHtml(c.id)}" style="width:100%;justify-content:center;">Reveal Answer</button>`
            }
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="learning-suite-grid">
        <section class="feynman-box" aria-label="Feynman 1-Minute Quick Note">
          <div class="suite-card-head">
            <h3 class="suite-card-title">Feynman 1-Minute Summary Note (${escapeHtml(docId)})</h3>
            <span id="feynman-save-pill" class="suite-meta-pill ${noteObj.text ? 'is-saved' : ''}">${noteObj.text ? 'Saved Locally' : 'Write 3 Core Rules'}</span>
          </div>
          <textarea id="feynman-note-input" class="feynman-textarea" placeholder="Distill the core engineering threshold, statutory gate, contract clause, or formula from this document in plain words...">${escapeHtml(noteObj.text || '')}</textarea>
        </section>
        ${cards.length ? `
          <section class="srs-deck-card" aria-label="Active Recall Flashcards">
            <div class="suite-card-head">
              <h3 class="suite-card-title">${escapeHtml(modId)} Active Recall Drill (SM-2 Spaced Repetition)</h3>
              <span class="suite-meta-pill">${cards.filter(c => !STORE || STORE.isCardDue(extrasState.srs[c.id], now)).length} / ${cards.length} Due</span>
            </div>
            <div class="srs-cards-grid">${cardsHtml}</div>
          </section>
        ` : ''}
      </div>
    `;
  }

  // Acronym Popover & Safe Text-Node Scanner
  let acronymRegexCache = null;
  let acronymSortedKeys = null;

  function ensureAcronymMatcher() {
    if (acronymRegexCache) return true;
    const map = window.DC45_GLOSSARY_MAP;
    if (!map) return false;
    acronymSortedKeys = Object.keys(map)
      .filter(k => k.length >= 2 && !k.includes(' ') && !k.includes('/'))
      .sort((a, b) => b.length - a.length);
    if (!acronymSortedKeys.length) return false;
    const escaped = acronymSortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    acronymRegexCache = new RegExp(`(?<![A-Za-z0-9-])(${escaped.join('|')})(?![A-Za-z0-9-])`, 'g');
    return true;
  }

  function highlightAcronyms(container) {
    if (!container || !extrasState.acronymHighlight || !ensureAcronymMatcher()) return;
    const map = window.DC45_GLOSSARY_MAP || {};
    const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'BUTTON', 'A', 'CODE', 'PRE']);
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let cur;
    while ((cur = walker.nextNode())) {
      const p = cur.parentElement;
      if (!p) continue;
      if (SKIP_TAGS.has(p.tagName) || p.closest('.formula-hint,.abbr-term,.abbr-popover')) continue;
      if (!cur.nodeValue || cur.nodeValue.trim().length < 2) continue;
      textNodes.push(cur);
    }

    textNodes.forEach(node => {
      const txt = node.nodeValue;
      acronymRegexCache.lastIndex = 0;
      let match;
      let lastIdx = 0;
      let frag = null;
      while ((match = acronymRegexCache.exec(txt)) !== null) {
        const tok = match[1];
        if (!map[tok]) continue;
        if (!frag) frag = document.createDocumentFragment();
        if (match.index > lastIdx) {
          frag.appendChild(document.createTextNode(txt.slice(lastIdx, match.index)));
        }
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'abbr-term';
        btn.dataset.abbr = tok;
        btn.textContent = tok;
        frag.appendChild(btn);
        lastIdx = match.index + tok.length;
      }
      if (frag && lastIdx > 0) {
        if (lastIdx < txt.length) {
          frag.appendChild(document.createTextNode(txt.slice(lastIdx)));
        }
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  function showAbbrPopover(targetEl, token) {
    const entry = (window.DC45_GLOSSARY_MAP || {})[token];
    const pop = document.getElementById('abbr-popover');
    if (!entry || !pop) return;
    pop.innerHTML = `
      <div class="abbr-pop-head">
        <span class="abbr-pop-code">${escapeHtml(entry.abbr)}</span>
        <span class="abbr-pop-cat">${escapeHtml(entry.cat)}</span>
      </div>
      <div class="abbr-pop-full">${escapeHtml(entry.full)}</div>
      <div class="abbr-pop-desc">${escapeHtml(String(entry.desc || '').replace(/`/g, ''))}</div>
      <div class="abbr-pop-where">Ref: ${escapeHtml(entry.where)}</div>
    `;
    pop.hidden = false;
    const rect = targetEl.getBoundingClientRect();
    const popW = Math.min(340, window.innerWidth - 24);
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - popW - 12));
    const top = rect.bottom + 8 + 140 > window.innerHeight ? Math.max(12, rect.top - 150) : rect.bottom + 8;
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  }

  function hideAbbrPopover() {
    const pop = document.getElementById('abbr-popover');
    if (pop) pop.hidden = true;
  }

  async function toggleDocCheck(mod, d, checked) {
    const k = `${mod.id}::${d.idx0}`;
    if (checked) appState.docChecks[k] = true;
    else delete appState.docChecks[k];
    saveState(appState);
    renderSidebar();
    renderViewer();
    if (window.DC36_Supabase && cloudReady) {
      const res = await window.DC36_Supabase.upsertDocChecks([{
        profile_id: getProfileId(),
        doc_key: k,
        module_id: mod.id,
        doc_index: d.idx0,
        track: 'pm',
        doc_title: d.title,
        checked: Boolean(checked),
        updated_at: new Date().toISOString()
      }]);
      if (res && res.ok) showToast(`Saved ${d.docId} to Supabase`);
    }
  }

  function attachLearningListeners(targetModId, targetDocId, workbookMap) {
    const pane = document.getElementById('p1-viewer');
    if (!pane) return;

    pane.querySelectorAll('.btn-step-prev').forEach(b => { b.onclick = () => stepDoc(-1); });
    pane.querySelectorAll('.btn-step-next').forEach(b => { b.onclick = () => stepDoc(1); });

    const feynmanEl = document.getElementById('feynman-note-input');
    const feynmanPill = document.getElementById('feynman-save-pill');
    if (feynmanEl) {
      feynmanEl.addEventListener('input', () => {
        extrasState.notes[targetDocId] = {
          text: feynmanEl.value,
          updatedAt: new Date().toISOString(),
        };
        saveExtrasState();
        if (feynmanPill) {
          feynmanPill.textContent = feynmanEl.value.trim() ? 'Saved Locally' : 'Write 3 Core Rules';
          feynmanPill.classList.toggle('is-saved', Boolean(feynmanEl.value.trim()));
        }
      });
    }

    pane.querySelectorAll('.btn-reveal-card').forEach(btn => {
      btn.onclick = () => {
        revealedCards[btn.dataset.card] = true;
        renderViewer();
      };
    });

    pane.querySelectorAll('.btn-srs-rate').forEach(btn => {
      btn.onclick = () => {
        const cardId = btn.dataset.card;
        const rate = Number(btn.dataset.rate);
        if (STORE) {
          extrasState.srs[cardId] = STORE.gradeSrsCard(extrasState.srs[cardId], rate);
          saveExtrasState();
        }
        delete revealedCards[cardId];
        renderViewer();
        showToast(`Scheduled ${cardId}: ${STORE ? STORE.formatDueLabel(extrasState.srs[cardId]) : 'Updated'}`);
      };
    });

    pane.querySelectorAll('.toggle-sandbox-chk').forEach(chk => {
      chk.onchange = () => {
        extrasState.interactiveSandbox = Boolean(chk.checked);
        saveExtrasState();
        renderViewer();
      };
    });

    pane.querySelectorAll('.btn-sandbox-reset').forEach(btn => {
      btn.onclick = () => {
        const wbKey = btn.dataset.wbkey;
        delete extrasState.sandbox[wbKey];
        saveExtrasState();
        renderViewer();
        showToast('Reset What-If sandbox inputs');
      };
    });

    pane.querySelectorAll('.sandbox-cell-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const wbKey = inp.dataset.wbkey;
        const sh = inp.dataset.sheet;
        const coord = inp.dataset.coord;
        const fullKey = `${sh}!${coord}`;
        if (!extrasState.sandbox[wbKey]) extrasState.sandbox[wbKey] = {};
        extrasState.sandbox[wbKey][fullKey] = inp.value;
        inp.classList.add('is-dirty');
        saveExtrasState();
        const tbl = inp.closest('table.detail-table');
        const wbObj = workbookMap[wbKey];
        updateSandboxTableInPlace(tbl, wbObj, wbKey);
      });
    });

    // Acronym hover/click delegation
    const contentEl = document.getElementById('doc-content-body');
    if (contentEl && extrasState.acronymHighlight) {
      highlightAcronyms(contentEl);
      contentEl.addEventListener('mouseover', e => {
        const term = e.target.closest('.abbr-term');
        if (term) showAbbrPopover(term, term.dataset.abbr);
      });
      contentEl.addEventListener('click', e => {
        const term = e.target.closest('.abbr-term');
        if (term) {
          e.stopPropagation();
          showAbbrPopover(term, term.dataset.abbr);
        }
      });
    }
  }

  function renderViewer() {
    const host = document.getElementById('p1-viewer');
    if (!host) return;
    const workbookMap = {};

    if (activeDocId.endsWith('-README')) {
      const mid = activeDocId.replace('-README', '');
      const m = (DATA.modules || []).find(x => x.id === mid);
      if (!m) return;
      host.innerHTML = `
        <div class="doc-header-card">
          <div class="mono" style="font-size:12px;color:#0b57d0;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span>${escapeHtml(m.id)} FLASHCARD FOLDER GUIDE</span>
            <span class="doc-cat-pill" data-cat="README">README</span>
          </div>
          <h2 class="doc-title-h2">00_README_${escapeHtml(m.id)}.md — ${escapeHtml(m.title)}</h2>
          <p style="margin:4px 0;font-size:13px;color:#44474f;">${escapeHtml(m.desc)}</p>
          <div class="doc-action-bar">
            <div class="doc-action-group">
              <a href="files/${m.id}/00_README_${m.id}.md" download class="btn-ui btn-ui-primary">Download 00_README_${m.id}.md</a>
              <button type="button" class="btn-ui" id="btn-copy-win-folder">Copy Local Folder Path</button>
            </div>
          </div>
        </div>
        ${renderKeyFactsHtml(m)}
        <div id="doc-content-body"><pre class="readme-pre mono">${escapeHtml(m.readme || '')}</pre></div>
        ${renderStepperHtml()}
        ${renderLearningSuiteHtml(m.id, activeDocId)}
      `;
      const cf = document.getElementById('btn-copy-win-folder');
      if (cf) cf.onclick = () => copyPath(m.folder, `${m.id} Folder`);
      attachLearningListeners(m.id, activeDocId, workbookMap);
      return;
    }

    let targetMod = null;
    let targetDoc = null;
    for (const m of DATA.modules || []) {
      for (const d of m.docs || []) {
        if (d.docId === activeDocId) {
          targetMod = m;
          targetDoc = d;
          break;
        }
      }
      if (targetDoc) break;
    }
    if (!targetDoc) return;

    const k = `${targetMod.id}::${targetDoc.idx0}`;
    const isChecked = Boolean(appState.docChecks[k]);
    let bodyHtml = '';

    if (targetDoc.renderType === 'docx' && targetDoc.docx) {
      bodyHtml += renderDocxBlocks(targetDoc.docx.blocks);
      if (targetDoc.companionXlsx) {
        const compKey = getWorkbookSandboxKey(targetDoc.docId, targetDoc.companionXlsx.fileName);
        workbookMap[compKey] = targetDoc.companionXlsx;
        bodyHtml += `
          <div class="companion-divider">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px;">
              <h3 style="margin:0;color:#1b365d;font-size:17px;">Companion Workbook: ${escapeHtml(targetDoc.companionXlsx.fileName)}</h3>
              <a href="${escapeHtml(targetDoc.companionDownloadUrl)}" download class="btn-ui btn-ui-tonal">Download Companion Excel (.xlsx)</a>
            </div>
            ${renderWorkbook(targetDoc.companionXlsx, '', targetDoc.companionXlsx.fileName, compKey, true)}
          </div>
        `;
      }
    } else if (targetDoc.renderType === 'xlsx_master') {
      const mwb = (DATA.masterWorkbooks || {})[targetDoc.masterKey];
      const wbKey = getWorkbookSandboxKey(targetDoc.docId, targetDoc.masterKey);
      workbookMap[wbKey] = mwb;
      bodyHtml += renderWorkbook(mwb, targetDoc.focalSheet, targetDoc.fileName, wbKey, true);
    } else if (targetDoc.renderType === 'xer' && targetDoc.xer) {
      const wbKey = getWorkbookSandboxKey(targetDoc.docId, targetDoc.fileName);
      workbookMap[wbKey] = targetDoc.xer;
      bodyHtml += renderWorkbook(targetDoc.xer, targetDoc.focalSheet || '', targetDoc.fileName, wbKey, false);
    } else if (targetDoc.xlsx) {
      const wbKey = getWorkbookSandboxKey(targetDoc.docId, targetDoc.fileName);
      workbookMap[wbKey] = targetDoc.xlsx;
      bodyHtml += renderWorkbook(targetDoc.xlsx, '', targetDoc.fileName, wbKey, true);
    }

    host.innerHTML = `
      <div class="doc-header-card">
        <div class="doc-header-top">
          <div>
            <div class="mono" style="font-size:12px;color:#0b57d0;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>${escapeHtml(targetMod.id)} | ${escapeHtml(targetDoc.docId)}</span>
              <span class="doc-cat-pill" data-cat="${escapeHtml(targetDoc.cat.toUpperCase())}">${escapeHtml(targetDoc.cat.toUpperCase())} (${escapeHtml(targetDoc.ext)})</span>
            </div>
            <h2 class="doc-title-h2">${escapeHtml(targetDoc.title)}</h2>
            <div class="mono" style="font-size:11.5px;color:#44474f;">File: ${escapeHtml(targetDoc.fileName)} | Ref: ${escapeHtml(targetDoc.ref)}</div>
          </div>
          <label class="check-toggle-pill ${isChecked ? 'checked' : ''}">
            <input type="checkbox" id="viewer-doc-chk" ${isChecked ? 'checked' : ''} />
            <span>${isChecked ? 'Completed / Learned' : 'Mark Completed'}</span>
          </label>
        </div>
        <div class="doc-why-box"><strong>Why This Matters:</strong> ${escapeHtml(targetDoc.why)}</div>
        <div class="doc-action-bar">
          <div class="doc-action-group">
            <a href="${escapeHtml(targetDoc.downloadUrl)}" download class="btn-ui btn-ui-primary">Download ${escapeHtml(targetDoc.ext)} File</a>
            <button type="button" class="btn-ui btn-ui-tonal" id="btn-copy-doc-path">Copy Windows Local Path</button>
            <button type="button" class="btn-ui" onclick="window.print()">Print / Save PDF</button>
          </div>
        </div>
      </div>
      ${renderKeyFactsHtml(targetMod)}
      <div id="doc-content-body">${bodyHtml}</div>
      ${renderStepperHtml()}
      ${renderLearningSuiteHtml(targetMod.id, targetDoc.docId)}
    `;

    const chk = document.getElementById('viewer-doc-chk');
    if (chk) chk.onchange = () => toggleDocCheck(targetMod, targetDoc, chk.checked);

    const cpBtn = document.getElementById('btn-copy-doc-path');
    if (cpBtn) cpBtn.onclick = () => copyPath(targetDoc.localPath, targetDoc.fileName);

    host.querySelectorAll('.sheet-tab-btn').forEach(btn => {
      btn.onclick = () => {
        activeSheetName = btn.dataset.sheet;
        renderViewer();
      };
    });

    host.querySelectorAll('.toggle-formulas-chk').forEach(box => {
      box.onchange = () => {
        showFormulas = Boolean(box.checked);
        renderViewer();
      };
    });

    attachLearningListeners(targetMod.id, targetDoc.docId, workbookMap);
  }

  async function copyPath(relPath, label) {
    const full = `${LOCAL_REPO_ROOT}${relPath}`;
    try {
      await navigator.clipboard.writeText(full);
      showToast(`Copied path: ${label}`);
    } catch {
      showToast(full);
    }
  }

  async function initSupabase() {
    const pill = document.getElementById('p1-sync-pill');
    if (!window.DC36_Supabase || !pill) return;
    const chk = await window.DC36_Supabase.checkConnection();
    if (chk.state === 'connected') {
      cloudReady = true;
      pill.textContent = 'Supabase Connected';
      pill.classList.add('is-connected');
      const pulled = await window.DC36_Supabase.pullAll(getProfileId());
      if (pulled && pulled.ok && Array.isArray(pulled.docChecks) && pulled.docChecks.length) {
        pulled.docChecks.forEach(r => {
          if (r.doc_key) {
            if (r.checked) appState.docChecks[r.doc_key] = true;
            else delete appState.docChecks[r.doc_key];
          }
        });
        saveState(appState);
        renderSidebar();
        renderViewer();
      }
    } else {
      pill.textContent = 'Local Cache Mode';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    resolveInitialTarget();
    applySidebarVisibility();

    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    if (toggleBtn) toggleBtn.onclick = () => setSidebarHidden(!sidebarHidden);

    const floatBtn = document.getElementById('btn-floating-sidebar');
    if (floatBtn) floatBtn.onclick = () => setSidebarHidden(false);

    document.addEventListener('click', e => {
      const pop = document.getElementById('abbr-popover');
      if (pop && !pop.hidden && !e.target.closest('.abbr-term,.abbr-popover')) {
        hideAbbrPopover();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        hideAbbrPopover();
        return;
      }
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        stepDoc(-1);
        return;
      }
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        stepDoc(1);
        return;
      }
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
      if (e.key === ']' || e.key === '\\') {
        e.preventDefault();
        setSidebarHidden(!sidebarHidden);
      }
    });

    const sBox = document.getElementById('p1-search');
    if (sBox) {
      sBox.addEventListener('input', e => {
        searchQuery = e.target.value;
        if (searchQuery.trim() && sidebarHidden) setSidebarHidden(false);
        renderSidebar();
      });
    }

    renderChips();
    updateStats();
    renderSidebar();
    renderViewer();
    initSupabase();
  });
})();
