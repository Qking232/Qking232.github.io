// Ireland & EU Data Centre Development Learning & Portfolio Tracker (DC36-EU)
const STORAGE_KEY = 'dc36_eu_ireland_tracker_v1';

const PILLARS = [
  { id: 'P1', name: '1. Irish Planning & EPA IEL' },
  { id: 'P2', name: '2. EirGrid, ESBN & CRU Grid' },
  { id: 'P3', name: '3. BCAR & Statutory H&S (SI 291)' },
  { id: 'P4', name: '4. EN 50600, ISO 19650 & EU EED' },
  { id: 'P5', name: '5. P6 DCMA-14, RIBA & NEC4/FIDIC' },
  { id: 'P6', name: '6. CIBSE / ASHRAE Cx L1-L5' }
];

const CURRICULUM = [
  // P1: Irish Planning & EPA
  { id: 'EU-01', pillar: 'P1', title: 'Local Authority vs. An Bord Pleanala (SID) Planning Pathways', desc: 'Understand Strategic Infrastructure Development (SID) thresholds, Section 247 pre-planning consultations, and appeal timelines.', tags: ['Planning Act', 'SID', 'Sec 247'] },
  { id: 'EU-02', pillar: 'P1', title: 'Environmental Impact Assessment Report (EIAR) Scoping', desc: 'Lead multi-disciplinary noise, ecology, biodiversity, air dispersion, and traffic studies supporting planning submissions.', tags: ['EIA Directive', 'EIAR', 'Scoping'] },
  { id: 'EU-03', pillar: 'P1', title: 'EPA Industrial Emissions Licence (IEL) Strategy', desc: 'Manage EPA thermal input thresholds for standby generation, stack heights, noise limits, and public objections.', tags: ['EPA IEL', '2010/75/EU'] },
  { id: 'EU-04', pillar: 'P1', title: 'Standby Emissions Abatement: SCR & HVO Biofuel Readiness', desc: 'Align backup genset specifications with NOx limits, selective catalytic reduction (SCR), and renewable HVO fuel tanks.', tags: ['HVO', 'SCR', 'Climate Act'] },
  { id: 'EU-05', pillar: 'P1', title: 'SuDS Stormwater Attenuation & Class-1 Interceptor Design', desc: 'Comply with Irish drainage flood-risk regulations, bunded fuel storage, and underground attenuation volumes.', tags: ['SuDS', 'Flood Risk', 'Drainage'] },
  { id: 'EU-06', pillar: 'P1', title: 'Planning Judicial Review & Condition Discharge Risk Mitigation', desc: 'Structure pre-commencement planning condition compliance logs to prevent costly Judicial Review delays.', tags: ['Compliance', 'Judicial Review'] },

  // P2: EirGrid, ESBN & CRU Grid Policy
  { id: 'EU-07', pillar: 'P2', title: 'EirGrid & ESB Networks Enduring Connection Policy (ECP)', desc: 'Navigate connection application stages, contestable vs. non-contestable substation works, and MIC offers.', tags: ['EirGrid', 'ESBN', 'ECP', 'MIC'] },
  { id: 'EU-08', pillar: 'P2', title: 'CRU Large Energy User (LEU) Direction & Constraints', desc: 'Structure grid applications in constrained zones (Greater Dublin) meeting Commission for Regulation of Utilities mandates.', tags: ['CRU', 'LEU Policy'] },
  { id: 'EU-09', pillar: 'P2', title: 'On-Site Dispatchable Generation & Grid-Support BESS', desc: 'Integrate proximate/on-site dispatchable BESS or flexible generation matching Maximum Import Capacity conditions.', tags: ['BESS', 'Dispatchable', 'Microgrid'] },
  { id: 'EU-10', pillar: 'P2', title: 'EU Demand Connection Code (2016/1388) RMS Modelling', desc: 'Coordinate dynamic RMS fault ride-through, harmonic distortion, and voltage stability studies with TSO engineers.', tags: ['EU 2016/1388', 'RMS Study'] },
  { id: 'EU-11', pillar: 'P2', title: 'Corporate Renewable PPAs & 24/7 Additionality', desc: 'Evaluate additionality clauses for new Irish wind/solar PPAs linked to data centre decarbonization.', tags: ['CPPA', 'REF', 'Additionality'] },
  { id: 'EU-12', pillar: 'P2', title: '110kV GIS SF6-Free Switchgear & Substation Handover', desc: 'Manage TSO protection coordination, dual-feed GIS rings, and Operational Notification energisation milestones.', tags: ['110kV GIS', 'SF6-Free'] },

  // P3: BCAR & Statutory H&S
  { id: 'EU-13', pillar: 'P3', title: 'BCAR Roles: Design Certifier vs. Assigned Certifier', desc: 'Understand statutory liabilities under Ireland Building Control Amendment Regulations and BCMS portal submissions.', tags: ['BCAR 2014', 'BCMS'] },
  { id: 'EU-14', pillar: 'P3', title: 'Fire Safety Certificate (FSC) & 7-Day Notice Risk', desc: 'Prepare Part B fire strategies (compartmentation, VESDA, water-mist) and evaluate commercial exposure of 7-Day Notices.', tags: ['Part B', 'FSC', '7-Day Notice'] },
  { id: 'EU-15', pillar: 'P3', title: 'Disability Access Certificate (DAC - Part M)', desc: 'Ensure NOC, office, welfare, mantrap, and external access routes pass Part M compliance prior to CCC.', tags: ['DAC', 'Part M'] },
  { id: 'EU-16', pillar: 'P3', title: 'S.I. No. 291/2013: Appointing PSDP & PSCS', desc: 'Fulfill legal client duties to appoint competent Project Supervisors for Design (PSDP) and Construction (PSCS).', tags: ['SI 291/2013', 'PSDP', 'PSCS'] },
  { id: 'EU-17', pillar: 'P3', title: 'HSA AF1 Notifications, Safe Pass & CSCS Audits', desc: 'Enforce HSA commencement notifications, crane/excavation CSCS tickets, and high-voltage site LOTO controls.', tags: ['HSA', 'AF1', 'LOTO'] },
  { id: 'EU-18', pillar: 'P3', title: 'Certificate of Compliance on Completion (CCC) & Safety File', desc: 'Consolidate ancillary certificates, progressive BCAR inspection logs, and PSDP statutory Safety File for opening.', tags: ['BCAR CCC', 'Safety File'] },

  // P4: EN 50600, ISO 19650 & EU EED
  { id: 'EU-19', pillar: 'P4', title: 'I.S. EN 50600 Series & ISO/IEC 22237 Classes', desc: 'Translate Uptime Tier III concepts into EN 50600 Availability Classes (1-4), Protection Classes, and Maturity Levels.', tags: ['EN 50600', 'ISO 22237'] },
  { id: 'EU-20', pillar: 'P4', title: 'EU Energy Efficiency Directive (EU) 2023/1791 Art. 12', desc: 'Implement mandatory EU transparency reporting obligations for data centres >= 500 kW IT power demand.', tags: ['EED 2023/1791', 'Art 12'] },
  { id: 'EU-21', pillar: 'P4', title: 'Delegated Regulation (EU) 2024/1364 Telemetry KPIs', desc: 'Instrument EPMS/BMS metering pipelines for automated PUE, WUE, ERF (waste heat), and REF calculations.', tags: ['2024/1364', 'PUE', 'WUE', 'ERF'] },
  { id: 'EU-22', pillar: 'P4', title: 'Waste Heat Recovery & District Heating Integration (ERF)', desc: 'Design heat-pump boost interfaces and municipal district heating export valve skids in chilled water plants.', tags: ['Heat Reuse', 'ERF', 'CHW'] },
  { id: 'EU-23', pillar: 'P4', title: 'EU F-Gas Regulation (EU) 2024/573 & Free Cooling', desc: 'Specify ultra-low GWP refrigerants (R1234ze/HFO) and adiabatic/closed-circuit free cooling for Atlantic climates.', tags: ['F-Gas', 'Free Cooling'] },
  { id: 'EU-24', pillar: 'P4', title: 'BS EN ISO 19650 BIM CDE & Asset Info Model (AIM)', desc: 'Govern Project Information Models (PIM) through EIR/BEP into handover Asset Information Models (AIM).', tags: ['ISO 19650', 'CDE', 'AIM'] },

  // P5: P6 Controls, RIBA & NEC4/FIDIC
  { id: 'EU-25', pillar: 'P5', title: 'RIBA Plan of Work Stages 0-7 Mapped to Data Centres', desc: 'Align concept, spatial coordination, technical design, manufacturing/construction, handover, and in-use gates.', tags: ['RIBA 0-7', 'Stage Gates'] },
  { id: 'EU-26', pillar: 'P5', title: 'Primavera P6 Level 4 WBS & Logic Network Architecture', desc: 'Structure clean FS logic across Permitting, ISO 19650, OFCI Procurement, Shell, MEP Halls 1-4, and Cx L1-L5.', tags: ['Primavera P6', 'Level 4'] },
  { id: 'EU-27', pillar: 'P5', title: 'DCMA-14 Schedule Health & Longest Path Diagnostics', desc: 'Audit schedules for open ends, lags/leads, hard constraints, negative float, and realistic critical density.', tags: ['DCMA-14', 'Critical Path'] },
  { id: 'EU-28', pillar: 'P5', title: 'NEC4 ECC (Option A/C) & FIDIC Yellow/Silver Contracting', desc: 'Compare Early Warnings, Compensation Events, target-cost pain/gainshare (NEC4), and turnkey risk (FIDIC).', tags: ['NEC4 ECC', 'FIDIC', 'EVM'] },
  { id: 'EU-29', pillar: 'P5', title: 'EUR Capex Modelling, DCF, NPV/IRR & Sensitivity Analysis', desc: 'Build EUR/MW Capex baselines, colocation yield curves, PUE sensitivity, and tranche drawdown controls.', tags: ['EUR DCF', 'Capex/MW'] },
  { id: 'EU-30', pillar: 'P5', title: 'Quantitative Risk Management (Monte Carlo / L x I)', desc: 'Quantify Planning JR, EirGrid delay, OEM lead-time, and load-bank IST cost/schedule contingencies.', tags: ['Risk Matrix', 'P50/P80'] },

  // P6: CIBSE / ASHRAE Cx L1-L5
  { id: 'EU-31', pillar: 'P6', title: 'Cx Levels 1 & 2: Witnessed OEM FAT & BCAR Site QA', desc: 'Execute European factory witness scripts (switchgear, UPS, chillers, BESS) and progressive BCAR red-line tags.', tags: ['FAT', 'L1-L2', 'QA'] },
  { id: 'EU-32', pillar: 'P6', title: 'Cx Level 3: Pre-Functional Static & BSRIA Piping Flush', desc: 'Enforce zero-punch Megger, relay secondary injection, BSRIA closed-loop flushing, and LOTO energisation readiness.', tags: ['L3 Static', 'BSRIA'] },
  { id: 'EU-33', pillar: 'P6', title: 'Cx Level 4: Dynamic Load, SCR Abatement & BESS Sync', desc: 'Test 22kV first energisation, genset black-start step loads, SCR emissions compliance, and BMS sequences.', tags: ['L4 Dynamic', 'CIBSE Code M'] },
  { id: 'EU-34', pillar: 'P6', title: 'Cx Level 5: 36 MW 48-Hr IST & Grid Blackout Simulations', desc: 'Orchestrate portable load bank heat-soak runs, <10s blackout ATS+BESS transitions, and TES ride-through.', tags: ['L5 IST', '36 MW', 'ASHRAE'] },
  { id: 'EU-35', pillar: 'P6', title: 'Dual EN 50600 Class 3 & Uptime TCCF Constructed Audit', desc: 'Script simultaneous feeder/chiller concurrent maintainability isolation proofs for on-site certifying auditors.', tags: ['TCCF', 'Class 3'] },
  { id: 'EU-36', pillar: 'P6', title: 'Operational Readiness: Black-Hat Drills & EOP/MOP/SOPs', desc: 'Verify 24/7 FM crew readiness, Black-Hat failure simulations, 2-year critical spares, and DLP retention transitions.', tags: ['OR&T', 'Black-Hat'] }
];

