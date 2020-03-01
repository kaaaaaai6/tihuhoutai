<template>
  <div class="layout-aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item>话题管理</el-menu-item>
        <el-menu-item index="/home/book">图书管理</el-menu-item>
        <el-menu-item>试题管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
    .layout-aside {
        width: 200px;
        height: 100%;
        // border-right: 1px solid #ccc;
        .el-menu-vertical-demo {
          border: 0;
        }
    }
</style>
