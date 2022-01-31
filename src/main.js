import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && store.state.user == null) {   
    return next('/login');}
  else {
    return next();}
})

router.beforeEach((to, from, next) => {
  const userCompleted = to.matched.some(record => record.meta.userComplete);
  if(userCompleted && store.state.entreprise.length == 0 ) {   
    return next('/stepper');}
  else {
    return next();}
})
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:MM')
  }
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
