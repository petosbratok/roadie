import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
