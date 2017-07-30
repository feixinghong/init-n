  1. 设置babel语法高亮：package安装babel，然后打开一个babel文件，选择view ->syntax->open allOpen all with current extension as... -> Babel -> JavaScript (Babel).,对于jsx 文件，按照此方法设置。
  2. const命令 与let命令一样，具有块级作用域{}， 声明一个常数，一旦声明，则不能被改变，试图改变会报错 并且必须立即初始化
  3. let命令：有会计作用域  for循环很适合用let let不存在变量提升  ；暂时性死区：一旦声明let，则它绑定该块级作用域。即使作用域链上有该作用域；并且在let声明该变量以前，该变量都是不可用的。即使给它赋值
  4. 安装 npm install -g babel-preset-es2015 运行 babel --watch  src/ --out-dir build/
  5. babel -w code/ -d build/
  6. 变量的解析赋值： es6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，
  如果解析不成功 则为undefined
var {b=8,a=9}={a:89} 也可以 这是先为解析异构设置默认值，再解析异构
  1. var [a,b,c]=[4,5,6] 
  2. =>var a=4;var b=5;var c=6
  3. //或者
  4. let [g,,j]=[9,0,7] 
  5. => g=9;j=7
具有iterator接口：
  ● // generator

function* fn(){
	var [a,b]=[0,1]

	while(1){
		yield a;
		[a,b]=[b,a+b]
	}
}
var [first,second,third,fourth,fifth,sixth]=fn()
只有: function ab({x,y=3}){
console.log(x,y);
}
ab({x:10,y:4});
解析赋值会依次从该接口获取值
解析异构允许默认值
解析异构：允许参数里为对象 但是必须有= 比如 function(a=2,{x=2,y=8}={y:8}){

}
后面的对象是为了保证不出问题。（解析异构对象是对象时必须要有赋值，否则传过去的是undefined） 赋值时必须为js对象，没有=
为什么对象的解析异构有=？为了使得对象的每一个在对象没有默认值的时候 可以设置该对象属性的默认值
函数的扩展：
var a=1;
function p(fn = x => a){
 var a=4;
console.log(fn())
}
p是一个默认参数是一个函数的函数。。。 问题？该函数运行时a是哪一个？：因为该匿名函数声明时，p函数内部的作用域还没有形成，故这里的a指向的是外层的a （1），输出1。
作用域：

// 对象的解构赋值
  ● var {name,age}={name:'bob',age:90} 即使 name 与age的顺序反调也可以获取到正确的name 
数组元素是按照次序排列的，变量的取值由它的位置决定，而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
如果变量与属性名不一致，必须这样写
let obj={first:'g',second:'i' }
let {first:ar,last:br}=obj
对象的该属性是先找到同名属性，然后再赋值给对应的变量，前面只是一种简写	真正被赋值的是后者而不是前者
let foo; ({foo}=foo:1) 必须要有括号，因为解析器会将大括号当做一个代码块，而不是赋值语句
const [a1,b1,c1]='fdrww' 则 a1 为f 依次类推
字符串的扩展
1.字符的unicode表示 JavaScript允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的码点，但是只限于\u0000 到\uffff之间的字符，超出这个范围内的字符，必须使用双字节的表达式
'\uD842\uDFB7'
字符串的遍历接口
for(let a of 'uyhh'){
console.log(a)
}

es6模板字符串
$("body").append(`
	今日上线${data.online}/${data.total}人
	`)
