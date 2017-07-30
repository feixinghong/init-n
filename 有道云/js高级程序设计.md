1.标识符：变量，函数，属性的名称，或者函数的参数
在解释器对script元素内部的所有代码求值完毕之前，页面中的其余内容都不会被浏览器加载并且显示。
按照惯例：外部js文件待遇.js扩展名，但是该扩展名，浏览器不会进行检查，这样使用php或者其他服务器端语言动态生成的js代码也是可能的。嵌入.txt 也是可以运行的。
如果不存在defer和async属性，浏览器会按照script元素在页面出现的先后顺序对他们进行依次解析。
也就是说，第一个script被加载和解析完成之后，才会去加载病解析第二个。
defer表示脚本可以延迟到文档完全被解析和显示之后再执行。
async，表示应该立即下载脚本，但是不应该妨碍页面中的其他操作。不会按照指定他们的顺序执行。
2.开启严格模式：对一些不确定的行为（为这门语言容易出错的地方进行了限制），以及不安全的会抛出错误'use strict' 告诉编译器切换到严格模式下面
        function   f( ){
        'use strict';
    //该模式下面，脚本执行会有很大不同

}

3.不推荐这样使用
   
    if(test )
    dosomeing();
    函数体要加大括号

4.不推荐在函数中不用var定义全局变量

5.变量未被定义 var a; typeof  a ->>'undefined';
typeof  是一个操作符，不是函数  typeof   null->'object';
typeof b=='undefined'  ->true
五种基本数据类型:Undefined;Null; Boolean; String;Number;Object
6.
对于没有声明过的
typeof a  ->'undefined';    typeof  b  ->  'undefined';
var s;s===undefined //返回true
7.
null 表示一个空对象的引用   所有  var a=null;typeof a  ->   'object';想要保存对象，先要用null初始化它
null==undefined  -> true;后者是从前者派生的
8.
boolean  类型字面量是区分大小写的，用Boolean()可以将任何值转换为bool值 或者用  !!a;    
为false的值  '';0; NaN; false; undefined; null;//下面a会被自动转换成true
var a='message'; 
    if(a){
        alert(a)
}
9. 0.0003==3e-4
Number类型 如果前置为0并且为0-7中的数字，则表示八进制 否则前面的0倍忽略，后面的作为十进制解析。
var a=036  a为30  
var a=08  a为8  可以替代parseInt(a,8)进行解析a

10.   isFinite()可以用来确定一个数的范围是否超过Number.MAX_VALUE;或者小于Number. MIN_VALUE
isNaN()确定一个数是否是非数字，先接受一个非数字，尝试转换，能转换成数字，返回false  isNaN(NaN)->true;
如果某次计算超过Number.MAX_VALUE 则返回Infinity
string类型: 特殊字面量:转义字符
\n 换行 会在字符串中形成换行
\' 单引号 在用单引号表示的字符串中使用 'he name is \'fxh \'';
\" 在使用双引号中使用
\xnn以十六进制代码nn表示的一个字符(n为0~F) 比如:\x41表示A
\unnnn 表示汉子
\\斜杠
如何转换为数字? +string
对象object 
hasOwnProperty
isPrototypeof 检查传入的对象是否是传入对象的原型。

逻辑或: 第一个为true 返回第一个 否则返回第二个。
是短路操作符，第一个操作符求值为true，不会对第二个求值
b=9;a='ki'||++b 则不会运算第二个
字符串加运算 :如果有一个为字符串，则会转换另一个toString 然后再进行运算
逗号运算符返回最后一项
11.如果setInterval前面有任务时，它会等到完成之后才执行，所以它不十分精确
   
12. 
 function  addEve(){
    if(window.addEventListener)
      addEve=window.addEventListener;
    else if(window.attachEvent)
      addEve=window.attachEvent;
}
在内部对函数进行重写  把addEve改为return则可以在外部进行重写

13.
start:for(var i=1;i<10;i++)
{
if(i%5==0) break start;
num++;
}
 用label:statement 可以在将来的break  continue当中使用
