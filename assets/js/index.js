$(function () {
    //调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    //用户退出
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        layer.confirm('确定退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清除本地token
            localStorage.removeItem('token')
            //2.跳到登陆页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index);
        });
    })
})



//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象

        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        complete: function (res) {
            //在complete回调函数中能使用res.responsejson拿到服务器的响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！")
                // 1.强制清空token
                localStorage.removeItem('token')
            //2.跳转到登陆页面
            location.href = ('/login.html')
        }


    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username

    //渲染欢迎的文本
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)

    //渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        //渲染文本对象
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

