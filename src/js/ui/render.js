import { dom } from "./dom.js";
import { renderServiceSelect } from "./renderServiceSelect.js";
import { renderAgendaOfDay } from "./renderAgendaOfDay.js";

export function render(state) {
  const isLoadingServices = Boolean(state.ui.loadingServices);
  const isLoadingSchedules = Boolean(state.ui.loadingSchedules);
  const isSavingSchedule = Boolean(state.ui.savingSchedule);
  const isDeletingSchedule = Boolean(state.ui.deletingSchedule);

  renderServiceSelect(
    dom.serviceSelect,
    state.services,
    state.bookingDraft?.serviceId,
  );

  if (dom.dateInput) dom.dateInput.value = state.bookingDraft?.date ?? "";
  if (dom.timeInput) dom.timeInput.value = state.bookingDraft?.time ?? "";
  if (dom.clientInput)
    dom.clientInput.value = state.bookingDraft?.clientName ?? "";

  dom.serviceSelect.disabled = isLoadingServices;
  if (dom.serviceSelect) {
    dom.serviceSelect.setAttribute("aria-busy", String(isLoadingServices));
  }

  const busy =
    isLoadingServices ||
    isLoadingSchedules ||
    isSavingSchedule ||
    isDeletingSchedule;

  const canSubmit = !busy && Boolean(state.draftStatus?.isValid);
  dom.submitBtn.disabled = !canSubmit;

  if (dom.submitBtn) {
    dom.submitBtn.setAttribute("aria-busy", String(isSavingSchedule));
  }
  if (dom.submitBtn && dom.submitBtn.querySelector(".button-label")) {
    dom.submitBtn.querySelector(".button-label").textContent = isSavingSchedule
      ? "Salvando..."
      : "Confirmar agendamento";
  }

  if (dom.formStatus) {
    const statusMessage = isSavingSchedule
      ? "Salvando agendamento..."
      : getDraftMessage(state.draftStatus);
    dom.formStatus.textContent = statusMessage;
    dom.formStatus.hidden = !statusMessage;
  }

  if (dom.formError) {
    const errorMessage = state.ui.errorSaveSchedule ?? "";
    dom.formError.textContent = errorMessage;
    dom.formError.hidden = !errorMessage;
  }

  if (dom.scheduleError) {
    const errorMessage =
      state.ui.errorSchedules ?? state.ui.errorDeleteSchedule ?? "";
    dom.scheduleError.textContent = errorMessage;
    dom.scheduleError.hidden = !errorMessage;
  }

  if (dom.scheduleStatus) {
    const statusMessage = isLoadingSchedules
      ? "Carregando agenda..."
      : isDeletingSchedule
        ? "Excluindo agendamento..."
        : "";
    dom.scheduleStatus.textContent = statusMessage;
    dom.scheduleStatus.hidden = !statusMessage;
  }

  renderAgendaOfDay(dom, state);
}

function getDraftMessage(draftStatus) {
  if (!draftStatus || draftStatus.isValid) return "";

  switch (draftStatus.reason) {
    case "missing_fields":
      return "Preencha todos os campos obrigatórios.";
    case "before_open_time":
      return "Horário indisponível antes das 08:00.";
    case "service_not_found":
      return "Serviço não encontrado.";
    case "invalid_duration":
      return "Duração do serviço inválida.";
    case "conflict":
      return "Já existe um agendamento nesse horário.";
    case "schedules_load_error":
      return "Não foi possível validar horários agora.";
    default:
      return "";
  }
}
