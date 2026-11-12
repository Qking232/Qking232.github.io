// Interactive Phase 1 Full-Detail Live Reader & Bidirectional Supabase Sync
(function () {
  'use strict';

  const STORAGE_KEY = 'dc36_eu_ireland_tracker_v1';
  const PROFILE_STORAGE_KEY = 'dc36_eu_profile_id_v1';
  const SIDEBAR_STORAGE_KEY = 'dc45_phase1_sidebar_hidden';
  const LOCAL_REPO_ROOT = 'G:\\My Drive\\7. AI\\DataCenter_EU_Ireland\\';
  const DATA = window.PHASE1_PORTAL_DATA || { modules: [], masterWorkbooks: {} };

  let activeDocId = 'PM-01-D1';
  let activeSheetName = '';
  let showFormulas = false;
  let catFilter = 'ALL';
  let searchQuery = '';
  let cloudReady = false;
  let sidebarHidden = localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  const expandedModules = {};

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
    if (floatBtn) {
      floatBtn.hidden = !sidebarHidden;
    }
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

  function getActiveModuleId() {
    const m = /^PM-\d+/.exec(activeDocId);
    return m ? m[0] : 'PM-01';
  }

  function initExpandedModules() {
    const activeMid = getActiveModuleId();
    (DATA.modules || []).forEach(m => {
      if (typeof expandedModules[m.id] !== 'boolean') {
        expandedModules[m.id] = (m.id === activeMid);
      }
    });
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
    const wb = d.renderType === 'xlsx_master' ? DATA.masterWorkbooks[d.masterKey] : d.xlsx;
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

  function resolveInitialTarget() {
    const h = (window.location.hash || '').replace(/^#/, '').trim();
    if (!h) return;
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
    const opts = ['ALL', 'Standard', 'Deliverable', 'Template', 'Audit'];
    host.innerHTML = opts.map(k => {
      const tagAttr = k === 'ALL' ? 'ALL' : k.toUpperCase();
      return `<button type="button" class="chip ${catFilter === k ? 'active' : ''}" data-cat-val="${k}" data-cat="${tagAttr}">${k === 'ALL' ? 'All Categories (24)' : k}</button>`;
    }).join('');
    host.querySelectorAll('.chip').forEach(btn => {
      btn.onclick = () => {
        catFilter = btn.dataset.catVal;
        if (sidebarHidden) setSidebarHidden(false);
        renderChips();
        renderSidebar();
      };
    });
  }

  function renderSidebar() {
    const host = document.getElementById('p1-sidebar');
    if (!host) return;
    initExpandedModules();
    const q = searchQuery.trim().toLowerCase();
    const filtering = Boolean(q || catFilter !== 'ALL');
    const mods = DATA.modules || [];
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
        <span class="sidebar-controls-label">Phase 1 Modules (${mods.length})</span>
        <div class="sidebar-controls-actions">
          <button type="button" id="btn-toggle-all" class="sidebar-all-btn">${allExpanded ? 'Collapse All' : 'Expand All'}</button>
          <button type="button" id="btn-sidebar-hide" class="sidebar-all-btn" title="Hide sidebar (shortcut: ])">Hide</button>
        </div>
      </div>
    `;

    host.innerHTML = controlsHtml + (html || '<div style="padding:12px;font-size:13px;">No Phase 1 documents match current search or filter.</div>');

    const hideSidebarBtn = document.getElementById('btn-sidebar-hide');
    if (hideSidebarBtn) {
      hideSidebarBtn.onclick = () => setSidebarHidden(true);
    }

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
      btn.onclick = () => {
        activeDocId = btn.dataset.doc;
        activeSheetName = '';
        expandedModules[getActiveModuleId()] = true;
        window.history.replaceState(null, '', `#${activeDocId}`);
        renderSidebar();
        renderViewer();
      };
    });
  }

  function renderDocxBlocks(blocks) {
    return (blocks || []).map(b => {
      if (b.type === 'banner') {
        return `<div class="docx-banner">${escapeHtml(b.text)}</div>`;
      }
      if (b.type === 'h1') {
        return `<h3 class="docx-h1">${escapeHtml(b.text)}</h3>`;
      }
      if (b.type === 'bullet') {
        return `<li class="docx-bullet">${escapeHtml(b.text)}</li>`;
      }
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

  function renderWorkbook(wbObj, preferredSheet, labelPrefix) {
    const sheets = (wbObj && wbObj.sheets) || [];
    if (!sheets.length) return '<p>No worksheet data available.</p>';
    const currentName = (sheets.find(s => s.name === activeSheetName) ? activeSheetName : (sheets.find(s => s.name === preferredSheet) ? preferredSheet : sheets[0].name));
    const current = sheets.find(s => s.name === currentName) || sheets[0];

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

    const rowsHtml = (current.rows || []).map(row => {
      const tds = row.map(cell => {
        const cls = CELL_CLASS_BY_KIND[cell.kind] || 'cell-plain';
        const fBadge = showFormulas && cell.f ? `<span class="formula-hint">${escapeHtml(cell.f)}</span>` : '';
        const spanAttrs = `${cell.rspan > 1 ? ` rowspan="${cell.rspan}"` : ''}${cell.cspan > 1 ? ` colspan="${cell.cspan}"` : ''}`;
        return `<td class="${cls}"${spanAttrs} title="${cell.f ? escapeHtml(cell.f) : ''}">${escapeHtml(cell.v)}${fBadge}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    }).join('');

    return `
      <div class="sheet-tabs-bar">
        <div class="chip-row">${tabsHtml}</div>
        <label style="font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
          <input type="checkbox" class="toggle-formulas-chk" ${showFormulas ? 'checked' : ''} />
          <span>Show Excel Formulas (${current.formulaCount})</span>
        </label>
      </div>
      <div class="mono" style="font-size:11.5px;color:#44474f;margin-bottom:6px;">${escapeHtml(labelPrefix || wbObj.fileName)} | Active Sheet: ${escapeHtml(current.name)} | Blue cells = editable [Input] fields</div>
      <div class="table-scroll"><table class="detail-table">${rowsHtml}</table></div>
    `;
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

  function renderViewer() {
    const host = document.getElementById('p1-viewer');
    if (!host) return;

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
            <a href="files/${m.id}/00_README_${m.id}.md" download class="btn-ui btn-ui-primary">Download 00_README_${m.id}.md</a>
            <button type="button" class="btn-ui" id="btn-copy-win-folder">Copy Local Folder Path</button>
          </div>
        </div>
        <pre class="readme-pre mono">${escapeHtml(m.readme || '')}</pre>
      `;
      const cf = document.getElementById('btn-copy-win-folder');
      if (cf) cf.onclick = () => copyPath(m.folder, `${m.id} Folder`);
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
        bodyHtml += `
          <div class="companion-divider">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px;">
              <h3 style="margin:0;color:#1b365d;font-size:17px;">Companion Workbook: ${escapeHtml(targetDoc.companionXlsx.fileName)}</h3>
              <a href="${escapeHtml(targetDoc.companionDownloadUrl)}" download class="btn-ui btn-ui-tonal">Download Companion Excel (.xlsx)</a>
            </div>
            ${renderWorkbook(targetDoc.companionXlsx, '', targetDoc.companionXlsx.fileName)}
          </div>
        `;
      }
    } else if (targetDoc.renderType === 'xlsx_master') {
      const mwb = DATA.masterWorkbooks[targetDoc.masterKey];
      bodyHtml += renderWorkbook(mwb, targetDoc.focalSheet, targetDoc.fileName);
    } else if (targetDoc.xlsx) {
      bodyHtml += renderWorkbook(targetDoc.xlsx, '', targetDoc.fileName);
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
          <a href="${escapeHtml(targetDoc.downloadUrl)}" download class="btn-ui btn-ui-primary">Download ${escapeHtml(targetDoc.ext)} File</a>
          <button type="button" class="btn-ui btn-ui-tonal" id="btn-copy-doc-path">Copy Windows Local Path</button>
          <button type="button" class="btn-ui" onclick="window.print()">Print / Save PDF</button>
        </div>
      </div>
      <div id="doc-content-body">${bodyHtml}</div>
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
    if (toggleBtn) {
      toggleBtn.onclick = () => setSidebarHidden(!sidebarHidden);
    }

    const floatBtn = document.getElementById('btn-floating-sidebar');
    if (floatBtn) {
      floatBtn.onclick = () => setSidebarHidden(false);
    }

    document.addEventListener('keydown', e => {
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
        if (searchQuery.trim() && sidebarHidden) {
          setSidebarHidden(false);
        }
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
