<template>
  <div class="text-center">
        <v-btn depressed text class="white--text" @click="goMapas()">
          <span>Ver Mapas</span>
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
      goMapas(){ 
           this.$router.push({
            name: 'checkmaps',  
        });
      }
  }
};
</script>
