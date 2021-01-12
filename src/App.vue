<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import firebase from 'firebase';

export default {
  name: 'App',

  components: {
    NavBar
  },

  data() {
    return {

    }
  },
  
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('user', user);

      } else {
        this.$store.dispatch('user', '');
      }
    });
    this.$store.dispatch('datosStockActual');
  },
};
</script>
