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
  { id: 'PM-01', pillar: 'PM1', track: 'pm', title: 'Project Charter, Governance Structure & RACI Matrix', desc: 'Establish Project Charter, Sponsor authority, Steering Committee cadence, success thresholds, and multi-party RACI governance.', tags: ['Charter', 'Governance', 'RACI'] },
  { id: 'PM-02', pillar: 'PM1', track: 'pm', title: 'Site Selection Due Diligence & Pre-Feasibility Scoring', desc: 'Evaluate land parcels across power proximity, fibre diversity, geotechnical conditions, flood zones, and buildability constraints.', tags: ['Feasibility', 'Due Diligence', 'Scoring'] },
  { id: 'PM-03', pillar: 'PM1', track: 'pm', title: 'Basis of Design (BoD) & I.S. EN 50600 Class 3 Translation', desc: 'Translate tenant SLAs and Uptime Tier III maintainability into EN 50600 Availability Classes, PUE targets, and free-cooling envelope.', tags: ['EN 50600', 'BoD', 'ISO 22237'] },
  { id: 'PM-04', pillar: 'PM1', track: 'pm', title: 'EUR Capex Modelling, 10-Yr DCF, NPV/IRR & Sensitivity', desc: 'Build EUR/MW Capex baselines, colocation yield curves, PUE/energy sensitivity tables, and institutional investment metrics.', tags: ['EUR DCF', 'Capex/MW', 'NPV/IRR'] },
  { id: 'PM-05', pillar: 'PM1', track: 'pm', title: 'RIBA 0-7 Stage-Gate Framework & Pre-NTP FID Package', desc: 'Structure formal Stage-Gate entry/exit criteria leading to Final Investment Decision (FID) and Full Notice to Proceed (NTP).', tags: ['RIBA 0-7', 'Stage Gates', 'FID'] },
  { id: 'PM-06', pillar: 'PM1', track: 'pm', title: 'Stakeholder Register, Engagement & Escalation Plan', desc: 'Map internal sponsors, hyperscale tenants, EPCm leads, local communities, and utility/certifier touchpoints across phases.', tags: ['Stakeholders', 'Comms Plan'] },

  // PM2: Phase 2 - Planning, WBS & Master Schedule (RIBA 2-3)
  { id: 'PM-07', pillar: 'PM2', track: 'pm', title: 'Work Breakdown Structure (WBS) & Dictionary Architecture', desc: 'Decompose 36 MW campus scope into controllable CSA, HV/MV Power, Mechanical, BMS/EPMS, and Cx deliverables mapped to cost accounts.', tags: ['WBS', 'Scope Baseline'] },
  { id: 'PM-08', pillar: 'PM2', track: 'pm', title: 'Primavera P6 Level 4 Logic Network & Critical Path', desc: 'Build deterministic FS/SS logic across Pre-Construction, OFCI, CSA Shell, MEP Halls 1-4, Energisation, and L1-L5 Commissioning.', tags: ['Primavera P6', 'Level 4', 'CPM'] },
  { id: 'PM-09', pillar: 'PM2', track: 'pm', title: 'DCMA-14 Schedule Quality Audit & Longest Path Diagnostics', desc: 'Enforce 100% logic integrity: zero dangling open ends, zero arbitrary lags/constraints, positive float discipline, and realistic critical density.', tags: ['DCMA-14', 'Schedule QA'] },
  { id: 'PM-10', pillar: 'PM2', track: 'pm', title: 'Resource Loading, Cashflow S-Curves & Baseline Controls', desc: 'Cost-load P6 activities to forecast monthly EUR burn rates, engineering/site manpower peaks, and Performance Measurement Baselines.', tags: ['S-Curve', 'PMB', 'Manpower'] },
  { id: 'PM-11', pillar: 'PM2', track: 'pm', title: 'EU EED (2023/1791) & Delegated Reg. (2024/1364) KPI Design', desc: 'Embed sub-metering, PUE/WUE/ERF/REF telemetry pipelines and heat-reuse export readiness into technical specifications early.', tags: ['EED 2023/1791', 'PUE/WUE/ERF'] },
  { id: 'PM-12', pillar: 'PM2', track: 'pm', title: 'BS EN ISO 19650 Information Management, EIR & CDE Setup', desc: 'Implement Common Data Environment workflows (WIP -> Shared -> Published -> Archive), Exchange Info Requirements, and BIM LOD matrices.', tags: ['ISO 19650', 'CDE', 'BEP'] },

  // PM3: Phase 3 - Procurement, Contracts & Supply Chain (RIBA 4)
  { id: 'PM-13', pillar: 'PM3', track: 'pm', title: 'Delivery Strategy: EPCm, Design-Build & Multi-Prime Packaging', desc: 'Compare single-point turnkey vs. Trade/EPCm split packages across cost certainty, design control, interfaces, and claims exposure.', tags: ['EPCm', 'Design-Build', 'Packaging'] },
  { id: 'PM-14', pillar: 'PM3', track: 'pm', title: 'NEC4 ECC (Option A/C): Early Warnings & Compensation Events', desc: 'Administer collaborative NEC4 contracts: Accepted Programme updates, Risk Reduction Meetings, CEs, and Option C target pain/gainshare.', tags: ['NEC4 ECC', 'Option A/C', 'CE'] },
  { id: 'PM-15', pillar: 'PM3', track: 'pm', title: 'FIDIC Yellow / Silver Book: Risk Allocation & Claims Control', desc: 'Manage Engineer determinations, Employer Requirements integrity, EOT substantiation, and DAB dispute avoidance under FIDIC.', tags: ['FIDIC', 'Claims', 'EOT'] },
  { id: 'PM-16', pillar: 'PM3', track: 'pm', title: 'OFCI Long-Lead Equipment Strategy (HV, UPS, Chillers, BESS)', desc: 'De-risk 40-80 week OEM bottlenecks via early Owner-Furnished slots, milestone reservation payments, and novation options.', tags: ['OFCI', 'Long-Lead', 'OEM'] },
  { id: 'PM-17', pillar: 'PM3', track: 'pm', title: 'RFP Issuance, Technical Bid Evaluation (TBE) & BAFO Leveling', desc: 'Run blind commercial/technical scoring matrices, normalize exclusions/deviations, and lead structured BAFO negotiations.', tags: ['TBE', 'BAFO', 'Procurement'] },
  { id: 'PM-18', pillar: 'PM3', track: 'pm', title: 'Vendor Expediting, Factory Readiness & Incoterms Logistics', desc: 'Track shop drawings, sub-supplier components, DDP/DAP customs clearance, and laydown yard sequencing to site.', tags: ['Expediting', 'Incoterms', 'Supply Chain'] },

  // PM4: Phase 4 - Execution, Controls, Risk & Change (RIBA 5)
  { id: 'PM-19', pillar: 'PM4', track: 'pm', title: 'Earned Value Management (EVM): CPI, SPI, EAC & Recovery', desc: 'Measure physical % complete against PV/EV/AC, diagnose CPI/SPI drift early, and enforce schedule compression or fast-track recovery plans.', tags: ['EVM', 'CPI/SPI', 'EAC'] },
  { id: 'PM-20', pillar: 'PM4', track: 'pm', title: 'Integrated Change Control (CRB), Scope Freeze & Baselines', desc: 'Govern Change Requests through technical/cost/schedule impact scoring before Change Control Board sign-off and baseline revision.', tags: ['Change Control', 'CRB', 'Scope Freeze'] },
  { id: 'PM-21', pillar: 'PM4', track: 'pm', title: 'Quantitative Risk Analysis (QRA / Monte Carlo P50 & P80)', desc: 'Maintain active L x I Risk Register, run 3-point cost/schedule Monte Carlo simulations, and govern drawdown of management reserve.', tags: ['QRA', 'Monte Carlo', 'P50/P80'] },
  { id: 'PM-22', pillar: 'PM4', track: 'pm', title: 'Quality Assurance (QA/QC), ITPs & NCR / RFI Discipline', desc: 'Enforce Inspection & Test Plans, hold/witness points, concrete/weld QA logs, submittals SLAs, and timely Non-Conformance closure.', tags: ['QA/QC', 'ITP', 'NCR'] },
  { id: 'PM-23', pillar: 'PM4', track: 'pm', title: 'Multi-Disciplinary MEP / CSA Interface & Clash Coordination', desc: 'Resolve slab penetrations, busway/piping corridors, hot/cold aisle containment tolerances, and trade handoffs between CSA and MEP.', tags: ['Interfaces', 'BIM Clash', 'MEP/CSA'] },
  { id: 'PM-24', pillar: 'PM4', track: 'pm', title: 'Executive Steering Reporting, Lookahead & Escalation', desc: 'Publish weekly/monthly control packs, 3-week/6-week constraint-free lookaheads, and crisp decision memos for executive sponsors.', tags: ['Reporting', 'Lookahead', 'Governance'] },

  // PM5: Phase 5 - Commissioning L1-L5 & Integrated Testing (RIBA 5-6)
  { id: 'PM-25', pillar: 'PM5', track: 'pm', title: 'Master Commissioning Plan (CIBSE Code M / ASHRAE 0)', desc: 'Organize Commissioning Authority (CxA) governance, test matrices, dependency logic, and tag progression gates from L1 to L5.', tags: ['CIBSE Code M', 'ASHRAE 0', 'CxA'] },
  { id: 'PM-26', pillar: 'PM5', track: 'pm', title: 'Cx Levels 1 & 2: Witnessed OEM FAT & Site Receiving QA', desc: 'Execute European Factory Acceptance Tests (HV switchgear, UPS, chillers, BESS) and verify undamaged site installation/red-line tags.', tags: ['L1-L2', 'FAT', 'Red Tag'] },
  { id: 'PM-27', pillar: 'PM5', track: 'pm', title: 'Cx Level 3: Pre-Functional Static, BSRIA Flush & LOTO', desc: 'Verify Megger/hi-pot insulation, relay secondary injection, BSRIA chilled-water flushing, and strict LOTO energisation permits.', tags: ['L3 Static', 'BSRIA', 'LOTO'] },
  { id: 'PM-28', pillar: 'PM5', track: 'pm', title: 'Cx Level 4: Dynamic Load, SCR Abatement & BESS Sync', desc: 'Prove 22kV energisation, genset step-load black-start, SCR NOx abatement, EPMS/BMS failure sequences, and BESS synchronization.', tags: ['L4 Dynamic', 'BESS Sync', 'BMS/EPMS'] },
  { id: 'PM-29', pillar: 'PM5', track: 'pm', title: 'Cx Level 5: 36 MW 48-Hr IST & Full Blackout Simulation', desc: 'Orchestrate portable load-bank thermal soak, pull-the-plug blackout ATS/UPS failover (<10s), and TES cooling ride-through tests.', tags: ['L5 IST', '36 MW', 'Blackout Test'] },
  { id: 'PM-30', pillar: 'PM5', track: 'pm', title: 'Dual EN 50600 Class 3 & Uptime TCCF Constructed Audit', desc: 'Script simultaneous path-isolation concurrent maintainability demonstrations for independent on-site certifying assessors.', tags: ['TCCF', 'EN 50600', 'Maintainability'] },

  // PM6: Phase 6 - Handover, OR&T & Project Closeout (RIBA 6-7)
  { id: 'PM-31', pillar: 'PM6', track: 'pm', title: 'Practical Completion (PC), Snagging Burn-Down & RFS Gate', desc: 'Run A/B/C defect classification, enforce Day-1 Ready-for-Service (RFS) blocker zeroing, and issue Taking-Over Certificates.', tags: ['Practical Completion', 'Punch List', 'RFS'] },
  { id: 'PM-32', pillar: 'PM6', track: 'pm', title: 'Operational Readiness & Transition (OR&T) & Black-Hat Drills', desc: 'Train 24/7 Critical Facilities staff, validate EOP/MOP/SOP libraries, run live Black-Hat incident drills, and stock 2-year critical spares.', tags: ['OR&T', 'Black-Hat', 'EOP/MOP/SOP'] },
  { id: 'PM-33', pillar: 'PM6', track: 'pm', title: 'BS EN ISO 19650 Asset Information Model (AIM) Handover', desc: 'Deliver verified COBie asset registers, as-built BIM models, O&M manuals, warranties, and CMMS integration packages.', tags: ['ISO 19650 AIM', 'COBie', 'O&M'] },
  { id: 'PM-34', pillar: 'PM6', track: 'pm', title: 'Commercial Final Account, Variations Settlement & DLP', desc: 'Reconcile all CEs/variations, close prime cost sums, manage retention release mechanics, and track 12/24-month Defect Liability Period.', tags: ['Final Account', 'DLP', 'Retention'] },
  { id: 'PM-35', pillar: 'PM6', track: 'pm', title: 'Post-Occupancy Evaluation (POE) & Live PUE/WUE/ERF Audit', desc: 'Track seasonal commissioning tuning, verify guaranteed vs. measured PUE/WUE at partial IT load, and optimize chiller staging.', tags: ['POE', 'Seasonal Cx', 'Live PUE'] },
  { id: 'PM-36', pillar: 'PM6', track: 'pm', title: 'Lessons Learned Archive, Benefits Realization & Closeout', desc: 'Publish benchmark EUR/MW actuals, schedule variance post-mortems, contract closeout certificates, and enterprise knowledge transfer.', tags: ['Closeout', 'Lessons Learned', 'KPIs'] },

  // Deferred Track: L1 - Irish Planning & EPA IEL (EU-01..EU-06)
  { id: 'EU-01', pillar: 'L1', track: 'legal', title: 'Local Authority vs. An Bord Pleanala (SID) Planning Pathways', desc: 'Understand Strategic Infrastructure Development (SID) thresholds, Section 247 pre-planning consultations, and appeal timelines.', tags: ['Planning Act', 'SID', 'Sec 247'] },
  { id: 'EU-02', pillar: 'L1', track: 'legal', title: 'Environmental Impact Assessment Report (EIAR) Scoping', desc: 'Lead multi-disciplinary noise, ecology, biodiversity, air dispersion, and traffic studies supporting planning submissions.', tags: ['EIA Directive', 'EIAR', 'Scoping'] },
  { id: 'EU-03', pillar: 'L1', track: 'legal', title: 'EPA Industrial Emissions Licence (IEL) Strategy', desc: 'Manage EPA thermal input thresholds for standby generation, stack heights, noise limits, and public objections.', tags: ['EPA IEL', '2010/75/EU'] },
  { id: 'EU-04', pillar: 'L1', track: 'legal', title: 'Standby Emissions Abatement: SCR & HVO Biofuel Readiness', desc: 'Align backup genset specifications with NOx limits, selective catalytic reduction (SCR), and renewable HVO fuel tanks.', tags: ['HVO', 'SCR', 'Climate Act'] },
  { id: 'EU-05', pillar: 'L1', track: 'legal', title: 'SuDS Stormwater Attenuation & Class-1 Interceptor Design', desc: 'Comply with Irish drainage flood-risk regulations, bunded fuel storage, and underground attenuation volumes.', tags: ['SuDS', 'Flood Risk', 'Drainage'] },
  { id: 'EU-06', pillar: 'L1', track: 'legal', title: 'Planning Judicial Review & Condition Discharge Risk Mitigation', desc: 'Structure pre-commencement planning condition compliance logs to prevent costly Judicial Review delays.', tags: ['Compliance', 'Judicial Review'] },

  // Deferred Track: L2 - EirGrid, ESBN & CRU Grid Policy (EU-07..EU-12)
  { id: 'EU-07', pillar: 'L2', track: 'legal', title: 'EirGrid & ESB Networks Enduring Connection Policy (ECP)', desc: 'Navigate connection application stages, contestable vs. non-contestable substation works, and MIC offers.', tags: ['EirGrid', 'ESBN', 'ECP', 'MIC'] },
  { id: 'EU-08', pillar: 'L2', track: 'legal', title: 'CRU Large Energy User (LEU) Direction & Constraints', desc: 'Structure grid applications in constrained zones (Greater Dublin) meeting Commission for Regulation of Utilities mandates.', tags: ['CRU', 'LEU Policy'] },
  { id: 'EU-09', pillar: 'L2', track: 'legal', title: 'On-Site Dispatchable Generation & Grid-Support BESS', desc: 'Integrate proximate/on-site dispatchable BESS or flexible generation matching Maximum Import Capacity conditions.', tags: ['BESS', 'Dispatchable', 'Microgrid'] },
  { id: 'EU-10', pillar: 'L2', track: 'legal', title: 'EU Demand Connection Code (2016/1388) RMS Modelling', desc: 'Coordinate dynamic RMS fault ride-through, harmonic distortion, and voltage stability studies with TSO engineers.', tags: ['EU 2016/1388', 'RMS Study'] },
  { id: 'EU-11', pillar: 'L2', track: 'legal', title: 'Corporate Renewable PPAs & 24/7 Additionality', desc: 'Evaluate additionality clauses for new Irish wind/solar PPAs linked to data centre decarbonization.', tags: ['CPPA', 'REF', 'Additionality'] },
  { id: 'EU-12', pillar: 'L2', track: 'legal', title: '110kV GIS SF6-Free Switchgear & Substation Handover', desc: 'Manage TSO protection coordination, dual-feed GIS rings, and Operational Notification energisation milestones.', tags: ['110kV GIS', 'SF6-Free'] },

  // Deferred Track: L3 - BCAR & Statutory H&S (EU-13..EU-18)
  { id: 'EU-13', pillar: 'L3', track: 'legal', title: 'BCAR Roles: Design Certifier vs. Assigned Certifier', desc: 'Understand statutory liabilities under Ireland Building Control Amendment Regulations and BCMS portal submissions.', tags: ['BCAR 2014', 'BCMS'] },
  { id: 'EU-14', pillar: 'L3', track: 'legal', title: 'Fire Safety Certificate (FSC) & 7-Day Notice Risk', desc: 'Prepare Part B fire strategies (compartmentation, VESDA, water-mist) and evaluate commercial exposure of 7-Day Notices.', tags: ['Part B', 'FSC', '7-Day Notice'] },
  { id: 'EU-15', pillar: 'L3', track: 'legal', title: 'Disability Access Certificate (DAC - Part M)', desc: 'Ensure NOC, office, welfare, mantrap, and external access routes pass Part M compliance prior to CCC.', tags: ['DAC', 'Part M'] },
  { id: 'EU-16', pillar: 'L3', track: 'legal', title: 'S.I. No. 291/2013: Appointing PSDP & PSCS', desc: 'Fulfill legal client duties to appoint competent Project Supervisors for Design (PSDP) and Construction (PSCS).', tags: ['SI 291/2013', 'PSDP', 'PSCS'] },
  { id: 'EU-17', pillar: 'L3', track: 'legal', title: 'HSA AF1 Notifications, Safe Pass & CSCS Audits', desc: 'Enforce HSA commencement notifications, crane/excavation CSCS tickets, and high-voltage site LOTO controls.', tags: ['HSA', 'AF1', 'LOTO'] },
  { id: 'EU-18', pillar: 'L3', track: 'legal', title: 'Certificate of Compliance on Completion (CCC) & Safety File', desc: 'Consolidate ancillary certificates, progressive BCAR inspection logs, and PSDP statutory Safety File for opening.', tags: ['BCAR CCC', 'Safety File'] }
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

