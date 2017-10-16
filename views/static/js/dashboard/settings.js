define(["jquery","ckeditor","template","uploadify","region","datepicker","datepickerCN","form"],function($,CKEDITOR,template){
	$(function(){
        //打开个人页面  ajax
        $.ajax({
            url:"/api/teacher/profile",
            success(data){
                console.log(data);
                var html=template("setting_info_tpl",data.result);
                $('.settings').html(html);
                loadPlugins();
            }
        })
        function loadPlugins(){
            // 1.图片上传插件
            $("#upfile").uploadify({
                swf:"/views/assets/uploadify/uploadify.swf",
                uploader:"/api/uploader/avatar",
                fileObjName:"tc_avatar",
                width:120,
                height:120,
                buttonText:"<p></p>",
                onUploadSuccess:function(file,data){
                    
                    data=JSON.parse(data);
                    if (data.code==200) {
                        console.log(data);
                        $('.preview>img').attr("src",data.result.path);
                        $('.preview>img').attr("height",120);
                    }
                }
            })

            //2.省市地区三级联动插件
            $(".form-horizontal .area").region({
                 url: "/views/assets/jquery-region/region.json"
            });
            //3.日期插件
            $("input[name='tc_join_date'],input[name='tc_birthday']").datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                language: "zh-CN"
            });
            //4.给个人介绍添加富文本插件
                CKEDITOR.replace("tc_introduce",{
                toolbarGroups: [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                { name: 'links' },
                { name: 'insert' },
                // { name: 'forms' },
                // { name: 'tools' },
                { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                // { name: 'others' },
               
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                // { name: 'styles' },
                // { name: 'colors' },
                // { name: 'about' }
            ]
        });

            //5.注册委托事件  ajaxform提交数据
            $(".body>.settings").on("submit",'.form-horizontal',function(){
                    $(this).ajaxSubmit({
                    type:"post",
                    success(data){
                        console.log(data);
                        if (data.code==200) {
                           location.href="/course/course_add_step2"; 
                        }
                        
                    }
                });
            return false; 
            })
           
        }
	})
})