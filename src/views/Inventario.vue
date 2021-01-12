<template>
    <div>
        <h1>Vista Inventario</h1>
        <div class="ma-5 border">
            <h2 class="my-5 text-center">Inventario Tienda</h2>
            <v-simple-table class="mt-5">
                <template>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in enviandoStock" :key="index">
                        <td>{{ item.codigo }}</td>          
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.stock }}</td>
                        <td>{{ item.precio }}</td>
                        <td><v-btn class="amber white--text mr-3" @click="editarProducto(item.idDoc)">Editar</v-btn></td>
                        <td><v-btn class="red accent-4 white--text mr-3" @click="eliminarProducto(item.idDoc)">Eliminar</v-btn></td>
                    </tr>
                </tbody>

                  <v-row justify="center">
                        <v-dialog  v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">

                            <v-btn class="indigo white--text my-5 mx-auto" v-bind="attrs" v-on="on">
                            Agregar Producto
                            </v-btn>

                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">Agregar Producto</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" xm="12" md="6">
                                    <v-text-field label="Codigo Producto*" required v-model="codigo">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" xm="12" md="6">
                                    <v-text-field label="Nombre del Producto*" required v-model="nombre">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" xm="12" md="6">
                                    <v-text-field label="Stock*"  required v-model="stock">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" xm="12" md="6">
                                    <v-text-field label="Precio*" required v-model="precio">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" xm="12" md="6">
                                    <v-text-field label="Imagen*" required v-model="imagen">
                                    </v-text-field>
                                </v-col>
                                
                                </v-row>
                            </v-container>
                            <small>*Campos requeridos</small>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            
                                <v-btn color="blue darken-1" text @click.prevent="agregarProducto">
                                Agregar Producto
                            </v-btn>
                            
                            
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Cerrar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Save
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-row>

                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';
import firebase from 'firebase';

export default {
    name: 'Inventario',
    data(){
        return {
            dialog: false,
            codigo:'',
            nombre:'',
            stock: '',
            precio: '',
            imagen: '',
        }
    },
    computed: {
        ...mapGetters(['enviandoStock'])
    },
    methods: {
        agregarProducto(){
            if (this.codigo.length > 0 && this.nombre.length > 2 && this.stock >= 1 && this.precio > 0 && this.imagen) {
                firebase.firestore().collection('juguetes').add({
                    codigo: this.codigo,
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio,
                    imagen: this.imagen
                })
               
                 
                .then(resp => console.log(resp))
                .catch(error => console.error(error))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes llenar todos los campos!',
                    })
            }
        },
        eliminarProducto(id){
            this.$store.dispatch('eliminandoProducto', id);
        },
        editarProducto(idDoc){
            this.$router.push({name:'Editar', params:{id: idDoc}});
        }
    }
        
    }
</script>

<style>
.botAgregar{
    margin-top: 1rem;
    margin-left: 20rem;
}
</style>