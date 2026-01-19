export const dom = {
  form: document.querySelector(".form"),

  dateInput: document.querySelector("#date"),
  timeInput: document.querySelector("#time"),
  serviceSelect: document.querySelector("#service"),
  clientInput: document.querySelector("#client"),

  submitBtn: document.querySelector('.form button[type="submit"]'),
  formError: document.querySelector(".form-error"),
  formStatus: document.querySelector(".form-status"),
  periodMorning: document.querySelector("#period-morning"),
  periodAfternoon: document.querySelector("#period-afternoon"),
  periodNight: document.querySelector("#period-night"),

  agendaCount: document.querySelector(".avatar-more-text"),

  scheduleRoot: document.querySelector(".schedule"),
  scheduleStatus: document.querySelector(".schedule-status"),
  scheduleError: document.querySelector(".schedule-error"),

  statusBadge: document.querySelector(".status-badge"),
  statusText: document.querySelector(".status-text"),
};
