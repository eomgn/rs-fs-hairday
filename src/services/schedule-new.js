import { apiConfig } from "./api-config";

export async function scheduleNew({ id, name, when }) {
  try {
    // faz a requisicao para enviar os dados do agendamento
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        when,
      }),
    });

    // exibe uma mensagem de agendamento realizado
    alert("Agendamento realizado com sucesso!");
  } catch (error) {
    console.log(error);
    alert("Não foi possivel realizar o agendamento.");
  }
}
