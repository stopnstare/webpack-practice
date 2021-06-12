const path = require('path'); //處理檔案路徑
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/[name].css'); //這個css的名稱也是吃entry的key!

//console.log("=>", path.resolve(__dirname, 'dist'));
//裡面就是js物件的寫法的設定
//裡面也可以設定要切換開發還是上線的版本

//console.log("=>", process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.js',
        about: './about.js',
    }, //設定進入點是哪支js檔案
    //entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'), //這裡可以改變資料夾的名稱
        filename: '[name].js'
    },
    //css-loader基本設定
    module: {
        rules: [{
            test: /\.css$/i,
            use: extractCSS.extract(["css-loader"]),
        }, ],
    },
    plugins: [
        extractCSS
    ]
};