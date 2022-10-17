// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";


const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename:'main.js'
  },

  devServer: {

    host: "localhost",
    port: 3000,
    historyApiFallback: true,

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })


  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: ["/node_modules/"]

      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1
          }
        }, "postcss-loader"]
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }


    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";


  } else {
    config.mode = "development";
  }
  return config;
};
