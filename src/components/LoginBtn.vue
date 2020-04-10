<template>
  <div class="text-center">
        <v-btn depressed text class="white--text" @click="goLogin()">
          <span>Login</span>
        </v-btn>
     </div>
</template>

<script>

export default {
  data() {
    return {
    };
  }, 
  methods: { 
      goLogin(){ 
           this.$router.push({
            name: 'login',  
      }); 
      }
  }
};
</script>
