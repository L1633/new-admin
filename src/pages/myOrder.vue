<template>
    <div class="topic-wrapper">
        <el-button type="primary" plain>我的订单</el-button>
        
        <el-table
            ref="multipleTable"
            :data="orderData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            >
            <el-table-column prop="name" label="订单号" width="400"></el-table-column>
            <el-table-column prop="manager" label="课程名称" show-overflow-tooltip width="104"></el-table-column>
            <el-table-column prop="phoneNum" label="课程费用" show-overflow-tooltip  width="100"></el-table-column>
            <el-table-column prop="course" label="开课时间" show-overflow-tooltip  width="150"></el-table-column>
            <el-table-column prop="employee" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="student" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="年龄" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="报名时间" show-overflow-tooltip  width="180"></el-table-column>

        </el-table>
    </div>
</template>

<script>
  import { getOrderList } from '../api';

    export default {
        name:'myOrder',
        data() {
            return {
                orderData:[
                     {
                        manager: "刘敏华",
                        name: "英孚 ",
                        address: "上海市普 ",
                        phoneNum: '133'
                    },
                ]
            }
        },
        created(){
            var that = this;
            var seqid = Date.parse(new Date());
            let c_id = this.$store.state.c_id;
   
            getOrderList({seqid,c_id}).then((res) => {
                console.log(res,'order')
                
            })
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                },
                handleClick(row) {
                    console.log(row);
            }
        },
    }
</script>

<style scoped lang="scss">
    .topic-wrapper{
        font-size: 16px;
        .total{
            width: 100%;
            height: 58px;
            line-height: 58px;
            background-color: #fff;
        }
    }
</style>