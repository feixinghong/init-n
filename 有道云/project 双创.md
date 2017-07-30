
--------------------------------------------------------------------------------
1.
场景：

左边的那个相关责任人的接口，左右是不同的。要求在ajax请求到数据后使用模板渲染后填入都下方的列表，在大于2个的时候要求自己出现滚动条。则算法是，先获取window的高，然后减去header的，与问题信息的高度，然后才是下方的高度。并把它的高度设为最后得到的值

输入框的input事件
$("#sname").bind("input",function(){}
--------------------------------------------------------------------------------
页面中通过js的src
data-main的路径是相对于当前引入requirejs的html的相对路径
data-main 该属性指定的js将在 加载完成requirejs后执行，可以吧require.config的配置加入到data-main后，就可以使每一个页面都使用该配置，然后require会默认将data-main指定的js为根路径，意思是，不做配置时，直接使用require(['jquery'])后，requirejs会自动加载该main.js同级下的jquery这个文件，相当于默认配置了require.config({
baseUrl:'js'
})
config里面的baseUrl也是相对于引入requirejs的文件的相对路径

目录结构 ：js下面有app,lib，require等几个文件夹。
在html里面引入require.js  使用 js/require.js;data-main='js/require.config.js';
在config里面的话，baseurl是相对于html的，path是相对于baseurl设置后的，相当于给路径重新命名。
假如require(['app/main.js'])时，则无视config，是相对于config.js的文件路径。
非amd输出：当非标准的amd，没有define，不能直接使用require(['jquery'])，这时候就需要shim；
可以这样配置：
require.config({
shim:{
'underscore':{
exports:'_'
}
}
})
这样配置后就可以requi一下；
require(['underscore'],function(_){

})

exports 可以把一个全局变量暴露出去，当做该模块以引用。
但是必须先要在path中具体规定其路径 然后在shim中暴露其方法

如果一个文件里有两个全局变量，而我都想要，怎么引入？
使用init  不能使用export


paths 必须要加上"./" 并且引入时使用[]
定义模块：
模块中不定义名字：

是在 app下面的c.js  可以使用
require('app/c')来引入

所有在mainjs中所设置的脚本都是异步加载的，故在页面中设置了其他src脚本，则不能保证加载它所依赖的脚本加载成功
定义一个命名模块 但是这些是由优化工具生成
一个js文件中只定义一个模块。这是模块名都文件名的自然查找机制
注意 define下的路径解析也是按照config里面的，与当前文件无关。
--------------------------------------------------------------------------------
如何动态调试eval生成的代码  这样可以把该js文件挂载到no domain下面
var js = createMyJSCodeString();
addCode(js); // Right now! Debuggable!// Dynamically evaluate JavaScript-as-string in the browserfunction addCode(js){
  var e = document.createElement('script');
  e.type = 'text/javascript';
  e.src  = 'data:text/javascript;charset=utf-8,'+escape(js);
  document.body.appendChild(e);
}
或者：
var js = "console.log('this is line 1');\n" +
"//@ sourceURL=dynamicScript.js;"
addCode(js); // Right now! Debuggable!// Dynamically evaluate JavaScript-as-string in the browserfunction addCode(js){
  eval(js);
}

举例：
把
function  t(arr,k){
var result={};
  for(var i=0;i<arr.length;i++){
var  v=arr[i][k];
   result[v]=arr[i];
}

return result;
}
加入source中？
addCode(`tff`)  注意用``号才行。

rgba(253,253,253,.9)

设置一个selid 为空 不能为null 一定要data('selid','') 

 
```
 1.     cursor:url(http://api0.map.bdimg.com/images/openhand.cur) 8 8, default;
2.    function a(){
this.ctx=(function(){
var data=67;
return new function(){
this.age=90;
this.set=function(v){data=v};
this.get=function(){return data}
}
})(this)
}

```


