// deve-se usar essa estrategia de importar (require) isso porque esta utilizando o próprio node, ou seja quando se esta rodando o javascript fora do navegador é utilizado o ambiente node
const path = require("path"); // o 'path' vai resolver a navegação das pastas de acordo com o sistema operacional

// importando HTML Webpack plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

// importando CopyWebpackPlugin (para os assets)
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",

  // difinição do arquivo de entrada
  entry: path.resolve(__dirname, "src", "main.js"),
  // definição do arquivo de saida - a build propriamente dita
  output: {
    filename: "main.js", // nome do arquivo
    path: path.resolve(__dirname, "dist"), // diretoria de saida - vai criar a pasta 'dist' com o arquivo 'main.js'
  },

  // config do webpack-dev-server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // o '.join' é para então realizar a montagem da navegação da pasta que esta os arquivos
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  // config de plugins
  plugins: [
    // HTML
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"), // template html
      favicon: path.resolve("src", "assets", "scissors.svg"), // icone de navegacao (favicon)
    }),
    // CopyWebpackPlugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist", "src", "assets"),
        },
      ],
    }),
  ],

  module: {
    rules: [
      // config modules - CSS
      {
        test: /\.css$/, // todos os arquivos que termianrem com '.css' serao inclusos
        use: ["style-loader", "css-loader"],
      },
      // config babel
      {
        test: /\.js$/, // todos os arquivos que termianrem com '.js' serao inclusos
        exclude: /node_modules/, // não verificar pasta 'node_modules'
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
