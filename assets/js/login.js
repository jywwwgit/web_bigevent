$(function () {
    // 点击 “去注册账号” 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 “去登录” 账号的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify自定义校验规则
    form.verify({
        // 自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验两次密码是否是一致的规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        //使用ajax请求接口
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 使用ajax请求接口
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // jquery里快速拿到表单里的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token)
                // 将得到的字符串保存在localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到登录后的页面
                location.href = '/index.html'
            }
        })
    })
})