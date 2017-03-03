
window.a=require("./a.js");
var p={name:'b'}
console.log('b');


setTimeout(function(){
	require("./a.js").set("78");
},3000)