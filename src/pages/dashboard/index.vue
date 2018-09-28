<template>
    <div>
        <panel-group></panel-group>

        <RaddarChart :dateToolsKey="2" :trainDateList="[12,17,30]" :trainDateFullList="['20180102','20120312']" ref="topDateTools2" @topDateEvent2="topDateFun2"></RaddarChart>
        
        <div class="charts">
            <div class="number">
                <p class="title">学员数曲线图</p>
                <div class="chart-wrapper">
                    <bar-chart></bar-chart>
                </div>
            </div>

            <div class="distribute">
                <p class="title">学员分部图</p>
                <div class="chart-wrapper">
                    <pie-chart></pie-chart>
                </div>
            </div>
        </div>


      
      
    </div>
</template>

<script>
import { PanelGroup, RaddarChart, PieChart, BarChart } from "./components";
export default {
  name: "Dashboard",
  components: {
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {
  $rem: 100;

  @return ($px / $rem) + rem;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.title {
  font-size: 20px;
}
.charts {
  display: flex;
  .number {
    height: px2rem(306);
    width: px2rem(620);
    margin-right: px2rem(40);
  }
  .distribute {
    height: px2rem(306);
    width: px2rem(454);
  }
}
</style>