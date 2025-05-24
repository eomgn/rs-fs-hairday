// importacoes
import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

// selecionando inputs
const form = document.querySelector("form");
const selectedDate = document.querySelector("#date");
const selectedClient = document.querySelector("#client");

//data atual
const today = dayjs(new Date()).format("YYYY-MM-DD");

// carregar a data atual e definindo a data mínima que é justamente a data atual
selectedDate.value = today;
selectedDate.min = today;

form.addEventListener("submit", async (event) => {
  // previnindo o comportamento padrão de recarregar a página
  event.preventDefault();

  try {
    // recuperando o nome do cliente
    const name = selectedClient.value.trim();

    // verifica se foi preenchido o nome
    if (!name) {
      return alert("Informe o nome do cliente.");
    }

    //recupera o horário selecionado
    const hourSelected = document.querySelector(".hour-selected");

    // verifica se foi selecionado algum horário
    if (!hourSelected) {
      return alert("Selecione um horário disponível.");
    }

    // recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":");

    // inserir a hora na data - when = 'quando'
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // gerar um ID
    const id = new Date().getTime().toString(); // precisa definir o id como string para ser possivel acessar na API

    // fazemos o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });

    // recarregar os agendamentos
    await schedulesDay();

    // limpa o input de nome do cliente
    selectedClient.value = "";
  } catch (error) {
    alert("Não foi possível realizar o agendamento.");
    console.log(error);
  }
});
