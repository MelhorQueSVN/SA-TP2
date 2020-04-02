import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import * as firebase from "firebase"; 

Vue.config.productionTip = false


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATZrg6WI1ECjqx4U_TbzLE25ZWw89L0Dg",
    authDomain: "weather-forecast-f20cb.firebaseapp.com",
    databaseURL: "https://weather-forecast-f20cb.firebaseio.com",
    projectId: "weather-forecast-f20cb",
    storageBucket: "weather-forecast-f20cb.appspot.com",
    messagingSenderId: "60432769540",
    appId: "1:60432769540:web:5106fdab1b7c9f3781cb51",
    measurementId: "G-E1QB14D2E6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
new Vue({
  router,
  vuetify, 
  render: h => h(App)
}).$mount('#app')
