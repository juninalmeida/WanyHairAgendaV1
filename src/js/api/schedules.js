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

  const schedules = await listSchedules();

  return schedules.filter((schedule) => {
    const startAt = String(schedule.startAt ?? "");
    const startDate = startAt.split("T")[0];
    return startDate === date;
  });
}
