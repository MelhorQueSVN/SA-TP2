import Vue from 'vue';
import Router from 'vue-router'; 
import Login from '../views/Login.vue';
import Register from '../views/Register.vue' 
import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'; 
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, 
      meta: { 
        requiresAuth: true
      }
    },
    { 
      path: '/Login', 
      name: 'login', 
      component: Login, 
      meta: { 
        requiresGuest: true
      }
    }, 
    { 
      path: '/Register', 
      name: 'register', 
      component: Register, 
      meta: { 
        requiresGuest: true
      }
    }, 
    { 
      path: '/Landing', 
      name: 'landing', 
      component: Landing, 
      meta: { 
        requiresGuest: true
      } 
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to landing
      next({
        path: '/Landing',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged user
    if (firebase.auth().currentUser) {
      // Go to home
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
}); 

export default router;