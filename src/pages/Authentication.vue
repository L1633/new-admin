<template>
    <div class="authentication-container">
        
        <el-form class="authentication-form">
            <i></i>
            <p class="Extra-Extra-large authentication-reg">注册成功</p>
            
            <div class="small authentication-tittle">恭喜您已经完成了周边课堂账号的注册，</div>
            <div class="small authentication-tittle">在开始使用之前，还需要填写以下信息完成账户认证，您可以：</div>
         
            <el-row class="authentication-btn">
                <router-link to="/institutionForm">
                    <el-button type="primary" class="authentication-btn-inst">前往完成认证</el-button>
                </router-link> 
            </el-row>
            
         
            <span class="Extra-small-color Extra-Extra-Small">跳过，先去看看</span>

        </el-form>
       
       
    </div>
</template>

<script>
    export default {
        name:'Authentication',
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
            }
        },
    }
</script>

<style scoped lang="scss">
    .authentication-container{
        position: fixed;
        width: 100%;
        height: 100%;
        background:rgba(242,242,242,1);
        text-align: center;
        font-size: 16px;
        .authentication-form{
            position: absolute;
            left: 0;
            right: 0;
            width: 500px;
            height: 600px;
            padding: 50px 57px 50px;
            margin: 181px auto 0;
            background:rgba(255,255,255,1);
            border-radius:5px;
            i{
                display: inline-block;
                width: 70px;
                height: 70px;
                background: url("../assets/register.png") no-repeat;
                background-size:cover;
            }
            .authentication-reg{
                margin: 18px 0 81px;
            }
            .authentication-tittle{
                color:#999;
                line-height:20px;
            }
            .authentication-btn{
                margin: 141px 0 71px;
                .authentication-btn-inst{
                    width: 100%;
                }
            }
        }

    }

</style>