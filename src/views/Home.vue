<template>
<div id="app"> 
  <p> Chamada à <a href="https://openweathermap.org/">OpenWeather</a> API </p>
  {{ this.info }}
</div>  
</template> 

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() { 
    return { 
       info: null 
    }
  }, 
  mounted: function() {
    // o url da chamada tem de ter sempre aquele formato http://... e sempre!! com appid
    axios
      .get("http://api.openweathermap.org/data/2.5/uvi/history?appid=2aaf6c39c46c00fc3969d144655bf6c2&lat=37.75&lon=-122.37&start=1498049953&end=1498481991")
      .then(dados => { 
        console.log(dados) 
        this.info = dados
      })
      .catch(err => {
        this.error = err.message;
      });
  }
}
</script>
