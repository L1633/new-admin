<template>
  <div class="addCourse-wrapper">
    <p>新增课程</p>
    <div class="addCourse-main">

      <div class="addCourse-left">
        <div class="item-name">
          我的模板
        </div>

        <div class="addCourse-item" v-for="(item,index) in 4" @click="showDetail(index)" :key=index>

          <div class="item-name" :class="index === activeNum? 'themeColor': ''">
            拉丁舞
          </div>

          <div class="item-detail" :class="index === activeNum? 'showdetail': 'hidendetail'">
              <div @mousemove="showDelete" @mouseout="hideDelete" :class=" showdelete ?'delete-box':''" >
                【少儿】中国舞
                <span @click="itemDelete"></span>
              </div>
          </div>
        </div>
        

      </div>
      <div class="addCourse-right">
          <div class="call">

          </div>
          <!-- 表单 -->
          <div class="addCourse-form">
            11111
          </div>
       
      </div> 
    </div>
    
    
 
  </div>
</template>

<script>
export default {
  name: "addCourse",
  data() {
    return {
      activeNum: '',
      showdelete: ''
    }
  },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      showDetail(index){
        this.activeNum = index;
      },
      showDelete(){
        this.showdelete = true;
      },
      hideDelete(){
        this.showdelete = false;
      },
      itemDelete(){
        console.log(1211111)
      }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;

  @return ($px / $rem) + rem;
}
  .addCourse-wrapper{
    font-size: 16px;
    
    .addCourse-main{
      display: flex;
      justify-content: space-between;
      .addCourse-left{
        .item-name{
          text-align: left;
          padding-left: 0.2rem;
          width: 4.06rem;
          height: 0.5rem;
          line-height: 0.5rem;
          background-color: #fff;
          border-radius: 4px;
          margin-bottom:0.29rem;
        }
        .item-detail{
            margin-bottom: 0.4rem;
            padding-left: 0.59rem;
            div:first-child{
              margin-bottom: 0.14rem;
            }
            .delete-box{
              position: relative;
              span::after{
                content: " ";
                display: inline-block;
                position: absolute;
                right:0.6rem;
                height: px2rem(18);
                width: px2rem(18);
                vertical-align:middle;
                background: url("../assets/notice.png") no-repeat center center;
              }
            }
        }
      }
      .addCourse-right{
        .call{
          width: 7.46rem;
          height: 0.5rem;
          background-color: #fff;
          border-radius: 4px;        
          margin-bottom:0.29rem;
        }
        .addCourse-form{
          padding: 0 0.4rem;
          width: 7.46rem;
          height: 8.8rem;
          background-color: #fff;
          
        }     
      }
    }
  }

</style>