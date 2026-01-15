export function renderServiceSelect(selectEl, services) {
  const baseOption = `<option value="">Selecione um serviço</option>`;

  const options = services
    .map((s) => `<option value="${s.id}">${s.name}</option>`)
    .join("");

  selectEl.innerHTML = baseOption + options;
}
