import { getState, setState } from "./store.js";

export function updateBookingDraft(patch) {
  const state = getState();

  const nextDraft = {
    ...state.bookingDraft,
    ...patch,
  };

  setState({ bookingDraft: nextDraft });
}
