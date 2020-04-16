import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import * as firebase from "firebase";
import {
  firestorePlugin
} from 'vuefire'

import './firebase'
import VueGoogleCharts from 'vue-google-charts' 

Vue.config.productionTip = false
Vue.use(VueGoogleCharts)
Vue.use(firestorePlugin)

firebase.analytics();

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    console.log(user)
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});