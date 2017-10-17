define(['jquery','form'],function($){
	$(function(){
		//添加课程
		$('form').submit(function(){
					$(this).ajaxSubmit({
					success(data){
						console.log(data);
						if (data.code==200) {
							location.href="/course/course_add_step1?cs_id="+data.result.cs_id;
						}
					},
				})
			})	
		})
		
})