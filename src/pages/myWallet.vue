<template>
    <div class="myWallet-wrapper">

        <div class="myWallet-title">
            <span>总览</span>
            <span>我的钱包</span>
        </div> 

        <div class="myWallet-money">

            <div class="left">
                我的余额
                <p>￥500.00</p>  
            </div>

            <div class="right">
                <div class="fl Alipay">
                    <img src="" alt="">
                    <p>支付宝</p>
                </div>
                
                <div class="fr">
                    <img src="" alt="">
                    <p>微信</p>
                </div>
            </div>

        </div>

        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column prop="name" label="明细" width="360"></el-table-column>
            <el-table-column prop="manager" label="金额/元" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="manager" label="付款状态" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="manager" label="付款方式" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="date" label="下单时间" show-overflow-tooltip  width="400"></el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
  name: "myWallet",
  data() {
    return {
      tableData3: [
        {
          manager: "刘敏华",
          name: "英孚教育（总店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: "13333333333"
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: "13333333333"
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: "13333333333"
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: "13333333333"
        },
        {
          manager: "刘敏华",
          name: "英孚教育（王家湾店）",
          address: "上海市普陀区金沙江路 1518 弄",
          phoneNum: "13333333333"
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
  },
};
</script>

<style scoped lang="scss">
.myWallet-wrapper {
  font-size: 16px;
  .myWallet-title{
      margin-bottom: 0.1rem;
      span:first-child{
          color:#333;        
      }
      span:last-child{
          color:#333;
          font-weight: bold;
          margin-left: 0.29rem;
          display: inline-block;
          padding-bottom: 0.06rem;
          border-bottom: 2px solid #FF9900;
      }
  }
  .myWallet-money{
      display: flex;
      justify-content: space-between;
      .left{
          font-size: 24px;
          font-weight: bold;
          margin-top: 0.4rem;
      }
      .right{
          text-align: center;
          img{
              display: inline-block;
              width: 1rem;
              height: 1rem;
              border:4px solid #fff;
              background-color: #ccc;
          }
          .Alipay{
              margin-right: 0.4rem;
          }
      }
  }
}
</style>