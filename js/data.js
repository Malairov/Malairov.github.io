window.PORTFOLIO_DATA = {
  metrics: [
    { value: "400 → 1,800+", label: "tracked item foundation", context: "Catalog expanded and structured; 1,500+ active SKUs standardized for traceability." },
    { value: "5h → 30m", label: "ordering workflow", context: "Exception-based planning controls replaced manual review work." },
    { value: "~16d → ~1w", label: "critical gap duration", context: "MWO tooling shortage gap duration reduced through structured tracking." },
    { value: "460+", label: "installed locations", context: "SmartC AI-enabled infrastructure platform commercial scale." }
  ],
  heroMetrics: [
    { value: "4", label: "operating loops" },
    { value: "60+", label: "floor signal sources" },
    { value: "1,500+", label: "active SKUs" },
    { value: "460+", label: "SmartC locations" }
  ],
  architecture: [
    {
      id: "intake",
      tag: "Gate",
      title: "New SKU Intake",
      subtitle: "Qualification before system load",
      cadence: "As needed",
      role: "Prevents uncontrolled items from entering the program.",
      inputs: ["User need", "spec constraints", "sampling", "customer approval"],
      outputs: ["eligible item", "rejected item", "first-batch state"],
      metric: "Qualification before sourcing; sensitive names generalized for public view."
    },
    {
      id: "feedback",
      tag: "Loop 01",
      title: "Floor Supervisor Feedback",
      subtitle: "Fastest demand and friction signal",
      cadence: "Weekly",
      role: "Captures wrong, missing, unnecessary, or difficult-to-find items before they become formal shortage reports.",
      inputs: ["supervisor flags", "usage complaints", "station-level friction"],
      outputs: ["SKU weeding", "slot audit inputs", "service-friction visibility"],
      metric: "60+ floor supervisors as signal sources."
    },
    {
      id: "slot",
      tag: "Loop 02",
      title: "Slot-Economics Audit",
      subtitle: "Physical space as a scarce control point",
      cadence: "Ongoing",
      role: "Tests whether an item still earns its vending/storage footprint against draw rate, overstock limits, and service need.",
      inputs: ["floor feedback", "draw rate", "overstock limits", "service criticality"],
      outputs: ["keep", "remove", "resize", "feed JIT tuning"],
      metric: "Turns physical capacity into governed portfolio capacity."
    },
    {
      id: "jit",
      tag: "Loop 03",
      title: "JIT / Safety-Stock Logic",
      subtitle: "Demand timing under hard constraints",
      cadence: "Analytical / ongoing",
      role: "Tunes reorder timing against actual draw while respecting MOQ, package size, lead-time floor, and no-history items.",
      inputs: ["usage history", "lead times", "slot outputs", "risk indicators"],
      outputs: ["reorder timing", "safety stock", "NO-USAGE classification", "exception list"],
      metric: "Manual ordering effort cut from ~5 hours to ~30 minutes."
    },
    {
      id: "billing",
      tag: "Loop 04",
      title: "Billing-State Tracking",
      subtitle: "Lifecycle state accuracy",
      cadence: "Continuous",
      role: "Controls the transition from prepaid/first-batch state to standard consignment billing so the same stock is not billed twice.",
      inputs: ["item lifecycle stage", "intake batch records", "state marker"],
      outputs: ["billing accuracy", "support team handoff", "state visibility"],
      metric: "State accuracy maintained locally; billing execution delegated to support."
    },
    {
      id: "governance",
      tag: "Layer",
      title: "Vendor / Spec Governance",
      subtitle: "Constraint-first sourcing funnel",
      cadence: "Before item eligibility",
      role: "Separates availability from allowed substitution. Items pass customer-controlled spec gates before sourcing decisions.",
      inputs: ["distributor availability", "manufacturer match", "OEM/customer spec", "COC need"],
      outputs: ["allowed item", "blocked substitution", "compliance evidence"],
      metric: "Spec exceptions prevented before they reach the floor."
    },
    {
      id: "tracking",
      tag: "System",
      title: "MWO Shortage Tracking",
      subtitle: "Complaints converted into traceable events",
      cadence: "Continuous",
      role: "Links shortage events to work orders, vendors, items, delay reasons, follow-up state, and closure time.",
      inputs: ["work order", "shortage event", "vendor", "item", "delay reason"],
      outputs: ["root-cause visibility", "median/average gap tracking", "slot audit feedback"],
      metric: "Average gap duration moved from ~16 days to ~1 week."
    }
  ],
  skuFlow: [
    { title: "Need identified", subtitle: "Request or pain point", detail: "A user or supervisor flags a need, friction, recurring missing item, or replacement requirement." },
    { title: "Spec gate", subtitle: "Allowed before sourced", detail: "The item is checked against customer-controlled tooling/spec constraints before procurement speed or price is allowed to dominate." },
    { title: "Sampling / approval", subtitle: "Qualification sequence", detail: "Sampling and customer approval come before the item becomes eligible for regular program treatment." },
    { title: "First-batch state", subtitle: "Prepaid / onboarding", detail: "The first batch enters a controlled state so billing and lifecycle status remain clear." },
    { title: "Slot decision", subtitle: "Space must be earned", detail: "The item is tested against draw rate, service value, overstock limits, and physical slot scarcity." },
    { title: "JIT tuning", subtitle: "Actual draw replaces assumption", detail: "Usage, lead time, package size, MOQ, and no-history handling determine reorder treatment." },
    { title: "Billing transition", subtitle: "State marker removed cleanly", detail: "The item moves from onboarding state into standard consignment billing without duplicating charges." },
    { title: "Weekly re-entry", subtitle: "Cycle, not pipeline", detail: "Once steady-state, the item keeps re-entering feedback and audit loops so the system does not freeze around old assumptions." }
  ],
  filters: ["All", "Operations", "Diagnostic", "Governance", "Technology", "Foundation"],
  cases: [
    {
      category: "Operations",
      title: "Four Parallel Operating Loops",
      summary: "Converted a single-threaded consignment program into four concurrent control loops.",
      metric: "4 concurrent loops; no coverage gaps during rollout.",
      problem: "Demand signal, slot economics, vendor behavior, and billing state were competing for the same attention path.",
      built: "Separated the work into feedback, slot-economics, JIT tuning, and billing-state loops with distinct inputs and outputs.",
      result: "The system became easier to audit, tune, explain, and scale because each failure mode had a defined owner and signal path.",
      transfer: "Directly transferable to implementation PM, service delivery, process improvement, and technical operations roles.",
      proves: "Proves process architecture."
    },
    {
      category: "Diagnostic",
      title: "Safety-Stock Root-Cause Diagnosis",
      summary: "Found why new SKUs disappeared from reorder review without visible errors.",
      metric: "3 compounding root causes found across formula, query, and macro layers.",
      problem: "New items with no usage history were being routed to dead status or hidden from review.",
      built: "Rebuilt logic in Power Query, added NO-USAGE classification, dynamic header lookup, and diagnostic query columns.",
      result: "New items stayed visible and controllable instead of silently disappearing behind spreadsheet logic.",
      transfer: "Shows diagnostic thinking under imperfect tools, inherited workbooks, and partial authority.",
      proves: "Proves root-cause diagnosis."
    },
    {
      category: "Governance",
      title: "Vendor / Spec Governance Funnel",
      summary: "Built a constraint-first model for approved substitutions in a regulated technical environment.",
      metric: "Spec exceptions controlled before floor impact.",
      problem: "Availability and speed could not override customer-controlled technical requirements.",
      built: "Separated distributor availability, manufacturer match, customer/OEM spec requirements, and COC evidence gates.",
      result: "Only eligible items could enter the operating loops; non-compliant substitutions were blocked earlier.",
      transfer: "Relevant to aerospace, pharma, MRO, manufacturing, procurement, and quality-sensitive supply chains.",
      proves: "Proves governance under constraints."
    },
    {
      category: "Operations",
      title: "MWO Tooling Shortage Tracking",
      summary: "Turned complaint lists into traceable shortage events tied to work orders and vendors.",
      metric: "Average gap duration improved from ~16 days to ~1 week.",
      problem: "Shortages existed as complaints without structured traceability to item, vendor, work order, or delay reason.",
      built: "Created event-level tracking with IDs, categories, state, follow-up visibility, and closure metrics.",
      result: "Shortage events became visible, measurable, and usable as inputs into slot economics and vendor follow-up.",
      transfer: "Strong service-delivery PM evidence: intake, triage, escalation, root cause, and closure discipline.",
      proves: "Proves service-delivery discipline."
    },
    {
      category: "Technology",
      title: "SmartC AI Product Turnaround",
      summary: "Coordinated redesigned AI-enabled infrastructure through pilot delivery and commercial scale.",
      metric: "460+ installed locations after commercialization.",
      problem: "A prior product version had field-reliability gaps and needed controlled redesign, testing, and pilot deployment.",
      built: "Coordinated hardware, software, QA, DevOps, and integration workstreams under scope, risk, milestone, and change control.",
      result: "The redesigned product moved through pilot readiness and scaled commercially across hundreds of locations.",
      transfer: "Shows cross-functional technical delivery without claiming to be the engineer.",
      proves: "Proves technical implementation delivery.",
      connected: ["SmartC delivery system", "QA readiness", "pilot deployment", "change control", "460+ scale"]
    },
    {
      category: "Foundation",
      title: "Maritime Regulated Operations Foundation",
      summary: "Eight years of international safety-critical operations formed the operating discipline behind the PM work.",
      metric: "Commercial vessels up to ~40,000 GT; regulated watchkeeping environment.",
      problem: "Navigation, emergency readiness, documentation, compliance, and time-critical operations had to function continuously.",
      built: "Executed navigation watchkeeping, voyage support, GMDSS/radio communications, bridge documentation, drills, and inspection readiness.",
      result: "Developed disciplined execution habits in zero-failure-tolerance environments with multinational crews.",
      transfer: "Regulated operations, procedural control, risk visibility, and accountability under pressure.",
      proves: "Proves regulated execution discipline."
    }
  ],

  smartc: {
    overview: "AI-enabled smart-city / intelligent-transportation delivery framed as a visible delivery system: recovery context, redesign coordination, governance, validation discipline, pilot readiness, and controlled transition toward scale.",
    headline: "From unreliable field behavior to a governed delivery path with validated readiness and commercial-scale credibility.",
    highlights: [
      "AI-enabled pedestrian-safety delivery",
      "Sponsor-controlled scope / change governance",
      "Pilot validation across distinct operating conditions",
      "Commercial-scale credibility anchored at 460+ installed locations"
    ],
    metrics: [
      { value: "460+", label: "installed locations", note: "Commercial scale after pilot-stage turnaround and readiness work." },
      { value: "~7 → ~17", label: "contributors by stage", note: "Cross-functional delivery capacity scaled through testing and integration." },
      { value: "30–40d", label: "iteration cycles", note: "Adaptive delivery rhythm used to control MVP scope and validation work." },
      { value: "3", label: "pilot condition tracks", note: "Common MVP baseline tested across distinct operating conditions." }
    ],
    evidence: [
      { label: "Delivery model", value: "Adaptive cycles", note: "Short iterative delivery windows with visible scope and readiness control." },
      { label: "Control style", value: "Sponsor-governed", note: "RAID, milestone status, MoSCoW, issue tracking, and change visibility kept ambiguity controlled." },
      { label: "What changed", value: "Recovery → readiness", note: "The work moved from field-reliability concern into a controlled, pilot-ready execution path." }
    ],
    phases: [
      {
        tag: "Recovery context",
        title: "Prior field-reliability gaps",
        subtitle: "The story starts with a product that needed recovery discipline, not hype.",
        detail: "The challenge was to convert unreliable field behavior into a sponsor-visible recovery path: clarify what was failing, protect credibility, and create a delivery frame that could support redesign, validation, and future deployment.",
        axis: "Signal",
        control: "Stabilize direction before scaling assumptions.",
        outcome: "A visible recovery context and controlled next-step plan.",
        risk: "Unclear failure boundaries could have led to random fixes and weak sponsor trust.",
        outputs: ["recovery framing", "risk visibility", "re-baselined direction"],
        controls: ["problem framing", "sponsor updates", "execution reset"],
        proof: "Shows recovery planning and execution under ambiguity.",
        links: ["risk control", "scope reset", "stakeholder alignment"]
      },
      {
        tag: "Redesign scope",
        title: "Computer-vision pedestrian safety system",
        subtitle: "Hardware, software, detection logic, and field integration had to move together.",
        detail: "The work was coordinated as a multi-component delivery effort: physical components, software behaviors, computer-vision detection, integration readiness, field-installation constraints, and test feedback had to converge into one coherent path.",
        axis: "Control",
        control: "Keep interdependent workstreams aligned without pretending they are independent.",
        outcome: "A coordinated redesign path instead of disconnected technical effort.",
        risk: "Any single-track view would hide dependency failures between hardware, software, and field deployment.",
        outputs: ["dependency mapping", "integration visibility", "delivery alignment"],
        controls: ["cross-functional coordination", "milestone logic", "readiness checkpoints"],
        proof: "Shows cross-functional technical coordination without claiming engineering authorship.",
        links: ["hardware", "software", "integration"]
      },
      {
        tag: "Governance",
        title: "Sponsor-controlled change flow",
        subtitle: "Scope, risk, schedule, and decisions were kept visible through structured PM controls.",
        detail: "RAID logs, milestone trackers, MoSCoW prioritization, issue tracking, readiness checks, and change visibility helped maintain control over technical ambiguity. This was governance as an operating mechanism, not as paperwork.",
        axis: "Governance",
        control: "Translate ambiguity into decision-ready sponsor visibility.",
        outcome: "A disciplined decision flow instead of ad-hoc coordination.",
        risk: "Without this layer, technical work could drift faster than sponsor understanding.",
        outputs: ["decision visibility", "scope discipline", "status transparency"],
        controls: ["RAID", "MoSCoW", "milestones", "change records"],
        proof: "Shows PM governance, not ad-hoc coordination.",
        links: ["RAID", "MoSCoW", "CCB"]
      },
      {
        tag: "Pilot readiness",
        title: "QA, validation, and operating-condition testing",
        subtitle: "One MVP baseline had to survive different operating conditions, not just a lab scenario.",
        detail: "Testing and readiness work turned field constraints into validation tasks, defect visibility, acceptance logic, and release discipline. The key was controlled learning: what still fails, why, and whether it is ready to move.",
        axis: "Validation",
        control: "Make readiness evidence-based rather than assumed.",
        outcome: "Pilot readiness grounded in visible QA and acceptance logic.",
        risk: "A weak validation layer would make deployment look ready before it truly was.",
        outputs: ["validation evidence", "defect visibility", "acceptance readiness"],
        controls: ["QA cadence", "test feedback", "release discipline"],
        proof: "Shows readiness thinking and controlled validation.",
        links: ["QA", "pilot", "field constraints"]
      },
      {
        tag: "Dual-track delivery",
        title: "Legacy support + next-generation product path",
        subtitle: "The old system still had to be managed while the redesigned path moved forward.",
        detail: "Delivery operated in parallel workstreams: maintain service continuity, manage next-generation dependencies, control handoffs, and ensure sponsors always saw what was legacy support versus forward-looking development.",
        axis: "Execution",
        control: "Protect live obligations while moving the future path forward.",
        outcome: "Transition discipline under live-system constraints.",
        risk: "Without separation and visibility, legacy drag could swallow the next-generation path.",
        outputs: ["parallel workstream control", "handoff readiness", "transition visibility"],
        controls: ["live-support tracking", "handoff planning", "dependency control"],
        proof: "Shows transition management under live-system constraints.",
        links: ["legacy", "next-gen", "handoff"]
      },
      {
        tag: "Scale outcome",
        title: "Commercial transition to 460+ installed locations",
        subtitle: "The portfolio uses a conservative public-scale anchor while keeping sensitive details out.",
        detail: "The result is framed conservatively: the work moved through pilot readiness and transition support toward a product later deployed at 460+ locations. This demonstrates implementation credibility at scale without overstating technical authorship.",
        axis: "Evidence",
        control: "Use scale as evidence of delivery credibility, not hype.",
        outcome: "A defensible proof point for implementation at commercial scale.",
        risk: "Overclaiming scale would damage credibility; under-explaining it would waste a strong proof point.",
        outputs: ["scale anchor", "commercial credibility", "implementation proof"],
        controls: ["conservative framing", "evidence discipline", "public-safe narrative"],
        proof: "Shows implementation credibility at scale.",
        links: ["460+", "scale", "transition"]
      }
    ],
    tracks: [
      { title: "Hardware", body: "Physical components, installation constraints, power/environment exposure, and deployment readiness.", tools: ["component constraints", "installation planning", "field tolerance"] },
      { title: "Computer Vision", body: "Detection behavior, model-feedback visibility, scenario validation, and readiness to support real-world operating conditions.", tools: ["detection logic", "performance visibility", "acceptance logic"] },
      { title: "QA / Testing", body: "Readiness checkpoints, defect visibility, scenario-based testing, and release discipline across pilot validation.", tools: ["readiness checks", "test evidence", "release control"] },
      { title: "Integration", body: "Hardware-software dependency mapping, field configuration, and cross-team handoff coordination.", tools: ["dependency map", "configuration", "handoff"] },
      { title: "Governance", body: "RAID, milestone tracking, MoSCoW prioritization, structured sponsor updates, and change-control visibility.", tools: ["RAID", "milestones", "MoSCoW", "CCB logic"] },
      { title: "Deployment", body: "Pilot deployment coordination, operating-condition readiness, transition planning, and stabilization support.", tools: ["pilot coordination", "readiness", "stabilization"] }
    ],
    artifacts: ["RAID logs", "Milestone trackers", "MoSCoW scope control", "Readiness checklists", "Issue trackers", "Sponsor updates", "Pilot handoff notes" ]
  },
  diagnostic: [
    {
      id: "noHistory",
      label: "No usage history",
      title: "New item has no draw history",
      effect: "The demand signal looks empty even though the item may be required for service continuity."
    },
    {
      id: "formula",
      label: "Formula returns near-zero",
      title: "Safety-stock formula collapses",
      effect: "A statistical formula can output near-zero when there is no usage history, creating false confidence."
    },
    {
      id: "classification",
      label: "Macro routes item to DEAD",
      title: "VBA has no no-history state",
      effect: "Zero usage is treated as dead demand instead of a new/no-history condition that needs a threshold."
    },
    {
      id: "filter",
      label: "Hardcoded filter hides item",
      title: "AutoFilter field number breaks silently",
      effect: "A column shift can hide valid items from review without obvious error messages."
    },
    {
      id: "overwrite",
      label: "Formula cells overwritten",
      title: "Workbook governance fails",
      effect: "Static values freeze calculations, so updated logic appears not to work."
    },
    {
      id: "macroVersion",
      label: "Wrong macro version active",
      title: "The edited code is not the running code",
      effect: "A third workbook-embedded VBA version can keep old behavior alive despite edited .bas files."
    }
  ],
  timeline: [
    {
      year: "Now",
      title: "In-Plant Solution Specialist (Project & Operations)",
      org: "MSC Industrial Supply Co. — embedded at aerospace manufacturing client",
      body: "Owns operating controls, data structure, issue tracking, service delivery visibility, and planning workflows for a production-critical consignment program.",
      chips: ["Operations controls", "Power Query", "VBA", "Stakeholder coordination", "Service delivery"]
    },
    {
      year: "2022",
      title: "Project Manager — Smart City & AI-Enabled Infrastructure",
      org: "SmartC LLC · Remote",
      body: "Delivered AI-enabled transportation technology projects through planning, testing, pilot, and commercialization workstreams.",
      chips: ["AI infrastructure", "Pilot delivery", "QA readiness", "RAID", "Change control"]
    },
    {
      year: "2014",
      title: "Deck Officer Progression — International Commercial Maritime",
      org: "Fixed-term contract assignments",
      body: "Built the regulated-operations foundation through navigation watchkeeping, GMDSS/radio communications, bridge documentation, drills, and emergency readiness.",
      chips: ["STCW", "SOLAS", "ISM", "ISPS", "COLREGs", "Zero-failure execution"]
    },
    {
      year: "PMP",
      title: "Project Management Professional",
      org: "PMI certified",
      body: "Formal PM credential supporting implementation delivery, governance, risk, schedule, stakeholder, and change-control language.",
      chips: ["PMP", "Implementation", "Risk", "Governance"]
    }
  ]
};
