<template>
  <div class="addCourse-wrapper">
    <p>新增课程</p>
    <div class="addCourse-main">

      <div class="addCourse-left">
        <div class="item-name">
          我的模板
        </div>

        <div class="addCourse-item" v-for="(item,index) in 4" @click="showDetail(index)" :key=index>

          <div class="item-name" :class="index === activeNum? 'themeColor': ''">
            拉丁舞
          </div>

          <div class="item-detail" :class="index === activeNum? 'showdetail': 'hidendetail'">
              <div @mousemove="showDelete" @mouseout="hideDelete" :class=" showdelete ?'delete-box':''" >
                【少儿】中国舞
                <span @click="itemDelete"></span>
              </div>
          </div>
        </div>
        

      </div>
      <div class="addCourse-right">
          <div class="call">
          
            <el-button plain class="institution-btn-btn">学生上门</el-button>

            <el-button type="primary" class="institution-btn-btn" >老师上门</el-button>

          </div>
          <!-- 表单 -->
          <div class="addCourse-form">
            
            <el-form ref="form" :model="form" label-width="80px" label-position='top' class="form-box">

              <div class="form-left">

              <el-form-item label="课程名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              
              <el-form-item label="授课类型">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="授课老师">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="课程模式">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="课程费用（元/h）">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="教学地址">

                    <el-cascader :options="options1" @change="handleItemChange" class="form-cascader"></el-cascader>

                    <el-input v-model="form.addr" placeholder="请输入教学地址"></el-input>

              </el-form-item>

              <el-form-item label="课程介绍">
                <el-input type="textarea" v-model="form.desc" placeholder="请输入课程介绍" :rows="6"></el-input>
              </el-form-item>

           
             </div>
             
             <div class="form-right">

              <el-form-item label="学员人数（名）">
                <el-input v-model="form.name"></el-input>
              </el-form-item>


              <el-form-item label="学员年龄（岁）">
                <el-col :span="9" >
                  <el-input v-model="form.age1"></el-input>
                </el-col>

                <el-col class="line" :span="2" :offset='2'>——</el-col>

                
                <el-col :span="9"  :offset='2'>
                
                  <el-input v-model="form.age2"></el-input>
                </el-col>

              </el-form-item>

               <el-form-item label="开课时间">
         
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

              </el-form-item>

               <el-form-item label="结课时间">
         
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

              </el-form-item>

              <el-form-item label="下架时间">
         
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

              </el-form-item>


              <el-form-item label="上课日期">
                <el-select v-model="form.region" placeholder="每周五、六、日">
                  <el-option label="每周五、六、日" value="shanghai"></el-option>
                  <el-option label="五、六、日" value="beijing"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="上/下课时间">
                  <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
              </el-form-item>
                 
              <el-form-item>
                  
                <el-button plain >新增日期</el-button>

                <el-button plain>新增时间</el-button>
              </el-form-item>

             </div>
              
            </el-form>

                <div class="upload-box">
                    <p>上传图片</p>
                    <el-row>
                      <el-col :span="4">
                          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" @change='upload($event)'>
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                      </el-col>

                      <el-col :span="4" :offset="2">
                          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                      </el-col>
                  </el-row>
                </div>
                
              <div class="form-btn">
                <el-button type="primary" @click="onSubmit">存为模板</el-button>
                <el-button>上传课程</el-button>
              </div>
                

          </div>
       
      </div> 
    </div>
    
    
 
  </div>
</template>

<script>
import city_arr from '../city/city_data.js'

export default {
  name: "addCourse",
  data() {
    return {
      activeNum: "",
      showdelete: "",
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          age1:'',
          age2:'',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          addr:'',
        },
        // 城市地址
        options1:city_arr,
        imageUrl: '',
    };
  },
  methods: {
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
    handleItemChange(val) {
      console.log(val,'val')
    },
    handleAvatarSuccess(){

    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    onSubmit() {
      console.log('submit!');
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
            background: url("../assets/notice.png") no-repeat center center;
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
      }
      .addCourse-form {
        padding: 0.3rem  0.4rem 0;
        width: 7.46rem;
        height: 8.8rem;
        background-color: #fff;
        .form-box{
          display: flex;
          justify-content: flex-start;
          .form-left{
            width: 3.33rem;
            padding-right: 0.4rem;
            height: 100%;
            border-right: 1px solid rgb(238,238,238);
            .form-cascader{
              margin-bottom: 0.1rem;
            }
          }
          .form-right{
             padding-left: 0.4rem;
          }
        }
        .avatar-uploader{
                margin-bottom: 0.3rem;
                width: 178px;
                height: 178px;
                border: 1px dashed #d9d9d9;

            }
        .form-btn{
          float: right;
        }
      }
    }
  }
}
 .el-form-item{
     margin-bottom:0.1rem;
    .el-form-item__label{
      color: #999 !important;
    }
 }

</style>