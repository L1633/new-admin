<template>
    <div class="course-card">
            <div v-for=" course in courseList" :key="course.id" class="card-box" v-cloak>
                <el-card :body-style="{ padding: '0px'}" class="father">
                    <img :src="`/api/getImageUrl/${course.firstImg}/big`" class="image">
                    <span class="btn"></span>
                    <div style="padding: 0.2rem;">
                        <p>{{course.c_name}}</p>
                        <div class="message">
                            <span class="fl">老师：{{course.teacherName.join()}}</span>
                            <span class="fr">学费：{{course.totalFee===course.discFee?course.discFee:course.discFee}}/人</span>
                            <span class="fl">学员：{{course.signUpNum}} </span>
                            <span class="fr">课时：{{course.class_hour}}节</span>
                        </div>
                    </div>
                </el-card>
            </div>

            <div class="card-addbox">
                <el-card :body-style="{ padding: '0px'}" class="father">
                    <img src="../../assets/girl.png" class="image">
                    <router-link to='/layout/addcourse'>
                      <span class="btn" @click="addCourse"></span>
                    </router-link>
                </el-card>
            </div>

          <el-pagination
            background
            layout="prev, pager, next"
            :page-size= '7'
            :total= "total">
          </el-pagination>
    </div>
</template>

<script>
  import { getAgentCourseList } from '../../api';
export default {
  name: "myCourse",
  data() {
    return {
      courseList:[],
      total:''
    }
  },
  created(){
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getAgentCourseList({seqid,c_id,pSize:7}).then(res=>{
      this.courseList = res.data.list;
      this.total = res.data.totalPage;
      console.log(typeof(this.total))
    })
  },
  computed:{
   
  },
  methods: {
    addCourse() {
      console.log(11111)
    }
  },

};
</script>

<style scoped lang="scss">
  [v-cloak]{
    display: none;
  }
.course-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .card-box:nth-child(4n) .father {
    margin-right: 0;
  }
  .father {
    position: relative;
    font-size: 16px;
    width: 2.6rem;
    height: 4rem; //4.2
    margin: 0 0.2rem 0.5rem 0;
    img {
      width: 100%;
    }
    .btn::before {
      content: " ";
      position: absolute;
      top: 2.4rem;
      right: 0.2rem;
      height: 0.4rem;
      width: 0.4rem;
      border-radius: 50%;
      background: url("../../assets/right.png") no-repeat;
      background-size: 100%;
    }
    .message {
      span {
        font-size: 12px;
        display: block;
        width: 1rem;
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>