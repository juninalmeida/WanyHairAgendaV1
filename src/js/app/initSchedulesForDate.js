import { listSchedulesByDate } from "../api/schedules.js";
import { setState } from "../state/store.js";

export async function initSchedulesForDate(date) {
  if (!date) {
    setState({ schedulesOfDay: [] });
    return;
  }

  setState({
    ui: { loadingSchedules: true, errorSchedules: null },
  });

  try {
    const schedules = await listSchedulesByDate(date);

    setState({
      schedulesOfDay: schedules,
      ui: { loadingSchedules: false },
    });
  } catch (err) {
    setState({
      schedulesOfDay: [],
      ui: {
        loadingSchedules: false,
        errorSchedules: err?.message ?? "Failed to load schedules",
      },
    });
  }
}
