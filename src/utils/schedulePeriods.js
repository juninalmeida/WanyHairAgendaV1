import dayjs from "../libs/dayjs.js";

const toMsSafe = (startAtISO) => {
  const d = dayjs(startAtISO);
  return d.isValid() ? d.valueOf() : Number.POSITIVE_INFINITY;
};

export const getPeriodKey = (startAtISO) => {
  const d = dayjs(startAtISO);
  if (!d.isValid()) return "morning";

  const hour = d.hour();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "night";
};

export const sortByStartAtAsc = (schedules) =>
  [...schedules].sort((a, b) => toMsSafe(a.startAt) - toMsSafe(b.startAt));

export const groupSchedulesByPeriod = (schedules) => {
  const grouped = { morning: [], afternoon: [], night: [] };

  for (const s of sortByStartAtAsc(schedules)) {
    grouped[getPeriodKey(s.startAt)].push(s);
  }

  return grouped;
};

export const formatTimeHHmm = (startAtISO) => {
  const d = dayjs(startAtISO);
  return d.isValid() ? d.format("HH:mm") : "--:--";
};

export const formatDateDDMMYYYY = (startAtISO) => {
  const d = dayjs(startAtISO);
  return d.isValid() ? d.format("DD/MM/YYYY") : "--/--/----";
};
