<template>
    <div class="institution-wrapper">
        <el-button type="primary" plain>我的机构</el-button>
        <el-button type="primary" plain>我的员工</el-button>
        <el-button type="primary" plain>我的学员</el-button>
        
        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            border
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="名称" width="256"></el-table-column>
            <el-table-column prop="manager" label="管理者" show-overflow-tooltip width="104"></el-table-column>
            <el-table-column prop="phoneNum" label="电话" show-overflow-tooltip  width="157"></el-table-column>
            <el-table-column prop="course" label="课程" show-overflow-tooltip  width="55"></el-table-column>
            <el-table-column prop="employee" label="员工" show-overflow-tooltip  width="55"></el-table-column>
            <el-table-column prop="student" label="学员" show-overflow-tooltip  width="55"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip  width="337"></el-table-column>
            <el-table-column fixed="right" label="关联" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
export default {
  name: "myInstitution",
  data() {
    return {
      tableData3: [
        {
          manager: "刘敏华",
          name: "英孚教育（总店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: '13333333333'          
        }
      ],
      multipleSelection: []
    };
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
}
</style>