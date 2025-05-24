import { schedulesDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".period");

// gerar evento de click para cada lista (manha, tarde e noite)
periods.forEach((period) => {
  //capturar o evento de click na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      //obtem a li pai do elemento clicado
      const item = event.target.closest("li");

      // obtem o id do agendamento para remover
      const { id } = item.dataset;

      // confirma que o id foi selecionado
      if (id) {
        // confirma o desejo de remover
        const isConfirm = confirm(
          "Tem erteza que deseja cancelar o agendamento?"
        );

        if (isConfirm) {
          // faz a requisicao na API para cancelar
          await scheduleCancel({ id });
          // recarrega os agendamentos
          schedulesDay();
        }
      }
    }
  });
});
