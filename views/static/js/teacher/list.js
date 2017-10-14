define(["jquery","template","bootstrap"],function($,template){
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
})