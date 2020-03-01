<template>
  <el-card class="bookCont">
      <!-- 插槽内容 => 标题 -->
      <bread-crumb slot="header">
        <!-- 面包屑组件的具名插槽 -->
        <template slot="title">
            回答详情
        </template>
      </bread-crumb>
      <!-- 昵称 -->
      <div class="nickName">
        <span>回答人(昵称):</span>
        <span>{{this.nickName}}</span>
      </div>
      <!-- 文字 -->
      <div class="content">
        <p>文字:</p>
        <div class="cont">{{this.content}}</div>
      </div>
      <!-- 视频 -->
      <div class="video">
        <p>视频:</p>
        <div class="videoCont">
          <video :src="videoSrc"></video>
        </div>
      </div>
      <!-- 图片 -->
      <div class="img">
        <p>图片:</p>
        <div class="imgCont">
          <ul>
            <li
            v-for="(img,imgIndex) in imgSrc"
            :key="imgIndex">
              <img :src="img" >
            </li>
          </ul>
        </div>
      </div>
      <!-- 音频 -->
      <div class="audio">
        <p>音频:</p>
        <div class="audioCont">
          <ul>
            <li v-for="(audio,audioIndex) in imgSrc" :key="audioIndex">
              <audio :src="audio"></audio>
            </li>
          </ul>
        </div>
      </div>
      <!-- 表单 -->
      <el-form class="el-form" ref="searchForm" :model="searchForm" :rules="ruleForm">
        <el-form-item prop="auditType">
          <el-radio-group @change="changeType" v-model="searchForm.auditType">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="3">审核拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="toAudit">确定</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      shareCode: '', // 分享code
      nickName: '', // 昵称
      content: '', // 文字内容
      videoSrc: '', // 视频路径
      imgSrc: [], // 图片路径
      audioSrc: [], // 音频路径
      // 表单
      searchForm: {
        auditType: ''
      },
      // 表单规则
      ruleForm: {
        auditType: [{
          required: true,
          message: '请选择审核状态'
        }]
      }
    }
  },
  methods: {
    // 审核表单
    toAudit () {
      // 表单验证是否选了单选框
      this.$refs.searchForm.validate(isOk => {
        // 验证通过则发送请求，并跳转到图书管理页面
        if (isOk) {
          this.$axios({
            url: '/subject/updateAuditType',
            method: 'post',
            data: {
              shareCodeStr: this.shareCode,
              auditType: this.searchForm.auditType
            }
          }).then(result => {
            console.log(result)
            this.$router.push('/home/book')
          })
        } else {
          alert('请选择审核状态')
        }
      })
    },
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    // 获取详细内容
    getBookCont () {
      this.$axios({
        url: '/subject/shareInfo',
        method: 'post',
        data: {
          shareCode: this.shareCode
        }
      }).then(result => {
        this.content = result.data.content
        const cont = result.data.re
        // 遍历资源列表，分别放入不同的数组以供使用
        for (let i = 0; i < cont.length; i++) {
          if (cont[i].reType === 2) {
            this.imgSrc.push(cont[i].rePath)
          } else if (cont[i].reType === 3) {
            this.audioSrc.push(cont[i].rePath)
          } else {
            this.videoSrc = cont[i].rePath
          }
        }
      })
    }
  },
  created () {
    // 获取参数shareCode和nickName
    this.shareCode = this.$route.params.shareCode
    this.nickName = this.$route.params.nickName
    console.log(this.$route.params)
    // 加载数据
    this.getBookCont()
  }
}
</script>

<style lang='less' scoped>
  .bookCont {
    padding: 10px;
    font-size: 14px;
    // 昵称内容
    .nickName {
      span {
        margin-right: 20px;
      }
    }
    // 文字内容
    .content {
      margin-top: 30px;
      p {
        display: inline-block;
        margin-right: 20px;
      }
      .cont {
        border: 1px solid #000;
        display: inline-block;
        padding: 10px;
        min-width: 90%;
        min-height: 30px;
      }
    }
    // 视频内容
    .video {
      margin-top: 10px;
      p {
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
      }
      .videoCont {
        border: 1px solid #000;
        display: inline-block;
        padding: 10px;
        min-width: 90%;
          video {
            width: 500px;
            height: 350px;
          }
        // min-height: 30px;
      }
    }
    // 图片内容
    .img {
      margin-top: 10px;
      p {
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
      }
      .imgCont {
        border: 1px solid #000;
        display: inline-block;
        padding: 10px;
        min-width: 90%;
        margin-top: 10px;
        ul{
          li {
            display: inline-block;
            width: 300px;
            height: 180px;
            margin-right: 20px;

            img {
              width: 300px;
              height: 180px;
              vertical-align: middle;
              border-radius: 10px;
            }
          }
        }
        // min-height: 30px;
      }
    }
    // 音频内容
    .audio {
      margin-top: 10px;
      p {
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
      }
      .audioCont {
        border: 1px solid #000;
        display: inline-block;
        padding: 10px;
        min-width: 90%;
        margin-top: 10px;
        min-height: 40px;
        ul {
          li {
            margin-bottom: 10px;
          }
        }
      }
    }
    // 表单
    .el-form {
      text-align: center;
    }
  }
</style>
