/*var align=require("align-text");

var fs=require("fs");

var str=fs.readFileSync("./slide.html","utf-8");

format_str=align(str,function centerAlign(len, longest, line, lines) {
  return Math.floor((longest - len) / 2);
});

fs.writeFile('./resut.html',format_str,function(err){
        if(err) throw err;
        console.log('has finished');
    });
*/

/*var convert = require('convert-source-map');

var json = convert
  .fromComment('//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vLmpzIiwic291cmNlcyI6WyJjb25zb2xlLmxvZyhcImhpXCIpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiYmJiIiwic291cmNlUm9vdCI6Ii8ifQ==')
  .setProperty('sourceRoot', "/ab")
  .toJSON();
var json=convert.fromObject({name:23});
  console.log(json)*/

/*var glob = require("glob")

// options is optional
glob("*.html", {}, function (er, files) {
  console.log(files);
})*/

/*var mkdirp=require("mkdirp");

mkdirp("js/a",{},function(err,made){
	console.log(made)
})*/

// 获取输入

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);