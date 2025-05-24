import { schedulesDay } from "../schedules/load.js";

// selecionar o input de data
const selectedDate = document.querySelector("#date");

// recarregar a lista de horários quando o input de data mudar
selectedDate.addEventListener("change", () => {
  schedulesDay();
});
