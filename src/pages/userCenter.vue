<template>
    <div class="userCenter-wrapper">
        <div class="background">
            <img :src="`/api/getImageUrl/${courseMsg.avatarUrl}/big`" alt="">
        </div> 
        <div class="msg-box clearfix">
            <p class="title">msg-box
                <img src="../assets/edit.png" alt="" v-if="courseMsg.courseMsg = '已认证'">
                <img src="../assets/edit2.png" alt="" v-else>
            </p>
            <div class="info">
                <div class="info-left">
                    <p>机构名称：<span>Education First</span> </p>
                    <p>授课范围：<span>英语、日语、法语</span> </p>
                    <p>执照编码：<span>01234567898765463210</span> </p>
                    <p>教学地址：<span>武汉市 汉阳区 鹦鹉大道 天下名企汇1018</span> </p>
                </div>
                <div class="info-right">
                    <p>联系人：<span>萧亚轩</span> </p>
                    <p>电话号码：<span>133 3333 3333</span> </p>
                    <p>我的邮箱：<span>123456789@163.com</span> </p>
                    <p>注册地址：<span>武汉市 汉阳区 鹦鹉大道 天下名企汇1018</span> </p>
                </div>
            </div>

            <router-link to="/layout/editUserInfo">
                <div class="Authentication"  v-if="courseMsg.courseMsg != '1已认证'"> 您还未认证，去认证>></div>
            </router-link>

            <div class="layout">
                <p class="msg-title">
                    首页布局设置
                </p>
                <div>学员人数曲线图：
                    <span @click="showCharts({type:'line',has:true})" :class="$store.state.hasCharts.line?'themeColor':''">显示</span>
                    <span @click="showCharts({type:'line',has:false})" :class="$store.state.hasCharts.line==false?'themeColor':''">隐藏</span>
                </div>
                <div>学员人数分部图：
                    <span @click="showCharts({type:'pie',has:true})" :class="$store.state.hasCharts.pie?'themeColor':''">显示</span>
                    <span @click="showCharts({type:'pie',has:false})" :class="$store.state.hasCharts.pie==false?'themeColor':''">隐藏</span>
                </div>
            </div>

            <div class="qrCode">
                <p class="msg-title">
                    我的二维码
                    <img src="../assets/refresh.png" alt="" class="refresh">
                </p>
                <img src="" alt="" class="qrCode-img">
            </div>
        </div>


    </div>
</template>

<script>
import { getAgentInfo } from "../api";
import { mapMutations } from 'vuex'
export default {
  name: "userCenter",
  data() {
      return {
          courseMsg: {}
      }
  },
  created() {
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    console.log(this.$store.state.token, 1111);
    getAgentInfo({ seqid, c_id }).then(res => {
      this.courseMsg = res.data.data;
      console.log(res, "getAgentInfo");
    });
  },
  methods: {
      ...mapMutations(['showCharts']),
  },
};
</script>

<style scoped lang="scss">
.userCenter-wrapper {
  font-size: 16px;
  height: 9.6rem;
  .background {
    width: 100%;
    height: 2rem;
    background: url('../assets/img_bg@2x.png') no-repeat;
    background-size: cover;
    position: relative;
    img {
      position: absolute;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      bottom: -0.5rem;
      left: calc(50% - 0.5rem);
      background-color: hotpink;
      clear: both;
    }
  }
  .msg-box {
    height: 7.6rem;
    padding: 0 0.6rem;
    background-color: #fff;
    text-align: center;
    .msg-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.2rem;
      &::before {
        content: " ";
        height: 0.12rem;
        width: 0.12rem;
        margin-right: 0.08rem;
        display: inline-block;
        vertical-align: middle;
        background: url("../assets/in-icon2.png") no-repeat;
        background-size: 100%;
      }
    }
    .title {
      margin-top: 0.67rem;
      font-size: 20px;
      font-weight: bold;
      img{
        vertical-align: middle;
      }
    }
    .info {
      width: 9.4rem;
      padding: 0 0 0 1.8rem;
      margin-right: 0;
      display: flex;
      justify-content: space-between;
      p {
        text-align: left;
        margin-bottom: 0.24rem;
        color: #333;
        font-weight: bold;
        span {
          color: #666;
          font-weight: 500;
        }
      }
    }
    .Authentication {
      text-align: right;
      color: #ff9900;
      font-size: 14px;
      font-weight: 400;
      padding-bottom: 0.08rem;
      border-bottom: 1px solid #eee;
    }
    .layout {
      padding: 0 0 0 1.8rem;
      text-align: left;
      border-bottom: 1px solid #eee;
      div{
          margin-bottom: 0.2rem;
          span{
              margin-left: 0.21rem;
          }
      }
      div:last-child{
          margin-bottom: 0.32rem;
      }
    }
    .qrCode {
      padding: 0 0 0 1.8rem;
      text-align: left;
      .refresh{
        vertical-align: middle;
        margin-left:0.72rem;
      }
      .qrCode-img {
        display: block;
        width: 2rem;
        height: 2rem;
        background-color: #ccc;
      }
    }
  }
}
</style>