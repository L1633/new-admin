<template>
    <div class="institution-container">
        
        <div class="institution-form" >
        
             <!-- 按钮 -->
            <el-row class="institution-btn-license">
                <el-col :span="9">
                    <el-button plain class="institution-btn-btn" @click="choiceLicense(true,1)">有执照</el-button>
                </el-col>

                 <el-col :span="9" :offset="6">
                    <el-button type="primary" class="institution-btn-btn" @click="choiceLicense(false,3)">无执照</el-button>
                </el-col>
            </el-row>
    
            <el-form label-position=top label-width="80px" :model="formLabelAlign">

                <div class="institution-tittle">机构信息</div>

                <el-form-item label="机构全称">
                    <el-input v-model="formLabelAlign.instiName" placeholder="请输入机构全称"></el-input>
                </el-form-item>   

                <el-form-item label="注册地址">
                    <el-input v-model="formLabelAlign.authenAddr" placeholder="请输入注册地址"></el-input>
                </el-form-item> 

                <el-form-item label="教学地址">

                    <el-cascader :options="options1" @change="handleItemChange" ></el-cascader>

                    <el-input v-model="formLabelAlign.addr" placeholder="请输入教学地址"></el-input>

                </el-form-item>

                <el-row>
                    
                    <el-col :span="11" >
                        <el-form-item label="经营者">
                            <el-input v-model="formLabelAlign.techAddr" placeholder="请输入经营者姓名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="2">
                        <el-form-item label="联系方式">
                            <el-input v-model="formLabelAlign.c_mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <div class="institution-tittle second-tittle">个人信息</div>
                
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="formLabelAlign.c_mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>

                 <el-form-item label="邮箱">
                    <el-input v-model="formLabelAlign.c_mail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>

                <el-form-item label="请上传工商执照（有效期内）" v-if="license">
                    <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <div v-else>
                    <el-form-item label="请上传身份证照片（有效期内）"></el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload" @change='upload($event)'>
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                             </el-upload>
                        </el-col>

                        <el-col :span="11" :offset="2">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                    </el-row>
                </div>

                 <input type="file"  @change="upload($event)"/>
            </el-form>

            <!-- 按钮 -->
            <el-row class="institution-btn">

                 <el-col :span="9" :offset="15">
                    <router-link to="/institutionFin">
                        <el-button type="primary" class="institution-btn-btn" @click="institution">提交</el-button>
                    </router-link>
                </el-col>
            </el-row>
        </div>

       
    </div>
</template>


<script>
import city_arr from '../city/city_data.js'
import OSS from 'ali-oss'
import co from 'co'

export default {
    name: "InstitutionForm",
    data() {
        return {
        // 城市地址
            options1:city_arr,
        // 表单
            formLabelAlign: {
                type: 2,
                province:'',
                city:'',
                county:'',
                addr:'',
                c_linkman:'',
                c_mail:'',
                c_mobile:'',
                c_type:''
            },
            institutionKind:'',
            imageUrl: '',
            license:'',
        };
    },
    created(){
        // 获取token和阿里云上传参数
        this.getToken();
    },
    mounted() {

    },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 照片
    upload(event) {
        console.log('准备上传')
        // 文件名
        var file = event.target.files[0];
        var type = file.name.split('.')[1];
        console.log(file,'文件');
        var storeAs = 'avatr/1111' +  '.' + type;
        var _this = this;
        co(function* () {
            var result = yield _this.client.put(storeAs, file);
            console.log(result,'结果如何？');
            if(result.res.status === 200){
                  _this.imageUrl = 'http://192.168.1.100:8081/api/getImageUrl/avatr'+'|'+'1111.png/big';
                //   返回的url地址res.url

            }
        }).catch( err=> {
            console.log(err);
        });
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
    handleItemChange(val) {
      console.log(val,'val')
    },
    //执照选择 
    choiceLicense(value,type_value){
        this.license = value;
        this.c_type = type_value;
    },
    institution(){
      this.$http.post('/set_userInfo', {
          type:2,
          province:'',
          city:'',
          county:'',
          addr:'',
          license:'',
          name:'',      
          c_type:this.c_type,
          c_mail:'',
          c_mobile:''
      })
      .then( response=> {
            console.log(response);
        })
        .catch( error=> {
            console.log(error);
        });
    },
    //获取token
    getToken(){
        this.$http.post('/getSecurityToken',{})
        .then(res => {
            this.client = new OSS.Wrapper({
                accessKeyId : res.data.accessKeyID,
                secure: true,//https
                accessKeySecret :res.data.accessKeySecret,
                stsToken: res.data.securityToken,
                bucket :  res.data.bucket,
                region: res.data.region,
            })
        })
        .catch(error => {
            console.log(error);
        });
    },

  }
};
</script>

<style scoped lang="scss">
.institution-container {
  position: relative;;
  width: 100%;
  height: 100%;
  background: rgba(242, 242, 242, 1);
   font-size: 16px;
  .institution-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 750px;
    // height: 600px;
    padding: 100px 114px 0;
    margin: 148px auto 275px;
    background:rgba(255,255,255,0.8);
    border-radius: 5px;
    .institution-tittle{
        font-size: 16px;
        font-weight: bold;
        color:#333;
        margin-bottom: 8px;
        &::before{
            content:"";
	        background:url('../assets/in-icon.png') no-repeat;
            background-size:cover;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right:5px;
        }
    }
    .second-tittle{
        margin-top:30px;
    }
    .institution-btn-license{
        margin-bottom: 73px;
        .institution-btn-btn{
            width: 100%;
        }
    }
    .institution-btn{
        margin-bottom: 59px;
        .institution-btn-btn{
            width: 100%;
        }
    }
  }
}
    div.avatar-uploader{
        margin-bottom: 50px;
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;

    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
   
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
 .el-form-item{
     margin-bottom:0;
 }
 
.el-input__inner{
     background-color:#F8F8F8;
 }

</style>