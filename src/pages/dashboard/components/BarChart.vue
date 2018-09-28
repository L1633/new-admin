<template>
    <div id="Chart" :style="{height:height,width:width}">
    </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  data() {
    return {
      chart: ""
    };
  },
  props: {
    // className: {
    //     type: String,
    //     default: 'chart'
    // },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  mounted() {
    this.initChart();
    // this.__resizeHanlder = debounce(() => {
    // if (this.chart) {
    // this.chart.resize()
    // }
    // }, 100)
    window.addEventListener("resize", this.__resizeHanlder);
  },
  methods: {
    __resizeHanlder() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("Chart"), "macarons");

      this.chart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="scss">
@function px2rem($px) {

  $rem: 100;

  @return($px / $rem)+rem;
}
  #Chart{
        height: px2rem(306);
        width: px2rem(620);
    } 
</style>