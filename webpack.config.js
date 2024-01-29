const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    filename: 'main.[hash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      // {
      //   // Было. По учебнику.
      //   // правило для обработки файлов
      //   // регулярное выражение, которое ищет все файлы с такими расширениями
      //   test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      //   type: 'asset/resource',
      // },
      {
        // Сделал по Вебинару "Работа с Webpack - Виктор Малий"
        // правило для обработки картинок
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
      {
        // правило для обработки шрифтов
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader'
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
	  new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ]
};
