const path = require("path");
const autoPrefixer  =require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE =path.resolve(__dirname, "assets", "js" ,"main.js");
const OUTPUT_DIR =path.join(__dirname, "static");

// sass-loader  : sass 를 css로 옮겨준다 .
// postcss-loader : 특정 plugin 들을 css 에 대해 실행시켜준다 
// css-loader : css 를 가져와줌
// Mini-css-extract-plugin : 가져온 부분만 추출해준다 .
const config = { 
    entry: ["@babel/polyfill",ENTRY_FILE],
    mode: MODE,
    module: {
        rules : [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            browsers: "cover 99.5%"
                                        },
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename :"[name].js"
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
]
};

module.exports = config;
