

const path = require("path")
const HtmlWebpackplugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", '.json', '.vue', ".ts", ".jsx"],
  },
  devServer: {},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackplugin({
      template: "index.html"
    })
  ]
}