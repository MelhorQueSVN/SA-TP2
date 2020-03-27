<template>
  <div class="text-center">
        <v-btn depressed text class="white--text" @click="goTempo()">
          <span>Ver Tempo</span>
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
      goTempo(){ 
           this.$router.push({
            name: 'home',  
        });
      }
  }

};
</script>
