<template>
    <div class="course-card" :style="{top:`${positionTop}px`,left:`${positionLeft}px`,position:positionKind,display:displayFin}" @mouseover="changDisplay(true)" @mouseout="changDisplay(false)"> 
        <!-- ,display:displayKind -->
        <el-carousel indicator-position="none"  @change="handleChange($event)" ref="carousel">
            <el-carousel-item v-for="course in courseData" :key="course.id">

                <img :src="`/api/getImageUrl/${course.firstImg}/big`" alt="">
                <div class="item-msg Extra-notice-color">
                    <p>{{course.ca_name}}</p>
                    <div class="course-info Extra-notice-color">
                        <p>课时：{{course.curr_hour}}(共{{course.total_hour}})</p>
                        <p>老师：{{course.t_name}}</p>
                        <p>时间：{{course.stime}}</p>
                    </div>
                    <div> 
                       <span v-for="(classmate,index) in classmates" v-if="index!=0" class="classmate">{{classmate.user.name}}</span>
                       <!-- avatarUrl -->
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>  
</template>

<script>
import { getBabyCourseUsers } from "../../api";
export default {
  name: "courseInfo",
  created() {
    //   console.log(process.env.NODE_ENV)
    // console.log(this.positionInfo,'0009')
    // this.handleChange(0);
    // this.$refs.carousel.change();
    // if(this.courseData[0]){
    //     var seqid = Date.parse(new Date());
    //     let c_id = this.$store.state.c_id;
    //     getBabyCourseUsers({seqid,c_id,ca_id:this.courseData[0].ca_id}).then(res=>{
    //                 let result = res.data.list;
    //                 this.classmates = result;
    //                 console.log(result ,'sdsds ')
    //             })
    // }
    console.log(this.positionKind, "positionKind");
  },
  props: [
    "positionLeft",
    "positionTop",
    "positionC",
    "display",
    "cardData",
    "day"
  ],
  data() {
    return {
      top: this.positionTop,
      left: this.positionLeft,
      positionKind: this.positionC,
      displayKind: this.display,
      courseData: this.cardData,
      date: this.day,
      display2: "",
      displayFin: "",
      //   carouselIndex:[],
      classmates: []
    };
  },
  //   computed: {
  //     style () {
  //       return {

  //       }
  //     }
  //   },
  methods: {
    changDisplay(kind) {
      kind ? (this.display2 = true) : (this.display2 = false);
      console.log(this.display2, "changDisplay");
    },
    getClassMate(ca_id) {
      var seqid = Date.parse(new Date());
      let c_id = this.$store.state.c_id;
      getBabyCourseUsers({ seqid, c_id, ca_id }).then(res => {
        let result = response.data.list;
        this.classmates = result;
        console.log(result, "sdsds ");
      });

      // return result;
    },
    handleChange(e = 0) {
      if (!this.courseData[e]) return;
      // if( this.carouselIndex.includes(e)){
      //     this.classmates = [];
      //     return;
      // }
      this.classmates = [];
      // this.carouselIndex.push(e);
      // console.log(this.courseData[e].ca_id,e)
      // this.getClassMate(this.courseData[e].ca_id);
      var seqid = Date.parse(new Date());
      let c_id = this.$store.state.c_id;
      getBabyCourseUsers({ seqid, c_id, ca_id: this.courseData[e].ca_id }).then(
        res => {
          let result = res.data.list;
          this.classmates = result;
          // console.log(result ,'sdsds')
        }
      );
      // getBabyCourseUsers({ca_id:17}).then(res=>{
      //     console.log(res)
      // })
    }
  },
  watch: {
    positionLeft() {
      this.left = this.positionLeft;
      // console.log(`${this.left}px`,998)
      // console.log(this.courseData,9527)
      return this.left;
    },
    positionTop() {
      // console.log(1198888)
      this.top = this.positionTop;
      return this.top;
    },
    // position(){
    //     this.
    // }
    display() {
      this.displayKind = this.display;
      // this.displayFin = this.displayKind == this.display2 ? this.display2:'block';
      if (this.displayKind || this.display2) {
        this.displayFin = "block";
      } else {
        this.displayFin = "none";
      }

      // console.log(this.displayFin,this.display2,'ssss')
      return this.displayFin;
    },
    display2() {
      if (this.displayKind || this.display2) {
        this.displayFin = "block";
      } else {
        this.displayFin = "none";
      }
      // console.log(this.displayFin,this.display2,'ssss')
      return this.displayFin;
    },
    cardData() {
      this.courseData = this.cardData;
      console.log(this.courseData, "courseData");
      return this.courseData;
    },
    day() {
      this.classmates = [];
      this.carouselIndex = [];
      this.date = this.day;
      console.log(this.date, " this.date");
      return this.date;
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return ($px / $rem) + rem;
}
.course-card {
  font-size: 16px;
  width: 3.3rem;
  height: 2rem;
  background-color: #fff;
  // position: absolute;
  // position: relative;
  border-radius: 4px;
  z-index: 1000;
  .el-carousel {
    width: 100%;
    height: 100%;
    .el-carousel__item {
      display: flex;
      justify-content: space-between;
      padding: 0.05rem;
      img {
        display: inline-block;
        width: 1.26rem;
        height: 1.9rem;
        background-color: hotpink;
      }
      .item-msg {
        width: 1.7rem;
        padding-top: 0.14rem;
        & > p {
          font-size: 20px;
          font-weight: bold;
        }
        .course-info {
        }
        .classmate {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
          background-color: hotpink;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>