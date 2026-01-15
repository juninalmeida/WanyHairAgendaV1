import { requestJson } from "./http.js";

export function listServices() {
  return requestJson("/services");
}
