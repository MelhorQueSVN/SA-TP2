<template>
<div id="app"> 
      <div>
      <v-container class="white lighten-3">
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" md="10">  
            <v-spacer> </v-spacer>
            <h2> Mapa das Nuvens </h2> 
            </v-col>     
          </v-row>
          <v-container class="blue-grey lighten-4">
           <div>
            <img src="https://maps.owm.io/map/precipitation_new/0/0/0.png?appid=2aaf6c39c46c00fc3969d144655bf6c2"/>
           </div>
          </v-container>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() { 
    return { 
       info: null , 
       VANE_KEY: "2aaf6c39c46c00fc3969d144655bf6c2"
    }
  }, 
  mounted: function() {
    // o url da chamada tem de ter sempre aquele formato http://... e sempre!! com appid
    axios 
      .get("https://tile.openweathermap.org/map/clouds_new/0/0/0.png?basemap=map&appid=2aaf6c39c46c00fc3969d144655bf6c2")
      .then(dados => { 
        console.log(dados.data) 
        this.info = dados.data
      })
      .catch(err => {
        this.error = err.message;
      }); 
  }
}
</script>
