$(function () {
    var form = layui.form;
    //设置校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须大于6小于12'],
        samPwd: function (value) {
            if (value == $('[name=oldPwd').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {

            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致!!'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码更新失败')
                }
                layui.layer.msg('密码更新成功')
                //重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})