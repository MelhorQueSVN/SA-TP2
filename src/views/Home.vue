<template>
<v-container>
    <v-row>
      <v-col col="12">
  <div class="weather"></div>
    <h1 class="font-weight-light text-center"> Metereologia para <span class="font-weight-light">Londres</span></h1>  
  <v-card text class ="pa-2 text-center"> 
    <div> 
     <!-- <h3 class="font-weight-light"> Temperatura : {{ this.info.main.temp }} Cº <img :src="require('../assets/01d.png')" height="30" /> </h3>  -->
      <h3 class="font-weight-light"> Temperatura : {{ this.info.main.temp }} </h3>
      <h3 class="font-weight-light"> Temperatura mínima : {{ this.info.main.temp_min }} Cº</h3> 
      <h3 class="font-weight-light"> Temperatura máxima : {{ this.info.main.temp_max }} Cº</h3> 
      <h3 class="font-weight-light"> Humidade : {{ this.info.main.humidity }} %</h3> 
      <h3 class="font-weight-light"> Pressão Atmoesférica : {{ this.info.main.pressure }} Pa</h3> 
      <h3 class="font-weight-light"> Nascer do sol : {{ this.sunrise }} horas </h3> 
      <h3 class="font-weight-light"> Por do sol : {{ this.sunset }} horas </h3> 
      
    </div>  
  </v-card> 
  <div class="previsao"></div> 
    <h1 class="font-weight-light text-center"> Previsão próximos 5 dias </h1>
  <v-card text class = "pa-2 text-center"> 
    <div> 
      <h3 class="font-weight-light"> Segunda : </h3>
      <h3 class="font-weight-light"> Terça : </h3> 
      <h3 class="font-weight-light"> Quarta : </h3> 
      <h3 class="font-weight-light"> Quinta : </h3> 
      <h3 class="font-weight-light"> Sexta : </h3>
    </div>
  </v-card>

      </v-col>
    </v-row> 
</v-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() { 
    return { 
       info: null, 
       prev: null, 
       icon : null ,
       sunset : null, 
       sunrise : null
    }
  }, 
  mounted: function() {
    // o url da chamada tem de ter sempre aquele formato http://... e sempre!! com appid
    axios
      .get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=2aaf6c39c46c00fc3969d144655bf6c2")
      .then(dados => { 
        console.log(dados)  
        this.info = dados.data  
        this.icon =  './assets/' + this.info.weather[0].icon.slice(0, 3) + '.png' 
        console.log("Imagem " + this.icon)   
        // transformar em data normal de UNIX
        this.sunrise = new Date(this.info.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
        this.sunset = new Date(this.info.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
      })
      .catch(err => {
        this.error = err.message;
      });
    axios 
      .get("http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=2aaf6c39c46c00fc3969d144655bf6c2") 
      .then(response =>{ 
        console.log("dados recebidos " + response) 
        this.prev = response.data 
      })
  }
}
</script>

<style>
.img-valign {
  vertical-align: middle;
  margin-bottom: 0.75em;
} 
</style>