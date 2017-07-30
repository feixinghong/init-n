process模块：
process.argv返回	命令行脚本的各个参数组成的数组
  node argv.js a b c
返回：
process.cwd()：返回运行当前脚本的工作目录的路径
setTimeout(fn,0) 下次事件循环首先执行的函数
解决a=[],b=[4,3]
a想合并b，则 a.push.apply(a,b) //=> [4,3]
process.stdout.write('hello') 向屏幕上输出
process.stdout.write('\u0007'); 输出文字；
cmd规范：典型的比如seajs，推崇依赖就近，延迟执行，amd比如requirejs，推崇依赖提前执行，依赖前置	，依赖模块先执行，都是依赖并行加载的，seajs只会在真正需要该模块时才解析执行该模块，而requirejs是先把依赖全部加载完后才执行，seajs中的require是同步的，执行模块的顺序严格按照模块在代码中出现的顺序来执行
// CMD
define(function(require, exports, module) {
var a = require('./a')
a.doSomething()
// 此处略去 100 行
var b = require('./b') // 依赖可以就近书写
b.doSomething()
// ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
a.doSomething()
// 此处略去 100 行
b.doSomething()
...
})
seajs是在真正需要使用该模块时才执行该模块，只有代码中出现require时擦真正去加载病执行
es6模块：设计思想，尽量的静态化，使得编译时就能确定模块的依赖关系，输入输出
实现：babel
前段模块加载：
分块传输，按需进行懒加载，在实际用到某些模块的时候再增量更新，才是较为合理的模块
加载方案
webpack会分析入口文件，解析包含依赖关系的各个文件，这些模块被打包到entry。js，在页面启动时，先执行entryjs中的代码，其他模块会在require时再执行
webpack 本身只能处理js模块，如果要处理其他文件	，就需要使用loader进行转换，loader可以理解为本身是一个函数，就受原文件作为参数，返回转换的结果，这样就可以require来加载各种类型的文件，比如less图片等等

插件：
可以完成很多loader不能完成的 功能，一般在plugins中指定，webpack本身安装了一些常用插件，还可以通过npm安装其他插件


注意loader的写法是单个对象
要监控文件，当更改时就马上执行打包 ，则-w 
要调试
当项目变大时，webpack的编译时间会变得很长，webpack --progress --colors
如果不想每次修改模块后都重新编译整个文件，可启用监听模式，开启后，没有改变的模块会在编译后输出到内存中，而不会每次都被重新编译，所以，这样的速度回很快
webpack --progress --colors --watch
webpack配置出现很复杂，怎么打印错误：
--display-error-details	、
webpack错误

产生原因：在loader里面设置loader'时为jade-loader(没有安装它，只安装了jade) 然后webpack使用它来打包后，返回的不是一个函数，是html片段，故会有此错误，解决方案：loader里面一定不要生了loader，并且按照jade时是按照对于的loader。
注意jade-loader返回的是一个函数，必须a()运行它才能获取真正的字段
多个入口文件
{
    entry: {
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "dist/js/page",
        filename: "[name].bundle.js"
    }
} 最终会生成page1.bundle.js,即入口文件的键名规定生成的文件是什么名字
注意所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。	
url-loader会将样式中使用到的图片
报错：


是因为background中url的路径是相对于当前css文件的，故会找不到，然后报错。
并且url-loader奥运行的话必须先按照file-loader,否则会进行提示：


webpack -d 压缩混淆代码

debug:true map 为--debug
使用不同的config  --config example.config.js	
--progress 显示进度
--no-color  显示编译静态结果时没有颜色
--display-modules 显示隐藏的模块，因为模块在以下目录里面执行时[node-modeule,bower_component,jam,compoents]默认是隐藏的

取消隐藏后的结果
node就是中configjs的配置：
context:__dirname+'/app' 即根目录，是解析entry的绝对路径，默认是process.cwd()
entry:如果传入一个字符串，在应用一启动时该字符会被马上解析为一个模块病加载，如果传递一个数组，一启动就会加载所有的模块，最后一个会被输出，
--------------------------------------------------------------------------------

