<template>
    <div class="topic-wrapper">
        <router-link to="/layout/topic">
            <el-button type="primary" plain autofocus>我的话题</el-button>
        </router-link>

        <router-link to="/layout/topic/releaseTopic">
            <el-button type="primary" plain>发布话题</el-button>
        </router-link>

        <router-view></router-view>
        
    </div>
</template>

<script>
export default {
  name: "myTopic",
};
</script>

<style scoped lang="scss">
.topic-wrapper {
  font-size: 16px;
  button {
    margin-right: 0.24rem;
  }
}
</style>