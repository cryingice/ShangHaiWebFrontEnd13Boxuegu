define(["jquery","utils","template","form","datepicker","datepickerCN","validate"],function($,utils,template){
	$(function(){
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
		data.bt="save";
		$.ajax({
			url:"/api/teacher/edit",
			data:{
				tc_id:id
			},
			success:function(msg){
				console.log(msg);
				// $("#checkout_info_list").html(template("teacher_list_tpltwo",data.result));
				data.teacher=msg.result;
				render();
			}
		})
	}else{
		data.title = "讲师添加";
        data.bt = "添 加";
        data.url = "/api/teacher/add";
        data.teacher = {};
        console.log()
        render();
	}
	//提取一个渲染函数
	function render(){
		$("#teacher-manage").html(template("editor-info-tpl",data));
		$("input[name='tc_join_date']").datepicker({
			format: "yyyy-mm-dd",
			autoclose: true,
    		language: "zh-CN"
		});
		//使用表单验证插件对表单进行验证
		$("#teacher-info").validate({

			description:{
				username:{
					required:"用户名不能为空",
					conditional:"用户名不能是'前端学院'",
					valid:"用户名正确"
				},
				password:{
					required:"密码不能为空",
					valid:"密码正确",
					pattern:"至少6位,可用字符:0~9,a~z,A~Z,_"
				},
				tc_join_date:{
					required:"日期不能为空",
					valid:"日期格式正确"
				}
			},
			sendForm:false,
			onBlur:true,
			onChange:true,
			conditional:{
				forbidden:function(value){
					return value!="前端学院"
				}
			},

		
			eachValidField:function(){
				// console.log(1);
				// console.log(this.parent().parent().children(":last-child"));
				this.parent().addClass("has-success").removeClass("has-error")
				.parent().children().eq(2).css("color","green");

			},
			eachInvalidField:function(){
				// console.log(2);
				this.parent().addClass("has-error").removeClass("has-success")
				.parent().children().eq(2).css("color","red");
			},
			valid:function(){
				//通过表单验证后通过button提交按钮提交表单,form里已有地址,this指向form表单
				this.ajaxSubmit({
					success:function(data){
						if (data.code==200) {
							location.href="/teacher/list";
						}
					}
				})
			}

		})

	};
	//表单提交
	// $(".teacher").on("submit","form",function(){
	// 	// alert(1);
		
	// 	$(this).ajaxSubmit({
	// 	type:"post",
	// 	success:function(data){
	// 		// console.log(data);
	// 		if (data.code==200) {
	// 			location.href="/teacher/list";
	// 		}
			
	// 	}
	// })
	// 	return false;
	// })
	})
	
	

})