import { dom } from "./dom.js";
import { renderServiceSelect } from "./renderServiceSelect.js";

export function render(state) {
  renderServiceSelect(dom.serviceSelect, state.services);

  dom.serviceSelect.disabled = Boolean(state.ui.loadingServices);

  const busy =
    Boolean(state.ui.loadingServices) || Boolean(state.ui.loadingSchedules);

  const canSubmit = !busy && Boolean(state.draftStatus?.isValid);

  dom.submitBtn.disabled = !canSubmit;
}
