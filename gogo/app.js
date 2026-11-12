// Ireland & EU Data Centre Development Mastery Tracker (DC36-EU)
// Primary Track: End-to-End Project Management Lifecycle | Deferred Track: Legal & Permitting
const STORAGE_KEY = 'dc36_eu_ireland_tracker_v1';
const LOCAL_REPO_ROOT = 'G:\\My Drive\\7. AI\\DataCenter_EU_Ireland\\';

async function copyLocalRepoPath(relPath, label) {
  const full = `${LOCAL_REPO_ROOT}${relPath}`;
  try {
    await navigator.clipboard.writeText(full);
    showToast(`Copied path: ${label || relPath}`);
  } catch {
    showToast(full);
  }
}

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
    { code: 'PM2-DOC-05', title: 'BIM Exchange Info Requirements (EIR), BEP & Master Document Register', std: 'BS EN ISO 19650 CDE', artifact: 'Master_Document_Register_DC36EU_Rev.001.xlsx', kind: 'built' }
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
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI',
    docs: [
      { cat: 'Standard', title: 'PMI PMBOK Project Charter Guideline & RIBA Stage 0-1 Client Brief', ref: 'PMBOK / RIBA Stage 0-1', artifact: 'PM01_Doc1_Standard_Charter_Governance_Standard_Rev.001.docx', why: 'Understand sponsor authority, business objectives, and formal project authorization.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI\\PM01_Doc1_Standard_Charter_Governance_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Executive Project Charter Document (Objectives, 36 MW Scope & PM Authority)', ref: 'Sheet 1. Charter Summary', artifact: 'PM01_Doc2_Deliverable_Project_Charter_Summary_Master_Rev.001.xlsx', why: 'Benchmark real DC36-EU charter scope boundaries, KPIs, and stage-gate mandates.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI\\PM01_Doc2_Deliverable_Project_Charter_Summary_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Multi-Party Governance Framework & RACI Responsibility Matrix', ref: 'Sheet 2. Governance & RACI', artifact: 'PM01_Doc3_Template_Governance_RACI_Charter_Master_Rev.001.xlsx', why: 'Map Responsible, Accountable, Consulted, and Informed roles across Sponsor, EPCm, and CxA.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI\\PM01_Doc3_Template_Governance_RACI_Charter_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Steering Committee Terms of Reference, Quorum & Escalation Charter', ref: 'DC36EU_SteerCo_DoA_Quorum_Audit.xlsx', artifact: 'PM01_Doc4_Audit_SteerCo_ToR_Escalation_Charter_Rev.001.docx', why: 'Define executive voting thresholds, financial sign-off limits, and escalation paths.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-01_Project_Charter_Governance_RACI\\PM01_Doc4_Audit_SteerCo_ToR_Escalation_Charter_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-02', pillar: 'PM1', track: 'pm',
    title: 'Site Selection Due Diligence & Pre-Feasibility Scoring',
    desc: 'Evaluate land parcels across power proximity, fibre diversity, geotechnical conditions, flood zones, and buildability constraints.',
    tags: ['Feasibility', 'Due Diligence', 'Scoring'],
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence',
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-2-1 Building Construction & Site Environmental Risk Guideline', ref: 'EN 50600-2-1 Siting', artifact: 'PM02_Doc1_Standard_Site_Siting_Standard_Guide_Rev.001.docx', why: 'Learn mandatory physical security setbacks, flood immunity, and external hazard rules.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence\\PM02_Doc1_Standard_Site_Siting_Standard_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Multi-Criteria Site Selection & Land Acquisition Due Diligence Report', ref: 'Power / Fibre / Zoning', artifact: 'PM02_Doc2_Deliverable_Site_Selection_Feasibility_Report_Rev.001.docx', why: 'Synthesize grid substation distance, dual-path dark fibre, and zoning viability for FID.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence\\PM02_Doc2_Deliverable_Site_Selection_Feasibility_Report_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Weighted Land Parcel Comparison Scorecard (Grid, Geotech, Flood, Cost)', ref: 'Weighted Decision Model', artifact: 'PM02_Doc3_Template_Site_Scoring_Matrix_Workbook_Rev.001.xlsx', why: 'Quantify site trade-offs objectively across capex penalties and schedule risk.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence\\PM02_Doc3_Template_Site_Scoring_Matrix_Workbook_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Pre-Purchase Technical Due Diligence Checklist (Boreholes, Phase 1 ESA, OPW Flood)', ref: 'Eurocode 7 / OPW Flood Maps', artifact: 'PM02_Doc4_Audit_Land_DD_Verification_Checklist_Rev.001.xlsx', why: 'Eliminate fatal subsurface, contamination, UXO, or fluvial flood blockers before closing.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-02_Site_Selection_Due_Diligence\\PM02_Doc4_Audit_Land_DD_Verification_Checklist_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-03', pillar: 'PM1', track: 'pm',
    title: 'Basis of Design (BoD) & I.S. EN 50600 Class 3 Translation',
    desc: 'Translate tenant SLAs and Uptime Tier III maintainability into EN 50600 Availability Classes, PUE targets, and free-cooling envelope.',
    tags: ['EN 50600', 'BoD', 'ISO 22237'],
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3',
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-1 / -2-2 / -2-3 & ISO/IEC 22237 Availability Class 3 Series', ref: 'EN 50600 / ISO 22237', artifact: 'PM03_Doc1_Standard_Availability_Class_3_Standard_Rev.001.docx', why: 'Master European concurrent maintainability topology across power, cooling, and security.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3\\PM03_Doc1_Standard_Availability_Class_3_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: '36 MW Campus Basis of Design (N+1/2N Topology, Density, SLAs & Redundancy)', ref: 'Sheet 3. EN 50600 & EED', artifact: 'PM03_Doc2_Deliverable_EN50600_BoD_Controls_Master_Rev.001.xlsx', why: 'Translate 36 MW IT load and kW/rack targets into distributable redundant MEP specs.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3\\PM03_Doc2_Deliverable_EN50600_BoD_Controls_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Scope Boundaries, Client vs. Contractor Battery Limits & Exclusions Matrix', ref: 'Sheet 4. Scope Boundaries', artifact: 'PM03_Doc3_Template_Scope_Boundaries_Charter_Master_Rev.001.xlsx', why: 'Prevent scope gaps between core shell, white-space fit-out, and utility tie-ins.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3\\PM03_Doc3_Template_Scope_Boundaries_Charter_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Atlantic Free-Cooling Psychrometric Study & Low-GWP Chiller (EU F-Gas) Review', ref: 'ASHRAE TC 9.9 / EU 2024/573', artifact: 'PM03_Doc4_Audit_Mechanical_Concept_Design_Audit_Rev.001.docx', why: 'Validate annualized PUE <= 1.22 using Irish ambient cooling hours and compliant refrigerants.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-03_Basis_of_Design_EN50600_Class3\\PM03_Doc4_Audit_Mechanical_Concept_Design_Audit_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-04', pillar: 'PM1', track: 'pm',
    title: 'EUR Capex Modelling, 10-Yr DCF, NPV/IRR & Sensitivity',
    desc: 'Build EUR/MW Capex baselines, colocation yield curves, PUE/energy sensitivity tables, and institutional investment metrics.',
    tags: ['EUR DCF', 'Capex/MW', 'NPV/IRR'],
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR',
    docs: [
      { cat: 'Standard', title: 'RICS New Rules of Measurement (NRM1) & Institutional Valuation Standard', ref: 'RICS NRM1 / Real Estate Std', artifact: 'PM04_Doc1_Standard_RICS_Capex_Cost_Standard_Rev.001.docx', why: 'Structure institutional elemental cost planning benchmarked in EUR per MW of IT load.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR\\PM04_Doc1_Standard_RICS_Capex_Cost_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: '36 MW Capex Cost Plan (Land, Grid, CSA, MEP, OFCI, Soft Costs & Contingency)', ref: 'Sheet 6. Stage-Gate Budget', artifact: 'PM04_Doc2_Deliverable_StageGate_Capex_Budget_Charter_Master_Rev.001.xlsx', why: 'Break down total development capex across stage-gate funding tranches.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR\\PM04_Doc2_Deliverable_StageGate_Capex_Budget_Charter_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: '10-Year EUR Discounted Cashflow Model (IRR, NPV, Payback & EUR/kW Yield)', ref: 'Sheet 2. EUR 10-Yr DCF', artifact: 'PM04_Doc3_Template_EUR_10Yr_DCF_Model_Master_Rev.001.xlsx', why: 'Model multi-year leasing ramp, WACC discounting, opex recovery, and terminal exit value.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR\\PM04_Doc3_Template_EUR_10Yr_DCF_Model_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Sensitivity & Downside Stress Test Matrix (Power Tariff, PUE & Capex +/-10%)', ref: 'IC Investment Stress Test', artifact: 'PM04_Doc4_Audit_Financial_Sensitivity_Matrix_Rev.001.xlsx', why: 'Quantify IRR resilience against construction inflation, grid delays, and energy spikes.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-04_EUR_Capex_10Yr_DCF_NPV_IRR\\PM04_Doc4_Audit_Financial_Sensitivity_Matrix_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-05', pillar: 'PM1', track: 'pm',
    title: 'RIBA 0-7 Stage-Gate Framework & Pre-NTP FID Package',
    desc: 'Structure formal Stage-Gate entry/exit criteria leading to Final Investment Decision (FID) and Full Notice to Proceed (NTP).',
    tags: ['RIBA 0-7', 'Stage Gates', 'FID'],
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID',
    docs: [
      { cat: 'Standard', title: 'RIBA Plan of Work 2020 (Stages 0-7) Mission-Critical Data Centre Overlay', ref: 'RIBA Plan of Work 2020', artifact: 'PM05_Doc1_Standard_RIBA_0_7_Framework_Guide_Rev.001.docx', why: 'Align design freezes, statutory consents, and site construction gates cleanly.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID\\PM05_Doc1_Standard_RIBA_0_7_Framework_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Final Investment Decision (FID) Board Paper & Pre-NTP Executive Dossier', ref: 'Sheet 1. Executive Summary', artifact: 'PM05_Doc2_Deliverable_FID_PreNTP_Dossier_Controls_Master_Rev.001.xlsx', why: 'Consolidate commercial returns, schedule baseline, and risk readiness for board sign-off.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID\\PM05_Doc2_Deliverable_FID_PreNTP_Dossier_Controls_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Limited Notice to Proceed (LNTP) vs. Full NTP Release Authorization Memo', ref: 'Pre-NTP Commercial Release', artifact: 'PM05_Doc3_Template_LNTP_FNTP_Authorization_Memo_Rev.001.docx', why: 'Commit early enabling works or OEM slots before unconditional full contract execution.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID\\PM05_Doc3_Template_LNTP_FNTP_Authorization_Memo_Rev.001.docx', kind: 'built' },
      { cat: 'Audit', title: 'Stage-Gate 0 to 7 Mandatory Exit Criteria & Readiness Verification Checklist', ref: 'Gate Review Governance', artifact: 'PM05_Doc4_Audit_Stage_Gate_Exit_Checklist_Rev.001.xlsx', why: 'Verify design maturity, permit status, and funded contingency before unlocking next tranche.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-05_RIBA_Stage_Gate_PreNTP_FID\\PM05_Doc4_Audit_Stage_Gate_Exit_Checklist_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-06', pillar: 'PM1', track: 'pm',
    title: 'Stakeholder Register, Engagement & Escalation Plan',
    desc: 'Map internal sponsors, hyperscale tenants, EPCm leads, local communities, and utility/certifier touchpoints across phases.',
    tags: ['Stakeholders', 'Comms Plan'],
    folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation',
    docs: [
      { cat: 'Standard', title: 'ISO 21502 Guidance on Project Management — Stakeholder Engagement', ref: 'ISO 21502 / PMI Stakeholder', artifact: 'PM06_Doc1_Standard_Stakeholder_Mgmt_Standard_Rev.001.docx', why: 'Apply structured identification, cadence tailoring, and alignment feedback loops.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation\\PM06_Doc1_Standard_Stakeholder_Mgmt_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Project Communications Management Plan & Weekly/Monthly Cadence Matrix', ref: 'Reporting Governance', artifact: 'PM06_Doc2_Deliverable_Comms_Management_Plan_Rev.001.docx', why: 'Establish predictable reporting rhythm across lenders, tenants, TSO, and site teams.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation\\PM06_Doc2_Deliverable_Comms_Management_Plan_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Stakeholder Register & Power/Interest Matrix (Investors, Tenants, TSO, Public)', ref: 'Sheet 3. Stakeholders', artifact: 'PM06_Doc3_Template_Stakeholder_Register_Charter_Master_Rev.001.xlsx', why: 'Classify influence vs. interest for every internal executive and Irish statutory body.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation\\PM06_Doc3_Template_Stakeholder_Register_Charter_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Executive Issue Escalation Flowchart & Decision Turnaround SLA Log', ref: 'Decision Turnaround SLA', artifact: 'PM06_Doc4_Audit_Escalation_Protocol_Log_Rev.001.xlsx', why: 'Enforce time-boxed escalation paths so critical-path blockers never stall in committees.', folder: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation', localPath: 'Phase_1_Initiation_Charter_RIBA_0_1\\PM-06_Stakeholder_Engagement_Escalation\\PM06_Doc4_Audit_Escalation_Protocol_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },

  // PM2: Phase 2 - Planning, WBS & Master Schedule (RIBA 2-3)
  {
    id: 'PM-07', pillar: 'PM2', track: 'pm',
    title: 'Work Breakdown Structure (WBS) & Dictionary Architecture',
    desc: 'Decompose 36 MW campus scope into controllable CSA, HV/MV Power, Mechanical, BMS/EPMS, and Cx deliverables mapped to cost accounts.',
    tags: ['WBS', 'Scope Baseline'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS',
    docs: [
      { cat: 'Standard', title: 'PMI Practice Standard for WBS & Uniclass 2015 Data Centre Coding', ref: 'PMI WBS / Uniclass 2015', artifact: 'PM07_Doc1_Standard_WBS_Coding_Standard_Rev.001.docx', why: 'Structure 100% scope hierarchy rules and standardized asset classification codes.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS\\PM07_Doc1_Standard_WBS_Coding_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Master WBS Dictionary (Scope Statements, Deliverables & Cost Accounts)', ref: 'Sheet 2. WBS Dictionary', artifact: 'PM07_Doc2_Deliverable_Master_WBS_Dictionary_PIP_Master_Rev.001.xlsx', why: 'Link every physical campus element (CSA, HV, MEP, BMS, Cx) to a budget control account.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS\\PM07_Doc2_Deliverable_Master_WBS_Dictionary_PIP_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'WBS-to-OBS Responsibility Assignment Matrix (RAM) Across Package Teams', ref: 'PMBOK / ISO 21502 RAM', artifact: 'PM07_Doc3_Template_WBS_to_OBS_RAM_Workbook_Rev.001.xlsx', why: 'Assign single-point package ownership between Owner, EPCm, and trade contractors.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS\\PM07_Doc3_Template_WBS_to_OBS_RAM_Workbook_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Multi-Level (L1-L4) Campus WBS Completeness & Control Account Check', ref: '100% Rule Verification', artifact: 'PM07_Doc4_Audit_WBS_Integrity_Audit_Sheet_Rev.001.xlsx', why: 'Confirm zero unallocated scope, zero duplicate cost buckets, and clean P6 parity.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-07_WBS_Dictionary_OBS\\PM07_Doc4_Audit_WBS_Integrity_Audit_Sheet_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-08', pillar: 'PM2', track: 'pm',
    title: 'Primavera P6 Level 4 Logic Network & Critical Path',
    desc: 'Build deterministic FS/SS logic across Pre-Construction, OFCI, CSA Shell, MEP Halls 1-4, Energisation, and L1-L5 Commissioning.',
    tags: ['Primavera P6', 'Level 4', 'CPM'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path',
    docs: [
      { cat: 'Standard', title: 'AACE Recommended Practice 27R-03 (Schedule Classification & CPM Method)', ref: 'AACE 27R-03 / 38R-06', artifact: 'PM08_Doc1_Standard_CPM_Scheduling_Standard_Rev.001.docx', why: 'Differentiate Level 1 executive timelines from Level 4 logic-driven execution networks.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path\\PM08_Doc1_Standard_CPM_Scheduling_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Master Level 4 Primavera P6 File (141 Tasks, 209 Links, 48 Critical Tasks)', ref: 'EU Calendar (2027-2030)', artifact: 'PM08_Doc2_Deliverable_Primavera_P6_Schedule_141Tasks_Master_Rev.001.xer', why: 'Operate an importable P6 XER schedule driving May 2028 energisation to 2030 RFS.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path\\PM08_Doc2_Deliverable_Primavera_P6_Schedule_141Tasks_Master_Rev.001.xer', kind: 'built' },
      { cat: 'Template', title: 'Project Implementation Plan (PIP) & Interactive 141-Task Gantt Workbook', ref: 'Sheet 3. 141-Task Gantt', artifact: 'PM08_Doc3_Template_PIP_141Task_Gantt_Master_Rev.001.xlsx', why: 'Communicate P6 critical path dates and dependencies clearly in Excel to non-planners.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path\\PM08_Doc3_Template_PIP_141Task_Gantt_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Schedule Basis Memorandum (Calendars, Shift Assumptions & Driving Path)', ref: 'AACE 38R-06 Basis Memo', artifact: 'PM08_Doc4_Audit_Schedule_Basis_Memorandum_Rev.001.docx', why: 'Document Irish bank holidays, productivity assumptions, and key critical-path drivers.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-08_Primavera_P6_Logic_Critical_Path\\PM08_Doc4_Audit_Schedule_Basis_Memorandum_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-09', pillar: 'PM2', track: 'pm',
    title: 'DCMA-14 Schedule Quality Audit & Longest Path Diagnostics',
    desc: 'Enforce 100% logic integrity: zero dangling open ends, zero arbitrary lags/constraints, positive float discipline, and realistic critical density.',
    tags: ['DCMA-14', 'Schedule QA'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit',
    docs: [
      { cat: 'Standard', title: 'DCMA 14-Point Schedule Assessment Guideline (Logic, Leads, Lags, Float)', ref: 'DCMA 14-Point Standard', artifact: 'PM09_Doc1_Standard_DCMA_14_Rulebook_Reference_Rev.001.docx', why: 'Learn exact thresholds (<5% high float, 0% negative float, 0 lags) for lender audits.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit\\PM09_Doc1_Standard_DCMA_14_Rulebook_Reference_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Automated DCMA-14 6/6 Schedule Health Diagnostic Report (pyp6xer Log)', ref: 'pyp6xer Quality Engine', artifact: 'PM09_Doc2_Deliverable_DCMA14_Schedule_Baseline_XER_Master_Rev.001.xer', why: 'Inspect verified proof of zero open ends, zero hard constraints, and valid critical density.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit\\PM09_Doc2_Deliverable_DCMA14_Schedule_Baseline_XER_Master_Rev.001.xer', kind: 'built' },
      { cat: 'Template', title: 'Monthly Contractor Schedule Update Audit & Float Consumption Checksheet', ref: 'Clause 31/32 Schedule Check', artifact: 'PM09_Doc3_Template_Contractor_Update_Checksheet_Rev.001.xlsx', why: 'Spot hidden logic overrides, artificial lags, and silent float erosion each reporting cycle.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit\\PM09_Doc3_Template_Contractor_Update_Checksheet_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Driving Predecessor & Near-Critical Path Risk Diagnostic Sheet', ref: 'Longest Path Trace', artifact: 'PM09_Doc4_Audit_Longest_Path_Diagnostic_Log_Rev.001.xlsx', why: 'Isolate tasks with <10 days total float likely to flip onto the driving critical path.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-09_DCMA14_Schedule_Quality_Audit\\PM09_Doc4_Audit_Longest_Path_Diagnostic_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-10', pillar: 'PM2', track: 'pm',
    title: 'Resource Loading, Cashflow S-Curves & Baseline Controls',
    desc: 'Cost-load P6 activities to forecast monthly EUR burn rates, engineering/site manpower peaks, and Performance Measurement Baselines.',
    tags: ['S-Curve', 'PMB', 'Manpower'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves',
    docs: [
      { cat: 'Standard', title: 'PMI Practice Standard for Cost-Loaded Scheduling & Cashflow Forecasting', ref: 'PMI Practice Standard', artifact: 'PM10_Doc1_Standard_Cost_Loaded_P6_Standard_Rev.001.docx', why: 'Connect P6 task durations directly to capex drawdown curves and Earned Value baselines.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves\\PM10_Doc1_Standard_Cost_Loaded_P6_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Performance Measurement Baseline (PMB) — Monthly EUR Capex Burn S-Curve', ref: 'Sheet 4. EVM Cost/Schedule', artifact: 'PM10_Doc2_Deliverable_PMB_Monthly_Burn_SCurve_Master_Rev.001.xlsx', why: 'Forecast cumulative EUR investment pacing across enabling, CSA, MEP, and Cx phases.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves\\PM10_Doc2_Deliverable_PMB_Monthly_Burn_SCurve_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Trade & Engineering Peak Manpower Histogram (CSA, HV, MEP, Cx Teams)', ref: 'Trade Labour Loading', artifact: 'PM10_Doc3_Template_Manpower_Histogram_Workbook_Rev.001.xlsx', why: 'Prevent trade stacking in crowded white space by forecasting peak craft headcounts.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves\\PM10_Doc3_Template_Manpower_Histogram_Workbook_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Peak Headcount Welfare, Canteen, Turnstile & Site Logistics Audit Plan', ref: 'HSA Site Welfare Regs', artifact: 'PM10_Doc4_Audit_Site_Welfare_Capacity_Audit_Rev.001.xlsx', why: 'Ensure statutory HSE welfare facilities, parking, and biometric gates scale for peak labour.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-10_Resource_Loading_Cashflow_SCurves\\PM10_Doc4_Audit_Site_Welfare_Capacity_Audit_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-11', pillar: 'PM2', track: 'pm',
    title: 'EU EED (2023/1791) & Delegated Reg. (2024/1364) KPI Design',
    desc: 'Embed sub-metering, PUE/WUE/ERF/REF telemetry pipelines and heat-reuse export readiness into technical specifications early.',
    tags: ['EED 2023/1791', 'PUE/WUE/ERF'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design',
    docs: [
      { cat: 'Standard', title: 'EU Energy Efficiency Directive (EU) 2023/1791 Art. 12 & Reg. (EU) 2024/1364', ref: 'Directive (EU) 2023/1791', artifact: 'PM11_Doc1_Standard_EU_EED_Compliance_Text_Rev.001.docx', why: 'Master mandatory EU reporting metrics for all data centres >= 500 kW IT demand.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design\\PM11_Doc1_Standard_EU_EED_Compliance_Text_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Facility Sustainability & EED Telemetry Design Spec (PUE, WUE, ERF, REF)', ref: 'Sheet 3. EN 50600 & EED', artifact: 'PM11_Doc2_Deliverable_EU_EED_Telemetry_Spec_Master_Rev.001.xlsx', why: 'Establish campus targets (PUE <= 1.22, closed-loop WUE, heat export ERF, REF >= 90%).', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design\\PM11_Doc2_Deliverable_EU_EED_Telemetry_Spec_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'EPMS / BMS Revenue-Grade Sub-Metering Hierarchy (IT vs. Cooling vs. Aux)', ref: 'EN 50600-4-x Telemetry', artifact: 'PM11_Doc3_Template_EPMS_Sub_Metering_Matrix_Rev.001.xlsx', why: 'Position CT/PT meters accurately so UPS losses and parasitic loads report cleanly.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design\\PM11_Doc3_Template_EPMS_Sub_Metering_Matrix_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Waste Heat Recovery Heat-Pump & Municipal District Heating Readiness Review', ref: 'Art. 26 Cost-Benefit Review', artifact: 'PM11_Doc4_Audit_Waste_Heat_Readiness_Audit_Rev.001.docx', why: 'Verify plate heat exchanger flange-offs satisfy Irish SEAI / EU heat-reuse rules.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-11_EU_EED_2023_1791_KPI_Design\\PM11_Doc4_Audit_Waste_Heat_Readiness_Audit_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-12', pillar: 'PM2', track: 'pm',
    title: 'BS EN ISO 19650 Information Management, EIR & CDE Setup',
    desc: 'Implement Common Data Environment workflows (WIP -> Shared -> Published -> Archive), Exchange Info Requirements, and BIM LOD matrices.',
    tags: ['ISO 19650', 'CDE', 'BEP'],
    folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE',
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-1 & -2 Information Management Concepts & Delivery Phase', ref: 'BS EN ISO 19650-1 / -2', artifact: 'PM12_Doc1_Standard_ISO_19650_Standard_Guide_Rev.001.docx', why: 'Enforce uniform naming conventions and suitability gates (S0-A7) across ACC/BIM 360.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE\\PM12_Doc1_Standard_ISO_19650_Standard_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Exchange Information Requirements (EIR) & Master Information Delivery Plan', ref: 'Appointing Party EIR/MIDP', artifact: 'PM12_Doc2_Deliverable_EIR_MIDP_Baseline_Pack_Rev.001.docx', why: 'Define exact BIM LOD, COBie data fields, and submission dates inside vendor contracts.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE\\PM12_Doc2_Deliverable_EIR_MIDP_Baseline_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Project BIM Execution Plan (BEP) & CDE Folder Workflow (WIP/Shared/Archive)', ref: 'CDE Workflow & Naming Code', artifact: 'PM12_Doc3_Template_BIM_BEP_Naming_Standard_Rev.001.xlsx', why: 'Standardize originator, volume, level, type, and role fields across all disciplines.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE\\PM12_Doc3_Template_BIM_BEP_Naming_Standard_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Master Document Register (MDR) with ISO 19650 Suitability Codes (S0-A7)', ref: 'Portfolio Next Deliverable', artifact: 'PM12_Doc4_Audit_Master_Document_Register_DC36EU_Rev.001.xlsx', why: 'Track live drawing transmittals, review aging, and IFC approvals in one central ledger.', folder: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE', localPath: 'Phase_2_Planning_WBS_P6_RIBA_2_3\\PM-12_ISO19650_Information_Mgmt_CDE\\PM12_Doc4_Audit_Master_Document_Register_DC36EU_Rev.001.xlsx', kind: 'built' }
    ]
  },

  // PM3: Phase 3 - Procurement, Contracts & Supply Chain (RIBA 4)
  {
    id: 'PM-13', pillar: 'PM3', track: 'pm',
    title: 'Delivery Strategy: EPCm, Design-Build & Multi-Prime Packaging',
    desc: 'Compare single-point turnkey vs. Trade/EPCm split packages across cost certainty, design control, interfaces, and claims exposure.',
    tags: ['EPCm', 'Design-Build', 'Packaging'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB',
    docs: [
      { cat: 'Standard', title: 'RIBA Stage 4 Technical Design & Commercial Procurement Options Standard', ref: 'RIBA Stage 4 Procurement', artifact: 'PM13_Doc1_Standard_Procurement_Route_Framework_Rev.001.docx', why: 'Weigh owner risk retention vs. turnkey risk premium across volatile European markets.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB\\PM13_Doc1_Standard_Procurement_Route_Framework_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Contracting & Packaging Strategy Paper (EPCm vs. Single Turnkey vs. Multi-Prime)', ref: 'Sheet 5. Contracting & OFCI', artifact: 'PM13_Doc2_Deliverable_Contracting_Strategy_PIP_Master_Rev.001.xlsx', why: 'Structure CSA shell, HV substation, MEP fit-out, and BMS contracts for 36 MW velocity.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB\\PM13_Doc2_Deliverable_Contracting_Strategy_PIP_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Package Interface & Battery-Limit Split Matrix (HV, CSA, MEP, Controls, Cx)', ref: 'Package Demarcation Table', artifact: 'PM13_Doc3_Template_Interface_Demarcation_Matrix_Rev.001.xlsx', why: 'Assign physical termination points (e.g., switchgear cable lugs, chilled water flanges).', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB\\PM13_Doc3_Template_Interface_Demarcation_Matrix_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Supply Chain Market Warming & Pre-Qualification (PQQ) Scoring Audit', ref: 'Capacity / Safety / Finance', artifact: 'PM13_Doc4_Audit_Bidder_PQQ_Shortlist_Report_Rev.001.docx', why: 'Vet Tier-1 European MEP/CSA contractors for bonding capacity, backlog, and DC experience.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-13_Delivery_Strategy_EPCm_DB\\PM13_Doc4_Audit_Bidder_PQQ_Shortlist_Report_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-14', pillar: 'PM3', track: 'pm',
    title: 'NEC4 ECC (Option A/C): Early Warnings & Compensation Events',
    desc: 'Administer collaborative NEC4 contracts: Accepted Programme updates, Risk Reduction Meetings, CEs, and Option C target pain/gainshare.',
    tags: ['NEC4 ECC', 'Option A/C', 'CE'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE',
    docs: [
      { cat: 'Standard', title: 'NEC4 Engineering & Construction Contract (Options A & C Guidance Notes)', ref: 'NEC4 ECC Clauses 10-95', artifact: 'PM14_Doc1_Standard_NEC4_ECC_Practice_Guide_Rev.001.docx', why: 'Master collaborative PM duties, time bars (Clause 61.3), and target cost gainshare.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE\\PM14_Doc1_Standard_NEC4_ECC_Practice_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'NEC4 Works Information (Scope), Contract Data Part 1/2 & Pain/Gainshare Model', ref: 'NEC4 Contract Pack', artifact: 'PM14_Doc2_Deliverable_NEC4_Scope_Contract_Data_Rev.001.docx', why: 'Draft unambiguous Scope specs and Option C share ranges aligned with sponsor budgets.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE\\PM14_Doc2_Deliverable_NEC4_Scope_Contract_Data_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Live Early Warning Notice (EWN) & Risk Reduction Meeting Action Register', ref: 'NEC4 Clause 15 Workflow', artifact: 'PM14_Doc3_Template_EWN_Risk_Reduction_Log_Rev.001.xlsx', why: 'Surface cost/programme threats early before they convert into expensive Compensation Events.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE\\PM14_Doc3_Template_EWN_Risk_Reduction_Log_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Compensation Event (CE) Valuation Register & Clause 31/32 Programme Check', ref: 'NEC4 Cl. 31-32 & 60-65', artifact: 'PM14_Doc4_Audit_CE_Programme_Audit_Log_Rev.001.xlsx', why: 'Enforce strict prospective time-impact quoting and Defined Cost substantiation.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-14_NEC4_ECC_Early_Warnings_CE\\PM14_Doc4_Audit_CE_Programme_Audit_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-15', pillar: 'PM3', track: 'pm',
    title: 'FIDIC Yellow / Silver Book: Risk Allocation & Claims Control',
    desc: 'Manage Engineer determinations, Employer Requirements integrity, EOT substantiation, and DAB dispute avoidance under FIDIC.',
    tags: ['FIDIC', 'Claims', 'EOT'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims',
    docs: [
      { cat: 'Standard', title: 'FIDIC Yellow Book (D&B) / Silver Book (EPC) 2017 & SCL Delay Protocol', ref: 'FIDIC 2017 / SCL Protocol', artifact: 'PM15_Doc1_Standard_FIDIC_SCL_Reference_Pack_Rev.001.docx', why: 'Understand Employer Risk vs. turnkey single-point responsibility under Irish/EU law.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims\\PM15_Doc1_Standard_FIDIC_SCL_Reference_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: "Employer's Requirements (ERs), Particular Conditions & Delay Damages Schedule", ref: 'FIDIC Contract Drafting', artifact: 'PM15_Doc2_Deliverable_FIDIC_ERs_Particulars_Pack_Rev.001.docx', why: 'Protect power efficiency guarantees and liquidated damages via airtight ER schedules.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims\\PM15_Doc2_Deliverable_FIDIC_ERs_Particulars_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Contractor Notice of Claim, Time-Impact EOT Analysis & Determination SOP', ref: 'FIDIC Clause 20 / 3.7', artifact: 'PM15_Doc3_Template_Claim_EOT_Assessment_SOP_Rev.001.docx', why: 'Evaluate concurrent delay, pacing, and Sub-Clause 20.2 condition-precedent notices.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims\\PM15_Doc3_Template_Claim_EOT_Assessment_SOP_Rev.001.docx', kind: 'built' },
      { cat: 'Audit', title: 'Dispute Avoidance/Adjudication Board (DAAB) Monthly Standing Briefing Audit', ref: 'FIDIC Clause 21 DAAB', artifact: 'PM15_Doc4_Audit_Monthly_DAAB_Briefing_File_Rev.001.docx', why: 'Resolve commercial entitlement deadlocks contemporaneously to avoid arbitration.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-15_FIDIC_Yellow_Silver_Claims\\PM15_Doc4_Audit_Monthly_DAAB_Briefing_File_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-16', pillar: 'PM3', track: 'pm',
    title: 'OFCI Long-Lead Equipment Strategy (HV, UPS, Chillers, BESS)',
    desc: 'De-risk 40-80 week OEM bottlenecks via early Owner-Furnished slots, milestone reservation payments, and novation options.',
    tags: ['OFCI', 'Long-Lead', 'OEM'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment',
    docs: [
      { cat: 'Standard', title: 'Hyperscale Owner-Furnished Contractor-Installed (OFCI) Procurement Protocol', ref: 'OFCI Delivery Standard', artifact: 'PM16_Doc1_Standard_OFCI_Governance_Protocol_Rev.001.docx', why: 'Balance 52-week OEM lead-time compression against interface liability risks.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment\\PM16_Doc1_Standard_OFCI_Governance_Protocol_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Master OFCI Long-Lead Equipment Matrix (110kV GIS, Transformers, UPS, BESS)', ref: 'Sheet 5. Contracting & OFCI', artifact: 'PM16_Doc2_Deliverable_OFCI_LongLead_Matrix_PIP_Master_Rev.001.xlsx', why: 'Track factory build slots, deposit milestones, and required-on-site dates in P6.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment\\PM16_Doc2_Deliverable_OFCI_LongLead_Matrix_PIP_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'OEM Slot Reservation Agreement, Progress Milestones & Conditional Novation Deed', ref: 'HV / UPS / Chiller Supply', artifact: 'PM16_Doc3_Template_OEM_Slot_Novation_Deed_Rev.001.docx', why: 'Lock factory production early and cleanly transfer custody to the EPCm at site delivery.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment\\PM16_Doc3_Template_OEM_Slot_Novation_Deed_Rev.001.docx', kind: 'built' },
      { cat: 'Audit', title: 'OFCI Factory Warranty Transition, Site Receiving, Rigging & Custody Audit', ref: 'Care & Custody Transfer', artifact: 'PM16_Doc4_Audit_OFCI_Site_Custody_Checklist_Rev.001.xlsx', why: 'Verify crane paths, floor point-loads, and preservation warranty compliance on arrival.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-16_OFCI_Long_Lead_Equipment\\PM16_Doc4_Audit_OFCI_Site_Custody_Checklist_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-17', pillar: 'PM3', track: 'pm',
    title: 'RFP Issuance, Technical Bid Evaluation (TBE) & BAFO Leveling',
    desc: 'Run blind commercial/technical scoring matrices, normalize exclusions/deviations, and lead structured BAFO negotiations.',
    tags: ['TBE', 'BAFO', 'Procurement'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling',
    docs: [
      { cat: 'Standard', title: 'EU Competitive Tender Governance & Commercial Bid Normalisation Best Practice', ref: 'Audit-Ready Tender Rules', artifact: 'PM17_Doc1_Standard_Tender_Governance_Standard_Rev.001.docx', why: 'Guarantee transparent, defensible contractor selection under institutional governance.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling\\PM17_Doc1_Standard_Tender_Governance_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Invitation to Tender (ITT) / RFP Package, Pricing BoQ & Mandatory Compliances', ref: 'RIBA Stage 4 Tender Pack', artifact: 'PM17_Doc2_Deliverable_ITT_RFP_Tender_Dossier_Rev.001.docx', why: 'Issue standardized pricing schedules so bids can be compared apples-to-apples.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling\\PM17_Doc2_Deliverable_ITT_RFP_Tender_Dossier_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Blind Technical Bid Evaluation (TBE) Scorecard & BAFO Leveling Sheet', ref: 'Tech / Cost / Schedule / HSE', artifact: 'PM17_Doc3_Template_TBE_BAFO_Leveling_Workbook_Rev.001.xlsx', why: 'Plug gaps, price exclusions, and benchmark labour productivity rates across bidders.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling\\PM17_Doc3_Template_TBE_BAFO_Leveling_Workbook_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Post-Tender Clarification Log & Executive Recommendation to Award (RTA) Paper', ref: 'IC Award Approval', artifact: 'PM17_Doc4_Audit_Recommendation_to_Award_Memo_Rev.001.docx', why: 'Document BAFO savings, negotiated risk caps, and final contract execution readiness.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-17_RFP_TBE_BAFO_Leveling\\PM17_Doc4_Audit_Recommendation_to_Award_Memo_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-18', pillar: 'PM3', track: 'pm',
    title: 'Vendor Expediting, Factory Readiness & Incoterms Logistics',
    desc: 'Track shop drawings, sub-supplier components, DDP/DAP customs clearance, and laydown yard sequencing to site.',
    tags: ['Expediting', 'Incoterms', 'Supply Chain'],
    folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics',
    docs: [
      { cat: 'Standard', title: 'ICC Incoterms 2020 Rules (EXW / FCA / CIF / DAP / DDP) & Expediting Guide', ref: 'ICC Incoterms 2020', artifact: 'PM18_Doc1_Standard_Incoterms_Logistics_Guide_Rev.001.docx', why: 'Determine exact freight insurance, VAT customs liability, and site unloading boundaries.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics\\PM18_Doc1_Standard_Incoterms_Logistics_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Weekly OEM Production, Sub-Supplier (Breakers/PLC) & Shop Drawing Tracker', ref: 'Tier-2 Component Tracking', artifact: 'PM18_Doc2_Deliverable_Vendor_Expediting_Tracker_Rev.001.xlsx', why: 'Catch sub-tier PCB or breaker delays months before missed factory delivery dates.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics\\PM18_Doc2_Deliverable_Vendor_Expediting_Tracker_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Marine Freight, EU Customs Clearance, Abnormal Load Route & Laydown Plan', ref: 'Dublin/Cork Heavy Haul', artifact: 'PM18_Doc3_Template_Freight_Laydown_Schedule_Rev.001.xlsx', why: 'Coordinate Garda escorts, bridge weight limits, and crane pads for 100t transformers.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics\\PM18_Doc3_Template_Freight_Laydown_Schedule_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Delivered Equipment Preservation, Space-Heater Power & Nitrogen Purge Audit', ref: 'Storage Warranty Protection', artifact: 'PM18_Doc4_Audit_Preservation_Inspection_Log_Rev.001.xlsx', why: 'Protect switchgear insulation and chiller bearings during damp Irish winters on site.', folder: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics', localPath: 'Phase_3_Procurement_Contracts_RIBA_4\\PM-18_Vendor_Expediting_Incoterms_Logistics\\PM18_Doc4_Audit_Preservation_Inspection_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },

  // PM4: Phase 4 - Execution, Controls, Risk & Change (RIBA 5)
  {
    id: 'PM-19', pillar: 'PM4', track: 'pm',
    title: 'Earned Value Management (EVM): CPI, SPI, EAC & Recovery',
    desc: 'Measure physical % complete against PV/EV/AC, diagnose CPI/SPI drift early, and enforce schedule compression or fast-track recovery plans.',
    tags: ['EVM', 'CPI/SPI', 'EAC'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery',
    docs: [
      { cat: 'Standard', title: 'ANSI/EIA-748 & PMI Practice Standard for Earned Value Management', ref: 'ANSI/EIA-748 / PMI EVM', artifact: 'PM19_Doc1_Standard_EVM_Control_Standard_Guide_Rev.001.docx', why: 'Master PV, EV, AC, SPI, CPI, TCPI, and EAC formulas used to audit delivery health.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery\\PM19_Doc1_Standard_EVM_Control_Standard_Guide_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Live Cost/Schedule EVM Workbook (PV, EV, AC, CPI, SPI & EAC Model)', ref: 'Sheet 4. EVM Cost/Schedule', artifact: 'PM19_Doc2_Deliverable_EVM_Cost_Schedule_Controls_Master_Rev.001.xlsx', why: 'Monitor monthly DC36-EU spend efficiency and detect slippage before contingency burns.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery\\PM19_Doc2_Deliverable_EVM_Cost_Schedule_Controls_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Trade Physical Progress Rules-of-Credit Matrix (Linear vs. Billed %)', ref: 'Rules of Credit Matrix', artifact: 'PM19_Doc3_Template_Trade_Rules_of_Credit_Sheet_Rev.001.xlsx', why: 'Prevent contractor front-loading by tying progress strictly to installed linear meters.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery\\PM19_Doc3_Template_Trade_Rules_of_Credit_Sheet_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Schedule Variance Recovery & Acceleration Plan (Double Shifts / Skids)', ref: 'SPI < 0.95 Recovery', artifact: 'PM19_Doc4_Audit_Schedule_Recovery_Action_Plan_Rev.001.docx', why: 'Restore lost float via weekend shifts, offsite modular skids, and crew re-sequencing.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-19_EVM_CPI_SPI_EAC_Recovery\\PM19_Doc4_Audit_Schedule_Recovery_Action_Plan_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-20', pillar: 'PM4', track: 'pm',
    title: 'Integrated Change Control (CRB), Scope Freeze & Baselines',
    desc: 'Govern Change Requests through technical/cost/schedule impact scoring before Change Control Board sign-off and baseline revision.',
    tags: ['Change Control', 'CRB', 'Scope Freeze'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB',
    docs: [
      { cat: 'Standard', title: 'ISO 10007 Configuration Management & Baseline Change Governance Guide', ref: 'ISO 10007 Baseline Control', artifact: 'PM20_Doc1_Standard_Configuration_Mgmt_Standard_Rev.001.docx', why: 'Enforce strict separation between pending tenant wishes and approved baseline changes.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB\\PM20_Doc1_Standard_Configuration_Mgmt_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Change Control Board (CRB) Charter, Delegated Financial Authority & SLAs', ref: 'CRB Governance Charter', artifact: 'PM20_Doc2_Deliverable_CRB_Decision_Authority_Matrix_Rev.001.docx', why: 'Clarify PM vs. Sponsor approval caps so minor field tweaks move without stalling.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB\\PM20_Doc2_Deliverable_CRB_Decision_Authority_Matrix_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Change Request (CR) Impact Assessment Form (Tech, Capex, P6, PUE)', ref: 'CR Impact Form', artifact: 'PM20_Doc3_Template_Change_Impact_Assessment_Form_Rev.001.xlsx', why: 'Force holistic impact sign-off on load density, P6 float, and PUE before issuing VOs.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB\\PM20_Doc3_Template_Change_Impact_Assessment_Form_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Approved Change Log, Baseline Revision History & Design Freeze Tracker', ref: 'Stage 4/5 Scope Freeze', artifact: 'PM20_Doc4_Audit_Change_Log_Freeze_Waiver_Audit_Rev.001.xlsx', why: 'Trace every EUR moved from contingency and justify late tenant variation orders.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-20_Integrated_Change_Control_CRB\\PM20_Doc4_Audit_Change_Log_Freeze_Waiver_Audit_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-21', pillar: 'PM4', track: 'pm',
    title: 'Quantitative Risk Analysis (QRA / Monte Carlo P50 & P80)',
    desc: 'Maintain active L x I Risk Register, run 3-point cost/schedule Monte Carlo simulations, and govern drawdown of management reserve.',
    tags: ['QRA', 'Monte Carlo', 'P50/P80'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo',
    docs: [
      { cat: 'Standard', title: 'ISO 31000 Risk Management Standard & AACE 40R-08 Probabilistic Estimating', ref: 'ISO 31000 / AACE 40R-08', artifact: 'PM21_Doc1_Standard_Quantitative_Risk_Standard_Rev.001.docx', why: 'Move beyond static guesses to probability-weighted P50/P80 contingency sizing.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo\\PM21_Doc1_Standard_Quantitative_Risk_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Weighted Risk & Opportunity Register (L x I, EMV, Owners & Triggers)', ref: 'Sheet 5. Risk Register', artifact: 'PM21_Doc2_Deliverable_Weighted_Risk_Register_Master_Rev.001.xlsx', why: 'Manage live EU data centre threats (grid delay, OFCI lead-time, wet weather, FX).', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo\\PM21_Doc2_Deliverable_Weighted_Risk_Register_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Template', title: 'Project Charter Top-10 Strategic Risk & Quantitative Monte Carlo Output', ref: 'Charter Sheet 5 / QRA P80', artifact: 'PM21_Doc3_Template_Strategic_Risk_QRA_Charter_Master_Rev.001.xlsx', why: 'Identify top Tornado drivers dictating reserve drawdown across charter and pre-NTP gates.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo\\PM21_Doc3_Template_Strategic_Risk_QRA_Charter_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Contingency & Management Reserve Drawdown Authorization Ledger', ref: 'Reserve Drawdown Control', artifact: 'PM21_Doc4_Audit_Contingency_Drawdown_Ledger_Rev.001.xlsx', why: 'Audit every contingency drawdown against realized risk triggers rather than scope creep.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-21_Quantitative_Risk_QRA_Monte_Carlo\\PM21_Doc4_Audit_Contingency_Drawdown_Ledger_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-22', pillar: 'PM4', track: 'pm',
    title: 'Quality Assurance (QA/QC), ITPs & NCR / RFI Discipline',
    desc: 'Enforce Inspection & Test Plans, hold/witness points, concrete/weld QA logs, submittals SLAs, and timely Non-Conformance closure.',
    tags: ['QA/QC', 'ITP', 'NCR'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline',
    docs: [
      { cat: 'Standard', title: 'ISO 9001 Quality Management Systems & CSA/MEP Site Testing Best Practice', ref: 'ISO 9001 QA/QC Standard', artifact: 'PM22_Doc1_Standard_Quality_Management_Standard_Rev.001.docx', why: 'Establish zero-defect construction discipline preventing hidden faults before Cx.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline\\PM22_Doc1_Standard_Quality_Management_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Project Construction Quality Management Plan (CQP) & Testing Lab Scope', ref: 'Stage 5 Site CQP', artifact: 'PM22_Doc2_Deliverable_Construction_Quality_Plan_Rev.001.docx', why: 'Define concrete cube crush tests, MV/HV cable hipots, and third-party weld NDE rules.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline\\PM22_Doc2_Deliverable_Construction_Quality_Plan_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Trade Inspection & Test Plans (ITPs) with Hold / Witness Checkpoints', ref: 'CSA / HV / MEP ITPs', artifact: 'PM22_Doc3_Template_Master_ITP_Hold_Point_Matrix_Rev.001.xlsx', why: 'Require CxA/RE physical sign-off before burying conduits, slabs, or pipework.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline\\PM22_Doc3_Template_Master_ITP_Hold_Point_Matrix_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Non-Conformance Report (NCR), Field Observation & RFI Aging Dashboard', ref: 'NCR / RFI Closure SLA', artifact: 'PM22_Doc4_Audit_NCR_RFI_Aging_Audit_Log_Rev.001.xlsx', why: 'Close overdue RFIs (<5 days) and open NCRs before they block handover certificates.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-22_QA_QC_ITPs_NCR_RFI_Discipline\\PM22_Doc4_Audit_NCR_RFI_Aging_Audit_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-23', pillar: 'PM4', track: 'pm',
    title: 'Multi-Disciplinary MEP / CSA Interface & Clash Coordination',
    desc: 'Resolve slab penetrations, busway/piping corridors, hot/cold aisle containment tolerances, and trade handoffs between CSA and MEP.',
    tags: ['Interfaces', 'BIM Clash', 'MEP/CSA'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash',
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-2 Spatial Coordination & Federated BIM Clash Standard', ref: 'ISO 19650-2 Coordination', artifact: 'PM23_Doc1_Standard_Federated_BIM_Coordination_Std_Rev.001.docx', why: 'Catch clearance clashes digitally in LOD 350 models before pouring concrete slabs.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash\\PM23_Doc1_Standard_Federated_BIM_Coordination_Std_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Cross-Discipline Interface Responsibility & Sequence Plan (Slabs, Busways)', ref: 'CSA -> MEP -> BMS/EPMS', artifact: 'PM23_Doc2_Deliverable_Interface_Responsibility_Plan_Rev.001.docx', why: 'Sequence overhead containment, sprinkler racks, busbar aisles, and hot-aisle plenums.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash\\PM23_Doc2_Deliverable_Interface_Responsibility_Plan_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Weekly Navisworks / ACC BIM Clash Resolution & Builders-Work Sign-Off', ref: 'BIM Clash Matrix', artifact: 'PM23_Doc3_Template_Weekly_Clash_Resolution_Log_Rev.001.xlsx', why: 'Drive weekly clash counts down to zero per zone prior to IFC construction drawings.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash\\PM23_Doc3_Template_Weekly_Clash_Resolution_Log_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Data Hall White-Space Readiness Walkdown Checklist (Floor, ESD, Cleanliness)', ref: 'White-Space Sign-Off', artifact: 'PM23_Doc4_Audit_Hall_White_Space_Walkdown_Log_Rev.001.xlsx', why: 'Verify raised floor pedestals, airtight containment, and ISO cleanroom standards pre-rack.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-23_MEP_CSA_Interface_BIM_Clash\\PM23_Doc4_Audit_Hall_White_Space_Walkdown_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-24', pillar: 'PM4', track: 'pm',
    title: 'Executive Steering Reporting, Lookahead & Escalation',
    desc: 'Publish weekly/monthly control packs, 3-week/6-week constraint-free lookaheads, and crisp decision memos for executive sponsors.',
    tags: ['Reporting', 'Lookahead', 'Governance'],
    folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC',
    docs: [
      { cat: 'Standard', title: 'Last Planner System (LPS) Pull Planning & Enterprise PMO Reporting Std', ref: 'Last Planner System', artifact: 'PM24_Doc1_Standard_Lean_Lookahead_PMO_Standard_Rev.001.docx', why: 'Combine top-down P6 CPM milestones with weekly field constraint-removal workflows.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC\\PM24_Doc1_Standard_Lean_Lookahead_PMO_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Monthly Executive Steering Committee Pack (HSE, EVM, Cash, Top Risks)', ref: 'Monthly SteerCo Pack', artifact: 'PM24_Doc2_Deliverable_Monthly_Executive_Report_Deck_Rev.001.docx', why: 'Present board-level RAG status, S-curves, and urgent capital decisions clearly.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC\\PM24_Doc2_Deliverable_Monthly_Executive_Report_Deck_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Rolling 6-Week Constraint-Free Lookahead & Percent Plan Complete (PPC) Log', ref: 'Weekly Site Lookahead', artifact: 'PM24_Doc3_Template_6_Week_Lookahead_PPC_Sheet_Rev.001.xlsx', why: 'Unblock permits, RAMS, materials, and drawings two weeks ahead of field crews.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC\\PM24_Doc3_Template_6_Week_Lookahead_PPC_Sheet_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'One-Page Executive Decision Memo & Red-Amber-Green (RAG) Recovery Brief', ref: 'Executive Escalation Memo', artifact: 'PM24_Doc4_Audit_RAG_Recovery_Briefing_Note_Rev.001.docx', why: 'Isolate root causes, quantified options, and clear leadership asks on one page.', folder: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC', localPath: 'Phase_4_Execution_Controls_Risk_RIBA_5\\PM-24_SteerCo_Reporting_Lookahead_PPC\\PM24_Doc4_Audit_RAG_Recovery_Briefing_Note_Rev.001.docx', kind: 'built' }
    ]
  },

  // PM5: Phase 5 - Commissioning L1-L5 & Integrated Testing (RIBA 5-6)
  {
    id: 'PM-25', pillar: 'PM5', track: 'pm',
    title: 'Master Commissioning Plan (CIBSE Code M / ASHRAE 0)',
    desc: 'Organize Commissioning Authority (CxA) governance, test matrices, dependency logic, and tag progression gates from L1 to L5.',
    tags: ['CIBSE Code M', 'ASHRAE 0', 'CxA'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M',
    docs: [
      { cat: 'Standard', title: 'CIBSE Commissioning Code M & ASHRAE Guideline 0 / Standard 202 Process', ref: 'CIBSE Code M / ASHRAE 0', artifact: 'PM25_Doc1_Standard_Cx_Process_Authority_Standard_Rev.001.docx', why: 'Structure independent Commissioning Authority (CxA) governance from OPR through IST.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M\\PM25_Doc1_Standard_Cx_Process_Authority_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Master Commissioning Management Plan (CxA Authority, Matrix & Logic Gates)', ref: 'Portfolio Stage 6 Pack', artifact: 'PM25_Doc2_Deliverable_Master_Commissioning_Plan_Stage_6_Rev.001.docx', why: 'Define sign-off protocols, witness notice periods, and system-by-system test sequences.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M\\PM25_Doc2_Deliverable_Master_Commissioning_Plan_Stage_6_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Level 1-5 Sequence Dependency Roadmap Across All 4 Data Halls', ref: 'Sheet 6. Commissioning L1-L5', artifact: 'PM25_Doc3_Template_Commissioning_L1_L5_Roadmap_PIP_Master_Rev.001.xlsx', why: 'Sequence Hall 1-4 handover phases alongside shared 110kV/central plant systems.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M\\PM25_Doc3_Template_Commissioning_L1_L5_Roadmap_PIP_Master_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Commissioning Issues Log (CxIL) & Test Script Completion Burn-Down Log', ref: 'CxTrack / CxAlloy Burn-Down', artifact: 'PM25_Doc4_Audit_CxIL_Script_Burn_Down_Tracker_Rev.001.xlsx', why: 'Track open commissioning deficiencies daily so zero severity-1 blockers reach IST.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-25_Master_Commissioning_Plan_CIBSE_M\\PM25_Doc4_Audit_CxIL_Script_Burn_Down_Tracker_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-26', pillar: 'PM5', track: 'pm',
    title: 'Cx Levels 1 & 2: Witnessed OEM FAT & Site Receiving QA',
    desc: 'Execute European Factory Acceptance Tests (HV switchgear, UPS, chillers, BESS) and verify undamaged site installation/red-line tags.',
    tags: ['L1-L2', 'FAT', 'Red Tag'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA',
    docs: [
      { cat: 'Standard', title: 'IEC 62271 (HV Switchgear), IEC 62040 (UPS) & ISO 8528 (Generator) Standards', ref: 'IEC 62271 / IEC 62040 / ISO 8528', artifact: 'PM26_Doc1_Standard_OEM_Factory_Test_Standards_Rev.001.docx', why: 'Understand rated impulse withstand, UPS overload specs, and ISO G3 genset classes.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA\\PM26_Doc1_Standard_OEM_Factory_Test_Standards_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Level 1 Witnessed Factory Acceptance Test (FAT) Scripts & Punchlists', ref: 'HV GIS / UPS / Chillers / BESS', artifact: 'PM26_Doc2_Deliverable_L1_FAT_Witness_Test_Pack_Rev.001.docx', why: 'Catch protection/firmware defects in the factory before shipping to Dublin/Cork.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA\\PM26_Doc2_Deliverable_L1_FAT_Witness_Test_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Level 2 Site Delivery, Foundation Alignment, Torque & Pre-Energisation Forms', ref: 'L2 Installation Checksheets', artifact: 'PM26_Doc3_Template_L2_Mechanical_Electrical_Forms_Rev.001.xlsx', why: 'Verify shock-recorder logs, anchor bolts, and megger tests prior to Yellow Tag sign-off.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA\\PM26_Doc3_Template_L2_Mechanical_Electrical_Forms_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Equipment Color-Tagging Procedure (White L1 -> Yellow L2 -> Green L3 -> Blue L4)', ref: 'Tagging Discipline SOP', artifact: 'PM26_Doc4_Audit_Cx_Color_Tagging_Audit_SOP_Rev.001.docx', why: 'Control physical lockstep gates so no contractor energizes an unverified panel.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-26_Cx_L1_L2_OEM_FAT_Receiving_QA\\PM26_Doc4_Audit_Cx_Color_Tagging_Audit_SOP_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-27', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 3: Pre-Functional Static, BSRIA Flush & LOTO',
    desc: 'Verify Megger/hi-pot insulation, relay secondary injection, BSRIA chilled-water flushing, and strict LOTO energisation permits.',
    tags: ['L3 Static', 'BSRIA', 'LOTO'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO',
    docs: [
      { cat: 'Standard', title: 'BSRIA BG 29 Pre-Commission Cleaning of Pipework & HV Safe Switching Rules', ref: 'BSRIA BG 29 / ESBN Safety', artifact: 'PM27_Doc1_Standard_Static_Cleaning_HV_Standard_Rev.001.docx', why: 'Prevent condenser fouling and arc-flash hazards through strict static qualification.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO\\PM27_Doc1_Standard_Static_Cleaning_HV_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Authorized HV/LV Lockout-Tagout (LOTO) Control Book & Sanction-for-Test', ref: 'SAP / Authorized Person Book', artifact: 'PM27_Doc2_Deliverable_HV_LV_LOTO_Permit_Control_Book_Rev.001.docx', why: 'Enforce Safe System of Work and Authorised Person isolation across live zones.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO\\PM27_Doc2_Deliverable_HV_LV_LOTO_Permit_Control_Book_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Level 3 Electrical Static Checksheets (Megger, VLF Hi-Pot & Relay Injection)', ref: 'L3 Electrical Static Pack', artifact: 'PM27_Doc3_Template_L3_Static_Test_Checksheets_Rev.001.xlsx', why: 'Validate busbar torque thermography marks, CT polarity, and relay trip curves.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO\\PM27_Doc3_Template_L3_Static_Test_Checksheets_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'BSRIA Closed-Loop Chilled-Water Chemical Flushing & Leakage Certificates', ref: 'BSRIA BG 29 / Duct Leakage', artifact: 'PM27_Doc4_Audit_BSRIA_Flush_Hydro_Certificates_Rev.001.xlsx', why: 'Confirm turbidity, iron <5 ppm, biocide dosing, and pressurized pipe integrity.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-27_Cx_L3_Static_BSRIA_Flush_LOTO\\PM27_Doc4_Audit_BSRIA_Flush_Hydro_Certificates_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-28', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 4: Dynamic Load, SCR Abatement & BESS Sync',
    desc: 'Prove 22kV energisation, genset step-load black-start, SCR NOx abatement, EPMS/BMS failure sequences, and BESS synchronization.',
    tags: ['L4 Dynamic', 'BESS Sync', 'BMS/EPMS'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS',
    docs: [
      { cat: 'Standard', title: 'CIBSE Commissioning Code C (Controls), NETA ATS & EU Medium Combustion Regs', ref: 'CIBSE Code C / NETA ATS', artifact: 'PM28_Doc1_Standard_Dynamic_Controls_Test_Std_Rev.001.docx', why: 'Set dynamic acceptance tolerances for voltage transients, controls loops, and emissions.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS\\PM28_Doc1_Standard_Dynamic_Controls_Test_Std_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Level 4 Functional Performance Test (FPT) Scripts (UPS, Genset & BESS Sync)', ref: 'CIBSE Code M L4', artifact: 'PM28_Doc2_Deliverable_L4_Functional_Test_Dossier_Rev.001.docx', why: 'Prove single-system load transfers, static switch speeds, and BESS grid synchronization.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS\\PM28_Doc2_Deliverable_L4_Functional_Test_Dossier_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Generator SCR NOx Emissions Abatement & HVO Combustion Verification Logs', ref: 'EPA IEL Stack Verification', artifact: 'PM28_Doc3_Template_SCR_HVO_Dynamic_Test_Logs_Rev.001.xlsx', why: 'Verify urea dosing and NOx limits under 25%-100% step loads to satisfy EPA conditions.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS\\PM28_Doc3_Template_SCR_HVO_Dynamic_Test_Logs_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Automated BMS / EPMS Sequence of Operations (SOO) & Cause-and-Effect Proof', ref: 'BMS / EPMS Telemetry Audit', artifact: 'PM28_Doc4_Audit_SOO_Cause_and_Effect_Matrix_Rev.001.xlsx', why: 'Audit sensor trends, alarms, and automated valve/breaker interlock responses end-to-end.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-28_Cx_L4_Dynamic_SCR_HVO_BESS\\PM28_Doc4_Audit_SOO_Cause_and_Effect_Matrix_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-29', pillar: 'PM5', track: 'pm',
    title: 'Cx Level 5: 36 MW 48-Hr IST & Full Blackout Simulation',
    desc: 'Orchestrate portable load-bank thermal soak, pull-the-plug blackout ATS/UPS failover (<10s), and TES cooling ride-through tests.',
    tags: ['L5 IST', '36 MW', 'Blackout Test'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout',
    docs: [
      { cat: 'Standard', title: 'ASHRAE Guideline 0 & Hyperscale Integrated Systems Testing (IST) MOP Rules', ref: 'ASHRAE 0 / Hyperscale IST', artifact: 'PM29_Doc1_Standard_IST_Method_Statement_Standard_Rev.001.docx', why: 'Structure integrated failure scenarios proving facility resilience under 100% heat load.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout\\PM29_Doc1_Standard_IST_Method_Statement_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Master 36 MW 48-Hour Integrated Systems Test (IST) Playbook & Scenario Pack', ref: 'Pull-the-Plug Blackout', artifact: 'PM29_Doc2_Deliverable_L5_36MW_48_Hr_IST_Playbook_Rev.001.docx', why: 'Script dual-feed utility loss, breaker failures, and emergency thermal ride-through.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout\\PM29_Doc2_Deliverable_L5_36MW_48_Hr_IST_Playbook_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Portable Load-Bank Power Matrix, Heat-Soak & Infrared Thermography Logs', ref: '36 MW Thermal Heat-Soak', artifact: 'PM29_Doc3_Template_Load_Bank_IR_Thermo_Matrix_Rev.001.xlsx', why: 'Distribute fan-assisted resistive load banks accurately across PDUs and floor tiles.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout\\PM29_Doc3_Template_Load_Bank_IR_Thermo_Matrix_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Facility Grid Blackout, <10s ATS+BESS Failover & TES Ride-Through Audit Log', ref: 'Scenario Sign-Off Evidence', artifact: 'PM29_Doc4_Audit_Blackout_TES_Ride_Through_Log_Rev.001.xlsx', why: 'Capture millisecond waveform recordings proving uninterrupted power and zero thermal trip.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-29_Cx_L5_36MW_48Hr_IST_Blackout\\PM29_Doc4_Audit_Blackout_TES_Ride_Through_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-30', pillar: 'PM5', track: 'pm',
    title: 'Dual EN 50600 Class 3 & Uptime TCCF Constructed Audit',
    desc: 'Script simultaneous path-isolation concurrent maintainability demonstrations for independent on-site certifying assessors.',
    tags: ['TCCF', 'EN 50600', 'Maintainability'],
    folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit',
    docs: [
      { cat: 'Standard', title: 'Uptime Institute Tier Standard Topology (TCCF) & I.S. EN 50600 Class 3 Rules', ref: 'Uptime TCCF / EN 50600', artifact: 'PM30_Doc1_Standard_Dual_Certification_Rulebook_Rev.001.docx', why: 'Satisfy both Uptime Institute assessors and European EN 50600 third-party auditors.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit\\PM30_Doc1_Standard_Dual_Certification_Rulebook_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'On-Site Assessor Concurrent Maintainability Isolation Demonstration Pack', ref: 'Path A vs. Path B Proofs', artifact: 'PM30_Doc2_Deliverable_TCCF_Class_3_Witness_Scripts_Rev.001.docx', why: 'Prove every switchgear, transformer, UPS, and chiller header isolates with zero outage.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit\\PM30_Doc2_Deliverable_TCCF_Class_3_Witness_Scripts_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Pre-Audit Single-Point-of-Failure (SPOF) Electrical & Cooling Walkdown Sheet', ref: 'SPOF Elimination Check', artifact: 'PM30_Doc3_Template_Pre_Audit_SPOF_Walkdown_Sheet_Rev.001.xlsx', why: 'Eliminate shared control PLC power supplies, manual valve bypasses, or control loops.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit\\PM30_Doc3_Template_Pre_Audit_SPOF_Walkdown_Sheet_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Assessor Observations Remediation Dossier & Constructed Certificate File', ref: 'Certification Sign-Off Vault', artifact: 'PM30_Doc4_Audit_TCCF_EN_50600_Audit_File_Rev.001.docx', why: 'Close minor witness punch items and secure final bankable facility certificates.', folder: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit', localPath: 'Phase_5_Commissioning_L1_L5_RIBA_5_6\\PM-30_Dual_EN50600_Uptime_TCCF_Audit\\PM30_Doc4_Audit_TCCF_EN_50600_Audit_File_Rev.001.docx', kind: 'built' }
    ]
  },

  // PM6: Phase 6 - Handover, OR&T & Project Closeout (RIBA 6-7)
  {
    id: 'PM-31', pillar: 'PM6', track: 'pm',
    title: 'Practical Completion (PC), Snagging Burn-Down & RFS Gate',
    desc: 'Run A/B/C defect classification, enforce Day-1 Ready-for-Service (RFS) blocker zeroing, and issue Taking-Over Certificates.',
    tags: ['Practical Completion', 'Punch List', 'RFS'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS',
    docs: [
      { cat: 'Standard', title: 'RIBA Stage 6 Handover & Contract Practical Completion Certification Protocol', ref: 'RIBA Stage 6 / Contract PC', artifact: 'PM31_Doc1_Standard_Handover_RFS_Gate_Standard_Rev.001.docx', why: 'Prevent premature lease start liabilities by defining strict objective PC/RFS exits.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS\\PM31_Doc1_Standard_Handover_RFS_Gate_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Ready-for-Service (RFS) Gate Sign-Off Package & Taking-Over Certificate', ref: 'Tenant Lease / Contract TOC', artifact: 'PM31_Doc2_Deliverable_PC_RFS_Gate_Sign_Off_Pack_Rev.001.docx', why: 'Trigger rent commencement, insurance transfer, and defects liability start date cleanly.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS\\PM31_Doc2_Deliverable_PC_RFS_Gate_Sign_Off_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'A / B / C Defect Categorization & Snagging Punch-List Burn-Down Tracker', ref: 'Zero Cat-A Day-1 Blockers', artifact: 'PM31_Doc3_Template_Snagging_Punch_List_Log_Rev.001.xlsx', why: 'Separate safety/SLAs (Cat-A) from cosmetic snags (Cat-C) to unblock handover.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS\\PM31_Doc3_Template_Snagging_Punch_List_Log_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Tenant Demise Inspection, Cleanroom & Security Keys Handover Certificate', ref: 'White-Space Demise Sign-Off', artifact: 'PM31_Doc4_Audit_Tenant_Demise_Handover_Audit_Rev.001.docx', why: 'Verify BMS security access badges, cleanroom particle counts, and cage locks.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-31_Practical_Completion_Snagging_RFS\\PM31_Doc4_Audit_Tenant_Demise_Handover_Audit_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-32', pillar: 'PM6', track: 'pm',
    title: 'Operational Readiness & Transition (OR&T) & Black-Hat Drills',
    desc: 'Train 24/7 Critical Facilities staff, validate EOP/MOP/SOP libraries, run live Black-Hat incident drills, and stock 2-year critical spares.',
    tags: ['OR&T', 'Black-Hat', 'EOP/MOP/SOP'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat',
    docs: [
      { cat: 'Standard', title: 'I.S. EN 50600-3-1 Management & Operations + Uptime Operational Sustainability', ref: 'EN 50600-3-1 / Uptime M&O', artifact: 'PM32_Doc1_Standard_Facility_Operations_Standard_Rev.001.docx', why: 'Avoid human-error outages (>70% of failures) through certified operating discipline.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat\\PM32_Doc1_Standard_Facility_Operations_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Critical Facilities Operations Handbook: EOP, MOP & SOP Playbook Library', ref: 'Stage 6 OR&T Runbooks', artifact: 'PM32_Doc2_Deliverable_Stage_6_OR_T_Handbook_Suite_Rev.001.docx', why: 'Equip shift engineers with step-by-step switching and emergency response guides.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat\\PM32_Doc2_Deliverable_Stage_6_OR_T_Handbook_Suite_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Live Black-Hat Unannounced Outage Drill Scripts & 24/7 Crew Scorecards', ref: 'Operator Drill Simulation', artifact: 'PM32_Doc3_Template_Black_Hat_Drill_Evaluation_Log_Rev.001.xlsx', why: 'Test live crew reactions to simulated tripped breakers, chiller leaks, and fire alarms.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat\\PM32_Doc3_Template_Black_Hat_Drill_Evaluation_Log_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: '24/7 Technician Competency Sign-Offs, OEM SLAs & 2-Year Critical Spares Log', ref: 'Spares & Competency Check', artifact: 'PM32_Doc4_Audit_Spares_SLA_Readiness_Audit_Rev.001.xlsx', why: 'Ensure breakers, PLC cards, fan drives, and 4-hour vendor SLAs exist prior to Day-1.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-32_ORT_EOP_MOP_SOP_BlackHat\\PM32_Doc4_Audit_Spares_SLA_Readiness_Audit_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-33', pillar: 'PM6', track: 'pm',
    title: 'BS EN ISO 19650 Asset Information Model (AIM) Handover',
    desc: 'Deliver verified COBie asset registers, as-built BIM models, O&M manuals, warranties, and CMMS integration packages.',
    tags: ['ISO 19650 AIM', 'COBie', 'O&M'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover',
    docs: [
      { cat: 'Standard', title: 'BS EN ISO 19650-3 Operational Asset Information Mgmt & BS 1192-4 COBie', ref: 'ISO 19650-3 / BS 1192-4', artifact: 'PM33_Doc1_Standard_AIM_COBie_Data_Standard_Rev.001.docx', why: 'Bridge construction CDE models seamlessly into live CMMS maintenance software.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover\\PM33_Doc1_Standard_AIM_COBie_Data_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Verified Asset Information Model (AIM) & As-Built Federated BIM Archive', ref: 'As-Built Digital Twin', artifact: 'PM33_Doc2_Deliverable_As_Built_AIM_Digital_Vault_Rev.001.docx', why: 'Deliver geo-tagged 3D models matching every installed pipe, valve, and breaker.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover\\PM33_Doc2_Deliverable_As_Built_AIM_Digital_Vault_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Structured COBie / CMMS Equipment Asset Register (Barcodes, Serials, PPM)', ref: 'CMMS Bulk Import Pack', artifact: 'PM33_Doc3_Template_COBie_CMMS_Asset_Register_Rev.001.xlsx', why: 'Pre-load thousands of maintainable assets with OEM warranty dates and PPM intervals.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover\\PM33_Doc3_Template_COBie_CMMS_Asset_Register_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Final Red-Line As-Built Drawings, O&M Manuals, Warranties & Test Vault', ref: 'CDE Published Archive', artifact: 'PM33_Doc4_Audit_O_M_Warranty_Completeness_Log_Rev.001.xlsx', why: 'Audit 100% receipt of signed statutory O&M volumes before final retention payment.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-33_ISO19650_AIM_COBie_CMMS_Handover\\PM33_Doc4_Audit_O_M_Warranty_Completeness_Log_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-34', pillar: 'PM6', track: 'pm',
    title: 'Commercial Final Account, Variations Settlement & DLP',
    desc: 'Reconcile all CEs/variations, close prime cost sums, manage retention release mechanics, and track 12/24-month Defect Liability Period.',
    tags: ['Final Account', 'DLP', 'Retention'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP',
    docs: [
      { cat: 'Standard', title: 'NEC4 / FIDIC Commercial Final Account Agreement & Defects Liability Rules', ref: 'NEC4 Cl. 5 / FIDIC Cl. 14', artifact: 'PM34_Doc1_Standard_Commercial_Closeout_Standard_Rev.001.docx', why: 'Execute legally binding full-and-final commercial settlement eliminating latent claims.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP\\PM34_Doc1_Standard_Commercial_Closeout_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Agreed Commercial Final Account Statement & Closed Variation Schedule', ref: 'Final Account Deed', artifact: 'PM34_Doc2_Deliverable_Final_Account_Settlement_Pack_Rev.001.docx', why: 'Reconcile provisional sums, CEs, contra-charges, and final capex EUR/MW actuals.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP\\PM34_Doc2_Deliverable_Final_Account_Settlement_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: '12-to-24 Month Defects Liability Period (DLP) & Warranty Callout Tracker', ref: 'Post-PC Defect SLA', artifact: 'PM34_Doc3_Template_DLP_Callout_Defect_Register_Rev.001.xlsx', why: 'Track response SLAs for post-handover snags and latent leaks during warranty year 1.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP\\PM34_Doc3_Template_DLP_Callout_Defect_Register_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Practical Completion 50% Retention Release & Making-Good Defects Cert', ref: 'Final Certificate Gate', artifact: 'PM34_Doc4_Audit_Retention_Defects_Release_Audit_Rev.001.xlsx', why: 'Release second half of performance bond/retention only after DLP clearance sign-off.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-34_Commercial_Final_Account_DLP\\PM34_Doc4_Audit_Retention_Defects_Release_Audit_Rev.001.xlsx', kind: 'built' }
    ]
  },
  {
    id: 'PM-35', pillar: 'PM6', track: 'pm',
    title: 'Post-Occupancy Evaluation (POE) & Live PUE/WUE/ERF Audit',
    desc: 'Track seasonal commissioning tuning, verify guaranteed vs. measured PUE/WUE at partial IT load, and optimize chiller staging.',
    tags: ['POE', 'Seasonal Cx', 'Live PUE'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED',
    docs: [
      { cat: 'Standard', title: 'BSRIA BG 63 Soft Landings Post-Occupancy & Reg. (EU) 2024/1364 Reporting', ref: 'BSRIA BG 63 / EU 2024/1364', artifact: 'PM35_Doc1_Standard_POE_EED_Live_Audit_Standard_Rev.001.docx', why: 'Ensure design PUE survives reality at 15%-50% early tenant ramp-up load factors.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED\\PM35_Doc1_Standard_POE_EED_Live_Audit_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Summer/Winter Seasonal Commissioning Fine-Tuning Report (Chiller/Pump Opt)', ref: 'RIBA Stage 7 In-Use', artifact: 'PM35_Doc2_Deliverable_Seasonal_Cx_Tuning_Report_Rev.001.docx', why: 'Retune VFD fan walls, EC fans, and adiabatic wetted pads across live seasonal peaks.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED\\PM35_Doc2_Deliverable_Seasonal_Cx_Tuning_Report_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Guaranteed vs. Measured PUE, WUE & Free-Cooling Energy Validation Log', ref: 'KPI Benchmark Tracker', artifact: 'PM35_Doc3_Template_Live_PUE_WUE_Validation_Workbook_Rev.001.xlsx', why: 'Measure EPMS sub-meters continuously to confirm <1.22 annualized PUE compliance.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED\\PM35_Doc3_Template_Live_PUE_WUE_Validation_Workbook_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Initial Statutory Annual EU EED Art. 12 Union Database Filing Pack', ref: 'May 15 Annual EED Filing', artifact: 'PM35_Doc4_Audit_EU_EED_Annual_Filing_Audit_Rev.001.docx', why: 'Submit verified energy, water, and waste-heat metrics to the European Commission portal.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-35_Post_Occupancy_Evaluation_PUE_EED\\PM35_Doc4_Audit_EU_EED_Annual_Filing_Audit_Rev.001.docx', kind: 'built' }
    ]
  },
  {
    id: 'PM-36', pillar: 'PM6', track: 'pm',
    title: 'Lessons Learned Archive, Benefits Realization & Closeout',
    desc: 'Publish benchmark EUR/MW actuals, schedule variance post-mortems, contract closeout certificates, and enterprise knowledge transfer.',
    tags: ['Closeout', 'Lessons Learned', 'KPIs'],
    folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout',
    docs: [
      { cat: 'Standard', title: 'PMI Close Project Phase Standard & Enterprise PMO Benchmarking Guidelines', ref: 'PMI Closeout / PMO Std', artifact: 'PM36_Doc1_Standard_Enterprise_Closeout_Standard_Rev.001.docx', why: 'Institutionalize actual build costs and schedule durations to inform DC36 Phase 2.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout\\PM36_Doc1_Standard_Enterprise_Closeout_Standard_Rev.001.docx', kind: 'built' },
      { cat: 'Deliverable', title: 'Final Project Closeout Report & Actual EUR/MW Capex + Schedule Benchmark', ref: 'Board Benefits Review', artifact: 'PM36_Doc2_Deliverable_Project_Closeout_Benchmark_Pack_Rev.001.docx', why: 'Compare FID forecasts vs. final outturn IRR, EUR/MW capex, and critical-path variances.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout\\PM36_Doc2_Deliverable_Project_Closeout_Benchmark_Pack_Rev.001.docx', kind: 'built' },
      { cat: 'Template', title: 'Cross-Discipline End-to-End Lessons Learned Register (CSA, Grid, Cx, OR&T)', ref: 'PMO Knowledge Base', artifact: 'PM36_Doc3_Template_Lessons_Learned_Register_Rev.001.xlsx', why: 'Capture procurement pitfalls, OFCI lessons, and Irish permitting timelines for future sites.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout\\PM36_Doc3_Template_Lessons_Learned_Register_Rev.001.xlsx', kind: 'built' },
      { cat: 'Audit', title: 'Formal Contract Closeout Notices, Bond Returns & Benefits Realization Sign-Off', ref: 'Sponsor Final Discharge', artifact: 'PM36_Doc4_Audit_Contract_Closeout_Sign_Off_Log_Rev.001.xlsx', why: 'Confirm parent guarantees returned, CDE archived, and project team formally released.', folder: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout', localPath: 'Phase_6_Handover_ORT_Closeout_RIBA_6_7\\PM-36_Lessons_Learned_Benefits_Closeout\\PM36_Doc4_Audit_Contract_Closeout_Sign_Off_Log_Rev.001.xlsx', kind: 'built' }
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

function docKey(moduleId, idx) {
  return `${moduleId}::${idx}`;
}

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
  return { modules, portfolio, interviews, docChecks: {} };
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
      interviews: { ...def.interviews, ...(parsed.interviews || {}) },
      docChecks: { ...(parsed.docChecks || {}) }
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
  }]).then(res => {
    if (res && res.ok) setSyncUiState('connected', 'Supabase Synced');
  });
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
  }]).then(res => {
    if (res && res.ok) setSyncUiState('connected', 'Supabase Synced');
  });
}

function syncDocCheckRow(moduleId, docIdx, checked) {
  if (!window.DC36_Supabase || !cloudSchemaReady || !window.DC36_Supabase.upsertDocChecks) return;
  const meta = CURRICULUM.find(m => m.id === moduleId);
  const docObj = meta && Array.isArray(meta.docs) ? meta.docs[docIdx] : null;
  if (!meta || !docObj) return;
  window.DC36_Supabase.upsertDocChecks([{
    profile_id: getProfileId(),
    doc_key: docKey(moduleId, docIdx),
    module_id: moduleId,
    doc_index: docIdx,
    track: meta.track,
    doc_title: docObj.title || '',
    checked: Boolean(checked),
    updated_at: new Date().toISOString()
  }]).then(res => {
    if (res && res.ok) setSyncUiState('connected', 'Supabase Synced');
  });
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

  const hasRemoteData = res.modules.length > 0 || res.portfolio.length > 0 || res.interviews.length > 0 || res.history.length > 0 || (res.docChecks && res.docChecks.length > 0);
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
    if (Array.isArray(res.docChecks) && res.docChecks.length > 0) {
      if (!state.docChecks) state.docChecks = {};
      res.docChecks.forEach(r => {
        if (r.doc_key) {
          if (r.checked) state.docChecks[r.doc_key] = true;
          else delete state.docChecks[r.doc_key];
        }
      });
    }
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
  const docRows = [];
  CURRICULUM.forEach(m => {
    (m.docs || []).forEach((d, idx) => {
      const k = docKey(m.id, idx);
      docRows.push({
        profile_id: pid,
        doc_key: k,
        module_id: m.id,
        doc_index: idx,
        track: m.track,
        doc_title: d.title || '',
        checked: Boolean(state.docChecks && state.docChecks[k]),
        updated_at: now
      });
    });
  });

  const [mRes, pRes, iRes, dRes] = await Promise.all([
    window.DC36_Supabase.upsertModules(modRows),
    window.DC36_Supabase.upsertPortfolio(portRows),
    window.DC36_Supabase.upsertInterviews(iqRows),
    window.DC36_Supabase.upsertDocChecks && docRows.length
      ? window.DC36_Supabase.upsertDocChecks(docRows)
      : Promise.resolve({ ok: true })
  ]);

  if (mRes.ok && pRes.ok && iRes.ok && dRes.ok) {
    setSyncUiState('connected', `Supabase Synced (${modRows.length} mods / ${docRows.length} docs)`);
    recordHistoryEvent({
      event_type: 'cloud_sync',
      entity_id: pid,
      entity_title: 'Full Portfolio Cloud Backup',
      track: 'system',
      summary: `Synced ${modRows.length} modules, ${docRows.length} docs, ${portRows.length} deliverables, and ${iqRows.length} Q&As to Supabase`
    });
    showToast('All local progress pushed to Supabase');
  } else {
    setSyncUiState('offline', 'Cloud Push Error');
    showToast('Cloud push failed; check console or RLS');
  }
}

function getDocStats(trackFilter) {
  let done = 0;
  let total = 0;
  CURRICULUM.forEach(m => {
    if (trackFilter && m.track !== trackFilter) return;
    (m.docs || []).forEach((_, idx) => {
      total += 1;
      if (state.docChecks && state.docChecks[docKey(m.id, idx)]) done += 1;
    });
  });
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
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
  const allDocs = getDocStats();

  document.getElementById('kpi-readiness').textContent = `${pm.readiness}%`;
  document.getElementById('kpi-readiness-sub').textContent = `PM Lifecycle Active (${pm.count}) | Legal Later: ${legal.readiness}%`;
  document.getElementById('kpi-completed').textContent = `${pm.mastered} / ${pm.count}`;
  document.getElementById('kpi-completed-sub').textContent = `${pm.inProg} in progress | Legal ${legal.mastered}/${legal.count}`;
  document.getElementById('kpi-hours').textContent = `${totalHrs.toFixed(1)}h`;
  document.getElementById('kpi-hours-sub').textContent = `${pm.hours.toFixed(1)}h PM / ${legal.hours.toFixed(1)}h Legal`;
  document.getElementById('kpi-confidence').textContent = `${pm.avgConf} / 5.0`;
  document.getElementById('wave-fill').style.width = `${pm.readiness}%`;
  document.getElementById('wave-label').textContent = `${pm.readiness}% End-to-End Project Management Readiness`;
  const waveSubEl = document.getElementById('wave-sub');
  if (waveSubEl) {
    waveSubEl.textContent = `6 Lifecycle Phases x 6 Modules = 36 Active PM Modules (+ 18 Legal) | ${allDocs.done} / ${allDocs.total} Docs Checked (${allDocs.pct}%)`;
  }

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
  const checks = state.docChecks || {};
  let doneCount = 0;

  const itemsHtml = docs.map((d, idx) => {
    const k = docKey(m.id, idx);
    const isChecked = Boolean(checks[k]);
    if (isChecked) doneCount += 1;
    const kindCls = d.kind === 'built' ? 'doc-pill-built' : (d.kind === 'planned' ? 'doc-pill-planned' : 'doc-pill-ref');
    const kindLbl = d.kind === 'built' ? 'Built (DC36-EU)' : (d.kind === 'planned' ? 'Planned Next' : 'Guide / Std');
    const catLbl = d.cat || 'Guide';
    const safeArtifact = escapeHtml(d.artifact || '');
    const safeRef = escapeHtml(d.ref || '');
    const copyBtnHtml = d.localPath
      ? `<button type="button" class="btn-copy-path mono" data-copy-path="${escapeHtml(d.localPath)}" data-copy-label="${safeArtifact}" title="Copy full Windows file path">Copy Path</button>`
      : '';
    const liveReadBtnHtml = m.pillar === 'PM1'
      ? `<a href="phase1/#${m.id}-D${idx + 1}" class="btn-read-live mono" title="Open full rendered document & download">Read Live</a>`
      : '';
    return `
      <li class="module-doc-item ${isChecked ? 'is-done' : ''}" data-doc-row="${k}">
        <div class="module-doc-left">
          <label class="doc-check-label" title="Mark document completed, learned, or created">
            <input type="checkbox" class="doc-check-input" data-mod="${m.id}" data-idx="${idx}" aria-label="Mark ${d.title.replace(/"/g, '&quot;')} completed" ${isChecked ? 'checked' : ''} />
          </label>
          <div class="module-doc-main">
            <div class="module-doc-head">
              <span class="doc-cat-badge ${docCatClass(catLbl)}">${catLbl}</span>
              <div class="module-doc-title">${d.title}</div>
            </div>
            ${d.why ? `<div class="module-doc-why">${d.why}</div>` : ''}
          </div>
        </div>
        <div class="module-doc-meta">
          <span class="mono">${safeArtifact}${safeRef ? ` (${safeRef})` : ''}</span>
          ${liveReadBtnHtml}
          ${copyBtnHtml}
          <span class="doc-pill ${kindCls}">${kindLbl}</span>
        </div>
      </li>
    `;
  }).join('');

  const pillCls = doneCount === docs.length ? 'all-done' : (doneCount > 0 ? 'has-done' : '');
  const folderPath = m.folder || (docs[0] && docs[0].folder) || '';
  const folderBarHtml = folderPath
    ? `
      <div class="drawer-folder-bar">
        <span class="drawer-folder-path mono" title="${escapeHtml(LOCAL_REPO_ROOT + folderPath)}">Folder: ${escapeHtml(folderPath)}</span>
        <button type="button" class="btn-copy-path mono" data-copy-path="${escapeHtml(folderPath)}" data-copy-label="${m.id} Flashcard Folder">Copy Folder</button>
      </div>
    `
    : '';

  return `
    <details class="module-docs-drawer" data-id="${m.id}" ${forceOpen ? 'open' : ''}>
      <summary>
        <span class="module-docs-summary-left">
          <span>Related Documents (${docs.length})</span>
          <span class="docs-done-pill ${pillCls} mono" data-docs-pill="${m.id}">${doneCount}/${docs.length} Done</span>
        </span>
        <span class="section-docs-hint hint-view">View</span>
        <span class="section-docs-hint hint-hide">Hide</span>
      </summary>
      ${folderBarHtml}
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
    let secDocsDone = 0;
    let secDocsTotal = 0;
    allSectionMods.forEach(m => {
      (m.docs || []).forEach((_, idx) => {
        secDocsTotal += 1;
        if (state.docChecks && state.docChecks[docKey(m.id, idx)]) secDocsDone += 1;
      });
    });
    const badgeCls = trackName === 'pm' ? 'track-badge-pm' : 'track-badge-legal';

    return `
      <section class="section-block" aria-label="${p.name}">
        <div class="section-header-bar">
          <div class="section-title-group">
            <span class="track-badge ${badgeCls}">${p.code}</span>
            <h3 class="section-title">${p.name}</h3>
            ${p.id === 'PM1' ? '<a href="phase1/index.html" class="btn-read-live mono" style="padding:5px 12px;">Open Phase 1 Live Reader (31 Files)</a>' : ''}
          </div>
          <div class="section-stats mono">
            <span>${done}/${allSectionMods.length} Mastered</span>
            <span>|</span>
            <span data-sec-docs="${p.id}">${secDocsDone}/${secDocsTotal} Docs</span>
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

  grid.querySelectorAll('.btn-copy-path').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      copyLocalRepoPath(btn.dataset.copyPath || '', btn.dataset.copyLabel || '');
    };
  });

  grid.querySelectorAll('.doc-check-input').forEach(chk => {
    chk.onchange = () => {
      const modId = chk.dataset.mod;
      const idx = Number(chk.dataset.idx);
      const checked = Boolean(chk.checked);
      const k = docKey(modId, idx);
      if (!state.docChecks) state.docChecks = {};
      if (checked) state.docChecks[k] = true;
      else delete state.docChecks[k];

      const row = chk.closest('.module-doc-item');
      if (row) row.classList.toggle('is-done', checked);

      const meta = CURRICULUM.find(m => m.id === modId);
      const docObj = meta && Array.isArray(meta.docs) ? meta.docs[idx] : null;

      if (meta) {
        const docs = meta.docs || [];
        const modDone = docs.filter((_, i) => state.docChecks[docKey(modId, i)]).length;
        const pillEl = grid.querySelector(`[data-docs-pill="${modId}"]`);
        if (pillEl) {
          pillEl.textContent = `${modDone}/${docs.length} Done`;
          pillEl.classList.toggle('all-done', modDone === docs.length);
          pillEl.classList.toggle('has-done', modDone > 0 && modDone < docs.length);
        }

        const secMods = CURRICULUM.filter(m => m.pillar === meta.pillar);
        let secDone = 0;
        let secTotal = 0;
        secMods.forEach(sm => {
          (sm.docs || []).forEach((_, i) => {
            secTotal += 1;
            if (state.docChecks[docKey(sm.id, i)]) secDone += 1;
          });
        });
        const secEl = grid.querySelector(`[data-sec-docs="${meta.pillar}"]`);
        if (secEl) secEl.textContent = `${secDone}/${secTotal} Docs`;
      }

      saveState(checked ? `Checked ${modId} Doc ${idx + 1}` : `Unchecked ${modId} Doc ${idx + 1}`);
      syncDocCheckRow(modId, idx, checked);
      if (meta && docObj) {
        recordHistoryEvent({
          event_type: 'doc_check',
          entity_id: `${modId}-D${idx + 1}`,
          entity_title: docObj.title,
          track: meta.track,
          old_status: checked ? 'pending' : 'done',
          new_status: checked ? 'done' : 'pending',
          summary: `${checked ? 'Completed' : 'Reopened'} [${docObj.cat}] ${docObj.title}`
        });
      }
    };
  });

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
  const allDocs = getDocStats();
  const pmDocs = getDocStats('pm');
  const legalDocs = getDocStats('legal');
  const pDone = PORTFOLIO_ITEMS.filter(x => (state.portfolio[x.id]?.status || x.status) === 'Complete').length;
  const iReadyPm = INTERVIEW_QA.filter(q => q.track === 'pm' && state.interviews[q.id]?.ready).length;
  const iTotalPm = INTERVIEW_QA.filter(q => q.track === 'pm').length;

  document.getElementById('analytics-summary').innerHTML = `
    <p><strong>Active PM Lifecycle Readiness:</strong> ${pm.readiness}% (${pm.mastered}/${pm.count} mastered, ${pm.hours.toFixed(1)}h logged)</p>
    <p><strong>Documents Completed (Created / Learned):</strong> ${allDocs.done} / ${allDocs.total} (${allDocs.pct}% | PM ${pmDocs.done}/${pmDocs.total}, Legal ${legalDocs.done}/${legalDocs.total})</p>
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

  renderRepoMap();
}

let repoPhaseFilter = 'ALL';
function renderRepoMap() {
  const host = document.getElementById('repo-map-section');
  if (!host) return;
  const pmModules = CURRICULUM.filter(m => m.track === 'pm');
  const pmPillars = PILLARS.filter(p => p.track === 'pm');
  const filtered = pmModules.filter(m => repoPhaseFilter === 'ALL' || m.pillar === repoPhaseFilter);
  const chipHtml = [
    `<button type="button" class="chip ${repoPhaseFilter === 'ALL' ? 'selected' : ''}" data-rphase="ALL">All Phases (36 Folders / 144 Docs)</button>`,
    ...pmPillars.map(p => `<button type="button" class="chip ${repoPhaseFilter === p.id ? 'selected' : ''}" data-rphase="${p.id}">${p.code}</button>`)
  ].join('');

  const rowsHtml = filtered.map(m => {
    const pObj = pmPillars.find(p => p.id === m.pillar);
    const folder = m.folder || (m.docs && m.docs[0] && m.docs[0].folder) || '';
    const fmtList = (m.docs || []).map((d, i) => `D${i + 1}: ${escapeHtml(d.artifact || '')}`).join('<br/>');
    return `
      <tr>
        <td class="mono"><strong>${m.id}</strong></td>
        <td><span class="track-badge track-badge-pm">${pObj ? pObj.code : m.pillar}</span></td>
        <td><strong>${escapeHtml(m.title)}</strong><div class="mono" style="font-size:11px;color:#44474f;margin-top:3px;">${escapeHtml(folder)}</div></td>
        <td class="mono" style="font-size:11px;line-height:1.45;">${fmtList}</td>
        <td>
          <button type="button" class="btn-copy-path mono" data-copy-path="${escapeHtml(folder)}" data-copy-label="${m.id} Folder">Copy Folder</button>
        </td>
      </tr>
    `;
  }).join('');

  host.innerHTML = `
    <div class="repo-map-header">
      <div>
        <h3>Local Self-Contained Flashcard Repository Map (Phase 1 - Phase 6)</h3>
        <div class="mono" style="font-size:12px;color:#44474f;margin-top:3px;">Root: ${escapeHtml(LOCAL_REPO_ROOT)}</div>
      </div>
      <div class="repo-map-actions">
        <button type="button" class="btn-m3 btn-outline-m3 btn-copy-path" data-copy-path="" data-copy-label="Repository Root">Copy Root Path</button>
        <button type="button" class="btn-m3 btn-tonal btn-copy-path" data-copy-path="Master_Document_Register_DC36EU_Rev.001.xlsx" data-copy-label="Master Document Register">Copy MDR Excel Path</button>
      </div>
    </div>
    <div class="chip-row" style="margin-bottom:12px;">${chipHtml}</div>
    <div class="table-wrap">
      <table class="m3-table">
        <thead>
          <tr>
            <th>Card</th>
            <th>Phase</th>
            <th>Module Title &amp; Flashcard Folder</th>
            <th>Ordered Files Inside Folder (+ 00_README)</th>
            <th>Quick Path</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;

  host.querySelectorAll('[data-rphase]').forEach(btn => {
    btn.onclick = () => {
      repoPhaseFilter = btn.dataset.rphase;
      renderRepoMap();
    };
  });
  host.querySelectorAll('.btn-copy-path').forEach(btn => {
    btn.onclick = () => copyLocalRepoPath(btn.dataset.copyPath || '', btn.dataset.copyLabel || '');
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
      ['doc_check', 'Doc Checks'],
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

const ABBR_DOMAINS = [
  { id: 'ALL', label: 'All Domains', cls: '' },
  { id: 'PM & Controls', label: 'PM & Controls', cls: 'abbr-cat-pm' },
  { id: 'Contracts & Finance', label: 'Contracts & Finance', cls: 'abbr-cat-contracts' },
  { id: 'IE & EU Statutory', label: 'IE & EU Statutory', cls: 'abbr-cat-statutory' },
  { id: 'Engineering & MEP', label: 'Engineering & MEP', cls: 'abbr-cat-engineering' },
  { id: 'Standards', label: 'Standards', cls: 'abbr-cat-standards' },
  { id: 'Cx, BIM & Ops', label: 'Cx, BIM & Ops', cls: 'abbr-cat-cxbim' },
  { id: 'Data & Misc', label: 'Data & Misc', cls: 'abbr-cat-data' }
];

const ABBREVIATIONS = [
  // PM & Controls
  { abbr: 'AC', full: 'Actual Cost (EVM) / Assigned Certifier (BCAR)', cat: 'PM & Controls', desc: 'Dual meaning: (1) In Earned Value Management, actual money spent/incurred for work performed (`CPI = EV/AC`). (2) Under Irish BCAR, Chartered professional who inspects works and signs the Completion Certificate.', where: 'PM-19, EU-15, SteerCo' },
  { abbr: 'BAC', full: 'Budget at Completion', cat: 'PM & Controls', desc: 'Total authorized EUR baseline cost budget across WBS 1.0-7.0 before Management Reserve drawdown.', where: 'PM-19, Charter, SteerCo' },
  { abbr: 'CCB / CRB', full: 'Change Control Board / Change Review Board', cat: 'PM & Controls', desc: 'Tier-2 formal governance panel reviewing changes exceeding the Project Director threshold, critical-path shifts, or statutory specs.', where: 'PM-20, SteerCo' },
  { abbr: 'CPI', full: 'Cost Performance Index', cat: 'PM & Controls', desc: 'Earned Value efficiency ratio (`EV / AC`). Value `< 1.0` indicates budget overrun; `< 0.92` triggers mandatory SteerCo escalation (`ESC-03`).', where: 'PM-19, PM-20, SteerCo' },
  { abbr: 'CPM', full: 'Critical Path Method', cat: 'PM & Controls', desc: 'Network scheduling technique identifying longest sequence of dependent activities with zero total float determining project COD.', where: 'PM-08, PM-09, PM-10' },
  { abbr: 'CR', full: 'Change Request', cat: 'PM & Controls', desc: 'Formal scoped, costed, and schedule-impacted request submitted for Tier-1/2/3 approval against the locked baseline.', where: 'PM-20, SteerCo' },
  { abbr: 'CV', full: 'Cost Variance', cat: 'PM & Controls', desc: 'EVM variance metric (`EV - AC`) showing under-budget (`> 0`) or over-budget (`< 0`) position in EUR.', where: 'PM-19' },
  { abbr: 'CWR', full: 'Circular Written Resolution', cat: 'PM & Controls', desc: '72-hour fast-track asynchronous SteerCo voting mechanism used between monthly meetings for NEC4 deadlines or OEM slots.', where: 'PM-01, SteerCo ToR' },
  { abbr: 'DCMA-14', full: 'Defense Contract Management Agency 14-Point Schedule Assessment', cat: 'PM & Controls', desc: 'Industry benchmark testing P6 schedules for missing logic, leads, negative lags, high float, open ends, and realistic critical path (`6/6 PASS` on `DC36-EU`).', where: 'PM-09, PM-10' },
  { abbr: 'DoA', full: 'Delegation of Authority', cat: 'PM & Controls', desc: 'Financial and schedule sign-off hierarchy (`Tier 0` to `Tier 3`) separating Project Director authority from CCB and Board approvals.', where: 'PM-01, SteerCo ToR' },
  { abbr: 'EAC', full: 'Estimate at Completion', cat: 'PM & Controls', desc: 'Projected final EUR project cost based on cumulative performance (`EAC = BAC / CPI`).', where: 'PM-19, PM-20' },
  { abbr: 'EMV', full: 'Expected Monetary Value', cat: 'PM & Controls', desc: 'Probability-weighted risk reserve quantification (`Probability % x EUR Impact`) driving project contingency sizing.', where: 'PM-21' },
  { abbr: 'EV', full: 'Earned Value', cat: 'PM & Controls', desc: 'Budgeted EUR value of physical work actually accomplished at the status data date.', where: 'PM-19' },
  { abbr: 'EVM', full: 'Earned Value Management', cat: 'PM & Controls', desc: 'Integrated cost, schedule, and scope control methodology tying P6 physical progress to `PV`, `EV`, `AC`, `CPI`, and `SPI`.', where: 'PM-19, PM-20' },
  { abbr: 'EWN', full: 'Early Warning Notice', cat: 'PM & Controls', desc: 'Contractual proactive risk notice (especially NEC4 Clause 15) alerting parties to cost, delay, or performance threats early.', where: 'PM-14, PM-20, SteerCo' },
  { abbr: 'FID', full: 'Final Investment Decision', cat: 'PM & Controls', desc: 'Board / Investment Committee capital commitment gate (`M1000`) authorizing Notice to Proceed and full construction drawdown.', where: 'PM-04, PM-05, SteerCo' },
  { abbr: 'FNTP', full: 'Full Notice to Proceed', cat: 'PM & Controls', desc: 'Unconditional written instruction authorizing full-scope design, procurement, and construction.', where: 'PM-05, PM-14' },
  { abbr: 'KPI', full: 'Key Performance Indicator', cat: 'PM & Controls', desc: 'Quantifiable benchmark measuring delivery health (`CPI`, `SPI`, `LTIFR`, `PPC`, `PUE`, `WUE`, `ERF`).', where: 'PM-01, PM-36' },
  { abbr: 'LNTP', full: 'Limited Notice to Proceed', cat: 'PM & Controls', desc: 'Capped early authorization allowing design, surveys, or long-lead reservation fees prior to Full NTP.', where: 'PM-05, PM-14' },
  { abbr: 'LPS', full: 'Last Planner System', cat: 'PM & Controls', desc: 'Lean construction short-interval production control uniting master pull plans, 6-week constraint lookaheads, and weekly work plans.', where: 'PM-23, PM-24' },
  { abbr: 'MDR', full: 'Master Document Register', cat: 'PM & Controls', desc: 'Central control ledger tracking every project deliverable, ISO 19650 suitability code, revision, author, and approval gate.', where: 'PM-07, PM-11' },
  { abbr: 'NTP', full: 'Notice to Proceed', cat: 'PM & Controls', desc: 'Formal commencement trigger (`M1000`, `2027-01-04` on `DC36-EU`) starting contractual time clocks.', where: 'PM-01, PM-05' },
  { abbr: 'OBS', full: 'Organizational Breakdown Structure', cat: 'PM & Controls', desc: 'Hierarchical delivery org chart mapped 1-to-1 against `WBS` Control Accounts to enforce accountability.', where: 'PM-06, PM-07' },
  { abbr: 'OPR', full: 'Owner\'s Project Requirements', cat: 'PM & Controls', desc: 'Foundational Owner brief defining IT load, availability class, PUE, maintainability, and operational expectations (`ORD`).', where: 'PM-03, PM-25' },
  { abbr: 'P50 / P80', full: '50th / 80th Percentile Confidence Forecast', cat: 'PM & Controls', desc: 'Monte Carlo QRA output levels representing median (`P50`) and conservative institutional reserve (`P80`) cost/schedule bounds.', where: 'PM-09, PM-21' },
  { abbr: 'PD / PM', full: 'Project Director / Project Manager', cat: 'PM & Controls', desc: 'Authorized overall delivery leader accountable for schedule, cost, statutory coordination, and Tier-1 change governance.', where: 'PM-01, SteerCo' },
  { abbr: 'PIP', full: 'Project Implementation Plan', cat: 'PM & Controls', desc: 'Master execution playbook (`DataCenter_36MW_EU_PIP.xlsx`) detailing WBS work packages, contracting, and Cx strategy.', where: 'PM-06, PM-07' },
  { abbr: 'PMB', full: 'Performance Measurement Baseline', cat: 'PM & Controls', desc: 'Time-phased `PV` curve against which EVM performance (`CPI`/`SPI`) is audited monthly.', where: 'PM-19' },
  { abbr: 'PMBOK', full: 'Project Management Body of Knowledge', cat: 'PM & Controls', desc: 'PMI flagship reference framework governing project chartering, WBS, EVM, risk, and stakeholder processes.', where: 'PM-01, PM-06' },
  { abbr: 'PMI', full: 'Project Management Institute', cat: 'PM & Controls', desc: 'Global professional standards body for project management (`PMP`, `PMBOK`, Practice Standard for EVM).', where: 'PM-01, PM-19' },
  { abbr: 'PMO', full: 'Project Management Office', cat: 'PM & Controls', desc: 'Central governance function standardizing P6 baselines, SteerCo reporting packs, EVM dashboards, and document control.', where: 'PM-23' },
  { abbr: 'PPC', full: 'Percent Plan Complete', cat: 'PM & Controls', desc: 'Lean metric (`Completed Weekly Tasks / Planned Weekly Tasks`) measuring short-term site execution reliability in LPS.', where: 'PM-23, PM-24' },
  { abbr: 'PV', full: 'Planned Value', cat: 'PM & Controls', desc: 'Authorized EVM baseline budget scheduled to be earned up to the reporting data date.', where: 'PM-19' },
  { abbr: 'QRA', full: 'Quantitative Risk Analysis', cat: 'PM & Controls', desc: 'Probabilistic cost and schedule modeling (`Monte Carlo`) used to size risk drawdown contingency (`P50`/`P80`).', where: 'PM-21' },
  { abbr: 'RACI', full: 'Responsible, Accountable, Consulted, Informed', cat: 'PM & Controls', desc: 'Matrix clarifying single-point accountability (`A`) versus execution (`R`) across Sponsor, EPCm, Contractors, and CxA.', where: 'PM-01' },
  { abbr: 'RAG', full: 'Red / Amber / Green Status', cat: 'PM & Controls', desc: 'Executive dashboard traffic-light indicator flagging schedule, cost, statutory, or commissioning tolerances.', where: 'PM-20, PM-23' },
  { abbr: 'SPI', full: 'Schedule Performance Index', cat: 'PM & Controls', desc: 'EVM schedule efficiency ratio (`EV / PV`). Value `< 0.90` on MEP/Cx packages triggers mandatory escalation (`ESC-04`).', where: 'PM-19, SteerCo' },
  { abbr: 'SPV', full: 'Special Purpose Vehicle', cat: 'PM & Controls', desc: 'Ring-fenced legal entity incorporated to own, finance, build, and operate the single `DC36-EU` facility.', where: 'PM-01, SteerCo' },
  { abbr: 'SteerCo', full: 'Steering Committee', cat: 'PM & Controls', desc: 'Senior executive governance board holding Stage-Gate funding (`TR-01..TR-06`), BAC, COD, and Tier-2/3 decision authority.', where: 'PM-01, SteerCo' },
  { abbr: 'SV', full: 'Schedule Variance', cat: 'PM & Controls', desc: 'EVM schedule metric (`EV - PV`) quantifying ahead (`> 0`) or behind (`< 0`) planned value in EUR.', where: 'PM-19' },
  { abbr: 'TCPI', full: 'To-Complete Performance Index', cat: 'PM & Controls', desc: 'Cost efficiency (`Work Remaining / Funds Remaining`) required to finish on `BAC` or revised `EAC`.', where: 'PM-19' },
  { abbr: 'ToR', full: 'Terms of Reference', cat: 'PM & Controls', desc: 'Charter document defining SteerCo membership, quorum, voting rules, DoA limits, and escalation duties.', where: 'PM-01' },
  { abbr: 'VAC', full: 'Variance at Completion', cat: 'PM & Controls', desc: 'Projected final budget surplus or overrun (`BAC - EAC`).', where: 'PM-19' },
  { abbr: 'WBS', full: 'Work Breakdown Structure', cat: 'PM & Controls', desc: 'Deliverable-oriented hierarchy (`1.0-PERM` through `7.0-COD`, `22` nodes on `DC36-EU`) linking P6 tasks to cost accounts.', where: 'PM-06, PM-07, PM-08' },
  { abbr: 'XER', full: 'Primavera P6 Exchange Format', cat: 'PM & Controls', desc: 'Native Oracle Primavera P6 ASCII file format storing WBS, calendars, `141` tasks, `209` links, and float calculations.', where: 'PM-08, PM-09' },

  // Contracts & Finance
  { abbr: 'BAFO', full: 'Best and Final Offer', cat: 'Contracts & Finance', desc: 'Final binding commercial & technical bid submitted by shortlisted contractors after TBE negotiations.', where: 'PM-15' },
  { abbr: 'BoQ', full: 'Bill of Quantities', cat: 'Contracts & Finance', desc: 'Itemized schedule of construction quantities priced under traditional or re-measurable contract options.', where: 'PM-17, PM-18' },
  { abbr: 'Capex', full: 'Capital Expenditure', cat: 'Contracts & Finance', desc: 'Upfront development and construction investment (`EUR/MW`) spanning land, design, HV/MEP equipment, shell, and Cx.', where: 'PM-04, PM-05, Charter' },
  { abbr: 'CE', full: 'Compensation Event', cat: 'Contracts & Finance', desc: 'NEC4 contract mechanism adjusting Time (Completion Date) and/or Price for Employer-risk changes (e.g., Cl. 60-65).', where: 'PM-14, PM-20, SteerCo' },
  { abbr: 'CIF', full: 'Cost, Insurance and Freight (Incoterms 2020)', cat: 'Contracts & Finance', desc: 'Maritime delivery rule where seller pays freight and minimum insurance to Dublin/EU port of destination.', where: 'PM-16' },
  { abbr: 'CPPA', full: 'Corporate Power Purchase Agreement', cat: 'Contracts & Finance', desc: 'Long-term contract committing data centre load to off-site wind/solar renewable electricity supply.', where: 'EU-12' },
  { abbr: 'D&B', full: 'Design and Build', cat: 'Contracts & Finance', desc: 'Single-point delivery contract assigning both detailed design and physical construction risk to one main contractor.', where: 'PM-12, PM-13, PM-14' },
  { abbr: 'DAAB / DAB', full: 'Dispute Avoidance / Adjudication Board', cat: 'Contracts & Finance', desc: 'FIDIC standing neutral panel preventing and resolving commercial/EOT disputes during construction.', where: 'PM-14' },
  { abbr: 'DAP', full: 'Delivered at Place (Incoterms 2020)', cat: 'Contracts & Finance', desc: 'Seller bears transport risk to the Irish data centre site ready for unloading; buyer handles import customs.', where: 'PM-16' },
  { abbr: 'DCF', full: 'Discounted Cash Flow', cat: 'Contracts & Finance', desc: '10-year financial valuation model discounting future colocation EBITDA to derive project `NPV` and `IRR`.', where: 'PM-04, PreNTP Controls' },
  { abbr: 'DD', full: 'Due Diligence', cat: 'Contracts & Finance', desc: 'Pre-acquisition technical, environmental, grid, legal, and commercial investigation before land/FID lock.', where: 'PM-02, PM-05' },
  { abbr: 'DDP', full: 'Delivered Duty Paid (Incoterms 2020)', cat: 'Contracts & Finance', desc: 'Maximum seller obligation including EU customs clearance, VAT/duties, and delivery to site.', where: 'PM-16' },
  { abbr: 'DLP', full: 'Defects Liability Period', cat: 'Contracts & Finance', desc: '12-24 month post-COD warranty period backed by final retention (`TR-06 5%`) requiring contractor defect rectification.', where: 'PM-35, Charter' },
  { abbr: 'EOT', full: 'Extension of Time', cat: 'Contracts & Finance', desc: 'Formal relief of Contractual Completion Date when an Employer-risk event impacts the P6 critical path.', where: 'PM-14, PM-20' },
  { abbr: 'EPC', full: 'Engineering, Procurement and Construction', cat: 'Contracts & Finance', desc: 'Turnkey lump-sum contract structure transferring design, OEM procurement, and build coordination to an EPC contractor.', where: 'PM-12, PM-14' },
  { abbr: 'EPCm', full: 'Engineering, Procurement and Construction Management', cat: 'Contracts & Finance', desc: 'Multi-prime client agency model where an EPCm firm manages separate CSA, HV, MEP, and OFCI packages without wrapping construction risk.', where: 'PM-12, PM-13' },
  { abbr: 'EXW', full: 'Ex Works (Incoterms 2020)', cat: 'Contracts & Finance', desc: 'Minimum seller responsibility; buyer collects OFCI plant directly at OEM factory gate and bears all transit/customs risk.', where: 'PM-16' },
  { abbr: 'FCA', full: 'Free Carrier (Incoterms 2020)', cat: 'Contracts & Finance', desc: 'Seller clears export and hands equipment to buyer-nominated carrier at factory or inland terminal.', where: 'PM-16' },
  { abbr: 'FIDIC', full: 'International Federation of Consulting Engineers', cat: 'Contracts & Finance', desc: 'Standard EU/international contract suite (`Yellow Book` D&B, `Silver Book` Turnkey EPC, 2017 Edition).', where: 'PM-13, PM-14' },
  { abbr: 'FX', full: 'Foreign Exchange', cat: 'Contracts & Finance', desc: 'Currency hedging exposure between `EUR` project capex/revenues and non-Euro OEM equipment (`USD`/`GBP`/`CHF`).', where: 'PM-04, SteerCo' },
  { abbr: 'ICC', full: 'International Chamber of Commerce', cat: 'Contracts & Finance', desc: 'Global trade body publishing the `ICC Incoterms 2020` rules (`EXW`, `FCA`, `CIF`, `DAP`, `DDP`) and ICC Arbitration.', where: 'PM-16' },
  { abbr: 'IRR', full: 'Internal Rate of Return', cat: 'Contracts & Finance', desc: 'Annualized unlevered/levered yield metric benchmarked against Sponsor `WACC` hurdle rate (`> 8.5%`) for FID.', where: 'PM-04, PM-05' },
  { abbr: 'ITT', full: 'Invitation to Tender', cat: 'Contracts & Finance', desc: 'Formal bidding dossier issuing Works Information, Employer\'s Requirements, P6 milestones, and contract Z-clauses.', where: 'PM-15' },
  { abbr: 'LDs', full: 'Liquidated Damages', cat: 'Contracts & Finance', desc: 'Pre-agreed daily/milestone delay or performance (`PUE`/`kW`) damages deducted from contractor payments on breach.', where: 'PM-13, PM-14' },
  { abbr: 'NEC4', full: 'New Engineering Contract (4th Edition)', cat: 'Contracts & Finance', desc: 'Collaborative UK/Ireland contract (`ECC Option A` Lump Sum / `Option C` Target Cost) using Early Warnings and time-barred Compensation Events.', where: 'PM-13, PM-14' },
  { abbr: 'NPV', full: 'Net Present Value', cat: 'Contracts & Finance', desc: 'Present value of 10-year colocation cash flows minus initial `EUR` Capex discounted at `WACC` (`> EUR 0` required).', where: 'PM-04' },
  { abbr: 'NRM1', full: 'RICS New Rules of Measurement 1', cat: 'Contracts & Finance', desc: 'UK/Ireland elemental cost estimating standard used to benchmark CSA, MEP, and data hall `EUR/MW` budgets.', where: 'PM-18' },
  { abbr: 'OFCI', full: 'Owner-Furnished Contractor-Installed', cat: 'Contracts & Finance', desc: 'Procurement model where Client pre-buys long-lead OEM plant (`45MVA` tx, `GIS`, `UPS`, gensets, chillers) and novates/hands off for site installation.', where: 'PM-12, PM-16' },
  { abbr: 'Opex', full: 'Operating Expenditure', cat: 'Contracts & Finance', desc: 'Recurring annual electricity, water, staffing, maintenance, rates, and insurance costs over facility operation.', where: 'PM-04, PM-34' },
  { abbr: 'PI', full: 'Professional Indemnity (Insurance)', cat: 'Contracts & Finance', desc: 'Mandatory design liability insurance carried by Designers, PSDP, and BCAR Assigned Certifiers.', where: 'EU-13' },
  { abbr: 'PPA', full: 'Power Purchase Agreement', cat: 'Contracts & Finance', desc: 'Bilateral contract fixing long-term electricity pricing (`EUR/kWh`) and renewable attributes with an energy generator.', where: 'PM-04, EU-12' },
  { abbr: 'PQQ', full: 'Pre-Qualification Questionnaire', cat: 'Contracts & Finance', desc: 'First-stage vendor screening evaluating financial balance sheet, Irish H&S record, and hyperscale credentials.', where: 'PM-15' },
  { abbr: 'RFI / RFP', full: 'Request for Information / Request for Proposal', cat: 'Contracts & Finance', desc: 'Market capability sounding (`RFI`) or commercial tender (`RFP`), plus formal technical clarification queries during construction (`RFI`).', where: 'PM-15, PM-17' },
  { abbr: 'RICS', full: 'Royal Institution of Chartered Surveyors', cat: 'Contracts & Finance', desc: 'Global/Irish-recognized body governing QS cost planning (`NRM1`), final accounts, and commercial valuations.', where: 'PM-18, PM-35' },
  { abbr: 'ROI', full: 'Return on Investment', cat: 'Contracts & Finance', desc: 'Cumulative profitability ratio evaluating capital allocation efficiency across facility phases.', where: 'PM-04' },
  { abbr: 'RTA', full: 'Recommendation to Award', cat: 'Contracts & Finance', desc: 'Executive commercial approval paper summarizing TBE/BAFO scoring and seeking SteerCo/IC contract execution sign-off.', where: 'PM-15' },
  { abbr: 'SCL', full: 'Society of Construction Law (Delay Protocol)', cat: 'Contracts & Finance', desc: 'Forensic schedule analysis framework (`Time Impact Analysis`) governing `EOT` entitlement and concurrent delay.', where: 'PM-14, PM-20' },
  { abbr: 'TBE', full: 'Technical Bid Evaluation', cat: 'Contracts & Finance', desc: 'Weighted compliance scoring of contractor/OEM bids across specs, program, HSE, and exclusions prior to commercial opening.', where: 'PM-15' },
  { abbr: 'TOC', full: 'Taking-Over Certificate', cat: 'Contracts & Finance', desc: 'FIDIC / contract certificate formally transferring site possession, risk, and DLP commencement to Employer.', where: 'PM-31' },
  { abbr: 'VAT', full: 'Value-Added Tax', cat: 'Contracts & Finance', desc: 'Irish/EU indirect tax requiring RCT reverse-charge and customs cash-flow treatment in Capex models.', where: 'PM-16, PM-18' },
  { abbr: 'VO / VOs', full: 'Variation Order(s)', cat: 'Contracts & Finance', desc: 'Contractual price/scope amendment instruction executed under FIDIC or traditional construction forms.', where: 'PM-20, PM-35' },
  { abbr: 'VPPA', full: 'Virtual Power Purchase Agreement', cat: 'Contracts & Finance', desc: 'Financial Contract-for-Difference settling renewable electricity prices without physical grid sleeving, issuing `GO` certificates.', where: 'EU-12' },
  { abbr: 'WACC', full: 'Weighted Average Cost of Capital', cat: 'Contracts & Finance', desc: 'Blended debt/equity hurdle discount rate (`8.5%` baseline) used in 10-year `DC36-EU` `NPV` analysis.', where: 'PM-04' },

  // IE & EU Statutory
  { abbr: 'AA', full: 'Appropriate Assessment (EU Habitats Directive)', cat: 'IE & EU Statutory', desc: 'Statutory screening and Natura Impact Statement ensuring zero adverse effect on protected European Natura 2000 sites.', where: 'EU-01, EU-02' },
  { abbr: 'ABP', full: 'An Bord Pleanala (An Coimisiun Pleanala)', cat: 'IE & EU Statutory', desc: 'Ireland\'s national independent planning appeals board handling Strategic Infrastructure Development (`SID`) and third-party planning appeals.', where: 'EU-01, EU-05' },
  { abbr: 'AER', full: 'Annual Environmental Report', cat: 'IE & EU Statutory', desc: 'Mandatory yearly EPA Industrial Emissions compliance filing summarizing emissions, noise, waste, and resource efficiency.', where: 'EU-03' },
  { abbr: 'AERMOD', full: 'AMS/EPA Regulatory Air Dispersion Model', cat: 'IE & EU Statutory', desc: 'Gaussian plume model simulating `NOx`/`NO2` ground concentrations from `16x 2.5MVA` gensets to justify stack heights.', where: 'EU-03' },
  { abbr: 'AF1 / AF2', full: 'HSA Construction Notification Forms AF1 & AF2', cat: 'IE & EU Statutory', desc: 'Mandatory Irish Health & Safety Authority filings submitted by Client (`AF1`, pre-design/start) and PSCS (`AF2`, `>30 days / 500 person-days`).', where: 'EU-16, EU-17' },
  { abbr: 'AG4', full: 'EPA Air Dispersion Modelling Guidance Note AG4', cat: 'IE & EU Statutory', desc: 'Irish EPA technical guidance governing cumulative `NO2` air modeling for data centre standby generation.', where: 'EU-03' },
  { abbr: 'BAT / BREF', full: 'Best Available Techniques / Reference Document', cat: 'IE & EU Statutory', desc: 'EU Industrial Emissions standards (`LCP BREF`) dictating `SCR` exhaust abatement and efficiency obligations.', where: 'EU-04' },
  { abbr: 'BCAR', full: 'Building Control (Amendment) Regulations 2014 (IE)', cat: 'IE & EU Statutory', desc: 'Statutory Irish building certification regime requiring Design Certifier, Assigned Certifier, Inspection Plan, and `CCC`.', where: 'PM-31, EU-13..EU-15' },
  { abbr: 'BCMS', full: 'Building Control Management System', cat: 'IE & EU Statutory', desc: 'National Irish online statutory portal hosting Commencement Notices, `FSC`/`DAC` tracking, and `CCC` registration.', where: 'EU-13, EU-15' },
  { abbr: 'CCC', full: 'Certificate of Compliance on Completion', cat: 'IE & EU Statutory', desc: 'Mandatory BCAR final statutory sign-off validating Building Regulations compliance; building cannot legally open without registration (`M7060`).', where: 'PM-31, PM-36, EU-15' },
  { abbr: 'CRU', full: 'Commission for Regulation of Utilities (IE)', cat: 'IE & EU Statutory', desc: 'Irish energy regulator issuing Large Energy User (`LEU`) grid connection directions requiring dispatchable BESS/gen and renewable additionality.', where: 'PM-02, EU-09, EU-12' },
  { abbr: 'CSCS', full: 'Construction Skills Certification Scheme', cat: 'IE & EU Statutory', desc: 'Statutory SOLAS Irish plant/high-risk trade cards alongside Safe Pass audited by PSCS on site.', where: 'PM-22, EU-17' },
  { abbr: 'DAC', full: 'Disability Access Certificate (BCAR Part M)', cat: 'IE & EU Statutory', desc: 'Statutory Local Authority certificate confirming accessible entry, circulation, and welfare compliance prior to occupation.', where: 'EU-14, EU-15' },
  { abbr: 'DCC / EU 2016/1388', full: 'EU Demand Connection Code Regulation', cat: 'IE & EU Statutory', desc: 'Binding EU network code governing `110kV` fault ride-through, frequency response, and RMS dynamic simulation studies.', where: 'EU-10' },
  { abbr: 'DOC', full: 'Department of Construction / Building Control Dept.', cat: 'IE & EU Statutory', desc: 'Legacy statutory inspection counterpart to Irish Local Authority Building Control / Fire Authority completion audits.', where: 'Charter' },
  { abbr: 'DS3', full: 'Delivering a Secure, Sustainable Electricity System', cat: 'IE & EU Statutory', desc: 'EirGrid grid ancillary services program compensating fast-acting `BESS` / synchronous inertia for high wind/solar grids.', where: 'EU-09' },
  { abbr: 'ECP', full: 'Enduring Connection Policy (EirGrid / ESBN)', cat: 'IE & EU Statutory', desc: 'Irish regulatory batching framework governing `110kV` grid connection offers and Maximum Import Capacity (`MIC`) awards.', where: 'PM-02, EU-07' },
  { abbr: 'EEC', full: 'European Economic Community (Directive Prefix)', cat: 'IE & EU Statutory', desc: 'Pre-EU treaty legislation code such as EU Habitats Directive `92/43/EEC` governing Natura 2000 `AA` screening.', where: 'EU-02' },
  { abbr: 'EED', full: 'EU Energy Efficiency Directive (EU) 2023/1791 & Reg. 2024/1364', cat: 'IE & EU Statutory', desc: 'Mandatory EU law requiring data centres `>= 500 kW` to report `PUE`, `WUE`, `ERF`, `REF`, and waste-heat readiness annually.', where: 'PM-03, PM-36, EU-12' },
  { abbr: 'EIA / EIAR', full: 'Environmental Impact Assessment (Report)', cat: 'IE & EU Statutory', desc: 'Mandatory EU Directive (`2014/52/EU`) multi-volume study assessing noise, air, drainage, traffic, and biodiversity for planning grant.', where: 'EU-01, EU-02' },
  { abbr: 'EirGrid', full: 'Irish Transmission System Operator (TSO)', cat: 'IE & EU Statutory', desc: 'State operator of Ireland\'s `110kV/220kV/400kV` transmission grid issuing `ECP` offers, RMS studies, and `ION`/`FON` energization.', where: 'PM-02, EU-07..EU-11' },
  { abbr: 'EPA', full: 'Environmental Protection Agency (Ireland)', cat: 'IE & EU Statutory', desc: 'National environmental regulator granting and auditing the Industrial Emissions Licence (`IEL`) for thermal capacity `> 50 MWth`.', where: 'EU-03, EU-04' },
  { abbr: 'ESA', full: 'Environmental Site Assessment (Phase 1 / 2)', cat: 'IE & EU Statutory', desc: 'Soil, groundwater contamination, and historical industrial risk screening completed during pre-purchase land due diligence.', where: 'PM-02' },
  { abbr: 'ESB / ESBN', full: 'Electricity Supply Board / ESB Networks (IE)', cat: 'IE & EU Statutory', desc: 'Irish Distribution System Operator & Transmission Asset Owner managing `110kV` contestable substation interface and cut-in.', where: 'EU-07, EU-11' },
  { abbr: 'FI', full: 'Further Information Request (Planning)', cat: 'IE & EU Statutory', desc: 'Formal statutory pause by Local Authority / `ABP` seeking extra acoustic, traffic, drainage, or grid data prior to determination.', where: 'EU-02, EU-05' },
  { abbr: 'FSC', full: 'Fire Safety Certificate (BCAR Part B)', cat: 'IE & EU Statutory', desc: 'Mandatory statutory approval of compartmentation, escape distances, smoke venting, and fire suppression prior to superstructure build.', where: 'EU-14, EU-15' },
  { abbr: 'GDSDS', full: 'Greater Dublin Strategic Drainage Study', cat: 'IE & EU Statutory', desc: 'Regional attenuation, `SuDS`, and climate-adjusted `+20%` stormwater design rules for Dublin developments.', where: 'EU-06' },
  { abbr: 'GO / REGO', full: 'Guarantee of Origin / Renewable Energy Guarantee of Origin', cat: 'IE & EU Statutory', desc: 'Traceable electronic certificates proving MWh electricity came from renewable generation (`EU RED III` / `EED REF`).', where: 'EU-12' },
  { abbr: 'HSA', full: 'Health and Safety Authority (Ireland)', cat: 'IE & EU Statutory', desc: 'National workplace safety regulator enforcing `S.I. No. 291/2013`, `PSDP`/`PSCS` duties, `AF1` notices, and site inspections.', where: 'PM-22, EU-16..EU-18' },
  { abbr: 'IED / IEL', full: 'Industrial Emissions Directive / Licence', cat: 'IE & EU Statutory', desc: 'EU Directive `2010/75/EU` and Irish EPA operating licence required when aggregated thermal input exceeds `50 MWth`.', where: 'EU-03, EU-04' },
  { abbr: 'JR', full: 'Judicial Review', cat: 'IE & EU Statutory', desc: 'High Court legal challenge against an `ABP` planning grant or `EPA` licence; top schedule delay risk (`RSK-01`).', where: 'EU-05, SteerCo' },
  { abbr: 'LCP', full: 'Large Combustion Plant', cat: 'IE & EU Statutory', desc: 'EU `BREF` classification covering `>= 50 MWth` standby generator banks subject to `NOx`, CO, and operating-hour caps.', where: 'EU-04' },
  { abbr: 'LEU', full: 'Large Energy User', cat: 'IE & EU Statutory', desc: 'CRU regulatory classification for hyperscale data centres requiring flexible demand, on-site BESS/gen, and zero net grid congestion.', where: 'EU-09, EU-12' },
  { abbr: 'MIC', full: 'Maximum Import Capacity', cat: 'IE & EU Statutory', desc: 'Contracted firm `kVA`/`MW` utility grid connection capacity granted under EirGrid / ESBN Connection Agreement.', where: 'PM-02, EU-07' },
  { abbr: 'NCC', full: 'National Control Centre (EirGrid)', cat: 'IE & EU Statutory', desc: 'EirGrid\'s national transmission operations centre interfacing with site `SCADA` for LEU flexible demand & curtailment signals.', where: 'EU-09' },
  { abbr: 'NIS2', full: 'EU Network & Information Security Directive 2', cat: 'IE & EU Statutory', desc: 'Binding EU cybersecurity directive imposing OT/BMS/SCADA resilience and incident reporting on critical digital infrastructure.', where: 'PM-31, EU-15' },
  { abbr: 'NPWS', full: 'National Parks and Wildlife Service (IE)', cat: 'IE & EU Statutory', desc: 'Irish statutory consultee reviewing `AA` / Habitats Directive compliance during EIAR and planning.', where: 'EU-02' },
  { abbr: 'OPW', full: 'Office of Public Works (IE)', cat: 'IE & EU Statutory', desc: 'Irish flood authority publishing CFRAM fluvial/coastal flood maps governing `DC36-EU` siting and finished floor levels.', where: 'PM-02, EU-06' },
  { abbr: 'PCCC', full: 'Fire Prevention & Rescue Police / Fire Officer', cat: 'IE & EU Statutory', desc: 'Fire authority clearance prerequisite blocking building completion acceptance until active/passive life-safety passes audit.', where: 'EU-14, Charter' },
  { abbr: 'PSCS', full: 'Project Supervisor Construction Stage', cat: 'IE & EU Statutory', desc: 'Statutory principal contractor (`S.I. No. 291/2013`) appointed in writing by Client to coordinate site safety, RAMS, and AF2.', where: 'PM-22, EU-16..EU-18' },
  { abbr: 'PSDP', full: 'Project Supervisor Design Process', cat: 'IE & EU Statutory', desc: 'Statutory competent designer (`S.I. No. 291/2013`) appointed at Stage 1 to eliminate design hazards and compile the Safety File.', where: 'EU-16..EU-18' },
  { abbr: 'RED III', full: 'EU Renewable Energy Directive III (2023/2413)', cat: 'IE & EU Statutory', desc: 'EU legislation raising renewable energy targets and governing `HVO` biofuel sustainability and hourly `CFE`/`REF` matching.', where: 'EU-04, EU-12' },
  { abbr: 'SAC / SPA', full: 'Special Area of Conservation / Special Protection Area', cat: 'IE & EU Statutory', desc: 'EU Natura 2000 protected habitat/bird zones requiring `AA` Screening and ecological buffers.', where: 'EU-02' },
  { abbr: 'SEAI', full: 'Sustainable Energy Authority of Ireland', cat: 'IE & EU Statutory', desc: 'Irish national agency administering `EU EED` data centre reporting guidance, energy audits, and heat-network grants.', where: 'PM-36, EU-12' },
  { abbr: 'SEMOpx', full: 'Single Electricity Market Operator Exchange', cat: 'IE & EU Statutory', desc: 'All-island Ireland/NI wholesale day-ahead and intraday electricity trading market.', where: 'EU-12' },
  { abbr: 'S.I. 291', full: 'Statutory Instrument No. 291 of 2013 (Construction Regs)', cat: 'IE & EU Statutory', desc: 'Core Irish construction H&S law mandating written `PSDP`/`PSCS` appointments, Preliminary H&S Plan, and Safety File.', where: 'PM-22, EU-16..EU-18' },
  { abbr: 'SID', full: 'Strategic Infrastructure Development', cat: 'IE & EU Statutory', desc: 'Fast-track direct-to-`An Bord Pleanala` planning pathway for major data centres and `110kV` substations.', where: 'EU-01, EU-05' },
  { abbr: 'SSFRA', full: 'Site-Specific Flood Risk Assessment', cat: 'IE & EU Statutory', desc: 'Hydrological report proving 1-in-100 / 1-in-1000 year flood immunity plus `+20%` climate-change allowance.', where: 'EU-06' },
  { abbr: 'SuDS', full: 'Sustainable Drainage Systems', cat: 'IE & EU Statutory', desc: 'Nature-based stormwater attenuation (`swales`, `QBAR` greenfield runoff control, interceptors) required by Irish councils.', where: 'EU-06' },
  { abbr: 'TGD', full: 'Technical Guidance Documents (Irish Building Regs)', cat: 'IE & EU Statutory', desc: 'Official Irish statutory compliance guides (`TGD Part B` Fire Safety, `Part L` Energy Conservation, `Part M` Access).', where: 'EU-14' },
  { abbr: 'TII', full: 'Transport Infrastructure Ireland', cat: 'IE & EU Statutory', desc: 'Prescribed statutory consultee reviewing national road, motorway junction, and abnormal-load haulage impacts.', where: 'EU-02, PM-16' },
  { abbr: 'TSO', full: 'Transmission System Operator', cat: 'IE & EU Statutory', desc: 'National high-voltage grid operator (`EirGrid` in Ireland) owning system stability, grid codes, and substation energization.', where: 'EU-07..EU-11' },
  { abbr: 'UXO', full: 'Unexploded Ordnance', cat: 'IE & EU Statutory', desc: 'Pre-piling geotechnical hazard clearance check executed prior to `600` CFA pile mobilization.', where: 'PM-02' },

  // Engineering & MEP
  { abbr: 'ATS', full: 'Automatic Transfer Switch / Tier Sustainability', cat: 'Engineering & MEP', desc: 'Fast static/mechanical switch transferring critical load between utility mains and standby UPS/gensets (`<10s` blackout ride).', where: 'PM-25, PM-29' },
  { abbr: 'BESS', full: 'Battery Energy Storage System', cat: 'Engineering & MEP', desc: 'On-site utility-scale Li-Ion/LFP battery bank enabling CRU LEU grid compliance, `FFR`/`DS3` response, and blackout ride-through.', where: 'PM-26, EU-09' },
  { abbr: 'BMS', full: 'Building Management System', cat: 'Engineering & MEP', desc: 'Automated HVAC, chiller plant, CRAH, damper, and environmental control telemetry network.', where: 'PM-27, PM-36' },
  { abbr: 'BoD', full: 'Basis of Design', cat: 'Engineering & MEP', desc: 'Engineering translation of Owner Requirements into `kW`, `N+2` redundancy, `PUE 1.25`, `18 kN/m2` slab, and Tier III topology.', where: 'PM-03, PreNTP Controls' },
  { abbr: 'CHW', full: 'Chilled Water', cat: 'Engineering & MEP', desc: 'Closed-loop heat rejection circuit circulating water between `6x 1200 RT` chillers, `TES` tanks, and `72x` CRAHs.', where: 'PM-27, PM-28' },
  { abbr: 'CT / PT', full: 'Current Transformer / Potential (Voltage) Transformer', cat: 'Engineering & MEP', desc: 'Precision HV/MV instrument transformers feeding protection relays and Class-0.2 `EPMS`/`EED` revenue meters.', where: 'PM-26, EU-11' },
  { abbr: 'DIgSILENT / PSS/E (PSSE)', full: 'Power System Simulation Tools (PowerFactory / PSS/E)', cat: 'Engineering & MEP', desc: 'Industry grid simulation suites required by EirGrid to validate RMS transient stability, arc flash, and fault levels.', where: 'EU-10' },
  { abbr: 'DUoS', full: 'Distribution Use of System (Tariffs)', cat: 'Engineering & MEP', desc: 'Grid network peak capacity charges mitigated through scheduled BESS peak-shaving dispatch.', where: 'EU-09' },
  { abbr: 'EPMS', full: 'Electrical Power Monitoring System', cat: 'Engineering & MEP', desc: 'High-speed SCADA/ION metering layer capturing real-time kW, harmonics, breaker trips, and `EU EED` PUE sub-metering.', where: 'PM-26, PM-36' },
  { abbr: 'ERF', full: 'Energy Reuse Factor (EU EED)', cat: 'Engineering & MEP', desc: 'Share of total data centre energy recovered and exported (`>= 0.15` target) via District Heating export skid (`A5390`).', where: 'PM-03, PM-27, PM-36' },
  { abbr: 'ESD', full: 'Electrostatic Discharge / Emergency Shutdown', cat: 'Engineering & MEP', desc: 'White-space anti-static conductive flooring / contamination control, or Emergency Power Off (`EPO`) interlock.', where: 'PM-24' },
  { abbr: 'FFR', full: 'Fast Frequency Response', cat: 'Engineering & MEP', desc: 'Sub-second grid frequency support service provided by on-site `BESS` under EirGrid `DS3`.', where: 'EU-09' },
  { abbr: 'FON / ION', full: 'Final / Interim Operational Notification', cat: 'Engineering & MEP', desc: 'Phased EirGrid grid-code compliance gates moving from temporary energization testing (`ION`) to commercial approval (`FON`).', where: 'EU-11' },
  { abbr: 'GIS', full: 'Gas-Insulated Switchgear (22kV / 110kV SF6-Free)', cat: 'Engineering & MEP', desc: 'Compact sealed HV/MV switchgear lineups A & B (`DC36-EU` mandates zero-GWP `SF6-free` clean-air/vacuum GIS).', where: 'PM-26, EU-11' },
  { abbr: 'GWP', full: 'Global Warming Potential', cat: 'Engineering & MEP', desc: 'EU F-Gas Regulation (`2024/573`) metric banning high-GWP refrigerants (`HFCs`) and `SF6` (`GWP = 24,300`).', where: 'PM-03, PM-27' },
  { abbr: 'HV / MV / LV', full: 'High / Medium / Low Voltage', cat: 'Engineering & MEP', desc: 'Facility electrical tiers: `110kV` utility GIS (`HV`), `22kV` campus rings (`MV`), and `400V/415V` hall distribution (`LV`).', where: 'PM-26' },
  { abbr: 'HVO', full: 'Hydrotreated Vegetable Oil', cat: 'Engineering & MEP', desc: 'EN 15940 drop-in renewable paraffinic diesel stored in `3x 80 m3` tanks giving `72h` low-carbon standby autonomy.', where: 'PM-26, EU-04' },
  { abbr: 'IR', full: 'Infrared Thermography', cat: 'Engineering & MEP', desc: 'Non-contact thermal imaging scan performed on busways, breakers, and terminations under full `36 MW` `IST` load.', where: 'PM-29' },
  { abbr: 'kV / kVA / kW / kWh', full: 'Kilovolt / Kilovolt-Ampere / Kilowatt / Kilowatt-Hour', cat: 'Engineering & MEP', desc: 'Core electrical units measuring line voltage (`110kV`), apparent transformer rating, real critical IT power (`36,000 kW`), and energy.', where: 'All MEP / Controls' },
  { abbr: 'LOTO', full: 'Lockout / Tagout', cat: 'Engineering & MEP', desc: 'Mandatory electrical/mechanical energy isolation and padlock permit system enforced by `SAP` from L3 energization (`M6260`).', where: 'PM-28, SteerCo' },
  { abbr: 'M&E / MEP', full: 'Mechanical & Electrical / Mechanical, Electrical & Plumbing', cat: 'Engineering & MEP', desc: 'Active power, cooling, fire protection, and control packages comprising ~`65-75%` of data centre Capex.', where: 'PM-12, PM-25..PM-28' },
  { abbr: 'MMR', full: 'Meet-Me-Room (MMR-A / MMR-B)', cat: 'Engineering & MEP', desc: 'Physically separated carrier telecom demarcation vaults connecting external dark fibre rings into the white space.', where: 'PM-03, Charter' },
  { abbr: 'MW / MVA / MWh / MWth', full: 'Megawatt / Megavolt-Ampere / Megawatt-Hour / Megawatt Thermal', cat: 'Engineering & MEP', desc: 'Facility scale units: `36 MW` critical IT, `2x 45 MVA` transformers, `BESS` `MWh` storage, and `>50 MWth` EPA combustion threshold.', where: 'Charter, EU-03' },
  { abbr: 'NOx / NO2', full: 'Nitrogen Oxides / Nitrogen Dioxide', cat: 'Engineering & MEP', desc: 'Regulated exhaust pollutants from `16x` diesel/HVO generators abated via `SCR` and modeled via `AERMOD` (`AG4`).', where: 'EU-03, EU-04' },
  { abbr: 'PDU / RPP', full: 'Power Distribution Unit / Remote Power Panel', cat: 'Engineering & MEP', desc: 'Hall-level `22kV/400V` step-down transformers and branch circuit breaker cabinets feeding IT server busbars.', where: 'PM-26' },
  { abbr: 'PLC / SCADA', full: 'Programmable Logic Controller / Supervisory Control & Data Acquisition', cat: 'Engineering & MEP', desc: 'Industrial generator/switchgear paralleling automation and real-time HV/MV breaker monitoring network.', where: 'PM-26, PM-27' },
  { abbr: 'PUE', full: 'Power Usage Effectiveness', cat: 'Engineering & MEP', desc: 'Ratio `Total Facility Energy / IT Equipment Energy` (`1.25` annualized Irish design target under `EU EED` vs `1.00` ideal).', where: 'PM-03, PM-36, EU-12' },
  { abbr: 'REF', full: 'Renewable Energy Factor (EU EED)', cat: 'Engineering & MEP', desc: 'Ratio of certified renewable electricity consumed over total facility electricity, tracked via hourly `CFE` / `GO` audits.', where: 'PM-36, EU-12' },
  { abbr: 'RMS', full: 'Root Mean Square Dynamic Simulation', cat: 'Engineering & MEP', desc: 'Transient electro-mechanical grid model proving `110kV` substation and `BESS` stability per `EU 2016/1388`.', where: 'EU-10' },
  { abbr: 'SCR', full: 'Selective Catalytic Reduction', cat: 'Engineering & MEP', desc: 'Urea-injected exhaust after-treatment fitted to standby gensets to reduce `NOx` emissions by `>90%` under `EPA IEL`.', where: 'EU-04, PM-26' },
  { abbr: 'SF6', full: 'Sulphur Hexafluoride', cat: 'Engineering & MEP', desc: 'Potent greenhouse insulating gas banned by `EU F-Gas` rules in new medium-voltage switchgear (`SF6-Free` GIS required).', where: 'PM-26, EU-11' },
  { abbr: 'SLD', full: 'Single-Line Diagram', cat: 'Engineering & MEP', desc: 'Master schematic tracing dual A+B power distribution paths from `110kV` utility grid to server rack PDUs.', where: 'PM-03, PM-26' },
  { abbr: 'SPOF', full: 'Single Point of Failure', cat: 'Engineering & MEP', desc: 'Any component or common pathway whose failure drops IT load; strictly zero allowed under `Tier III / EN 50600 Class 3`.', where: 'PM-03, PM-29' },
  { abbr: 'STATCOM', full: 'Static Synchronous Compensator', cat: 'Engineering & MEP', desc: 'Power-electronic device regulating `110kV` bus voltage, power factor, and harmonics per `ENA G5/5`.', where: 'EU-10' },
  { abbr: 'TES', full: 'Thermal Energy Storage', cat: 'Engineering & MEP', desc: 'Stratified chilled-water buffer tanks riding through chiller restart during utility-to-generator power transition (`A5370`, `A6450`).', where: 'PM-27, PM-29' },
  { abbr: 'THD', full: 'Total Harmonic Distortion', cat: 'Engineering & MEP', desc: 'Power quality metric verifying non-linear UPS/VFD currents stay inside EirGrid / `ENA G5/5` limits.', where: 'EU-10' },
  { abbr: 'UPS', full: 'Uninterruptible Power Supply', cat: 'Engineering & MEP', desc: '`36x 1000kVA` modular double-conversion UPS + LFP battery strings supplying zero-break clean power to IT halls.', where: 'PM-26' },
  { abbr: 'VESDA', full: 'Very Early Smoke Detection Apparatus', cat: 'Engineering & MEP', desc: 'Laser aspirating air-sampling pipework detecting microscopic pre-combustion particulates inside data halls prior to gas dump.', where: 'PM-25, EU-14' },
  { abbr: 'VFD', full: 'Variable Frequency Drive', cat: 'Engineering & MEP', desc: 'Electronic motor speed controller modulating pumps, fans, and chillers at part-load to maximize `PUE` efficiency.', where: 'PM-27' },
  { abbr: 'VLF', full: 'Very Low Frequency (Hi-Pot Test)', cat: 'Engineering & MEP', desc: 'Non-destructive `0.1 Hz` high-voltage cable insulation integrity test performed at Commissioning Level 3 (`A6210`).', where: 'PM-28' },
  { abbr: 'WUE', full: 'Water Usage Effectiveness', cat: 'Engineering & MEP', desc: 'Annual cooling water consumed per IT kWh (`<= 0.25 L/kWh` target via free-cooling bias & rainwater RO harvesting).', where: 'PM-03, PM-36' },

  // Standards
  { abbr: 'AACE', full: 'Association for the Advancement of Cost Engineering', cat: 'Standards', desc: 'Standard defining `Class 5` (order-of-magnitude) through `Class 1` (tender/control) Capex estimate accuracy bands.', where: 'PM-18' },
  { abbr: 'ASHRAE', full: 'American Society of Heating, Refrigerating & Air-Conditioning Engineers', cat: 'Standards', desc: 'Author of `TC 9.9` server thermal envelopes (`18-27 degC`) and `Guideline 0` L1-L5 commissioning methodology.', where: 'PM-03, PM-28, PM-29' },
  { abbr: 'ATD / ATS', full: 'Accredited Tier Designer / Accredited Tier Specialist', cat: 'Standards', desc: 'Uptime Institute professional credentials required to certify Tier III topology (`TCDD`) and constructed audit (`TCCF`).', where: 'PM-01, PM-03, PM-31' },
  { abbr: 'BS / EN', full: 'British Standard / European Norm', cat: 'Standards', desc: 'Harmonized technical codes enforced across Ireland/EU engineering, structural Eurocodes, and fire protection.', where: 'PM-03, EU-14' },
  { abbr: 'BSRIA', full: 'Building Services Research and Information Association', cat: 'Standards', desc: 'Author of `BG 29` (pre-commission pipework flushing) and `BG 63` (Soft Landings post-occupancy evaluation).', where: 'PM-28, PM-36' },
  { abbr: 'CE / EN 50600', full: 'Conformite Europeenne / European Standard EN 50600', cat: 'Standards', desc: 'Europe\'s unified data centre standard governing Availability Classes `1-4` (power, cooling, security) and KPI metrics.', where: 'PM-03, PM-31' },
  { abbr: 'CIBSE', full: 'Chartered Institution of Building Services Engineers', cat: 'Standards', desc: 'UK/Ireland engineering standard body authoring `Code M` Commissioning Management framework (`L1-L5`).', where: 'PM-28..PM-30' },
  { abbr: 'ENA G5/5 / G99', full: 'Energy Networks Association G5/5 & G99', cat: 'Standards', desc: 'Engineering Recommendations regulating utility harmonic distortion (`G5/5`) and embedded generation connection (`G99`).', where: 'EU-10' },
  { abbr: 'IEC', full: 'International Electrotechnical Commission', cat: 'Standards', desc: 'Global electrical equipment testing and switchgear safety standards (`IEC 61439`, `62271`, `61850`).', where: 'PM-26, PM-28' },
  { abbr: 'ISO 19650', full: 'BS EN ISO 19650 BIM Information Management', cat: 'Standards', desc: 'International Common Data Environment (`CDE`) standard governing `EIR`, `BEP`, `MIDP`, naming, and `S0-S4 / A1-A7` suitability.', where: 'PM-11, PM-33' },
  { abbr: 'ISO 22237', full: 'ISO/IEC 22237 Data Centre Facilities & Infrastructures', cat: 'Standards', desc: 'Global counterpart harmonized directly with `EN 50600` defining Availability Class 3 topology.', where: 'PM-03' },
  { abbr: 'ISO 31000', full: 'ISO 31000 Risk Management Standard', cat: 'Standards', desc: 'Framework structuring risk identification, Likelihood x Impact (`L x I`) scoring, triggers, and governance escalation.', where: 'PM-21' },
  { abbr: 'ISO 9001', full: 'ISO 9001 Quality Management System', cat: 'Standards', desc: 'Quality assurance benchmark underpinning the Construction Quality Plan (`CQP`), `ITPs`, and `NCR` closeout.', where: 'PM-22' },
  { abbr: 'M&O', full: 'Management & Operations (Uptime Stamp of Approval)', cat: 'Standards', desc: 'Uptime Institute audit verifying operational staffing, SOP/MOP/EOP procedures, and `2N/N+2` human-factor readiness.', where: 'PM-32' },
  { abbr: 'NETA', full: 'InterNational Electrical Testing Association', cat: 'Standards', desc: 'Acceptance testing specifications (`ANSI/NETA ATS`) for MV/HV relays, breakers, transformers, and insulation.', where: 'PM-28' },
  { abbr: 'RIBA', full: 'Royal Institute of British Architects (Plan of Work)', cat: 'Standards', desc: '8-stage lifecycle roadmap (`Stages 0-7`: Strategic Definition through In-Use) structuring `DC36-EU` stage gates.', where: 'All Tracks' },
  { abbr: 'TCDD / TCCF', full: 'Tier Certification of Design Documents / Constructed Facility', cat: 'Standards', desc: 'Uptime Institute two-stage audit certifying design drawings (`TCDD`) and physical witness testing (`TCCF`, `A7040`).', where: 'PM-03, PM-31' },
  { abbr: 'UL', full: 'Underwriters Laboratories', cat: 'Standards', desc: 'Product fire, battery thermal-runaway (`UL 9540A` BESS/Li-Ion), and electrical safety certification standard.', where: 'PM-26' },

  // Cx, BIM & Ops
  { abbr: 'AIM', full: 'Asset Information Model', cat: 'Cx, BIM & Ops', desc: 'As-built `ISO 19650-3` digital twin + `COBie` asset register handed over to Operations (`FM`) within 30 days of COD.', where: 'PM-33, Charter' },
  { abbr: 'BEP', full: 'BIM Execution Plan', cat: 'Cx, BIM & Ops', desc: 'Project delivery plan defining LOD 400 modeling rules, clash workflows, CDE permissions, and file naming.', where: 'PM-11, SteerCo' },
  { abbr: 'BIM', full: 'Building Information Modelling', cat: 'Cx, BIM & Ops', desc: '3D federated digital model (`Revit`/`Navisworks`/`ACC`) eliminating CSA/MEP/HV spatial clashes before site build.', where: 'PM-11, PM-24' },
  { abbr: 'CDE', full: 'Common Data Environment', cat: 'Cx, BIM & Ops', desc: 'Single source-of-truth repository (`ACC` / `Aconex`) enforcing `WIP -> Shared -> Published -> Archive` workflows.', where: 'PM-11, PM-33' },
  { abbr: 'CMMS', full: 'Computerized Maintenance Management System', cat: 'Cx, BIM & Ops', desc: 'Facility software loaded with `COBie` asset tags, serial numbers, warranties, and `PPM` schedules before handover.', where: 'PM-33' },
  { abbr: 'COBie', full: 'Construction Operations Building Information Exchange', cat: 'Cx, BIM & Ops', desc: 'Structured asset data schema transferring MEP/HV equipment metadata cleanly from BIM into Ops `CMMS`.', where: 'PM-33' },
  { abbr: 'CQP', full: 'Construction Quality Plan', cat: 'Cx, BIM & Ops', desc: 'Overarching site QA/QC governance manual integrating contractor `ITPs`, lab testing, and `NCR` workflows.', where: 'PM-22' },
  { abbr: 'CSA', full: 'Civil, Structural & Architectural', cat: 'Cx, BIM & Ops', desc: 'Piling, foundations, precast/steel superstructure, weather-tight envelope (`M4350`), and site hardstands.', where: 'PM-24, PM-25' },
  { abbr: 'Cx', full: 'Commissioning', cat: 'Cx, BIM & Ops', desc: 'Structured quality verification process testing plant from factory (`L1`) to live full-load blackout integration (`L5`).', where: 'PM-28..PM-31' },
  { abbr: 'CxA', full: 'Commissioning Authority (Independent)', cat: 'Cx, BIM & Ops', desc: 'Independent third-party authority holding SteerCo non-overridable veto rights at Gates `M6260 (L3)`, `M6370 (L4)`, and `M6470 (L5)`.', where: 'PM-01, PM-28..PM-31' },
  { abbr: 'CxAlloy / CxTrack', full: 'Commissioning Management Platforms', cat: 'Cx, BIM & Ops', desc: 'Digital cloud commissioning tools logging `L1-L4` checksheets, red-tags, and burn-down of Commissioning Issues (`CxIL`).', where: 'PM-28, PM-30' },
  { abbr: 'CxIL', full: 'Commissioning Issues Log', cat: 'Cx, BIM & Ops', desc: 'Tracked Severity-1/2/3 defect list discovered during commissioning; zero Severity-1 items permitted before `TR-05`/`COD`.', where: 'PM-30, SteerCo' },
  { abbr: 'EIR', full: 'Exchange Information Requirements', cat: 'Cx, BIM & Ops', desc: 'Client ISO 19650 specification defining what digital BIM, COBie, and asset models contractors must deliver at each gate.', where: 'PM-11' },
  { abbr: 'EOP', full: 'Emergency Operating Procedure', cat: 'Cx, BIM & Ops', desc: 'Crisis response playbook executed during blackouts, fire suppression trips, or cooling failure drills (`Black-Hat`).', where: 'PM-32' },
  { abbr: 'FAT', full: 'Factory Acceptance Test', cat: 'Cx, BIM & Ops', desc: 'Witnessed Level 1/2 performance & shock-logger test at OEM plant (`45MVA` tx, `GIS`, `UPS`, gensets) prior to shipping (`M3120`).', where: 'PM-16, PM-28' },
  { abbr: 'FPT', full: 'Functional Performance Testing', cat: 'Cx, BIM & Ops', desc: 'Level 4 energized testing verifying each equipment subsystem behaves per Sequence of Operations (`SOO`).', where: 'PM-29' },
  { abbr: 'H&S / HSE', full: 'Health & Safety / Health, Safety & Environment', cat: 'Cx, BIM & Ops', desc: 'Site worker welfare, RAMS, `S.I. No. 291/2013` compliance, and environmental safeguards.', where: 'PM-22, EU-16..EU-18' },
  { abbr: 'IFC', full: 'Issued for Construction', cat: 'Cx, BIM & Ops', desc: 'Frozen, coordinated `RIBA Stage 4` engineering design set (`M2110`) approved for physical procurement and build.', where: 'PM-07, PM-11' },
  { abbr: 'IST', full: 'Integrated Systems Testing (Level 5)', cat: 'Cx, BIM & Ops', desc: 'Full-facility `48`-hour `36 MW` portable load-bank heat soak + `<10s` utility blackout failure test (`M6470`).', where: 'PM-30, Charter' },
  { abbr: 'ITP', full: 'Inspection and Test Plan', cat: 'Cx, BIM & Ops', desc: 'Trade-specific quality schedule defining Hold Points (`H`), Witness Points (`W`), and Review steps (`R`) for `BCAR` & `Cx`.', where: 'PM-22, EU-15' },
  { abbr: 'L1-L5', full: 'ASHRAE / CIBSE Commissioning Levels 1 through 5', cat: 'Cx, BIM & Ops', desc: '`L1` Factory FAT -> `L2` Site Red-Tag Install -> `L3` Static/Pre-Functional -> `L4` Functional Dynamic -> `L5` Integrated Systems Test (`IST`).', where: 'PM-28..PM-30' },
  { abbr: 'LOD', full: 'Level of Development (BIM LOD 300 / 400 / 500)', cat: 'Cx, BIM & Ops', desc: 'BIM geometry/data detail scale: `LOD 400` fabrication-ready clash-free design (`M2110`) up to `LOD 500` As-Built.', where: 'PM-11, PM-33' },
  { abbr: 'MIDP', full: 'Master Information Delivery Plan', cat: 'Cx, BIM & Ops', desc: 'Consolidated schedule of every BIM deliverable, model container, drawing, and COBie drop across all task teams.', where: 'PM-11' },
  { abbr: 'MOP', full: 'Method of Procedure', cat: 'Cx, BIM & Ops', desc: 'Step-by-step live switching or critical maintenance script preventing human-error outages in energized halls.', where: 'PM-32' },
  { abbr: 'NCR', full: 'Non-Conformance Report', cat: 'Cx, BIM & Ops', desc: 'Formal quality deviation record tracking root cause, engineering disposition, and re-inspection closure.', where: 'PM-22, PM-24' },
  { abbr: 'NDE', full: 'Non-Destructive Examination', cat: 'Cx, BIM & Ops', desc: 'Weld radiography, ultrasonic, and concrete integrity testing validating structural/piping quality without damage.', where: 'PM-22' },
  { abbr: 'NOC', full: 'Network Operations Centre', cat: 'Cx, BIM & Ops', desc: '24/7 operational monitoring hub inside the data centre requiring BCAR Part M accessibility and resilience.', where: 'EU-14, PM-32' },
  { abbr: 'O&M', full: 'Operations and Maintenance', cat: 'Cx, BIM & Ops', desc: 'Post-COD 24/7 facility engineering regime executing `PPM`, `MOPs`, and `2`-year critical spares management.', where: 'PM-32, PM-33' },
  { abbr: 'OEM', full: 'Original Equipment Manufacturer', cat: 'Cx, BIM & Ops', desc: 'Primary tier-1 plant makers (transformers, GIS switchgear, UPS, HVO gensets, chillers, BESS) requiring slot deposits.', where: 'PM-16, PM-28' },
  { abbr: 'OR&T', full: 'Operational Readiness and Transition', cat: 'Cx, BIM & Ops', desc: 'Stage 5-6 readiness stream (`A6510-A6540`) covering staffing, SOP/EOP/MOP library, `Black-Hat` drills, and spares handover.', where: 'PM-32, PM-34' },
  { abbr: 'PC / RFS', full: 'Practical Completion / Ready for Service', cat: 'Cx, BIM & Ops', desc: 'Contractual completion gate (`PC`) and tenant lease handover date (`RFS`) marking transition to live commercial operations.', where: 'PM-31' },
  { abbr: 'POE', full: 'Post-Occupancy Evaluation', cat: 'Cx, BIM & Ops', desc: '`RIBA Stage 7` / `BSRIA BG 63` seasonal 12-month verification auditing real winter/summer `PUE`, `WUE`, and `ERF`.', where: 'PM-36' },
  { abbr: 'PPM', full: 'Planned Preventive Maintenance', cat: 'Cx, BIM & Ops', desc: 'Scheduled OEM-prescribed servicing cycles loaded into `CMMS` prior to COD.', where: 'PM-33' },
  { abbr: 'QA/QC', full: 'Quality Assurance / Quality Control', cat: 'Cx, BIM & Ops', desc: 'Preventive quality processes (`QA`) and physical inspection/testing verification (`QC`) across CSA, MEP, and Cx.', where: 'PM-22' },
  { abbr: 'RAMS', full: 'Risk Assessment and Method Statement', cat: 'Cx, BIM & Ops', desc: 'Mandatory task-level safe work method reviewed and signed off by `PSCS` prior to high-risk site activities.', where: 'PM-22, EU-17' },
  { abbr: 'S0-S4 / A1-A7', full: 'ISO 19650 CDE Suitability Status Codes', cat: 'Cx, BIM & Ops', desc: 'Work-in-Progress (`WIP`), Shared (`S0-S4` review/approval), and Published (`A1-A7` authorized contractual baseline) file states.', where: 'PM-11, Charter' },
  { abbr: 'SAP', full: 'Senior Authorized Person', cat: 'Cx, BIM & Ops', desc: 'Certified high-voltage engineer legally holding `110kV/22kV` switching, `LOTO`, and Sanction-for-Test authority.', where: 'PM-28, EU-11' },
  { abbr: 'SAT', full: 'Site Acceptance Test', cat: 'Cx, BIM & Ops', desc: 'On-site delivery and functional readiness verification confirming no transit damage occurred post-`FAT`.', where: 'PM-16, PM-28' },
  { abbr: 'SLA', full: 'Service Level Agreement', cat: 'Cx, BIM & Ops', desc: 'Contractual availability (`99.999%`), temperature/humidity (`TC 9.9`), and SteerCo decision turnaround commitments.', where: 'PM-03, SteerCo' },
  { abbr: 'SOC', full: 'Security Operations Centre', cat: 'Cx, BIM & Ops', desc: '24/7 physical security hub monitoring `PIDS` fence sensors, biometrics, CCTV, and `PAS 68` vehicle sally ports.', where: 'PM-25, Charter' },
  { abbr: 'SOO', full: 'Sequence of Operations', cat: 'Cx, BIM & Ops', desc: 'Control-logic specification defining chiller staging, ATS transfer, BESS peak-shaving, and failover behavior.', where: 'PM-27, PM-29' },
  { abbr: 'SOP', full: 'Standard Operating Procedure', cat: 'Cx, BIM & Ops', desc: 'Routine operational instructions governing normal daily facility monitoring and inspections.', where: 'PM-32' },
  { abbr: 'WIP', full: 'Work in Progress (ISO 19650 CDE)', cat: 'Cx, BIM & Ops', desc: 'Private discipline authoring zone inside `CDE` prior to coordinator check and Shared (`S1`) release.', where: 'PM-11' },

  // Data & Misc
  { abbr: 'CFE', full: '24/7 Carbon-Free Energy', cat: 'Data & Misc', desc: 'Hourly grid-matched renewable power procurement standard surpassing annual `GO` certificates for `EU EED REF`.', where: 'EU-12' },
  { abbr: 'CSV / JSON', full: 'Comma-Separated Values / JavaScript Object Notation', cat: 'Data & Misc', desc: 'Export/import data formats supported by the `gogo/` dashboard for Study History CSV and full progress backups.', where: 'Dashboard Top/History' },
  { abbr: 'DC36-EU', full: 'Ireland / EU 36 MW Hyperscale Data Centre Portfolio', cat: 'Data & Misc', desc: 'Reference project (`4x 9 MW` halls, `835` workdays, `M1000` to `M7060`, `I.S. EN 50600 Class 3`) unified across XER, Excel & Portal.', where: 'All Modules' },
  { abbr: 'GDPR', full: 'EU General Data Protection Regulation', cat: 'Data & Misc', desc: 'Binding EU data privacy regulation governing access-control biometrics, CCTV retention, and tenant hosting compliance.', where: 'PM-31, EU-15' },
  { abbr: 'PCB', full: 'Printed Circuit Board / Polychlorinated Biphenyls', cat: 'Data & Misc', desc: 'Critical tier-2 electronic sub-components inside OEM UPS/breakers tracked in supply-chain logs (also hazardous transformer oils checked in Phase 1 ESA).', where: 'PM-16, PM-02' },
  { abbr: 'PoE (802.3)', full: 'Power over Ethernet', cat: 'Engineering & MEP', desc: 'Structured cabling standard powering BMS edge sensors, access control readers, and IP security cameras.', where: 'PM-25' },
  { abbr: 'QBAR', full: 'Mean Annual Flood Flow', cat: 'Data & Misc', desc: 'Pre-development greenfield catchment runoff rate limiting discharge from site `SuDS` attenuation ponds.', where: 'EU-06' },
  { abbr: 'SQL', full: 'Structured Query Language (Supabase Postgres)', cat: 'Data & Misc', desc: 'Database language powering `dc36_learning_schema.sql` for cross-device cloud sync (`dc_learning_modules`, `doc_checks`, `history`).', where: 'History & Sync' },
  { abbr: 'WS', full: 'White Space', cat: 'Data & Misc', desc: 'Conditioned IT server hall area (`Data Halls 1-4`, `800mm` raised floor) distinct from Grey Space MEP plant.', where: 'PM-24, PM-26, WBS 5.4' }
];

let abbrCatFilter = 'ALL';
let abbrAlphaFilter = 'ALL';
let abbrSearchQuery = '';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getAbbrLetter(abbr) {
  const ch = String(abbr || '').trim().charAt(0).toUpperCase();
  if (ch >= 'A' && ch <= 'Z') return ch;
  return '0-9';
}

function renderAbbreviations() {
  const totalCount = ABBREVIATIONS.length;
  const tabCountEl = document.getElementById('tab-abbr-count');
  const totalBadgeEl = document.getElementById('abbr-total-badge');
  if (tabCountEl) tabCountEl.textContent = String(totalCount);
  if (totalBadgeEl) totalBadgeEl.textContent = `${totalCount} Terms`;

  const catRow = document.getElementById('abbr-cat-chips');
  if (catRow) {
    catRow.innerHTML = ABBR_DOMAINS.map(d => {
      const cnt = d.id === 'ALL' ? totalCount : ABBREVIATIONS.filter(x => x.cat === d.id).length;
      return `<button type="button" class="chip ${abbrCatFilter === d.id ? 'active' : ''}" data-acat="${d.id}">${d.label} (${cnt})</button>`;
    }).join('');
    catRow.querySelectorAll('.chip').forEach(btn => {
      btn.onclick = () => {
        abbrCatFilter = btn.dataset.acat;
        renderAbbreviations();
      };
    });
  }

  const alphaRow = document.getElementById('abbr-alpha-chips');
  if (alphaRow) {
    const presentLetters = new Set(ABBREVIATIONS.map(x => getAbbrLetter(x.abbr)));
    const letters = ['ALL', ...Array.from(presentLetters).sort((a, b) => (a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b)))];
    alphaRow.innerHTML = letters.map(lt =>
      `<button type="button" class="chip abbr-chip-alpha ${abbrAlphaFilter === lt ? 'active' : ''}" data-aalpha="${lt}">${lt}</button>`
    ).join('');
    alphaRow.querySelectorAll('.chip').forEach(btn => {
      btn.onclick = () => {
        abbrAlphaFilter = btn.dataset.aalpha;
        renderAbbreviations();
      };
    });
  }

  const q = abbrSearchQuery.trim().toLowerCase();
  const filtered = ABBREVIATIONS
    .filter(item => {
      if (abbrCatFilter !== 'ALL' && item.cat !== abbrCatFilter) return false;
      if (abbrAlphaFilter !== 'ALL' && getAbbrLetter(item.abbr) !== abbrAlphaFilter) return false;
      if (q) {
        const hay = `${item.abbr} ${item.full} ${item.cat} ${item.desc} ${item.where}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => a.abbr.localeCompare(b.abbr, 'en', { sensitivity: 'base' }));

  const matchEl = document.getElementById('abbr-match-count');
  if (matchEl) matchEl.textContent = `Showing ${filtered.length} of ${totalCount} terms`;

  const tbody = document.getElementById('abbr-tbody');
  if (!tbody) return;
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="5">No abbreviations match "${escapeHtml(abbrSearchQuery)}". Click <strong>Reset Filters</strong> to show all ${totalCount} terms.</td></tr>`;
    return;
  }

  const clsMap = Object.fromEntries(ABBR_DOMAINS.map(d => [d.id, d.cls]));
  const formatDesc = txt => escapeHtml(txt).replace(/`([^`]+)`/g, '<code class="abbr-inline-code">$1</code>');
  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td><span class="abbr-code-pill">${escapeHtml(item.abbr)}</span></td>
      <td>${escapeHtml(item.full)}</td>
      <td><span class="abbr-cat-pill ${clsMap[item.cat] || ''}">${escapeHtml(item.cat)}</span></td>
      <td>${formatDesc(item.desc)}</td>
      <td class="mono">${escapeHtml(item.where)}</td>
    </tr>
  `).join('');
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

  const abbrSearchEl = document.getElementById('abbr-search-box');
  if (abbrSearchEl) {
    abbrSearchEl.addEventListener('input', e => {
      abbrSearchQuery = e.target.value;
      renderAbbreviations();
    });
  }

  const abbrResetBtn = document.getElementById('btn-abbr-reset');
  if (abbrResetBtn) {
    abbrResetBtn.onclick = () => {
      abbrCatFilter = 'ALL';
      abbrAlphaFilter = 'ALL';
      abbrSearchQuery = '';
      if (abbrSearchEl) abbrSearchEl.value = '';
      renderAbbreviations();
    };
  }

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
          interviews: { ...def.interviews, ...(rawState.interviews || {}) },
          docChecks: { ...(rawState.docChecks || {}) }
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
  renderAbbreviations();
  updateMetrics();
  pullFromSupabase(true);
});
