define(["jquery","template","bootstrap"],function($,template){
	$(function(){
		//设置template过滤器
	template.defaults.imports.getage=function(value){
		return new Date().getFullYear()-new Date(value).getFullYear();
	}
	//发送ajax请求请求老师数据
	$.ajax({
		url:"/api/teacher",
		type:"get",
		datatype:"JSON",
		success:function(data){
			console.log(data);
			if (data.code==200) {
				var html=template("teacher_list_tplone",data);
				$("#teacher-list").html(html);
			}
		}
	})

	// 给查看按钮注册绑定事件
	$("#teacher-list").on("click",".checkinfo",function(){
		//获取当前按钮的data-id属性值
		var id=$(this).parent().data("id");
		//打开模态框
		$("#teacherModal").modal("toggle");
		$.ajax({
			url:"/api/teacher/view",
			data:{
				tc_id:id
			},
			success:function(data){
				console.log(data);
				$("#checkout_info_list").html(template("teacher_list_tpltwo",data.result));
				
			}
		})

	})
	//给启用/注销按钮绑定事件
	// tc_status==1   按钮:启用  状态:已注销
	// tc_status==0   按钮:注销  状态:已启用
	$("#teacher-list").on("click",".status",function(){
		var status=$(this).parent().data("status");
		var id=$(this).parent().data("id");
		var that=$(this);
		//发送ajax请求进行启用与注销的切换
		$.ajax({
			url:"/api//teacher/handle",
			data:{
				tc_id:id,
				tc_status:status
			},
			success:function(data){
				console.log(data);
				if (data.code==200) {
					that.parent().data("status",data.result.tc_status);
					console.log(that.parent().data("status"));
					var temp=that.parent().data("status");
					temp?that.removeClass("btn-warning").addClass("btn-success"):that.removeClass("btn-success").addClass("btn-warning");
					temp?that.html("启 用"):that.html("注 销");
				}
				
				
			}
		})
	})
	})
	
})