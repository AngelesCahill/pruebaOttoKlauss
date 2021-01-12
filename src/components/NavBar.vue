<template>
    <div>
        
        <v-layout>
            <v-flex>
                <v-toolbar class="indigo navSup">
                    <v-toolbar-title class="light-green--text logo"> Otto Klauss</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn class="amber white--text mr-3"  @click="$router.push({name:'Home'})">Home</v-btn>
                    </div>

                    <div>
                        <v-btn class="amber white--text mr-3"  @click="$router.push({name:'Inventario'})">Inventario</v-btn>
                    </div>

                    <div>
                        <v-btn class="amber white--text mr-3"  @click="$router.push({name:'Login'})">Iniciar Sesión</v-btn>
                    </div>
                    <div>
                        <v-btn class="red accent-4 white--text mr-3" :disabled="existeUser" :class="activandoSout" @click="SignOut">Cerrar Sesión</v-btn>
                    </div>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'NavBar',
    data(){
        return {
            drawer: false,
            
        }
    },
    computed: {
        ...mapGetters(['enviandoUser']),
        existeUser(){
            return !this.enviandoUser;
        },
        activandoSout(){
            return this.existeUser ? 'disabled' : ''
        },

    }, 
    methods: {
        SignOut(){
                firebase.auth().signOut().then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tu Sesión se ha cerrado exitosamente',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    this.$router.push({name:'Login'});
                    console.log('Sesion cerrada');
                }).catch((error) => {
                    console.error(error)
                });
            }
        },
}

</script>

<style lang="scss" scoped>
.navSup {
    height: 5rem !important;
}
.logo {
    font-family: shrikhad, Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 3rem;
    margin-left: 15rem;
}
.botNavVert {
    margin-left: 4rem;
    margin-top: 2rem;
}

</style>