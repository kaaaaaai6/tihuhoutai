<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="center">
      <!-- 左侧盒子 -->
      <el-col :span="20">
          <span class="title">题乎后台管理系统</span>
      </el-col>
      <!-- 右侧盒子 -->
      <el-col class="right" :span="4">
          <el-dropdown trigger="click" @command='handleMenuItem'>
              <span class="el-dropdown-link">
                  管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="account">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    // 点击菜单项触发事件
    handleMenuItem (command) {
      if (command === 'account') {
        // 个人信息
      } else {
        // 退出登录
        //     1.发送退出请求
        //     2.清除缓存
        //     3.跳转到登录页
        this.$axios({
          url: '/logout_UnRelease',
          method: 'post'
        })
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
        line-height: 60px;
        background-image: linear-gradient(to right,#2aa3b9,#57d6b6);
        padding: 0 20px;
        .title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: 1px;
        }
        .right {
            padding-left: 100px;
            .el-dropdown-link {
              color: #ffffff;
            }
        }
    }
</style>
