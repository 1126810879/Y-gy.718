$(function () {
    getUserInfo();
    var layer = layui.layer;
    //图片头像  文字头像
    //获取用户信息成功后调用渲染头像大的函数
    function getUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            //请求头配置对象
            header: {
                Authorization: window.localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                //调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            },
        });
    }

    //渲染用户的头像的函数
    function renderAvatar(user) {
        // 1.获取用户的头像信息
        var name = user.nickname || user.username
        // 2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }

    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //1.清空本地存储中的token
            localStorage.removeItem('token');
            //2.重新跳转到登录页面
            location.href = '/mylogin.html'
            //关闭confirm询问框
            layer.close(index);
        })
    })


})