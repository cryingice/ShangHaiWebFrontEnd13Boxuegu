define(function(){
	return{
		getQueryObject:function(){						
			var info=location.search.slice(1).split("&");
			// console.log(info+"--info");
			var result={};
			for (var i = 0; i < info.length; i++) {
				var tmp=info[i].split("=");
				result[tmp[0]]=tmp[1];
			}
			return result;
		},
		getId:function(value){
			return this.getQueryObject()[value];
		}
	}
})