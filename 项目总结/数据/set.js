var Set=function(){
	this.dataStore=[];
}

Set.prototype={
	constructor:Set,
	add:function(data){
		if(this.dataStore.indexOf(data)){
			this.dataStore.push(data);
			return true;
		}else{
			return false;
		}
	},
	contains:function(data){
		if(this.dataStore.indexOf(data)){
					return true;
				}else{
					return false;
				}
	},
	remove:function remove(data) {
		var pos = this.dataStore.indexOf(data);
		if (pos > -1) {
			this.dataStore.splice(pos,1);
			return true;
		} else {
			return false;
		}
	},
	union:function(set){
		var tempSet = new Set();
		for (var i = 0; i < this.dataStore.length; ++i) {
			tempSet.add(this.dataStore[i]);
		} 
		for (var i = 0; i < set.dataStore.length; ++i) {
			if (!tempSet.contains(set.dataStore[i])) {
				tempSet.dataStore.push(set.dataStore[i]);
			}
		} 
		return tempSet;
	},
	intersect:function(set){
		var tempSet=new Set();
		for(var i=0; i<this.dataStore.length;i++){
			if(set.contains(this.dataStore[i])){
				tempSet.add(this.dataStore[i]);
			}
		}
	},
	subset:function(set){

	},
	size:function(){
		return this.dataStore.length;
	},
	show:function(){
		return this.dataStore;
	}
}