里面的 那个new的对象只有在 newa的时候才会被执行。
所以里面的那个data不是共享的。
内存泄露几种情况：
在ie中，删除绑定了事件的会造成。
或者如下：在函数中定义事件，形成了闭包，可以把回调定义在函数外面。或者或者在定义事件处理函数的外部函数中，删除对dom的引用
function bindEvent() 
{ 
    var obj=document.createElement("XXX"); 
    obj.onclick=function(){ 
        //Even if it's a empty function    } 
}

function bindEvent() 
{ 
    var obj=document.createElement("XXX"); 
    obj.onclick=function(){ 
        //Even if it's a empty function     } 
    obj=null; 
}
--------------------------------------------------------------------------------
这样写会报错：data[id]||data[id]={};  
data[id]=data[id]||{};
这样也是：
!c[name]&&c[name]=new c.controller(name)；
if(!c[name]){c[name]=new c.controller(name);}

调试代码遇见比如slideDown,map.panTo之类的为什么不能立即生效？
因为他们都是setTimeout异步的，必须要等同步的执行完成后才行。
百度的性能优化：手机端的动画使用animation pc端使用的是top

使用div 的富文本属性时，取值不能使用html() 一旦再进行编码会出错。
比如html() 后再encodeurl （） 后
decodeURIComponent('')
encodeURIComponent($("#js-reason").html())
输入<>
返回 %26lt%3B%26gt%3B
再解码：
decodeURIComponent('%26lt%3B%26gt%3B') 则是"<>" 不是<>
但是使用text() 的话，解码之后变为

才正常。 文字一般都要进行编码
注意：缓存一个计算出来的值有利于代码的可读性。

+ 的优先级大于^  故(5678/1000)^0+1  相当于执行 (5678/1000)^1  所以是4
立即执行函数里面的this 指向window
a={
name:'f',
show:(function(){
alert(this.name);return this.name;
})()
}
Object {name: "f", show: ""}
得不到想要的值。
并且扫描的时候就是在求值了
ie8下 声明变量不加var 会报错 不加;也会报错
--------------------------------------------------------------------------------
width:30% 是父元素的宽度
不存在的字段 要使用[]来选取 不然会报错 //ie8下面
--------------------------------------------------------------------------------
input输入框自动获取焦点并选择所有
$('[data-key=userCnName]').focus().select();
--------------------------------------------------------------------------------
给子元素设置一个固定样式，即就是设置它的样式。
--------------------------------------------------------------------------------
使用click事件 少用delegate
还有document
--------------------------------------------------------------------------------
中文的length  即有多少个字数，不用去管其它。
--------------------------------------------------------------------------------
怎么测试在手机上的ajax 的各种操作，使用console
--------------------------------------------------------------------------------
同样一个不变动的内容  使用模板与直接的dom的好处？魔板不需要重置初始值 ，原生dom需要解决重置的问题。
--------------------------------------------------------------------------------


重温this的指向问题：
this永远指向函数运行时所在的对象，而不是声明时所在的对象；
匿名函数和不处于任何对象中的函数，this指向window；
call,apply' 
普通函数调用，函数被谁调用，this就指向谁。
对象方法中的ctx不会被保存的
--------------------------------------------------------------------------------
1000的另一种表示方法 1e3
--------------------------------------------------------------------------------
使用requestanimationframe来写循环；
不用的话：

使用了后：
var b=1;function a(k){
  b++;console.log(k);

if(b!=10){
requestAnimationFrame(a);
}
}
requestAnimationFrame(a); 

过程花费了2秒钟，所以是一种优化页面js运行的可行方案。


有错 动画再第二次不会被调用
获取一个圆的边框框

element.getPointAtLength(20)
返回在指定路径上指定长度的坐标点，只适用于‘路径’类型的元素，
返回类型{x:x,y:y,alpha:导线切线的角度}
--------------------------------------------------------------------------------
双创项目总结：
marker众多怎么解决性能问题？
将marker用id存起来，下一次进来比较它的id，如果有的话直接设置position即可。另外每一个marker代表一个人，在地图上就是一个marker，怎么通过列表里的人找到它的marker？
也是通过之前保存起来的id来查找。然后移动过去即可。
每一个marker，在点击的时候它要有底部的弹出框。即它是绑定了事件的。当有大量的marker的时候，以为这每一个marker都要进行绑定事件，使得性能下降，怎么解决？
使用事件冒泡来解决。marker只是dom中的一个元素而已，在map的容器上绑定点击事件。但是怎么区分是哪一个marker呢？使用setTitle来给dom设置title属性（只在手机端可以）。事件触发时，使用该title去访问上面的id。来找到那个marker以及它的信息。来达到目的。

或者这样: 将点击的回调方法作为marker的属性方法，点击marker时 执行该方法。

当没30s钟就同时发出4个请求，导致回来后执行js的时间较长，怎么优化？
分为每30秒钟就发一次。就可以了 。

<li data-tag="0"><label for="a"><input type="radio" id="a" name="handle" checked>全部</label></li>
点击文字也可以选中。

如何在debug环境下不弹出alert，confirm框？
使用函数复写即可 confirm=function(){return true};
--------------------------------------------------------------------------------
tools={
	thro:function(time,func,ctx){
	    var timer =null
	    return function(event){
	        if( timer ) {
	            clearTimeout( timer )
	        }
 var c=this;// 
	        timer = setTimeout( function(){
func.call(c)
} ,time );
	    }
	 }
}
事件节流：
$('#infoList3').on('scroll',tools.thro(500,function(){
							var c=$(this);
							var scrollTop=c.scrollTop();
							if(c.find('ul').outerHeight()-c.outerHeight()<=scrollTop+60){
							  var page=c.data('currpage');page=++page;
							c.data('currpage',page);//下一个
							var currdata=surroundings.slice(page*10,(page+1)*10-1);

							// 已经加载完了的话
							if(currdata.length==0){
								if(end) return;
								end=true;
								c.find("ul")
								.append('<li data-id="-1"><div class="infotxt"><p><em>暂无更多数据</em></p></div></li>');
							} 
							  var ht=baidu.template('surrounding_tpl',{data:currdata});
								c.find('ul').append(ht);
								setTimeout(function(){
									c.scrollTop(scrollTop);
								},0);
							}
						},$("#infoList3")))
事件节流时要
--------------------------------------------------------------------------------
form中的method一定要加，不然在ie  火狐下面传递的值会出错
jquery的ajax请求时，get请求默认会编码字符，服务器端取得的是编码后的，
而post不需要编码；并且post的传输没有长度限制
怎么调试模板里面的逻辑：debugger
--------------------------------------------------------------------------------
比如下面的未处理，已经处理 对应的status分别为1 2 3
为了进行tab切换，标记那上面那4个handler的分别为对应的status，下面的都统一放在一个dom wrap里面，并且使用data-status 进行标记它是哪一个种类，点击时获取该tab控制的status，然后去下面的dom里面查找对应的，并且显示隐藏相应 的元素即可。


--------------------------------------------------------------------------------
怎么解决在火狐下是缓存问题，在新的标签页中打开 强制刷新，直到更改后即可
--------------------------------------------------------------------------------
css  设置图片的img的position:relative 则它占的原来的空间还在
--------------------------------------------------------------------------------
列表 里面存id，要存在最高级的li里面，方便各个操作来读取：
比如：

每次点击一个按钮都会获取到一个id，做法是将id缓存到li元素上，这样通过closest('li').data('id')来查找
--------------------------------------------------------------------------------
a=function(p){
(function(){
console.log(p)
})()
}
相当于是：
a=function(p){

var temp=function(){
console.log(p)
}
temp();
}
--------------------------------------------------------------------------------
局域网内部搭建svn服务器，先本机固定ip，
然后获取访问地址：前面加上https，然后访问即可
--------------------------------------------------------------------------------
css里面 //这是注释 会出错
该这样：/*这是注释*/
 href="javascript:void;" 不要加这个
像删除按钮这种，不要使用id，使用class，方便扩展 可能一个页面里有很多个删除按钮
--------------------------------------------------------------------------------
require([])是一个异步的
var dom= $(html).insertAfter($(".boxPic01").eq(0));  不能把模板渲染后的html用来绑定事件 没有在dom中 前面那个才是真正的dom

注意module里面的全局
data里面有;
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			return ;
		}
		$(this).addClass("on"); 怎么不行？？ 被优先级了
--------------------------------------------------------------------------------
语句的先后顺序：
假如前面一条语句会影响后面一条，现在不想被他影响，可以放到后面 比如：

前面那条会影响后面的 而一直都想它为1 ，不被影响，可以放到后面。
--------------------------------------------------------------------------------
对图片做overflow hidden  要注意 渲染 后
--------------------------------------------------------------------------------
document.getElementById("seladdbackcon").addEventListener("tap", function() {
			ws.hide();
		})
在ios上面 没有在plusready里面初始化事件时 使用事件代理
$(document).delegate()会出错。



左边红色的是input元素，右边的是一个按钮；
fadeIn 就是慢慢由display none 到display block的过程
获取属性 比如上面的查找地点 
$($0).attr('placeholder')
后台数据过来后实现选择
<select name="dataSource" id="dataSource" class="input_style2" style="width: 100px;">
 									<option value="">--请选择--</option>
 									<option value="1" <!if(data.dataSource=='百度'){!> selected <!}!>>百度</option>
 									<option value="2" <!if(data.dataSource=='本地'){!> selected <!}!>>本地</option>
 								</select>
--------------------------------------------------------------------------------
两个class

下次注意同一个页面lng lat
百度跨域点

```
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}

function translate(point,type,callback){
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(xyUrl);
    BMap.Convertor[callbackName] = function(xyResult){
        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
        var point = new BMap.Point(xyResult.x, xyResult.y);
        callback && callback(point);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.translate = translate;
```

--------------------------------------------------------------------------------
十五分钟总结：
1.传参时一定要保证属性一样，不然会出现 属性混乱的问题 lng ,longitude
2.数组一定要考虑到可能长度为0，字符也一样，考虑可能为undefined
考虑字符串为undefined
考虑长度可能超出一定值
慎用``
调用ab.show 陷入了死循环 如下：
ab.show=getTimeoutExcute(ab)(){
			setTimeout(function(){
				ab.show();
			},2000);
		}
解决办法： 获得原始函数的引用即可。
function getTimeoutExcute(fn,ctx){
		return function(){
			setTimeout(function(){
console.log(2);
				fn.apply(ctx);
			},2000);
		}
	}
--------------------------------------------------------------------------------
正在表达式 变量
.replace(new RegExp(key1,'g'),key2);

样式先要对才把它放到页面里面去
注意标签对其  样式出错 可能是标签不对，可以在浏览器或者sublime里直接看闭合情况
span元素的内容 text 不是val
小心 ,
选择多个元素 ,好分割
效果作用到其他元素上面去了；是因为操作的元素 是id或者是什么的?
--------------------------------------------------------------------------------
1。.on[data-netlabel='1']{
				background-color: #fda408;
			}
属性选择器和类选择器公用；
多个属性选择器：
2.[href][title] 选择同时又这两个属性名的元素
3.属性选择器必须和属性值匹配
比如: <p class='a b'></p>
选择该元素的话:
使用class  ： .a
使用属性选择器: p[class='a'] 则选不到该元素 
必须写成：p[class='a b'] 才行

```
a();

var b=[];

function a(){
   alert(b)
}
```

此时会出错，因为变量提前了，如何避免?将变量b声明到前面去，即常说的变量声明提前到开头。 
文字注意 会换行
--------------------------------------------------------------------------------
while语句内部也可以使用 continue (结束本轮循环，继续下一轮) break (完成循环)
file  选择多个文件 multiple="multiple" 对file置为空 input.val('')
--------------------------------------------------------------------------------
seajs
相对路径:以.开头，只出现在模块系统里面，顶级标识：不以. 或者/开始 会相对于sea的基础路径进行解析
--------------------------------------------------------------------------------
动画事件.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass().addClass(preclassname);
        });
