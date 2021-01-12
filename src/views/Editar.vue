<template>
    <v-container>
        <h3 class="my-5 text-center display-3">Editando Juguete: </h3>
        <h4 class="mx-5">{{nombre}}</h4>
        <img :src="imagen" :alt="codigo" class="prod mb-5">
        <div>
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <v-text-field v-model="nombre" :counter="20" :rules="nombreRules" label="Nombre" required></v-text-field>
                
                <v-text-field v-model="stock" :rules="stockRules" label="Stock" required></v-text-field>
                
                <v-text-field v-model="precio" :rules="precioRules" label="Precio" required></v-text-field>

                <div class="mt-5">
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate(idDoc)">
                        Guardar
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">
                        Borrar
                    </v-btn>
                    <v-btn color="warning" @click="resetValidation">
                        Descartar
                    </v-btn>
                    <v-btn color="primary" class="ml-4" @click="$router.go(-1)">
                        Regresar
                    </v-btn>
                </div>
            </v-form>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Editar',
    props: ['id'],
    data(){
        return {
            valid: true,
            dialog: false,
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            imagen: '',
            precioRules: [
                v => !!v || 'Precio es requerido',
                v => (v && v.length >= 0 && /\d/gmi.test(v) && v >= 0) || 'Solo deben ser numeros positivos',
            ],
            nombreRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 2) || 'Name must be less than 10 characters',
            ],
            stockRules: [
                v => !!v || 'Stock es requerido',
                v => (v && v.length >= 0 && /\d/gmi.test(v) && v >= 0) || 'Solo deben ser numeros positivos',
            ]
        }
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => {
            this.dialog = false;
            this.$router.go(-1)
        }, 2000)
      },
    },
    computed: {
        ...mapGetters(['enviandoStock'])
    },
    mounted(){
        let datos = this.enviandoStock.find(stock => stock.idDoc === this.id);
         if (datos !== undefined) {
             this.nombre = datos.nombre;
             this.stock = datos.stock;
             this.precio = datos.precio;
             this.codigo = datos.codigo;
             this.imagen = datos.imagen;
         } else {
             Swal.fire('Este producto no existe');
         }
    },
    methods: {
        validate (item) {
            this.$refs.form.validate();
            if (this.$refs.form.validate()) {
                let datosNuevos = {
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: parseFloat(this.precio),
                    idDoc: item.idDoc,
                    codigo: this.codigo,
                    imagen: this.imagen,
                };
                this.$store.dispatch('actualizandoProducto', datosNuevos.idDoc).then(()=>{
                    Swal.fire(
                        'Muy Bien',
                        'Producto Actualizado con éxito',
                        'success'
                    );
                    this.reset();
                    setTimeout(()=>{
                        this.$router.replace({name: 'Inventario'});
                    },1000);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Existen errores en los datos',
                    footer: 'Intenta nuevamente'
                });
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    }
}
</script>

<style>
.prod {
    width: 100px;
    height: 100px;
}
</style>