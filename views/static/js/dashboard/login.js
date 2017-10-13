define(["jquery","cookie","form"],function($){
	$(function(){
            // 获取表单元素,为表单注册一个提交事件
            $("form").submit(function(e){
                 e.preventDefault();
                //如果表单选项为空则重新弹出警示框
                if($("input[type='text']").val().trim()==''||$("input[type='password']").val().trim()==''){
                    alert("用户名和密码不能为空");
                }else{
                // var data=$(this).serialize();
                // console.log(data);
                // console.log(typeof(data));
	                $(this).ajaxSubmit({
	                	type:"post",
	                	url:"/api/login",
	                	success:function(data){
		                		if (data.code==200) {
		                            //在cookie里面储存登录头像和登录名
		                            // console.log(data.result);
		                            // console.log(JSON.stringify(data.result));
		                            $.cookie("userinfo",JSON.stringify(data.result),{path:'/',expires:300});
		                            //跳转首页
		                            location.href="/";
		                	}
	                	}
	                })
                }
                
                
            })
        })
})