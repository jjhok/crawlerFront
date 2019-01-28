import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$detailPageCount = 1
Vue.prototype.$inputDict = {}

new Vue({
  render: h => h(App),
}).$mount('#app')
