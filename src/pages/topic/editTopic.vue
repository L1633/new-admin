<template>
    <div class="editTopic-wrapper">
        <div class="editTopic-title">
            <span @click="toMytopic()">我的话题</span>
            <span>编辑话题</span>
        </div> 
        <div class="detail-form">

             <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position='left' class="form-box">

                <el-form-item label="文章类型:" prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio label="1" >话题</el-radio>
                      <el-radio label="2" >活动</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="文章标题:" prop="title">
                    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>

                <el-form-item label="文章内容:"  prop="content">
                    <el-input type="textarea" v-model="form.content" placeholder="请输入文章内容" :rows="18"></el-input>
                </el-form-item>

                <el-form-item label="选择标签:">
                    <el-button plain>选择</el-button>
                </el-form-item>

                <el-form-item label="上传图片：" >
                    <el-upload class="course-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" @change='upload($event)'>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="course-btn" @click="submitForm('form',id)">提交</el-button>
                </el-form-item>

             </el-form>
        </div>
    </div>
</template>

<script>
import releaseTopic from "./releaseTopic";
import { getTopic } from "../../api";
export default {
  name: "editTopic",
  mixins: [releaseTopic],
  props: ["id"],
  data() {
    return {};
  },
  created() {
    console.log(this.id);
    var seqid = Date.parse(new Date());
    let c_id = this.$store.state.c_id;
    getTopic({ seqid, c_id, id:this.id }).then(res => {
      console.log(res, "res");
      const topicData = res.data.list;
      this.form = {title:topicData.title,type:topicData.type.toString(),content:topicData.content};
    });
  },
  methods: {
    toMytopic() {
      this.$router.push("/layout/topic");
    }
  }
};
</script>

<style scoped lang="scss">
.editTopic-wrapper {
  font-size: 16px;
  .editTopic-title {
    margin-bottom: 0.1rem;
    span:first-child {
      color: #333;
    }
    span:last-child {
      color: #333;
      font-weight: bold;
      margin-left: 0.29rem;
      display: inline-block;
      padding-bottom: 0.06rem;
      border-bottom: 2px solid #ff9900;
    }
  }
  .detail-form {
    margin-top: 0.2rem;
    width: 100%;
    height: 7.6rem;
    padding: 0.5rem 0.4rem 0;
    background-color: #fff;
    .course-uploader {
      margin-bottom: 0.3rem;
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
    }
    .course-btn {
      margin-left: calc(50% - 0.45rem);
      width: 0.9rem;
      height: 0.36rem;
    }
  }
}
</style>