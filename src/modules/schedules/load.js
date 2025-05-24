import { hoursLoad } from "../form/hours-load.js";

// selecioa o input de data
const selectedDate = document.querySelector("#date");

export function schedulesDay() {
  // obtem a data do input
  const date = selectedDate.value;

  // renderiza as horas disponíveis
  hoursLoad({ date });
}

//  buscar na API os agendamento para carregado na tela do lado direito
//  os horários disponiveis (horário futuro + horário não agendado) no lado esquerdo (form)
