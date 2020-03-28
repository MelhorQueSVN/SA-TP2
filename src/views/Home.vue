<template>
<v-container>
    <v-row>
      <v-col col="12">
  <div class="weather"></div>
    <h1 class="font-weight-light text-center"> Metereologia para <span class="font-weight-light"> {{ this.nome_loc }} </span></h1>  
  <v-card text class ="pa-2 text-center"> 
    <div> 
     <!-- <h3 class="font-weight-light"> Temperatura : {{ this.info.main.temp }} Cº <img :src="require('../assets/01d.png')" height="30" /> </h3>  -->
      <h3 class="font-weight-light"> Temperatura : {{ this.info.main.temp }} Cº </h3>
      <h3 class="font-weight-light"> Temperatura mínima : {{ this.info.main.temp_min }} Cº</h3> 
      <h3 class="font-weight-light"> Temperatura máxima : {{ this.info.main.temp_max }} Cº</h3> 
      <h3 class="font-weight-light"> Humidade : {{ this.info.main.humidity }} %</h3> 
      <h3 class="font-weight-light"> Pressão Atmoesférica : {{ this.info.main.pressure }} Pa</h3> 
      <h3 class="font-weight-light"> Nascer do sol : {{ this.sunrise }} horas </h3> 
      <h3 class="font-weight-light"> Por do sol : {{ this.sunset }} horas </h3>  
      <h3 class="font-weight-light"> UV : {{ this.raioUv }} </h3>  
      
    </div>  
  </v-card> 
  <div class="previsao"></div> 
    <h1 class="font-weight-light text-center"> Previsão próximos 5 dias </h1>
  <v-card text class = "pa-2 text-center"> 
    <div> 
      <h3 class="font-weight-light"> {{ this.primeiraPrev }} Cº {{ this.segundaPrev }} Cº {{ this.terceiraPrev }} Cº {{ this.quartaPrev }} Cº {{ this.quintaPrev }} Cº </h3>
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
       uv : null,
       icon : null ,
       sunset : null, 
       sunrise : null, 
       primeiraPrev : "", 
       segundaPrev : "", 
       terceiraPrev : "", 
       quartaPrev : "", 
       quintaPrev : "", 
       raioUv: "",  
       nome_loc : "",
       API : "http://api.openweathermap.org/data/2.5/weather?units=metric", 
       KEY : "&APPID=2aaf6c39c46c00fc3969d144655bf6c2",  
       API_UV : "http://api.openweathermap.org/data/2.5/uvi?", 
       API_PREV: "http://api.openweathermap.org/data/2.5/forecast?units=metric"
    }
  }, 
  //mounted: function() {
    // o url da chamada tem de ter sempre aquele formato http://... e sempre!! com appid
    /*
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
        console.log(this.prev) 
        // Previsão da api para temperatura dos próximos 5 dias
        this.primeiraPrev = this.prev.list[0].main.temp  
        console.log(this.primeiraPrev)
        this.segundaPrev = this.prev.list[1].main.temp
        console.log(this.segundaPrev) 
        this.terceiraPrev = this.prev.list[2].main.temp 
        console.log(this.terceiraPrev)
        this.quartaPrev = this.prev.list[3].main.temp 
        console.log(this.quartaPrev)
        this.quintaPrev = this.prev.list[4].main.temp 
      }) 
      .catch(err =>{ 
        this.error = err.message
      });
    axios 
      .get("http://api.openweathermap.org/data/2.5/uvi?appid=2aaf6c39c46c00fc3969d144655bf6c2&lat=51.5&lon=-0.11")
      .then(responseUV =>{ 
        this.uv = responseUV.data
        this.raioUv = this.uv.value
        }) 
        .catch(err =>{ 
          this.error = err.message
        });
    */
 //}, 
  methods:{ 
    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.info = response.data
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5); 
          this.nome_loc = this.info.name
      })
      .catch(error => {
        console.log(error);
      });
    }, 

    getUV(url) { 
      axios 
        .get(url) 
        .then(responseUV =>{ 
          this.uv = responseUV.data
          console.log(responseUV)
          this.raioUv = this.uv.value 
        }) 
        .catch(err =>{ 
          this.error = err.message
        });
    }, 

    getPrev(url){ 
      axios 
        .get(url) 
        .then(response=>{ 
        this.prev = response.data   
        // Previsão da api para temperatura dos próximos 5 dias
        this.primeiraPrev = this.prev.list[0].main.temp  
        console.log(this.primeiraPrev)
        this.segundaPrev = this.prev.list[1].main.temp
        console.log(this.segundaPrev) 
        this.terceiraPrev = this.prev.list[2].main.temp 
        console.log(this.terceiraPrev)
        this.quartaPrev = this.prev.list[3].main.temp 
        console.log(this.quartaPrev)
        this.quintaPrev = this.prev.list[4].main.temp 
      }) 
      .catch(err =>{ 
        this.error = err.message
      });
    },
    
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError); 
    }, 
    geoLocation2(){ 
      navigator.geolocation.getCurrentPosition(this.buildUrlUV, this.geoError); 
    }, 
    geoLocation3(){ 
      navigator.geolocation.getCurrentPosition(this.buildUrlPrev, this.geoError);
    },
   
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      this.getWeather(this.API + '&lat=' + lat + '&lon=' + lon + this.KEY);
    }, 
    
    buildUrlUV(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      this.getUV(this.API_UV + this.KEY + '&lat=' + lat + '&lon=' + lon );
    }, 

     buildUrlPrev(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      this.getPrev(this.API_PREV + '&lat=' + lat + '&lon=' + lon + this.KEY);
    }   
  },
  beforeMount() {
    this.geolocation(); 
    this.geoLocation2(); 
    this.geoLocation3();
  }
}
</script>

<style>
.img-valign {
  vertical-align: middle;
  margin-bottom: 0.75em;
} 
</style>