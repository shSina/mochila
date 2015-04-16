var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(val){
	if(Array.isArray(val)){
		for(var i = val.length - 1; i >= 0; i--) {	
			val[i] = ObjectId(val[i]);
		};
		return val;
	}else{
		return ObjectId(val);
	}
}