14.
with(obj){}
作用是将代码的作用域设定在一个特定的对象中，当需要获取一个对象的各个属性时很有用，不介意使用比如
a={name:'bob',age:67,parent:'smith'}
with(a){
   var n=name;
   var a=age;
  var   pa=parent
}
严格模式下不能使用
15.
var a=10,b=9;
switch(19){
case  a+b:alert('1');break;//js中 可以使用任何数据类型 字符串 对象 表达式 变量  or num>10&& num <100;不会发生类型转换1与'1'不等
case  'hju':alert(1);break;}
return语句不加返回值可以用来提前停止函数执行
16.   
function  do(a,b){
}
do(1)
则没被赋值的参数会被赋值为'undefined'  java中函数如何实现重载 函数参数个数不同
重复定义两个同名的函数，则该函数只属于后面定义的函数，但是可以用 arguments.length来实现重载，
17.
可以为基本数据类型添加属性，但是稍后无法访问 a='ui';a.name='bob';alert(a.name)->undefined  只能动态给引用类型添加属性
18.
复制基本类型:基本类型时，是先创建一个新值，再将该值复制到新变量分配的位置上面。
复制基本类型值是 两个变量相互独立  a=9;b=a;a+=3;b=9;
复制引用类型时，a b 都指向堆中的同一片区域
向函数中传递参数时，参数是局部变量，与复制一样，即引用类型是引用传递，基本类型是值复制（p90）
所有函数的基本类型参数都是按值传递 ，引用类型如同引用类型变量的复制
19.
typeof 用于检测基本数据类型，instaneof用于检测引用数据类型 基本数据类型用它会返回false    function 也是引用类型  但是也可以用typeof
20.
每个函数都有自己的执行环境每个环境都有与之对应的    变量对象，某个执行环境中的所有代码执行完成后，环境被销毁保存在其中的变量随之销毁
21.
延长作用域链  with  与catch语句 当遇见它们时，它的变量对象会被加到作用域链的最前端
22.
没有块级作用域  尤其注意 for(var i=0;i<10;i++){}执行后依然可以访问i
  i 变量定义  使用var定义的变量会被添加到最接近的环境当中,查询标识符:随着作用域链一级一级往上面搜索。直到找到为止
ii.管理内存: 分配给浏览器的内存较小。确保占用最少的内存可以使页面获得最好的性能，一旦数据不用了，将其值设置为null来释放引用，这叫做解除引用。比如对于全局变量。局部变量不需要，因为会在离开环境时自动解除引用，但是全局变量，全局对象属性，循环引用变量需要。真正目的是让该值脱离执行环境，以便下一次垃圾回收它。闭包里面的也是一样的。因为不会回收它。
function f(){}
var a=new f();
.....
a=null//解除引用
基本类型是固定的，保存在栈内存中；引用类型的值是对象，保存在堆内存中
23.
arr.length 不是只读的
24.
检测数组，Array.isArray(),当存在多个框架时，一个框架向另一个传递数组时，构造函数不同，instanceof 失效 此时用它，不管是否是同一个全局环境中创建 
toString()方法可以把数组拼接为字符串

24.
栈方法 pop(),push();队列 shift()  push();   unshift()与pop()方法模拟反向的队列
concat(); 先创建当前数组的一个副本，当传递多个数组时，会将数组中每一项都添加到结果数组中，如果传递的值不少数组，会被简单添加到末尾
slice 能基于当前数组的一项或者多项创建新数组
位置方法: indexOf(),lastIndexOf() 第一个参数是待查找的字符串，第二个是指定开始查找的索引

