<template>
    <div class="panel-group">

        <div class='card-panel' @click="toWallet()">
            <div class="text">
              <div>我的钱包</div>
              <p>￥{{courseMsg.cash}}</p>
            </div>
            <div class="log1 log"></div>
        </div>
        
        <div class="card-panel">
           <div class="text">
            <div>课程总数</div>
            <p>{{courseMsg.course_num}}</p>
          </div>
          <div class="log2 log"></div>
        </div>
    
        <div class="card-panel">
          <div class="text">
            <div>学员总数</div>
            <p>{{courseMsg.students_num}}</p>
          </div>
          <div class="log3 log"></div>
        </div>

        <div class="card-panel">
           <div class="text">
            <div>老师总数</div>
            <p>{{courseMsg.teacher_num}}</p>
          </div> 
          <div class="log4 log"></div>
        </div>

    </div>
</template>

<script>
import { getAgentInfo } from "../../../api";
export default {
  name: "",
  data() {
    return {
      courseMsg: {}
    };
  },
  created() {
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    console.log(this.$store.state.token, 1111);
    getAgentInfo({ seqid, c_id }).then(res => {
      this.courseMsg = res.data.data;
      console.log(this.courseMsg, "getAgentInfo");
    });
  },
  methods: {
    toWallet() {
      console.log(111);
      this.$router.push("layout/wallet");
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return ($px / $rem) + rem;
}

.panel-group {
  display: flex;
  // justify-content:space-between;
  margin-bottom: px2rem(40);
  .card-panel {
    width: px2rem(264);
    height: 1rem;
    margin-right: px2rem(25);
    padding-top: px2rem(20);
    cursor: pointer;
    font-size: 14px;
    // position: relative;
    // overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    .text {
      padding-left: px2rem(19);
      div {
        color: #999;
      }
      p {
        color: #333;
        font-size: 24px;
        margin-top: 0.16rem;
      }
    }
    .log {
      margin-right: px2rem(20);
      width: px2rem(60);
      height: px2rem(60);
    }
    .log1 {
      background: url("../../../assets/wallet.png") no-repeat center center;
    }
    .log2 {
      background: url("../../../assets/teachers.png") no-repeat center center;
    }
    .log3 {
      background: url("../../../assets/students.png") no-repeat center center;
    }
    .log4 {
      background: url("../../../assets/course.png") no-repeat center center;
    }
  }
  .card-panel:last-child {
    margin-right: 0;
  }
}
</style>