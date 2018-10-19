<template>
  <div class="addCourse-wrapper">

    <div class="addCourse-title">
      <router-link to="/layout/course">
        <span>我的课程</span>
      </router-link>
      <span class="newCourse">新增课程</span>
    </div> 

    <div class="addCourse-main">
      <div class="addCourse-left">
        <div class="item-name">
          我的模板
        </div>

        <div class="addCourse-item" v-for="(item,index) in 4" @click="showDetail(index)" :key=index>

          <div class="item-name" :class="index === activeNum ? 'themeColor': ''">
            拉丁舞
          </div>

          <div class="item-detail" :class="index === activeNum ? 'showdetail': 'hidendetail'">
              <div @mousemove="showDelete" @mouseout="hideDelete" :class=" showdelete ? 'delete-box':''" >
                【少儿】中国舞
                <span @click="itemDelete"></span>
              </div>
          </div>
        </div>
        
      </div>
      <div class="addCourse-right">
          <div class="call">
  
            <el-button type="primary" class="addCourse-btn" @click="callKind(0)">学生上门</el-button>
            <el-button type="primary" class="addCourse-btn" @click="callKind(1)">老师上门</el-button>

          </div>
          <!-- 表单 -->
          <div class="addCourse-form">
            
            <el-form ref="formData" :model="form" label-width="80px" label-position='top' class="form-box" :rules="rules" >

              <div class="form-left">

              <el-form-item label="课程名称" prop="c_name">
                <el-input v-model="form.c_name"></el-input>
              </el-form-item>
              
              <el-form-item label="授课类型" prop="gid" >
                <el-select v-model="form.gid" placeholder="请选择授课类型">
                  <el-option :label="item.label" :value="item.value" v-for="item in courseSortList" :key="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="授课老师" :rules="[{ required: true, message: '授课老师不能为空'}]" >

                <el-cascader :options="teacherList" @change="handleChange"></el-cascader>

              </el-form-item>

              <el-form-item label="课程模式" prop="call">
                <el-input v-model="call"> </el-input>
              </el-form-item>

              <el-form-item label="课程费用（元/h）" prop="plan_fee">
                <el-input v-model="form.plan_fee"></el-input>
              </el-form-item>

              <el-form-item label="教学地址">

                  <el-cascader :options="options1" @change="handleItemChange" class="form-cascader"></el-cascader>

                  <el-input v-model="form.address" placeholder="请输入教学地址"></el-input>

              </el-form-item>

              <el-form-item label="课程介绍">
                <el-input type="textarea" v-model="form.introduction" placeholder="请输入课程介绍" :rows="6"></el-input>
              </el-form-item>
           
            </div>
             
             <div class="form-right">

              <el-form-item label="学员人数（名）" prop="max_num">
                <el-input v-model.number="form.max_num"></el-input>
              </el-form-item>

              <el-form-item label="学员年龄（岁）"  prop="grade">
                  <el-select v-model="form.grade" placeholder="请选择年龄" >
                    <el-option :label="age.text" :value="age.value" v-for="(age,index) in gradeArr" :key="index"></el-option>
                </el-select>
              </el-form-item>

               <el-form-item label="开课时间"  prop="sdate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.sdate" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

               <el-form-item label="结课时间"  prop="edate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.edate" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

              <el-form-item label="下架时间"  prop="off_time">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.off_time" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

              <el-form-item label="上课日期" >
                <el-checkbox-group v-model="classDate" @change="choiceWeek">
                  <el-checkbox label="1">周一</el-checkbox>
                  <el-checkbox label="2">周二</el-checkbox>
                  <el-checkbox label="3">周三</el-checkbox>
                  <el-checkbox label="4">周四</el-checkbox>
                  <el-checkbox label="5">周五</el-checkbox>
                  <el-checkbox label="6">周六</el-checkbox>
                  <el-checkbox label="7">周日</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="上/下课时间" >
                  <el-col :span="11">
                    <el-time-select placeholder="选择时间" v-model="Stime" style="width: 100%;"  :picker-options="{start: '06:30',step: '00:05',end: '22:30'}"></el-time-select >
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-select placeholder="选择时间" v-model="Etime" style="width: 100%;" :picker-options="{start: '06:30',step: '00:05',end: '22:30',minTime: Stime}" ></el-time-select>
                  </el-col>
              </el-form-item>
                 
              <el-form-item>
                  
                <el-button plain>新增日期{{t_week}}</el-button>
                <el-button plain>新增时间</el-button>

              </el-form-item>

             </div>
              
            </el-form>

                <div class="upload-box">
                    <p>上传图片</p>
                    <el-row>
                      <!-- <el-col :span="4">
                          <el-upload class="avatar-uploader" :action=url :show-file-list="true" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" @change='upload($event)' :data="{hashId:$store.state.hashId}" name="filePath" list-type="picture-card">
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                      </el-col> -->

                      <el-upload
                        :action=url
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :data="{hashId:$store.state.hashId,app:`course/${$store.state.hashId}`,width: 960,tagName:''}" name="filePath"
                        :on-success="handleAvatarSuccess"
                        >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog >
                        <img width="100%" :src="imageUrl" alt="">
                      </el-dialog>

                      <!-- <el-col :span="4" :offset="2">
                          <el-upload class="avatar-uploader" action="http://192.168.1.100:8081/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :data="{hashId:$store.state.hashId}" name="filePath">
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                      </el-col> -->
                  </el-row>
                </div>
                
              <div class="form-btn">
                <el-button type="primary" @click="onSubmit">存为模板</el-button>
                <el-button @click="uploadCourse()">上传课程{{classTime}}</el-button>
              </div>
                
          </div>
       
      </div> 
    </div>
    <!-- subject 传 老师接口的 id   时间格式以 - 为分界-->
  </div>
