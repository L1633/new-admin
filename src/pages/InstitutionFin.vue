<template>
    <div class="institutionFin-container">
        
        <div class="institutionFin-form">

            <div class="institutionFin-tittle">

              <p class="Extra-Extra-large">恭喜您，提交成功</p>

              <span class="Extra-Extra-Small Extra-small-color">请耐心等待，审核结果会在1~3个工作日类发送到您的邮箱！</span>

            </div>
            
        </div>
       
    </div>
</template>

<script>
export default {
  name: "InstitutionFin",
  data() {
    return {
      form: {
        phone_num: "",
        password: ""
      },
      activeName: "first",
      institution:''
    };
  },

  mounted() {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    
    choiceIns(value){
        this.$router.push({ name: 'InstitutionForm', params: { institution: value }});
    },
  
  }
};
</script>

<style scoped lang="scss">
.institutionFin-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(242, 242, 242, 1);
  .institutionFin-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 750px;
    height: 500px;
    padding: 100px 114px 0;
    margin: 148px auto 0;
    background: rgba(253, 253, 253,1);
    box-shadow: -5px 5px 30px 25px rgba(255,255,255,0.3);
    border-radius: 5px;
    .institutionFin-tittle {
      text-align: center;
      & p{
          margin: 90px 0 49px;
          color:#333;
      }
    }
  }
}
</style>