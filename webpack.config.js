const path = require('path'); //處理檔案路徑
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const extractCSS = new MiniCssExtractPlugin('css/[name].css'); //這個css的名稱也是吃entry的key!

//console.log("=>", path.resolve(__dirname, 'dist'));
//裡面就是js物件的寫法的設定
//裡面也可以設定要切換開發還是上線的版本

//console.log("=>", process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './js/index.js',
        about: './about.js',
    }, //設定進入點是哪支js檔案
    //entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'), //這裡可以改變資料夾的名稱
        filename: '[name].js'
    },
    devServer: {
        compress: true,
        port: 3000,
        stats: {
            assets: true,
            cached: false,
            chunkModules: false,
            chunkOrigins: false,
            chunks: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            version: false,
            warnings: false
        },
    },

    //css-loader基本設定
    module: {
        rules: [{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            { //讓index.html在deploy 後 可以出現在dist裡面，使用政則表達是設定可被搬移的副檔名
                test: /\.(html|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]' //分別是[路徑][檔名].[副檔名]
                    }
                }, ],
            },
            {

                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                //載入babel-loader
                test: /\.(js)$/,
                use: 'babel-loader'
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};