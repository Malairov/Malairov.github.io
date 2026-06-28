window.PORTFOLIO_DATA = {
  metrics: [
    { value: "PMP", label: "Credential", detail: "Project Management Professional; used as a role-fit signal, not a substitute for evidence." },
    { value: "5 buildings", label: "Aerospace service environment", detail: "Embedded technical operations support across a production-critical industrial supply program." },
    { value: "17", label: "Vending systems", detail: "Program scale requiring operating controls, replenishment logic, and service-delivery visibility." },
    { value: "1,500+", label: "Active SKUs", detail: "Structured master data and operational reporting foundation for a complex consignment program." },
    { value: "5h -> 30m", label: "Workflow improvement", detail: "Manual ordering review shifted toward exception-based replenishment planning." },
    { value: "460+", label: "Installed locations", detail: "Public scale anchor for SmartC AI-enabled transportation technology delivery." }
  ],
  lens: {
    recruiter: {
      label: "Recruiter",
      headline: "Operations PM / Technical Operations PM profile with PMP credibility and proof-of-work case studies.",
      body: "The site targets roles where technical operations, implementation delivery, process improvement, and service delivery need stronger control and visibility.",
      points: ["PMP-certified", "Aerospace manufacturing service delivery", "AI transportation technology projects", "Regulated maritime operations foundation"]
    },
    hiring: {
      label: "Hiring manager",
      headline: "Evidence is organized around systems built, not generic task lists.",
      body: "The portfolio shows control loops, escalation workflows, replenishment planning logic, issue visibility, implementation governance, and measurable operating outcomes.",
      points: ["Operating control model", "Exception-based workflow", "Stakeholder coordination", "Implementation discipline"]
    },
    technical: {
      label: "Technical reviewer",
      headline: "The technical value is operational control under constraints.",
      body: "Case studies expose signals, constraints, failure modes, decisions, controls built, metrics, and transferability to technical operations roles.",
      points: ["Root-cause analysis", "Power Query / VBA controls", "RAID-style visibility", "QA / readiness governance"]
    }
  },
  architecture: [
    { id: "feedback", tag: "Loop 01", title: "Floor Supervisor Feedback", detail: "Captures operational friction before it becomes formal shortage escalation; turns floor signal into SKU review and service-delivery visibility.", proof: "Stakeholder signal capture and operating visibility." },
    { id: "slot", tag: "Loop 02", title: "Slot-Economics Audit", detail: "Treats vending/storage capacity as a control point; items need to justify physical footprint against service value and usage behavior.", proof: "Capacity governance, prioritization, and process improvement." },
    { id: "jit", tag: "Loop 03", title: "JIT / Safety-Stock Logic", detail: "Replenishment planning logic tied to usage, lead time, package size, MOQ, no-history exceptions, and service-risk visibility.", proof: "Exception-based workflow and technical operations control." },
    { id: "billing", tag: "Loop 04", title: "Billing-State Tracking", detail: "Controls transition from first-batch/prepaid state into standard consignment billing to avoid ambiguity and duplicate handling.", proof: "Lifecycle-state governance and escalation clarity." },
    { id: "governance", tag: "Layer", title: "Vendor / Spec Governance", detail: "Separates available products from approved substitutions through customer/OEM-controlled specification gates.", proof: "Regulated service delivery and vendor coordination." },
    { id: "intake", tag: "Gate", title: "New SKU Intake", detail: "Keeps uncontrolled items out of the operating system until need, spec constraints, and initial state are clear.", proof: "Implementation discipline and intake control." },
    { id: "tracking", tag: "Layer", title: "MWO Shortage Tracking", detail: "Turns shortage complaints into traceable events tied to item, work order, vendor state, delay reason, and closure timing.", proof: "Escalation workflow and measurable outcomes." }
  ],
  cases: [
    {
      url: "cases/four-operating-loops.html",
      tag: "Signature operations case",
      title: "Four Operating Loops",
      problem: "Demand signal, slot capacity, reorder logic, and billing-state accuracy competed for the same attention path.",
      mechanism: "Four concurrent control loops with defined inputs, outputs, and escalation logic.",
      result: "Clearer service-delivery visibility, stronger process controls, and measurable operating discipline.",
      relevance: "Operations PM / Technical Operations PM / Process Improvement PM"
    },
    {
      url: "cases/smartc-ai-delivery.html",
      tag: "Technical delivery case",
      title: "SmartC AI Delivery",
      problem: "AI-enabled transportation technology work needed recovery, readiness, governance, and cross-functional delivery control.",
      mechanism: "Workstream coordination across hardware, software, QA, integration, pilot logic, and sponsor governance.",
      result: "Commercial-scale credibility anchored by 460+ installed locations.",
      relevance: "Implementation PM / Technical PM / Service Delivery PM"
    },
    {
      url: "cases/safety-stock-diagnostic.html",
      tag: "Diagnostic case",
      title: "Safety-Stock Diagnostic",
      problem: "New SKUs disappeared from reorder review through interacting spreadsheet, logic, and macro failures.",
      mechanism: "Root-cause analysis across formula behavior, Power Query, VBA classification, filters, and version control.",
      result: "NO-USAGE exception state, dynamic header logic, and stronger diagnostic visibility.",
      relevance: "Process Improvement PM / Technical Operations PM"
    }
  ]
};