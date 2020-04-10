<template>
<v-layout row wrap>
  <v-flex xs12 sm12>
  <v-parallax
    dark 
    height="620" 
    src="../assets/background-clouds.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">WeatherForecast</h1>
        <h4 depressed text class="white--text subheading">Apresentação dos dados fornecidos pelo OpenWeather</h4> 
        <h4 depressed text class="white--text subheading">e previsão através da API da WorldWeatherOnline</h4>
      </v-col>
     <v-spacer></v-spacer> 
     <v-col class="text-center" cols="12">  
        <h5 depressed text class="white--text subheading">Trabalho desenvolvido por:</h5> 
        <h5 depressed text class="white--text subheading">João Nunes</h5>  
        <h5 depressed text class="white--text subheading">Mateus Silva</h5>  
        <h5 depressed text class="white--text subheading">Rui Miguel</h5> 
     </v-col>  
    </v-row>
  </v-parallax> 
  </v-flex> 
</v-layout>
</template> 

<script>
export default {
    
}
</script> 

<style>
.home .main-content-background {
    display: none;
}
</style>
