import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: () => import(/* webpackChunkName: "Inventario" */ '../views/Inventario.vue'),
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    props: true,
    component: () => import(/* webpackChunkName: "Editar" */ '../views/Editar.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let login = to.matched.some(result => result.meta.requiresAuth);
  if (!usuario && login){
    next ({name: 'Login'});
  }else if(usuario && !login){
    next();
  }else{
    next();
  }
})

export default router