const PORTFOLIO_ITEMS = [
  { id: 'PORT-01', doc: 'DC36-EU Master Level 4 P6 Schedule', standard: 'DCMA-14 6/6, RIBA 0-7, EN 50600', artifact: 'DataCenter_36MW_EU_Ireland.xer (141 Tasks / 48 Crit)', status: 'Complete' },
  { id: 'PORT-02', doc: 'Project Charter (Ireland / EU Standard)', standard: 'BCAR, PSDP/PSCS, EUR Stage-Gates', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx (6 Tabs)', status: 'Complete' },
  { id: 'PORT-03', doc: 'Project Implementation Plan (PIP)', standard: '141-Task Gantt, Ireland Statutory, L1-L5', artifact: 'DataCenter_36MW_EU_PIP.xlsx (6 Tabs)', status: 'Complete' },
  { id: 'PORT-04', doc: 'Feasibility, EN 50600 BoD & Controls', standard: 'EUR 10-Yr DCF, EED KPIs, EVM, Risks', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx (5 Tabs)', status: 'Complete' },
  { id: 'PORT-05', doc: 'ISO 19650 CDE Folder & Document Register', standard: 'BS EN ISO 19650, Suitability S0-A7', artifact: 'Master_Document_Register_DC36EU.xlsx (Pending Approval)', status: 'Planned' },
  { id: 'PORT-06', doc: 'EirGrid ECP / EPA IEL / BCAR FSC Pack', standard: 'Planning Act, EPA Act, Part B FSC', artifact: 'Stage 2 Statutory Permitting Dossier', status: 'Planned' },
  { id: 'PORT-07', doc: 'CIBSE Code M / ASHRAE L1-L5 Master Cx Plan', standard: 'L3-L5 Scripts & 36MW IST Playbook', artifact: 'Stage 6 Commissioning & OR&T Pack', status: 'Planned' }
];

const INTERVIEW_QA = [
  {
    id: 'IQ-01',
    tag: 'Grid & CRU',
    q: 'How does Ireland CRU Large Energy User policy impact a 36 MW Data Centre schedule and Capex?',
    a: 'Under EirGrid/CRU rules in constrained regions like Dublin, connecting a 36 MW Maximum Import Capacity (MIC) load typically mandates on-site or proximate dispatchable generation/BESS capacity plus verifiable additionality from new renewable PPAs. In our DC36-EU schedule, on-site BESS (A3045/A5250) and RMS dynamic grid-code studies (A1070) sit upfront in Stage 1/2 to prevent late energisation holds.'
  },
  {
    id: 'IQ-02',
    tag: 'BCAR',
    q: 'Explain the roles of Design Certifier, Assigned Certifier, and the risk of a 7-Day Notice under Irish BCAR.',
    a: 'BCAR (Building Control Amendment Regulations) splits statutory accountability: the Design Certifier certifies Building Regulations compliance at design stage, while the Assigned Certifier inspects works progressively and lodges the Certificate of Compliance on Completion (CCC) on BCMS before occupancy. A 7-Day Notice allows work to start prior to Fire Safety Certificate (FSC) grant, but exposes the developer to full abortive rework cost if the Fire Officer refuses or conditions the FSC later.'
  },
  {
    id: 'IQ-03',
    tag: 'H&S SI 291/2013',
    q: 'What are the client legal obligations under Construction Regulations 2013 (PSDP & PSCS)?',
    a: 'Whenever more than one contractor is involved, the client must appoint a competent Project Supervisor for the Design Process (PSDP) before design starts and a Project Supervisor for the Construction Stage (PSCS) before site works begin, notify the HSA via Form AF1 (>30 workdays or 500 person-days), verify Safe Pass/CSCS cards, and obtain the statutory Safety File at handover.'
  },
  {
    id: 'IQ-04',
    tag: 'EPA IEL & EU EED',
    q: 'How do EPA Industrial Emissions Licensing and EU EED (2023/1791) shape cooling and standby power design?',
    a: 'Large diesel backup farms trigger EPA Industrial Emissions Licensing requiring strict NOx/SOx and acoustic limits, driving Stage V / SCR exhaust abatement and HVO drop-in biofuel storage. Simultaneously, EU EED (2023/1791) Art. 12 and Delegated Reg. (EU) 2024/1364 mandate automated Union Database reporting of PUE, WUE, REF, and Energy Reuse Factor (ERF), making low-GWP free cooling and District Heating heat-recovery valve skids baseline scope.'
  },
  {
    id: 'IQ-05',
    tag: 'Project Controls',
    q: 'How do you defend a Primavera P6 schedule in a Western EPCm review?',
    a: 'Prove DCMA-14 6/6 compliance programmatically: 100% closed logic loops (only NTP start and COD finish open), zero lags/leads replacing explicit tasks, zero hard constraints locking false float, zero negative float, and a realistic 30-45% critical path density validated against statutory long-poles (Planning, EPA IEL, EirGrid, 110kV GIS, 36 MW 48h IST, and BCAR CCC).'
  },
  {
    id: 'IQ-06',
    tag: 'Standards',
    q: 'What is the difference between Uptime Institute Tier III and EN 50600 Availability Class 3?',
    a: 'Uptime Tier III focuses on topology and operational sustainability (concurrent maintainability across N+1/2N paths certified via TCDD/TCCF audits). I.S. EN 50600 is the broader European standard series covering Availability Classes (1-4), physical security Protection Classes (EN 50600-2-5), environmental control, and standardized KPI definitions (PUE/WUE/ERF/REF in EN 50600-4) increasingly embedded in EU financing and Irish planning conditions.'
  }
];

// Default persisted state
function defaultState() {
  const modules = {};
  CURRICULUM.forEach(m => {
    modules[m.id] = { status: 'todo', hours: 0, confidence: 3, notes: '' };
  });
  const portfolio = {};
  PORTFOLIO_ITEMS.forEach(p => {
    portfolio[p.id] = { status: p.status, linkNote: '' };
  });
  const interviews = {};
  INTERVIEW_QA.forEach(q => {
    interviews[q.id] = { ready: false };
  });
  return { modules, portfolio, interviews };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const def = defaultState();
    return {
      modules: { ...def.modules, ...(parsed.modules || {}) },
      portfolio: { ...def.portfolio, ...(parsed.portfolio || {}) },
      interviews: { ...def.interviews, ...(parsed.interviews || {}) }
    };
  } catch {
    return defaultState();
  }
}

let state = loadState();
let activePillar = 'ALL';
let activeStatus = 'ALL';
let searchTerm = '';

function saveState(msg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateMetrics();
  if (msg) showToast(msg);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function updateMetrics() {
  const mods = Object.values(state.modules);
  const mastered = mods.filter(m => m.status === 'mastered').length;
  const inProg = mods.filter(m => m.status === 'progress').length;
  const totalHrs = mods.reduce((sum, m) => sum + (Number(m.hours) || 0), 0);
  const confSum = mods.reduce((sum, m) => sum + (Number(m.confidence) || 0), 0);
  const avgConf = (confSum / CURRICULUM.length).toFixed(1);
  // Weighted readiness: mastered = 100%, in progress = 45%
  const readiness = Math.round(((mastered + inProg * 0.45) / CURRICULUM.length) * 100);

  document.getElementById('kpi-readiness').textContent = `${readiness}%`;
  document.getElementById('kpi-completed').textContent = `${mastered} / ${CURRICULUM.length}`;
  document.getElementById('kpi-completed-sub').textContent = `${inProg} currently in progress`;
  document.getElementById('kpi-hours').textContent = `${totalHrs.toFixed(1)}h`;
  document.getElementById('kpi-confidence').textContent = `${avgConf} / 5.0`;
  document.getElementById('wave-fill').style.width = `${readiness}%`;
  document.getElementById('wave-label').textContent = `${readiness}% Overall EU / Ireland Readiness`;

  renderAnalytics();
}

function renderFilters() {
  const pRow = document.getElementById('pillar-chips');
  const pHtml = [`<button class="chip ${activePillar === 'ALL' ? 'selected' : ''}" data-pillar="ALL">All Pillars (36)</button>`]
    .concat(PILLARS.map(p => `<button class="chip ${activePillar === p.id ? 'selected' : ''}" data-pillar="${p.id}">${p.name}</button>`))
    .join('');
  pRow.innerHTML = pHtml;
  pRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      activePillar = btn.dataset.pillar;
      renderFilters();
      renderModules();
    };
  });

  const sRow = document.getElementById('status-chips');
  const sOpts = [['ALL', 'All Status'], ['todo', 'To Study'], ['progress', 'In Progress'], ['mastered', 'Mastered']];
  sRow.innerHTML = sOpts.map(([k, l]) => `<button class="chip ${activeStatus === k ? 'selected' : ''}" data-status="${k}">${l}</button>`).join('');
  sRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      activeStatus = btn.dataset.status;
      renderFilters();
      renderModules();
    };
  });
}

