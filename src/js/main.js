"use strict";

//Config DayJS
import "../libs/dayjs.js";

//CSS IMPORTS.
import "../styles/global.css";
import "../styles/ui.css";
import "../styles/effects.css";
import "../styles/layout.css";
import "../styles/form.css";
import "../styles/schedule.css";
import "../styles/loader.css";

// JS modules.
import "./loader.js";
import "./background.js";
import "./icons.js";

//"Bootstrap"
import { getState, subscribe } from "./state/store.js";
import { render } from "./ui/render.js";
import { initAgendaStatus } from "./ui/agendaStatus.js";
import { initServices } from "./app/initServices.js";
import { bindFormEvents } from "./events/bindFormEvents.js";
import { bindAgendaEvents } from "./events/bindAgendaEvents.js";

subscribe(render);
render(getState());
initServices();
initAgendaStatus();
bindFormEvents();
bindAgendaEvents();
