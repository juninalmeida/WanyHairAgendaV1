const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "js", "main.js"),

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve("src", "assets", "icons", "scissors.svg"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
