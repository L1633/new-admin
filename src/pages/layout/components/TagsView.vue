<template>
    <div class="tags-view-container">
     
        <div class="input-box">
          <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
        </div>

        <el-popover
          placement="top-start"
          title="你有2条未读通知"
          width="230"
          trigger="hover">
          <div slot="reference" class="box">
            <span class="notice"></span>
          </div>
          <div>
            <div class="notice-box" v-for="(o,index) in notification" :key='index'>
              <!-- <span></span> -->
              <span>{{o.title}}</span>
            </div>

            <router-link to="/layout/info/notice">
              <p class="check">查看全部通知>></p>
            </router-link>

          </div>

        </el-popover>

        <el-popover
          placement="top-start"
          title="标题"
          width="230"
          trigger="hover">
          <div slot="reference" class="box">
            <span class="msg"></span>
          </div>
          <div>
            <div class="msg-box" v-for="(o,index) in 7" :key='index'>
              <img src="../../../assets/notice-box.png" alt="">
              <div class="friend-msg">
                <p>xxx</p>
                <p>刘晓阳报名了“中考英语冲...</p>
              </div>
            </div>

            <router-link to="/layout/info/msg">
              <p class="check">查看全部消息>></p>
            </router-link>
            
          </div>
        </el-popover>

        <router-link to='/layout/userCenter'>
          <span class="user">
            英孚教育
          </span>
        </router-link>

    </div>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";
import { getWebUserNotification } from '../../../api';
export default { 
  name: "TagsView",
  components: { ScrollPane },
  data() {
    return {
      input: "",
      notification:[]
    };
  },
  created(){
    const seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getWebUserNotification({seqid,c_id}).then(res=>{
      console.log(res,'getWebUserNotification1111111')
      this.notification = res.data.list;
    })
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return ($px / $rem) + rem;
}
.tags-view-container {
  padding: 0 px2rem(48) 0 0.4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-top: px2rem(8);
  height: 0.3rem;
  line-height: 0.3rem;
  & > span {
    margin-right: 0.19rem;
  }
  .input-box {
    margin-right: 0.3rem;
    height: 0.3rem;
  }
  .el-button {
    padding: 0;
  }
  .box {
    display: inline-block;
    height: px2rem(30);
    width: px2rem(30);
    // background-color: #fff;
  }
  input {
    margin-right: 0.6rem;
  }
  .notice::before {
    content: " ";
    display: inline-block;
    height: px2rem(30);
    width: px2rem(30);
    background: url("../../../assets/notice.png") no-repeat center center;
  }
  .msg::before {
    content: " ";
    display: inline-block;
    height: px2rem(30);
    width: px2rem(30);
    background: url("../../../assets/msg.png") no-repeat center center;
  }
  .user::before {
    content: " ";
    display: inline-block;
    height: px2rem(24);
    width: px2rem(24);
    border-radius: 50%;
    vertical-align: middle;
    background: #ccc;
  }
}
.notice-box {
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span:first-child::before {
    content: " ";
    vertical-align: middle;
    display: inline-block;
    height: px2rem(26);
    width: px2rem(26);
    background: url("../../../assets/notice-box.png") no-repeat center center;
  }
  // span {
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }
}

.msg-box {
  border-bottom: 1px solid #eee;
  display: flex;

  img {
    width: 0.26rem;
    height: 0.26rem;
    display: block;
    vertical-align: middle;
    margin-right:0.05rem;
  }
  .friend-msg {
    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.check{
  text-align: right;
}
</style>