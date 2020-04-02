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
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password" 
                    v-model="password"
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

  export default {
    props: {
      source: String,
    }, 
    data(){ 
      return{  
        email: "",  
        password: "",
      }
    }, 
    methods: { 
      register: function(e){ 
        console.log(this.password)
        firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
        .then(user => { 
          alert(`Account criada para ${user.email}`); 
          //this.$router.go({ path: this.$router.path });
          this.$router.push('/Login') 
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
