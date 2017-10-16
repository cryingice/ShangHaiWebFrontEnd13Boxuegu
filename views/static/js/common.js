	define(["jquery","template","nprogress","cookie"],function($,template,NProgress){
		//刚进页面进度条开始加载
		NProgress.start();
		$(function(){
			
			//ajax 全局变量
			$(document).ajaxSend(function(){
				NProgress.start();
				// console.log(1);
				$("#self_modal").show();
			});
			$(document).ajaxStop(function(){
				NProgress.done();
				$("#self_modal").hide();
				// console.log(2);
			});

			//静态页面加载完成进度条
			NProgress.done();
		//如果不是首页就可以添加以下模板代码
		if(location.pathname!='/dashboard/login'){
		//根据cookie信息判断是不是该返回登录页面
		if (!$.cookie("PHPSESSID")) {
			location.href="/dashboard/login";
		}
			var userinfo=$.cookie("userinfo");
			userinfo=JSON.parse(userinfo);
			// console.log(userinfo);
			$('#profile').html(template("profile-tplone",userinfo));

			// 点击退出
			$("#unload").click(function(){
				$.ajax({
					url:"/api/logout",
					type:"post",
					success:function(data){
						console.log(data);
						if (data.code==200) {
							location.href="/dashboard/login";
						}
					}
				})
			})

			//实现导航栏的效果
			$(".navs>.list-unstyled>li>ul").parent().click(function(){
				$(this).children('.list-unstyled').slideToggle();
			});
			var activeA=$(".navs>.list-unstyled a[href='"+location.pathname+"']");
			activeA.addClass("active");			
			
			// $(".navs>.list-unstyled>li>ul>li>a.active").parent().parent().show();
			// 下面第二种方式
			if (activeA.parent().parent().siblings("a").length>0) {
				activeA.parent().parent().show();
			}
			
		}
		

		})
		

})
	