</template>

<script>
import city_arr from "../../city/city_data.js";
import { releaseCourse, getTeacherList, getCourseSortList } from "../../api";
export default {
  name: "addCourse",
  data() {
    return {
      activeNum: "",
      showdelete: "",
      form: {
        c_name: "",
        c_type: 0,
        gid: "",
        t_id: "",
        subject: "",
        plan_fee: "",
        province: "",
        city: "",
        county: "",
        introduction: "",
        max_num: "",
        sdate: "",
        edate: "",
        off_time: "",
        grade: "",
        t_week: "",
        address: "",
        time1: [],
        c_img: []
      },
      rules: {
        c_name: [{ required: true, message: "课程名称不能为空" }],
        gid: [{ required: true, message: "授课类型不能为空" }],
        plan_fee: [{ required: true, message: "课程费用不能为空" }],
        max_num: [
          { required: true, message: "人数不能为空" },
          { type: "number", message: "人数必须为数字值" }
        ],
        grade: [{ required: true, message: "学员年龄不能为空" }],
        sdate: [{ required: true, message: "开课时间不能为空" }],
        edate: [{ required: true, message: "结课时间不能为空" }],
        off_time: [{ required: true, message: "下架时间不能为空" }],
        //  classDate:[
        //     { required: true, message: '上课时间不能为空'}
        //  ],
        Stime: [{ required: true, message: "上课时间不能为空" }],
        Etime: [{ required: true, message: "上课时间不能为空" }]
      },
      Stime: "",
      Etime: "",
      call: "学生上门",
      classDate: [],
      selectedOptions: [],
      courseSortList: [],
      teacherList: [],
      // 城市地址
      options1: city_arr,
      imageUrl: "",
      gradeArr: [
        {
          value: "0~3",
          text: "学前(0~3岁)"
        },
        {
          value: "4~6",
          text: "幼儿园(4~6岁)"
        },
        {
          value: "7~12",
          text: "小学(7~12岁)"
        },
        {
          value: "13~15",
          text: "初中(13~15岁)"
        },
        {
          value: "16~18",
          text: "高中(16~18岁)"
        },
        {
          value: "18+",
          text: "成人(18岁以上)"
        }
      ],
      url: "http://192.168.1.100:8081/api/upload"
    };
  },
  created() {
    console.log(this.form, "this.form");
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getCourseSortList({ seqid, c_id }).then(res => {
      // console.log(res,'getCourseSortList')
      this.courseSortList = res.data.list;
    });
    getTeacherList({ seqid, c_id }).then(res => {
      this.teacherList = res.data.list.map(item => {
        console.log(item.subject, "item");

        this.subjectArr = item.subject.map(sub => {
          return { label: sub.s_name, value: sub.id };
        });
        return {
          label: item.t_name,
          value: item.t_id,
          children: this.subjectArr
        };
      });
      console.log(this.teacherList, " this.options");
    });
  },
  methods: {
    demo(val) {
      console.log(val);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    showDetail(index) {
      this.activeNum = index;
    },
    showDelete() {
      this.showdelete = true;
    },
    hideDelete() {
      this.showdelete = false;
    },
    itemDelete() {
      console.log(1211111);
    },
    callKind(type) {
      type == 0 ? (this.call = "学生上门") : (this.call = "老师上门");
      this.form.c_type = type;
    },
    handleItemChange(val) {
      console.log(val, "val");
      this.form.province = val[0];
      this.form.city = val[1];
      this.form.county = val[2];
      console.log(this.form, 111);
    },
    handleAvatarSuccess(res, file, fileList) {
      console.log("上传文件", res);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.form.c_img.push(res.data.key);
        console.log(this.form.c_img);
        // 显示用res。data.src
      }
    },
    handleRemove() {},

    handleChange(val) {
      this.form.t_id = val[0];
      this.form.subject = val[1];
    },
    handlePictureCardPreview() {},
    choiceWeek(val) {
      console.log(val);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    onSubmit() {
      console.log("submit!");
    },
    uploadCourse() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          var seqid = Date.parse(new Date());
          let c_id = this.$store.state.c_id;
          releaseCourse({ seqid, publisher_id: c_id, ...this.form }).then(
            res => {
              console.log(res);
              if (res.data.code === 0) {
                this.$message.success(res.data.message);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    t_week() {
      this.form.t_week = this.classDate.sort().join();
      console.log(this.form);
    },
    classTime() {
      if (this.Stime && this.Etime) {
        this.form.time1.push(`${this.Stime}~${this.Etime}`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return ($px / $rem) + rem;
}
.addCourse-wrapper {
  font-size: 16px;
  .addCourse-title {
    margin-bottom: 0.2rem;
    span:first-child {
      color: #333;
    }
    .newCourse {
      color: #333;
      font-weight: bold;
      margin-left: 0.29rem;
      display: inline-block;
      padding-bottom: 0.06rem;
      border-bottom: 2px solid #ff9900;
    }
  }
  .addCourse-main {
    display: flex;
    justify-content: space-between;
    .addCourse-left {
      .item-name {
        text-align: left;
        padding-left: 0.2rem;
        width: 4.06rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 0.29rem;
      }
      .item-detail {
        margin-bottom: 0.4rem;
        padding-left: 0.59rem;
        div:first-child {
          margin-bottom: 0.14rem;
        }
        .delete-box {
          position: relative;
          span::after {
            content: " ";
            display: inline-block;
            position: absolute;
            right: 0.6rem;
            height: px2rem(18);
            width: px2rem(18);
            vertical-align: middle;
            background: url("../../assets/notice.png") no-repeat center center;
          }
        }
      }
    }
    .addCourse-right {
      .call {
        width: 7.46rem;
        height: 0.5rem;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 0.29rem;
        padding-right: 0.2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .addCourse-btn {
          height: 0.36rem;
          margin-left: 0.3rem;
        }
      }
      .addCourse-form {
        padding: 0.3rem 0.4rem 0;
        width: 7.46rem;
        height: 8.8rem;
        background-color: #fff;
        .form-box {
          display: flex;
          justify-content: flex-start;
          .form-left {
            width: 3.33rem;
            padding-right: 0.4rem;
            height: 100%;
            border-right: 1px solid rgb(238, 238, 238);
            .form-cascader {
              margin-bottom: 0.1rem;
            }
          }
          .form-right {
            padding-left: 0.4rem;
          }
        }
        .avatar-uploader {
          margin-bottom: 0.3rem;
          width: 178px;
          height: 178px;
          border: 1px dashed #d9d9d9;
          .el-upload:hover {
            border-color: #ff9900;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
        }
        .form-btn {
          float: right;
        }
      }
    }
  }
}
.el-form-item {
  margin-bottom: 0.1rem;
  .el-form-item__label {
    color: #999 !important;
  }
}
// .el-checkbox:nth-child(6){
//   margin-left:0;
// }
// .el-checkbox:nth-child(7){
//   margin-left:0;
// }
</style>