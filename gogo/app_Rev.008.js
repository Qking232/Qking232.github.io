// Ireland & EU Data Centre Development Mastery Tracker (DC36-EU)
// Primary Track: End-to-End Project Management Lifecycle | Deferred Track: Legal & Permitting
const STORAGE_KEY = 'dc36_eu_ireland_tracker_v1';

const PILLARS = [
  // Active Track: End-to-End Project Management Lifecycle (6 Phases x 6 = 36 Modules)
  { id: 'PM1', track: 'pm', code: 'Phase 1', shortName: '1. Initiation & Charter', name: 'Phase 1: Initiation, Charter & Business Case (RIBA 0-1)' },
  { id: 'PM2', track: 'pm', code: 'Phase 2', shortName: '2. Planning & P6', name: 'Phase 2: Planning, WBS & Master Schedule (RIBA 2-3)' },
  { id: 'PM3', track: 'pm', code: 'Phase 3', shortName: '3. Procurement & Contracts', name: 'Phase 3: Procurement, Contracts & Supply Chain (RIBA 4)' },
  { id: 'PM4', track: 'pm', code: 'Phase 4', shortName: '4. Execution & Controls', name: 'Phase 4: Execution, Controls, Risk & Change (RIBA 5)' },
  { id: 'PM5', track: 'pm', code: 'Phase 5', shortName: '5. Commissioning L1-L5', name: 'Phase 5: Commissioning L1-L5 & Integrated Testing (RIBA 5-6)' },
  { id: 'PM6', track: 'pm', code: 'Phase 6', shortName: '6. Handover & Closeout', name: 'Phase 6: Handover, OR&T & Closeout (RIBA 6-7)' },

  // Deferred Track: Legal & Permitting (3 Pillars x 6 = 18 Modules)
  { id: 'L1', track: 'legal', code: 'Legal 1', shortName: 'L1. Planning & EPA', name: 'L1. Irish Planning & EPA IEL' },
  { id: 'L2', track: 'legal', code: 'Legal 2', shortName: 'L2. EirGrid & CRU', name: 'L2. EirGrid, ESBN & CRU Grid' },
  { id: 'L3', track: 'legal', code: 'Legal 3', shortName: 'L3. BCAR & SI 291', name: 'L3. BCAR & Statutory H&S (SI 291)' }
];

