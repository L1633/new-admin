<template>
    <div class="login-container">
        <!-- 表单 -->
        <el-form class="login-form">
            <!-- 标题 -->
            <div class="login-tittle">登录周边课堂</div>
            <!-- 登录方式 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">

                <el-tab-pane label="账号登录" name="first">

                    <el-form-item>
                        <el-input v-model="form.phone_num" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <span class="Extra-Extra-Small fr notice-color">忘记密码</span>
         
                        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
           
                </el-tab-pane>

                <el-tab-pane label="扫码登录" name="second" >
                    <div class='login-QRcode'></div>
                </el-tab-pane>
            
            </el-tabs>
         
            <p class="Extra-Extra-Small Extra-small-color login-3path">----------------第三方登录----------------</p>

            <el-row class="login-3img">
                <el-col :span="3" :offset="7">
                    <span class="login-img login-img1"></span>
                </el-col>

                <el-col :span="4" >
                    <span class="login-img login-img2"></span>
                </el-col>

                <el-col :span="3" >
                    <span class="login-img login-img3"></span>
                </el-col>
            </el-row>

            <router-link to="/register" class="login-reg">
                <span class="Extra-Extra-Small Extra-notice-color">没有账号？去注册</span>
            </router-link>

        </el-form>
       
       
       
    </div>
</template>

<script>
import md5 from "js-md5";
import { Reqlogin } from "../api";
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone_num: "15927381505",
        password: "111111"
      },
      activeName: "first"
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async login() {
      var seqid = Date.parse(new Date());
      var response = await Reqlogin({
        mobile: this.form.phone_num,
        password: this.form.password,
        login_type: 2,
        seqid: seqid
      });
      console.log(response,1111111)
      const result = response.data;
      if (result.code === 0 && (result.user.apply_agent_status === 0||1)  ) {
        // 成功
        let token = response.headers.authorization ;
        let c_id = result.user.c_id;
        console.log(c_id,'c_id')
        // 设置 token
        this.$store.commit('set_token', token);
        this.$store.commit('set_c_id', c_id);
        this.$router.push('/layout');
      } else {
        // 失败
         console.log(result.data.message);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/login.png") no-repeat;
  background-size: cover;
  text-align: center;
  font-size: 16px;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 500px;
    height: 600px;
    padding: 66px 80px 40px;
    margin: 181px auto 0;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    box-shadow: -5px 5px 30px 25px rgba(255, 255, 255, 0.3);
    .login-tittle {
      font-size: 22px;
      color: #333;
      margin-bottom: 50px;
    }
    .login-btn {
      width: 100%;
      margin-top: 84px;
    }
    .login-QRcode {
      margin-left: 51px;
      width: 236px;
      height: 236px;
      background: url("../assets/qrcode.png") no-repeat;
      background-size: cover;
    }
    .login-3path {
      position: absolute;
      bottom: 87px;
      left: 50%;
      margin-left: -94px;
    }
    .login-3img {
      width: 100%;
      position: absolute;
      bottom: 39px;
      left: 50%;
      margin-left: -250px;
    }
    .login-img {
      display: inline-block;
      width: 34px;
      height: 34px;
    }
    .login-img1 {
      background: url("../assets/login1.png") no-repeat;
      background-size: cover;
    }
    .login-img2 {
      background: url("../assets/login2.png") no-repeat;
      background-size: cover;
    }
    .login-img3 {
      background: url("../assets/login3.png") no-repeat;
      background-size: cover;
    }
    .login-reg {
      position: absolute;
      bottom: -27px;
      left: 50%;
      margin-left: -48px;
    }
  }
}
</style>