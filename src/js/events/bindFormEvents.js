import { dom } from "../ui/dom.js";
import { getState, setState } from "../state/store.js";
import { initSchedulesForDate } from "../app/initSchedulesForDate.js";

export function bindFormEvents() {
  dom.form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  dom.dateInput.addEventListener("change", () => {
    const date = dom.dateInput.value;

    const state = getState();

    setState({
      bookingDraft: { ...state.bookingDraft, date },
    });

    initSchedulesForDate(date);
  });
}
