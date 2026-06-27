(function () {
  const historyInput = document.getElementById('usage-history');
  const historyOut = document.getElementById('usage-history-out');
  const onsiteInput = document.getElementById('item-age');
  const onsiteOut = document.getElementById('item-age-out');
  const oldResult = document.getElementById('old-result');
  const newResult = document.getElementById('new-result');
  const oldStatus = document.getElementById('old-status');
  const newStatus = document.getElementById('new-status');
  const oldFormula = document.getElementById('old-formula');
  const newFormula = document.getElementById('new-formula');

  if (!historyInput || !onsiteInput) return;

  function render() {
    const weeksOfHistory = Number(historyInput.value);
    const itemAgeWeeks = Number(onsiteInput.value);
    historyOut.textContent = weeksOfHistory + ' wk';
    onsiteOut.textContent = itemAgeWeeks + ' wk';

    const lookback = 12;
    const observedUsage = 8;
    const legacyAvg = (observedUsage * Math.min(weeksOfHistory, lookback)) / lookback;
    const legacySafetyStock = Math.round(legacyAvg * 1.5);

    const noUsageThreshold = 6;
    const isNoUsage = itemAgeWeeks < noUsageThreshold;
    const correctedAvg = isNoUsage ? null : (observedUsage * Math.min(weeksOfHistory, lookback)) / lookback;
    const correctedSafetyStock = isNoUsage ? 'flagged' : Math.round(correctedAvg * 1.5);

    oldResult.textContent = legacySafetyStock + ' units';
    oldStatus.className = 'lab-status';
    if (legacySafetyStock <= 1) {
      oldStatus.textContent = 'excluded from reorder review';
      oldStatus.classList.add('risk');
    } else {
      oldStatus.textContent = 'included in reorder review';
      oldStatus.classList.add('ok');
    }

    newStatus.className = 'lab-status';
    if (isNoUsage) {
      newResult.textContent = 'NO-USAGE';
      newStatus.textContent = 'routed to manual review queue';
      newStatus.classList.add('flagged');
    } else {
      newResult.textContent = correctedSafetyStock + ' units';
      newStatus.textContent = 'included in reorder review';
      newStatus.classList.add('ok');
    }

    oldFormula.textContent = '= AVG(usage, last ' + lookback + 'wk window) x 1.5 -> ' + legacyAvg.toFixed(2) + ' x 1.5';
    newFormula.textContent = isNoUsage
      ? 'tenure ' + itemAgeWeeks + 'wk < ' + noUsageThreshold + 'wk threshold -> classify NO-USAGE, skip averaging'
      : 'tenure OK -> = AVG(usage, last ' + lookback + 'wk window) x 1.5 -> ' + correctedAvg.toFixed(2) + ' x 1.5';
  }

  historyInput.addEventListener('input', render);
  onsiteInput.addEventListener('input', render);
  render();
})();