--------------------------------------------------------------------------------
reg.exec(str) 如果找到了匹配的文本，则返回一个结果数组，否则返回null
--------------------------------------------------------------------------------
1.a,img,button,input,textarea{-webkit-tap-highlight-color:rgba(255,255,255,0);} 解决手机端点击元素时的灰白阴影
justify 实现两端文字对其文本效果
但是ff下发现 不星：

```
.weui-label{
			    display: block;
			    width: 100px;
			    text-align:justify;//两端对其
			    text-align-last:justify;
			    border:1px solid red;
			}
<label class="weui-label">姓 名</label>
```
 可以在两个字之间加上一个空格
prefixfree.js 可以解决前缀问题
2. 手机端自动登录
登录成功后生成一个很长的随机字符串保存在cookie，(ssl +httponly) 失效期为30天，服务器把那个随机字符串+过期时间+对应用户id存入数据库，用户再次访问的时候，服务器拿到Cookie，查询记录，验证过期时间，恢复session，如果无效／过期，抹除Cookie并弹出登陆页面。
要注意的是，如果用户重设了密码，要顺便把数据库相应用户的自动登录随机字符串的那条记录删掉。
另外要记得设置计划任务，把数据库已经过期的记录删掉。
或者：

!!!构造函数 不要使用$.extend 来扩展原型 这样的话 new操作只能在extend之后执行。有坑(待定:因为原型是动态的，先new完之后，再添加方法到原型上面，实例对象上依然会反应出来。)

