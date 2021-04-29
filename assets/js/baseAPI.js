
//每次调用get或post或ajax的时候会先调用这个函数
$.ajaxPrefilter(function (options) {
    // Modify options, control originalOptions, store jqXHR, etc 
    // console.log(options.url);
    //拼接请求根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1)
        options.headers = {
            headers: {
                Authorization: localStorage.getItem('token') || ''
            }
        }
    //全局统一挂载complete回调函数
    options.complete = function (res) {

        //在complete回调函数中能使用res.responsejson拿到服务器的响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！")
            // 1.强制清空token
            localStorage.removeItem('token')
        //2.跳转到登陆页面
        location.href = ('/login.html')

    }
});

