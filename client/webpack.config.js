const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("../server/build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/favicon.ico", to: "./favicon.ico" },
        { from: "./public/manifest.json", to: "./manifest.json" },
        { from: "./public/logo192.svg", to: "./logo192.svg" },
        { from: "./public/logo512.svg", to: "./logo512.svg" },
        { from: "./public/robots.txt", to: "./robots.txt" },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
