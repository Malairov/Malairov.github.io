(function () {
  const systems = [
    {
      id: 'anchor', num: '01 — anchor system', title: 'Four parallel operating loops',
      tag: 'Process design · runs continuously',
      body: 'A single-threaded consignment program had no separation between demand signal, physical verification, vendor performance, and cost control. Designed and ran four concurrent loops — floor feedback, slot economics, JIT tuning, billing state — so each function improves independently without waiting on the others.',
      metrics: [['4', 'concurrent loops'], ['0', 'coverage gaps during rollout']]
    },
    {
      id: 'governance', num: '02 — governance layer', title: 'Multi-tier vendor and spec control',
      tag: 'Multi-tier control · gates every new item',
      body: 'A qualification structure spanning distributor, manufacturer, and OEM-spec tiers keeps substitutions inside customer-mandated tooling specifications. Constraint-first funnel: every proposed item passes spec-control gates before it is eligible for sourcing, not after. This layer decides which items are even allowed to enter the loops in system 01.',
      metrics: [['~50%', 'fewer spec exceptions reaching the floor']]
    },
    {
      id: 'diagnosis', num: '03 — diagnostic case', title: 'Safety-stock root-cause finding',
      tag: 'Diagnosis · feeds back into JIT tuning',
      body: 'New SKUs were vanishing from reorder review. The fault traced across three layers — a hub formula, the query logic feeding it, and a classification macro — to new items being scored against thin usage history and misrouted to a dead-stock bucket. The fix now lives inside the JIT-tuning loop from system 01.',
      metrics: [['3', 'compounding root causes found']]
    },
    {
      id: 'tracking', num: '04 — tracking system', title: 'MWO tooling shortage tracking',
      tag: 'System build · informs slot economics',
      body: 'No structured way existed to trace tooling shortages back to root cause. Built a tracking system that ties shortage events to specific work orders and vendors, turning a list of complaints into a dataset that feeds the slot-economics audit in system 01.',
      metrics: [['~1 wk', 'avg. gap duration, down from ~16 days']]
    }
  ];

  const list = document.getElementById('arch-list');
  if (!list) return;

  systems.forEach((s, i) => {
    if (i > 0) {
      const conn = document.createElement('div');
      conn.className = 'arch-conn';
      conn.innerHTML = '<div class="arch-conn-line"></div>';
      list.appendChild(conn);
    }

    const card = document.createElement('div');
    card.className = 'arch-card';
    card.id = 'arch-' + s.id;

    const metricsHtml = s.metrics
      .map((m) => '<span class="arch-metric"><strong>' + m[0] + '</strong><span>' + m[1] + '</span></span>')
      .join('');

    card.innerHTML =
      '<div class="arch-head">' +
        '<div>' +
          '<div class="arch-num">' + s.num + '</div>' +
          '<div class="arch-title">' + s.title + '</div>' +
          '<div class="arch-tag">' + s.tag + '</div>' +
        '</div>' +
        '<span class="arch-chevron">&rsaquo;</span>' +
      '</div>' +
      '<div class="arch-detail" id="arch-detail-' + s.id + '">' +
        '<p>' + s.body + '</p>' +
        '<div class="arch-metric-row">' + metricsHtml + '</div>' +
      '</div>';

    card.addEventListener('click', () => {
      card.classList.toggle('open');
      const detail = document.getElementById('arch-detail-' + s.id);
      if (detail) detail.classList.toggle('show');
    });

    list.appendChild(card);
  });

  const anchorCard = document.getElementById('arch-anchor');
  if (anchorCard) anchorCard.click();
})();
