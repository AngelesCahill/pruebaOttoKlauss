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
          <v-col cols="12" sm="12" md="6" lg="6" xl="6" >
            <v-card class="mx-auto" max-width="344" outlined v-for="(item, index) in enviandoStock" :key="index">
              <v-list-item>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{item.nombre}}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    ${{item.precio}}
                  </v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <img max-height="200px" max-width="300px" class="mx-auto" :src="item.imagen" :alt="item.id">
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text>
                  Button
                </v-btn>
              </v-card-actions>
            </v-card>
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
