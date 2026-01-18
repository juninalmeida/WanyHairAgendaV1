import { dom } from "../ui/dom.js";

export function bindAgendaEvents() {
  if (!dom.scheduleRoot) return;

  dom.scheduleRoot.addEventListener("click", (event) => {
    const btn = event.target.closest('[data-action="delete"][data-id]');
    if (!btn) return;

    const scheduleId = btn.dataset.id;

    console.log("[agenda] delete click:", scheduleId);
  });
}
