


(function(global,factory){
  if (typeof define === 'function' && define.amd) { //AMD requirejs
        define([],function() {
            return factory(global);
        });
    } else if (typeof module !== 'undefined' && module.exports) { //CMD  seajs
        module.exports = factory(global);
    } else { //正常状态
        global.LazyMan = factory( global);
    }
}(typeof window !== 'undefined' ? window : this,function(window){

	function _LazyMan(name){
		this.tasks=[];
		var self=this;
		var fn=(function(n){
			var name=n;
			return function(){
				console.log('Hi! This is '+name+'!');
				self.next();
			}
		})(name);
		// 先存入
		this.tasks.push(fn);
		// 执行
		setTimeout(function(){
			self.next();
		},0);
	}

	_LazyMan.prototype.next=function(){
		var fn=this.tasks.shift();
		fn&&fn();
	}
	//执行一个函数(是异步 并且需要一定时间)并且需要在异步完成之后callback中主动调用 next()方法,
	//否则不继续往下执行

	_LazyMan.prototype.delay_excute=function(func){
		var self=this;
		var fn=(function(name){
			return function(){
				console.log('delay excute '+'~');
				func.call(self);
			}
		})(name);
		this.tasks.push(fn);
		return this;
		
	};
	_LazyMan.prototype.excute=function(func){
		var self=this;
		var fn=(function(name){
			return function(){
				console.log('excute '+'~');
				func();
				self.next();
			}
		})(name);
		this.tasks.push(fn);
		return this;
	}
	_LazyMan.prototype.sleep=function(time){
		var self=this;
		var fn=(function(time){
			return function(){
				setTimeout(function(){
					console.log('Wake up after '+time+'s!');
					self.next();
				},time*1000);
			}
		})(time);
		this.tasks.push(fn);
		return this;
	}
	_LazyMan.prototype.sleepFirst=function(time){
		var self=this;
		var fn=(function(time){
			return function(){
				setTimeout(function(){
					console.log('Wake up after '+time+'s!');
					self.next();
				},time*1000);
			}
		})(time);
		this.tasks.unshift(fn);
		return this;
	}
	//封装
	function LazyMan(name){
		return new _LazyMan(name);
	}

	return LazyMan;

}))