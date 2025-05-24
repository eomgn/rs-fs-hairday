// importacoes
import dayjs from "dayjs";

// selecionando inputs
const form = document.querySelector("form");
const selectedDate = document.querySelector("#date");

//data atual
const today = dayjs(new Date()).format("YYYY-MM-DD");

// carregar a data atual e definindo a data mínima que é justamente a data atual
selectedDate.value = today;
selectedDate.min = today;

form.addEventListener("submit", (event) => {
  // previnindo o comportamento padrão de recarregar a página
  event.preventDefault();
});