编译之后为：
$("body").append('\n\t今日上线' + data.online + '/' + data.total + '人\n\t');
注意：转折的话模板也会转折 并且append的小括号两端是反引号` 不是引号
反引号可以被用于定义多行字符串，或者在字符串中嵌入变量 注意元字符串中有转折的话，则就有转折，相当于是html的pre 属性
字符串中嵌入变量
//字符串中嵌入变量
var [g3,n3]=[4,5]
var s=`fdfsdf ${g3}和${n3}`
编译后变为
//字符串中嵌入变量
var g3 = 4;
var n3 = 5;
var s = 'fdfsdf ' + g3 + '和' + n3;
// 如果模板字符串表示多行字符串，则所有空格和换行都会被保留到输出中
$('#list').html(`
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	`)
如果不想换行，可以使用trim来消除它
模板字符串中的大括号中可以放入任意的js表达式，可以进行运算，以及引用对象属性
// 模板字符串中还可以调函数
function fn(){
	return 'hello world'
}
var k=`你说${fn()}`
由于模板字符串的大括号内部就是执行js代码，故如果内部是一个字符串，会按照原样输出
模板字符串的嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
翻译后变为
var tmpl = function tmpl(addrs) {
	return '\n  <table>\n  ' + addrs.map(function (addr) {
		return '\n    <tr><td>' + addr.first + '</td></tr>\n    <tr><td>' + addr.last + '</td></tr>\n  ';
	}).join('') + '\n  </table>\n';
};
标签模板
可以紧跟在函数名后面，该函数将被调用来处理这个模板字符串。
标签模板其实不是模板，是函数调用的一种方式	，标签指函数，紧跟在后面的模板字符串是参数
tag`hello ${a+b} world ${a*b}`
=>  tag(['Hello ', ' world ', ''], 15, 50)
数组方法
Array.from() 将两类对象转换为真实的数组，可以将domList转换为array对象，
{'0':1,'1':5,length:2}
然后使用它的方法
可以使用[].slice.call(domList)来模拟 函数内部的arguments对象也可以使用
只要是部署了iratator接口的数据结构，Array.from都可以把它转为数组
...运算符也可以将某些数据结构转为数组
function ah(){
	var args=[...arguments]
}
转换为
function ah() {
	var args = [].concat(Array.prototype.slice.call(arguments));
}
或者
[...document.querySelectorAll('p')]
还支持有
Array.of() 用于将一组值转换为数组
--------------------------------------------------------------------------------

函数参数的默认值
function log(x,y){
y=y||'world'
console.log(x,y)
}
缺点：如果对y赋值为false 类型的值，则达不到指定的效果，依然返回'world' 	
可以这样typeof y==='undefined' y='world'
// es6为函数设置默认值
function log(x,y='world'){
	console.log(x,y)
}
另外，函数参数是默认声明的，不能再次使用let 和const再次声明
--------------------------------------------------------------------------------
函数默认值与解析异构
function foo({x,y=5}){
console.log(x,y)
}
foo({y:9,x:0})
解析异构 函数的第二个参数必须是对象
function fetch(url,{body='',method='get'}){
console.log(method,body)
}
fetch('baidu.com',{body:'yu',method:'post'})
但是不能省略第二个参数，如果结合函数参数的默认值，，就可以省略第二个参数，这时就出现了双重默认值
function fetch(url,{body='',method='get'}={}){
console.log(method,body)
}
fetch('baidu.com',{body:'yu',method:'post'})
设置函数默认值，不设置解析异构默认值
function f1({x,y}={y:4,x:8})
设置函数默认值为空，设置解析异构默认值
function f2({x=5,y=9}={})
这两种方式是有区别的
--------------------------------------------------------------------------------
作用域
如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则一样的，即先是当前函数的作用域，然后才是全局作用域
var x=1
function f(x,y=x){
 console.log(y)
}
f(5)//5
还有一种调用
let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f()
let x=1;
function f(y=x){
let x=2;
console.log(y)//1
}
？？这个不太懂
var x = 1;

function foo(x = x) {
  // ...
}

foo() 
在参数里面的变量以及函数的作用域是函数作用域
应用参数默认值，可以指定某一个参数不能省略，如果省略就抛出一个错误
function throw( ){
throw new Error('fsd')
}
function foo(mustExist=throw()){
return mustExist;
}
foo()
自定义参数是函数时，函数不是在定义时执行，而是在执行是再执行
另外，还可以在参数默认值设置为undefined表明该参数是可以省略的
function foo(optional=undefined){}
--------------------------------------------------------------------------------
rest 参数  形式为 '...values' 用于获取函数的多余参数，这样就不需要arguments对象了， 是一个数组，利用rest参数可以传入任意长度的参数
注意，也是一个浅拷贝
foo(a,...values)  此时传入foo(8,4,5) 则此时values中保留的是[4,5]
但是rest参数后面不能再有其他参数： foo(a,...values,b)  会报错 values Instanceof Array => true
两种区别：在函数定义时形参数中的...nums 是rest参数。表示把形参 组合为一个数组。
另一个是：在函数调用时实参中的add(...nums) 表示把nums数组做rest的逆运算。
有了rest的逆运算（把数组变为逗号分隔的参数列表），就不需要apply了：比如：

或者Math.max也可以使用
合并数组:a=[3,2];b=[4,5] [...a,...b] => 得到：[3,2,4,5]
转换nodelist为真正的数组：a=nodelist; ab=[...nodelist] 即可用作用于nodelist上面。（原因：nodelist实现了iratator接口）
--------------------------------------------------------------------------------
扩展运算符
rest运算的逆运算，将数组里的值转变为以点分割的  ...[2,3,4] =>2,3,4
...[] 是在讲数组变为参数，
[...document.querySelectorAll('div')]  将
--------------------------------------------------------------------------------
数组变为数组
使用：
var numbers=[45,32]
function add(x,y){return x+y}
add(...numbers)
call
method.call(null,arg1,arg2...)
method.apply(null,array)
es6的写法
function x(a,b,c){}
var arr=[5,43,2]
x(...arr)
求一个数组的最大值
arr=[6,7,45]
Math.max(...arr);
以前使用apply
强两个数组合并？
Array.prototype.push.apply(arr1,arr2)
es6的写法： arr1=[0,2,1];arr2=[4,5,6]; arr1.push(...arr2)
扩展运算符的运用
[5,4].cancat(array)
es6:
[4,3,...array]
合并数组：
[...arr1,...arr2,...arr3]
解析异构
es5:
a=list[0];rest=list.slice(1)
es6:
[a,...rest]=list
字符串：
扩展字符串还可以将字符串转化为真正的数组
[...'hello']
--------------------------------------------------------------------------------
箭头函数
允许使用=>定义函数
如果箭头函数的代码块部分多于 一条语句，使用大括号括起来
大括号
如果函数不需要参数或者需要多个参数，则使用异构圆括号代表参数部分
var f=()=>5;
var sum=(num1,num2)=>num1+num2
如果代码块多于一条语句，就要使用大括号括起来，病使用return'语句返回
注意：箭头函数的this 对象，就是定义时所在的对象，而不是使用时；比如setTimeout里面定义一个箭头函数，则内部的this绑定setTimeout运行时  本来setTimeout内部的this指向运行时的环境 。（全局环境） 箭头函数的特性 好处：利于封装回调
--------------------------------------------------------------------------------
箭头函数的注意点
函数体内的this对象，是定义时的对象，而不是使用时所在的对象；
不可以当做构造函数来使用
不可以使用arguments对象
不能使用yuiled 命令
--------------------------------------------------------------------------------
属性的简介表示法
var foo='bar'
var k={foo} =>{foo:''bar}
es6允许在对象之中，只写属性名，不写属性值，属性值等于属性名所代表的变量值。
function f(x,y){
return {x,y}
}
等价于
function f(x,y){
return {x:x,y:y}
}
--------------------------------------------------------------------------------
方法的简写：
var o={
method()	{
return 'hello'
}
}
等价于：
var o={
method:functon(){
}
}

用于返回值：
function getPoint(){
var x=1;
var y=4;
return {x,y}
}
getPoint() => {x:1,y:4}
注意：简洁写法的属性名总是字符串
如果某个方法 的值是一个generator函数，前面需要加上*号
var obj={
* m(){

}
}
--------------------------------------------------------------------------------
属性名表达式
let propKey='name'
let a={
[propKey]:true,
['a'+'bc']:123
}
取值：
a['abc'] 或者a[propKey] 或者 a['name']
表达式也可以定义方法名：
let obj={
['a'+'bc'](){
return 'ui'
}
}
obj.abc()
注意：属性名表达式不能与简写法同时使用，会报错
foo='4';baz={[foo]}//error
baz={[foo]:'name'}
相当于以前 只能用于取属性值的a['na'+'me（'] 现在可以用于定义属性了
--------------------------------------------------------------------------------
方法的name属性
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
console.log(doSomething.bind().name )// "get firstName"
--------------------------------------------------------------------------------
Object.is()
相等运算符==  会自动转换数据类型
=== NaN不等于自身，+0===-0
Object.is() 行为与===类似  修复了原来 的+0===-0 与NaN的bug，变得是对的
--------------------------------------------------------------------------------
Object.assign(obj-a,obj-b,obj-c)
会把源对象（obg-b,obj-c）里的属性复制到obj-a中，相当于$.extend 当源对象不能被转化为有效对象时，会忽略，字符串会被转换为对象数组，然后拷贝到目标对象中，此时改变了目标对象。但是此时实现的是浅拷贝，即拷贝后b={data:{istrue:false}} 现在a也拥有一个data属性，现在b.data.istrue=true; 则a.data.istue也变了
处理字符串时，会先将其转换为数组，然后再进行拷贝
'abc' =>  {0:'a',1:'b',2:'c'}   然后将其拷贝到目标对象中。
使用：
克隆对象：(注意如果传的的对象的话那么是引用传递)
function clone(obj){
return  Object.assign({},obj)
}

合并多个对象：
const merge=
 (target,...rest)=>Object.assign(target,...rest)
可以合并所有病返回一个对象
const merge =
(...rest)=>Object.assign({},...rest)
--------------------------------------------------------------------------------
Object.values()
返回一个数组，成员是参数对象自身的所有课遍历属性的值
--------------------------------------------------------------------------------
扩展运算符(...)
用于去除参数对象的所有课遍历属性，病拷贝到当前对象里面
let a={a:1,b:5}
let n={...a}
--------------------------------------------------------------------------------
symbol  引入：为了保证每个属性的名字都是独一无二的
它是一种新的数据类型，symbol值通过Symbol函数生成
let s=Symbol() 此时的s是独一无二的，
typeof s  ==='symbol'  返回true
并且可以给symbol函数传入一个字符串参数，在控制台就有了区分
不能把symbol类型与其他进行运算,会报错
但是symbol类型可以显式转化为字符串
let s=Symbol('test')
s.toString()  => 'Symbol(test)'
symbol还可以转换为布尔值，不能进行数值运算
--------------------------------------------------------------------------------
作为属性值的symbol
var mykey=Symbol()
var a={}
a[mykey]='test'
a[mykey]
注意symbol作为属性运算时，不能使用点运算符 
列子：
my=Symbol()
var a={}
a.my='name';
a[my] //undefined
a['my']//'name'
注意：上面a[my]为什么会报错？ 因为赋值时 点运算符后面的总是字符串，所以不会
使用symbol作为属性值
var a={}
s=Symbol()
a[s]='test'
a[s]//'test'
或者：
var a={
[s]:'hello'
}
--------------------------------------------------------------------------------
在函数内部，使用symbol定义属性时，symbol参数必须放在[]里面，
如果不放在方括号内部，则不是s指向的symbol，而 是s字符串
b={
[s]:function(){
  return 1
},
s(){
  return 's'
}
}
比如上面的 定义了一个s属性的方法，与一个symbol类型的属性名，
b[s]()  //1
b.s()  //'s'

更简洁的写法：
b={
[s](){
  return 1
},
s(){
  return 's'
}
}
--------------------------------------------------------------------------------
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
--------------------------------------------------------------------------------
消除魔术字符串
？ 在代码中多次出现，与代码形成强耦合的某一个具体的字符串或者数值。不利于将来的维护
比如
function getArea(shape, options) {
  var area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
如何消除？？使用变量
var shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
其实shapeType.triangle 等于哪个值不重要，只要确保不会和其他shapeType冲突即可
故很适合采用Sympol值
var shapeType={
triangle:Symbol()
}

--------------------------------------------------------------------------------
遍历
symbol作为属性名，不会出现在for in循环中
但是可以通过对象的该方法返回一个数组，里面的值为sybol的变量值
Object.getOwnPropertySymbols(a)
该方法与Object.getOwnPropertyNames(obj) 对应。该方法以数组形式返回普通方法的属性名
Reflect.onKeys() 返回所有类型的键名
由于symbol作为属性名时，不会被常规方法遍历到，所以可以定义非私有，又不希望使用在内部的方法


--------------------------------------------------------------------------------
set
es6提供了新的数据结构，类似于数组，但是成员的值都是唯一的，没有重复值
//定义set数据结构
s=new Set();
[4,3,2,3,3,2].map((a)=>s.add(a))
编译之后
s = new Set();
[4, 3, 2, 3, 3, 2].map(function (a) {
	return s.add(a);
});
结果[4,3,2]
set 函数可以接受一个数组作为参数用来初始化（注意是数组）
var set = new Set([1, 2, 3, 4, 4]); //[...set]==[1,2,3,4]
去除数组中的重复项：
[...new Set(array)]
set内部判断两个值是否相等，使用的是精确相等，好比=== 
两个对象总是不等的 
可以用于存储字段 以前是使用数组 看下有没有
--------------------------------------------------------------------------------
set实例的方法
操作方法：
--add(value) 添加某个值，先检查是否与已有的相等，在添加，返回set结构本身
--delete(value) 删除某个值，返回布尔值
--has(value) 是否有某个值
--clear()  删除所有成员，没有返回值
map ：是可以把一个对象作为key的数据结构。
区别：相同点：set 和map每个元素是不重复的；都有size方法
不同点：set可以转换为数组 Array.from(set);还能对数组去重；map有set get has clear 方法
--------------------------------------------------------------------------------
判断包含一个键
// 对象的写法
var properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
var properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}
使用场景：比如 以前数组里面存储点的信息。为了方便后面点击点时查找对应点的信息，
--------------------------------------------------------------------------------
遍历操作
遍历器 ：产生原因 ：有4中数据结构 :array,object,Set,Map;要提供一种统一的接口来访问他们
遍历器内部指针 记住一定要从0开始
iterator迭代过程：有一个内部指针：有一个next方法，为何返回时有一个done属性 只有一个api，不知道遍历是否结束 故提供了它。
--------------------------------------------------------------------------------
promise 
是一个构造函数，promise新建后会立即运行
是异步编程的一种解决方案，promise是一个容器，里面保存着，某个未来才会结束的事件（异步操作），promise提供了统一的API，各种异步操作都可以使用同样的方法进行处理。
promise对象有3个状态  pending，resolved（已经完成），rejected（已经失败）。只有异步操作的结果可以改变当前的状态，任何其他操作都无法改变。一但状态改变，就不会再变然后为promise添加状态，会立即达到结果
注意then方法指定的回调函数，只有在当前脚本所有同步任务执行完毕之后才会执行
如果p2的resolve的参数是一个异步操作p1时，那么p1的状态决定了p2的状态，
因为p2返回的是p1，然后then变成了针对后者，
Promise.protoType.then
为promise实例添加改变状态时的回调函数，如果then返回的是一个新的promise对象，则可以采用链式写法，等该返回的promise内部的状态改变后才会执行新的then
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
promise.prototype.catch方法是.then(null,rejection)的别名，用于指定发生错误时的回调函数，
可以捕捉异步操作发生的错误，或者then方法指定的回调函数发生错误时也会被它捕捉到
一般来说，不要在then里定义reject的回调函数，总是使用catch来捕获。
加入内部报错的话，并且没有catch的话，则运行后没有任何输出
catch方法返回的也是一个promise，故后面还可以接着调用then
在resolve后面再抛出错误是无效的
promise对象的错误是冒泡的，会一直往后面传，直到被捕获为止
promise.all([p1,p2,p3]) 将多个promise实例包装成一个新的promise对象，假如p1不是promise对象，就会调用promise.resolve()将参数转为promise
p的状态有几种情况决定
当几者都为fulfilled时，p才会变为fulfilled，
当一个出现rejected时，p马上会变成rejected，此时第一个被rejected的实例的返回值，就会被传递给p的回调函数
将现有对象转换为promise对象，promise.resolve()方法可以起到该作用
--------------------------------------------------------------------------------
异步操作和sync函数
回调函数
当出现多个回调函数时，会造成嵌套，代码会横向发展，乱成一团，成为回调函数噩梦
现在读文件可以这样了  最后使用catch捕捉错误
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});
generator函数
协程：
先执行a任务，a执行到一半，暂停，执行权交给协程b，一段时间后，b交还控制权，a护肤执行。（a就是异步任务）
比如下面的：
function *asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
asyncJob是一个协程，奥妙在于yield命令,表示执行到此处，执行权转交给其他协程，yield是异步两个阶段的分界线。协程遇见yield命令就暂停	，等到控制权返回，再从暂停的地方继续执行。写法类似于
--------------------------------------------------------------------------------
遍历器
set map arr默认具有[Symbol.iterator]方法，供for of 消费。 其他对象没有该属性，故需要先部署该方法，才能被for of遍历
--------------------------------------------------------------------------------
同步
generator函数就是协程在es6的实现
是一个状态机，封装了多个内部状态。执行时会返回一个遍历器对象，除了是一个状态机还是一个遍历器对象生成函数
--------------------------------------------------------------------------------
class 
es6的class只是es5的一个构造函数的一层包装  函数的许多特性都被class继承  比如name
static 声明的可以理解为 类的静态方法，可以理解为es5里面添加到构造函数上面的method。
symbol 每一个时都说不一样的
Symbol.for('sie')解决的问题 ：如何获取前面一个相同的symbol 有的话就拿前面一个 否则新建一个（在全局环境中查找）建立时会被登记在全局环境中方便以后进行查找 而Symbol('f')则不会进行登记
Symbol是window下面的一个方法 
内置的symbol
class iseven{
[Symbol.hasInstance](ins){
console.log(ins);
  return ins%2==1?false:true;

}

} 
当调用instanceof 时 自动执行类内部的Symbol.hasInstance方法 并且传入instanceof左边的运算符，返回true 或者false

this是调用了父级 相当于 委托继承。
v既是k6的实例 也是isevenfn1的实例
实质：k6的原型是后者 k6.prototype==isevenfn1  isevenfn1  原型上面有这些方法。
extends 的继承机制:  class A extends B 
则a = new A()； A.prototype==B true;
A.prototype.__proto__==B.prototype;
先继承 constructor里面的属性是a的自有属性  使用super实现继承时，会绑定子级的this到父级	
extends 只需要A具有一个prototype的属性

super  
只能使用在constructor中 其他地方会报错
作为函数调用时，相当于 B.prototype.constructor.apply(this,arguments); 即执行父级的构造函数，所以父级的自身属性成为了子类的自身属性
super内部的this指向的是 正在执行的 比如new A() 指向的是A;
作为对象时（此时不可以不在constructor内部调用） 指向父级的prototype 可以这样来调用父级方法 注意（实例属性无法访问）此时相当于是执行super.print.apply(this,arguments);
--------------------------------------------------------------------------------
尾调用：
？：函数式编程的一个概念。指定某个函数的最后一步操作（所以不一定是最后一步）是调用另一个函数
function f(a){
return g(a+1)
}

尾调用优化： 函数f调用g时，只保留内部函数的调用帧。如果所有函数都是尾调用，完全可以每次执行时，调用帧只有一个，这将大大减少内存，：什么时候可以：只有尾调用的函数不再使用到外层函数的内部变量，内层函数的调用栈才可以取代外层的调用栈。否则无法进行优化：
function outer(a){
var one=90;
function inner(b){
return b+one;
}
return inner(a);
}

尾递归：
如果尾调用调用自身，称为尾递归。递归很耗费内存
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) 
执行时会保存n的信息。 待最后返回时才一个一个返回计算。性能差
由于上面最后的不是尾递归。要使用到外层的n，所以不能优化。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) 
原理：不需要再保存上一轮信息
function f(x){
return g(x)+1;//会保存+1 这条信息 无法优化
}
点：递归就是一种循环。而所有循环都可以使用递归来实现，使用递归使用尾递归。
# es6模块
解问题：
- 统一了服务器端和客户端的模块化方案，
- 并且可以静态编译时就可以确定依赖关系，和输入输出的变量(而seajs等只能在运行时才能确定依赖)

---
和一般模块化的区别：
- 平时的是先生成一个对象，在从对象上加载方法，故是运行时加载，因为只有运行时才能获取到该对象。无法编译优化
- es6 通过exports显示指定输出的代码。再通过import导入代码
```
// ES6模块

