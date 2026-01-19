import { dom } from "./dom.js";
import { renderServiceSelect } from "./renderServiceSelect.js";
import { renderAgendaOfDay } from "./renderAgendaOfDay.js";

export function render(state) {
  renderServiceSelect(
    dom.serviceSelect,
    state.services,
    state.bookingDraft?.serviceId,
  );

  if (dom.dateInput) dom.dateInput.value = state.bookingDraft?.date ?? "";
  if (dom.timeInput) dom.timeInput.value = state.bookingDraft?.time ?? "";
  if (dom.clientInput)
    dom.clientInput.value = state.bookingDraft?.clientName ?? "";

  dom.serviceSelect.disabled = Boolean(state.ui.loadingServices);

  const busy =
    Boolean(state.ui.loadingServices) ||
    Boolean(state.ui.loadingSchedules) ||
    Boolean(state.ui.savingSchedule) ||
    Boolean(state.ui.deletingSchedule);

  const canSubmit = !busy && Boolean(state.draftStatus?.isValid);
  dom.submitBtn.disabled = !canSubmit;

  if (dom.scheduleError) {
    const errorMessage = state.ui.errorSchedules ?? "";
    dom.scheduleError.textContent = errorMessage;
    dom.scheduleError.hidden = !errorMessage;
  }

  renderAgendaOfDay(dom, state);
}
