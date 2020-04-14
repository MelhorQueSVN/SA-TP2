<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-6">
              <v-toolbar
                class="blue lighten-3"
                flat
              >
                <v-toolbar-title>Registo</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login" 
                    prepend-icon="email"
                    type="text" 
                    v-model="email"
                  />
                  
                  <v-text-field
                    label="Distrito"
                    name="distrito" 
                    prepend-icon="mdi-map-marker"
                    type="text" 
                    v-model="distrito"
                  />
                  
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password" 
                    v-model="password"
                  /> 

                  <v-text-field
                    id="confirmPassword"
                    label="Confirmar Password"
                    name="confirmPassword"
                    prepend-icon="lock"
                    type="password" 
                    v-model="confirmPassword" 
                    :rules="[comparePasswords]"
                  /> 
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="register" color="blue lighten-3">Registar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script> 
import firebase from 'firebase'; 
//import {db} from '../main';

export default {
    props: {
      source: String,
    }, 
    data(){ 
      return{  
        email: "",  
        password: "",
        confirmPassword: "",
        distrito: ""
      }
    },  
    computed: { 
      comparePasswords () { 
        return this.password !== this.confirmPassword ? 'Passwords não são iguais!' : true
      }
    },
    methods: { 
      register: function(e){ 
        console.log(this.password)
        firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
        .then(user => {  
          //const databaseRef = firebase.database(); 
          this.$http.post('https://weather-forecast-f20cb.firebaseio.com/distritos.json',{ 
            distrito : this.distrito, 
            email : this.email
          }).then(data => console.log(data))
          
          alert("Registo feito para " + user.user.email + "  " + this.distrito); 
          //this.$router.go({ path: this.$router.path });
          this.$router.go({ path: this.$router.path });
          //this.$router.go({path: "/Login" });
        }, 
        err =>{ 
          alert(err.message);
        })
        e.preventDefault();
      }
    }

  }
</script>