function renderModules() {
  const grid = document.getElementById('modules-grid');
  const q = searchTerm.trim().toLowerCase();
  const filtered = CURRICULUM.filter(m => {
    if (activePillar !== 'ALL' && m.pillar !== activePillar) return false;
    const st = state.modules[m.id]?.status || 'todo';
    if (activeStatus !== 'ALL' && st !== activeStatus) return false;
    if (q) {
      const hay = `${m.id} ${m.title} ${m.desc} ${m.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="panel-card"><strong>No matching modules.</strong> Clear filters or search term to inspect all 36 modules.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(m => {
    const st = state.modules[m.id] || { status: 'todo', hours: 0, confidence: 3, notes: '' };
    const cardCls = st.status === 'mastered' ? 'is-mastered' : (st.status === 'progress' ? 'is-progress' : '');
    const selCls = st.status === 'mastered' ? 'status-mastered' : (st.status === 'progress' ? 'status-progress' : '');
    const pName = PILLARS.find(p => p.id === m.pillar)?.name.split('.')[0] || m.pillar;
    const confBtns = [1, 2, 3, 4, 5].map(v =>
      `<button type="button" class="conf-btn ${Number(st.confidence) === v ? 'active' : ''}" data-id="${m.id}" data-conf="${v}">${v}</button>`
    ).join('');

    return `
      <article class="module-card ${cardCls}">
        <div class="card-head">
          <span class="badge-code mono">${m.id}</span>
          <span class="badge-pillar">${pName}</span>
        </div>
        <h3 class="card-title">${m.title}</h3>
        <p class="card-desc">${m.desc}</p>
        <div class="std-tags">${m.tags.map(t => `<span class="std-tag mono">${t}</span>`).join('')}</div>
        <div class="controls-row">
          <select class="status-select ${selCls}" data-id="${m.id}" aria-label="Status for ${m.id}">
            <option value="todo" ${st.status === 'todo' ? 'selected' : ''}>To Study</option>
            <option value="progress" ${st.status === 'progress' ? 'selected' : ''}>In Progress</option>
            <option value="mastered" ${st.status === 'mastered' ? 'selected' : ''}>Mastered</option>
          </select>
          <input type="number" min="0" step="0.5" class="hours-input" data-id="${m.id}" value="${st.hours}" title="Logged study hours" placeholder="Hrs" />
        </div>
        <div class="confidence-row">
          <span>Confidence (1-5):</span>
          <div class="conf-pills">${confBtns}</div>
        </div>
        <textarea class="notes-area" data-id="${m.id}" placeholder="Study notes, statutory ref, interview anchor...">${st.notes || ''}</textarea>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.status-select').forEach(sel => {
    sel.onchange = () => {
      state.modules[sel.dataset.id].status = sel.value;
      saveState(`Updated ${sel.dataset.id}`);
      renderModules();
    };
  });
  grid.querySelectorAll('.hours-input').forEach(inp => {
    inp.onchange = () => {
      state.modules[inp.dataset.id].hours = Math.max(0, parseFloat(inp.value) || 0);
      saveState('Saved study hours');
    };
  });
  grid.querySelectorAll('.conf-btn').forEach(btn => {
    btn.onclick = () => {
      state.modules[btn.dataset.id].confidence = Number(btn.dataset.conf);
      saveState(`Confidence set to ${btn.dataset.conf}/5`);
      renderModules();
    };
  });
  grid.querySelectorAll('.notes-area').forEach(ta => {
    ta.onchange = () => {
      state.modules[ta.dataset.id].notes = ta.value;
      saveState('Notes saved');
    };
  });
}

function renderAnalytics() {
  const el = document.getElementById('pillar-bars');
  el.innerHTML = PILLARS.map(p => {
    const items = CURRICULUM.filter(m => m.pillar === p.id);
    const done = items.filter(m => state.modules[m.id]?.status === 'mastered').length;
    const prog = items.filter(m => state.modules[m.id]?.status === 'progress').length;
    const pct = Math.round(((done + prog * 0.45) / items.length) * 100);
    const hrs = items.reduce((s, m) => s + (Number(state.modules[m.id]?.hours) || 0), 0);
    return `
      <div class="pillar-bar-item">
        <div class="pillar-bar-head">
          <span>${p.name}</span>
          <span class="mono">${done}/${items.length} Mastered | ${hrs.toFixed(1)}h (${pct}%)</span>
        </div>
        <div class="pillar-bar-bg"><div class="pillar-bar-fg" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');

  const pDone = PORTFOLIO_ITEMS.filter(x => (state.portfolio[x.id]?.status || x.status) === 'Complete').length;
  const iReady = INTERVIEW_QA.filter(q => state.interviews[q.id]?.ready).length;
  document.getElementById('analytics-summary').innerHTML = `
    <p><strong>Portfolio Completeness:</strong> ${pDone} / ${PORTFOLIO_ITEMS.length} EU/Ireland Deliverables Completed</p>
    <p><strong>Interview Drill Readiness:</strong> ${iReady} / ${INTERVIEW_QA.length} Core Scenarios Rehearsed</p>
    <p><strong>Active P6 Benchmark:</strong> <span class="mono">DataCenter_36MW_EU_Ireland.xer</span> (141 tasks, DCMA-14 6/6, 835 workdays)</p>
    <p><strong>Key Target Standards:</strong> EN 50600 Class 3, EED (2023/1791), EPA IEL, EirGrid CRU BESS, BCAR CCC, S.I. No. 291/2013.</p>
  `;
}

function renderPortfolio() {
  const tbody = document.getElementById('portfolio-tbody');
  tbody.innerHTML = PORTFOLIO_ITEMS.map(item => {
    const cur = state.portfolio[item.id] || { status: item.status, linkNote: '' };
    const pillCls = cur.status === 'Complete' ? 'pill-done' : 'pill-planned';
    return `
      <tr>
        <td class="mono"><strong>${item.id}</strong></td>
        <td><strong>${item.doc}</strong></td>
        <td>${item.standard}</td>
        <td class="mono">${item.artifact}</td>
        <td>
          <select class="status-select port-status" data-id="${item.id}">
            <option value="Complete" ${cur.status === 'Complete' ? 'selected' : ''}>Complete</option>
            <option value="In Progress" ${cur.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Planned" ${cur.status === 'Planned' ? 'selected' : ''}>Planned</option>
          </select>
        </td>
        <td><span class="pill-status ${pillCls}">${cur.status}</span></td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.port-status').forEach(sel => {
    sel.onchange = () => {
      state.portfolio[sel.dataset.id] = { ...(state.portfolio[sel.dataset.id] || {}), status: sel.value };
      saveState(`Portfolio ${sel.dataset.id} updated`);
      renderPortfolio();
    };
  });
}

function renderInterviews() {
  const wrap = document.getElementById('interview-list');
  wrap.innerHTML = INTERVIEW_QA.map(item => {
    const isReady = !!state.interviews[item.id]?.ready;
    return `
      <details class="qa-card">
        <summary>
          <span><span class="badge-code mono">${item.tag}</span> ${item.q}</span>
          <button type="button" class="chip ${isReady ? 'selected' : ''} qa-ready-btn" data-id="${item.id}">
            ${isReady ? 'Rehearsed' : 'Mark Ready'}
          </button>
        </summary>
        <div class="qa-answer">${item.a}</div>
      </details>
    `;
  }).join('');

  wrap.querySelectorAll('.qa-ready-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id;
      state.interviews[id] = { ready: !state.interviews[id]?.ready };
      saveState('Interview status saved');
      renderInterviews();
    };
  });
}

// Init Navigation & Persistence Controls
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    };
  });

  document.getElementById('search-box').addEventListener('input', e => {
    searchTerm = e.target.value;
    renderModules();
  });

  document.getElementById('btn-export').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dc36_eu_learning_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Exported JSON progress backup');
  };

  document.getElementById('file-import').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        const def = defaultState();
        state = {
          modules: { ...def.modules, ...(imported.modules || {}) },
          portfolio: { ...def.portfolio, ...(imported.portfolio || {}) },
          interviews: { ...def.interviews, ...(imported.interviews || {}) }
        };
        saveState('Imported progress backup');
        renderModules();
        renderPortfolio();
        renderInterviews();
      } catch {
        showToast('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  document.getElementById('btn-reset').onclick = () => {
    if (!confirm('Reset all learning progress, hours, notes, and confidence scores?')) return;
    state = defaultState();
    saveState('Progress reset');
    renderModules();
    renderPortfolio();
    renderInterviews();
  };

  renderFilters();
  renderModules();
  renderPortfolio();
  renderInterviews();
  updateMetrics();
});
