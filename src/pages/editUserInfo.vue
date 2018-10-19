<template>
    <div class="editUserInfo-wrapper">
        <div class="background">
        </div> 
        <div class="msg-box clearfix">

            <div class="institution-info">
                <p class="msg-title">
                    机构信息
                </p>
                <div class="info">
                    <div class="info-left">
                        <p>机构名称：<span>Education First</span> </p>
                        <p>教学地址：<span>武汉市 汉阳区 鹦鹉大道 天下名企汇1018</span> </p>
                    </div>

                    <div class="info-right">
                        <p>我的昵称：<span>萧亚轩</span> </p>
                        <p>授课范围：<span>英语、日语、法语</span> </p>
                    </div>
                    
                </div>
            </div>

            <div class="institution-info">
                <p class="msg-title">
                    个人信息
                </p>
                <div class="info">
                    <div class="info-left">
                        <p>机构名称：<span>Education First</span> </p>
                        <p>教学地址：<span>武汉市 汉阳区 鹦鹉大道 天下名企汇1018</span> </p>
                    </div>

                    <div class="info-right">
                        <p>我的昵称：<span>萧亚轩</span> </p>
                        <p>授课范围：<span>英语、日语、法语</span> </p>
                    </div>
                    
                </div>
            </div>

            <div class="institution-info">
                <p class="msg-title">
                    认证信息
                </p>
                <div class="info">
                    <div class="info-left">
                        <p>机构编码：<span>Education First</span> </p>
                      
                    </div>

                    <div class="info-right">
                        <p>注册地址：<span>萧亚轩</span> </p>

                    </div>
                    
                </div>
            </div>

            <div class="institution-info">
                <p class="msg-title">
                    更换头像
                </p>
               
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload" @change='upload($event)'>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </div>

            <el-button type="primary" class="course-btn">保存</el-button>
        </div>
     
            

    </div>
</template>

<script>
export default {
  name: "editUserInfo",
  data() {
      return {
          imageUrl: ""
      }
  },
  methods: {
    show() {
      console.log(111111);
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
  }
};
</script>

<style scoped lang="scss">
.editUserInfo-wrapper {
  font-size: 16px;
  height: 9.6rem;
  .background {
    width: 100%;
    height: 2rem;
    background: url("../assets/img_bg@2x.png") no-repeat;
    background-size: cover;
    position: relative;
  }
  .msg-box {
    height: 7.6rem;
    padding: 0 0.6rem;
    background-color: #fff;
    text-align: center;
    .msg-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.2rem;
      margin-top: 0.5rem;
      &::before {
        content: " ";
        height: 0.12rem;
        width: 0.12rem;
        margin-right: 0.08rem;
        display: inline-block;
        vertical-align: middle;
        background: url("../assets/in-icon2.png") no-repeat;
        background-size: 100%;
      }
    }
    .info {
      width: 9rem;
      margin-right: 0;
      display: flex;
      justify-content: space-between;
      p {
        text-align: left;
        margin-bottom: 0.24rem;
        color: #333;
        font-weight: bold;
        span {
          color: #666;
          font-weight: 500;
        }
      }
      p:last-child{
           margin-bottom: 0;
      }
      span{
          display: inline-block;
          width: 2.8rem;
          border-bottom:1px solid #CCC;
          margin-left: 0.1rem;
      }
    }
    .institution-info {
      padding: 0 0 0 1.8rem;
      text-align: left;
    }
    .avatar-uploader {
      margin-bottom: 0.4rem;
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
    }
    .course-btn {
        float: right;;
      width: 1.2rem;
      height: 0.4rem;
    }
  }
}
</style>