define(['jquery','template','utils','ckeditor','bootstrap','form'],function($,template,utils,CKEDITOR){
	$(function(){
		//一开始用url截取地址工具获取数据 ajax
		var id=utils.getId("cs_id");
		// console.log(id);
		$.ajax({
            url: "/api/course/lesson",
            data: {cs_id: id},
            success: function(data){
            	console.log(data);
                if(data.code == 200){
                    var html = template("course_add_step3_tplone", data.result);
                    $(".steps").html(html);
                }
            }
        });
       $(".steps").on("click",".add_btn,.editor_btn",function(){
       		// alert(1);
       		var data={};
       		var ct_id=$(this).data("ct_id");
       		console.log(ct_id);
       		if (!ct_id) {
       			//添加课程信息
       			data.title="添加课时";
	        	data.buttonText="添加";
	        	data.url="/api/course/chapter/add";
	        	$("#chapterModal").modal("show");
	        	var html=template("course_add_step3_tplthree",data);
	        	$(".modal-content").html(html);
	        	$('.modal-content').on("submit","#lessons-form",function(){
	        		// alert(1);
	        		$(this).ajaxSubmit({
	        			data:{
	        				ct_cs_id:id,
	        				ct_is_free: $("#isfree").is(":checked")? "1": "0"
	        			},
	        			success(msg_one){
	        				console.log(msg_one);
	        				if (msg_one.code==200) {
	        					$("#chapterModal").modal("hide");
	        					$.ajax({
	        						url: "/api/course/lesson",
	        						data:{
	        							cs_id: id
	        						},
	        						success(msg_two){
	        							if(msg_two.code == 200){
                    					var html = template("course_add_step3_tpltwo", msg_two.result);
                    					$(".lessons>.list-unstyled").html(html);
                }
	        						}
	        					})
	        				}
	        				
	        			}
	        		})
	        		return false;
	        	})
       		}else{
       			// 编辑课程
       			data.title="编辑课时";
	        	data.buttonText="保存";
	        	data.url="/api/course/chapter/modify";
	        	$("#chapterModal").modal("show");
	        	$.ajax({
	        		url: "/api/course/chapter/edit",
                    data: {ct_id: ct_id},
                    success(msg_one){
                    	console.log(msg_one);
                    	if (msg_one.code==200) {
                    		$.extend(data, msg_one.result);
                    	var html=template("course_add_step3_tplthree",data);
	        			$(".modal-content").html(html);	
                    	}
                    }
	        	});
	        	$('.modal-content').on("submit","#lessons-form",function(){
	        		$(this).ajaxSubmit({
	        			data:{
	        				ct_cs_id:id,
	        				ct_is_free: $("#isfree").is(":checked")? "1": "0"
	        			},
	        			success(msg_one){
	        				console.log(msg_one);
	        				if (msg_one.code==200) {
	        					$("#chapterModal").modal("hide");
	        					$.ajax({
	        						url: "/api/course/lesson",
	        						data:{
	        							cs_id: id
	        						},
	        						success(msg_two){
	        							if(msg_two.code == 200){
                    					var html = template("course_add_step3_tpltwo", msg_two.result);
                    					$(".lessons>.list-unstyled").html(html);
                }
	        						}
	        					})
	        				}
	        			}


	        		});
	        		return false;
	        	})
	        	
       		}
       })
  
		
	})
		
})

