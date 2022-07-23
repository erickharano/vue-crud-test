import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueMask from 'v-mask'

import 'bootstrap-vue'

// Add bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

// App.use(VueMask)

createApp(App).use(router).mount('#app')
