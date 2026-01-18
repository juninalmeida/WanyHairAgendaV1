import {
  groupSchedulesByPeriod,
  formatTimeHHmm,
  formatDateDDMMYYYY,
} from "../../utils/schedulePeriods.js";

const CANCEL_ICON_SRC = "./src/assets/icons/cancel.svg";

function createStatusLi(label) {
  const li = document.createElement("li");

  const strong = document.createElement("strong");
  strong.textContent = "--:--";

  const span = document.createElement("span");
  span.className = "schedule-client";
  span.textContent = label;

  const service = document.createElement("span");
  service.className = "schedule-service";
  service.setAttribute("aria-hidden", "true");

  const date = document.createElement("span");
  date.className = "schedule-date";
  date.setAttribute("aria-hidden", "true");

  li.append(strong, span, service, date);
  return li;
}

function createScheduleLi(schedule, serviceName, dateLabel) {
  const li = document.createElement("li");
  li.dataset.scheduleId = String(schedule.id);

  const strong = document.createElement("strong");
  strong.textContent = formatTimeHHmm(schedule.startAt);

  const client = document.createElement("span");
  client.className = "schedule-client";
  client.textContent = schedule.clientName;

  const service = document.createElement("span");
  service.className = "schedule-service";
  service.textContent = serviceName;

  const date = document.createElement("span");
  date.className = "schedule-date";
  date.textContent = dateLabel;

  const img = document.createElement("img");
  img.className = "cancel-icon";
  img.src = CANCEL_ICON_SRC;
  img.alt = "Cancelar";
  img.dataset.action = "delete";
  img.dataset.id = String(schedule.id);

  li.append(strong, client, service, date, img);
  return li;
}

function renderPeriod(
  ulEl,
  schedules,
  servicesById,
  { loading, error } = {}
) {
  if (!ulEl) return;

  const replace = (...nodes) => ulEl.replaceChildren(...nodes);

  if (loading) return replace(createStatusLi("Carregando..."));
  if (error) return replace(createStatusLi("Erro ao carregar"));

  if (!schedules.length) return replace();

  const frag = document.createDocumentFragment();
  for (const s of schedules) {
    const serviceName =
      servicesById.get(String(s.serviceId)) ?? "Sem serviço";
    const dateLabel = formatDateDDMMYYYY(s.startAt);
    frag.appendChild(createScheduleLi(s, serviceName, dateLabel));
  }

  replace(frag);
}

export function renderAgendaOfDay(dom, state) {
  const schedules = state.schedulesOfDay ?? [];
  const { loadingSchedules, errorSchedules, deletingSchedule } = state.ui ?? {};
  const isLoading = Boolean(loadingSchedules) || Boolean(deletingSchedule);

  const servicesById = new Map(
    (state.services ?? []).map((s) => [String(s.id), s.name])
  );

  const grouped = groupSchedulesByPeriod(schedules);

  renderPeriod(dom.periodMorning, grouped.morning, servicesById, {
    loading: isLoading,
    error: errorSchedules,
  });

  renderPeriod(dom.periodAfternoon, grouped.afternoon, servicesById, {
    loading: isLoading,
    error: errorSchedules,
  });

  renderPeriod(dom.periodNight, grouped.night, servicesById, {
    loading: isLoading,
    error: errorSchedules,
  });

  if (dom.agendaCount) {
    const total = schedules.length;
    dom.agendaCount.textContent = total > 0 ? `+${total}` : "";
  }
}
