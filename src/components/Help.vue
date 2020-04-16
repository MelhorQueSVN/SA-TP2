<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn depressed text class="white--text" v-on="on">
          <span>Ajuda</span>
          <v-icon right>info</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Ajuda <v-icon>mdi-shield-sun</v-icon></v-card-title>
        <v-card-text>
          O indice ultra violeta é uma escala internacional que mede a radiação ultra violeta num dado instante. 
          A escala UV é a seguinte:  
        </v-card-text>
         <v-card-text> 
          Verde (0-2) : Risco de sáude baixo. 
        </v-card-text>
         <v-card-text>
          Amarelo (3-5) :  Risco intermédio, aconselhável usar protetor solar, óculos de sol e roupas claras. 
         <v-card-text>
         </v-card-text>
          Laranja (6-7) :  Risco alto, necessário reduzir tempo passado por debaixo do sol, usar protetor solar, óculos de 
          sol e roupa clara. 
         </v-card-text>
          <v-card-text>
          Vermelho (8-10) : Risco elevado, tomar todas as precauções anteriores e diminuir ao máximo contacto com a luz solar. 
          </v-card-text> 
          <v-card-text>
          Violeta (11+) : Risco extremo, tomar todas as precauções possíveis uma vez que contacto desprotegido com o sol em pouco
          tempo poderá originar queimaduras.
          </v-card-text>
          <v-card-text> 
              <v-img src="../assets/uvTabela.png"></v-img>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" text @click="dialog = false"
            >Sair</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>