<template>
    <div class="institution-wrapper">
        
        <el-table
            ref="multipleTable"
            :data="studentData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            v-loading.body="loading"            
            >
            <el-table-column prop="baby.b_name" label="姓名" width="140"></el-table-column>
            <el-table-column prop="baby.age" label="年龄" show-overflow-tooltip width="80"></el-table-column>
            <el-table-column prop="baby.sex" label="性别" show-overflow-tooltip width="80"></el-table-column>
            <el-table-column prop="userInfo.name" label="联系人" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="baby.relationName" label="关系" show-overflow-tooltip width="104"></el-table-column>
            <el-table-column prop="userInfo.mobile" label="电话" show-overflow-tooltip  width="150"></el-table-column>
            <el-table-column prop="baby.CourseName" label="课程" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userInfo.address" label="地址" show-overflow-tooltip  width="380"></el-table-column>
        </el-table>

    </div>
</template>
<script>
import { getAgentStudents } from '../../api';
export default {
  name: "myStudent",
  data() {
    return {
      studentData: [],
      loading:true,
    };
  },
  created(){
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getAgentStudents({seqid,c_id}).then(res=>{
      this.studentData = res.data.list.map((item)=>{
        item.baby.sex === 1? item.baby.sex='男': item.baby.sex='女';
        item.baby.CourseName = item.baby.CourseName.join('、');
        return item;
      })
        this.loading = false;      
       console.log(this.studentData,'this.studentData')
    })
   
  }
};
</script>

<style scoped lang="scss">
.institution-wrapper {
  font-size: 16px;
  // .el-button--primary.is-plain{
  //     background-color: #fff;
  // }
  .total{
    width: 100%;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }
}

</style>