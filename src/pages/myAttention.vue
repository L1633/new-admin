<template>
    <div class="topic-wrapper">

        <el-button type="primary" plain>我的关注</el-button>
        <el-button type="primary" plain>我的粉丝</el-button>
        
        <el-table
            ref="multipleTable"
            :data="attentionData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:0.24rem"
            stripe
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  label="头像" width="256">
                 <template slot-scope="scope">
                    <img :src="`/api/getImageUrl/${scope.row.user.avatarUrl}/big`"> 
                </template>
            </el-table-column>
            <el-table-column prop="user.nickname" label="名称" show-overflow-tooltip width="104"></el-table-column>
            <el-table-column prop="user.sex" label="性别" show-overflow-tooltip  width="100"></el-table-column>
            <el-table-column prop="user.identityName" label="身份" show-overflow-tooltip></el-table-column>
            <el-table-column prop="user.subjectName" label="关注/擅长" show-overflow-tooltip></el-table-column>
            <el-table-column prop="user.topicNum" label="文章数量" show-overflow-tooltip  width="120"></el-table-column>
            <el-table-column prop="user.GzNum" label="关注人数" show-overflow-tooltip  width="120"></el-table-column>
            <el-table-column prop="user.FollowNum" label="粉丝人数" show-overflow-tooltip  width="120"></el-table-column>

            <el-table-column prop="user.date" label="关注日期" show-overflow-tooltip  width="150"></el-table-column>
            
            <el-table-column fixed="right" label="关注" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">取消关注</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="total">
          <span>全选</span>
          <span>已选（1）</span>
        </div>

    </div>
</template>

<script>
import { getFollowList, follow_info } from "../api";

export default {
  name: "myAttention",
  data() {
    return {
      attentionData: []
    };
  },
  created() {
    var that = this;
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getFollowList({ seqid, c_id }).then(res => {
      console.log(res, 111);
      this.attentionData = res.data.list.map(item => {
        item.user.sex === 1 ? (item.user.sex = "男") : (item.user.sex = "女");
        return item;
      });
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleClick(index, row) {
      console.log(row);
      var seqid = Date.parse(new Date());
      let c_id = this.$store.state.c_id;
      const f_uid = row.f_uid;
      follow_info({ seqid, c_id, type: 1, option: 1, f_uid }).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.$message.success(res.data.message);
          this.attentionData.splice(index, 1);
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.topic-wrapper {
  font-size: 16px;
  button {
    margin-right: 0.24rem;
  }
  .total {
    width: 100%;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }
}
</style>