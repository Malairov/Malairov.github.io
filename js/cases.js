(function () {
  const cases = [
    {
      num: '01',
      title: 'Four parallel operating loops',
      tags: ['Process design', 'Anchor case'],
      problem: 'A single-threaded consignment program had no separation between demand signal, physical verification, vendor performance, and cost control. Everything competed for the same attention.',
      intervention: 'Designed and ran four concurrent loops — floor feedback, slot economics, JIT tuning, billing state — so each function improves independently without waiting on the others.',
      result: 'Each loop now runs on its own cadence with its own owner logic, so a slowdown in one doesn\'t stall the rest of the program.',
      metrics: [['4', 'concurrent operating loops'], ['service', 'continuity maintained during buildout']]
    },
    {
      num: '02',
      title: 'Multi-tier vendor and spec governance',
      tags: ['Multi-tier control'],
      problem: 'Substitutions could drift outside customer-mandated tooling specifications if sourcing decisions were made on cost or speed alone.',
      intervention: 'Built a qualification structure spanning distributor, manufacturer, and OEM-spec tiers. Constraint-first funnel: every proposed item passes spec-control gates before it is eligible for sourcing, not after.',
      result: 'Spec compliance is now checked at the gate, not discovered on the floor after the part is already in use.',
      metrics: [['30+', 'supplier/vendor interfaces'], ['gate-first', 'spec-control logic']]
    },
    {
      num: '03',
      title: 'Safety-stock formula silently excluding new items',
      tags: ['Root-cause diagnosis'],
      problem: 'New SKUs were vanishing from reorder review with no error, no warning — they just never showed up on the list that mattered.',
      intervention: 'Traced the fault across three layers — a hub formula, the query logic feeding it, and a classification macro — to find new items being scored against thin usage history and misrouted to a dead-stock bucket.',
      result: 'Three compounding root causes identified and fixed. The corrected logic now lives inside the JIT-tuning loop from case 01.',
      metrics: [['3', 'compounding root causes found']]
    },
    {
      num: '04',
      title: 'MWO tracking system, built from nothing',
      tags: ['System build'],
      problem: 'Tooling shortages were tracked as a list of complaints with no structured way to trace them back to a cause.',
      intervention: 'Built a tracking system that ties shortage events to specific work orders and vendors, turning informal complaints into a dataset.',
      result: 'That dataset now feeds directly into the slot-economics audit from case 01, closing the loop between symptom and cause.',
      metrics: [['~1 wk', 'avg. gap duration, down from ~16 days']]
    }
  ];

  const grid = document.getElementById('case-grid');
  if (!grid) return;

  cases.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'case-card';

    const tagsHtml = c.tags.map((t) => '<span class="case-tag">' + t + '</span>').join('');
    const metricsHtml = c.metrics
      .map((m) => '<div class="case-metric"><div class="m-val">' + m[0] + '</div><div class="m-label">' + m[1] + '</div></div>')
      .join('');

    card.innerHTML =
      '<div class="case-card-head">' +
        '<div class="case-num">' + c.num + '</div>' +
        '<div class="case-card-title"><h3>' + c.title + '</h3><div class="case-tags">' + tagsHtml + '</div></div>' +
        '<div class="case-chevron">&rsaquo;</div>' +
      '</div>' +
      '<div class="case-card-body">' +
        '<div class="case-flow">' +
          '<div class="case-flow-step"><div class="flow-label">Problem</div><p>' + c.problem + '</p></div>' +
          '<div class="case-flow-step"><div class="flow-label">Intervention</div><p>' + c.intervention + '</p></div>' +
          '<div class="case-flow-step"><div class="flow-label">Result</div><p>' + c.result + '</p></div>' +
        '</div>' +
        '<div class="case-metric-row">' + metricsHtml + '</div>' +
      '</div>';

    const head = card.querySelector('.case-card-head');
    const body = card.querySelector('.case-card-body');
    head.addEventListener('click', () => {
      card.classList.toggle('open');
      body.classList.toggle('show');
    });

    grid.appendChild(card);
  });

  if (grid.firstElementChild) {
    grid.firstElementChild.querySelector('.case-card-head').click();
  }
})();
