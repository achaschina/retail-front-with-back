import Vue from 'vue'
import vueResource from 'vue-resource'
import vueRouter from 'vue-router'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Routes  from './utilities/router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./styles/style.css"
window.$ = window.jQuery = require('jquery')
import VueCarousel from 'vue-carousel'
import './styles/vue-simple-context-menu.css'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import VueCookie from 'vue-cookie'
import * as Auth from './components/Layout/index'
import AuthComponent from './components/Layout/authentication/Authentication.vue'
// import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(VueCookie)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(vueResource)
Vue.use(vueRouter)
Vue.use(VueCarousel)
// Vue.component('auth-component', AuthComponent)
Vue.component('vue-simple-context-menu', VueSimpleContextMenu)

Auth.default.checkAuthentication()

const router = new vueRouter({
  mode: 'history',
  routes: Routes
}); 

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
});

new Vue ({
  el: '#app',
  render: h => h(App),
  router: router
})