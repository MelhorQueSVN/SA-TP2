<template>
  <nav>
    <v-toolbar flat class="blue lighten-3">
      <v-toolbar-title class="white--text">
        <span>M</span>
        <span class="font-weight-light">etereologia</span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
      <CheckMapsBtn /> 
      <CheckWeatherBtn />
     </v-toolbar>
  </nav>
</template>

<script>
//import DropdownMenu from './DropdownMenu'; 
import CheckMapsBtn from './CheckMapsBtn'; 
import CheckWeatherBtn from './CheckWeatherBtn';

export default {
  components: {CheckMapsBtn, CheckWeatherBtn},
  data() {
    return {};
  }, 
  methods:{ 
  } 
};
</script>

<style>
.flag:hover {
  cursor: pointer;
}
</style>
