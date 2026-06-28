window.PORTFOLIO_DATA = {
  metrics: [
    { value: "400 → 1,800+", label: "Tracked item foundation", context: "Catalog expanded and structured; 1,500+ active SKUs standardized for traceability." },
    { value: "5h → 30m", label: "Ordering workflow", context: "Exception-based planning controls replaced manual review work." },
    { value: "~16d → ~1w", label: "Critical gap duration", context: "MWO tooling shortage gap duration reduced through structured tracking." },
    { value: "460+", label: "Installed locations", context: "SmartC AI-enabled infrastructure platform commercial scale." }
  ],
  audienceLens: {
    recruiter: {
      title: "Recruiter scan",
      headline: "PMP-certified Operations & Implementation Project Manager for regulated technical environments.",
      summary: "Best fit: Operations PM, Implementation PM, Technical Operations PM, Service Delivery, Process Improvement, manufacturing service delivery, and regulated industrial operations.",
      bullets: ["PMP-certified", "Aerospace manufacturing", "AI-enabled infrastructure", "Regulated operations foundation"]
    },
    manager: {
      title: "Hiring manager scan",
      headline: "Delivery evidence is shown through systems built, not generic duties.",
      summary: "The portfolio shows how fragmented work was converted into control loops, dashboards, workflows, issue tracking, readiness logic, and stakeholder-visible execution.",
      bullets: ["Four operating loops", "5h → 30m workflow", "~16d → ~1w gap duration", "460+ scale anchor"]
    },
    technical: {
      title: "Technical reviewer scan",
      headline: "The technical value is control under constraints.",
      summary: "Deeper layers expose inputs, outputs, constraints, failure modes, governance gates, lifecycle states, and recovery logic without inflating authority or technical authorship.",
      bullets: ["Signal paths", "Root-cause chain", "Spec-governance funnel", "Power Query / VBA controls"]
    }
  },
  architecture: [
    { id:"feedback", tag:"Loop 01", title:"Floor Supervisor Feedback", sub:"Fastest demand and friction signal.", role:"Captures wrong, missing, unnecessary, or difficult-to-find items before they become formal shortage reports.", inputs:"Supervisor flags, usage complaints, station-level friction.", outputs:"SKU weeding, slot-audit inputs, service-friction visibility." },
    { id:"slot", tag:"Loop 02", title:"Slot-Economics Audit", sub:"Physical space as a scarce control point.", role:"Tests whether an item still earns its vending/storage footprint against draw rate, overstock limits, and service need.", inputs:"Floor feedback, draw rate, overstock limits, service criticality.", outputs:"Keep, remove, resize, or feed JIT tuning." },
    { id:"jit", tag:"Loop 03", title:"JIT / Safety-Stock Logic", sub:"Demand timing under hard constraints.", role:"Tunes reorder timing against actual draw while respecting MOQ, package size, lead-time floor, and no-history items.", inputs:"Usage history, lead times, slot outputs, risk indicators.", outputs:"Reorder timing, safety stock, NO-USAGE classification, exception list." },
    { id:"billing", tag:"Loop 04", title:"Billing-State Tracking", sub:"Lifecycle state accuracy.", role:"Controls transition from prepaid/first-batch state to standard consignment billing so the same stock is not billed twice.", inputs:"Lifecycle stage, intake batch records, state marker.", outputs:"Billing accuracy, support-team handoff, state visibility." },
    { id:"governance", tag:"Layer", title:"Vendor / Spec Governance", sub:"Constraint-first sourcing funnel.", role:"Separates availability from allowed substitution. Items pass customer-controlled spec gates before sourcing decisions.", inputs:"Distributor availability, manufacturer match, customer/OEM spec, COC need.", outputs:"Allowed item, blocked substitution, compliance evidence." },
    { id:"intake", tag:"Gate", title:"New SKU Intake", sub:"Qualification before system load.", role:"Prevents uncontrolled items from entering the program.", inputs:"User need, spec constraints, sampling, customer approval.", outputs:"Eligible item, rejected item, first-batch state." },
    { id:"tracking", tag:"Layer", title:"MWO Shortage Tracking", sub:"Shortage events as traceable evidence.", role:"Turns complaints into event-level visibility tied to item, work order, vendor, delay reason, and closure timing.", inputs:"MWO requests, shortage complaints, vendor state.", outputs:"Closure metrics, escalation visibility, JIT/slot feedback." }
  ]
};