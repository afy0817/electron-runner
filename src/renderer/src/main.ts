import './assets/main.css'

import { createApp } from 'vue'
import App from '@renderer/App.vue'
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
