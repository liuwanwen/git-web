$(function () {
    $('#login-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#login-box').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位,且不能输入空格"
        ],
        // 再次确认密码规则
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return "两次密码输入不一致！"
            }
        }
    });
    var layer = layui.layer;
    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功请登录')
                $("#login-box").click();
                $("#form_reg")[0].reset();
            }
        })
    });
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，登录成功");
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        })
    })
})