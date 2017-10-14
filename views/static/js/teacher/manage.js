define(["jquery","utils","template","form"],function($,utils,template){
	// //实现添加教师的功能
	// $(".teacher-add .btn-addinfo").click(function(){
	// 	$("#teacher-info").ajaxSubmit({
	// 		url:"/api/teacher/add",
	// 		type:"post",
	// 		success:function(data){
	// 			console.log(data);
	// 		}
	// 	})
	// })

	console.log(utils.getQueryObject());
	var id=utils.getId("tc_id");
	var data={};

	if (id) {
		data.url= "/api/teacher/update";
		data.title="讲师编辑";
		data.button="save";
		$.ajax({
			url:"/api/teacher/edit",
			data:{
				tc_id:id
			},
			success:function(msg){
				console.log(msg);
				// $("#checkout_info_list").html(template("teacher_list_tpltwo",data.result));
				data.teacher=msg.result;
				$("#teacher-manage").html(template("editor-info-tpl",data));
			}
		})
	}else{
		data.title = "讲师添加";
        data.buttonText = "添 加";
        data.url = "/api/teacher/add";
        data.teacher = {};
        console.log()
        $("#teacher-manage").html(template("editor-info-tpl",data));
	}

})