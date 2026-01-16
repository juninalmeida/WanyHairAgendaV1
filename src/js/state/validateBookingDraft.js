import {
  buildInterval,
  hasConflict,
  isOnOrAfterOpenTime,
} from "../../utils/time.js";

export function validateBookingDraft({ draft, services, schedulesOfDay }) {
  if (!draft.date || !draft.time || !draft.serviceId || !draft.clientName) {
    return { isValid: false, reason: "missing_fields" };
  }

  if (!isOnOrAfterOpenTime(draft.time, "08:00")) {
    return { isValid: false, reason: "before_open_time" };
  }

  const service = services.find(
    (s) => String(s.id) === String(draft.serviceId)
  );
  if (!service) {
    return { isValid: false, reason: "service_not_found" };
  }

  const durationMin = Number(service.durationMin);
  if (!Number.isFinite(durationMin) || durationMin <= 0) {
    return { isValid: false, reason: "invalid_duration" };
  }

  const candidateInterval = buildInterval({
    date: draft.date,
    time: draft.time,
    durationMin,
  });

  const conflict = hasConflict(schedulesOfDay, candidateInterval);
  if (conflict) {
    return { isValid: false, reason: "conflict" };
  }

  return { isValid: true, reason: null };
}
