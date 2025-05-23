// deve-se usar essa estrategia de importar (require) isso porque esta utilizando o próprio node, ou seja quando se esta rodando o javascript fora do navegador é utilizado o ambiente node
const path = require("path"); // o 'path' vai resolver a navegação das pastas de acordo com o sistema operacional

module.exports = {
  target: "web",
  mode: "development",

  // difinição do arquivo de entrada
  entry: path.resolve(__dirname, "src", "main.js"),
  // definição do arquivo de saida - a build propriamente dita
  output: {
    filename: "main.js", // nome do arquivo
    path: path.resolve(__dirname, "dist", "main.js"), // diretoria de saida - vai criar a pasta 'dist' com o arquivo 'main.js'
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // o '.join' é para então realizar a montagem da navegação da pasta que esta os arquivos
    },
    port: 3000,
    open: true,
    liveReload: true,
  },
};
