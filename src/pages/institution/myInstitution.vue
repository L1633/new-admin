<template>
    <div class="institution-wrapper">
        
        <el-table
            ref="multipleTable"
            :data="insititutionData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            v-loading.body="loading"
            >
            <el-table-column prop="name" label="名称" width="256"></el-table-column>
            <el-table-column prop="userInfo.name" label="管理者" show-overflow-tooltip width="104"></el-table-column>
            <el-table-column prop="c_mobile" label="电话" show-overflow-tooltip  width="180"></el-table-column>
            <el-table-column prop="course_num" label="课程" show-overflow-tooltip  width="80"></el-table-column>
            <el-table-column prop="teacher_num" label="员工" show-overflow-tooltip  width="80"></el-table-column>
            <el-table-column prop="students_num" label="学员" show-overflow-tooltip  width="80"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip  width="380"></el-table-column>
            <el-table-column fixed="right" label="关联">
                <template slot-scope="scope">

                  <el-button type="text" size="small" v-if="($store.state.pid == 0) && (scope.row.id != $store.state.c_id )" @click="handleClick(scope.row)">解约</el-button>
                    
                  <el-button v-else @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.id == $store.state.c_id?false:true">查看</el-button>

                  <el-button type="text" size="small" v-if="($store.state.pid == 0) && (scope.row.id != $store.state.c_id )">签约</el-button>
                    
                  <!-- <el-button type="text" size="small" :disabled="scope.row.id == $store.state.c_id?false:true" v-else>编辑</el-button> -->
    
                </template>
            </el-table-column>
        </el-table>

       <!-- c_type 0 总店   1 分店 -->
      <!-- p_id  为0 总店   -->
    </div>
</template>

<script>
import { getBranchAgentList } from '../../api';
export default {
  name: "myInstitution",
  data() {
    return {
      insititutionData: [],
      loading:true,
    };
  },
  created(){
    // this.$store.state.c_id = 3;
    // this.$store.state.pid = 1;
    const seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getBranchAgentList({seqid,c_id,type:1}).then(res=>{
      console.log(res,'myInsititution')
      this.insititutionData = res.data.list;
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
    handleClick(row) {
        console.log(row);
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
  .total{
    width: 100%;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }
}
</style>