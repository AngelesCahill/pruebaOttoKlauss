<template>
    <div>
        <v-row>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                <v-card class="overflow-hidden tarjeta" color="light-green" dark>
                    <v-toolbar flat color="indigo">
                    <v-icon x-large>mdi-account</v-icon>
                    <v-toolbar-title class="font-weight-light ml-5">
                        <strong>Inicia tu Sesión</strong> 
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text>
                    <v-text-field color="white" label="E-mail" v-model="email" :rules="emailRules" required>
                    </v-text-field>
                    <v-text-field color="white" label="Password" v-model="password" required></v-text-field>

                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="amber" @click="logIn">
                        iniciar Sesión
                    </v-btn>
                    </v-card-actions>
                   
                </v-card>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      }
    },

    methods: {
        logIn(){
            if (this.email && this.password.length >= 6){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then((result) => {
                        console.log(result.user.uid);
                        console.log(result.user.email);
                        console.log(result.user.password);
                        console.log(result.user.displayName);
                        console.log(result.user.photoURL);
                        console.log(result.user.emailVerified);
                        this.$router.push({name:'Home'});
                    })
                    .catch((error) => {
                        console.error(error.code);
                        console.error(error.message);
                    });
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Vuelve a intentarlo!',
                    })
                
            }
        }
    },
  }   

</script>

<style scoped lang="scss">
    .tarjeta {
        margin-left: 22rem;
        margin-right: -20rem;
        margin-top: 5rem;
    }
</style>