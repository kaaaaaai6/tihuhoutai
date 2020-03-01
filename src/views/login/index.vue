<template>
    <div class="login">
        <!-- 内容 -->
        <el-card class="login_card">
            <div class="logo">
                题乎后台管理系统
                <img src="../../assets/img/aiwrap.png">
            </div>
            <!-- 表单组件 el-form表单容器 -->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form">
                <!-- 表单项 -->
                <el-form-item class="item" prop="userName">
                    <el-input class="input" v-model="loginForm.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item class="item" prop="password">
                    <el-input class="input" v-model="loginForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item class="item1">
                    <el-button @click="login" class="btn">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: '', // 帐号
        password: '' // 密码
      },
      //   定义rules校验规则
      loginRules: {
        //   校验用户名不能为空
        userName: [{
          required: true,
          message: '用户名不能为空'
        }],
        // 校验密码不能为空
        password: [{
          required: true,
          message: '密码不能为空'
        }]
      }
    }
  },
  methods: {
    //   表单校验事件
    login () {
      this.$refs.loginForm.validate(isOk => {
        // 如果验证成功，发送登录请求
        if (isOk) {
          this.$axios({
            url: '/login_UnRelease',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            // 缓存token
            window.localStorage.setItem('token', result.data.token)
            // 登录成功，编程式导航跳转到home页
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login {
        background: url(../../assets/img/bg.png);
        height: 100vh;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        // 内容
        .login_card {
            width: 340px;
            height: 340px;
            padding: 40px;
            overflow: visible;
            // logo标题
            .logo {
                width: 328px;
                height: 19px;
                color: #ffffff;
                background-color: #2aa3b9;
                padding: 18px 10px 18px 60px;
                margin: -10px 0 0 -80px;
                font-size: 14px;
                position: relative;
                img {
                    width: 18px;
                    height: 10px;
                    vertical-align: middle;
                    position: absolute;
                    left: 0;
                    bottom: -10px;
                }
            }
            // form表单
            .form {
                margin-top: 30px;
                margin-left: -20px;
                .item {
                    .input {
                        width: 330px;
                        height: 40px;
                        // padding: 0 16px;
                    }

                }
                .item1 {
                    .btn {
                        width: 330px;
                        height: 48px;
                        padding: 12px 24px;
                        color: #fff;
                        background-color: #2aa3b9;
                    }
                }
            }

        }
    }
</style>
