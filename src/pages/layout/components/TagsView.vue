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
            <div class="notice-box" v-for="(o,index) in 4" :key='index'>
              <!-- <span></span> -->
              <span>刘晓阳报名了“中考英语冲...</span>
            </div>
            <p>查看全部通知>></p>
          </div>

        </el-popover>

        <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <div slot="reference" class="box">
            <span class="msg"></span>
          </div>
        </el-popover>

        <span class="user">
          英孚教育
        </span>

    </div>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";

export default {
  name: "TagsView",
  components: { ScrollPane },
  data() {
    return {
        input:''
    }
  },
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;

  @return ($px / $rem) + rem;
}
.tags-view-container {
  padding:0 px2rem(48) 0 0.4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-top: px2rem(8);
  height: 0.3rem;
  line-height: 0.3rem;
  &>span{
    margin-right: 0.19rem;
  }
  .input-box{
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
  input{
    margin-right:0.6rem;
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
    vertical-align:middle;    
    background:#ccc;
  }
}
  .notice-box{
     border-bottom: 1px solid #eee;
    span:first-child::before{
      content: " ";
      vertical-align:middle;
      display: inline-block;
      height: px2rem(26);
      width: px2rem(26);
      background:  url("../../../assets/notice-box.png") no-repeat center center;
    }
    span{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
</style>