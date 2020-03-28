<template>
  <div class="text-center">
        <v-btn depressed text class="white--text" @click="goRegister()">
          <span>Registar</span>
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
      goRegister(){ 
           this.$router.push({
            name: 'register',  
        });
      }
  }
};
</script>