```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```
上面是先运行fs这个模块，生成一个_fs对象，然后从这个对象上面读取3个方法，这是运行时加载，因为只有运行时才能得到这个对象，导致无法在编译时做静态优化。
import { stat, exists, readFile } from 'fs';
```
事实上是从fs中加载3个方法，其他方法不加载，这种加载称为编译时加载，即es6在编译时就完成了 模块加载，效率很高

注意 大括号里面import的 必须和export导出的变量明一致
模块导入导出时都可以使用{name as new_name}来重新命名

```
import { lastName as surname } from './profile';
```
后面的from指定模块文件的位置，可以是相对的 也可以是绝对的。.js可以忽略。如果是模块名，必须配置
import有提升作用，会被提升到顶部   先执行模块中的函数，再导入：实质是编译时执行import。在代码运行之前。因为是静态执行，不能from 变量

---

import可以执行所加载的模块，

```
import 'loadash'
```
多次重复该语句 只会执行一次
```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
export default 可以为模块指定默认输出


```
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
导出时可以指定任意名字
import ab from "./components/a.vue"

数组的方法：

#### promise

```
a=function(time,fn){

return new Promise(function(resolve,reject){
//异步或者同步代码
setTimeout(function(){
//执行完毕时 resolve 函数  把promise的状态从pending变为resolved，并且传出参数
    resolve ( fn() );

},time);
});

}
```
then 接受两个参数，第一个是状态变为resolved时调用，第二个是变为rejected时调用
第一个then的返回值会被传到第二个里面
```
b=a(3000,function(){console.log(1);return {status:'ok'}}).then(function(s){
    console.log(s);
    return s.status;
},
function(s){
    console.log(s);;
    alert('fail')}).then(
    function(s){
    console.log(s)
    }
    )
```
then返回的是一个新的promise对象

异步函数：

```
async function ab(time){

	    var timeout=function(){
	    	return new Promise(function(resolve,reject){
	    		setTimeout(function(){
	    			resolve({
		    		  url:'page.php?limit=20&pge=2'
		    		});
	    		},time);
	    	})
			   

	    };

	    var urlobj=await timeout();
	    return urlobj.url
	    }
```
调用

```
 ab(3000).then(
		    		function(res){
		    			console.log(res)
		    		}
	    		)
```
async内部会返回一个promise对象，并且async内部return 返回的值会成为then方法回调函数的参数。


