import { dom } from "./dom.js";

const OPEN_AT_MIN = 8 * 60;
const CLOSE_AT_MIN = 21 * 60;

let intervalId = null;

function isAgendaOpen(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= OPEN_AT_MIN && minutes < CLOSE_AT_MIN;
}

function updateStatus() {
  if (!dom.statusBadge || !dom.statusText) return;

  const open = isAgendaOpen();
  dom.statusBadge.dataset.status = open ? "open" : "closed";
  dom.statusText.textContent = open ? "Agenda Aberta" : "Agenda Fechada";
  dom.statusBadge.setAttribute(
    "aria-label",
    open ? "Status da agenda: aberta" : "Status da agenda: fechada"
  );
}

export function initAgendaStatus() {
  updateStatus();

  if (intervalId) return;
  intervalId = setInterval(updateStatus, 60 * 1000);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateStatus();
  });
}
