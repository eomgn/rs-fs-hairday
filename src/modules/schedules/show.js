import dayjs from "dayjs";

//selecionando as sessões manha, tarde e noite
const periodMorning = document.querySelector("#period-morning");
const periodAfternoon = document.querySelector("#period-afternoon");
const periodNight = document.querySelector("#period-night");

export function schedulesShow({ dailySchedules }) {
  try {
    // limpa as listas
    periodAfternoon.innerHTML = "";
    periodMorning.innerHTML = "";
    periodNight.innerHTML = "";

    // ordena os agendamentos por data/hora
    dailySchedules.sort(
      (a, b) => dayjs(a.when).valueOf() - dayjs(b.when).valueOf()
    );

    // renderizar os agendamentos por período
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong"); // hora
      const name = document.createElement("span"); // nome

      // adicionar o id do agendamento
      item.setAttribute("data-id", schedule.id);
      //  hora
      time.innerText = dayjs(schedule.when).format("HH:mm");
      // nome
      name.textContent = schedule.name;

      // criar o icone de cancelar o agendamento
      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar");

      //   adicionar o hora, nome e icone no item
      item.append(time, name, cancelIcon);

      // obter somente a hora
      const hour = dayjs(schedule.when).hour();

      //  renderizar o agendamento na sessão (manha, tarde ou noite)
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    console.log(error);
    alert("Não foi possível exibir os agendamentos.");
  }
}
