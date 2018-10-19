<template>
    <div class="infoBox-wrapper">
        <div class="info-main">
            
            <p class="msg-title">
                <span v-if="type == 'notice'"> 我的通知（总计 <span>260</span> 条）</span>
                <span v-if="type == 'msg'">我的消息（总计 <span>260</span> 条）</span>
            </p>
            <div class="msg-box" v-for="o in getWebUserNotification">

                <div class="data">{{o.date}}</div>

                <div class="detail-card">
                    <div class="card-content">
                        <!-- <p>课程内容：理论知识</p>
                        <p>课程要点：1、讲解起源及发展趋势
                        2、增强学员对舞蹈知识的储备
                        </p>
                        <p>课程内容：理论知识</p> -->
                        <p v-for="msg in o.data">{{msg.content}}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { getWebUserNotification } from '../api';

export default {
  name: "infoBox",
  props:['type'],
  data() {
    return {
      getWebUserNotification: [],
      msgBox:[]
    }
  },
  created(){
    console.log(this.type)
    if(this.type == 'notice'){
      const seqid = Date.parse(new Date());
      let c_id = this.$store.state.c_id;
      getWebUserNotification({seqid,c_id}).then(res=>{
        this.getWebUserNotification = res.data.list;
        console.log( this.getWebUserNotification, ' this.getWebUserNotification')
      })
    }
  }
};
</script>

<style scoped lang="scss">
.infoBox-wrapper {
  font-size: 16px;
  .info-main {
    width: 100%;
    height: 8.54rem;
    padding: 0.8rem 0.6rem 0 ;
    background-color: #fff;
    .msg-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.53rem;
      span{
          color:#FF9900;
      }
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
    .msg-box{
        display: flex;
        .data{
            margin-right: 0.44rem;
        }
        .detail-card {
            width: 100%;
            margin-bottom: 0.4rem;
            border-bottom: 1px solid #eee;
        .card-content {
          border-left: 1px solid #eee;
          padding-left: 0.13rem;
          p {
            position: relative;
            margin-bottom: 0.3rem;
          }
          p:first-child {
            margin-top: 0;
          }
          p:last-child {
            margin-bottom: 0.2rem;
          }
          p::before {
            content: "";
            display: inline-block;
            position: absolute;
            left: calc(-0.13rem - 4px);
            top: calc(50% - 4px);
            height: 8px;
            width: 8px;
            border-radius: 50%;
            vertical-align: middle;
            background: #ccc;
          }
          p:first-child::before {
            background: #fcb322;
          }
          p:nth-child(2)::before {
            background: #8da5ff;
          }
          p:nth-child(3)::before {
            background: #e06186;
          }
        }
        .card-pic {
          img {
            width: 0.9rem;
            height: 0.9rem;
            display: inline-block;
            background-color: #ccc;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>