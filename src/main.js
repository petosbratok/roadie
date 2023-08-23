import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faPersonBiking)
library.add(faPersonRunning)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')