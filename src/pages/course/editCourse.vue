<template>
    <div class="edit-detail">

        <div class="detail-title">
            <span>我的课程</span>
            <span>课程详情</span>
            <span>编辑课程纪要</span>
        </div> 

        <div class="swiper-box">
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide v-for="(o,index) in courseTimeList" @click.native="activeTask(index)" :class="activeNum==index? 'active':''">
                    <div class="slider-item" >课时{{index+1}}</div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        

        <div class="detail-form">
             <el-form ref="form" :model="form" label-width="100px" label-position='left' class="form-box">
                  <el-form-item label="课程名称：">
                    <el-input v-model="form.c_name" placeholder="请输入课程名称" disabled></el-input>
                </el-form-item>

                <el-form-item label="课程日期：">
                    <el-input v-model="form.t_date" placeholder="请输入课程日期" disabled></el-input>
                </el-form-item>

                <el-form-item label="课程内容：">
                    <el-input v-model="form.content" placeholder="请输入课程内容"></el-input>
                </el-form-item>
                
                <el-form-item label="课程要点：">
                    <el-input type="textarea" v-model="form.essentials" placeholder="请输入课程要点" :rows="6"></el-input>
                </el-form-item>

                <el-form-item label="课程任务：">
                    <el-input type="textarea" v-model="courseTask" placeholder="请输入课程任务" :rows="10"></el-input>
                </el-form-item>

                <el-form-item label="上传图片：" >
                
                    <!-- <el-upload class="course-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" @change='upload($event)'>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <el-upload
                        :action=url
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :data="{hashId:$store.state.hashId,app:`course/${$store.state.hashId}`,width:480,tagName:''}" name="filePath"
                        :on-success="handleAvatarSuccess"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog >
                      <img width="100%" :src="imageUrl" alt="">
                    </el-dialog>
             
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="course-btn" @click="submitForm()">提交</el-button>
                </el-form-item>

             </el-form>
        </div>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { releaseCourseTask, getAgentCourseTimeList } from "../../api";
export default {
  name: "editCourse",
  props: ["id", "name"],
  data() {
    return {
      swiperOption: {
        // debugger: true,
        autoplay: false,
        // direction:'vertical',
        // grabCursor: true,
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // loop:true
        // slidesPerView: "auto",
      },
      form: {
        content: "",
        c_name: "",
        t_date: "",
        c_img: [],
        essentials: ""
      },
      ca_content: " ",
      courseTask: "",
      oldCorseTask: "",
      oldEssentials: "",
      imageUrl: "",
      activeNum: 0,
      courseTimeList: [],
      editCourseTask: [],
      courseTask: "",
      ct_id: "",
      ta_id: "",
      hasSave: false,
      oldcontent: "",
      url: "http://192.168.1.100:8081/api/upload"
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    console.log(this.name, "dsdssd");
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getAgentCourseTimeList({ seqid, c_id, ca_id: this.id }).then(res => {
      // console.log(res, "getAgentCourseTimeList");
      this.courseTimeList = res.data.list;
      this.form = this.courseTimeList[0];
      this.oldcontent = this.form.content;
      this.ct_id = this.form.id;
      this.ta_id = this.form.task_id;
      this.form.c_img = [];
      this.courseTask = this.form.courseTask
        ? this.form.courseTask.content
        : "";
      this.oldCorseTask = this.courseTask;
      this.oldEssentials = this.form.essentials;
      // console.log( this.form,' this.form')
    });
  },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    activeTask(index) {
      // console.log(!this.hasSave,1111)
      if (this.hasSave) {
        this.$message.warning("请先保存该课时任务信息！");
        return;
      }
      this.activeNum = index;
      this.form = this.courseTimeList[index];
      this.oldcontent = this.form.content;
      this.ct_id = this.form.id;
      this.ta_id = this.form.task_id;
      this.form.c_img = [];
      this.courseTask = this.form.courseTask
        ? this.form.courseTask.content
        : "";
      this.oldCorseTask = this.courseTask;
      this.oldEssentials = this.form.essentials;
      this.imageUrl = "";
      // console.log( this.form,' this.form')
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (true) {
          console.log(this.form, "this.form");
          var seqid = Date.parse(new Date());
          let c_id = this.$store.state.c_id;
          let formData = {
            content: this.courseTask,
            essentials: this.form.essentials,
            ca_content: this.form.content,
            img: this.form.c_img
          };
          releaseCourseTask({
            seqid,
            ca_id: this.id,
            ct_id: this.ct_id,
            ta_id: this.ta_id,
            ...formData
          }).then(res => {
            console.log(res, "res");
            if (res.data.code === 0) {
              this.$message.success(res.data.message);
              this.$refs["form"].resetFields();
              this.hasSave = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(val) {},
    handleAvatarSuccess(res, file, fileList) {
      console.log("上传文件", res);
      if (res.code == 0) {
        this.$message.success(res.message);
        console.log(this.form, 22222);
        this.form.c_img.push(res.data.key);
        console.log(this.form.c_img);
        // 显示用res。data.src
      }
    },
    handlePictureCardPreview() {}
  },
  watch: {
    "form.content"(newcontent, oldcontent) {
      // console.log(this.oldcontent)
      if (newcontent != this.oldcontent) {
        this.hasSave = true;
      }
    },
    courseTask(newcontent, oldcontent) {
      // console.log(newcontent,'ssssss', this.courseTask)
      if (newcontent != this.oldCorseTask) {
        this.hasSave = true;
      }
    },
    "form.essentials"(newcontent, oldcontent) {
      if (newcontent != this.oldEssentials) {
        this.hasSave = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.edit-detail {
  font-size: 16px;
  .detail-title {
    margin-bottom: 0.1rem;
    span:first-child {
      color: #333;
    }
    span:nth-child(2) {
      margin-left: 0.29rem;
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
  .swiper-box {
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    .swiper-container {
      height: 100%;
      padding: 0 0.2rem;
      .swiper-wrapper {
        .swiper-slide {
          margin-top: 0.4rem;
          width: 0.8rem !important;
          height: 0.8rem;
          line-height: 0.8rem;
          border-radius: 50%;
          text-align: center;
          color: #ff9900;
          border: 1px solid #ff9900;
        }
      }
    }
  }
  .detail-form {
    margin-top: 0.2rem;
    width: 100%;
    height: 7.6rem;
    padding: 0.5rem 0.4rem 0;
    background-color: #fff;
    .course-uploader {
      margin-bottom: 0.3rem;
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
    }
    .course-btn {
      margin-left: calc(50% - 0.45rem);
      width: 0.9rem;
      height: 0.36rem;
    }
  }
}
.swiper-slide.active {
  border-radius: 50%;
  color: white !important;
  background-color: #ff9900;
}
</style>