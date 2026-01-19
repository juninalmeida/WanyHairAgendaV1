export function renderServiceSelect(selectEl, services, selectedServiceId) {
  if (!selectEl) return;

  const fragment = document.createDocumentFragment();
  fragment.append(new Option("Selecione um serviço", ""));

  for (const service of services) {
    fragment.append(new Option(service.name, String(service.id)));
  }

  selectEl.replaceChildren(fragment);
  selectEl.value = selectedServiceId == null ? "" : String(selectedServiceId);
}
