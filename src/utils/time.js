import dayjs from "dayjs";

function buildStart(date, time) {
  return dayjs(`${date}T${time}`);
}

export function buildInterval({ date, time, durationMin }) {
  const start = buildStart(date, time);
  const end = start.add(durationMin, "minute");

  return {
    startMs: start.valueOf(),
    endMs: end.valueOf(),
    startAtISO: start.toISOString(),
    endAtISO: end.toISOString(),
  };
}

export function overlaps(a, b) {
  return a.startMs < b.endMs && a.endMs > b.startMs;
}

function splitStartAt(startAt) {
  return {
    date: startAt.slice(0, 10),
    time: startAt.slice(11, 16),
  };
}

function intervalFromSchedule(schedule) {
  const { date, time } = splitStartAt(schedule.startAt);

  return buildInterval({
    date,
    time,
    durationMin: schedule.durationMin,
  });
}

export function hasConflict(
  existingSchedules,
  candidateInterval,
  options = {}
) {
  const { ignoreScheduleId = null } = options;

  const filtered = ignoreScheduleId
    ? existingSchedules.filter((s) => s.id !== ignoreScheduleId)
    : existingSchedules;

  return filtered
    .map(intervalFromSchedule)
    .some((existingInterval) => overlaps(existingInterval, candidateInterval));
}

function timeToMinutes(time) {
  const [hh, mm] = time.split(":").map(Number);
  return hh * 60 + mm;
}

export function isOnOrAfterOpenTime(time, openTime = "8:00") {
  return timeToMinutes(time) >= timeToMinutes(openTime);
}
