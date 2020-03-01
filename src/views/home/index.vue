<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 顶部容器 -->
    <el-header style="padding:0;height:60px">
      <layout-header></layout-header>
    </el-header>
    <!-- 内容容器 -->
    <el-container>
      <!-- 左侧容器 -->
      <el-aside style="width:200px">
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 主要内容容器 -->
      <el-main style="margin:0;padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'home',
  // 注册组件
  components: {

  }
}
</script>
