<template>
    <div class="topic-wrapper">
  
        
        <el-table
            ref="multipleTable"
            :data="topicData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            v-loading.body="loading"            
            >
            <el-table-column prop="title" label="文章" width="400"></el-table-column>
            <el-table-column prop="userInfo.username" label="作者" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="类型" show-overflow-tooltip  width="100"></el-table-column>
            <el-table-column prop="up" label="点赞人数" show-overflow-tooltip  width="150"></el-table-column>
            <el-table-column prop="commentsNum" label="评论人数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="read" label="阅读人数" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="created_at" label="发布时间" show-overflow-tooltip  width="180"></el-table-column>
  
            <el-table-column fixed="right" label="编辑" >
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        <!-- type 1话题  2 活动话题  作者先取昵称nickname 没有 username-->
        <!-- <div class="total">
          <span>全选</span>
          <span>已选（1）</span>
        </div> -->
    </div>
</template>

<script>
  import { getTopicList , deleteTopic} from '../../api';

    export default {
        name:'myTopic',
        data() {
            return {
                topicData:[],
                loading:true,
                
            }
        },
        created(){
            var seqid = Date.parse(new Date());
            let c_id = this.$store.state.c_id;
            getTopicList({seqid,c_id}).then(res => {
                console.log(res,'topic')
                this.loading = false;
                this.topicData = res.data.list.map((item)=>{
                    item.type === 1? item.type='话题':item.type='活动';  
                    return item;
                })
                
            })
        },
        methods: {
            handleEdit(index,row) {
                console.log(index,row)
                this.$router.push(`/layout/editTopic/${row.id}`);
            },
            handleDelete(index,row){
                var seqid = Date.parse(new Date());
                let c_id = this.$store.state.c_id;
                deleteTopic({seqid,c_id,id:row.id}).then(res=>{
                    if(res.data.code === 0){
                        this.$message.success(res.data.message);
                        this.topicData.splice(index,1);
                    }else{
                        this.$message.error(res.data.message);                
                    }
                })
            },
            handleSelectionChange(){
                
            }
        },
    }
</script>

<style scoped lang="scss">
    .topic-wrapper{
        font-size: 16px;
        // .total{
        //     width: 100%;
        //     height: 58px;
        //     line-height: 58px;
        //     background-color: #fff;
        // }
    }
</style>