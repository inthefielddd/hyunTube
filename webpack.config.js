const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    devtool: "cheap-module-source-map",
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                //js파일을 만났을때
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                //scss 파일을 만났을 때
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        //webpack이 css를 이해 할 수 있게한다
                        loader: "css-loader",
                    },
                    {
                        //css 호환성 변환
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins() {
                                    return [autoprefixer({ browsers: "cover 99.5%" })];
                                },
                            },
                        },
                    },
                    {
                        //scss에서 css 변환
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
    ],
};

module.exports = config;
