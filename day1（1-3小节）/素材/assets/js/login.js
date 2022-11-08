$(function(){
    $("#link_reg").on('click',function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click',function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })
    let layer = layui.layer
    // 自定义校验规则
    let form = layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
              return '两次密码不一致!'
            }
          }
    })
    // 监听注册表单事件
    $('#reg_form').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',
        {username:$('#reg_form  [name=username]').val(),
        password:$('#reg_form [name=password]').val()},
        function(res){
            if(res.status!==0){
               return layer.alert('注册失败')    
            }
            layer.alert('注册成功')
            $('#link_login').click()        
        })
    })
    // 监听登录表单事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert('登录失败') 
                }
               layer.alert('登录成功')
              
               localStorage.setItem('token',res.token)
               location.href = './index.html'
            }

        })
    })
})