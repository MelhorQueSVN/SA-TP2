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
            <!-- o v-bind:label, tive de fazer assim para conseguir traduzir o interior do campo -->
            <!--  <v-btn @click="reset">clear</v-btn> /-->
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
       info: null 
    }
  }, 
  mounted: function() {
    // o url da chamada tem de ter sempre aquele formato http://... e sempre!! com appid
    axios 
      .get("https://tile.openweathermap.org/map/clouds_new/0/0/0.png?appid=2aaf6c39c46c00fc3969d144655bf6c2")
      .then(dados => { 
        console.log(dados) 
        this.info = dados.data
      })
      .catch(err => {
        this.error = err.message;
      }); 
  }
}
</script>
