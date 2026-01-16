let state = {
  services: [],
  schedulesOfDay: [],

  bookingDraft: {
    date: "",
    time: "",
    serviceId: "",
    clientName: "",
  },

  draftStatus: {
    isValid: false,
    reason: null,
  },

  ui: {
    loadingServices: false,
    errorServices: null,

    loadingSchedules: false,
    errorSchedules: null,

    savingSchedule: false,
    errorSaveSchedule: null,
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

    bookingDraft: { ...state.bookingDraft, ...(patch.bookingDraft ?? {}) },
    draftStatus: { ...state.draftStatus, ...(patch.draftStatus ?? {}) },
    ui: { ...state.ui, ...(patch.ui ?? {}) },
  };

  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
