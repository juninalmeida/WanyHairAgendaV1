"use strict";

import { getState, setState } from "../state/store.js";
import { updateBookingDraft } from "../state/bookingDraft.js";
import { createSchedule } from "../api/schedules.js";
import { initSchedulesForDate } from "./initSchedulesForDate.js";
import { buildInterval } from "../../utils/time.js";

export async function submitSchedule() {
  const state = getState();
  const { bookingDraft, services, draftStatus } = state;

  if (!draftStatus?.isValid) return;

  const service = services.find(
    (s) => String(s.id) === String(bookingDraft.serviceId)
  );
  if (!service) return;

  const durationMin = Number(service.durationMin);

  const interval = buildInterval({
    date: bookingDraft.date,
    time: bookingDraft.time,
    durationMin,
  });

  const payload = {
    startAt: interval.startAtISO,
    durationMin,
    serviceId: String(service.id),
    clientName: bookingDraft.clientName?.trim() ?? "",
  };

  setState({ ui: { savingSchedule: true, errorSaveSchedule: null } });

  try {
    await createSchedule(payload);

    await initSchedulesForDate(bookingDraft.date);

    updateBookingDraft({
      date: "",
      time: "",
      serviceId: "",
      clientName: "",
    });
  } catch (err) {
    setState({
      ui: { errorSaveSchedule: err?.message ?? "Failed to save schedule." },
    });
    throw err;
  } finally {
    setState({ ui: { savingSchedule: false } });
  }
}
