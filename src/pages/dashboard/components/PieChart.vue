<template>
    <div id="myChart" :style="{height:height,width:width}">

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

    window.addEventListener("resize", this.__resizeHanlder);
  },
  methods: {
    __resizeHanlder() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("myChart"), "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
/* #myChart{
        height: 300px;
        width:100%;
    } */
</style>