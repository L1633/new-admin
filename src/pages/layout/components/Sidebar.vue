<template>
    <div>

        <div class="logo"></div>
        <div class="isCollapse">
            <span @click="toggleSideBar"></span>
        </div>
        <el-menu default-active="1"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">

            <router-link to='/layout'>
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">总览</span>
                </el-menu-item>
            </router-link>

            <router-link to='/layout/course'>
                <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的课程</span>
                </el-menu-item>
            </router-link>

            <router-link to='/layout/institution'>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">我的机构</span>
                </el-menu-item>
            </router-link>topic

            <router-link to='/layout/topic'>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">我的话题</span>
                </el-menu-item>
            </router-link>

            <router-link to='/layout/attention'>
                <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">我的关注</span>
                </el-menu-item>
            </router-link>
            
            <!-- <router-link to='/layout/order'>
                <el-menu-item index="6">
                    <i class="el-icon-setting"></i>
                    <span slot="title">我的订单</span>
                </el-menu-item>
            </router-link> -->
            
        </el-menu>
    
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        name:"Sidebar",
        data() {
            return {
             
            };
        },
        methods: {
            ...mapMutations(['toggleSideBar']),
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
           
        },
        computed: {
            ...mapState(['isCollapse'])
        },
    }
</script>

<style scoped lang="scss">
    
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .logo{
        width: 100%;
        height: 50px;
        background: url('../../../assets/logo.png') no-repeat center center;
    }
    .isCollapse{
        width: 100%;
        height: 50px;
        background-color: #F5F7F8;
        position: relative;
        span::before{
            content: " ";
            position: absolute;
            height: 24px;
            width: 24px;
            top:50%;
            margin-top:-12px;
            right: 0;
            background: url('../../../assets/hide.png') no-repeat;
            background-size: 100%;
        }
    }
</style>