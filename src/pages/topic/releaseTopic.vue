<template>
    <div class="releaseTopic-wrapper">

        <div class="detail-form">

             <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position='left' class="form-box">

                <el-form-item label="文章类型:" prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio label="1" >话题</el-radio>
                      <el-radio label="2" >活动</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="文章标题:" prop="title">
                    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>

                <el-form-item label="文章内容:"  prop="content">
                     <el-input type="textarea" v-model="form.content" placeholder="请输入文章内容" :rows="18"></el-input>
                </el-form-item>

                <el-form-item label="选择标签:">
                        <el-button plain>选择</el-button>
                </el-form-item>

                <el-form-item label="上传图片：" >
                
                    <el-upload class="course-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" @change='upload($event)'>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
             
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="course-btn" @click="submitForm('form',0)">提交</el-button>
                </el-form-item>

             </el-form>
        </div>
    </div>
</template>

<script>
import { release_topic } from "../../api";
export default {
  name: "releaseTopic",
  data() {
    return {
      form: {
          type: '',
          title:'',
          content:'',
      },
       rules: {
          type: [
            { required: true, message: '请选择文章类型', trigger: 'blur' },
          ],
          title: [
            { required: true, message: '请输入文章标题', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入文章内容', trigger: 'blur' }
          ]
        },
      imageUrl: ""
    };
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
    demo(w) {
      console.log(w);
    },
    submitForm(formName,typeId) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            console.log(this.form,'this.form')
            var seqid = Date.parse(new Date());
            let c_id = this.$store.state.c_id;
            release_topic({seqid,c_id,id:typeId,...this.form}).then((res) => {
             console.log(res,'res')
              if(res.data.code === 0){
                this.$message.success(res.data.message);
                this.$refs[formName].resetFields();
              }else{
                this.$message.error(res.data.message);                
              }
            
            })
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
};
</script>

<style scoped lang="scss">
.releaseTopic-wrapper {
    margin-top:0.24rem;

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
</style>