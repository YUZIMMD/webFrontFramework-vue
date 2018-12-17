const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports ={
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                // loader:'css-loader'//处理css文件
                use:[
                    'style-loader',//将css写到html中去
                    'css-loader'
                ]
            },
            {
                tets:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{//指定loader的一些操作方式
                            limit:1024,
                            name:'[name].[ext]'//最后输出文件的名字
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}