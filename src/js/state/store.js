let state = {
  services: [],
  ui: {
    loadingServices: false,
    errorServices: null,
  },
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  state = {
    ...state,
    ...patch,
    ui: { ...state.ui, ...(patch.ui ?? {}) },
  };

  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
