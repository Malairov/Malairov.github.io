
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

function activateDeepNode(stage, id) {
  const node = stage.querySelector(`[data-deep-node="${id}"]`);
  const detail = stage.querySelector('.deep-detail');
  if (!node || !detail) return;
  $$('.deep-node', stage).forEach(n => n.classList.toggle('active', n === node));
  detail.innerHTML = `
    <span>${node.dataset.tag || 'System layer'}</span>
    <strong>${node.dataset.title || node.textContent.trim()}</strong>
    <p>${node.dataset.detail || 'This layer turns ambiguous work into visible control, decision logic, and execution evidence.'}</p>
  `;
}

function setupDeepStages() {
  $$('.deep-stage').forEach(stage => {
    const first = $('.deep-node', stage);
    if (first) activateDeepNode(stage, first.dataset.deepNode);
    $$('.deep-node', stage).forEach(node => {
      node.addEventListener('click', () => activateDeepNode(stage, node.dataset.deepNode));
      node.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateDeepNode(stage, node.dataset.deepNode);
        }
      });
    });
  });
}

function setupDiagnosticLab() {
  const output = $('#diagnosticDeepOutput');
  if (!output) return;
  const buttons = $$('[data-failure]');
  function setActive(btn) {
    buttons.forEach(b => b.classList.toggle('active', b === btn));
    output.innerHTML = `
      <strong>${btn.dataset.title}</strong>
      <p>${btn.dataset.detail}</p>
    `;
  }
  buttons.forEach(btn => {
    btn.addEventListener('click', () => setActive(btn));
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); setActive(btn);
      }
    });
  });
  if (buttons[0]) setActive(buttons[0]);
}

document.addEventListener('DOMContentLoaded', () => {
  setupDeepStages();
  setupDiagnosticLab();
});
