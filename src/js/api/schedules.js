import { requestJson } from "./http.js";

export function listSchedules() {
  return requestJson("/schedules");
}

export function createSchedule(payload) {
  return requestJson("/schedules", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteSchedule(id) {
  return requestJson(`/schedules/${id}`, {
    method: "DELETE",
  });
}

export function listSchedulesByDate(date) {
  return requestJson(`/schedules?startAt_like=${encodeURIComponent(date)}`);
}
