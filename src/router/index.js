import Vue from 'vue';
import Router from 'vue-router';
import CheckMaps from '../views/CheckMaps.vue'; 
import Login from '../views/Login.vue';
import Register from '../views/Register.vue'
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/CheckMaps',
      name: 'checkmaps',
      component: CheckMaps
    }, 
    { 
      path: '/Login', 
      name: 'login', 
      component: Login
    }, 
    { 
      path: '/Register', 
      name: 'register', 
      component: Register
    }
  ]
});
