window.a=require("./a.js");
window.b=require("./b.js");
var p={name:'d'}
console.log('d');


setTimeout(function(){
	console.log( require("./a.js").get() );
},4000)