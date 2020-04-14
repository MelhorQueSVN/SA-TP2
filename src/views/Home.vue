<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card class="mx-auto" max-width="800" width="600">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ this.nome_loc }}</v-list-item-title>
            <v-list-item-subtitle>{{ this.dayOfWeek }}, {{this.hora}}:{{this.minutos}}, {{this.info.weather[0].description}}</v-list-item-subtitle>
            <v-list-item-subtitle>Nascer do sol {{this.sunrise}}</v-list-item-subtitle>
            <v-list-item-subtitle>Pôr do sol {{this.sunset}}</v-list-item-subtitle>
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
      prevMeiodia: [],
      prevIcons: [],
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
          console.log(this.icon);
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
          console.log(responseUV);
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
          // percorrer a lista de previsões (queremos tirar a temperatura dos proximos 5 dias ao meio dia e o icon do tempo)
          for (i = 0; i < this.prev.list.length; i++) {
            date = this.prev.list[i].dt_txt.substring(11);
            // agora já temos data no indície i queremos tirar todas com meio dia, tirando a temperatura e o icon
            if (date == "12:00:00") {
              this.prevMeiodia.push(this.prev.list[i].main.temp);
              this.prevIcons.push(this.prev.list[i].weather[0].icon);
            }
          }
          // percorrer a lista anterior de previsões e guardar cada previsão
          this.primeiraPrev = this.prevMeiodia[0];
          this.segundaPrev = this.prevMeiodia[1];
          this.terceiraPrev = this.prevMeiodia[2];
          this.quartaPrev = this.prevMeiodia[3];
          this.quintaPrev = this.prevMeiodia[4];
          // percorrer a lista dos icons e guardar cada icon para carregar depois
          this.primeiroIcon = this.prevIcons[0];
          this.segundoIcon = this.prevIcons[1];
          this.terceiroIcon = this.prevIcons[2];
          this.quartoIcon = this.prevIcons[3];
          this.quintoIcon = this.prevIcons[4];
          /*
        this.primeiraPrev = this.prev.list[0].main.temp  
        this.segundaPrev = this.prev.list[1].main.temp
        this.terceiraPrev = this.prev.list[2].main.temp 
        this.quartaPrev = this.prev.list[3].main.temp 
        this.quintaPrev = this.prev.list[4].main.temp 
        */
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
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    geoLocation2() {
      navigator.geolocation.getCurrentPosition(this.buildUrlUV, this.geoError);
    },
    geoLocation3() {
      navigator.geolocation.getCurrentPosition(
        this.buildUrlPrev,
        this.geoError
      );
    },

    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const lan_c = "pt";

      this.getWeather(
        this.API + "&lat=" + lat + "&lon=" + lon + this.KEY + "&lang=" + lan_c
      );
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
  beforeMount() {
    this.geolocation();
    this.geoLocation2();
    this.geoLocation3();
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