正则: 需要转义的字符:
( [ { \ ^ $ | ? * . } ] ) 
需要在字符串中包含这些 必须添加\[
匹配 以[ad结尾的字符串:
p=/\[ad/gi;    匹配包含[ad的字符串
/\.di$/i.test('fd.di') 匹配以.di结尾的字符串
匹配以.di开头的字符串
/^\.di/i.test('.dif')
匹配以 单个字符di开头的字符串
/^.di/i.test('idif')
RegExp 实例方法:
作为值的函数:
函数可以作为参数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。
比如比较数组里面对象的属性。可以这样做

```
function create_compare(prop){

return function    (a,b){
return a[prop]>b[prop];
}
}
a=[{age:90},{age:78},{age:100}]
a.sort(create_compare('age'))
```
每个函数都包含length属性，表示希望接受到的参数个数
基本包装类型相对应的引用类型:
Boolean String Number 
每当读取一个基本类型时，后台就会创建一个对应的包装类型
每次调用基本类型的方法时，后台都会先创建对象，然后调用方法，再销毁该对象

String方法 
trim() 会创建一个字符串的副本，删除前置和后缀的空格
大小写转换方法: toLowerCase() toUpperCase()
模式匹配方法: match() 和调用正则对象的 exec方法一样

单体内置对象:
不依赖于宿主环境的对象，在程序执行之前已经实例化

Global对象

encodeURI 对统一资源定位符进行编码？有效的uri不能包含某些字符，可以对其进行编码，使用utf8替换所有无效的字符，让浏览器能够理解。
encode不会对本身属于URI的特殊字符进行编码 比如空格 不会对冒号 正斜杠 问好 #；而encodeURIComponent()会将所有非标准字符进行编码

```
"http://www.baidu.com/hehe h/a.html#jon=ok"
encodeURI(a)
"http://www.baidu.com/hehe%20h/a.html#jon=ok"

encodeURIComponent(a)
"http%3A%2F%2Fwww.baidu.com%2Fhehe%20h%2Fa.html%23jon%3Dok"
```
Math对象
min() max()方法 这两个方法可以接受任意多个数值参数
最佳实践
```
a=[4,6,2,3,6]
[4, 6, 2, 3, 6]
Math.max.apply(Math,a)
```
将数从小到大从下面往上面来排列
舍入方法：Math.ceil() 执行向上射入-2.3 舍入为-2
Math.floor() 执行向下舍入  -3
Math.round() 执行圆整 相当于四舍五入
Math.random() 返回介于0到1间的一个随机数 不包括0 1
25.
数据属性 改变对象属性的默认特性，是否可修改属性值，是否可枚举该属性。可以通过var a={}; Object.defineProperty(a,'name',{writable:false,value:'bob',enumerable:false})来设置。
Object.defineProperty()接受3个参数。要给予属性的对象，被添加的属性，以及对属性的设置，以对象字面量形式传入，有configurable,writable,value(默认 undefined),读取属性时从这个位置读，写入属性值时将新值保存在这个位置）,enumerable,严格模式下属性设为只读再写入属性值会导致错误。其他一样的。此时再设置defineProperty一样的会导致错误，即使更改 调用该方法时不设置值会使得为false 。并且一旦调用Object.defineProperty()设置属性，则3个默认为false。

访问器属性 不能直接定义，必须通过defineProperty来定义。 不包含数据值，是一对getter 和setter 在读取访问器属性时 会调用getter函数
（year）：设置一个属性值会导致其他属性发生变化时用
var book={
   _year:2004,//_代表只能通过对象方法访问的属性
     edition:1
}；
Object.defineProperty(book,'year',{
  get:function(){
         return this. _year
      },
  set:function (newyear){
   if(newyear>2004){
  this.edition+=(newyear-2004);
  this._year=newyear}
}
}
)
book.year=2010;属性有[[set]]在写入属性时调用的函数默认值undefined [[get]]在读取属性时调用的函数 默认值undefined [[enumerable]]一样 [[configurable]]
只指定get意味着只能读不能写 ，严格模式下写入只指定了get的会出错
26.定义多个属性Object.defineProperties(object,object)第一参数是要添加与删除属性·的对象，第二个是属性
Object.defineProperties(a,{move:{value:'hu',writable:true},year:{value:2010}})
27.
Object.getOwnPropertyDescriptor(a,'move') 获取a的某个属性move的描述，返回一个对象，对于访问器属性返回 set  get  等，数据属性  返回4个属性的对象
prototype 是不可枚举的
28.
工厂模式的缺点 无法知道一个对象的类型。
故出现了构造函数模式 ；可以使用instanceof 来判断对象是否是构造函数new 出来的  可以创建任何的类型
构造函数作为普通函数使用时，this  指向window ，故是在为window添加属性    可以使用强制办法来解决该问题
function per(name){this.name=name;}
var o=new Object();
per.call(o,'bob');//理解。per让o来执行。意思是在o的作用域中调用per函数，this指向o，则此时o具有了name属性
o.name->bob;
方法定义   function per(name){this.name=name;this.show=show};
    function  show(){alert(this.name)};可是无任何封装性，用原型来解决
29.
prototype·中有一个constructor属性，用来指示实例的构造函数  new 出来的实例都有一个constructor属性。用对象字面量形式封装原型，但是必须重写constructor属性，但是这样会使constructor属性可枚举，但是可以通过Object.defineProperty来设置
hasOwnProperty()区别是自身属性还是原型属性
Object.getPrototypeOf()参数是new出来的对象    或者用ra.constructor.prototype一样的
Object.getOwnPropertyDescriptor()方法只能运用在实例自身属性上面，要用到原型上需要调用原型对象 Object.getOwnPropertyDescriptor(ra.constructor.prototype,'sum')因为它是执行原型的引用

hasOwnProperty() 可以检测一个属性是存在于实例中还是存在于原型中 ，只有当属性存在于实例中时候，才会返回true
30.
in 操作符会在能够访问给定属性时返回true 不管是原型还是自身属性
判断一个属性是否是原型上面的属性
!obj.hasOwnProperty(prop)&& (prop in obj)
for in 访问可以枚举的属性即 enumerable 设置为true的属性
原生对象的重要性:
所有原生类型的方法都是再其构造函数的原型上面定义了方法，可以在其原生对象是那么定义新方法
31.
Object.keys(某个对象)返回某个对象的一个可枚举属性名构成的数组
32.
new出来的实例有一个链接_proto_单独指向原型内存 区域，它的构造函数也有一个链接指向这个区域，现在先new出来对象再将构造器的原型指向其他对象，但是这个实例依然通过_prto_指向原来的地方，
33.
原型对象的问题，当原型中存在属性值是对象的属性时，new出来的实例对它的修改比如push()也会造成对原型的更改
故用构造函数与原型模式来构造
动态原型模式  在构造器中根据if来调用prototype
34.
稳妥函数  不使用new this关键字来创建对象,最适合在安全的地方使用，这些地方会禁止使用前两种关键字
function person(name,job){
    var o=new Object();
    o.say=function(){//没有其他方法可以访问到name属性
      alert(name)
}
return o;
}
var  p=person('bob');
35.
确定原型与实例的关系  用instanceof    or   person.prototype.inPrototypeOf(实例)
36.
继承的实现
        i. 借用构造函数，让这个构造函数作为父元素，
        function  superType(name){this.colors=['blue','red','yellow'];this.name=name;};
        function subType(){superType.call(this,'bob')}//则此时subtype具有了supertype的属性的副本（注意！），并且还传入的了参数，缺点，父类原型中的方法无法子类继承
注意 ：构造器自身的属性，子代每一个都是他的复制，即使这个属性值是一个对象，
37.
函数声明：function func_name(){}  它的重要特性，声明提前，意思是在执行之前会首先读取函数，但是函数表达式不是这样的
比如  m();function m(){} ok；
b();b=function(){};  wrong
应该这样做
var  a;
if(condi)
    a=function(){alert(1)};//不要这样 function a(){alert(1)}因为声明提前。
else 
  a=function(){alert(2)}
可以将函数作为一个变量的形式传入另一个函数作为他的参数
function n(move,para){move(para)};
function  h(p) {alert(p)};
或者作为一个匿名函数返回，或者将匿名函数赋给一个私有变量，可以在用 sort方法中运用

38.函数属性与方法
函数属性  prototype   length  返回函数希望介接收的参数个数
每个函数都包含两个非继承而来的方法  call  apply在特定的作用域中调用函数
严格模式下 this  不会转化为window对象
区别  call 传入的参数必须都列出来
apply(this,arguments )appy不需要 比如这样
color='red';
function  showCo(){alert(this.color)}
o={color:'green'}
showCo.call(this)//red
showCo.call(o)//green  执行环境变为o了
扩充了函数的作用域 ，对象不需要与函数有任何的耦合关系
bind 
a=o.show.bind(o)  //它会创建show函数的实例，this被o所替换
toString()  调试时用于输出代码
39.
this对象指代是根据函数执行环境绑定的
40.闭包会引用包含函的活动对象 而其中包含着ele，即使闭包不直接引用ele  包含对象中也依然会保存一个引用
内存泄露
function al(){
    var ele=document.getElementById('a');
    ele.onclick=function(){
    alert(ele.id);
}
}
由于匿名函数永远有一个对
function  al(){
 var ele=document.getElementById('a');
var id=ele.id;
    ele.onclick=function(){
    alert(id);
}
ele=null;


}
41.
函数声明后面不能跟括号 但是函数表达式后面可以下面语句出错
function(){}();解析成了声明
(function(){})()//括号作用是将函数声明转换成了表达式
42.
模拟块作用域
用匿名函数 执行完后就被销毁了 另外它还可以用来减少全局变量
私有变量包括函数的参数  在函数内创建的函数 变量
43.
特权方法：能够访问函数私有变量的公用方法 一般以构造函数形式出现
function  person(name){
   this.getName=function(){return name}
   this.setName=function(value){name=value}
}//私有变量可以隐藏不应该被修改的变量
44.
静态私有变量创建特权方法 与上面的区别是私有变量是共享 的
((function(){
var private=10;
var privateFunc=function(){
return false;
}
MyObject=function(){};
MyObject.prototype.publicMethod=function(){
private++;
return privateFunc();
}
})()
45.模块模式  平时用的（单列用对象字面量形式创建）
(function(){
var a='';
function  private(){}
return {get:function(){
return a;
},
set:function(value){
a=value;
}}
})()

46. 增强的模块模式

适合单例必须是某种类型的实例  并且想向其中添加属性或者方法的情况
语法如下
var objec=(function(){
var a='';
function  private(){}

var  objec=new CustomerType();
objec.get=function(){
return a;
},
objec.set=function(value){
a=value;
}
return objec;
})()

46.在全局上定义  var a=0;  window.a=0;区别后者可以用delete删除
访问时也有区别  没有定义a  尝试  读出a  报错  但是通过  window.a   查询 属性却不会报错

47.
top 是最外层框架的window对象 每个框架保存在frames集合中  每个框架都有自己的window对象
使用 top.frames[0]来访问框架   与top相对的另一个window对象是parent   它指当前框架的直接上层框架  没有框架时  top==parent==window
使用框架时 会存在多个global对象，每个框架中的构造函数都是不一样的故会出现  Top.Object!=top.frames[0].Object;  会影响到instanceof  的使用 ，使用先stringify再parse化来解决这个问题
window.self==window始终指向自己

48.
 bom
window.open(url,'which',param)
url是要打开的链接  确保是以http开头，这样是绝对路径 不然会是相对路径，which可以是 _self  框架名 _top topFrame等等  如果不是一个已经存在的窗口或者框架名的话，会打开一个新的标签页 他的宽高根据第3个属性来确定，如果没有这个属性的话，默认全开 。并且如果没有打开新窗口时，会忽略第3个参数
默认情况下，不应许对浏览器中的窗口进行调整  但是对于open后的对象，确可以 
使用 
window.open('http://www.baidu.com','','width=300,height=400,top=10') 新打开一个窗口
页面重载 window.open('http://www.baidu.com','_top',''); 或者location.href="http://www.baidu.com"
 a.resizeTo(300,300)
a.moveTo(400,400)
a.close() 关闭打开的窗口 （对于框架无效） 或者自己通过调用window/top .close()
a.opener 引用打开窗口的那个窗口 a.opener==window
如果被浏览器内置的屏蔽程序屏蔽  window.open()返回undefined  被扩展屏蔽会抛出一个错误  所以可以用来检测屏蔽
try{
var open=window.open('http://www.baidu.com','')
if(!open){
blocked=true;
}
}catch(err){
blocked=true
}
if(blocked) alert('blocked')
number.toFixed(3) 把数字转换为字符串，结果的小数点后有指定位数的数字。
49.
超时调用  间歇调用  区别  setTimeout是没有到达终点继续调用  setInterval是到了终点后取消调用 需要有一个调用id 推荐使用前者 在绑定事件时 推荐使用setTimeout 性能！ 另外不建议使用字符串 转换时可能导致性能损失 最好不使用间歇调用 因为后一个调用可能在前一个调用之前执行
超时调用的代码都是在全局作用域中执行的，故函数中的this的值在非严格模式下指向window 严格下是undefined
应用
 jte时 延迟绑定事件  ；settimeout（function（）{}，0）在页面其它js执行后马上执行
还有一种调用方式：
setTimeout(alert,3000,'ok')
则3000ms后执行alert('ok')

50.
系统对话框 通过这几个对话框打开的是同步的 代码在这里停止执行 并且chrome会对她进行计数 
confirm('sure?') 确认框 返回true or false
prompt('a','b') 第一个是提示信息 第二个是默认值  返回用户输入的字符串
window.find('test') ;windod.print()它们是异步的能够将控制权马上交给脚本 chrome对话框计数器不会计算它们

51.
位置操作
location.hash -wr- 在IE8以后 会有一条历史记录 使用location.replace(url) 会载入到新的页面 不会有历史记录 覆盖当前页面
location.reload() 后面的代码可能执行 也可能不会执行  所以把它放在最后一行
location既是window 也是document的属性 
location.pathname 返回url中的路径信息 比如https://www.google.co.jp/search?q=session 返回"/search" 
location.search 返回?q=session
location.protocal 返回协议
location.hostname 不带端口号的服务器名
ie8 修改hash会在history中生成一条新的历史记录 但是在8以前 修改hash不会更新 无历史记录

52.
检测插件 特定的history与特定的window相对应 
nodeList 是有生命的 ie8使用Array.prototype.slice.call()会出错,实现为了com对象 不过可以枚举，并且可以通过它来进行检测是否是ie8
53.
dom 
appendChild()  如果其中的节点已经是文档的一部分了，那么结果是将该节点从原来 的位置删除，然后添加到新的位置，
hasChildNodes() firstChild lastChild parentChild previousSibling nextSibling childNodes  它获得的是一个动态的元素节点列表
insertBefore(+,insert)  replaceChild(+,re)
54.
document
document.referer 取得来源页面的url
document.URI 完整url
document.domain

element 属性  nodeName nodeValue nodeType
geAttribute()也可以取得自定义属性  所有自定义属性 html5规范都是应该加上data-前缀
有两类特殊的属性，属性的值与通过getAttribute来取得的值不一致，
style  属性取得的是一个对象，get来取得的是文本 
事件处理程序 ：onclick返回的是js函数，get返回字符串
<div id="a" onclick="(function(){})()" style="height:300px;background:red"></div>
a.getAttribute('onclick') =>"(function(){})()"
a.onclick=>(function(){})()
所以只有在取得自定义属性时才使用getAttribute
snip=document.createDocumentFragment() 是一个文档片段   可以理解成是属于文档的一个元素，但是么有对应的标签，存放暂时要添加的html片段，完成后一次append到文档中，(appendChild) 不然会导致浏览器反复渲染
动态dom时 （script）创建script只有把它加到文档中时才会开始下载
添加行内js 使用text引入js代码 这样会在全局作用域中运行
动态css  link 必须加到head中
var style = document.createElement( "style" )
    style.type = "text/css"
    style.appendChild( document.createTextNode( "body{background:yellow};" ) )
    document.getElementsByTagName("head")[0].appendChild( style )
nodeList NamedNodedMap HTMLCollection 都是动态查询文档   存储的是最新的快照故查询过多会带来性能问题
dom操作是js中开销最大的部分，而因访问nodelist导致的文题最多。nodelist都是动态的 每次访问nodelist对象，都会运行一次查询，最好是减少dom操作

55
为了确保发送到server的值正确无误，所有单选按钮必须具有相同name属性
<label for="a">red: </label><input type="radio" name="color" value="red" id="a"> 
 <label for="b">green: </label><input type="radio" name="color" value="green" id="b"> 
  <label for="c">yellow: </label><input type="radio" name="color" value="yellow" id="c">

56.
所有实现匹配dom元素都会先写一个基础css解析器，然后再使用dom方法查询文档并找到匹配的节点，而把这个功能变为原生api后，解析与树查询操作可以在浏览器内部通过编译后的代码来完成 极大的提高了性能
 document.querySelector() 传入css选择符，返回与匹配元素的第一个元素，通过element类型调用它，只会在该元素后代元素的范围内查找匹配的元素，通过document类型调用，会在文档的范围内查找匹配的元素， 如果传入不被支持的选择符，它会抛出错误。querySelectorAll 返回的是nodeList底层实现是相当于以为数组的快照，而不是不断对文档进行搜索的动态查询。 Document DocumentFragment Element都能够调用它俩
dom性能优化  
 缓存dom 先存起来 一次性用createDocumentFragment()加入要append的html 在append到缓存起来的dom 
在内存中操作元素
 由于DOM操作会导致浏览器的回流，回流需要花费大量的时间进行样式计算和节点重绘与渲染，所以应当尽量减少回流次数。一种可靠的方法就是加入元素时不要修改页面上已经存在的元素，而是在内存中的节点进行大量的操作，最后再一并将修改运用到页面上。DOM操作本身提供一个创建内存节点片段的功能:这样就只会触发一次回流，效率会得到很大的提升。如果需要对一个元素进行复杂的操作（删减、添加子节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个（），在内存中进行操作后再替换原来的节点
一次性DOM节点生成
字符串拼接
通过类修改样式 先添加具有这个样式的类 在添加对应的class
通过事件代理批量操作事件
这里每个li元素都需要执行一次方法，如果li元素数量一多，就会降低效率。所以我们可以通过事件代理的方式，将事件绑定在ul上，然后通过event.target 来确定被点击的元素是否是li元素，同时我们也可以使用innerHTML
var ulNode = document.getElementById("container");
 var fragmentHtml = "", i, m;
 var liFnCb = function(evt){ //do something }; 
for (i = 0, m = data.length; i < m; i++) { 
   fragmentHtml += "<li>" + data[i] + "</li>"; 
}
 ulNode.innerHTML = fragmentHtml; 
ulNode.addEventListener("click", function(evt){
 if(evt.target.tagName.toLowerCase() === 'li') {
 liFnCb.call(evt.target, evt); }
 }, false);

57.焦点管理
h5新增了一种操作类的方式 classList 是新集合类型DOMTokenList的实例 
prop  length  methods: element.classList.add(className) remove()  toggle()是移除则返回false 添加则返回remove contains(v) 
也新增了（那个元素） document.activeElement属性，这个属性始终引用dom中当期获得焦点的元素，元素获得焦点的方式有页面加载（body）用户输入和在代码中调用focus()方法。默认，当文档刚刚加载完后，保存的是document.body文档加载期间，保存的是null。也新增了document.hasFocus()方法。（是否获得了焦点）用于确定文档是否获得了焦点。 只有用户在交互时才为true
ie6+都实现了这两个接口

58.
htmldocument的变化（）新增的html5属性
readyState 通过它来实现一个指示文档已经加载完成的指示器，可能的值 loading 正在加载文档，complete已经加载完文档。
兼容模式。自从ie6开始区分页面渲染是标准的还是混杂的，document.compatMode属性显示采用了那种渲染模式。
  标准模式:Css1Compat  混杂模式:BackCompat 
head属性 作为对document.body引用文档dody元素的补充 var head = document.head || document.getElementSByTagname( 'head' ).item( 0 )

59.
字符集属性 自定义数据属性
添加data-前缀 目的是提供与渲染无关的信息，或予以信息 添加之后，可以使用 element.dataset.prop来访问 或者设置自定义属性
 element.dataset.prop=“value”  如果需要添加一些不可及的数据以便进行其他处理 就要用到 在混搭应用中，通过自定义属性能方便知道点击来自页面中的那个部分

60.
插入标记
innerHTML 当需要给文档插入大量html标签时，通过dom操作很麻烦。姑使用插入标记技术
写模式下面，它的值会被解析成DOM子树，替换调用元素原来的所有子节点。读模式下 所有浏览器返回的值不同  有道可能大写
另外。设置了innerHTML后再去读取html字符串。会得到与设置时不一样的结果 原因是返回的字符串是根据原始html字符串创建的dom树经过序列号后的结果。比如 "<span>dffd&gt;ssf  </span>"
outerHTML返回包括自身
insertAdjacentHTML(pos,htmlStr) 
pos: beforebegin 在当前元素之前插入一个紧邻元素(before begin 在自己开始之前)
pos: afterbegin在当前元素下面的第一个子元素之前插入新的子元素(after begin 在自己开始之后)
pos: beforeend  lastChild
pos:  afterend   nextSibling(after end 在结束之后)
性能问题  用innerHTML去替换子节点会导致浏览器的内存占用问题，在删除带有事件处理程序或者引用了其他js对象作为属性时时，就会导致内存占用问题 在删除时候，事件与元素的绑定关系在内存中并没有删除，若频繁出现，则页面内存数量会明显增加 故在使用者3个属性时，先手工删除要被替换元素的所有事件处理程序与js对象属性。
避免：这样
for(i=0;i<v.length;i++){
ul.innerHTML+="<li>"+v[i]+"</li>"
}
每次循环会访问两次innerHTML 好的做法是单独构建字符串，最后一次插入
61.
element.scrollIntoView()可以在所有html元素上调用，调用元素会出现在窗口中，传入false 会底部对其，true会顶部对其
文档模式
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
62. ie都支持
element.contains(ele)祖先节点调用 传入要检测的后代节点。 若是则返回true 否则返回false
63.
滚动
scrollIntoViewIfNeeded(alignCenter)只在当前元素不可见时才滚动到浏览器窗口 让他可见。 可见的话什么也不做,可选的alignCenter设置为true 表示尽量放在中部
64.
样式：
支持style属性的html元素在js中都有一个对应的style属性，它是CSSStyleDeclaratuon的实例，包含着对应html的style特性指定 的所有样式信息 但是不包含通过样式表或者嵌入样式层叠而来的样式。 style.width:最好始终指定度量单位，混杂模式下 20被指定为20px 标准模式下，设为20会被忽略。获取float 用cssFloat  styleFloat
计算样式  document.defaultView.getComputedStyle(ele,null[:after])  接收要计算参数的元素以及伪元素字符串
获取层叠后最终的样式信息 返回的也是一个CSSStyleDeclaratuon的实例 ie中是element.currentStyle 
注意 所有计算的样式都是只读的，不能修该 计算后 的样式也包含属于浏览器呢不样式表的样式信息，故任何具有默认值的css属性也会表现在计算后的样式中 且某个css默认值在各个浏览器中是不同的 若想要具有某个特定默认值，应该手工指定

65.
操作样式表
CSSStyleSheet通过内嵌or link来定义 只表示样式表 不管它怎么被定义。。继承自StyleSheet类型 的属性有
css=document.querySelectorAll('link').item(0) ;css.sheet(ie: css.styleSheet) 前面获取的是dom元素 然后获取CSSStyleSheet对象
function getSheet(ele) {
return ele.sheet || ele.styleSheet
}
要这样获取 :css=document.StyleSheets 集合
两种是一样的  css[0]===css.sheet  return true
css.disabled 表示禁用样式表的布尔值。只有他可读写，设为true表示禁用对应的样式表
css.media 当前样式表支持的所有媒体类型  
css.ownerNode

对于内嵌style
则  document.querySelectorAll('style').item(0).sheet[ ie:styleSheet ].cssRules 返回一个元素是cssStyleRuleList的 类数组(CSSStyleRules{0:}) 这个元素(即定义的每一条规则)有以下方法: selectorText  选择符文本 cssText返回整条规则对应的文本  style  是一个CSSStyleDeclaration对象 跟获取计算后的样式返回的对象类型一致 但是两者不等 一个是计算后的 对于这个对象 键是属性比如width 等 值是对应的值 可以修改 但是计算样式不能更改 修改 style.width="200px"
document.styleSheets.item(0) CSSStyleSheet对象 方法 :insertRule(rule,index) deleteRule(index) [ie:adRule(selector,cssText,pos)]
总结：行内style 外链link 内嵌style 的cssRules.item(0).style 获取的都是CSSStyleDeclaration实例  行内style设为什么样式就是什么样式  不包含其他两个  通过element.style 来访问 获取的计算样式也是一个CSSStyleDeclaration实例 只不过是行内样式对应的

string的方法：lastIndexOf('/') 从后面开始往前搜，搜到的话返回该位置的index

backbone.note vue.note
66.第25章
新兴的api
25.2 page visibility api
可以知道用户是不是  正在和页面进行交互。当没有交互时，轮训服务器或者动画是可以停下来的
document.hidden 表示页面是否隐藏的布尔值，页面隐藏包括页面在后台标签页中或者浏览器最小化。
return后面要带分号，不然无法return
注意 for 循环 必须是第二个表达式返回true才进入执行。并且第一次都会进行测试
Math.max(a,b,c,d,e) 求这5个数的最大值
如果a=[5,3,2,2]
怎么求 ：可以Math.apply(Math,a) 将a数组当做参数传入进去。

#### 6.2.4
组合使用构造函数模式和原型模式
由于将属性定义在原型什么，实例直接会共享。相互影响。
故最好键属性定义在实例上面，共享方法定义在原型上面。
