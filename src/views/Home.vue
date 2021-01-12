<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-if="enviandoUser" class="m-5">
          <h2>Bienvenido {{enviandoUser.email}}</h2>
        </div>
        <div v-else class="m-5">
          No hay usuario registrado
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4" >
        <template>
          <v-card class="mx-1" max-width="250" v-for="(item, index) in enviandoStock" :key="index">
            <v-img :src="item.imagen" :height="item.nombre"></v-img>

            <v-card-title>
              {{item.nombre}}
            </v-card-title>

            <v-card-subtitle>
              ${{item.precio}}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text>
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </template>
      </v-col>
    </v-row>
    


       
      
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    
  },
  computed: {
    ...mapGetters(['enviandoUser','enviandoStock'])
  }
  
}
</script>
