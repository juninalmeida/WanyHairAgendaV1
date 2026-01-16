export function renderServiceSelect(selectEl, services, selectedServiceId) {
  const baseOption = `<option value="">Selecione um serviço</option>`;

  const options = services
    .map((s) => `<option value="${s.id}">${s.name}</option>`)
    .join("");

  selectEl.innerHTML = baseOption + options;
  selectEl.value = selectedServiceId == null ? "" : String(selectedServiceId);
}
