<template>
    <div class="register-container">
        <!-- 表单 -->
        <el-form class="register-form">
            <!-- 标题 -->
            <div class="register-tittle">注册周边课堂</div>
            <!-- 登录方式 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我要报班" name="first">
                    <el-form-item>
                        <el-input v-model="form.phone_num" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="form.code" placeholder="滑动获取验证码"></el-input>
                    </el-form-item>

                    <el-row>
                        <el-col :span="15">
                            <el-form-item>
                                <el-input v-model="form.password" placeholder="请输入验证码"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset= "1">
                             <el-button type="info" plain>发送验证码</el-button>   
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>


                </el-tab-pane>

                <el-tab-pane label="我要招生" name="second">
                       <el-form-item>
                        <el-input v-model="form.phone_num" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-input v-model="form.code" placeholder="滑动获取验证码"></el-input>
                    </el-form-item>



                    <el-row>
                        <el-col :span="15">
                            <el-form-item>
                                <el-input v-model="form.password" placeholder="请输入验证码"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset= "1">
                             <el-button type="info" plain>发送验证码</el-button>   
                        </el-col>
                    </el-row>
                    




                    <el-form-item>
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                </el-tab-pane>
            
            </el-tabs>

            <el-row>
                 <el-button type="primary" @click="register" class="register-btn">注册</el-button>
            </el-row>
            
         
            <span class="Extra-small-color Extra-Extra-Small">注册，即代表您同意并接收《服务条款》</span>
            <router-link to="/login" class="login-reg">
               <span class="Extra-Extra-Small Extra-notice-color">已有账号？去登录</span>
            </router-link>
        </el-form>
       
        
       
    </div>
</template>

<script>
    export default {
        name:'Register',
        data() {
            return {
                 form: {
                   phone_num: '',
                   password:''
                },
                activeName:'first',
            }
        },

        mounted(){

        },

        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 注册
             register(){
                var app = this;
                //请求login和register之前需要注入请求头
                var header = this.$auth.options.setHeaders("api/register");
                this.$auth.register({
                    params: {
                        mobile: this.form.phone_num,
                        code:'',
                        password: this.form.password
                    }, 
                    headers:header,
                    success: function () {
                        app.success = true;
                        this.registerSucc();
                    },
                    error: function (resp) {
                        app.error = true;
                        app.errors = resp.response.data.errors;
                    },
                    redirect: null
                });                
            },
            registerSucc(){
                this.$router.push({ name: 'Authentication'}); 
            }
        },
    }
</script>

<style scoped lang="scss">
    .register-container{
        position: fixed;
        width: 100%;
        height: 100%;
        background: url("../assets/login.png") no-repeat;
        background-size:cover;
        text-align: center;
        font-size: 16px;
        .register-form{
            position: absolute;
            left: 0;
            right: 0;
            width: 500px;
            height: 600px;
            padding: 66px 80px 40px;
            margin: 181px auto 0;
            background:rgba(255,255,255,0.6);
            border-radius:5px;
            box-shadow: -5px 5px 30px 25px rgba(255,255,255,0.3);
            .register-tittle{
                font-size: 22px;
                color:#333;
                margin-bottom: 50px;
            }
            .register-btn{
                width: 100%;
                margin-bottom: 6px;
            }
            .login-reg{
                position: absolute;
                bottom: -27px;
                left:50%;
                margin-left:-48px;
            }
        }

    }

</style>