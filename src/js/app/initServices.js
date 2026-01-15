import { listServices } from "../api/services.js";
import { setState } from "../state/store.js";

export async function initServices() {
  setState({ ui: { loadingServices: true, errorServices: null } });

  try {
    const services = await listServices();
    setState({ services, ui: { loadingServices: false } });
  } catch (err) {
    setState({
      ui: {
        loadingServices: false,
        errorServices: err.message || "Failed to load services",
      },
    });
  }
}
