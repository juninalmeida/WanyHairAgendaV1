import { requestJson } from "./http.js";
import dayjs from "../../libs/dayjs.js";

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

  const from = dayjs(date).startOf("day").toISOString();
  const to = dayjs(date).endOf("day").toISOString();

  const qs = new URLSearchParams({
    startAt_gte: from,
    startAt_lte: to,
    _sort: "startAt",
    _order: "asc",
  });

  return requestJson(`/schedules?${qs.toString()}`);
}
