import { dom } from "../ui/dom.js";
import { getState } from "../state/store.js";
import { deleteScheduleById } from "../app/deleteScheduleById.js";

export function bindAgendaEvents() {
  if (!dom.scheduleRoot) return;

  dom.scheduleRoot.addEventListener("click", async (event) => {
    const btn = event.target.closest('[data-action="delete"][data-id]');
    if (!btn) return;

    const scheduleId = btn.dataset.id;

    const state = getState();
    if (state.ui?.loadingSchedules || state.ui?.deletingSchedule) return;
    const exists = (state.schedulesOfDay ?? []).some(
      (s) => String(s.id) === String(scheduleId)
    );

    if (!exists) {
      console.warn(
        "[agenda] delete click ignored (id not in state):",
        scheduleId
      );
      return;
    }

    try {
      await deleteScheduleById(scheduleId);
    } catch (err) {}
  });
}
