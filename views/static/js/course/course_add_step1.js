define(['jquery','template','utils','ckeditor','form'],function($,template,utils,CKEDITOR){
	$(function(){
		//一开始用url截取地址工具获取数据 ajax
		var id=utils.getId("cs_id");
		// console.log(cs_id);
		$.ajax({
			url:"/api/course/basic",
			data:{
				cs_id:id
			},
			success(data){
				console.log(data);
				if (data.code==200) {
					var html=template("course_add_step1_tplone",data.result);
					$('.steps').html(html);	
								//ckeditor 个人简述添加富文本
					// CKEDITOR.replace("cs_brief");	
					CKEDITOR.replace("cs_brief");
				}
				
			}

		});
			
			$('.steps').on('submit','form',function(){
				$(this).ajaxSubmit({
					//附加一个数据cs_id
					data:{
						cs_id:id
					},
					success(data){
						console.log(data);
						location.href='/course/course_add_step2?cs_id='+data.result.cs_id;
					}
				})
				return false;
			});
		
		})
		
})