import { deleteSchedule } from "../api/schedules.js";
import { getState, setState } from "../state/store.js";
import { initSchedulesForDate } from "./initSchedulesForDate.js";

export async function deleteScheduleById(scheduleId) {
  const state = getState();
  const id = String(scheduleId ?? "");

  if (!id) return;
  if (state.ui?.deletingSchedule) return;

  const schedule = (state.schedulesOfDay ?? []).find(
    (s) => String(s.id) === id
  );

  const dateFromSchedule = schedule?.startAt?.split("T")[0] ?? "";
  const date = dateFromSchedule || state.bookingDraft?.date || "";

  setState({
    ui: { deletingSchedule: true, errorDeleteSchedule: null },
  });

  try {
    await deleteSchedule(id);
    if (date) await initSchedulesForDate(date);
  } catch (err) {
    setState({
      ui: { errorDeleteSchedule: err?.message ?? "Failed to delete schedule" },
    });
    throw err;
  } finally {
    setState({ ui: { deletingSchedule: false } });
  }
}
