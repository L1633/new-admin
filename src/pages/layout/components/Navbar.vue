<template>
    <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" @Click.native="toggleSideBar" ></hamburger> -->
    <!-- <el-button @click="toggleSideBar" >1</el-button> -->

        <div class="navbar-btn" @click="toggleSideBar" :class="classObj"></div>
    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
        <el-breadcrumb separator="/" class="navbar-bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

  </el-menu>
</template>

<script>
// import Hamburger from '@/components/Hamburger'
import { mapMutations } from 'vuex'
    export default {
        name:"Navbar",
        methods: {
            ...mapMutations(['toggleSideBar'])
        },
        computed: {
          classObj() {
            return {
                isActive: this.$store.state.isCollapse,
            }
          }
        },
    }
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .navbar-btn{
        float: left;
        margin: 15px 20px;
        width: 20px;
        height: 20px;
        background: url("../../../assets/sidebar-toggle-light.png") no-repeat;
        background-size:cover;
  }
  .navbar-bread{
        float: left;
  }
  .isActive{
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: .4s;
  }
}
.el-breadcrumb{
    line-height: 50px;
}
</style>