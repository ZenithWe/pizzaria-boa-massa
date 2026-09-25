(() => {
  const key = 'boa-massa-nl-appearance';
  const defaults = { fontScale: 1, darkMode: false };
  const normalize = value => ({
    fontScale: [1, 1.1, 1.2, 1.3].includes(value?.fontScale) ? value.fontScale : 1,
    darkMode: value?.darkMode === true
  });
  let current = { ...defaults };
  try { current = normalize(JSON.parse(localStorage.getItem(key))); } catch {}
  const apply = () => {
    document.documentElement.style.fontSize = `${current.fontScale * 100}%`;
    document.documentElement.classList.toggle('dark', current.darkMode);
    document.documentElement.dataset.fontScale = String(current.fontScale);
    document.querySelector('meta[name="theme-color"]').content = current.darkMode ? '#210c0c' : '#96171a';
  };
  apply();
  window.boaMassaAppearance = {
    get: () => ({ ...current }),
    update: value => {
      current = normalize({ ...current, ...value });
      apply();
      try { localStorage.setItem(key, JSON.stringify(current)); } catch {}
      return { ...current };
    },
    reset: () => {
      current = { ...defaults };
      apply();
      try { localStorage.removeItem(key); } catch {}
      return { ...current };
    }
  };
})();
