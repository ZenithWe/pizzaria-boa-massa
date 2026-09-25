(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) setMenu(false);
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
  const appearance = window.boaMassaAppearance;
  const darkMode = document.getElementById('dark-mode');
  const scales = Array.from(document.querySelectorAll('[data-font-scale]')).filter(node => node.tagName === 'BUTTON');
  const status = document.getElementById('preferences-status');
  const syncAppearance = (message = '') => {
    const state = appearance.get();
    darkMode.checked = state.darkMode;
    scales.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.fontScale) === state.fontScale)));
    status.textContent = message;
  };
  darkMode.addEventListener('change', () => {
    appearance.update({ darkMode: darkMode.checked });
    syncAppearance(darkMode.checked ? 'Modo escuro ativado.' : 'Modo claro ativado.');
  });
  scales.forEach(button => button.addEventListener('click', () => {
    appearance.update({ fontScale: Number(button.dataset.fontScale) });
    syncAppearance(`Tamanho do texto ajustado para ${button.textContent}.`);
  }));
  document.querySelector('.reset-preferences').addEventListener('click', () => {
    appearance.reset();
    syncAppearance('Aparência padrão restaurada.');
  });
  document.querySelector('.appearance-trigger').addEventListener('click', () => setMenu(false));
  document.querySelectorAll('svg.icon').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
  syncAppearance();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
