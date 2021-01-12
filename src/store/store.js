import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import Swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    stock: [],
  },
  getters: {
    enviandoUser(state){
      return state.user;
    },
    enviandoStock(state){
      return state.stock;
    }
  },
  mutations: {
    mutandoUser(state, datoUser){
      state.user = datoUser; 
    },
    mutandoStockActual(state, datos){
      state.stock = datos;
    },
  },
  actions: {
    user({commit},datoUser){
      commit ('mutandoUser', datoUser);
    },
    datosStockActual({commit}){
      firebase.firestore().collection('juguetes').onSnapshot((res)=>{
        let datos = [];
        res.forEach(element => {
          console.log(element.data(), element.id)
          datos.push({
            idDoc: element.id,
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
            imagen: element.data().imagen,
          })
        });
        commit('mutandoStockActual',datos);
      }, error => console.error(error));
      
    },
    eliminandoProducto(context, id){
      firebase.firestore().collection('juguetes').doc(id).delete()
        .then(()=>{
          console.log('producto eliminado');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Producto ha si eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error=>console.error(error));
    },
    
    actualizandoProducto(context, datos){
      firebase.firestore.collection('juguetes').doc(datos.idDoc).update({
        nombre: datos.nombre,
        stock: datos.stock,
        precio: datos.precio,
      })
      .then(()=>{
        Swal.fire({
          title: 'Estás seguro de guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Cambios Guardados', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los Cambios no han sido guardados', '', 'info')
          }
        })
      })
      .catch(error => console.error(error));
    }