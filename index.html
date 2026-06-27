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

  function render() {
    const weeksOfHistory = Number(historyInput.value);
    const itemAgeWeeks = Number(onsiteInput.value);
    historyOut.textContent = weeksOfHistory + ' wk';
    onsiteOut.textContent = itemAgeWeeks + ' wk';

    // Legacy formula: rolling average usage over a fixed lookback window.
    // New items with < lookback weeks of history get an artificially low
    // denominator-driven average because missing weeks count as zero usage.
    const lookback = 12;
    const observedUsage = 8; // arbitrary stand-in average weekly draw once it ramps up
    const legacyAvg = (observedUsage * Math.min(weeksOfHistory, lookback)) / lookback;
    const legacySafetyStock = Math.round(legacyAvg * 1.5);

    // Corrected formula: classify by tenure first. Anything under a
    // configurable threshold is flagged NO-USAGE and routed to manual
    // reorder review instead of being scored against thin history.
    const noUsageThreshold = 6;
    const isNoUsage = itemAgeWeeks < noUsageThreshold;
    const correctedAvg = isNoUsage ? null : (observedUsage * Math.min(weeksOfHistory, lookback)) / lookback;
    const correctedSafetyStock = isNoUsage ? 'flagged' : Math.round(correctedAvg * 1.5);

    oldResult.textContent = legacySafetyStock + ' units';
    if (legacySafetyStock <= 1) {
      oldStatus.textContent = 'excluded from reorder review';
      oldStatus.style.color = 'var(--warn)';
    } else {
      oldStatus.textContent = 'included in reorder review';
      oldStatus.style.color = 'var(--ok)';
    }

    if (isNoUsage) {
      newResult.textContent = 'NO-USAGE';
      newStatus.textContent = 'routed to manual review queue';
      newStatus.style.color = 'var(--amber)';
    } else {
      newResult.textContent = correctedSafetyStock + ' units';
      newStatus.textContent = 'included in reorder review';
      newStatus.style.color = 'var(--ok)';
    }

    oldFormula.textContent = `= AVG(usage, last ${lookback}wk window) x 1.5  ->  ${legacyAvg.toFixed(2)} x 1.5`;
    newFormula.textContent = isNoUsage
      ? `tenure ${itemAgeWeeks}wk < ${noUsageThreshold}wk threshold -> classify NO-USAGE, skip averaging`
      : `tenure OK -> = AVG(usage, last ${lookback}wk window) x 1.5  ->  ${correctedAvg.toFixed(2)} x 1.5`;
  }

  historyInput.addEventListener('input', render);
  onsiteInput.addEventListener('input', render);
  render();
})();
