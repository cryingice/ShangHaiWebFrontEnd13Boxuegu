define(["jquery", "template", "utils", "uploadify","Jcrop","form"], function($, template, utils){
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
                            // $("#upload-btn-button").css({"line-height":"1.5"});
                        }
                    });
                    //jq更改上传图片按钮字样行高
                    $("#upload-btn-button").css("line-height", 1.5);

                    //截取图片 Jcrop插件 crop-btn点击事件
                    $("#crop-btn").click(function(){
                    	var status=$(this).data("type");
                    	if (status=="crop") {
                    		$(".preview>img").Jcrop({
                    		 setSelect: [0, 0, 200, 200],
                    		 aspectRatio: 2,
                             boxWidth: 400	
                    	}, function(){
                                jcrop_api = this;
                                var thumb = jcrop_api.initComponent('Thumbnailer', {width: 240, height: 120,container:".thumb"});
                            });
                            $(this).data("type","save");
                            $(this).text("保存");
                             $(".preview").on("cropstart cropmove cropend", function(e, s, c){
		                        $("input[name='x']").val(c.x);
		                        $("input[name='y']").val(c.y);
		                        $("input[name='w']").val(c.w);
		                        $("input[name='h']").val(c.h);
                    		});
                    	}else{
                    		//当需要保存图片时
                    		$("form").ajaxSubmit({
                    			url: "/api/course/update/picture",
                    			type:"post",
                    			data:{
                    				cs_id:id
                    			},
                    			success(msgone){
                    				if (msgone.code==200) {
                    					 location.href = "/course/course_add_step3?cs_id=" + msgone.result.cs_id;
                    				}
                    			}
                    		})
                    	}
                    	
                    })
                    
				}
				
			}

		});
		
		
		})
		
})