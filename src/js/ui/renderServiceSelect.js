const lastRender = {
  servicesRef: null,
  selectedId: null,
};

export function renderServiceSelect(selectEl, services, selectedServiceId) {
  if (!selectEl) return;

  const normalizedSelectedId =
    selectedServiceId == null ? "" : String(selectedServiceId);

  if (lastRender.servicesRef === services) {
    if (lastRender.selectedId !== normalizedSelectedId) {
      selectEl.value = normalizedSelectedId;
      lastRender.selectedId = normalizedSelectedId;
    }
    return;
  }

  const fragment = document.createDocumentFragment();
  fragment.append(new Option("Selecione um serviço", ""));

  for (const service of services) {
    fragment.append(new Option(service.name, String(service.id)));
  }

  selectEl.replaceChildren(fragment);
  selectEl.value = normalizedSelectedId;
  lastRender.servicesRef = services;
  lastRender.selectedId = normalizedSelectedId;
}
