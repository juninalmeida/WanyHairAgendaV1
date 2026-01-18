import { dom } from "../ui/dom.js";
import { getState } from "../state/store.js";

export function bindAgendaEvents() {
  if (!dom.scheduleRoot) return;

  dom.scheduleRoot.addEventListener("click", (event) => {
    const btn = event.target.closest('[data-action="delete"][data-id]');
    if (!btn) return;

    const scheduleId = btn.dataset.id;

    const state = getState();
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
  });
}