let state = loadState();

const trackFilters = {
  pm: { pillar: 'ALL', status: 'ALL', search: '' },
  legal: { pillar: 'ALL', status: 'ALL', search: '' }
};
let portfolioTrackFilter = 'ALL';
let interviewTrackFilter = 'pm';

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

function renderTrackModules(trackName, gridId) {
  const grid = document.getElementById(gridId);
  const filter = trackFilters[trackName];
  const q = filter.search.trim().toLowerCase();

  const filtered = CURRICULUM.filter(m => {
    if (m.track !== trackName) return false;
    if (filter.pillar !== 'ALL' && m.pillar !== filter.pillar) return false;
    const st = state.modules[m.id]?.status || 'todo';
    if (filter.status !== 'ALL' && st !== filter.status) return false;
    if (q) {
      const hay = `${m.id} ${m.title} ${m.desc} ${m.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="panel-card"><strong>No matching modules.</strong> Clear phase/pillar or status filters to view all modules in this track.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(m => {
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
        <div class="card-head">
          <span class="badge-code mono">${m.id}</span>
          <span class="badge-pillar">${pLabel}</span>
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
        <textarea class="notes-area" data-id="${m.id}" placeholder="Study notes, project artifacts, interview anchor...">${st.notes || ''}</textarea>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.status-select').forEach(sel => {
    sel.onchange = () => {
      state.modules[sel.dataset.id].status = sel.value;
      saveState(`Updated ${sel.dataset.id}`);
      renderTrackModules(trackName, gridId);
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
      renderTrackModules(trackName, gridId);
    };
  });
  grid.querySelectorAll('.notes-area').forEach(ta => {
    ta.onchange = () => {
      state.modules[ta.dataset.id].notes = ta.value;
      saveState('Notes saved');
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
      state.portfolio[sel.dataset.id] = { ...(state.portfolio[sel.dataset.id] || {}), status: sel.value };
      saveState(`Portfolio ${sel.dataset.id} updated`);
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
      state.interviews[id] = { ready: !state.interviews[id]?.ready };
      saveState('Interview status saved');
      renderInterviews();
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
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
    renderTrackModules('pm', 'pm-modules-grid');
  });

  document.getElementById('legal-search-box').addEventListener('input', e => {
    trackFilters.legal.search = e.target.value;
    renderTrackModules('legal', 'legal-modules-grid');
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
          modules: { ...def.modules, ...migrateLegacyModules(imported.modules) },
          portfolio: { ...def.portfolio, ...(imported.portfolio || {}) },
          interviews: { ...def.interviews, ...(imported.interviews || {}) }
        };
        saveState('Imported progress backup');
        renderTrackSection('pm');
        renderTrackSection('legal');
        renderPortfolio();
        renderInterviews();
      } catch {
        showToast('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  document.getElementById('btn-reset').onclick = () => {
    if (!confirm('Reset all learning progress, hours, notes, and confidence scores across both tracks?')) return;
    state = defaultState();
    saveState('Progress reset');
    renderTrackSection('pm');
    renderTrackSection('legal');
    renderPortfolio();
    renderInterviews();
  };

  renderTrackSection('pm');
  renderTrackSection('legal');
  renderPortfolio();
  renderInterviews();
  updateMetrics();
});
