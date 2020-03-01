<template>
    <!-- 最外层用el-card卡片做成页面 -->
  <el-card class="book" v-loading="loading">
      <!-- 插槽内容 => 标题 -->
      <bread-crumb slot="header">
        <!-- 面包屑组件的具名插槽 -->
        <template slot="title">
            图书管理
        </template>
      </bread-crumb>
      <!-- 搜索工具栏 -->
      <el-form>
        <el-form-item label="审核状态：">
          <el-radio-group @change="changeAuditType" v-model="searchForm.auditType">
            <el-radio :label="2">未审核</el-radio>
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="3">审核拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="昵称搜索：">
          <el-input
          @change="changeAuditType"
          v-model="input"
          placeholder="请输入要查询的昵称"
          clearable
          style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="分享时间：">
          <el-date-picker
            @change="changeAuditType"
            v-model="searchForm.createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核时间：">
          <el-date-picker
            @change="changeAuditType"
            v-model="searchForm.auditTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 数据列表 -->
      <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="110">
      </el-table-column>
      <el-table-column
        prop="subjectVo.bookId"
        label="图书ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="isSee"
        label="是否匿名"
        width="110">
      </el-table-column>
      <el-table-column
        prop="auditType"
        label="审核状态"
        width="110">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="分享时间"
        width="240">
      </el-table-column>
      <el-table-column
        prop="auditTime"
        label="审核时间"
        width="240">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="goContent(scope.$index)" type="text" size="small">查看</el-button>
          <!-- <el-button type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination
      @current-change="changeCurrent"
      :current-page="page.current"
      :page-size="page.size"
      :total="page.total"
      background
      layout="prev, pager, next">
      </el-pagination>
    </el-row>
    <div class="footer">
      <p>审核状态： 1-审核通过 2-待审核 3-审核不通过</p>
      <p>匿名状态： 1-显示 0-匿名</p>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      nickName: '', // 昵称
      shareCode: '', // 分享code
      input: '',
      loading: false,
      list: [],
      page: {
        current: 1, // 当前页码
        size: 10, // 每页条数
        total: 0 // 总条数
      },
      // 搜索框表单
      searchForm: {
        auditType: '',
        createTime: [],
        auditTime: []
      }
    }
  },
  methods: {
    // 跳转到内容详情页
    goContent (index) {
      this.shareCode = this.list[index].shareCode
      this.nickName = this.list[index].nickName
      console.log(this.shareCode)
      this.$router.push(`/home/bookCont/${this.shareCode}/${this.nickName}`)
    },
    // 按状态查询列表
    changeAuditType () {
      this.getBookShare()
    },
    // 更改页数
    changeCurrent (newPage) {
      this.page.current = newPage
      this.getBookShare()
    },
    // 获取分享列表
    getBookShare () {
      this.loading = true
      // const token = window.localStorage.getItem('token')
      this.$axios({
        url: '/subject/share/list',
        method: 'post',
        // headers: { token: token },
        data: {
          current: this.page.current,
          size: this.page.size,
          auditType: this.searchForm.auditType,
          createStartTime: this.searchForm.createTime.length > 0 ? this.searchForm.createTime[0] : null,
          createEndTime: this.searchForm.createTime.length > 1 ? this.searchForm.createTime[1] : null,
          auditStarTime: this.searchForm.auditTime.length > 0 ? this.searchForm.createTime[0] : null,
          auditEndTime: this.searchForm.auditTime.length > 1 ? this.searchForm.createTime[1] : null,
          nickName: this.input
        }
      }).then(result => {
        console.log(result)
        this.loading = false
        this.list = result.data.records
        this.page.total = result.data.total
      })
    }
  },
  created () {
    this.getBookShare()
  }
}
</script>

<style lang='less' scoped>
  .footer {
    p {
      font-size: 14px;
      color: #ff0000;
    }
  }
</style>
