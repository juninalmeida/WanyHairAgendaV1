import {
  groupSchedulesByPeriod,
  formatTimeHHmm,
} from "../../utils/schedulePeriods.js";

const CANCEL_ICON_SRC = "./src/assets/icons/cancel.svg";

function createStatusLi(label) {
  const li = document.createElement("li");

  const strong = document.createElement("strong");
  strong.textContent = "--:--";

  const span = document.createElement("span");
  span.textContent = label;

  const spacer = document.createElement("span");
  spacer.setAttribute("aria-hidden", "true");

  li.append(strong, span, spacer);
  return li;
}

function createScheduleLi(schedule) {
  const li = document.createElement("li");
  li.dataset.scheduleId = String(schedule.id);

  const strong = document.createElement("strong");
  strong.textContent = formatTimeHHmm(schedule.startAt);

  const span = document.createElement("span");
  span.textContent = schedule.clientName;

  const img = document.createElement("img");
  img.className = "cancel-icon";
  img.src = CANCEL_ICON_SRC;
  img.alt = "Cancelar";
  img.dataset.action = "delete";
  img.dataset.id = String(schedule.id);

  li.append(strong, span, img);
  return li;
}

function renderPeriod(ulEl, schedules, { loading, error } = {}) {
  if (!ulEl) return;

  const replace = (...nodes) => ulEl.replaceChildren(...nodes);

  if (loading) return replace(createStatusLi("Carregando..."));
  if (error) return replace(createStatusLi("Erro ao carregar"));

  if (!schedules.length) return replace();

  const frag = document.createDocumentFragment();
  for (const s of schedules) frag.appendChild(createScheduleLi(s));

  replace(frag);
}

export function renderAgendaOfDay(dom, state) {
  const schedules = state.schedulesOfDay ?? [];
  const { loadingSchedules, errorSchedules, deletingSchedule } = state.ui ?? {};
  const isLoading = Boolean(loadingSchedules) || Boolean(deletingSchedule);

  const grouped = groupSchedulesByPeriod(schedules);

  renderPeriod(dom.periodMorning, grouped.morning, {
    loading: loadingSchedules,
    loading: isLoading,
    error: errorSchedules,
  });

  renderPeriod(dom.periodAfternoon, grouped.afternoon, {
    loading: loadingSchedules,
    loading: isLoading,
    error: errorSchedules,
  });

  renderPeriod(dom.periodNight, grouped.night, {
    loading: loadingSchedules,
    loading: isLoading,
    error: errorSchedules,
  });

  if (dom.agendaCount) {
    const total = schedules.length;
    dom.agendaCount.textContent = total > 0 ? `+${total}` : "";
  }
}
