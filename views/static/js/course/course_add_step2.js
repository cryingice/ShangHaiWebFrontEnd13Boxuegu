define(["jquery", "template", "utils", "uploadify"], function($, template, utils){
	$(function(){
		//一开始用url截取地址工具获取数据 ajax
		var id=utils.getId("cs_id");
		// console.log(cs_id);
		$.ajax({
			url:"/api/course/picture",
			data:{
				cs_id:id
			},
			success(data){
				console.log(data);
				if (data.code==200) {
					var html=template("course_add_step2_tplone",data.result);
					$('.steps').html(html);	
					//给选择图片按钮，加载uploadify插件
					$("#upload-btn").uploadify({
                        swf: "/views/assets/uploadify/uploadify.swf",
                        uploader: "/api/uploader/cover",
                        fileObjName: "cs_cover_original",
                        buttonText: "选择图片",
                        buttonClass: "btn btn-success btn-sm",
                        itemTemplate: "<p></p>",
                        width: 70,
                        height: 30,
                        formData: {cs_id: id},
                        onUploadSuccess: function(file, data, response){
                            data = JSON.parse(data);
                            if(data.code == 200){
                                console.log(data);
                                //上传图片成功之后，需要将后台返回的图片的地址
                                //赋值给页面中原图标签
                                $(".preview>img").attr("src", data.result.path);

                                //将裁切按钮设置为启用状态
                                $("#crop-btn").prop("disabled", false);
                            }
                        }
                    });
				}
				
			}

		});
		
		
		})
		
})