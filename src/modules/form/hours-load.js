import dayjs from "dayjs";

import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.querySelector("#hours");

export function hoursLoad({ date, dailySchedules }) {
  // limpa a lista de horários
  hours.innerHTML = "";

  // obtem a lista de todos os horarios ja agendados
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  const opening = openingHours.map((hour) => {
    // recupera somenta o número da hora do arquivo opening-rous.js com o split e desestrutura
    const [scheduleHour] = hour.split(":");

    // adiciona a hora na data e verifica se está no passado // ou seja, esta verificando as horas que se tem no arquivo opening-rous.js e se na HORA ATUAL há disponibilidade baseado no arquivo opening-rous.js
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());
    const available = !unavailableHours.includes(hour) && !isHourPast;

    return {
      hour, // a hora propriamente capturada do arquivo opening-rous.js
      available, // se estiver 'true' indica disponibilidade, se 'false' indica indisponibilidade
    };
  });

  //   renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");
    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    li.textContent = hour;

    // verificando se é manhã, tarde ou noite nas horas
    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  // adiciona o evento de click nos horários disponiveis
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
