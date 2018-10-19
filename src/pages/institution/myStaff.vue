<template>
    <div class="institution-wrapper">
        
        <el-table
            ref="multipleTable"
            :data="staffData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            v-loading.body="loading"
            >
            <el-table-column prop="t_name" label="姓名" width="140"></el-table-column>
            <el-table-column prop="mobile" label="电话" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="directionName" label="擅长课程" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="course_co" label="课程" show-overflow-tooltip  width="80"></el-table-column>
            <el-table-column prop="stu_co" label="学员" show-overflow-tooltip  width="80"></el-table-column>
            <el-table-column prop="created_at" label="入职时间" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip  width="380"></el-table-column>
            <el-table-column fixed="right" label="关联" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,2)" type="text" size="small" :disabled="scope.row.status?false:true">
                      解约
                    </el-button>
                    
                    <el-button @click="handleClick(scope.row,1)" type="text" size="small"  :disabled="scope.row.status?true:false">恢复</el-button>

                </template>
            </el-table-column>
        </el-table>
        <!-- status 1 是签约  2是解约 -->

    </div>
</template>

<script>
import { getTeacherList, contractTeacher } from '../../api';
export default {
  name: "myInstitution",
  data() {
    return {
      staffData: [],
      multipleSelection: [],
      loading:true,
      
    };
  },
  created(){
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getTeacherList({seqid,c_id}).then(res=>{
      this.staffData = res.data.list;
      console.log( this.staffData,' this.staffData')  
      this.loading = false;      
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row,type) {
        console.log(row);
        var seqid = Date.parse(new Date());
        let c_id = this.$store.state.c_id;
        let id = row.id;
        let typeId = type;
        contractTeacher({seqid,c_id,id,type:typeId}).then(res=>{
            if(res.data.code === 1){
              this.$message.error(res.data.message);
            }else{
              this.$message.success(res.data.message);
            }
        })
    }
  }
};
</script>

<style scoped lang="scss">
.institution-wrapper {
  font-size: 16px;
  // .el-button--primary.is-plain{
  //     background-color: #fff;
  // }
}

</style>