如果传入一个对象，多入口会被创建，key是分支的名称，值可以是一个数组或者字符串
output.filename 每一个编译后的文件的名字，你不能再这里使用绝对路径，output.path才决定文件被写的位置，filename只是被用于命名
__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './built'
  }
}
如果有不同输出，那么就要有不同的名字了，name将会被chunk的名字替代；hash将会被该编译的hash替代
npm install extract-text-webpack-plugin --save 单独打包css文件
plugins选项：
plugins:
        [
            // new CommonsChunkPlugin({
            //     name:['jquery'],//提取公共模块
            //     minChunks:Infinity//提取所有entry的公共模块
            // }),
            new htmlWebpackPlugin({
                title:'my first',//创建的html文档名
                filename:'admin.html',//文件名
                template:'src/a.html',//使用它作为模板来创建
                inject:'head',//编译后的js模块注入到head里面
                cache:true,
                head:{
                    'entry':'main.bundle.js',
                    'css':'main.css'
                }
            })
        ]

extract-text-webpack-plugin的工作方式：
  ● 先require var ExtractTextPlugin = require("extract-text-webpack-plugin");
  ● 再在loader中 ，假如是css后缀的话，那么就执行css-loader ，然后传递给style-loader ，然后再输出，但是输出到那里呢？
  ● {
                    test:/\.css/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                },
  ● plugins里面定义输出的名字：new ExtractTextPlugin('[name].css'), 即每一个打包入口的名字填入里面，结果就是：假如entry:{main:'./main.js'} 在main里面引入了style文件，那么先进行打包，然后使用该插件输出到main.css。具体路径看output。也就是说output里面的文件名不需要看。
HtmlWebpackPlugin
minify: {option} ||false 传递optino去压缩这个输出
hash 传入true将会给每一个行内的cs和script后面添加一个webpack  hash值，可以用来解决缓存问题，
cache： true(default) 只在文件有改变的时候才去编译它
chunks：允许只添加一些chunks 比如：chunks: ['common', 'List']
excludeChunks:允许你跳过一些chunk
filename:当前文件写到哪里去
运行webpack 非全局安装 需要 非全局安装需使用node_modules/.bin/webpack)命令 会自动加载config里面的config进行加载
webpack  配置json文件 可以使用npm  start来启动webpack
"scripts": {
    "start": "webpack" //配置的地方就是这里啦，相当于把npm的start命令指向webpack命令
  },
//不是start时 需要还有npm run name

loaders
使用不同的loader 需要单独安装并且在config下面modules关键字下进行配置 loaders配置需要下面几个方面：
  ● test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
  ● loader：loader的名称（必须）
  ● include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
  ● query：为loaders提供额外的设置选项（可选）
对于模块 webpack能够提供强大的处理能力，  一切皆模块  
css-loader和style-loader 提供处理样式表的功能；
css-loader可以使用类似@import url(...)方式实现require的功能
后者将所有计算后的样式假如页面中  二者结合可以把css样式嵌入 webpack打包后的js中
babel具有非常多的配置http://web.jobbole.com/87408/
可以把babel的配置放在.babelrc里面  webpack会自动调用该文件里面的内容

css modules 所有的类名 动画名都是基于当前模块

插件：ExtractTextPlugin
安装 npm install extract-text-webpack-plugin --save-dev
从bundle中提取特定的text到一个文件中，它可以把css从js中分离出来
可以分离出css文件  因为html可以服务器端渲染，css可以在页面里面再渲染
将图片转换为base64 image-webpack-loader --save-dev
webpack打包  全部require进一个文件里面去了； 可以理解为没有经过webpack处理 直接执行。
npm install extract-text-webpack-plugin css-loader style-loader
## webpack plugin
html-webpack-plugin 该插件可以生成html文件