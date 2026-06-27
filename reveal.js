(function () {
  const systems = [
    {
      id: 'anchor', num: '01 // ANCHOR', title: 'Four parallel operating loops',
      tag: 'runs continuously',
      body: 'A single-threaded consignment program had no separation between demand signal, physical verification, vendor performance, and cost control. Designed and ran four concurrent loops — floor feedback, slot economics, JIT tuning, billing state — so each function improves independently without waiting on the others.',
      metrics: [['4', 'concurrent loops'], ['0', 'coverage gaps during rollout']],
      connector: 'governs what enters the loops'
    },
    {
      id: 'governance', num: '02 // GOVERNANCE', title: 'Multi-tier vendor and spec control',
      tag: 'gates every new item',
      body: 'A qualification structure spanning distributor, manufacturer, and OEM-spec tiers keeps substitutions inside customer-mandated tooling specifications. Constraint-first funnel: every proposed item passes spec-control gates before it is eligible for sourcing, not after.',
      metrics: [['~50%', 'fewer spec exceptions reaching the floor']],
      connector: 'feeds the JIT-tuning loop'
    },
    {
      id: 'diagnosis', num: '03 // DIAGNOSTIC', title: 'Safety-stock root-cause finding',
      tag: 'feeds back into loop 01',
      body: 'New SKUs were vanishing from reorder review. The fault traced across three layers — a hub formula, the query logic feeding it, and a classification macro — to new items being scored against thin usage history and misrouted to a dead-stock bucket. The fix now lives inside the JIT-tuning loop from system 01.',
      metrics: [['3', 'compounding root causes found']],
      connector: 'feeds the slot-economics audit'
    },
    {
      id: 'tracking', num: '04 // TRACKING', title: 'MWO tooling shortage tracking',
      tag: 'informs slot economics',
      body: 'No structured way existed to trace tooling shortages back to root cause. Built a tracking system that ties shortage events to specific work orders and vendors, turning a list of complaints into a dataset that feeds the slot-economics audit in system 01.',
      metrics: [['~1 wk', 'avg. gap duration, down from ~16 days']],
      connector: null
    }
  ];

  const list = document.getElementById('arch-map');
  if (!list) return;

  systems.forEach((s, i) => {
    const node = document.createElement('div');
    node.className = 'arch-node';
    node.id = 'arch-' + s.id;

    const metricsHtml = s.metrics
      .map((m) => '<div class="case-metric"><div class="m-val">' + m[0] + '</div><div class="m-label">' + m[1] + '</div></div>')
      .join('');

    node.innerHTML =
      '<div class="arch-node-head">' +
        '<span class="arch-status-led"></span>' +
        '<span class="arch-node-num">' + s.num + '</span>' +
        '<span class="arch-node-title">' + s.title + '</span>' +
        '<span class="arch-node-tag">' + s.tag + '</span>' +
        '<span class="arch-node-chevron">&rsaquo;</span>' +
      '</div>' +
      '<div class="arch-node-body" id="arch-body-' + s.id + '">' +
        '<p>' + s.body + '</p>' +
        '<div class="arch-node-metrics">' + metricsHtml + '</div>' +
      '</div>';

    node.addEventListener('click', () => {
      node.classList.toggle('open');
      document.getElementById('arch-body-' + s.id).classList.toggle('show');
    });

    list.appendChild(node);

    if (s.connector) {
      const conn = document.createElement('div');
      conn.className = 'arch-connector';
      conn.innerHTML = '<div class="arch-connector-line"></div><span class="arch-connector-label">' + s.connector + '</span>';
      list.appendChild(conn);
    }
  });

  const anchor = document.getElementById('arch-anchor');
  if (anchor) anchor.click();
})();
