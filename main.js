import App from './App'
import YppHeader from './components/YppHeader/YppHeader.vue'
import YppFooter from './components/YppFooter/YppFooter.vue'
import GlobalSidebar from './components/GlobalSidebar/GlobalSidebar.vue'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
export function createApp() {
  const pinia = createPinia()
  const app = createSSRApp(App)
  app.component('ypp-header',YppHeader)
  app.component('ypp-footer',YppFooter)
	app.component('global-sidebar',GlobalSidebar)
  app.use(pinia)
  return {
    app
  }
}
// #endif