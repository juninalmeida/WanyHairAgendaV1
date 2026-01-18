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

export async function listSchedulesByDate(date) {
  if (!date) return [];

  const from = `${date}T00:00:00`;
  const to = `${date}T23:59:59`;

  const qs = new URLSearchParams({
    startAt_gte: from,
    startAt_lte: to,
    _sort: "startAt",
    _order: "asc",
  });

  return requestJson(`/schedules?${qs.toString()}`);
}
