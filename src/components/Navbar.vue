<template>
  <nav>
    <v-toolbar flat class="blue lighten-3">
      <v-toolbar-title class="white--text">
        <span>M</span>
        <span class="font-weight-light">etereologia</span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
      <span v-if="isLoggedIn" class="white--text font-weight-light">{{this.currentUser}}</span> 
      <div v-if="isLoggedIn">
        <CheckWeatherBtn /> 
      </div> 
      <div v-if="!isLoggedIn">
       <v-btn depressed text class="white--text" @click="home()">
         <span>Home</span>
       </v-btn>
      </div>
      <div v-if="!isLoggedIn">
        <LoginBtn /> 
      </div>
      <div v-if="!isLoggedIn">
        <RegisterBtn />  
      </div> 
      <div v-if="isLoggedIn">
       <v-btn depressed text class="white--text" @click="logout()">
         <span>Logout</span>
       </v-btn>
      </div>
      <!--<span class="white--text font-weight-light">{{ this.currentUser }}</span>-->
     </v-toolbar>
  </nav>
</template>

<script>
//import DropdownMenu from './DropdownMenu'; 
import CheckWeatherBtn from './CheckWeatherBtn'; 
import LoginBtn from './LoginBtn'; 
import RegisterBtn from './RegisterBtn';
import firebase from 'firebase';

export default { 
  components: {CheckWeatherBtn, LoginBtn, RegisterBtn},
  data() {
    return {
      isLoggedIn: false, 
      currentUser: false
    };
  }, 
  created() { 
    console.log("heyyyy")
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
      console.log("firebase" + firebase.auth().currentUser.email)
      this.currentUser = firebase.auth().currentUser.email; 
    }
  }, 
  methods:{ 
    logout: function() { 
      console.log("Estou a fazer logout")
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }, 
    home(){ 
       this.$router.push({
            name: 'landing'  
    });
  } 
  } 
};
</script>

<style>
.flag:hover {
  cursor: pointer;
}
</style>
