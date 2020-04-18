<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card class="mx-auto" max-width="800" width="600">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ this.nome_loc }}</v-list-item-title>
            <v-list-item-subtitle>{{ this.dayOfWeek }}, {{this.hora}}:{{this.minutos}}, {{this.info.weather[0].description}}</v-list-item-subtitle>
            <v-list-item-subtitle> <v-icon>mdi-weather-sunset-up</v-icon> Nascer do sol {{this.sunrise}}, <v-icon>mdi-weather-sunset-down</v-icon> Pôr do sol {{ this.sunset }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="display-3" cols="6">{{this.info.main.temp}}&deg;C</v-col>
            <v-col cols="6">
              <v-img :src="require(`../assets/${this.icon}.png`)" alt width="120"></v-img>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col
              class="display-1"
              cols="6"
            >{{this.info.main.temp_min}}/{{this.info.main.temp_max}}&deg;C</v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.info.wind.speed}} Km/h</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.info.clouds.all}} %</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.info.main.humidity}} %</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shield-sun</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.raioUv}}</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-title>{{ this.prim }}:</v-list-item-title>
          <v-list-item-subtitle>{{ this.primeiraPrev }}&deg;C</v-list-item-subtitle>
          <v-list-item-avatar>
            <v-img :src="require(`../assets/${this.primeiroIcon}.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>{{ this.seg }}:</v-list-item-title>
          <v-list-item-subtitle>{{ this.segundaPrev }}&deg;C</v-list-item-subtitle>
          <v-list-item-avatar>
            <v-img :src="require(`../assets/${this.segundoIcon}.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>{{ this.ter }}:</v-list-item-title>
          <v-list-item-subtitle>{{ this.terceiraPrev }}&deg;C</v-list-item-subtitle>
          <v-list-item-avatar>
            <v-img :src="require(`../assets/${this.terceiroIcon}.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>{{ this.quart }}:</v-list-item-title>
          <v-list-item-subtitle>{{ this.quartaPrev }}&deg;C</v-list-item-subtitle>
          <v-list-item-avatar>
            <v-img :src="require(`../assets/${this.quartoIcon}.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>{{ this.quint }}:</v-list-item-title>
          <v-list-item-subtitle>{{ this.quintaPrev }}&deg;C</v-list-item-subtitle>
          <v-list-item-avatar>
            <v-img :src="require(`../assets/${this.quintoIcon}.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text>Reportagem do tempo</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios"; 
import firebase from 'firebase';
import { distRef } from "../firebase";

