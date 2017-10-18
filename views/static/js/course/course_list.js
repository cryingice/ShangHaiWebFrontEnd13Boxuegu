define(["jquery","template"],function($,template){
	$(function(){
		//页面打开 ajax
		$.ajax({
			url:"/api/course",
			success:function(data){
				if (data.code==200) {
					console.log(data);
					var html=template("course_list_tpl",data);
					$(".body>.courses").html(html);
				}
			}
		})
	})	
})