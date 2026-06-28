const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function setupMobileNav() {
  const button = qs('#menuToggle');
  const nav = qs('#primaryNav');
  if (!button || !nav) return;

  const close = () => {
    document.body.classList.remove('nav-open');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  qsa('a', nav).forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

function setupReveal() {
  const items = qsa('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 30, 180)}ms`;
    observer.observe(item);
  });
}

function setupControlRows() {
  qsa('.interactive-controls').forEach((group) => {
    const detail = qs('.detail-panel', group);
    if (!detail) return;

    const fields = {
      title: qs('.detail-title', detail),
      problem: qs('.detail-problem', detail),
      control: qs('.detail-control', detail),
      impact: qs('.detail-impact', detail),
      relevance: qs('.detail-relevance', detail),
    };

    qsa('.control-row', group).forEach((row) => {
      row.addEventListener('click', () => {
        qsa('.control-row', group).forEach((item) => {
          item.classList.remove('active');
          item.setAttribute('aria-pressed', 'false');
        });
        row.classList.add('active');
        row.setAttribute('aria-pressed', 'true');

        fields.title.textContent = row.dataset.title || 'Selected loop';
        fields.problem.textContent = row.dataset.problem || '';
        fields.control.textContent = row.dataset.control || '';
        fields.impact.textContent = row.dataset.impact || '';
        fields.relevance.textContent = row.dataset.relevance || '';
      });
    });
  });
}

function setupFailureLab() {
  const output = qs('#failureOutput');
  const buttons = qsa('[data-failure]');
  if (!output || !buttons.length) return;

  const label = qs('.label', output);
  const title = qs('h3', output);
  const detail = qs('p', output);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      label.textContent = `Failure ${button.dataset.failure}`;
      title.textContent = button.dataset.title || '';
      detail.textContent = button.dataset.detail || '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupReveal();
  setupControlRows();
  setupFailureLab();
});
