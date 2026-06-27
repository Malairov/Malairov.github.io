(function () {
  const skus = [
    { id: 'new', label: 'New item · week 1', touches: ['intake'] },
    { id: 'active', label: 'Active · steady draw', touches: ['floor', 'slot', 'jit'] },
    { id: 'flagged', label: 'Flagged by supervisor', touches: ['floor', 'slot'] },
    { id: 'prepaid', label: 'MAW prepaid batch', touches: ['billing'] },
    { id: 'overstocked', label: 'Slow mover · overstocked', touches: ['slot', 'jit'] }
  ];

  const loops = [
    {
      id: 'floor', num: '01', title: 'Floor supervisor feedback', tag: 'weekly · 60+ supervisors',
      body: 'Every week, floor supervisors flag items that are wrong, missing, or unnecessary at their station. This is the fastest signal in the system — it surfaces a problem before it shows up as a shortage or a dead-stock report.',
      inputs: 'INPUTS: supervisor flags, usage complaints',
      outputs: 'FEEDS: SKU weeding decisions, slot-economics review'
    },
    {
      id: 'slot', num: '02', title: 'Slot-economics audit', tag: 'ongoing · vending hardware ~$1M/unit',
      body: 'Vending hardware slots are expensive and finite. This loop asks whether each item still earns its physical space — weighing draw rate against the cost of holding that slot, and against contractual overstock limits that carry their own financial risk.',
      inputs: 'INPUTS: floor feedback, draw rate, overstock limits',
      outputs: 'FEEDS: JIT tuning, item removal decisions'
    },
    {
      id: 'jit', num: '03', title: 'JIT tuning', tag: 'analytical · hard-floor constrained',
      body: 'Replenishment timing gets tuned against actual draw, not the original install assumption. The constraint that matters: minimum order quantities and lead times set a hard floor this loop can\'t optimize past, no matter how clean the demand signal is.',
      inputs: 'INPUTS: slot-economics output, usage history, lead times',
      outputs: 'FEEDS: reorder timing, safety-stock levels'
    },
    {
      id: 'billing', num: '04', title: 'Billing-state tracking', tag: 'continuous · MAW tag tracking',
      body: 'New items enter on a MAW tag — prepaid, first batch, excluded from invoicing. The same tag that gets an item onto the program has to come off cleanly once it moves to standard consignment billing, or the client gets billed for stock they already paid for.',
      inputs: 'INPUTS: item lifecycle stage, intake batch records',
      outputs: 'FEEDS: billing accuracy, support team handoff'
    }
  ];

  const skuPicker = document.getElementById('sku-picker');
  const mechContainer = document.getElementById('loops-mech');
  if (!skuPicker || !mechContainer) return;

  skus.forEach((s) => {
    const btn = document.createElement('button');
    btn.className = 'sku-btn';
    btn.textContent = s.label;
    btn.dataset.id = s.id;
    btn.addEventListener('click', () => selectSku(s.id));
    skuPicker.appendChild(btn);
  });

  loops.forEach((l) => {
    const panel = document.createElement('div');
    panel.className = 'loop-mech-panel';
    panel.id = 'mech-panel-' + l.id;
    panel.innerHTML =
      '<div class="loop-mech-head">' +
        '<div class="title-block"><span class="num">' + l.num + '</span><h4>' + l.title + '</h4></div>' +
        '<div class="tag">' + l.tag + '</div>' +
      '</div>' +
      '<div class="loop-mech-detail" id="mech-detail-' + l.id + '">' +
        '<p>' + l.body + '</p>' +
        '<div class="io">' + l.inputs + '<br>' + l.outputs + '</div>' +
      '</div>';
    panel.addEventListener('click', () => toggleDetail(l.id));
    mechContainer.appendChild(panel);
  });

  function toggleDetail(id) {
    const detail = document.getElementById('mech-detail-' + id);
    if (detail) detail.classList.toggle('show');
  }

  function selectSku(id) {
    const buttons = skuPicker.querySelectorAll('.sku-btn');
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.id === id));

    const sku = skus.find((s) => s.id === id);
    loops.forEach((l) => {
      const panel = document.getElementById('mech-panel-' + l.id);
      if (!panel) return;
      const touched = sku.touches.includes(l.id);
      panel.classList.toggle('dim', !touched);
      panel.classList.toggle('active', touched);
    });
  }

  selectSku('active');
})();
