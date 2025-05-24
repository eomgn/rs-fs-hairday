import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

// selecioa o input de data
const selectedDate = document.querySelector("#date");

export async function schedulesDay() {
  // obtem a data do input
  const date = selectedDate.value;

  // buscar na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ date });

  // exibe os agendamentos
  schedulesShow({ dailySchedules });

  // renderiza as horas disponíveis
  hoursLoad({ date, dailySchedules });
}

//  buscar na API os agendamento para carregado na tela do lado direito
//  os horários disponiveis (horário futuro + horário não agendado) no lado esquerdo (form)
