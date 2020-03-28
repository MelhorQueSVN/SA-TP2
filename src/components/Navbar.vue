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
      <LoginBtn /> 
      <RegisterBtn /> 
     </v-toolbar>
  </nav>
</template>

<script>
//import DropdownMenu from './DropdownMenu'; 
import CheckMapsBtn from './CheckMapsBtn'; 
import CheckWeatherBtn from './CheckWeatherBtn'; 
import LoginBtn from './LoginBtn'; 
import RegisterBtn from './RegisterBtn';

export default {
  components: {CheckMapsBtn, CheckWeatherBtn, LoginBtn, RegisterBtn},
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
