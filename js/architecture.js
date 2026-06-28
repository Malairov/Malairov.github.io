(function () {
  const systems = [
    {
      id: 'master-data', num: '01', title: 'Master data foundation', tag: 'source of truth',
      body: 'Standardized item records, legacy cross-references, searchable descriptors, supplier links, and usage history so planning decisions were not made from fragmented names and incomplete records.',
      metrics: [['1,800+', 'tracked items'], ['1,500+', 'active SKUs standardized']],
      area: 'data'
    },
    {
      id: 'governance', num: '02', title: 'Spec and vendor governance', tag: 'entry control',
      body: 'Created a constraint-first qualification logic so proposed substitutions, vendor options, and replenishment paths could be checked against required specifications before items reached the floor.',
      metrics: [['30+', 'supplier/vendor interfaces'], ['gate-first', 'control logic']],
      area: 'governance'
    },
    {
      id: 'replenishment', num: '03', title: 'Replenishment planning logic', tag: 'execution engine',
      body: 'Built an exception-based planning workflow using usage signals, lead-time variability, package-size logic, and stockout-risk indicators to move ordering from manual review into controlled decision support.',
      metrics: [['~30 min', 'ordering effort, down from ~5 hrs'], ['~50%', 'lower shortage exposure on key items']],
      area: 'planning'
    },
    {
      id: 'issue-tracking', num: '04', title: 'Issue tracking and escalation', tag: 'closed-loop feedback',
      body: 'Converted informal shortage complaints into structured records with IDs, categories, owners, delayed follow-ups, and dashboard visibility so recurring issues could be traced back to causes.',
      metrics: [['unique IDs', 'for traceability'], ['median T/C', 'dashboard-ready']],
      area: 'control'
    },
    {
      id: 'reporting', num: '05', title: 'Reporting and stakeholder visibility', tag: 'management layer',
      body: 'Connected usage reporting, delayed deliveries, issue status, service gaps, and planning indicators into dashboards and stakeholder-ready views for faster escalation and decision-making.',
      metrics: [['Power Query', 'reporting model'], ['VBA', 'automation layer']],
      area: 'visibility'
    }
  ];

  const root = document.getElementById('arch-map');
  if (!root) return;

  root.innerHTML =
    '<div class="arch-board" aria-label="Operations architecture map">' +
      '<div class="arch-lines" aria-hidden="true"></div>' +
      '<button class="arch-map-node data" data-id="master-data"><span>01</span><strong>Master data</strong><em>records / usage / searchability</em></button>' +
      '<button class="arch-map-node governance" data-id="governance"><span>02</span><strong>Governance</strong><em>spec gates / vendor control</em></button>' +
      '<button class="arch-map-node planning" data-id="replenishment"><span>03</span><strong>Planning logic</strong><em>risk / lead time / exception flow</em></button>' +
      '<button class="arch-map-node control" data-id="issue-tracking"><span>04</span><strong>Issue control</strong><em>MWO / follow-up / escalation</em></button>' +
      '<button class="arch-map-node visibility" data-id="reporting"><span>05</span><strong>Visibility</strong><em>dashboards / stakeholder view</em></button>' +
      '<div class="arch-hub"><span>OPERATING SYSTEM</span><strong>Consignment execution layer</strong><em>keeps daily service running while controls improve</em></div>' +
    '</div>' +
    '<div class="arch-detail-panel" id="arch-detail-panel"></div>';

  const detail = document.getElementById('arch-detail-panel');

  function renderDetail(id) {
    const s = systems.find((x) => x.id === id) || systems[0];
    document.querySelectorAll('.arch-map-node').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.id === s.id);
    });
    const metricsHtml = s.metrics.map((m) => '<div class="case-metric"><div class="m-val">' + m[0] + '</div><div class="m-label">' + m[1] + '</div></div>').join('');
    detail.innerHTML =
      '<div class="arch-detail-top"><span>' + s.num + ' // ' + s.tag + '</span><strong>' + s.title + '</strong></div>' +
      '<p>' + s.body + '</p>' +
      '<div class="arch-node-metrics">' + metricsHtml + '</div>';
  }

  document.querySelectorAll('.arch-map-node').forEach((btn) => {
    btn.addEventListener('click', () => renderDetail(btn.dataset.id));
  });

  renderDetail('replenishment');
})();
