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
      <span class="white--text font-weight-light">{{ this.currentUser }}</span>
     </v-toolbar>
  </nav>
</template>

<script>
//import DropdownMenu from './DropdownMenu'; 
import CheckMapsBtn from './CheckMapsBtn'; 
import CheckWeatherBtn from './CheckWeatherBtn'; 
import LoginBtn from './LoginBtn'; 
import RegisterBtn from './RegisterBtn';
import firebase from 'firebase';

export default { 
  components: {CheckMapsBtn, CheckWeatherBtn, LoginBtn, RegisterBtn},
  data() {
    return {
      isLoggedIn: false, 
      currentUser: false
    };
  }, 
  methods:{ 
  },  
  created() { 
    console.log("heyyyy")
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      console.log("firebase" + firebase.auth().currentUser.email)
      this.currentUser = firebase.auth().currentUser.email; 
    }
  }, 
  mounted: function(){ 
    console.log("heyyyy")
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      console.log("firebase" + firebase.auth().currentUser.email)
      this.currentUser = firebase.auth().currentUser.email; 
    }
  }
};
</script>

<style>
.flag:hover {
  cursor: pointer;
}
</style>
