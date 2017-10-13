	define(["jquery","template","cookie"],function($,template){
		$(function(){
		//如果不是首页就可以添加以下模板代码
		if(location.pathname!='/dashboard/login'){
		//根据cookie信息判断是不是该返回登录页面
		if (!$.cookie("PHPSESSID")) {
			location.href="/dashboard/login";
		}
			var userinfo=$.cookie("userinfo");
			userinfo=JSON.parse(userinfo);
			console.log(userinfo);
			$('#profile').html(template("profile-tplone",userinfo));

			// 点击退出
			$("#unload").click(function(){
				$.ajax({
					url:"api/logout",
					type:"post",
					success:function(data){
						console.log(data);
						if (data.code==200) {
							location.href="/dashboard/login";
						}
					}
				})
			})

		}

		
	})
	})
	