export default {
  name: "Home",
  data() {
    return {
      info: null,
      prev: null,
      uv: null,
      icon: null,
      sunset: null,
      sunrise: null,
      currUser: "", 
      coordenadasDistrito:[],
      primeiraPrev: "",
      segundaPrev: "",
      terceiraPrev: "",
      quartaPrev: "",
      quintaPrev: "",
      raioUv: "",
      dayOfWeek: "",
      nome_loc: "",
      hora: "",
      minutos: "",
      prim: "",
      seg: "",
      ter: "",
      quart: "",
      quint: "",
      primeiroIcon: "",
      segundoIcon: "",
      terceiroIcon: "",
      quartoIcon: "",
      quintoIcon: "",
      API: "http://api.openweathermap.org/data/2.5/weather?units=metric",
      KEY: "&APPID=2aaf6c39c46c00fc3969d144655bf6c2",
      API_UV: "http://api.openweathermap.org/data/2.5/uvi?",
      API_PREV: "http://api.openweathermap.org/data/2.5/forecast?units=metric"
    };
  },
  methods: {
    
    async calculaNewCoords(){ 
      var lat = 0; 
      var lon = 0;
      var currentEmail = this.currUser;
      var i = 0;
      var coordenadasD = this.coordenadasDistrito;
      var distritoUser; 
      var cords = [];
       distRef.on("value", function(Snapshot) {
          Snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val(); 
            if(childData.email == currentEmail){ 
               distritoUser = childData.distrito;
              for(i;i<coordenadasD.length;i++){ 
                if(coordenadasD[i][0] == distritoUser){ 
                    lat = coordenadasD[i][1]; 
                    lon = coordenadasD[i][2]; 
                    console.log(lat); 
                    console.log(lon);
                    cords.push(lat) 
                    cords.push(lon)
                 }
              }
            }
         });
        })  
      return cords;
    }, 

    async geoError1(){ 
      const res = await this.calculaNewCoords()
      const lan_c = "pt" 
      this.getWeather(this.API + "&lat=" + res[0] + "&lon=" + res[1] + this.KEY + "&lang=" + lan_c); 
    },  

    async geoError2(){ 
      /*
      var res = this.calculaNewCoords();
      const lan_c = "pt"
      this.getWeather(this.API + "&lat=" + res[0] + "&lon=" + res[1] + this.KEY + "&lang=" + lan_c); 
      */
        const res = await this.calculaNewCoords()
        this.getUV(this.API_UV + this.KEY + "&lat=" + res[0] + "&lon=" + res[1]); 
    }, 

    async geoError3(){ 
      /*
      var res = this.calculaNewCoords();
      const lan_c = "pt"
      this.getWeather(this.API + "&lat=" + res[0] + "&lon=" + res[1] + this.KEY + "&lang=" + lan_c); 
      */
      const res = await this.calculaNewCoords()
       this.getPrev(this.API_PREV + "&lat=" + res[0] + "&lon=" + res[1] + this.KEY);
    }, 

    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.info = response.data;
          this.sunrise = new Date(response.data.sys.sunrise * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 5);
          this.sunset = new Date(response.data.sys.sunset * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 5);
          this.nome_loc = this.info.name;
          this.icon = this.info.weather[0].icon;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getUV(url) {
      axios
        .get(url)
        .then(responseUV => {
          this.uv = responseUV.data;
          this.raioUv = this.uv.value;
        })
        .catch(err => {
          this.error = err.message;
        });
    },

    getPrev(url) {
      axios
        .get(url)
        .then(response => {
          this.prev = response.data;
          // Previsão da api para temperatura dos próximos 5 dias
          var i;
          var date = "";
          var prevMeiodia = []; 
          var prevIcons = [];
          // percorrer a lista de previsões (queremos tirar a temperatura dos proximos 5 dias ao meio dia e o icon do tempo)
          for (i = 0; i < this.prev.list.length; i++) {
            date = this.prev.list[i].dt_txt.substring(11);
            // agora já temos data no indície i queremos tirar todas com meio dia, tirando a temperatura e o icon
            if (date == "12:00:00") {
              prevMeiodia.push(this.prev.list[i].main.temp);
              prevIcons.push(this.prev.list[i].weather[0].icon);
            }
          }
          // percorrer a lista anterior de previsões e guardar cada previsão
          this.primeiraPrev = prevMeiodia[0];
          this.segundaPrev = prevMeiodia[1];
          this.terceiraPrev = prevMeiodia[2];
          this.quartaPrev = prevMeiodia[3];
          this.quintaPrev = prevMeiodia[4];
          // percorrer a lista dos icons e guardar cada icon para carregar depois
          this.primeiroIcon = prevIcons[0];
          this.segundoIcon = prevIcons[1];
          this.terceiroIcon = prevIcons[2];
          this.quartoIcon = prevIcons[3];
          this.quintoIcon = prevIcons[4];
          
          if (this.dayOfWeek == "Segunda") {
            this.prim = "Terça";
            this.seg = "Quarta";
            this.ter = "Quinta";
            this.quart = "Sexta";
            this.quint = "Sábado";
          } else if (this.dayOfWeek == "Terça") {
            this.prim = "Quarta";
            this.seg = "Quinta";
            this.ter = "Sexta";
            this.quart = "Sábado";
            this.quint = "Domingo";
          } else if (this.dayOfWeek == "Quarta") {
            this.prim = "Quinta";
            this.seg = "Sexta";
            this.ter = "Sábado";
            this.quart = "Domingo";
            this.quint = "Segunda";
          } else if (this.dayOfWeek == "Quinta") {
            this.prim = "Sexta";
            this.seg = "Sábado";
            this.ter = "Domingo";
            this.quart = "Segunda";
            this.quint = "Terça";
          } else if (this.dayOfWeek == "Sexta") {
            this.prim = "Sábado";
            this.seg = "Domingo";
            this.ter = "Terça";
            this.quart = "Quarta";
            this.quint = "Quinta";
          } else if (this.dayOfWeek == "Sábado") {
            this.prim = "Domingo";
            this.seg = "Segunda";
            this.ter = "Terça";
            this.quart = "Quarta";
            this.quint = "Quinta";
          } else {
            this.prim = "Segunda";
            this.seg = "Terça";
            this.ter = "Quarta";
            this.quart = "Quinta";
            this.quint = "Sexta";
          }
        })
        .catch(err => {
          this.error = err.message;
        });
    },

    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError1);
    },
    geoLocation2() {
      navigator.geolocation.getCurrentPosition(this.buildUrlUV, this.geoError2);
    },
    geoLocation3() {
      navigator.geolocation.getCurrentPosition(this.buildUrlPrev,this.geoError3);
    }, 
    
    /*
     geoError2(){ 
      var res = this.calculaNewCoords();
      this.getUV(this.API_UV + this.KEY + "&lat=" + res[0] + "&lon=" + res[1]);
    },

     geoError3(){ 
      var res = this.calculaNewCoords();
      this.getPrev(this.API_PREV + "&lat=" + res[0] + "&lon=" + res[1] + this.KEY);
    },
    */

    buildUrl(position) { 
      const lat = position.coords.latitude;
      const lon = position.coords.longitude
      const lan_c = "pt";
    
      this.getWeather(this.API + "&lat=" + lat + "&lon=" + lon + this.KEY + "&lang=" + lan_c);
    },

    buildUrlUV(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getUV(this.API_UV + this.KEY + "&lat=" + lat + "&lon=" + lon);
    },

    buildUrlPrev(position) {   
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getPrev(this.API_PREV + "&lat=" + lat + "&lon=" + lon + this.KEY);
    }
  }, 

  mounted: function(){ 
    this.currUser = firebase.auth().currentUser.email; 
    this.coordenadasDistrito = [["Aveiro",40.63,-8.66],["Beja",38.02,-7.95],["Braga",41.54,-8.44],["Bragança",41.81,-6.78],["Castelo Branco",39.81,-7.60],
      ["Coimbra",40.22,-8.48],["Évora",38.56,-7.94],["Faro",37.01,-7.97],["Distrito da Guarda",40.53,-7.28],["Leiria",39.75,8.84],["Lisboa",38.74,-9.23],
      ["Portalegre",39.28,-7.46],["Distrito do Porto",41.16,-8.65],["Santarém",39.22,-8.75],["Setúbal",38.52,-8.93],["Viana do Castelo",41.71,-8.84],
      ["Vila Real",41.30,-7.79],["Viseu",40.66,-7.96]];
    this.geolocation();
    this.geoLocation2();
    this.geoLocation3();
  },

  beforeMount() {
    // vai buscar o dia da semana
    var d = new Date();
    var n = d.getDay();
    // vai buscar a hora
    var dataH = new Date();
    this.hora = dataH.getHours();
    // vai buscar os minutos
    this.minutos = dataH.getMinutes();
    if (n == 0) {
      this.dayOfWeek = "Domingo";
    }
    if (n == 1) {
      this.dayOfWeek = "Segunda";
    }
    if (n == 2) {
      this.dayOfWeek = "Terça";
    }
    if (n == 3) {
      this.dayOfWeek = "Quarta";
    }
    if (n == 4) {
      this.dayOfWeek = "Quinta";
    }
    if (n == 5) {
      this.dayOfWeek = "Sexta";
    }
    if (n == 6) {
      this.dayOfWeek = "Sábado";
    }

  }
};
</script>

<style>
.img-valign {
  vertical-align: middle;
  margin-bottom: 0.75em;
}
</style>