const SECTION_DOCS = {
  PM1: [
    { code: 'PM1-DOC-01', title: 'Project Charter, Sponsor Governance & Multi-Party RACI Matrix', std: 'PMI / RIBA Stage 0-1', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', kind: 'built' },
    { code: 'PM1-DOC-02', title: 'Site Selection Due Diligence & Power / Flood Feasibility Scoring Memo', std: 'EN 50600-2-1 / OPW', artifact: 'Pre-Feasibility Matrix', kind: 'ref' },
    { code: 'PM1-DOC-03', title: 'Basis of Design (BoD) — Availability Class 3 & Free-Cooling Envelope', std: 'I.S. EN 50600 / ISO 22237', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', kind: 'built' },
    { code: 'PM1-DOC-04', title: 'EUR Capex/MW Baseline, 10-Year DCF Financial Model & Sensitivity Pack', std: 'IRR / NPV Institutional', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', kind: 'built' },
    { code: 'PM1-DOC-05', title: 'Pre-NTP Final Investment Decision (FID) & Stage-Gate 1 Charter Pack', std: 'RIBA Stage 1 Gate', artifact: 'FID Stage-Gate Memo', kind: 'ref' }
  ],
  PM2: [
    { code: 'PM2-DOC-01', title: 'Project Implementation Plan (PIP) & WBS Cost-Account Dictionary', std: 'PMI / RIBA Stage 2-3', artifact: 'DataCenter_36MW_EU_PIP.xlsx', kind: 'built' },
    { code: 'PM2-DOC-02', title: 'Master Level 4 Primavera P6 Schedule (141 Tasks / 48 Critical)', std: 'DCMA-14 6/6 / CPM', artifact: 'DataCenter_36MW_EU_Ireland.xer', kind: 'built' },
    { code: 'PM2-DOC-03', title: 'DCMA-14 Schedule Health Audit & Longest Path Diagnostic Report', std: 'DCMA 14-Point', artifact: 'P6 QA Audit Checksheet', kind: 'ref' },
    { code: 'PM2-DOC-04', title: 'EU EED Telemetry Specification (PUE / WUE / ERF / REF Metering Plan)', std: 'EU EED 2023/1791 & 2024/1364', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', kind: 'built' },
    { code: 'PM2-DOC-05', title: 'BIM Exchange Info Requirements (EIR), BEP & Master Document Register', std: 'BS EN ISO 19650 CDE', artifact: 'Master_Document_Register_DC36EU.xlsx', kind: 'planned' }
  ],
  PM3: [
    { code: 'PM3-DOC-01', title: 'Contracting & Multi-Prime Work Packaging Strategy (EPCm vs. D&B)', std: 'RIBA Stage 4 / Procurement', artifact: 'DataCenter_36MW_EU_PIP.xlsx', kind: 'built' },
    { code: 'PM3-DOC-02', title: 'NEC4 ECC (Option A/C) Works Information, Z-Clauses & Early Warning Register', std: 'NEC4 ECC (UK / IE)', artifact: 'NEC4 Contract Pack', kind: 'ref' },
    { code: 'PM3-DOC-03', title: 'FIDIC Silver / Yellow Book Employer Requirements & EOT Protocol', std: 'FIDIC 2017 (EU)', artifact: 'FIDIC Commercial Pack', kind: 'ref' },
    { code: 'PM3-DOC-04', title: 'OFCI Long-Lead Equipment Schedule (110kV GIS, UPS, Chillers, BESS)', std: 'Supply Chain Reservation', artifact: 'DataCenter_36MW_EU_PIP.xlsx', kind: 'built' },
    { code: 'PM3-DOC-05', title: 'Technical Bid Evaluation (TBE), BAFO Leveling & Vendor Expediting Log', std: 'Incoterms 2020 / DDP', artifact: 'Procurement Tracker', kind: 'ref' }
  ],
  PM4: [
    { code: 'PM4-DOC-01', title: 'Monthly Earned Value Management (EVM) Report — CPI, SPI & EAC', std: 'PMI EVM / Cost Control', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', kind: 'built' },
    { code: 'PM4-DOC-02', title: 'Integrated Change Request Log & Change Control Board (CRB) Register', std: 'Baseline Governance', artifact: 'CRB Decision Log', kind: 'ref' },
    { code: 'PM4-DOC-03', title: 'Quantitative Risk Register (L x I & Monte Carlo P50 / P80 Drawdown)', std: 'ISO 31000 / QRA', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', kind: 'built' },
    { code: 'PM4-DOC-04', title: 'Construction Quality Plan, Inspection & Test Plans (ITPs) & NCR Log', std: 'ISO 9001 / QA-QC', artifact: 'Site QA/QC Dossier', kind: 'ref' },
    { code: 'PM4-DOC-05', title: 'MEP / CSA Interface Matrix, Clash Sign-Off & 6-Week Lookahead Plan', std: 'Last Planner / Pull Plan', artifact: 'Weekly Lookahead Pack', kind: 'ref' }
  ],
  PM5: [
    { code: 'PM5-DOC-01', title: 'Master Commissioning Management Plan (L1-L5 Governance & Matrix)', std: 'CIBSE Code M / ASHRAE 0', artifact: 'DataCenter_36MW_EU_PIP.xlsx', kind: 'built' },
    { code: 'PM5-DOC-02', title: 'Level 1-2 Witnessed OEM Factory Acceptance (FAT) & Red-Tag Checklists', std: 'IEC / EN Factory QA', artifact: 'OEM FAT Witness Dossier', kind: 'planned' },
    { code: 'PM5-DOC-03', title: 'Level 3 Static Testing, BSRIA CHW Flush Certificates & LOTO Permits', std: 'BSRIA BG 29 / HV LOTO', artifact: 'L3 Energisation Pack', kind: 'planned' },
    { code: 'PM5-DOC-04', title: 'Level 4 Dynamic Step-Load, SCR Abatement & BESS Sync Test Scripts', std: 'CIBSE Code M L4', artifact: 'Dynamic Cx Scripts', kind: 'planned' },
    { code: 'PM5-DOC-05', title: 'Level 5 36 MW 48-Hr IST Playbook & Dual EN 50600 / Uptime TCCF Audit', std: 'ASHRAE / EN 50600 Class 3', artifact: 'Stage 6 IST & OR&T Pack', kind: 'planned' }
  ],
  PM6: [
    { code: 'PM6-DOC-01', title: 'Practical Completion Certificate, A/B/C Snagging List & RFS Gate Sign-Off', std: 'RIBA Stage 6 Handover', artifact: 'Punch-List Burn-Down Log', kind: 'ref' },
    { code: 'PM6-DOC-02', title: 'Operational Readiness & Transition (OR&T): EOP / MOP / SOP & Black-Hat Drills', std: '24/7 Critical Ops', artifact: 'Stage 6 OR&T Runbook', kind: 'planned' },
    { code: 'PM6-DOC-03', title: 'Asset Information Model (AIM), COBie Register & O&M Spares Inventory', std: 'BS EN ISO 19650 Part 3', artifact: 'Handover AIM / O&M Pack', kind: 'planned' },
    { code: 'PM6-DOC-04', title: 'Commercial Final Account Reconciliation, Retention & DLP Defect Tracker', std: 'NEC4 / FIDIC Closeout', artifact: 'Final Account Settlement', kind: 'ref' },
    { code: 'PM6-DOC-05', title: 'Post-Occupancy Evaluation (Seasonal PUE/WUE) & Lessons Learned Report', std: 'RIBA Stage 7 In-Use', artifact: 'Project Closeout Report', kind: 'ref' }
  ],
  L1: [
    { code: 'L1-DOC-01', title: 'Section 247 Pre-Planning Minutes & An Bord Pleanala SID Determination', std: 'Planning & Dev. Act (IE)', artifact: 'Stage 2 Statutory Dossier', kind: 'planned' },
    { code: 'L1-DOC-02', title: 'Environmental Impact Assessment Report (EIAR) & AA Screening', std: 'EU EIA Directive 2014/52/EU', artifact: 'EIAR Volume 1-3', kind: 'ref' },
    { code: 'L1-DOC-03', title: 'EPA Industrial Emissions Licence (IEL) Application & Dispersion Model', std: 'EU IED 2010/75/EU', artifact: 'EPA IEL Submission', kind: 'planned' },
    { code: 'L1-DOC-04', title: 'Planning Conditions Compliance Matrix & Judicial Review Risk Log', std: 'Pre-Commencement Discharge', artifact: 'Condition Discharge Tracker', kind: 'ref' }
  ],
  L2: [
    { code: 'L2-DOC-01', title: 'EirGrid / ESB Networks Enduring Connection Policy (ECP) & MIC Offer', std: 'EirGrid Grid Code (IE)', artifact: 'Grid Connection Agreement', kind: 'planned' },
    { code: 'L2-DOC-02', title: 'CRU Large Energy User (LEU) Dispatchable Generation / BESS Compliance Memo', std: 'CRU LEU Policy', artifact: 'On-Site BESS Grid Study', kind: 'ref' },
    { code: 'L2-DOC-03', title: 'EU Demand Connection Code RMS Dynamic Stability & Harmonic Study', std: 'Reg. (EU) 2016/1388', artifact: 'RMS / Harmonics Report', kind: 'ref' },
    { code: 'L2-DOC-04', title: '110kV GIS Substation Design, Protection Schedule & Energisation Notice', std: 'TSO Handover Protocol', artifact: '110kV GIS Relay Pack', kind: 'ref' }
  ],
  L3: [
    { code: 'L3-DOC-01', title: 'BCAR Commencement Notice, Design Certifier & Assigned Certifier Forms', std: 'BCAR 2014 / BCMS Portal', artifact: 'BCMS Statutory Log', kind: 'planned' },
    { code: 'L3-DOC-02', title: 'Part B Fire Safety Certificate (FSC) & Part M Disability Access (DAC)', std: 'Irish Building Regs', artifact: 'FSC & DAC Applications', kind: 'planned' },
    { code: 'L3-DOC-03', title: 'Client PSDP & PSCS Appointments, Preliminary H&S Plan & HSA Form AF1', std: 'S.I. No. 291/2013 (HSA)', artifact: 'PSDP / PSCS H&S Pack', kind: 'ref' },
    { code: 'L3-DOC-04', title: 'Certificate of Compliance on Completion (CCC) & Handover Safety File', std: 'BCAR Completion / SI 291', artifact: 'CCC & Statutory Safety File', kind: 'ref' }
  ]
};

// One-time migration map from v1 EU-19..EU-36 IDs to End-to-End PM Lifecycle IDs
const LEGACY_ID_MAP = {
  'EU-19': 'PM-03',
  'EU-20': 'PM-11',
  'EU-21': 'PM-11',
  'EU-22': 'PM-11',
  'EU-23': 'PM-03',
  'EU-24': 'PM-12',
  'EU-25': 'PM-05',
  'EU-26': 'PM-08',
  'EU-27': 'PM-09',
  'EU-28': 'PM-14',
  'EU-29': 'PM-04',
  'EU-30': 'PM-21',
  'EU-31': 'PM-26',
  'EU-32': 'PM-27',
  'EU-33': 'PM-28',
  'EU-34': 'PM-29',
  'EU-35': 'PM-30',
  'EU-36': 'PM-32'
};

const CURRICULUM = [
  // PM1: Phase 1 - Initiation, Charter & Business Case (RIBA 0-1)
  {
    id: 'PM-01', pillar: 'PM1', track: 'pm',
    title: 'Project Charter, Governance Structure & RACI Matrix',
    desc: 'Establish Project Charter, Sponsor authority, Steering Committee cadence, success thresholds, and multi-party RACI governance.',
    tags: ['Charter', 'Governance', 'RACI'],
    docs: [
      { cat: 'Standard', title: 'PMI PMBOK Project Charter Guideline & RIBA Stage 0-1 Client Brief', ref: 'PMBOK / RIBA Stage 0-1', artifact: 'Charter Governance Standard', why: 'Understand sponsor authority, business objectives, and formal project authorization.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Executive Project Charter Document (Objectives, 36 MW Scope & PM Authority)', ref: 'Sheet 1. Charter Summary', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Benchmark real DC36-EU charter scope boundaries, KPIs, and stage-gate mandates.', kind: 'built' },
      { cat: 'Template', title: 'Multi-Party Governance Framework & RACI Responsibility Matrix', ref: 'Sheet 2. Governance & RACI', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Map Responsible, Accountable, Consulted, and Informed roles across Sponsor, EPCm, and CxA.', kind: 'built' },
      { cat: 'Audit', title: 'Steering Committee Terms of Reference, Quorum & Escalation Charter', ref: 'RIBA Stage 0 Governance', artifact: 'SteerCo ToR & Quorum Audit', why: 'Define executive voting thresholds, financial sign-off limits, and escalation paths.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-02', pillar: 'PM1', track: 'pm',
    title: 'Site Selection Due Diligence & Pre-Feasibility Scoring',
    desc: 'Evaluate land parcels across power proximity, fibre diversity, geotechnical conditions, flood zones, and buildability constraints.',
    tags: ['Feasibility', 'Due Diligence', 'Scoring'],
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-2-1 Building Construction & Site Environmental Risk Guideline', ref: 'EN 50600-2-1 Siting', artifact: 'Site Siting Standard Guide', why: 'Learn mandatory physical security setbacks, flood immunity, and external hazard rules.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Multi-Criteria Site Selection & Land Acquisition Due Diligence Report', ref: 'Power / Fibre / Zoning', artifact: 'Site Selection Feasibility Report', why: 'Synthesize grid substation distance, dual-path dark fibre, and zoning viability for FID.', kind: 'ref' },
      { cat: 'Template', title: 'Weighted Land Parcel Comparison Scorecard (Grid, Geotech, Flood, Cost)', ref: 'Weighted Decision Model', artifact: 'Site Scoring Matrix Workbook', why: 'Quantify site trade-offs objectively across capex penalties and schedule risk.', kind: 'ref' },
      { cat: 'Audit', title: 'Pre-Purchase Technical Due Diligence Checklist (Boreholes, Phase 1 ESA, OPW Flood)', ref: 'Eurocode 7 / OPW Flood Maps', artifact: 'Land DD Verification Checklist', why: 'Eliminate fatal subsurface, contamination, UXO, or fluvial flood blockers before closing.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-03', pillar: 'PM1', track: 'pm',
    title: 'Basis of Design (BoD) & I.S. EN 50600 Class 3 Translation',
    desc: 'Translate tenant SLAs and Uptime Tier III maintainability into EN 50600 Availability Classes, PUE targets, and free-cooling envelope.',
    tags: ['EN 50600', 'BoD', 'ISO 22237'],
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-1 / -2-2 / -2-3 & ISO/IEC 22237 Availability Class 3 Series', ref: 'EN 50600 / ISO 22237', artifact: 'Availability Class 3 Standard', why: 'Master European concurrent maintainability topology across power, cooling, and security.', kind: 'ref' },
      { cat: 'Deliverable', title: '36 MW Campus Basis of Design (N+1/2N Topology, Density, SLAs & Redundancy)', ref: 'Sheet 3. EN 50600 & EED', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Translate 36 MW IT load and kW/rack targets into distributable redundant MEP specs.', kind: 'built' },
      { cat: 'Template', title: 'Scope Boundaries, Client vs. Contractor Battery Limits & Exclusions Matrix', ref: 'Sheet 4. Scope Boundaries', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Prevent scope gaps between core shell, white-space fit-out, and utility tie-ins.', kind: 'built' },
      { cat: 'Audit', title: 'Atlantic Free-Cooling Psychrometric Study & Low-GWP Chiller (EU F-Gas) Review', ref: 'ASHRAE TC 9.9 / EU 2024/573', artifact: 'Mechanical Concept Design Audit', why: 'Validate annualized PUE <= 1.22 using Irish ambient cooling hours and compliant refrigerants.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-04', pillar: 'PM1', track: 'pm',
    title: 'EUR Capex Modelling, 10-Yr DCF, NPV/IRR & Sensitivity',
    desc: 'Build EUR/MW Capex baselines, colocation yield curves, PUE/energy sensitivity tables, and institutional investment metrics.',
    tags: ['EUR DCF', 'Capex/MW', 'NPV/IRR'],
    docs: [
      { cat: 'Standard', title: 'RICS New Rules of Measurement (NRM1) & Institutional Valuation Standard', ref: 'RICS NRM1 / Real Estate Std', artifact: 'RICS Capex Cost Standard', why: 'Structure institutional elemental cost planning benchmarked in EUR per MW of IT load.', kind: 'ref' },
      { cat: 'Deliverable', title: '36 MW Capex Cost Plan (Land, Grid, CSA, MEP, OFCI, Soft Costs & Contingency)', ref: 'Sheet 6. Stage-Gate Budget', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Break down total development capex across stage-gate funding tranches.', kind: 'built' },
      { cat: 'Template', title: '10-Year EUR Discounted Cashflow Model (IRR, NPV, Payback & EUR/kW Yield)', ref: 'Sheet 2. EUR 10-Yr DCF', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Model multi-year leasing ramp, WACC discounting, opex recovery, and terminal exit value.', kind: 'built' },
      { cat: 'Audit', title: 'Sensitivity & Downside Stress Test Matrix (Power Tariff, PUE & Capex +/-10%)', ref: 'IC Investment Stress Test', artifact: 'Financial Sensitivity Matrix', why: 'Quantify IRR resilience against construction inflation, grid delays, and energy spikes.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-05', pillar: 'PM1', track: 'pm',
    title: 'RIBA 0-7 Stage-Gate Framework & Pre-NTP FID Package',
    desc: 'Structure formal Stage-Gate entry/exit criteria leading to Final Investment Decision (FID) and Full Notice to Proceed (NTP).',
    tags: ['RIBA 0-7', 'Stage Gates', 'FID'],
    docs: [
      { cat: 'Standard', title: 'RIBA Plan of Work 2020 (Stages 0-7) Mission-Critical Data Centre Overlay', ref: 'RIBA Plan of Work 2020', artifact: 'RIBA 0-7 Framework Guide', why: 'Align design freezes, statutory consents, and site construction gates cleanly.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Final Investment Decision (FID) Board Paper & Pre-NTP Executive Dossier', ref: 'Sheet 1. Executive Summary', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Consolidate commercial returns, schedule baseline, and risk readiness for board sign-off.', kind: 'built' },
      { cat: 'Template', title: 'Limited Notice to Proceed (LNTP) vs. Full NTP Release Authorization Memo', ref: 'Pre-NTP Commercial Release', artifact: 'LNTP / FNTP Authorization Memo', why: 'Commit early enabling works or OEM slots before unconditional full contract execution.', kind: 'ref' },
      { cat: 'Audit', title: 'Stage-Gate 0 to 7 Mandatory Exit Criteria & Readiness Verification Checklist', ref: 'Gate Review Governance', artifact: 'Stage-Gate Exit Checklist', why: 'Verify design maturity, permit status, and funded contingency before unlocking next tranche.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-06', pillar: 'PM1', track: 'pm',
    title: 'Stakeholder Register, Engagement & Escalation Plan',
    desc: 'Map internal sponsors, hyperscale tenants, EPCm leads, local communities, and utility/certifier touchpoints across phases.',
    tags: ['Stakeholders', 'Comms Plan'],
    docs: [
      { cat: 'Standard', title: 'ISO 21502 Guidance on Project Management — Stakeholder Engagement', ref: 'ISO 21502 / PMI Stakeholder', artifact: 'Stakeholder Mgmt Standard', why: 'Apply structured identification, cadence tailoring, and alignment feedback loops.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Project Communications Management Plan & Weekly/Monthly Cadence Matrix', ref: 'Reporting Governance', artifact: 'Comms Management Plan', why: 'Establish predictable reporting rhythm across lenders, tenants, TSO, and site teams.', kind: 'ref' },
      { cat: 'Template', title: 'Stakeholder Register & Power/Interest Matrix (Investors, Tenants, TSO, Public)', ref: 'Sheet 3. Stakeholders', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Classify influence vs. interest for every internal executive and Irish statutory body.', kind: 'built' },
      { cat: 'Audit', title: 'Executive Issue Escalation Flowchart & Decision Turnaround SLA Log', ref: 'Decision Turnaround SLA', artifact: 'Escalation Protocol Log', why: 'Enforce time-boxed escalation paths so critical-path blockers never stall in committees.', kind: 'ref' }
    ]
  },

  // PM2: Phase 2 - Planning, WBS & Master Schedule (RIBA 2-3)
  {
    id: 'PM-07', pillar: 'PM2', track: 'pm',
    title: 'Work Breakdown Structure (WBS) & Dictionary Architecture',
    desc: 'Decompose 36 MW campus scope into controllable CSA, HV/MV Power, Mechanical, BMS/EPMS, and Cx deliverables mapped to cost accounts.',
    tags: ['WBS', 'Scope Baseline'],
    docs: [
      { cat: 'Standard', title: 'PMI Practice Standard for WBS & Uniclass 2015 Data Centre Coding', ref: 'PMI WBS / Uniclass 2015', artifact: 'WBS & Coding Standard', why: 'Structure 100% scope hierarchy rules and standardized asset classification codes.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Master WBS Dictionary (Scope Statements, Deliverables & Cost Accounts)', ref: 'Sheet 2. WBS Dictionary', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Link every physical campus element (CSA, HV, MEP, BMS, Cx) to a budget control account.', kind: 'built' },
      { cat: 'Template', title: 'WBS-to-OBS Responsibility Assignment Matrix (RAM) Across Package Teams', ref: 'PMBOK / ISO 21502 RAM', artifact: 'WBS-to-OBS RAM Workbook', why: 'Assign single-point package ownership between Owner, EPCm, and trade contractors.', kind: 'ref' },
      { cat: 'Audit', title: 'Multi-Level (L1-L4) Campus WBS Completeness & Control Account Check', ref: '100% Rule Verification', artifact: 'WBS Integrity Audit Sheet', why: 'Confirm zero unallocated scope, zero duplicate cost buckets, and clean P6 parity.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-08', pillar: 'PM2', track: 'pm',
    title: 'Primavera P6 Level 4 Logic Network & Critical Path',
    desc: 'Build deterministic FS/SS logic across Pre-Construction, OFCI, CSA Shell, MEP Halls 1-4, Energisation, and L1-L5 Commissioning.',
    tags: ['Primavera P6', 'Level 4', 'CPM'],
    docs: [
      { cat: 'Standard', title: 'AACE Recommended Practice 27R-03 (Schedule Classification & CPM Method)', ref: 'AACE 27R-03 / 38R-06', artifact: 'CPM Scheduling Standard', why: 'Differentiate Level 1 executive timelines from Level 4 logic-driven execution networks.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Master Level 4 Primavera P6 File (141 Tasks, 209 Links, 48 Critical Tasks)', ref: 'EU Calendar (2027-2030)', artifact: 'DataCenter_36MW_EU_Ireland.xer', why: 'Operate an importable P6 XER schedule driving May 2028 energisation to 2030 RFS.', kind: 'built' },
      { cat: 'Template', title: 'Project Implementation Plan (PIP) & Interactive 141-Task Gantt Workbook', ref: 'Sheet 3. 141-Task Gantt', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Communicate P6 critical path dates and dependencies clearly in Excel to non-planners.', kind: 'built' },
      { cat: 'Audit', title: 'Schedule Basis Memorandum (Calendars, Shift Assumptions & Driving Path)', ref: 'AACE 38R-06 Basis Memo', artifact: 'Schedule Basis Memorandum', why: 'Document Irish bank holidays, productivity assumptions, and key critical-path drivers.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-09', pillar: 'PM2', track: 'pm',
    title: 'DCMA-14 Schedule Quality Audit & Longest Path Diagnostics',
    desc: 'Enforce 100% logic integrity: zero dangling open ends, zero arbitrary lags/constraints, positive float discipline, and realistic critical density.',
    tags: ['DCMA-14', 'Schedule QA'],
    docs: [
      { cat: 'Standard', title: 'DCMA 14-Point Schedule Assessment Guideline (Logic, Leads, Lags, Float)', ref: 'DCMA 14-Point Standard', artifact: 'DCMA-14 Rulebook Reference', why: 'Learn exact thresholds (<5% high float, 0% negative float, 0 lags) for lender audits.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Automated DCMA-14 6/6 Schedule Health Diagnostic Report (pyp6xer Log)', ref: 'pyp6xer Quality Engine', artifact: 'DataCenter_36MW_EU_Ireland.xer', why: 'Inspect verified proof of zero open ends, zero hard constraints, and valid critical density.', kind: 'built' },
      { cat: 'Template', title: 'Monthly Contractor Schedule Update Audit & Float Consumption Checksheet', ref: 'Clause 31/32 Schedule Check', artifact: 'Contractor Update Checksheet', why: 'Spot hidden logic overrides, artificial lags, and silent float erosion each reporting cycle.', kind: 'ref' },
      { cat: 'Audit', title: 'Driving Predecessor & Near-Critical Path Risk Diagnostic Sheet', ref: 'Longest Path Trace', artifact: 'Longest Path Diagnostic Log', why: 'Isolate tasks with <10 days total float likely to flip onto the driving critical path.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-10', pillar: 'PM2', track: 'pm',
    title: 'Resource Loading, Cashflow S-Curves & Baseline Controls',
    desc: 'Cost-load P6 activities to forecast monthly EUR burn rates, engineering/site manpower peaks, and Performance Measurement Baselines.',
    tags: ['S-Curve', 'PMB', 'Manpower'],
    docs: [
      { cat: 'Standard', title: 'PMI Practice Standard for Cost-Loaded Scheduling & Cashflow Forecasting', ref: 'PMI Practice Standard', artifact: 'Cost-Loaded P6 Standard', why: 'Connect P6 task durations directly to capex drawdown curves and Earned Value baselines.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Performance Measurement Baseline (PMB) — Monthly EUR Capex Burn S-Curve', ref: 'Sheet 4. EVM Cost/Schedule', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Forecast cumulative EUR investment pacing across enabling, CSA, MEP, and Cx phases.', kind: 'built' },
      { cat: 'Template', title: 'Trade & Engineering Peak Manpower Histogram (CSA, HV, MEP, Cx Teams)', ref: 'Trade Labour Loading', artifact: 'Manpower Histogram Workbook', why: 'Prevent trade stacking in crowded white space by forecasting peak craft headcounts.', kind: 'ref' },
      { cat: 'Audit', title: 'Peak Headcount Welfare, Canteen, Turnstile & Site Logistics Audit Plan', ref: 'HSA Site Welfare Regs', artifact: 'Site Welfare Capacity Audit', why: 'Ensure statutory HSE welfare facilities, parking, and biometric gates scale for peak labour.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-11', pillar: 'PM2', track: 'pm',
    title: 'EU EED (2023/1791) & Delegated Reg. (2024/1364) KPI Design',
    desc: 'Embed sub-metering, PUE/WUE/ERF/REF telemetry pipelines and heat-reuse export readiness into technical specifications early.',
    tags: ['EED 2023/1791', 'PUE/WUE/ERF'],
    docs: [
      { cat: 'Standard', title: 'EU Energy Efficiency Directive (EU) 2023/1791 Art. 12 & Reg. (EU) 2024/1364', ref: 'Directive (EU) 2023/1791', artifact: 'EU EED Compliance Text', why: 'Master mandatory EU reporting metrics for all data centres >= 500 kW IT demand.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Facility Sustainability & EED Telemetry Design Spec (PUE, WUE, ERF, REF)', ref: 'Sheet 3. EN 50600 & EED', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Establish campus targets (PUE <= 1.22, closed-loop WUE, heat export ERF, REF >= 90%).', kind: 'built' },
      { cat: 'Template', title: 'EPMS / BMS Revenue-Grade Sub-Metering Hierarchy (IT vs. Cooling vs. Aux)', ref: 'EN 50600-4-x Telemetry', artifact: 'EPMS Sub-Metering Matrix', why: 'Position CT/PT meters accurately so UPS losses and parasitic loads report cleanly.', kind: 'ref' },
      { cat: 'Audit', title: 'Waste Heat Recovery Heat-Pump & Municipal District Heating Readiness Review', ref: 'Art. 26 Cost-Benefit Review', artifact: 'Waste Heat Readiness Audit', why: 'Verify plate heat exchanger flange-offs satisfy Irish SEAI / EU heat-reuse rules.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-12', pillar: 'PM2', track: 'pm',
    title: 'BS EN ISO 19650 Information Management, EIR & CDE Setup',
    desc: 'Implement Common Data Environment workflows (WIP -> Shared -> Published -> Archive), Exchange Info Requirements, and BIM LOD matrices.',
    tags: ['ISO 19650', 'CDE', 'BEP'],
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-1 & -2 Information Management Concepts & Delivery Phase', ref: 'BS EN ISO 19650-1 / -2', artifact: 'ISO 19650 Standard Guide', why: 'Enforce uniform naming conventions and suitability gates (S0-A7) across ACC/BIM 360.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Exchange Information Requirements (EIR) & Master Information Delivery Plan', ref: 'Appointing Party EIR/MIDP', artifact: 'EIR & MIDP Baseline Pack', why: 'Define exact BIM LOD, COBie data fields, and submission dates inside vendor contracts.', kind: 'ref' },
      { cat: 'Template', title: 'Project BIM Execution Plan (BEP) & CDE Folder Workflow (WIP/Shared/Archive)', ref: 'CDE Workflow & Naming Code', artifact: 'BIM BEP & Naming Standard', why: 'Standardize originator, volume, level, type, and role fields across all disciplines.', kind: 'ref' },
      { cat: 'Audit', title: 'Master Document Register (MDR) with ISO 19650 Suitability Codes (S0-A7)', ref: 'Portfolio Next Deliverable', artifact: 'Master_Document_Register_DC36EU.xlsx', why: 'Track live drawing transmittals, review aging, and IFC approvals in one central ledger.', kind: 'planned' }
    ]
  },

  // PM3: Phase 3 - Procurement, Contracts & Supply Chain (RIBA 4)
  {
    id: 'PM-13', pillar: 'PM3', track: 'pm',
    title: 'Delivery Strategy: EPCm, Design-Build & Multi-Prime Packaging',
    desc: 'Compare single-point turnkey vs. Trade/EPCm split packages across cost certainty, design control, interfaces, and claims exposure.',
    tags: ['EPCm', 'Design-Build', 'Packaging'],
    docs: [
      { cat: 'Standard', title: 'RIBA Stage 4 Technical Design & Commercial Procurement Options Standard', ref: 'RIBA Stage 4 Procurement', artifact: 'Procurement Route Framework', why: 'Weigh owner risk retention vs. turnkey risk premium across volatile European markets.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Contracting & Packaging Strategy Paper (EPCm vs. Single Turnkey vs. Multi-Prime)', ref: 'Sheet 5. Contracting & OFCI', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Structure CSA shell, HV substation, MEP fit-out, and BMS contracts for 36 MW velocity.', kind: 'built' },
      { cat: 'Template', title: 'Package Interface & Battery-Limit Split Matrix (HV, CSA, MEP, Controls, Cx)', ref: 'Package Demarcation Table', artifact: 'Interface Demarcation Matrix', why: 'Assign physical termination points (e.g., switchgear cable lugs, chilled water flanges).', kind: 'ref' },
      { cat: 'Audit', title: 'Supply Chain Market Warming & Pre-Qualification (PQQ) Scoring Audit', ref: 'Capacity / Safety / Finance', artifact: 'Bidder PQQ Shortlist Report', why: 'Vet Tier-1 European MEP/CSA contractors for bonding capacity, backlog, and DC experience.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-14', pillar: 'PM3', track: 'pm',
    title: 'NEC4 ECC (Option A/C): Early Warnings & Compensation Events',
    desc: 'Administer collaborative NEC4 contracts: Accepted Programme updates, Risk Reduction Meetings, CEs, and Option C target pain/gainshare.',
    tags: ['NEC4 ECC', 'Option A/C', 'CE'],
    docs: [
      { cat: 'Standard', title: 'NEC4 Engineering & Construction Contract (Options A & C Guidance Notes)', ref: 'NEC4 ECC Clauses 10-95', artifact: 'NEC4 ECC Practice Guide', why: 'Master collaborative PM duties, time bars (Clause 61.3), and target cost gainshare.', kind: 'ref' },
      { cat: 'Deliverable', title: 'NEC4 Works Information (Scope), Contract Data Part 1/2 & Pain/Gainshare Model', ref: 'NEC4 Contract Pack', artifact: 'NEC4 Scope & Contract Data', why: 'Draft unambiguous Scope specs and Option C share ranges aligned with sponsor budgets.', kind: 'ref' },
      { cat: 'Template', title: 'Live Early Warning Notice (EWN) & Risk Reduction Meeting Action Register', ref: 'NEC4 Clause 15 Workflow', artifact: 'EWN & Risk Reduction Log', why: 'Surface cost/programme threats early before they convert into expensive Compensation Events.', kind: 'ref' },
      { cat: 'Audit', title: 'Compensation Event (CE) Valuation Register & Clause 31/32 Programme Check', ref: 'NEC4 Cl. 31-32 & 60-65', artifact: 'CE & Programme Audit Log', why: 'Enforce strict prospective time-impact quoting and Defined Cost substantiation.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-15', pillar: 'PM3', track: 'pm',
    title: 'FIDIC Yellow / Silver Book: Risk Allocation & Claims Control',
    desc: 'Manage Engineer determinations, Employer Requirements integrity, EOT substantiation, and DAB dispute avoidance under FIDIC.',
    tags: ['FIDIC', 'Claims', 'EOT'],
    docs: [
      { cat: 'Standard', title: 'FIDIC Yellow Book (D&B) / Silver Book (EPC) 2017 & SCL Delay Protocol', ref: 'FIDIC 2017 / SCL Protocol', artifact: 'FIDIC & SCL Reference Pack', why: 'Understand Employer Risk vs. turnkey single-point responsibility under Irish/EU law.', kind: 'ref' },
      { cat: 'Deliverable', title: "Employer's Requirements (ERs), Particular Conditions & Delay Damages Schedule", ref: 'FIDIC Contract Drafting', artifact: 'FIDIC ERs & Particulars Pack', why: 'Protect power efficiency guarantees and liquidated damages via airtight ER schedules.', kind: 'ref' },
      { cat: 'Template', title: 'Contractor Notice of Claim, Time-Impact EOT Analysis & Determination SOP', ref: 'FIDIC Clause 20 / 3.7', artifact: 'Claim & EOT Assessment SOP', why: 'Evaluate concurrent delay, pacing, and Sub-Clause 20.2 condition-precedent notices.', kind: 'ref' },
      { cat: 'Audit', title: 'Dispute Avoidance/Adjudication Board (DAAB) Monthly Standing Briefing Audit', ref: 'FIDIC Clause 21 DAAB', artifact: 'Monthly DAAB Briefing File', why: 'Resolve commercial entitlement deadlocks contemporaneously to avoid arbitration.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-16', pillar: 'PM3', track: 'pm',
    title: 'OFCI Long-Lead Equipment Strategy (HV, UPS, Chillers, BESS)',
    desc: 'De-risk 40-80 week OEM bottlenecks via early Owner-Furnished slots, milestone reservation payments, and novation options.',
    tags: ['OFCI', 'Long-Lead', 'OEM'],
    docs: [
      { cat: 'Standard', title: 'Hyperscale Owner-Furnished Contractor-Installed (OFCI) Procurement Protocol', ref: 'OFCI Delivery Standard', artifact: 'OFCI Governance Protocol', why: 'Balance 52-week OEM lead-time compression against interface liability risks.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Master OFCI Long-Lead Equipment Matrix (110kV GIS, Transformers, UPS, BESS)', ref: 'Sheet 5. Contracting & OFCI', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Track factory build slots, deposit milestones, and required-on-site dates in P6.', kind: 'built' },
      { cat: 'Template', title: 'OEM Slot Reservation Agreement, Progress Milestones & Conditional Novation Deed', ref: 'HV / UPS / Chiller Supply', artifact: 'OEM Slot & Novation Deed', why: 'Lock factory production early and cleanly transfer custody to the EPCm at site delivery.', kind: 'ref' },
      { cat: 'Audit', title: 'OFCI Factory Warranty Transition, Site Receiving, Rigging & Custody Audit', ref: 'Care & Custody Transfer', artifact: 'OFCI Site Custody Checklist', why: 'Verify crane paths, floor point-loads, and preservation warranty compliance on arrival.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-17', pillar: 'PM3', track: 'pm',
    title: 'RFP Issuance, Technical Bid Evaluation (TBE) & BAFO Leveling',
    desc: 'Run blind commercial/technical scoring matrices, normalize exclusions/deviations, and lead structured BAFO negotiations.',
    tags: ['TBE', 'BAFO', 'Procurement'],
    docs: [
      { cat: 'Standard', title: 'EU Competitive Tender Governance & Commercial Bid Normalisation Best Practice', ref: 'Audit-Ready Tender Rules', artifact: 'Tender Governance Standard', why: 'Guarantee transparent, defensible contractor selection under institutional governance.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Invitation to Tender (ITT) / RFP Package, Pricing BoQ & Mandatory Compliances', ref: 'RIBA Stage 4 Tender Pack', artifact: 'ITT / RFP Tender Dossier', why: 'Issue standardized pricing schedules so bids can be compared apples-to-apples.', kind: 'ref' },
      { cat: 'Template', title: 'Blind Technical Bid Evaluation (TBE) Scorecard & BAFO Leveling Sheet', ref: 'Tech / Cost / Schedule / HSE', artifact: 'TBE & BAFO Leveling Workbook', why: 'Plug gaps, price exclusions, and benchmark labour productivity rates across bidders.', kind: 'ref' },
      { cat: 'Audit', title: 'Post-Tender Clarification Log & Executive Recommendation to Award (RTA) Paper', ref: 'IC Award Approval', artifact: 'Recommendation to Award Memo', why: 'Document BAFO savings, negotiated risk caps, and final contract execution readiness.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-18', pillar: 'PM3', track: 'pm',
    title: 'Vendor Expediting, Factory Readiness & Incoterms Logistics',
    desc: 'Track shop drawings, sub-supplier components, DDP/DAP customs clearance, and laydown yard sequencing to site.',
    tags: ['Expediting', 'Incoterms', 'Supply Chain'],
    docs: [
      { cat: 'Standard', title: 'ICC Incoterms 2020 Rules (EXW / FCA / CIF / DAP / DDP) & Expediting Guide', ref: 'ICC Incoterms 2020', artifact: 'Incoterms & Logistics Guide', why: 'Determine exact freight insurance, VAT customs liability, and site unloading boundaries.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Weekly OEM Production, Sub-Supplier (Breakers/PLC) & Shop Drawing Tracker', ref: 'Tier-2 Component Tracking', artifact: 'Vendor Expediting Tracker', why: 'Catch sub-tier PCB or breaker delays months before missed factory delivery dates.', kind: 'ref' },
      { cat: 'Template', title: 'Marine Freight, EU Customs Clearance, Abnormal Load Route & Laydown Plan', ref: 'Dublin/Cork Heavy Haul', artifact: 'Freight & Laydown Schedule', why: 'Coordinate Garda escorts, bridge weight limits, and crane pads for 100t transformers.', kind: 'ref' },
      { cat: 'Audit', title: 'Delivered Equipment Preservation, Space-Heater Power & Nitrogen Purge Audit', ref: 'Storage Warranty Protection', artifact: 'Preservation Inspection Log', why: 'Protect switchgear insulation and chiller bearings during damp Irish winters on site.', kind: 'ref' }
    ]
  },

  // PM4: Phase 4 - Execution, Controls, Risk & Change (RIBA 5)
  {
    id: 'PM-19', pillar: 'PM4', track: 'pm',
    title: 'Earned Value Management (EVM): CPI, SPI, EAC & Recovery',
    desc: 'Measure physical % complete against PV/EV/AC, diagnose CPI/SPI drift early, and enforce schedule compression or fast-track recovery plans.',
    tags: ['EVM', 'CPI/SPI', 'EAC'],
    docs: [
      { cat: 'Standard', title: 'ANSI/EIA-748 & PMI Practice Standard for Earned Value Management', ref: 'ANSI/EIA-748 / PMI EVM', artifact: 'EVM Control Standard Guide', why: 'Master PV, EV, AC, SPI, CPI, TCPI, and EAC formulas used to audit delivery health.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Live Cost/Schedule EVM Workbook (PV, EV, AC, CPI, SPI & EAC Model)', ref: 'Sheet 4. EVM Cost/Schedule', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Monitor monthly DC36-EU spend efficiency and detect slippage before contingency burns.', kind: 'built' },
      { cat: 'Template', title: 'Trade Physical Progress Rules-of-Credit Matrix (Linear vs. Billed %)', ref: 'Rules of Credit Matrix', artifact: 'Trade Rules-of-Credit Sheet', why: 'Prevent contractor front-loading by tying progress strictly to installed linear meters.', kind: 'ref' },
      { cat: 'Audit', title: 'Schedule Variance Recovery & Acceleration Plan (Double Shifts / Skids)', ref: 'SPI < 0.95 Recovery', artifact: 'Schedule Recovery Action Plan', why: 'Restore lost float via weekend shifts, offsite modular skids, and crew re-sequencing.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-20', pillar: 'PM4', track: 'pm',
    title: 'Integrated Change Control (CRB), Scope Freeze & Baselines',
    desc: 'Govern Change Requests through technical/cost/schedule impact scoring before Change Control Board sign-off and baseline revision.',
    tags: ['Change Control', 'CRB', 'Scope Freeze'],
    docs: [
      { cat: 'Standard', title: 'ISO 10007 Configuration Management & Baseline Change Governance Guide', ref: 'ISO 10007 Baseline Control', artifact: 'Configuration Mgmt Standard', why: 'Enforce strict separation between pending tenant wishes and approved baseline changes.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Change Control Board (CRB) Charter, Delegated Financial Authority & SLAs', ref: 'CRB Governance Charter', artifact: 'CRB Decision Authority Matrix', why: 'Clarify PM vs. Sponsor approval caps so minor field tweaks move without stalling.', kind: 'ref' },
      { cat: 'Template', title: 'Change Request (CR) Impact Assessment Form (Tech, Capex, P6, PUE)', ref: 'CR Impact Form', artifact: 'Change Impact Assessment Form', why: 'Force holistic impact sign-off on load density, P6 float, and PUE before issuing VOs.', kind: 'ref' },
      { cat: 'Audit', title: 'Approved Change Log, Baseline Revision History & Design Freeze Tracker', ref: 'Stage 4/5 Scope Freeze', artifact: 'Change Log & Freeze Waiver Audit', why: 'Trace every EUR moved from contingency and justify late tenant variation orders.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-21', pillar: 'PM4', track: 'pm',
    title: 'Quantitative Risk Analysis (QRA / Monte Carlo P50 & P80)',
    desc: 'Maintain active L x I Risk Register, run 3-point cost/schedule Monte Carlo simulations, and govern drawdown of management reserve.',
    tags: ['QRA', 'Monte Carlo', 'P50/P80'],
    docs: [
      { cat: 'Standard', title: 'ISO 31000 Risk Management Standard & AACE 40R-08 Probabilistic Estimating', ref: 'ISO 31000 / AACE 40R-08', artifact: 'Quantitative Risk Standard', why: 'Move beyond static guesses to probability-weighted P50/P80 contingency sizing.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Weighted Risk & Opportunity Register (L x I, EMV, Owners & Triggers)', ref: 'Sheet 5. Risk Register', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx', why: 'Manage live EU data centre threats (grid delay, OFCI lead-time, wet weather, FX).', kind: 'built' },
      { cat: 'Template', title: 'Project Charter Top-10 Strategic Risk & Quantitative Monte Carlo Output', ref: 'Charter Sheet 5 / QRA P80', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx', why: 'Identify top Tornado drivers dictating reserve drawdown across charter and pre-NTP gates.', kind: 'built' },
      { cat: 'Audit', title: 'Contingency & Management Reserve Drawdown Authorization Ledger', ref: 'Reserve Drawdown Control', artifact: 'Contingency Drawdown Ledger', why: 'Audit every contingency drawdown against realized risk triggers rather than scope creep.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-22', pillar: 'PM4', track: 'pm',
    title: 'Quality Assurance (QA/QC), ITPs & NCR / RFI Discipline',
    desc: 'Enforce Inspection & Test Plans, hold/witness points, concrete/weld QA logs, submittals SLAs, and timely Non-Conformance closure.',
    tags: ['QA/QC', 'ITP', 'NCR'],
    docs: [
      { cat: 'Standard', title: 'ISO 9001 Quality Management Systems & CSA/MEP Site Testing Best Practice', ref: 'ISO 9001 QA/QC Standard', artifact: 'Quality Management Standard', why: 'Establish zero-defect construction discipline preventing hidden faults before Cx.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Project Construction Quality Management Plan (CQP) & Testing Lab Scope', ref: 'Stage 5 Site CQP', artifact: 'Construction Quality Plan', why: 'Define concrete cube crush tests, MV/HV cable hipots, and third-party weld NDE rules.', kind: 'ref' },
      { cat: 'Template', title: 'Trade Inspection & Test Plans (ITPs) with Hold / Witness Checkpoints', ref: 'CSA / HV / MEP ITPs', artifact: 'Master ITP Hold-Point Matrix', why: 'Require CxA/RE physical sign-off before burying conduits, slabs, or pipework.', kind: 'ref' },
      { cat: 'Audit', title: 'Non-Conformance Report (NCR), Field Observation & RFI Aging Dashboard', ref: 'NCR / RFI Closure SLA', artifact: 'NCR & RFI Aging Audit Log', why: 'Close overdue RFIs (<5 days) and open NCRs before they block handover certificates.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-23', pillar: 'PM4', track: 'pm',
    title: 'Multi-Disciplinary MEP / CSA Interface & Clash Coordination',
    desc: 'Resolve slab penetrations, busway/piping corridors, hot/cold aisle containment tolerances, and trade handoffs between CSA and MEP.',
    tags: ['Interfaces', 'BIM Clash', 'MEP/CSA'],
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-2 Spatial Coordination & Federated BIM Clash Standard', ref: 'ISO 19650-2 Coordination', artifact: 'Federated BIM Coordination Std', why: 'Catch clearance clashes digitally in LOD 350 models before pouring concrete slabs.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Cross-Discipline Interface Responsibility & Sequence Plan (Slabs, Busways)', ref: 'CSA -> MEP -> BMS/EPMS', artifact: 'Interface Responsibility Plan', why: 'Sequence overhead containment, sprinkler racks, busbar aisles, and hot-aisle plenums.', kind: 'ref' },
      { cat: 'Template', title: 'Weekly Navisworks / ACC BIM Clash Resolution & Builders-Work Sign-Off', ref: 'BIM Clash Matrix', artifact: 'Weekly Clash Resolution Log', why: 'Drive weekly clash counts down to zero per zone prior to IFC construction drawings.', kind: 'ref' },
      { cat: 'Audit', title: 'Data Hall White-Space Readiness Walkdown Checklist (Floor, ESD, Cleanliness)', ref: 'White-Space Sign-Off', artifact: 'Hall White-Space Walkdown Log', why: 'Verify raised floor pedestals, airtight containment, and ISO cleanroom standards pre-rack.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-24', pillar: 'PM4', track: 'pm',
    title: 'Executive Steering Reporting, Lookahead & Escalation',
    desc: 'Publish weekly/monthly control packs, 3-week/6-week constraint-free lookaheads, and crisp decision memos for executive sponsors.',
    tags: ['Reporting', 'Lookahead', 'Governance'],
    docs: [
      { cat: 'Standard', title: 'Last Planner System (LPS) Pull Planning & Enterprise PMO Reporting Std', ref: 'Last Planner System', artifact: 'Lean Lookahead & PMO Standard', why: 'Combine top-down P6 CPM milestones with weekly field constraint-removal workflows.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Monthly Executive Steering Committee Pack (HSE, EVM, Cash, Top Risks)', ref: 'Monthly SteerCo Pack', artifact: 'Monthly Executive Report Deck', why: 'Present board-level RAG status, S-curves, and urgent capital decisions clearly.', kind: 'ref' },
      { cat: 'Template', title: 'Rolling 6-Week Constraint-Free Lookahead & Percent Plan Complete (PPC) Log', ref: 'Weekly Site Lookahead', artifact: '6-Week Lookahead & PPC Sheet', why: 'Unblock permits, RAMS, materials, and drawings two weeks ahead of field crews.', kind: 'ref' },
      { cat: 'Audit', title: 'One-Page Executive Decision Memo & Red-Amber-Green (RAG) Recovery Brief', ref: 'Executive Escalation Memo', artifact: 'RAG Recovery Briefing Note', why: 'Isolate root causes, quantified options, and clear leadership asks on one page.', kind: 'ref' }
    ]
  },

  // PM5: Phase 5 - Commissioning L1-L5 & Integrated Testing (RIBA 5-6)
  {
    id: 'PM-25', pillar: 'PM5', track: 'pm',
    title: 'Master Commissioning Plan (CIBSE Code M / ASHRAE 0)',
    desc: 'Organize Commissioning Authority (CxA) governance, test matrices, dependency logic, and tag progression gates from L1 to L5.',
    tags: ['CIBSE Code M', 'ASHRAE 0', 'CxA'],
    docs: [
      { cat: 'Standard', title: 'CIBSE Commissioning Code M & ASHRAE Guideline 0 / Standard 202 Process', ref: 'CIBSE Code M / ASHRAE 0', artifact: 'Cx Process Authority Standard', why: 'Structure independent Commissioning Authority (CxA) governance from OPR through IST.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Master Commissioning Management Plan (CxA Authority, Matrix & Logic Gates)', ref: 'Portfolio Stage 6 Pack', artifact: 'Master Commissioning Plan (Stage 6)', why: 'Define sign-off protocols, witness notice periods, and system-by-system test sequences.', kind: 'planned' },
      { cat: 'Template', title: 'Level 1-5 Sequence Dependency Roadmap Across All 4 Data Halls', ref: 'Sheet 6. Commissioning L1-L5', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Sequence Hall 1-4 handover phases alongside shared 110kV/central plant systems.', kind: 'built' },
      { cat: 'Audit', title: 'Commissioning Issues Log (CxIL) & Test Script Completion Burn-Down Log', ref: 'CxTrack / CxAlloy Burn-Down', artifact: 'CxIL & Script Burn-Down Tracker', why: 'Track open commissioning deficiencies daily so zero severity-1 blockers reach IST.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-26', pillar: 'PM5', track: 'pm',
    title: 'Cx Levels 1 & 2: Witnessed OEM FAT & Site Receiving QA',
    desc: 'Execute European Factory Acceptance Tests (HV switchgear, UPS, chillers, BESS) and verify undamaged site installation/red-line tags.',
    tags: ['L1-L2', 'FAT', 'Red Tag'],
    docs: [
      { cat: 'Standard', title: 'IEC 62271 (HV Switchgear), IEC 62040 (UPS) & ISO 8528 (Generator) Standards', ref: 'IEC 62271 / IEC 62040 / ISO 8528', artifact: 'OEM Factory Test Standards', why: 'Understand rated impulse withstand, UPS overload specs, and ISO G3 genset classes.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Level 1 Witnessed Factory Acceptance Test (FAT) Scripts & Punchlists', ref: 'HV GIS / UPS / Chillers / BESS', artifact: 'L1 FAT Witness Test Pack', why: 'Catch protection/firmware defects in the factory before shipping to Dublin/Cork.', kind: 'planned' },
      { cat: 'Template', title: 'Level 2 Site Delivery, Foundation Alignment, Torque & Pre-Energisation Forms', ref: 'L2 Installation Checksheets', artifact: 'L2 Mechanical/Electrical Forms', why: 'Verify shock-recorder logs, anchor bolts, and megger tests prior to Yellow Tag sign-off.', kind: 'ref' },
      { cat: 'Audit', title: 'Equipment Color-Tagging Procedure (White L1 -> Yellow L2 -> Green L3 -> Blue L4)', ref: 'Tagging Discipline SOP', artifact: 'Cx Color-Tagging Audit SOP', why: 'Control physical lockstep gates so no contractor energizes an unverified panel.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-27', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 3: Pre-Functional Static, BSRIA Flush & LOTO',
    desc: 'Verify Megger/hi-pot insulation, relay secondary injection, BSRIA chilled-water flushing, and strict LOTO energisation permits.',
    tags: ['L3 Static', 'BSRIA', 'LOTO'],
    docs: [
      { cat: 'Standard', title: 'BSRIA BG 29 Pre-Commission Cleaning of Pipework & HV Safe Switching Rules', ref: 'BSRIA BG 29 / ESBN Safety', artifact: 'Static Cleaning & HV Standard', why: 'Prevent condenser fouling and arc-flash hazards through strict static qualification.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Authorized HV/LV Lockout-Tagout (LOTO) Control Book & Sanction-for-Test', ref: 'SAP / Authorized Person Book', artifact: 'HV/LV LOTO Permit Control Book', why: 'Enforce Safe System of Work and Authorised Person isolation across live zones.', kind: 'ref' },
      { cat: 'Template', title: 'Level 3 Electrical Static Checksheets (Megger, VLF Hi-Pot & Relay Injection)', ref: 'L3 Electrical Static Pack', artifact: 'L3 Static Test Checksheets', why: 'Validate busbar torque thermography marks, CT polarity, and relay trip curves.', kind: 'planned' },
      { cat: 'Audit', title: 'BSRIA Closed-Loop Chilled-Water Chemical Flushing & Leakage Certificates', ref: 'BSRIA BG 29 / Duct Leakage', artifact: 'BSRIA Flush & Hydro Certificates', why: 'Confirm turbidity, iron <5 ppm, biocide dosing, and pressurized pipe integrity.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-28', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 4: Dynamic Load, SCR Abatement & BESS Sync',
    desc: 'Prove 22kV energisation, genset step-load black-start, SCR NOx abatement, EPMS/BMS failure sequences, and BESS synchronization.',
    tags: ['L4 Dynamic', 'BESS Sync', 'BMS/EPMS'],
    docs: [
      { cat: 'Standard', title: 'CIBSE Commissioning Code C (Controls), NETA ATS & EU Medium Combustion Regs', ref: 'CIBSE Code C / NETA ATS', artifact: 'Dynamic Controls & Test Std', why: 'Set dynamic acceptance tolerances for voltage transients, controls loops, and emissions.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Level 4 Functional Performance Test (FPT) Scripts (UPS, Genset & BESS Sync)', ref: 'CIBSE Code M L4', artifact: 'L4 Functional Test Dossier', why: 'Prove single-system load transfers, static switch speeds, and BESS grid synchronization.', kind: 'planned' },
      { cat: 'Template', title: 'Generator SCR NOx Emissions Abatement & HVO Combustion Verification Logs', ref: 'EPA IEL Stack Verification', artifact: 'SCR & HVO Dynamic Test Logs', why: 'Verify urea dosing and NOx limits under 25%-100% step loads to satisfy EPA conditions.', kind: 'ref' },
      { cat: 'Audit', title: 'Automated BMS / EPMS Sequence of Operations (SOO) & Cause-and-Effect Proof', ref: 'BMS / EPMS Telemetry Audit', artifact: 'SOO & Cause-and-Effect Matrix', why: 'Audit sensor trends, alarms, and automated valve/breaker interlock responses end-to-end.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-29', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 5: 36 MW 48-Hr IST & Full Blackout Simulation',
    desc: 'Orchestrate portable load-bank thermal soak, pull-the-plug blackout ATS/UPS failover (<10s), and TES cooling ride-through tests.',
    tags: ['L5 IST', '36 MW', 'Blackout Test'],
    docs: [
      { cat: 'Standard', title: 'ASHRAE Guideline 0 & Hyperscale Integrated Systems Testing (IST) MOP Rules', ref: 'ASHRAE 0 / Hyperscale IST', artifact: 'IST Method Statement Standard', why: 'Structure integrated failure scenarios proving facility resilience under 100% heat load.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Master 36 MW 48-Hour Integrated Systems Test (IST) Playbook & Scenario Pack', ref: 'Pull-the-Plug Blackout', artifact: 'L5 36MW 48-Hr IST Playbook', why: 'Script dual-feed utility loss, breaker failures, and emergency thermal ride-through.', kind: 'planned' },
      { cat: 'Template', title: 'Portable Load-Bank Power Matrix, Heat-Soak & Infrared Thermography Logs', ref: '36 MW Thermal Heat-Soak', artifact: 'Load-Bank & IR Thermo Matrix', why: 'Distribute fan-assisted resistive load banks accurately across PDUs and floor tiles.', kind: 'ref' },
      { cat: 'Audit', title: 'Facility Grid Blackout, <10s ATS+BESS Failover & TES Ride-Through Audit Log', ref: 'Scenario Sign-Off Evidence', artifact: 'Blackout & TES Ride-Through Log', why: 'Capture millisecond waveform recordings proving uninterrupted power and zero thermal trip.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-30', pillar: 'PM5', track: 'pm',
    title: 'Dual EN 50600 Class 3 & Uptime TCCF Constructed Audit',
    desc: 'Script simultaneous path-isolation concurrent maintainability demonstrations for independent on-site certifying assessors.',
    tags: ['TCCF', 'EN 50600', 'Maintainability'],
    docs: [
      { cat: 'Standard', title: 'Uptime Institute Tier Standard Topology (TCCF) & I.S. EN 50600 Class 3 Rules', ref: 'Uptime TCCF / EN 50600', artifact: 'Dual Certification Rulebook', why: 'Satisfy both Uptime Institute assessors and European EN 50600 third-party auditors.', kind: 'ref' },
      { cat: 'Deliverable', title: 'On-Site Assessor Concurrent Maintainability Isolation Demonstration Pack', ref: 'Path A vs. Path B Proofs', artifact: 'TCCF & Class 3 Witness Scripts', why: 'Prove every switchgear, transformer, UPS, and chiller header isolates with zero outage.', kind: 'planned' },
      { cat: 'Template', title: 'Pre-Audit Single-Point-of-Failure (SPOF) Electrical & Cooling Walkdown Sheet', ref: 'SPOF Elimination Check', artifact: 'Pre-Audit SPOF Walkdown Sheet', why: 'Eliminate shared control PLC power supplies, manual valve bypasses, or control loops.', kind: 'ref' },
      { cat: 'Audit', title: 'Assessor Observations Remediation Dossier & Constructed Certificate File', ref: 'Certification Sign-Off Vault', artifact: 'TCCF / EN 50600 Audit File', why: 'Close minor witness punch items and secure final bankable facility certificates.', kind: 'ref' }
    ]
  },

  // PM6: Phase 6 - Handover, OR&T & Project Closeout (RIBA 6-7)
  {
    id: 'PM-31', pillar: 'PM6', track: 'pm',
    title: 'Practical Completion (PC), Snagging Burn-Down & RFS Gate',
    desc: 'Run A/B/C defect classification, enforce Day-1 Ready-for-Service (RFS) blocker zeroing, and issue Taking-Over Certificates.',
    tags: ['Practical Completion', 'Punch List', 'RFS'],
    docs: [
      { cat: 'Standard', title: 'RIBA Stage 6 Handover & Contract Practical Completion Certification Protocol', ref: 'RIBA Stage 6 / Contract PC', artifact: 'Handover & RFS Gate Standard', why: 'Prevent premature lease start liabilities by defining strict objective PC/RFS exits.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Ready-for-Service (RFS) Gate Sign-Off Package & Taking-Over Certificate', ref: 'Tenant Lease / Contract TOC', artifact: 'PC & RFS Gate Sign-Off Pack', why: 'Trigger rent commencement, insurance transfer, and defects liability start date cleanly.', kind: 'ref' },
      { cat: 'Template', title: 'A / B / C Defect Categorization & Snagging Punch-List Burn-Down Tracker', ref: 'Zero Cat-A Day-1 Blockers', artifact: 'Snagging Punch-List Log', why: 'Separate safety/SLAs (Cat-A) from cosmetic snags (Cat-C) to unblock handover.', kind: 'ref' },
      { cat: 'Audit', title: 'Tenant Demise Inspection, Cleanroom & Security Keys Handover Certificate', ref: 'White-Space Demise Sign-Off', artifact: 'Tenant Demise Handover Audit', why: 'Verify BMS security access badges, cleanroom particle counts, and cage locks.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-32', pillar: 'PM6', track: 'pm',
    title: 'Operational Readiness & Transition (OR&T) & Black-Hat Drills',
    desc: 'Train 24/7 Critical Facilities staff, validate EOP/MOP/SOP libraries, run live Black-Hat incident drills, and stock 2-year critical spares.',
    tags: ['OR&T', 'Black-Hat', 'EOP/MOP/SOP'],
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-3-1 Management & Operations + Uptime Operational Sustainability', ref: 'EN 50600-3-1 / Uptime M&O', artifact: 'Facility Operations Standard', why: 'Avoid human-error outages (>70% of failures) through certified operating discipline.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Critical Facilities Operations Handbook: EOP, MOP & SOP Playbook Library', ref: 'Stage 6 OR&T Runbooks', artifact: 'Stage 6 OR&T Handbook Suite', why: 'Equip shift engineers with step-by-step switching and emergency response guides.', kind: 'planned' },
      { cat: 'Template', title: 'Live Black-Hat Unannounced Outage Drill Scripts & 24/7 Crew Scorecards', ref: 'Operator Drill Simulation', artifact: 'Black-Hat Drill Evaluation Log', why: 'Test live crew reactions to simulated tripped breakers, chiller leaks, and fire alarms.', kind: 'ref' },
      { cat: 'Audit', title: '24/7 Technician Competency Sign-Offs, OEM SLAs & 2-Year Critical Spares Log', ref: 'Spares & Competency Check', artifact: 'Spares & SLA Readiness Audit', why: 'Ensure breakers, PLC cards, fan drives, and 4-hour vendor SLAs exist prior to Day-1.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-33', pillar: 'PM6', track: 'pm',
    title: 'BS EN ISO 19650 Asset Information Model (AIM) Handover',
    desc: 'Deliver verified COBie asset registers, as-built BIM models, O&M manuals, warranties, and CMMS integration packages.',
    tags: ['ISO 19650 AIM', 'COBie', 'O&M'],
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-3 Operational Asset Information Mgmt & BS 1192-4 COBie', ref: 'ISO 19650-3 / BS 1192-4', artifact: 'AIM & COBie Data Standard', why: 'Bridge construction CDE models seamlessly into live CMMS maintenance software.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Verified Asset Information Model (AIM) & As-Built Federated BIM Archive', ref: 'As-Built Digital Twin', artifact: 'As-Built AIM Digital Vault', why: 'Deliver geo-tagged 3D models matching every installed pipe, valve, and breaker.', kind: 'planned' },
      { cat: 'Template', title: 'Structured COBie / CMMS Equipment Asset Register (Barcodes, Serials, PPM)', ref: 'CMMS Bulk Import Pack', artifact: 'COBie & CMMS Asset Register', why: 'Pre-load thousands of maintainable assets with OEM warranty dates and PPM intervals.', kind: 'ref' },
      { cat: 'Audit', title: 'Final Red-Line As-Built Drawings, O&M Manuals, Warranties & Test Vault', ref: 'CDE Published Archive', artifact: 'O&M & Warranty Completeness Log', why: 'Audit 100% receipt of signed statutory O&M volumes before final retention payment.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-34', pillar: 'PM6', track: 'pm',
    title: 'Commercial Final Account, Variations Settlement & DLP',
    desc: 'Reconcile all CEs/variations, close prime cost sums, manage retention release mechanics, and track 12/24-month Defect Liability Period.',
    tags: ['Final Account', 'DLP', 'Retention'],
    docs: [
      { cat: 'Standard', title: 'NEC4 / FIDIC Commercial Final Account Agreement & Defects Liability Rules', ref: 'NEC4 Cl. 5 / FIDIC Cl. 14', artifact: 'Commercial Closeout Standard', why: 'Execute legally binding full-and-final commercial settlement eliminating latent claims.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Agreed Commercial Final Account Statement & Closed Variation Schedule', ref: 'Final Account Deed', artifact: 'Final Account Settlement Pack', why: 'Reconcile provisional sums, CEs, contra-charges, and final capex EUR/MW actuals.', kind: 'ref' },
      { cat: 'Template', title: '12-to-24 Month Defects Liability Period (DLP) & Warranty Callout Tracker', ref: 'Post-PC Defect SLA', artifact: 'DLP Callout & Defect Register', why: 'Track response SLAs for post-handover snags and latent leaks during warranty year 1.', kind: 'ref' },
      { cat: 'Audit', title: 'Practical Completion 50% Retention Release & Making-Good Defects Cert', ref: 'Final Certificate Gate', artifact: 'Retention & Defects Release Audit', why: 'Release second half of performance bond/retention only after DLP clearance sign-off.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-35', pillar: 'PM6', track: 'pm',
    title: 'Post-Occupancy Evaluation (POE) & Live PUE/WUE/ERF Audit',
    desc: 'Track seasonal commissioning tuning, verify guaranteed vs. measured PUE/WUE at partial IT load, and optimize chiller staging.',
    tags: ['POE', 'Seasonal Cx', 'Live PUE'],
    docs: [
      { cat: 'Standard', title: 'BSRIA BG 63 Soft Landings Post-Occupancy & Reg. (EU) 2024/1364 Reporting', ref: 'BSRIA BG 63 / EU 2024/1364', artifact: 'POE & EED Live Audit Standard', why: 'Ensure design PUE survives reality at 15%-50% early tenant ramp-up load factors.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Summer/Winter Seasonal Commissioning Fine-Tuning Report (Chiller/Pump Opt)', ref: 'RIBA Stage 7 In-Use', artifact: 'Seasonal Cx Tuning Report', why: 'Retune VFD fan walls, EC fans, and adiabatic wetted pads across live seasonal peaks.', kind: 'ref' },
      { cat: 'Template', title: 'Guaranteed vs. Measured PUE, WUE & Free-Cooling Energy Validation Log', ref: 'KPI Benchmark Tracker', artifact: 'Live PUE/WUE Validation Workbook', why: 'Measure EPMS sub-meters continuously to confirm <1.22 annualized PUE compliance.', kind: 'ref' },
      { cat: 'Audit', title: 'Initial Statutory Annual EU EED Art. 12 Union Database Filing Pack', ref: 'May 15 Annual EED Filing', artifact: 'EU EED Annual Filing Audit', why: 'Submit verified energy, water, and waste-heat metrics to the European Commission portal.', kind: 'ref' }
    ]
  },
  {
    id: 'PM-36', pillar: 'PM6', track: 'pm',
    title: 'Lessons Learned Archive, Benefits Realization & Closeout',
    desc: 'Publish benchmark EUR/MW actuals, schedule variance post-mortems, contract closeout certificates, and enterprise knowledge transfer.',
    tags: ['Closeout', 'Lessons Learned', 'KPIs'],
    docs: [
      { cat: 'Standard', title: 'PMI Close Project Phase Standard & Enterprise PMO Benchmarking Guidelines', ref: 'PMI Closeout / PMO Std', artifact: 'Enterprise Closeout Standard', why: 'Institutionalize actual build costs and schedule durations to inform DC36 Phase 2.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Final Project Closeout Report & Actual EUR/MW Capex + Schedule Benchmark', ref: 'Board Benefits Review', artifact: 'Project Closeout & Benchmark Pack', why: 'Compare FID forecasts vs. final outturn IRR, EUR/MW capex, and critical-path variances.', kind: 'ref' },
      { cat: 'Template', title: 'Cross-Discipline End-to-End Lessons Learned Register (CSA, Grid, Cx, OR&T)', ref: 'PMO Knowledge Base', artifact: 'Lessons Learned Register', why: 'Capture procurement pitfalls, OFCI lessons, and Irish permitting timelines for future sites.', kind: 'ref' },
      { cat: 'Audit', title: 'Formal Contract Closeout Notices, Bond Returns & Benefits Realization Sign-Off', ref: 'Sponsor Final Discharge', artifact: 'Contract Closeout Sign-Off Log', why: 'Confirm parent guarantees returned, CDE archived, and project team formally released.', kind: 'ref' }
    ]
  },

  // Deferred Track: L1 - Irish Planning & EPA IEL (EU-01..EU-06)
  {
    id: 'EU-01', pillar: 'L1', track: 'legal',
    title: 'Local Authority vs. An Bord Pleanala (SID) Planning Pathways',
    desc: 'Understand Strategic Infrastructure Development (SID) thresholds, Section 247 pre-planning consultations, and appeal timelines.',
    tags: ['Planning Act', 'SID', 'Sec 247'],
    docs: [
      { cat: 'Standard', title: 'Ireland Planning and Development Act & An Bord Pleanala SID Threshold Guide', ref: 'Planning & Dev. Act (IE)', artifact: 'Planning Act SID Standard', why: 'Determine whether your 36 MW campus routes via Local Council or direct SID board.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Statutory Permitting Master Sequence Schedule Mapped to P6 Critical Path', ref: 'Sheet 4. Ireland Statutory', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Sequence Sec 247, public notice, EPA IEL, and appeal windows before FNTP.', kind: 'built' },
      { cat: 'Template', title: 'Section 247 Pre-Planning Meeting Pack & SID Determination Request Dossier', ref: 'Stage 2 Planning Submission', artifact: 'Stage 2 Planning Dossier', why: 'Secure early council planner alignment on height, substation siting, and traffic.', kind: 'planned' },
      { cat: 'Audit', title: 'Planning Application Public Site Notice, Drawings & Statutory Timeline Audit', ref: '5-Week Public Objection Gate', artifact: 'Statutory Notice Readiness Log', why: 'Eliminate technical invalidation errors (Newspaper/Site notice dates) on Day-1 filing.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-02', pillar: 'L1', track: 'legal',
    title: 'Environmental Impact Assessment Report (EIAR) Scoping',
    desc: 'Lead multi-disciplinary noise, ecology, biodiversity, air dispersion, and traffic studies supporting planning submissions.',
    tags: ['EIA Directive', 'EIAR', 'Scoping'],
    docs: [
      { cat: 'Standard', title: 'EU EIA Directive 2014/52/EU & Irish EPA Guidelines on EIAR Information', ref: 'Dir. 2014/52/EU / EPA EIAR', artifact: 'EIAR Regulatory Framework', why: 'Satisfy statutory cumulative-impact rules covering nearby wind farms or hubs.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Multi-Volume EIAR Scoping Report (Noise, Air, Ecology, Hydrology, Traffic)', ref: 'EIAR Volumes 1-3', artifact: 'EIAR Environmental Report', why: 'Substantiate zero significant environmental effects across 12 specialist chapters.', kind: 'ref' },
      { cat: 'Template', title: 'Natura 2000 Appropriate Assessment (AA) Screening Report (Habitats Directive)', ref: 'Habitats Dir. 92/43/EEC', artifact: 'AA Natura 2000 Screening Pack', why: 'Prove zero pathway connectivity to Special Areas of Conservation (SAC/SPA).', kind: 'ref' },
      { cat: 'Audit', title: 'Public Submission & Prescribed Body (NPWS, TII, Uisce Eireann) Consultation Log', ref: 'Prescribed Body Consultations', artifact: 'Consultation Response Matrix', why: 'Reconcile every agency request for Further Information (FI) before planning vote.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-03', pillar: 'L1', track: 'legal',
    title: 'EPA Industrial Emissions Licence (IEL) Strategy',
    desc: 'Manage EPA thermal input thresholds for standby generation, stack heights, noise limits, and public objections.',
    tags: ['EPA IEL', '2010/75/EU'],
    docs: [
      { cat: 'Standard', title: 'EU Industrial Emissions Directive (2010/75/EU) & EPA Act (>50 MWth Threshold)', ref: 'EU IED 2010/75/EU', artifact: 'EPA IED Licensing Standard', why: 'Understand mandatory First Schedule Activity 2.1 licensing for standby genset farms.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Complete EPA Industrial Emissions Licence (IEL) Application Dossier', ref: 'Stage 2 EPA Filing', artifact: 'EPA IEL Application Dossier', why: 'Coordinate dual-track EIAR alignment between Council Planners and EPA Inspectors.', kind: 'planned' },
      { cat: 'Template', title: 'AERMOD Air Dispersion Modelling & Minimum Stack Height Justification (EPA AG4)', ref: 'EPA AG4 Dispersion Study', artifact: 'AERMOD Air Dispersion Study', why: 'Model worst-case hourly NO2 ground concentrations at nearest residential receptors.', kind: 'ref' },
      { cat: 'Audit', title: 'Continuous Noise Monitoring Limits & EPA Annual Environmental Report (AER)', ref: 'Compliance Noise & AER Plan', artifact: 'EPA Noise & AER Compliance Log', why: 'Verify cooling-tower tonal acoustic compliance during quiet night-time windows.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-04', pillar: 'L1', track: 'legal',
    title: 'Standby Emissions Abatement: SCR & HVO Biofuel Readiness',
    desc: 'Align backup genset specifications with NOx limits, selective catalytic reduction (SCR), and renewable HVO fuel tanks.',
    tags: ['HVO', 'SCR', 'Climate Act'],
    docs: [
      { cat: 'Standard', title: 'Large Combustion Plant (LCP) BREF Best Available Techniques & Climate Plan', ref: 'LCP BREF / IE Climate Act', artifact: 'Combustion BAT Standard Guide', why: 'Design backup generation compliant with strict Irish decarbonization policies.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Selective Catalytic Reduction (SCR) NOx Abatement & Stage-V Exhaust Spec', ref: 'EPA NOx Limits Spec', artifact: 'Genset SCR Abatement Spec', why: 'Ensure fast SCR catalyst light-off temperatures during short routine test runs.', kind: 'ref' },
      { cat: 'Template', title: 'Hydrotreated Vegetable Oil (HVO) Renewable Drop-In Fuel Compatibility Cert', ref: 'EN 15940 HVO Compatibility', artifact: 'HVO Fuel & Tank Compliance Cert', why: 'Slash lifecycle Scope 1 testing emissions via certified EN 15940 green diesel.', kind: 'ref' },
      { cat: 'Audit', title: 'Annual Standby Runtime Hour Cap (<18-50 Hrs) vs. Abatement Capex Memo', ref: 'Generator Testing Budget', artifact: 'Runtime vs. Abatement Audit', why: 'Prevent EPA test-hour breaches by balancing maintenance run scheduling and SCR ROI.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-05', pillar: 'L1', track: 'legal',
    title: 'SuDS Stormwater Attenuation & Class-1 Interceptor Design',
    desc: 'Comply with Irish drainage flood-risk regulations, bunded fuel storage, and underground attenuation volumes.',
    tags: ['SuDS', 'Flood Risk', 'Drainage'],
    docs: [
      { cat: 'Standard', title: 'Greater Dublin Strategic Drainage Study (GDSDS) & OPW Flood Risk Guidelines', ref: 'GDSDS / OPW Flood Guide', artifact: 'Irish SuDS & Flood Standard', why: 'Limit post-development stormwater runoff strictly to QBAR greenfield discharge rates.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Site-Specific Flood Risk Assessment (SSFRA) & Underground Attenuation Report', ref: '1-in-100 Yr + Climate +20%', artifact: 'SSFRA & Attenuation Report', why: 'Protect ground-floor MV switchrooms above extreme fluvial/pluvial flood levels.', kind: 'ref' },
      { cat: 'Template', title: 'Double-Skinned Bulk Fuel Bunding (110%) & Class-1 Petrol/Oil Interceptor Spec', ref: 'EPA Bunding Guidance', artifact: 'Fuel Bund & Interceptor Spec', why: 'Prevent hydrocarbon spills from entering local streams via automatic shut-off valves.', kind: 'ref' },
      { cat: 'Audit', title: 'Uisce Eireann / Local Authority Trade Effluent & Water Connection Audit', ref: 'Uisce Eireann Connection', artifact: 'Water & Effluent Permit Log', why: 'Guarantee municipal potable water backup capacity for adiabatic cooling peak days.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-06', pillar: 'L1', track: 'legal',
    title: 'Planning Judicial Review & Condition Discharge Risk Mitigation',
    desc: 'Structure pre-commencement planning condition compliance logs to prevent costly Judicial Review delays.',
    tags: ['Compliance', 'Judicial Review'],
    docs: [
      { cat: 'Standard', title: 'High Court Judicial Review Timelines (8-Week Window) & Condition Rules', ref: 'Planning Act Sec 50/50A', artifact: 'Judicial Review Law Reference', why: 'Schedule FNTP mobilization cleanly outside the statutory 8-week JR challenge risk.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Planning Permission Conditions Compliance Matrix (Pre-Start vs. In-Use)', ref: 'Condition Tracking Ledger', artifact: 'Planning Conditions Matrix', why: 'Assign every planning condition to CSA, MEP, Landscape, or Acoustics owners.', kind: 'ref' },
      { cat: 'Template', title: 'Legal Counsel Judicial Review Exposure Screening & Condition Sign-Off Pack', ref: 'Senior Counsel JR Memo', artifact: 'JR Risk & Discharge Sign-Off', why: 'Stress-test AA/EIA procedural robustness before committing irrevocable civil works.', kind: 'ref' },
      { cat: 'Audit', title: 'Pre-Commencement Discharge Evidence Dossier Submitted to Council Planners', ref: 'Written Agreement Gate', artifact: 'Pre-Start Discharge Audit File', why: 'Obtain formal written municipal sign-off before excavating a single foundation.', kind: 'ref' }
    ]
  },

  // Deferred Track: L2 - EirGrid, ESBN & CRU Grid Policy (EU-07..EU-12)
  {
    id: 'EU-07', pillar: 'L2', track: 'legal',
    title: 'EirGrid & ESB Networks Enduring Connection Policy (ECP)',
    desc: 'Navigate connection application stages, contestable vs. non-contestable substation works, and MIC offers.',
    tags: ['EirGrid', 'ESBN', 'ECP', 'MIC'],
    docs: [
      { cat: 'Standard', title: 'EirGrid Enduring Connection Policy (ECP) & ESB Networks Contestability Rules', ref: 'EirGrid ECP / ESBN Policy', artifact: 'Irish Grid Connection Standard', why: 'Master Ireland grid queue batch processing, deposits, and customer-build rules.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Grid Connection Milestones Integrated into Project Master Schedule', ref: 'Sheet 4. Ireland Statutory', artifact: 'DataCenter_36MW_EU_PIP.xlsx', why: 'Align TSO GIS substation civil works with transformer OEM delivery in P6.', kind: 'built' },
      { cat: 'Template', title: 'Maximum Import Capacity (MIC 36 MW) Connection Application & Offer Pack', ref: '36 MW MIC Connection Offer', artifact: 'Grid Connection Offer Pack', why: 'Track security bond postings, ramp-up MIC profiles, and contestable scope elections.', kind: 'planned' },
      { cat: 'Audit', title: 'Contestable (Customer Build) vs. Non-Contestable (TSO Shallow Works) Table', ref: 'TSO Demarcation Audit', artifact: 'Substation Demarcation Audit', why: 'Avoid interface disputes on 110kV GIS bay ownership, protection panels, and vesting.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-08', pillar: 'L2', track: 'legal',
    title: 'CRU Large Energy User (LEU) Direction & Constraints',
    desc: 'Structure grid applications in constrained zones (Greater Dublin) meeting Commission for Regulation of Utilities mandates.',
    tags: ['CRU', 'LEU Policy'],
    docs: [
      { cat: 'Standard', title: 'Commission for Regulation of Utilities (CRU) LEU Connection Policy Direction', ref: 'CRU LEU Policy Direction', artifact: 'CRU LEU Policy Standard', why: 'Satisfy Irish regulatory rules for constrained grid vs. self-dispatch locations.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Greater Dublin Constrained Grid Assessment & CRU Compliance Statement Memo', ref: 'Constraint Zone Justification', artifact: 'CRU LEU Compliance Statement', why: 'Prove regional grid support, flexible load compliance, and clean generation backing.', kind: 'ref' },
      { cat: 'Template', title: 'TSO Flexible Demand / Demand Turn-Down Protocol & SCADA Telemetry Spec', ref: 'System Operator Turn-Down', artifact: 'Flexible Demand Protocol', why: 'Specify automatic load-shedding signals between EirGrid NCC and site EPMS.', kind: 'ref' },
      { cat: 'Audit', title: 'Grid Congestion Risk & Regional Alternative Site Power Availability Briefing', ref: 'Dublin vs. Regional Audit', artifact: 'Grid Congestion Risk Briefing', why: 'Compare Dublin constrained lead times against Shannon/Cork regional capacity.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-09', pillar: 'L2', track: 'legal',
    title: 'On-Site Dispatchable Generation & Grid-Support BESS',
    desc: 'Integrate proximate/on-site dispatchable BESS or flexible generation matching Maximum Import Capacity conditions.',
    tags: ['BESS', 'Dispatchable', 'Microgrid'],
    docs: [
      { cat: 'Standard', title: 'EirGrid Grid Code Flexible Generation & DS3 System Services Requirements', ref: 'EirGrid Grid Code / DS3', artifact: 'TSO Microgrid & DS3 Standard', why: 'Understand Fast Frequency Response (FFR) and reserve rules for grid-coupled BESS.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Proximate / On-Site Dispatchable BESS Sizing & Autonomous Microgrid Study', ref: '36 MW Autonomy Concept', artifact: 'BESS & Microgrid Sizing Study', why: 'Size MWh storage capacity to ride through grid curtailment without touching diesel.', kind: 'ref' },
      { cat: 'Template', title: 'Zero-Export / Anti-Islanding Protection Relay & Switchgear Interlock Spec', ref: 'G99 / Grid Code Relays', artifact: 'Grid Interlock & Protection Spec', why: 'Guarantee safe directional power blocking so site BESS never back-feeds a dead line.', kind: 'ref' },
      { cat: 'Audit', title: 'Grid Peak Shaving & Curtailment Event Dispatch Autonomy Run-Time Model', ref: 'DUoS & Curtailment Audit', artifact: 'BESS Autonomy Runtime Model', why: 'Verify financial savings from Triad/DUoS peak shaving vs. battery degradation cycles.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-10', pillar: 'L2', track: 'legal',
    title: 'EU Demand Connection Code (2016/1388) RMS Modelling',
    desc: 'Coordinate dynamic RMS fault ride-through, harmonic distortion, and voltage stability studies with TSO engineers.',
    tags: ['EU 2016/1388', 'RMS Study'],
    docs: [
      { cat: 'Standard', title: 'Commission Regulation (EU) 2016/1388 Network Code on Demand Connection (DCC)', ref: 'Reg. (EU) 2016/1388', artifact: 'EU DCC Grid Code Standard', why: 'Master mandatory European TSO voltage/frequency ride-through rules for MV/HV loads.', kind: 'ref' },
      { cat: 'Deliverable', title: 'PSSE / PowerFactory Dynamic RMS Fault Ride-Through & Stability Study', ref: 'PSS/E / DIgSILENT Report', artifact: 'DCC Dynamic RMS Study Report', why: 'Simulate 110kV three-phase faults ensuring UPS/chiller VFD units stay stably online.', kind: 'ref' },
      { cat: 'Template', title: 'ENA G5/5 Harmonic Distortion, Voltage Flicker & Reactive Power Study', ref: 'ENA G5/5 / Power Quality', artifact: 'G5/5 Harmonic Study Pack', why: 'Confirm STATCOM or harmonic filter sizing keeps THD well inside utility thresholds.', kind: 'ref' },
      { cat: 'Audit', title: 'TSO Compliance Notification & Power Quality Verification Simulation Dossier', ref: 'Grid Code Model Sign-Off', artifact: 'TSO Simulation Audit File', why: 'Secure EirGrid technical model sign-off prior to GIS energisation window.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-11', pillar: 'L2', track: 'legal',
    title: 'Corporate Renewable PPAs & 24/7 Additionality',
    desc: 'Evaluate additionality clauses for new Irish wind/solar PPAs linked to data centre decarbonization.',
    tags: ['CPPA', 'REF', 'Additionality'],
    docs: [
      { cat: 'Standard', title: 'CRU LEU Renewable Additionality Criteria & EU Guarantees of Origin (GO) Rules', ref: 'CRU / EU RED III / EED REF', artifact: 'Renewable Additionality Std', why: 'Distinguish newly financed wind/solar PPAs from legacy unbundled REGO certificates.', kind: 'ref' },
      { cat: 'Deliverable', title: 'New-Build Irish Onshore/Offshore Wind & Solar Corporate PPA Term Sheet', ref: '10-15 Yr Sleeved / VPPA', artifact: 'Renewable CPPA Term Sheet', why: 'Structure strike price, shape risk, negative-pricing clauses, and credit support.', kind: 'ref' },
      { cat: 'Template', title: 'Hourly 24/7 Carbon-Free Energy Matching & REF Calculation Workbook', ref: 'Hourly CFE / REF Model', artifact: '24/7 CFE Matching Model', why: 'Compare annual 100% RE procurement vs. true hourly 24/7 grid carbon matching.', kind: 'ref' },
      { cat: 'Audit', title: 'Audited Annual Renewable Electricity Procurement Disclosure Statement', ref: 'Scope 2 & EED REF Audit', artifact: 'GO Retirement & REF Audit Log', why: 'Reconcile retired SEMOpx Guarantees of Origin for annual EU EED filing.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-12', pillar: 'L2', track: 'legal',
    title: '110kV GIS SF6-Free Switchgear & Substation Handover',
    desc: 'Manage TSO protection coordination, dual-feed GIS rings, and Operational Notification energisation milestones.',
    tags: ['110kV GIS', 'SF6-Free'],
    docs: [
      { cat: 'Standard', title: 'EU F-Gas Regulation (EU) 2024/573 Switchgear Phase-Out & EirGrid GIS Specs', ref: 'EU 2024/573 / TSO GIS Spec', artifact: 'SF6-Free GIS & TSO Standard', why: 'Comply with European SF6 bans in new MV/HV switchgear using clean-air/g3 tech.', kind: 'ref' },
      { cat: 'Deliverable', title: '110kV Dual-Feed SF6-Free GIS Switchgear Single-Line Diagram & Relay Schedule', ref: '110kV / 20kV Substation SLD', artifact: '110kV GIS Design Package', why: 'Coordinate differential protection zones, dual bus-sections, and earthing grids.', kind: 'ref' },
      { cat: 'Template', title: 'Contestable Substation Construction Compliance & ESBN Asset Vesting Deed', ref: 'TSO Asset Vesting Transfer', artifact: 'Substation Vesting Deed Pack', why: 'Hand legal title of TSO-side GIS bays smoothly to ESB Networks without delay.', kind: 'ref' },
      { cat: 'Audit', title: 'Interim (ION), Limited & Final Operational Notification (FON) Gate Pack', ref: 'EirGrid Energisation Gate', artifact: 'ION / FON Energisation Audit', why: 'Verify every protection test sheet and telemetry point for backfeed energisation.', kind: 'ref' }
    ]
  },

  // Deferred Track: L3 - BCAR & Statutory H&S (EU-13..EU-18)
  {
    id: 'EU-13', pillar: 'L3', track: 'legal',
    title: 'BCAR Roles: Design Certifier vs. Assigned Certifier',
    desc: 'Understand statutory liabilities under Ireland Building Control Amendment Regulations and BCMS portal submissions.',
    tags: ['BCAR 2014', 'BCMS'],
    docs: [
      { cat: 'Standard', title: 'Ireland Building Control (Amendment) Regulations 2014 (S.I. No. 9) & Code', ref: 'BCAR S.I. No. 9/2014', artifact: 'BCAR Statutory Code of Practice', why: 'Clarify statutory sign-off accountability across Owner, Design Certifier, and AC.', kind: 'ref' },
      { cat: 'Deliverable', title: 'BCMS Portal Commencement Notice, Design Cert & AC Undertaking Forms', ref: 'BCMS Portal Submission', artifact: 'BCMS Commencement & Cert Pack', why: 'Submit valid 14-to-28 day Commencement Notice online before legal site start.', kind: 'planned' },
      { cat: 'Template', title: 'Risk-Based Progressive Inspection Plan & Ancillary Certifier Schedule', ref: 'Structural / M&E / Fire Certs', artifact: 'BCAR Inspection Plan Matrix', why: 'Schedule periodic witness checks for piling, rebar, firestopping, and MEP supports.', kind: 'ref' },
      { cat: 'Audit', title: 'Client Statutory Liability & Professional Indemnity Insurance Verification Sheet', ref: 'PI Cover & Undertaking Audit', artifact: 'Certifier Insurance Audit Sheet', why: 'Confirm Design and Assigned Certifiers hold continuous run-off PI insurance limits.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-14', pillar: 'L3', track: 'legal',
    title: 'Fire Safety Certificate (FSC) & 7-Day Notice Risk',
    desc: 'Prepare Part B fire strategies (compartmentation, VESDA, water-mist) and evaluate commercial exposure of 7-Day Notices.',
    tags: ['Part B', 'FSC', '7-Day Notice'],
    docs: [
      { cat: 'Standard', title: 'Irish Building Regulations Technical Guidance Document (TGD) Part B Fire Safety', ref: 'TGD Part B (Fire Safety)', artifact: 'Part B Fire Regulations Guide', why: 'Meet escape travel distances, fire-wall compartment ratings, and smoke vent rules.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Fire Safety Engineering Strategy Report & Fire Safety Certificate (FSC) Pack', ref: 'Part B FSC Submission', artifact: 'Fire Safety Certificate Dossier', why: 'Obtain formal Fire Authority sign-off on high-density battery rooms and data halls.', kind: 'planned' },
      { cat: 'Template', title: 'Commercial Exposure Memo: Proceeding via 7-Day Notice vs. Waiting for FSC', ref: '7-Day Notice Risk Analysis', artifact: '7-Day Notice Exposure Memo', why: 'Quantify abortive steel/MEP rework risk if Chief Fire Officer later adds conditions.', kind: 'ref' },
      { cat: 'Audit', title: 'Firestopping Compartmentation, VESDA Detection & Li-Ion Suppression Audit', ref: 'UL/EN Penetration & VESDA', artifact: 'Firestopping & VESDA Audit Spec', why: 'Verify every cable/pipe penetration collar carries certified fire-rating tags pre-CCC.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-15', pillar: 'L3', track: 'legal',
    title: 'Disability Access Certificate (DAC - Part M)',
    desc: 'Ensure NOC, office, welfare, mantrap, and external access routes pass Part M compliance prior to CCC.',
    tags: ['DAC', 'Part M'],
    docs: [
      { cat: 'Standard', title: 'Irish Building Regulations Technical Guidance Document (TGD) Part M Access', ref: 'TGD Part M (Access & Use)', artifact: 'Part M Universal Access Std', why: 'Enforce inclusive accessible design across campus parking, lifts, NOC, and welfare.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Universal Access Design Statement & Disability Access Certificate (DAC) Pack', ref: 'DAC Application Drawings', artifact: 'DAC Application Dossier', why: 'Achieve statutory DAC grant prior to occupation to unblock final BCAR CCC filing.', kind: 'planned' },
      { cat: 'Template', title: 'External Approach, Mantrap, Lift, Sanitary & Refuge Compliance Checklist', ref: 'Part M Dimensional Schedule', artifact: 'Part M Compliance Checklist', why: 'Check ramp gradients, turning circles, door forces, and refuge intercoms at IFC.', kind: 'ref' },
      { cat: 'Audit', title: 'Pre-Completion Physical Accessibility Walkdown & Tactile / Signage Audit', ref: 'As-Built Part M Inspection', artifact: 'Pre-CCC Access Walkdown Audit', why: 'Measure installed thresholds, braille plates, and hearing loops before AC sign-off.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-16', pillar: 'L3', track: 'legal',
    title: 'S.I. No. 291/2013: Appointing PSDP & PSCS',
    desc: 'Fulfill legal client duties to appoint competent Project Supervisors for Design (PSDP) and Construction (PSCS).',
    tags: ['SI 291/2013', 'PSDP', 'PSCS'],
    docs: [
      { cat: 'Standard', title: 'Safety, Health and Welfare at Work (Construction) Regulations S.I. No. 291/2013', ref: 'S.I. No. 291/2013 Reg. 6', artifact: 'Irish Construction H&S Regs', why: 'Master non-delegable criminal client obligations for competence and early appointments.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Formal Client Written Appointments & Competence Questionnaires (PSDP & PSCS)', ref: 'Statutory Appointment Letters', artifact: 'PSDP / PSCS Appointment Pack', why: 'Execute signed statutory appointments before design concept freeze and site mobilization.', kind: 'ref' },
      { cat: 'Template', title: 'Pre-Tender Preliminary Safety & Health Plan (Prepared by PSDP)', ref: 'PSDP Preliminary Plan', artifact: 'Preliminary Safety & Health Plan', why: 'Communicate site hazards (HV cables, ground contamination, interfaces) to bidders.', kind: 'ref' },
      { cat: 'Audit', title: 'Construction Stage Safety & Health Plan & Client Competence Verification', ref: 'PSCS Live Plan Audit', artifact: 'Construction H&S Plan Audit', why: 'Verify PSCS maintains coordinated RAMS across simultaneous CSA, HV, and crane trades.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-17', pillar: 'L3', track: 'legal',
    title: 'HSA AF1 Notifications, Safe Pass & CSCS Audits',
    desc: 'Enforce HSA commencement notifications, crane/excavation CSCS tickets, and high-voltage site LOTO controls.',
    tags: ['HSA', 'AF1', 'LOTO'],
    docs: [
      { cat: 'Standard', title: 'Health and Safety Authority (HSA) Construction Notification (>30 Days / 500 PD)', ref: 'HSA Statutory Rules', artifact: 'HSA Construction Guidelines', why: 'Know statutory notification thresholds and mandatory site welfare gate postings.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Approved HSA Form AF1 & AF2 Commencement Submissions Posted at Site Gate', ref: 'HSA AF1 / AF2 Filing', artifact: 'HSA AF1 & AF2 Filing Record', why: 'Prevent HSA stop-work prohibition notices via timely pre-start regulatory filing.', kind: 'ref' },
      { cat: 'Template', title: 'Live Site Safe Pass, CSCS Plant Tickets, Heavy Lift & Excavation Permit Log', ref: 'PSCS Gate Control Log', artifact: 'Safe Pass & CSCS Audit Log', why: 'Enforce 100% ticket verification at biometric turnstiles for every crane and digger.', kind: 'ref' },
      { cat: 'Audit', title: 'Site Emergency Response Plan, Confined Space & Live-Working Prohibition Audit', ref: 'Zero Live-Work Enforcement', artifact: 'High-Risk Work Audit Protocol', why: 'Audit strict zero-live-working compliance and rescued-height readiness weekly.', kind: 'ref' }
    ]
  },
  {
    id: 'EU-18', pillar: 'L3', track: 'legal',
    title: 'Certificate of Compliance on Completion (CCC) & Safety File',
    desc: 'Consolidate ancillary certificates, progressive BCAR inspection logs, and PSDP statutory Safety File for opening.',
    tags: ['BCAR CCC', 'Safety File'],
    docs: [
      { cat: 'Standard', title: 'BCAR Completion Validation Guidelines & PSDP Statutory Safety File Rules', ref: 'BCAR / S.I. No. 291/2013', artifact: 'BCAR Completion & Safety Guide', why: 'Ensure illegal occupation never happens by gating RFS behind BCMS CCC validation.', kind: 'ref' },
      { cat: 'Deliverable', title: 'Final Certificate of Compliance on Completion (CCC) & Ancillary Bundle', ref: 'BCMS Completion Validation', artifact: 'BCAR CCC Submission Bundle', why: 'Collate contractor, structural, M&E, and fire ancillary certs into final AC filing.', kind: 'ref' },
      { cat: 'Template', title: 'Statutory Handover Safety File (Residual Hazards, Hazardous Materials, Access)', ref: 'PSDP Statutory Safety File', artifact: 'Statutory Handover Safety File', why: 'Transfer permanent safe-access roof/chiller maintenance notes to Day-1 FM teams.', kind: 'ref' },
      { cat: 'Audit', title: 'Local Authority Building Control Register Validation Before Occupation', ref: 'Public BCMS Register Gate', artifact: 'BCMS Validation Gate Audit', why: 'Confirm local authority places the CCC officially on the statutory public register.', kind: 'ref' }
    ]
  }
];

const PORTFOLIO_ITEMS = [
  { id: 'PORT-01', track: 'pm', doc: 'DC36-EU Master Level 4 P6 Schedule', standard: 'DCMA-14 6/6, RIBA 0-7, EN 50600', artifact: 'DataCenter_36MW_EU_Ireland.xer (141 Tasks / 48 Crit)', status: 'Complete' },
  { id: 'PORT-02', track: 'pm', doc: 'Project Charter (Ireland / EU Standard)', standard: 'Governance, RACI, EUR Stage-Gates', artifact: 'DataCenter_36MW_EU_Project_Charter.xlsx (6 Tabs)', status: 'Complete' },
  { id: 'PORT-03', track: 'pm', doc: 'Project Implementation Plan (PIP)', standard: '141-Task Gantt, NEC4/FIDIC, L1-L5', artifact: 'DataCenter_36MW_EU_PIP.xlsx (6 Tabs)', status: 'Complete' },
  { id: 'PORT-04', track: 'pm', doc: 'Feasibility, EN 50600 BoD & Controls', standard: 'EUR 10-Yr DCF, EED KPIs, EVM, Risks', artifact: 'DataCenter_36MW_EU_PreNTP_Controls.xlsx (5 Tabs)', status: 'Complete' },
  { id: 'PORT-05', track: 'pm', doc: 'ISO 19650 CDE Folder & Document Register', standard: 'BS EN ISO 19650, Suitability S0-A7', artifact: 'Master_Document_Register_DC36EU.xlsx (Pending Approval)', status: 'Planned' },
  { id: 'PORT-06', track: 'legal', doc: 'EirGrid ECP / EPA IEL / BCAR FSC Pack', standard: 'Planning Act, EPA Act, Part B FSC', artifact: 'Stage 2 Statutory Permitting Dossier', status: 'Planned' },
  { id: 'PORT-07', track: 'pm', doc: 'CIBSE Code M / ASHRAE L1-L5 Master Cx Plan', standard: 'L3-L5 Scripts & 36MW IST Playbook', artifact: 'Stage 6 Commissioning & OR&T Pack', status: 'Planned' }
];

const INTERVIEW_QA = [
  {
    id: 'IQ-01',
    track: 'pm',
    tag: 'PM Phase 1-2 | Controls',
    q: 'How do you structure an end-to-end 36 MW Data Centre delivery roadmap from Initiation through Handover?',
    a: 'Structure delivery across six gated RIBA 0-7 phases: (1) Initiation & FID: Charter, RACI, EN 50600 Class 3 BoD, and 10-Yr EUR DCF; (2) Planning: Level 4 P6 WBS with DCMA-14 6/6 logic and ISO 19650 CDE; (3) Procurement: OFCI reservation for HV/UPS/chillers and NEC4/FIDIC packaging; (4) Execution: EVM (CPI/SPI), QRA Monte Carlo contingencies, and ITP QA; (5) Commissioning: CIBSE L1-L5 culminating in 48h 36 MW IST; (6) Handover: OR&T Black-Hat drills, ISO 19650 AIM, and DLP closeout.'
  },
  {
    id: 'IQ-02',
    track: 'pm',
    tag: 'PM Phase 2 | P6 DCMA-14',
    q: 'How do you defend a Primavera P6 schedule in a Western EPCm review?',
    a: 'Prove DCMA-14 6/6 compliance programmatically: 100% closed logic loops (only NTP start and COD finish open), zero arbitrary lags replacing explicit tasks, zero hard constraints masking true float, zero negative float, and a realistic 30-45% critical path density spanning CSA, OFCI long-leads, MEP halls, 36 MW 48h IST, and RFS closeout.'
  },
  {
    id: 'IQ-03',
    track: 'pm',
    tag: 'PM Phase 3 | NEC4 vs FIDIC',
    q: 'Compare NEC4 ECC Option A/C and FIDIC Silver/Yellow Book for European Hyperscale builds.',
    a: 'NEC4 Option A (lump sum) or Option C (target cost with pain/gainshare) is widely used in Ireland/UK because Early Warning Notices and rolling Accepted Programmes force real-time collaborative mitigation before claims crystalize. FIDIC Silver/Yellow suits turnkey EPC/D&B packages across continental Europe where the owner wants higher single-point completion and performance risk transfer.'
  },
  {
    id: 'IQ-04',
    track: 'pm',
    tag: 'PM Phase 4 | EVM & Risk',
    q: 'A mechanical package shows SPI = 0.84 and CPI = 0.91 mid-construction. What recovery actions do you execute?',
    a: 'First isolate whether SPI drift sits on the longest path or non-critical pipe racks. Validate physical earned progress against ITP milestones rather than billed values, authorize targeted parallelization (re-sequencing Hall 1-2 chilled water headers or pre-fabricated valve skids), re-baseline only via CRB governance, and track weekly variance recovery to EAC against management reserve.'
  },
  {
    id: 'IQ-05',
    track: 'pm',
    tag: 'PM Phase 5-6 | Cx & OR&T',
    q: 'Walk through Commissioning Levels 1 to 5 and Operational Readiness (OR&T) prior to Day-1 Go-Live.',
    a: 'L1 covers witnessed OEM FAT (HV GIS, UPS, chillers, BESS); L2 verifies site delivery and installation QA; L3 executes static Megger, secondary injection, BSRIA closed-loop flushing, and LOTO readiness; L4 tests dynamic step-loads, SCR/HVO genset sync, and BMS/EPMS sequences; L5 runs 48-hour 36 MW load-bank IST and pull-the-plug blackout failovers. Handover finishes with OR&T Black-Hat drills, EOP/MOP/SOP validation, ISO 19650 AIM, and punch-list burn-down.'
  },
  {
    id: 'IQ-06',
    track: 'pm',
    tag: 'PM Phase 1 | EN 50600',
    q: 'What is the difference between Uptime Institute Tier III and EN 50600 Availability Class 3?',
    a: 'Uptime Tier III focuses on topology and concurrent maintainability (N+1/2N paths certified via TCDD/TCCF audits). I.S. EN 50600 is the broader European standard series covering Availability Classes (1-4), physical security Protection Classes (EN 50600-2-5), environmental control, and standardized KPI metrics (PUE/WUE/ERF/REF in EN 50600-4) required by EU lenders and EED directives.'
  },
  {
    id: 'IQ-07',
    track: 'legal',
    tag: 'Legal (Later) | Grid & CRU',
    q: 'How does Ireland CRU Large Energy User policy impact a 36 MW Data Centre schedule and Capex?',
    a: 'Under EirGrid/CRU rules in constrained regions like Dublin, connecting a 36 MW Maximum Import Capacity (MIC) load typically mandates on-site or proximate dispatchable generation/BESS capacity plus verifiable additionality from new renewable PPAs, placing dynamic RMS grid-code studies and BESS long-lead procurement early in Stage 1-2.'
  },
  {
    id: 'IQ-08',
    track: 'legal',
    tag: 'Legal (Later) | BCAR',
    q: 'Explain the roles of Design Certifier, Assigned Certifier, and the risk of a 7-Day Notice under Irish BCAR.',
    a: 'BCAR splits statutory accountability: the Design Certifier certifies Building Regulations compliance at design stage, while the Assigned Certifier inspects works progressively and lodges the Certificate of Compliance on Completion (CCC) on BCMS before occupancy. A 7-Day Notice lets works start before Fire Safety Certificate (FSC) grant, exposing the developer to abortive rework if refused or heavily conditioned.'
  },
  {
    id: 'IQ-09',
    track: 'legal',
    tag: 'Legal (Later) | SI 291/2013',
    q: 'What are the client legal obligations under Construction Regulations 2013 (PSDP & PSCS)?',
    a: 'Whenever more than one contractor is involved, the client must appoint a competent Project Supervisor for the Design Process (PSDP) before design starts and a Project Supervisor for the Construction Stage (PSCS) before site works begin, notify the HSA via Form AF1 (>30 workdays or 500 person-days), verify Safe Pass/CSCS cards, and obtain the statutory Safety File at handover.'
  }
];

function computeDefaultModuleEntry() {
  return { status: 'todo', hours: 0, confidence: 3, notes: '' };
}

function defaultState() {
  const modules = {};
  CURRICULUM.forEach(m => {
    modules[m.id] = computeDefaultModuleEntry();
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

function migrateLegacyModules(savedModules) {
  const merged = { ...(savedModules || {}) };
  Object.entries(LEGACY_ID_MAP).forEach(([oldId, newId]) => {
    const oldEntry = merged[oldId];
    if (oldEntry && !merged[newId]) {
      merged[newId] = { ...oldEntry };
    }
    delete merged[oldId];
  });
  return merged;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const def = defaultState();
    const migratedModules = migrateLegacyModules(parsed.modules);
    return {
      modules: { ...def.modules, ...migratedModules },
      portfolio: { ...def.portfolio, ...(parsed.portfolio || {}) },
      interviews: { ...def.interviews, ...(parsed.interviews || {}) }
    };
  } catch {
    return defaultState();
  }
}

const HISTORY_STORAGE_KEY = 'dc36_eu_history_v1';
const PROFILE_STORAGE_KEY = 'dc36_eu_profile_id_v1';

let state = loadState();
let historyEvents = loadLocalHistory();

const trackFilters = {
  pm: { pillar: 'ALL', status: 'ALL', search: '' },
  legal: { pillar: 'ALL', status: 'ALL', search: '' }
};
let portfolioTrackFilter = 'ALL';
let interviewTrackFilter = 'pm';
let historyTrackFilter = 'ALL';
let historyTypeFilter = 'ALL';
let cloudSchemaReady = false;

function getProfileId() {
  const saved = (localStorage.getItem(PROFILE_STORAGE_KEY) || 'dc36-quan-eu').trim();
  return saved.length >= 3 ? saved : 'dc36-quan-eu';
}

function loadLocalHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalHistory() {
  if (historyEvents.length > 500) {
    historyEvents = historyEvents.slice(0, 500);
  }
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyEvents));
}

function setSyncUiState(mode, label) {
  const pill = document.getElementById('sync-pill');
  const banner = document.getElementById('history-setup-banner');
  if (pill) {
    pill.classList.remove('is-connected', 'is-pending');
    if (mode === 'connected') pill.classList.add('is-connected');
    else if (mode === 'schema_missing') pill.classList.add('is-pending');
    pill.textContent = label;
  }
  cloudSchemaReady = mode === 'connected';
  if (banner) {
    banner.style.display = mode === 'schema_missing' ? 'flex' : 'none';
  }
}

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

function recordHistoryEvent(evt) {
  const pm = getTrackMetrics('pm');
  const legal = getTrackMetrics('legal');
  const totalHrs = Number((pm.hours + legal.hours).toFixed(2));
  const row = {
    profile_id: getProfileId(),
    event_type: evt.event_type,
    entity_id: evt.entity_id,
    entity_title: evt.entity_title || '',
    track: evt.track || 'pm',
    old_status: evt.old_status || null,
    new_status: evt.new_status || null,
    hours_delta: Number((evt.hours_delta || 0).toFixed(2)),
    total_hours: totalHrs,
    old_confidence: evt.old_confidence ?? null,
    new_confidence: evt.new_confidence ?? null,
    pm_readiness_pct: pm.readiness,
    legal_readiness_pct: legal.readiness,
    summary: evt.summary || '',
    created_at: new Date().toISOString()
  };

  historyEvents.unshift(row);
  saveLocalHistory();
  renderHistory();

  if (window.DC36_Supabase && cloudSchemaReady) {
    window.DC36_Supabase.appendHistory(row).then(res => {
      if (!res.ok) setSyncUiState('offline', 'Cloud Sync Degraded');
    });
  }
}

function syncModuleRow(moduleId) {
  if (!window.DC36_Supabase || !cloudSchemaReady) return;
  const meta = CURRICULUM.find(m => m.id === moduleId);
  const st = state.modules[moduleId];
  if (!meta || !st) return;
  window.DC36_Supabase.upsertModules([{
    profile_id: getProfileId(),
    module_id: moduleId,
    track: meta.track,
    pillar: meta.pillar,
    status: st.status,
    hours: Number(st.hours) || 0,
    confidence: Number(st.confidence) || 3,
    notes: st.notes || '',
    updated_at: new Date().toISOString()
  }]).then(res => {
    if (res.ok) setSyncUiState('connected', 'Supabase Synced');
  });
}

function syncPortfolioRow(itemId) {
  if (!window.DC36_Supabase || !cloudSchemaReady) return;
  const meta = PORTFOLIO_ITEMS.find(p => p.id === itemId);
  const st = state.portfolio[itemId];
  if (!meta || !st) return;
  window.DC36_Supabase.upsertPortfolio([{
    profile_id: getProfileId(),
    item_id: itemId,
    track: meta.track,
    status: st.status,
    notes: st.linkNote || '',
    updated_at: new Date().toISOString()
  }]);
}

function syncInterviewRow(qaId) {
  if (!window.DC36_Supabase || !cloudSchemaReady) return;
  const meta = INTERVIEW_QA.find(q => q.id === qaId);
  const st = state.interviews[qaId];
  if (!meta || !st) return;
  window.DC36_Supabase.upsertInterviews([{
    profile_id: getProfileId(),
    qa_id: qaId,
    track: meta.track,
    ready: Boolean(st.ready),
    updated_at: new Date().toISOString()
  }]);
}

async function pullFromSupabase(silent) {
  if (!window.DC36_Supabase) return;
  const check = await window.DC36_Supabase.checkConnection();
  setSyncUiState(check.state, check.state === 'connected' ? 'Supabase Connected' : (check.state === 'schema_missing' ? 'SQL Schema Pending' : 'Offline (Local Save)'));
  if (check.state !== 'connected') {
    if (!silent) showToast(check.detail);
    return;
  }

  const res = await window.DC36_Supabase.pullAll(getProfileId());
  if (!res.ok) {
    if (!silent) showToast('Cloud pull failed; using local cache');
    return;
  }

  const hasRemoteData = res.modules.length > 0 || res.portfolio.length > 0 || res.interviews.length > 0 || res.history.length > 0;
  if (hasRemoteData) {
    res.modules.forEach(r => {
      if (state.modules[r.module_id]) {
        state.modules[r.module_id] = {
          status: r.status || 'todo',
          hours: Number(r.hours) || 0,
          confidence: Number(r.confidence) || 3,
          notes: r.notes || ''
        };
      }
    });
    res.portfolio.forEach(r => {
      if (state.portfolio[r.item_id]) {
        state.portfolio[r.item_id] = { status: r.status || 'Planned', linkNote: r.notes || '' };
      }
    });
    res.interviews.forEach(r => {
      if (state.interviews[r.qa_id]) {
        state.interviews[r.qa_id] = { ready: Boolean(r.ready) };
      }
    });
    if (res.history.length > 0) {
      historyEvents = res.history;
      saveLocalHistory();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderTrackSection('pm');
    renderTrackSection('legal');
    renderPortfolio();
    renderInterviews();
    renderHistory();
    updateMetrics();
    setSyncUiState('connected', `Supabase Synced (${res.modules.length} mods)`);
    if (!silent) showToast(`Pulled ${res.modules.length} modules and ${res.history.length} history events`);
  } else if (!silent) {
    showToast('Cloud profile empty; click Push Local to Cloud to upload');
  }
}

async function pushAllToSupabase() {
  if (!window.DC36_Supabase) return;
  const check = await window.DC36_Supabase.checkConnection();
  setSyncUiState(check.state, check.state === 'connected' ? 'Syncing...' : 'SQL Schema Pending');
  if (check.state !== 'connected') {
    showToast(check.detail);
    return;
  }

  const pid = getProfileId();
  const now = new Date().toISOString();
  const modRows = CURRICULUM.map(m => {
    const s = state.modules[m.id] || computeDefaultModuleEntry();
    return {
      profile_id: pid,
      module_id: m.id,
      track: m.track,
      pillar: m.pillar,
      status: s.status,
      hours: Number(s.hours) || 0,
      confidence: Number(s.confidence) || 3,
      notes: s.notes || '',
      updated_at: now
    };
  });
  const portRows = PORTFOLIO_ITEMS.map(p => {
    const s = state.portfolio[p.id] || { status: p.status, linkNote: '' };
    return { profile_id: pid, item_id: p.id, track: p.track, status: s.status, notes: s.linkNote || '', updated_at: now };
  });
  const iqRows = INTERVIEW_QA.map(q => {
    const s = state.interviews[q.id] || { ready: false };
    return { profile_id: pid, qa_id: q.id, track: q.track, ready: Boolean(s.ready), updated_at: now };
  });

  const [mRes, pRes, iRes] = await Promise.all([
    window.DC36_Supabase.upsertModules(modRows),
    window.DC36_Supabase.upsertPortfolio(portRows),
    window.DC36_Supabase.upsertInterviews(iqRows)
  ]);

  if (mRes.ok && pRes.ok && iRes.ok) {
    setSyncUiState('connected', `Supabase Synced (${modRows.length} mods)`);
    recordHistoryEvent({
      event_type: 'cloud_sync',
      entity_id: pid,
      entity_title: 'Full Portfolio Cloud Backup',
      track: 'system',
      summary: `Synced ${modRows.length} modules, ${portRows.length} deliverables, and ${iqRows.length} Q&As to Supabase`
    });
    showToast('All local progress pushed to Supabase');
  } else {
    setSyncUiState('offline', 'Cloud Push Error');
    showToast('Cloud push failed; check console or RLS');
  }
}

function getTrackMetrics(trackName) {
  const items = CURRICULUM.filter(m => m.track === trackName);
  let mastered = 0;
  let inProg = 0;
  let hours = 0;
  let confSum = 0;
  items.forEach(m => {
    const entry = state.modules[m.id] || computeDefaultModuleEntry();
    if (entry.status === 'mastered') mastered += 1;
    else if (entry.status === 'progress') inProg += 1;
    hours += Number(entry.hours) || 0;
    confSum += Number(entry.confidence) || 0;
  });
  const count = items.length || 1;
  const readiness = Math.round(((mastered + inProg * 0.45) / count) * 100);
  const avgConf = (confSum / count).toFixed(1);
  return { count: items.length, mastered, inProg, hours, readiness, avgConf };
}

function updateMetrics() {
  const pm = getTrackMetrics('pm');
  const legal = getTrackMetrics('legal');
  const totalHrs = pm.hours + legal.hours;

  document.getElementById('kpi-readiness').textContent = `${pm.readiness}%`;
  document.getElementById('kpi-readiness-sub').textContent = `PM Lifecycle Active (${pm.count}) | Legal Later: ${legal.readiness}%`;
  document.getElementById('kpi-completed').textContent = `${pm.mastered} / ${pm.count}`;
  document.getElementById('kpi-completed-sub').textContent = `${pm.inProg} in progress | Legal ${legal.mastered}/${legal.count}`;
  document.getElementById('kpi-hours').textContent = `${totalHrs.toFixed(1)}h`;
  document.getElementById('kpi-hours-sub').textContent = `${pm.hours.toFixed(1)}h PM / ${legal.hours.toFixed(1)}h Legal`;
  document.getElementById('kpi-confidence').textContent = `${pm.avgConf} / 5.0`;
  document.getElementById('wave-fill').style.width = `${pm.readiness}%`;
  document.getElementById('wave-label').textContent = `${pm.readiness}% End-to-End Project Management Readiness`;

  renderPmStepper();
  renderAnalytics();
}

function renderPmStepper() {
  const el = document.getElementById('pm-stepper');
  const pmPillars = PILLARS.filter(p => p.track === 'pm');
  el.innerHTML = pmPillars.map(p => {
    const items = CURRICULUM.filter(m => m.pillar === p.id);
    const done = items.filter(m => state.modules[m.id]?.status === 'mastered').length;
    const prog = items.filter(m => state.modules[m.id]?.status === 'progress').length;
    const pct = Math.round(((done + prog * 0.45) / items.length) * 100);
    const isSel = trackFilters.pm.pillar === p.id;
    return `
      <button type="button" class="stage-step ${isSel ? 'selected' : ''}" data-phase="${p.id}">
        <div class="stage-step-top">
          <span>${p.code}</span>
          <span class="mono">${pct}%</span>
        </div>
        <div class="stage-step-name">${p.shortName.replace(/^\d+\.\s*/, '')}</div>
        <div class="stage-step-meta mono">${done}/${items.length} Mastered</div>
        <div class="stage-step-bar"><div class="stage-step-bar-fill" style="width:${pct}%"></div></div>
      </button>
    `;
  }).join('');

  el.querySelectorAll('.stage-step').forEach(btn => {
    btn.onclick = () => {
      const targetPhase = btn.dataset.phase;
      trackFilters.pm.pillar = trackFilters.pm.pillar === targetPhase ? 'ALL' : targetPhase;
      itemDocsExpanded.pm = null;
      renderTrackSection('pm');
    };
  });
}

function renderTrackFilters(trackName, pillarChipsId, statusChipsId) {
  const filter = trackFilters[trackName];
  const trackPillars = PILLARS.filter(p => p.track === trackName);
  const trackTotal = CURRICULUM.filter(m => m.track === trackName).length;
  const allLabel = trackName === 'pm' ? `All 6 Phases (${trackTotal})` : `All Legal Pillars (${trackTotal})`;

  const pRow = document.getElementById(pillarChipsId);
  pRow.innerHTML = [`<button type="button" class="chip ${filter.pillar === 'ALL' ? 'selected' : ''}" data-pillar="ALL">${allLabel}</button>`]
    .concat(trackPillars.map(p => `<button type="button" class="chip ${filter.pillar === p.id ? 'selected' : ''}" data-pillar="${p.id}">${p.shortName}</button>`))
    .join('');

  pRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      filter.pillar = btn.dataset.pillar;
      itemDocsExpanded[trackName] = null;
      renderTrackSection(trackName);
    };
  });

  const sRow = document.getElementById(statusChipsId);
  const sOpts = [['ALL', 'All Status'], ['todo', 'To Study'], ['progress', 'In Progress'], ['mastered', 'Mastered']];
  sRow.innerHTML = sOpts.map(([k, l]) => `<button type="button" class="chip ${filter.status === k ? 'selected' : ''}" data-status="${k}">${l}</button>`).join('');
  sRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      filter.status = btn.dataset.status;
      renderTrackSection(trackName);
    };
  });
}

function renderSectionDocsHtml(pillarId) {
  const docs = SECTION_DOCS[pillarId] || [];
  if (!docs.length) return '';
  const rows = docs.map(d => {
    const kindCls = d.kind === 'built' ? 'doc-pill-built' : (d.kind === 'planned' ? 'doc-pill-planned' : 'doc-pill-ref');
    const kindLbl = d.kind === 'built' ? 'Built (DC36-EU)' : (d.kind === 'planned' ? 'Planned Next' : 'Industry Std');
    return `
      <tr>
        <td class="mono"><strong>${d.code}</strong></td>
        <td><strong>${d.title}</strong></td>
        <td>${d.std}</td>
        <td class="mono">${d.artifact}</td>
        <td><span class="doc-pill ${kindCls}">${kindLbl}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <details class="section-docs-drawer" open>
      <summary>
        <span>Related Documents &amp; Deliverables (${docs.length})</span>
        <span class="section-docs-hint">Click to collapse / expand</span>
      </summary>
      <div class="section-docs-list">
        <table class="docs-mini-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Document Title &amp; Deliverable</th>
              <th>Standard / Framework</th>
              <th>Artifact / Reference</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </details>
  `;
}

const itemDocsExpanded = { pm: null, legal: null };

function resolveExpandDocs(trackName) {
  const override = itemDocsExpanded[trackName];
  if (override !== null && override !== undefined) return Boolean(override);
  const f = trackFilters[trackName];
  return f.pillar !== 'ALL' || f.search.trim().length > 0;
}

function docCatClass(cat) {
  const c = (cat || '').toLowerCase();
  if (c === 'standard') return 'doc-cat-standard';
  if (c === 'deliverable') return 'doc-cat-deliverable';
  if (c === 'template') return 'doc-cat-template';
  return 'doc-cat-audit';
}

function renderModuleDocsDrawerHtml(m, forceOpen) {
  const docs = m.docs || [];
  if (!docs.length) return '';
  const itemsHtml = docs.map(d => {
    const kindCls = d.kind === 'built' ? 'doc-pill-built' : (d.kind === 'planned' ? 'doc-pill-planned' : 'doc-pill-ref');
    const kindLbl = d.kind === 'built' ? 'Built (DC36-EU)' : (d.kind === 'planned' ? 'Planned Next' : 'Guide / Std');
    const catLbl = d.cat || 'Guide';
    return `
      <li class="module-doc-item">
        <div class="module-doc-main">
          <div class="module-doc-head">
            <span class="doc-cat-badge ${docCatClass(catLbl)}">${catLbl}</span>
            <div class="module-doc-title">${d.title}</div>
          </div>
          ${d.why ? `<div class="module-doc-why">${d.why}</div>` : ''}
        </div>
        <div class="module-doc-meta">
          <span class="mono">${d.artifact} (${d.ref})</span>
          <span class="doc-pill ${kindCls}">${kindLbl}</span>
        </div>
      </li>
    `;
  }).join('');

  return `
    <details class="module-docs-drawer" data-id="${m.id}" ${forceOpen ? 'open' : ''}>
      <summary>
        <span>Related Documents (${docs.length})</span>
        <span class="section-docs-hint hint-view">View</span>
        <span class="section-docs-hint hint-hide">Hide</span>
      </summary>
      <ul class="module-docs-list">${itemsHtml}</ul>
    </details>
  `;
}

function renderModuleCardHtml(m, forceDocsOpen) {
  const st = state.modules[m.id] || computeDefaultModuleEntry();
  const cardCls = st.status === 'mastered' ? 'is-mastered' : (st.status === 'progress' ? 'is-progress' : '');
  const selCls = st.status === 'mastered' ? 'status-mastered' : (st.status === 'progress' ? 'status-progress' : '');
  const pObj = PILLARS.find(p => p.id === m.pillar);
  const pLabel = pObj ? pObj.shortName : m.pillar;
  const confBtns = [1, 2, 3, 4, 5].map(v =>
    `<button type="button" class="conf-btn ${Number(st.confidence) === v ? 'active' : ''}" data-id="${m.id}" data-conf="${v}">${v}</button>`
  ).join('');

  return `
    <article class="module-card ${cardCls}">
      <div class="module-card-top">
        <div class="module-card-info">
          <div class="card-head">
            <span class="badge-code mono">${m.id}</span>
            <span class="badge-pillar">${pLabel}</span>
          </div>
          <h3 class="card-title">${m.title}</h3>
          <p class="card-desc">${m.desc}</p>
          <div class="std-tags">${m.tags.map(t => `<span class="std-tag mono">${t}</span>`).join('')}</div>
        </div>
        <div class="module-card-controls">
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
          <textarea class="notes-area" data-id="${m.id}" placeholder="Study notes, project artifacts, interview anchor...">${st.notes || ''}</textarea>
        </div>
      </div>
      ${renderModuleDocsDrawerHtml(m, forceDocsOpen)}
    </article>
  `;
}

function renderTrackModules(trackName, gridId) {
  const grid = document.getElementById(gridId);
  const filter = trackFilters[trackName];
  const q = filter.search.trim().toLowerCase();
  const trackPillars = PILLARS.filter(p => p.track === trackName && (filter.pillar === 'ALL' || p.id === filter.pillar));
  const expandDocs = resolveExpandDocs(trackName);
  const toggleBtn = document.getElementById(trackName === 'pm' ? 'btn-pm-toggle-docs' : 'btn-legal-toggle-docs');
  if (toggleBtn) toggleBtn.textContent = expandDocs ? 'Collapse All Item Docs' : 'Expand All Item Docs';

  const sectionsHtml = trackPillars.map(p => {
    const allSectionMods = CURRICULUM.filter(m => m.pillar === p.id);
    const docsText = (SECTION_DOCS[p.id] || []).map(d => `${d.code} ${d.title} ${d.std} ${d.artifact}`).join(' ').toLowerCase();
    const docsMatch = q && docsText.includes(q);

    const matchingMods = allSectionMods.filter(m => {
      const st = state.modules[m.id]?.status || 'todo';
      if (filter.status !== 'ALL' && st !== filter.status) return false;
      if (q && !docsMatch) {
        const modDocsText = (m.docs || []).map(d => `${d.cat || ''} ${d.title} ${d.why || ''} ${d.ref} ${d.artifact}`).join(' ');
        const hay = `${m.id} ${m.title} ${m.desc} ${m.tags.join(' ')} ${modDocsText}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!matchingMods.length) return '';

    const done = allSectionMods.filter(m => state.modules[m.id]?.status === 'mastered').length;
    const prog = allSectionMods.filter(m => state.modules[m.id]?.status === 'progress').length;
    const pct = Math.round(((done + prog * 0.45) / allSectionMods.length) * 100);
    const hrs = allSectionMods.reduce((s, m) => s + (Number(state.modules[m.id]?.hours) || 0), 0);
    const badgeCls = trackName === 'pm' ? 'track-badge-pm' : 'track-badge-legal';

    return `
      <section class="section-block" aria-label="${p.name}">
        <div class="section-header-bar">
          <div class="section-title-group">
            <span class="track-badge ${badgeCls}">${p.code}</span>
            <h3 class="section-title">${p.name}</h3>
          </div>
          <div class="section-stats mono">
            <span>${done}/${allSectionMods.length} Mastered</span>
            <span>|</span>
            <span>${hrs.toFixed(1)}h</span>
            <span>|</span>
            <span>${pct}%</span>
          </div>
        </div>
        ${renderSectionDocsHtml(p.id)}
        <div class="cards-grid">
          ${matchingMods.map(m => renderModuleCardHtml(m, expandDocs)).join('')}
        </div>
      </section>
    `;
  }).filter(Boolean).join('');

  if (!sectionsHtml) {
    grid.innerHTML = `<div class="panel-card"><strong>No matching modules or documents.</strong> Clear phase/pillar or status filters to view all items in this track.</div>`;
    return;
  }

  grid.innerHTML = sectionsHtml;

  grid.querySelectorAll('.status-select').forEach(sel => {
    sel.onchange = () => {
      const id = sel.dataset.id;
      const meta = CURRICULUM.find(m => m.id === id) || { title: id, track: trackName };
      const oldStatus = state.modules[id].status;
      const newStatus = sel.value;
      state.modules[id].status = newStatus;
      saveState(`Updated ${id}`);
      syncModuleRow(id);
      recordHistoryEvent({
        event_type: 'status_change',
        entity_id: id,
        entity_title: meta.title,
        track: meta.track,
        old_status: oldStatus,
        new_status: newStatus,
        summary: `Module status changed: ${oldStatus} -> ${newStatus}`
      });
      renderTrackModules(trackName, gridId);
    };
  });
  grid.querySelectorAll('.hours-input').forEach(inp => {
    inp.onchange = () => {
      const id = inp.dataset.id;
      const meta = CURRICULUM.find(m => m.id === id) || { title: id, track: trackName };
      const oldHrs = Number(state.modules[id].hours) || 0;
      const newHrs = Math.max(0, parseFloat(inp.value) || 0);
      const delta = Number((newHrs - oldHrs).toFixed(2));
      state.modules[id].hours = newHrs;
      saveState('Saved study hours');
      syncModuleRow(id);
      if (delta !== 0) {
        recordHistoryEvent({
          event_type: 'hours_logged',
          entity_id: id,
          entity_title: meta.title,
          track: meta.track,
          hours_delta: delta,
          summary: `Logged ${delta >= 0 ? '+' : ''}${delta.toFixed(1)}h (module total: ${newHrs.toFixed(1)}h)`
        });
      }
    };
  });
  grid.querySelectorAll('.conf-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const meta = CURRICULUM.find(m => m.id === id) || { title: id, track: trackName };
      const oldConf = Number(state.modules[id].confidence) || 3;
      const newConf = Number(btn.dataset.conf);
      state.modules[id].confidence = newConf;
      saveState(`Confidence set to ${newConf}/5`);
      syncModuleRow(id);
      if (oldConf !== newConf) {
        recordHistoryEvent({
          event_type: 'confidence_update',
          entity_id: id,
          entity_title: meta.title,
          track: meta.track,
          old_confidence: oldConf,
          new_confidence: newConf,
          summary: `Self-confidence updated from ${oldConf}/5 to ${newConf}/5`
        });
      }
      renderTrackModules(trackName, gridId);
    };
  });
  grid.querySelectorAll('.notes-area').forEach(ta => {
    ta.onchange = () => {
      const id = ta.dataset.id;
      const meta = CURRICULUM.find(m => m.id === id) || { title: id, track: trackName };
      state.modules[id].notes = ta.value;
      saveState('Notes saved');
      syncModuleRow(id);
      recordHistoryEvent({
        event_type: 'note_update',
        entity_id: id,
        entity_title: meta.title,
        track: meta.track,
        summary: `Updated study note (${ta.value.trim().slice(0, 72)}${ta.value.trim().length > 72 ? '...' : ''})`
      });
    };
  });
}

function renderTrackSection(trackName) {
  if (trackName === 'pm') {
    renderPmStepper();
    renderTrackFilters('pm', 'pm-phase-chips', 'pm-status-chips');
    renderTrackModules('pm', 'pm-modules-grid');
  } else {
    renderTrackFilters('legal', 'legal-pillar-chips', 'legal-status-chips');
    renderTrackModules('legal', 'legal-modules-grid');
  }
}

function renderPillarBarGroup(pillars) {
  return pillars.map(p => {
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
}

function renderAnalytics() {
  const el = document.getElementById('pillar-bars');
  const pmBars = renderPillarBarGroup(PILLARS.filter(p => p.track === 'pm'));
  const legalBars = renderPillarBarGroup(PILLARS.filter(p => p.track === 'legal'));

  el.innerHTML = `
    <div class="analytics-section-label">Active Track: End-to-End Project Management Lifecycle</div>
    ${pmBars}
    <div class="analytics-section-label deferred">Deferred Track: Irish &amp; EU Legal / Permitting (Revisit Later)</div>
    ${legalBars}
  `;

  const pm = getTrackMetrics('pm');
  const legal = getTrackMetrics('legal');
  const pDone = PORTFOLIO_ITEMS.filter(x => (state.portfolio[x.id]?.status || x.status) === 'Complete').length;
  const iReadyPm = INTERVIEW_QA.filter(q => q.track === 'pm' && state.interviews[q.id]?.ready).length;
  const iTotalPm = INTERVIEW_QA.filter(q => q.track === 'pm').length;

  document.getElementById('analytics-summary').innerHTML = `
    <p><strong>Active PM Lifecycle Readiness:</strong> ${pm.readiness}% (${pm.mastered}/${pm.count} mastered, ${pm.hours.toFixed(1)}h logged)</p>
    <p><strong>Deferred Legal &amp; Permitting:</strong> ${legal.readiness}% (${legal.mastered}/${legal.count} mastered, parked for later)</p>
    <p><strong>Portfolio Completeness:</strong> ${pDone} / ${PORTFOLIO_ITEMS.length} EU/Ireland Deliverables Completed</p>
    <p><strong>PM Interview Drill Readiness:</strong> ${iReadyPm} / ${iTotalPm} Core PM Scenarios Rehearsed</p>
    <p><strong>Active P6 Benchmark:</strong> <span class="mono">DataCenter_36MW_EU_Ireland.xer</span> (141 tasks, DCMA-14 6/6, 835 workdays)</p>
    <p><strong>PM Lifecycle Frameworks:</strong> RIBA 0-7, PMI/PMBOK, Primavera P6 DCMA-14, NEC4 ECC &amp; FIDIC, EVM/QRA, ISO 19650 CDE/AIM, CIBSE L1-L5.</p>
  `;
}

function renderPortfolio() {
  const chipRow = document.getElementById('portfolio-filter-chips');
  const opts = [['ALL', 'All Deliverables (7)'], ['pm', 'PM Lifecycle (6)'], ['legal', 'Legal & Permitting (Later) (1)']];
  chipRow.innerHTML = opts.map(([k, l]) => `<button type="button" class="chip ${portfolioTrackFilter === k ? 'selected' : ''}" data-track="${k}">${l}</button>`).join('');
  chipRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      portfolioTrackFilter = btn.dataset.track;
      renderPortfolio();
    };
  });

  const tbody = document.getElementById('portfolio-tbody');
  const items = PORTFOLIO_ITEMS.filter(x => portfolioTrackFilter === 'ALL' || x.track === portfolioTrackFilter);
  tbody.innerHTML = items.map(item => {
    const cur = state.portfolio[item.id] || { status: item.status, linkNote: '' };
    const pillCls = cur.status === 'Complete' ? 'pill-done' : 'pill-planned';
    const trackBadge = item.track === 'pm'
      ? '<span class="track-badge track-badge-pm">PM Lifecycle</span>'
      : '<span class="track-badge track-badge-legal">Legal (Later)</span>';
    return `
      <tr>
        <td class="mono"><strong>${item.id}</strong></td>
        <td>${trackBadge}</td>
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
      const id = sel.dataset.id;
      const meta = PORTFOLIO_ITEMS.find(p => p.id === id) || { doc: id, track: 'pm' };
      const oldStatus = state.portfolio[id]?.status || meta.status;
      const newStatus = sel.value;
      state.portfolio[id] = { ...(state.portfolio[id] || {}), status: newStatus };
      saveState(`Portfolio ${id} updated`);
      syncPortfolioRow(id);
      recordHistoryEvent({
        event_type: 'portfolio_update',
        entity_id: id,
        entity_title: meta.doc,
        track: meta.track,
        old_status: oldStatus,
        new_status: newStatus,
        summary: `Deliverable ${id}: ${oldStatus} -> ${newStatus}`
      });
      renderPortfolio();
    };
  });
}

function renderInterviews() {
  const chipRow = document.getElementById('interview-filter-chips');
  const opts = [['pm', 'PM Lifecycle Questions (6)'], ['ALL', 'All Questions (9)'], ['legal', 'Legal & Permitting [Later] (3)']];
  chipRow.innerHTML = opts.map(([k, l]) => `<button type="button" class="chip ${interviewTrackFilter === k ? 'selected' : ''}" data-track="${k}">${l}</button>`).join('');
  chipRow.querySelectorAll('.chip').forEach(btn => {
    btn.onclick = () => {
      interviewTrackFilter = btn.dataset.track;
      renderInterviews();
    };
  });

  const wrap = document.getElementById('interview-list');
  const items = INTERVIEW_QA.filter(q => interviewTrackFilter === 'ALL' || q.track === interviewTrackFilter);
  wrap.innerHTML = items.map(item => {
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
      const meta = INTERVIEW_QA.find(q => q.id === id) || { q: id, track: 'pm' };
      const nextReady = !state.interviews[id]?.ready;
      state.interviews[id] = { ready: nextReady };
      saveState('Interview status saved');
      syncInterviewRow(id);
      recordHistoryEvent({
        event_type: 'interview_update',
        entity_id: id,
        entity_title: meta.q.slice(0, 64),
        track: meta.track,
        old_status: nextReady ? 'unrehearsed' : 'rehearsed',
        new_status: nextReady ? 'rehearsed' : 'unrehearsed',
        summary: `Interview scenario ${id} marked ${nextReady ? 'Rehearsed' : 'Needs Review'}`
      });
      renderInterviews();
    };
  });
}

function renderHistorySparkline(eventsDesc) {
  const svg = document.getElementById('history-sparkline');
  const meta = document.getElementById('sparkline-meta');
  if (!svg) return;

  const chrono = eventsDesc.slice().reverse();
  if (!chrono.length) {
    svg.innerHTML = `<text x="20" y="70" fill="#44474f" font-size="13" font-family="Plus Jakarta Sans, sans-serif">No history points yet. Update any module status, study hours, or click Log Study Check-In.</text>`;
    if (meta) meta.textContent = 'Waiting for first study event';
    return;
  }

  const W = 800;
  const H = 130;
  const padX = 24;
  const padY = 16;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const pts = chrono.map((ev, idx) => {
    const x = chrono.length === 1 ? padX + innerW / 2 : padX + (idx / (chrono.length - 1)) * innerW;
    const pct = Math.max(0, Math.min(100, Number(ev.pm_readiness_pct) || 0));
    const y = padY + innerH - (pct / 100) * innerH;
    return { x, y, pct };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${(H - padY).toFixed(1)} L${pts[0].x.toFixed(1)},${(H - padY).toFixed(1)} Z`;
  const dots = pts.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="#0b57d0" />`).join('');

  svg.innerHTML = `
    <line x1="${padX}" y1="${padY}" x2="${W - padX}" y2="${padY}" stroke="#e3e9f4" stroke-dasharray="4 4" />
    <line x1="${padX}" y1="${H / 2}" x2="${W - padX}" y2="${H / 2}" stroke="#e3e9f4" stroke-dasharray="4 4" />
    <line x1="${padX}" y1="${H - padY}" x2="${W - padX}" y2="${H - padY}" stroke="#c4c7c5" />
    <path d="${areaPath}" fill="rgba(11, 87, 208, 0.12)" />
    <path d="${linePath}" fill="none" stroke="#0b57d0" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
    ${dots}
  `;
  if (meta) {
    meta.textContent = `${chrono.length} events | Start ${pts[0].pct}% -> Latest ${pts[pts.length - 1].pct}%`;
  }
}

function renderHistory() {
  const nowMs = Date.now();
  const weekAgoMs = nowMs - 7 * 24 * 3600 * 1000;
  const recentWeek = historyEvents.filter(e => new Date(e.created_at).getTime() >= weekAgoMs);
  const hours7 = recentWeek.reduce((s, e) => s + Math.max(0, Number(e.hours_delta) || 0), 0);
  const mastered7 = recentWeek.filter(e => e.event_type === 'status_change' && e.new_status === 'mastered').length;
  const pmNow = getTrackMetrics('pm').readiness;

  const evEl = document.getElementById('hist-kpi-events');
  if (evEl) evEl.textContent = String(historyEvents.length);
  const h7El = document.getElementById('hist-kpi-hours7');
  if (h7El) h7El.textContent = `${hours7.toFixed(1)}h`;
  const m7El = document.getElementById('hist-kpi-mastered7');
  if (m7El) m7El.textContent = String(mastered7);
  const rEl = document.getElementById('hist-kpi-readiness');
  if (rEl) rEl.textContent = `${pmNow}%`;

  renderHistorySparkline(historyEvents);

  const trackRow = document.getElementById('history-track-chips');
  if (trackRow) {
    const tOpts = [['ALL', 'All Tracks'], ['pm', 'PM Lifecycle'], ['legal', 'Legal (Later)'], ['system', 'System / Sync']];
    trackRow.innerHTML = tOpts.map(([k, l]) => `<button type="button" class="chip ${historyTrackFilter === k ? 'selected' : ''}" data-htrack="${k}">${l}</button>`).join('');
    trackRow.querySelectorAll('.chip').forEach(b => {
      b.onclick = () => { historyTrackFilter = b.dataset.htrack; renderHistory(); };
    });
  }

  const typeRow = document.getElementById('history-type-chips');
  if (typeRow) {
    const eOpts = [
      ['ALL', 'All Events'],
      ['status_change', 'Status Changes'],
      ['hours_logged', 'Hours Logged'],
      ['confidence_update', 'Confidence'],
      ['note_update', 'Notes'],
      ['manual_checkin', 'Check-Ins']
    ];
    typeRow.innerHTML = eOpts.map(([k, l]) => `<button type="button" class="chip ${historyTypeFilter === k ? 'selected' : ''}" data-htype="${k}">${l}</button>`).join('');
    typeRow.querySelectorAll('.chip').forEach(b => {
      b.onclick = () => { historyTypeFilter = b.dataset.htype; renderHistory(); };
    });
  }

  const tbody = document.getElementById('history-tbody');
  if (!tbody) return;
  const filtered = historyEvents.filter(e => {
    if (historyTrackFilter !== 'ALL' && e.track !== historyTrackFilter) return false;
    if (historyTypeFilter !== 'ALL' && e.event_type !== historyTypeFilter) return false;
    return true;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8">No matching history events recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.slice(0, 150).map(e => {
    const ts = e.created_at ? new Date(e.created_at).toLocaleString() : '-';
    const trans = e.old_status || e.new_status
      ? `${e.old_status || '-'} -> ${e.new_status || '-'}`
      : (e.new_confidence ? `Conf ${e.old_confidence || '-'} -> ${e.new_confidence}/5` : '-');
    const hrsDelta = Number(e.hours_delta) ? `${Number(e.hours_delta) > 0 ? '+' : ''}${Number(e.hours_delta).toFixed(1)}h` : '-';
    const trackBadge = e.track === 'pm'
      ? '<span class="track-badge track-badge-pm">PM</span>'
      : '<span class="track-badge track-badge-legal">' + (e.track === 'legal' ? 'Legal' : 'System') + '</span>';
    return `
      <tr>
        <td class="mono">${ts}</td>
        <td>${trackBadge}</td>
        <td class="mono">${e.event_type}</td>
        <td><strong>${e.entity_id}</strong> ${e.entity_title ? '- ' + e.entity_title : ''}</td>
        <td class="mono">${trans}</td>
        <td class="mono">${hrsDelta}</td>
        <td class="mono">${Number(e.pm_readiness_pct || 0).toFixed(0)}%</td>
        <td>${e.summary || ''}</td>
      </tr>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const profileInput = document.getElementById('profile-id-input');
  if (profileInput) {
    profileInput.value = getProfileId();
    profileInput.onchange = () => {
      const clean = profileInput.value.trim();
      if (clean.length < 3) {
        showToast('Profile Key must be at least 3 characters');
        profileInput.value = getProfileId();
        return;
      }
      localStorage.setItem(PROFILE_STORAGE_KEY, clean);
      showToast(`Switched profile key to ${clean}`);
      pullFromSupabase(false);
    };
  }

  document.getElementById('btn-sync-pull').onclick = () => pullFromSupabase(false);
  document.getElementById('btn-sync-push').onclick = () => pushAllToSupabase();
  document.getElementById('btn-checkin').onclick = () => {
    const note = prompt('Optional note for this Study Check-In snapshot (hours/goals/milestone):', 'Daily PM lifecycle study session');
    if (note === null) return;
    recordHistoryEvent({
      event_type: 'manual_checkin',
      entity_id: 'CHECKIN',
      entity_title: 'Manual Study Check-In',
      track: 'pm',
      summary: note.trim() || 'Manual readiness checkpoint logged'
    });
    showToast('Study check-in logged to history');
  };

  const copySqlBtn = document.getElementById('btn-copy-sql');
  if (copySqlBtn) {
    copySqlBtn.onclick = async () => {
      try {
        const res = await fetch('../supabase/dc36_learning_schema.sql');
        if (!res.ok) throw new Error('Fetch failed');
        const sqlText = await res.text();
        await navigator.clipboard.writeText(sqlText);
        showToast('Copied SQL schema to clipboard');
      } catch {
        showToast('Open supabase/dc36_learning_schema.sql in repo and paste into Supabase SQL Editor');
      }
    };
  }

  document.getElementById('btn-export-history-csv').onclick = () => {
    const hdr = ['created_at', 'profile_id', 'track', 'event_type', 'entity_id', 'entity_title', 'old_status', 'new_status', 'hours_delta', 'total_hours', 'pm_readiness_pct', 'summary'];
    const rows = [hdr.join(',')].concat(historyEvents.map(e => hdr.map(k => `"${String(e[k] ?? '').replace(/"/g, '""')}"`).join(',')));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dc36_eu_study_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Exported study history CSV');
  };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    };
  });

  document.getElementById('pm-search-box').addEventListener('input', e => {
    trackFilters.pm.search = e.target.value;
    itemDocsExpanded.pm = null;
    renderTrackModules('pm', 'pm-modules-grid');
  });

  document.getElementById('legal-search-box').addEventListener('input', e => {
    trackFilters.legal.search = e.target.value;
    itemDocsExpanded.legal = null;
    renderTrackModules('legal', 'legal-modules-grid');
  });

  document.getElementById('btn-pm-toggle-docs').onclick = () => {
    itemDocsExpanded.pm = !resolveExpandDocs('pm');
    renderTrackModules('pm', 'pm-modules-grid');
  };

  document.getElementById('btn-legal-toggle-docs').onclick = () => {
    itemDocsExpanded.legal = !resolveExpandDocs('legal');
    renderTrackModules('legal', 'legal-modules-grid');
  };

  document.getElementById('btn-export').onclick = () => {
    const payload = { profileId: getProfileId(), state, historyEvents };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dc36_eu_learning_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Exported JSON progress + history backup');
  };

  document.getElementById('file-import').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        const rawState = imported.state || imported;
        const def = defaultState();
        state = {
          modules: { ...def.modules, ...migrateLegacyModules(rawState.modules) },
          portfolio: { ...def.portfolio, ...(rawState.portfolio || {}) },
          interviews: { ...def.interviews, ...(rawState.interviews || {}) }
        };
        if (Array.isArray(imported.historyEvents)) {
          historyEvents = imported.historyEvents;
          saveLocalHistory();
        }
        saveState('Imported progress backup');
        renderTrackSection('pm');
        renderTrackSection('legal');
        renderPortfolio();
        renderInterviews();
        renderHistory();
      } catch {
        showToast('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  document.getElementById('btn-reset').onclick = () => {
    if (!confirm('Reset all local learning progress, hours, notes, confidence scores, and local history cache?')) return;
    state = defaultState();
    historyEvents = [];
    saveLocalHistory();
    saveState('Local progress reset');
    renderTrackSection('pm');
    renderTrackSection('legal');
    renderPortfolio();
    renderInterviews();
    renderHistory();
  };

  renderTrackSection('pm');
  renderTrackSection('legal');
  renderPortfolio();
  renderInterviews();
  renderHistory();
  updateMetrics();
  pullFromSupabase(true);
});
