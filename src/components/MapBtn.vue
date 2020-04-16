<template>
  <div class="text-center">
        <v-btn depressed text class="white--text" @click="goMaps()">
          <span>Ver mapa UV</span>
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
      goMaps(){ 
        this.$router.push({
            name: 'mapa'  
        }); 
    }
  }
};
</script>
