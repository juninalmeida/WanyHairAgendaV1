import { getState, setState } from "./store.js";
import { validateBookingDraft } from "./validateBookingDraft.js";

export function updateBookingDraft(patch) {
  const state = getState();

  const nextDraft = {
    ...state.bookingDraft,
    ...patch,
  };

  const nextStatus = validateBookingDraft({
    draft: nextDraft,
    services: state.services,
    schedulesOfDay: state.schedulesOfDay,
  });

  setState({ bookingDraft: nextDraft, draftStatus: nextStatus });
}
