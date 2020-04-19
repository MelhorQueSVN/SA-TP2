<template>
  <div id="app">
    <GChart type="GeoChart" :data="chartDataRows" :options="chartOptions" />
  </div>
</template>


<script>
import { GChart } from "vue-google-charts";
//import {db} from '../main';
import { prevRef } from "../firebase";

export default {
  components: {
    GChart
  },
  data() {
    return {
      //chartDataHeader: [],
      chartDataRows: [],
      updatedChartData: [],
      chartOptions: {
        region: "PT",
        colorAxis: { colors: ["#00853f", "yellow", "#e31b23"] }, 
        sizeAxis: { minValue: 0, maxValue: 11 },
        backgroundColor: "#81d4fa",
        datalessRegionColor: "white",
        defaultColor: "#f5f5f5",
        resolution: "provinces",
        displayMode: "regions"
      }
    };
  },
  computed: {
    chartData() {
      return [this.chartDataHeader, ...this.updatedChartData];
    }
  },
  methods: {},
  mounted: function() {
    this.chartDataRows = [];
    var info = null;
    var res = [];
    prevRef.on("value", function(Snapshot) {
      info = Snapshot.val();
      info = Object.values(info);
      console.log(info);
      var i = 0;
      var temp = [];
      for (; i < info.length; i++) {
        temp = [info[i].distrito, info[i].UV];
        res.push(temp);
        console.log(res);
      }
    });
    this.chartDataRows = res;
    this.chartDataRows.unshift(["City", "UV"]);
  }
};
</script>