/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {
	//获取到的对象{
	//  id:1,loaded:true,exports:{},其中 a指向exports 所以默认exports为{}对象
	//}
	module.exports=43
	console.log(exports)
	window.a=__webpack_require__(1);
	window.b=__webpack_require__(2);
	var p={name:'d'}
	console.log('d');

/***/ },
/* 1 */
/***/ function(module, exports) {

	var p={name:'a'}
	console.log('a');

/***/ },
/* 2 */
/***/ function(module, exports) {

	var p={name:'b'}
	console.log('b');

/***/ }
/******/ ]);

/*执行机理

installedModules 执行过程中一直都是在闭包内部的顶级作用域里面，不会被释放。
在背部写入到module.exports后，然后 返回该模块，其他模块可以读取

(function(module){
	installedModules={}；

})([
  function(module,exports){
	

  },
  function(module,exports){
  

  },
])


*/