var a={name:{first:'a',show:function(){console.log(this)}}}
此时的show里面的this指向的是name的那个属性值对象
![image](http://dl2.iteye.com/upload/attachment/0122/6302/dedf7763-f2cf-3632-95e8-c387f6db5f4f.png)

## 写组件slider.js:

使用setTimeout在1s后才去获取index，但是此时index已经切换到下一页了，需求的是上一页的。可以这样。使用立即执行函数创建上一次的包含index的闭包

```
 set_leave:function(){
                var t=this;
                // 1000后_private.index会变为当前的 需要闭包保存
                (function(last_index){
                    setTimeout(function(){
                        t.config.onLeave.call(t.$li[last_index],last_index);

                    },t.config.duration*1000);
                })(_private.index);
            },
```
弹出文件下载窗口下载图片文件

```
<a  href="https://sf-static.b0.upaiyun.com/v-587db303/global/img/pattern/9.svg" download="w3logo">潘家大少爷</a>
```
1.
![image](https://segmentfault.com/img/bVIObC?w=529&h=369)
question: 现在的需求是，需要有一系列流程在弹窗中完成。比如：
我点击payment button，会弹出一个弹窗，在“弹窗1”上，选择要结账的产品 和 结账的方式（立即结账还是月结），如果立即结账，就会进入弹窗2，

注意：
1.每一个时刻，页面只显示一个弹窗，即当前步骤的弹窗。
2.日后一定还会在中间加入其他“步骤”和“分支”。
3.不同选择可能走入不同的分支，可能有跳步等动作，例如图中所示的例子。
4.必须有回退功能，即在用户在最后一步sumbit之前，都是可以回退的，而且必须保持之前选择的状态。那么该如何记录之前的选择呢。

技术范围要求：必须js

我的想法是用js的对象方式写。求一个设计思路，谢谢了，想了很久没有一个完善的方案。

谢谢大家的解答：

我补充下我之前的想法，不知是否可行
1.每一个弹窗都是一个不同的对象，
2.第一个“弹窗对象”是与众不同的，其他所有的“弹窗对象”都是他的属性，而且有一个array属性，可以存放用户轨迹，方便回退。
answer:
感觉题主的最主要的问题不在弹窗，弹窗只是一个简单的需求层面的展现形式。因此实现起来并不存在什么难点。至于是否把弹窗封装成组件，这个就在于你自己的考虑。

如果你的弹窗需要在其他很多地方使用，就封装弹窗。如果只是用在这一个地方，其实也没必要单独做封装。
而个人认为此问题的关键在于如何记录状态与跟踪路径。

因此要解决这个问题就需要涉及到一个状态管理器的问题。

如果楼主有过自己写状态管理器的经验，相信这个问题应该就不会太难。关于状态管理器，比较高级的解法是可以直接使用redux来搞定这个问题，redux作为状态管理器可以脱离react使用。但是redux毕竟功能强大，而题主的需求其实相对简单，因此自己搞一个简单的就行了。

状态管理器，说简单点就是一个全局变量。但是理论上来说我们需要尽量避免使用全局变量，因此就把这个全局变量搞成了一个单独的模块，加一些方法，就变成了一个状态管理器。

简单实现如下：

```
// state.js
// 定义一个对象，用来存储状态
let states = {}


// 获取整个对象内容，常用于开发中查看保存的值变成了多少
function getStates () {
    return states
}

// 根据属性名，获取存储的值
function get (name) {
    if(states[name]) { return states[name] }
    return ''
}


// 保存属性名，用法与react中的setState方法完全一致
function set (options, target) {
    let keys = Object.keys(options)
    let o = target ? target : states
    keys.map( item => {
        if(typeof o[item] == 'undefined') {
            o[item] = options[item]
        } 
        else {
            if(type(o[item]) == 'object') {
                set(options[item], o[item])
            } else {
                o[item] = options[item]
            }
        }
        return item
    })
}

// 判断数据类型
function type(elem) {
    if (elem == null) return elem + '';
    return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
}

// 这里使用了es6的模块语法对外提供接口，你也可以根据自己的实际开发情况使用其他的模块语法
export { getStates, get, set }
```
使用的话 这样使用:

```
import * as state from './state.js';

//保存步骤1的选择，可以这样设计数据
state.set({
    payType: {
        step: 1,
        stepName: 'payType',
        preStep: null,
        selectType: 0  // 选择了什么付款方式，可自定义
    }
})

// 保存步骤二
state.set({
    cardInfo: {
        step: 2, 
        stepName: 'cardInfo',
        preStep: 'payType', 
        // 此处的名称与上一步保存的属性名保持一致，
        // 方便直接使用获取上一步的内容，如果有其他具体需求，
        // 也可以与上一步的弹窗的对象名保持同步， 方便直接获取对象。
        // 此处处理相对比较灵活，题主还可以借助一些路由插件来实现返回上一步
        moreInfo: {},
        ... // 更多信用卡信息
    }
})

... ...  // 接下来的步骤都可以使用这个方式保存信息，所有的步骤内容都保存好了。

// 这种方式在以后插入新的步骤也会十分方便，只需要重新保存或者修改一些数据即可

// 如果需要修改保存的数据，比如修改步骤二，直接这样修改就可以了
state.set({
    cardInfo: {
        preStep: 'otherStep'
    }
})
```

```
0.28*100=28.000004
解决办法 (0.28*100)^0
```

