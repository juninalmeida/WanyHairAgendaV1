import { listSchedulesByDate } from "../api/schedules.js";
import { getState, setState } from "../state/store.js";
import { validateBookingDraft } from "../state/validateBookingDraft.js";

export async function initSchedulesForDate(date) {
  if (!date) {
    const state = getState();
    const nextStatus = validateBookingDraft({
      draft: state.bookingDraft,
      services: state.services,
      schedulesOfDay: [],
    });

    setState({ schedulesOfDay: [], draftStatus: nextStatus });
    return;
  }

  setState({
    ui: { loadingSchedules: true, errorSchedules: null },
  });

  try {
    const schedules = await listSchedulesByDate(date);
    const state = getState();

    const nextStatus = validateBookingDraft({
      draft: state.bookingDraft,
      services: state.services,
      schedulesOfDay: schedules,
    });

    setState({
      schedulesOfDay: schedules,
      draftStatus: nextStatus,
      ui: { loadingSchedules: false },
    });
  } catch (err) {
    setState({
      schedulesOfDay: [],
      draftStatus: { isValid: false, reason: "schedules_load_error" },
      ui: {
        loadingSchedules: false,
        errorSchedules: err?.message ?? "Failed to load schedules",
      },
    });
  }
}
