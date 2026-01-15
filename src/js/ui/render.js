import { dom } from "./dom.js";
import { renderServiceSelect } from "./renderServiceSelect.js";

export function render(state) {
  renderServiceSelect(dom.serviceSelect, state.services);

  dom.serviceSelect.disabled = state.ui.loadingServices;
}
