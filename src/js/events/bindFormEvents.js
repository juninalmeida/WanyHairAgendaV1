import { dom } from "../ui/dom.js";
import { initSchedulesForDate } from "../app/initSchedulesForDate.js";
import { updateBookingDraft } from "../state/bookingDraft.js";
import { submitSchedule } from "../app/submitSchedule.js";

export function bindFormEvents() {
  dom.form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await submitSchedule();
    } catch (err) {
      console.error(err);
    }
  });

  dom.dateInput.addEventListener("change", () => {
    const date = dom.dateInput.value;

    updateBookingDraft({ date });
    if (date) initSchedulesForDate(date);
  });

  dom.timeInput.addEventListener("change", () => {
    const time = dom.timeInput.value;
    updateBookingDraft({ time });
  });

  dom.serviceSelect.addEventListener("change", () => {
    const serviceId = dom.serviceSelect.value;
    updateBookingDraft({ serviceId });
  });

  dom.clientInput.addEventListener("input", () => {
    const clientName = dom.clientInput.value;
    updateBookingDraft({ clientName });
  });
}
