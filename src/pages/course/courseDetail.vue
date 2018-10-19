<template>
    <div class="course-detail">
        <div class="detail-title">
            <span @click="toMycourse()">我的课程</span>
            <span>课程详情</span>
        </div> 
        <div class="detail-main">

            <div class="detail-left">
                
                <router-link :to="`/layout/editCourse/${id}`">
                    <el-button plain class="fr">
                    编辑
                    </el-button>
                </router-link>
               
                <p>课程纪要</p>
                
                <div class="detail-card" v-for="item in courseTimeList">
                    <p>{{`${item.ct_name}  ${item.calc_time}   ${item.stime}`}}</p>
                    <div class="card-content">
                        <p>课程内容：{{item.content}}</p>
                        <p>课程要点：{{item.essentials}}
                        </p>
                        <p>课程任务：{{item.courseTask?item.courseTask.content :""}}</p>
                    </div>
                    <div class="card-pic" v-if="item.courseTask">
                        <img :src="`/api/getImageUrl/${imgsrc}/big`" alt="课程图片" v-for="(imgsrc,index) in item.courseTask.imgUrl" :key=index>
                    </div>
                </div>
               
            </div>

            <div class="detail-right">
                 <el-button plain class="fr">编辑</el-button>
                 <div class="right-content">
                    <div class="log">
                        <img :src="`/api/getImageUrl/${courseDetailMsg.firstImg}/big`" alt="">
                    </div>
                    <p class="title">{{courseDetailMsg.c_name}}</p>
                    <div class="msg">
                        <div>
                            <p>{{courseDetailMsg.evaluationNum || 0}}</p>
                            评论
                        </div>
                        <div>
                            <p>{{courseDetailMsg.class_hour}}</p>
                            课时
                        </div>
                        <div>
                            <p>{{courseDetailMsg.signUpNum}}</p>
                            学员
                        </div>
                        <div>
                            <p>{{courseDetailMsg.totalFee === courseDetailMsg.discFee? courseDetailMsg.totalFee : courseDetailMsg.discFee}}</p>
                            学费（元/人）
                        </div>
                    </div>
                    <div class="main-content">
                        <p>课程模式：{{teachingModel[courseDetailMsg.c_type]}}</p>
                        <p>授课老师：{{courseDetailMsg.teacherName? courseDetailMsg.teacherName.join() : ''}}</p>
                        <p>授课类型：{{courseDetailMsg.sort}}</p>
                        <p>上课时间：14:00~16:00</p>
                    </div>
                    <div class="course-desc">
                        <p>课程介绍</p>
                        <div class="notice-color">
                            {{courseDetailMsg.introduction}}
                        </div>
                    </div>
                    <div class="course-img">
                        <img :src="`/api/getImageUrl/${img}/big`" alt="" v-for=" (img,index) in courseDetailMsg.c_imgUrl" :key="index">
                    </div>
                 </div>

            </div>
        </div>
        <!-- img是返回给服务器的数组的key  imgUrl是加密显示的图片-->
    </div>
</template>

<script>
import { getAgentCourseTimeList, getAgentCourse } from "../../api";
export default {
  name: "courseDetail",
  props: ["id"],
  data() {
    return {
      courseTimeList: [],
      courseDetailMsg: {},
      teachingModel: ["正常模式", "拼课模式", " 老师上门"],
      c_name: ""
    };
  },
  created() {
    console.log(this.id);
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getAgentCourseTimeList({ seqid, c_id, ca_id: this.id }).then(res => {
      // console.log(res, "getAgentCourseTimeList");
      this.courseTimeList = res.data.list;
    });
    getAgentCourse({ seqid, c_id, ca_id: this.id }).then(res => {
      console.log(res.data.data, "getAgentCourse");
      this.courseDetailMsg = res.data.data;
      let c_name = this.courseDetailMsg.c_name;
    });
  },
  methods: {
    toMycourse() {
      this.$router.push("/layout/course");
    }
  }
};
</script>

<style scoped lang="scss">
.course-detail {
  font-size: 16px;
  .detail-title {
    margin-bottom: 0.1rem;
    span:first-child {
      color: #333;
    }
    span:last-child {
      color: #333;
      font-weight: bold;
      margin-left: 0.29rem;
      display: inline-block;
      padding-bottom: 0.06rem;
      border-bottom: 2px solid #ff9900;
    }
  }
  .detail-main {
    display: flex;
    justify-content: space-between;
    .detail-left {
      width: 6.9rem;
      height: 9.3rem;
      padding: 0.58rem 0.2rem 0 0.4rem;
      background-color: #fff;
      .detail-card {
        margin-bottom: 0.4rem;
        .card-content {
          border-left: 1px solid #eee;
          padding-left: 0.13rem;
          p {
            position: relative;
            margin-bottom: 0.3rem;
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
    .detail-right {
      width: 4.9rem;
      height: 9.3rem;
      background-color: #fff;
      padding: 0.2rem 0.2rem 0 0.4rem;
      .right-content {
        margin: 0.6rem auto;
        .log {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          margin: 0 auto;
          background-color: #ccc;
        }
        .title {
          text-align: center;
          margin: 0.19rem 0 0.4rem;
        }
        .msg {
          height: 0.8rem;
          padding: 0.2rem 0.19rem 0;
          //   line-height: 0.8rem;
          text-align: center;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          div {
            color: #999;
          }
          p {
            margin: 0 0 0.12rem;
            color: #333;
            font-size: 18px;
            font-weight: bold;
          }
        }
        .main-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-top: 0.3rem;
          p {
            margin: 0 0.8rem 0.2rem 0;
            font-weight: bold;
            color: #666;
          }
          p:nth-child(2n) {
            margin-right: 0;
          }
        }
        .course-desc {
          p {
            margin: 0 0 0.08rem;
            font-weight: bold;
            color: #666;
          }
          div {
            line-height: 22px;
          }
        }
        .course-img {
          margin-top: 0.6rem;
          img {
            display: inline-block;
            width: 1.9rem;
            height: 1.4rem;
            background-color: #ccc;
          }
          img:nth-child(2n + 1) {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>