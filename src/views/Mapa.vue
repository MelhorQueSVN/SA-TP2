<template>
  <div id="app">
    <GChart
      type="GeoChart"
      :data="chartDataRows"
      :options="chartOptions"
    />
  </div>
</template>


<script>
import { GChart } from 'vue-google-charts'  
//import {db} from '../main';
import { prevRef } from "../firebase";

export default {
  components: {
    GChart
  }, 
  data () {
    return {
      //chartDataHeader: [],
      chartDataRows: [],
      updatedChartData: [],
      chartOptions: {
        region: 'PT',
        colorAxis: {colors: ['#00853f','yellow','#e31b23']},
        backgroundColor: '#81d4fa',
        datalessRegionColor: 'white',
        defaultColor: '#f5f5f5', 
        resolution: 'provinces', 
        displayMode: 'regions'
      }
    }
  },
  computed: {
    chartData () {
      return [ this.chartDataHeader, ...this.updatedChartData ]
    }
  },
  methods: {
  },
  mounted: function() {
    // Leituras da BD para cada distrito  
    this.chartDataRows.push(["City","UV"])
    /*
    var distritos = ["aveiro","beja","braga","braganca","castelobranco","coimbra","evora","faro","guarda","leiria","lisboa","portalegre","porto","santarem","setubal","vianadocastelo","vilareal","viseu"]
    var i;
    var info = []; 
    for(i=0;i<distritos.length;i++){ 
      prevRef.child(distritos[i]).on("value",function(Snapshot){
         info.push([Snapshot.val().distrito,Snapshot.val().UV])
      });  
    }
    console.log(info.length)
    for(i=0;i<info.length;i++){ 
      this.chartDataRows = this.chartDataRows.push(info[i]);
    }
    console.log(info)
    console.log(this.chartDataRows)
    */
    var info = null;
    var coiso = [];
    prevRef.on("value",function(Snapshot){
      info = Snapshot.val();
      info = Object.values(info)
      console.log(info)
      var i = 0;
      var temp = [];
      for(;i<info.length;i++){ 
        temp = [info[i].distrito,info[i].UV]
        coiso.push(temp)
        console.log(coiso)
      }
      this.chartDataRows = coiso;
      console.log(this.chartDataRows);
    });  
  }, 
};
</script>