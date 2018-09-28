<template>
    <div class="app-main" style="min-height: 100%">
         <router-view/>
    </div>
</template>

<script>
    export default {
        name:"AppMain"
    }
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;
  @return($px / $rem)+rem;
}
   .app-main{
       padding:px2rem(40);
   }
</style>