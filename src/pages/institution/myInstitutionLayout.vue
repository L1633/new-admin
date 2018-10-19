<template>
    <div class="institution-wrapper">
        <router-link to="/layout/institution">
          <el-button type="primary" plain>我的机构</el-button>
        </router-link>
        
        <router-link to="/layout/institution/staff">
          <el-button type="primary" plain>我的员工</el-button>
        </router-link>
      
        <router-link to="/layout/institution/student">
          <el-button type="primary" plain>我的学员</el-button>
        </router-link>
        
        <router-view></router-view>

    </div>
</template>

<script>
export default {
  name: "myInstitution",
  
};
</script>

<style scoped lang="scss">
.institution-wrapper {
  font-size: 16px;
  // .el-button--primary.is-plain{
  //     background-color: #fff;
  // }
  button{
    margin-right: 0.24rem;
  }
}

</style>