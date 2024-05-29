import { createApp, reactive } from "vue";
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import '../node_modules/nprogress/nprogress.css' 
import NProgress from 'nprogress'


const app = createApp(App)

// Create a reactive object
const GStore = reactive({ flashMessage: '' })
app.provide('GStore', GStore)  // provide this object so others can inject it

app.use(createPinia())
app.use(router)


router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {

    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) { // <--- If this navigation came from a previous page.
      return false
    } else {  // <--- Must be navigating directly
      return { path: '/' }  // <--- Push navigation to the root route.
    }
  }
})

app.mount('#app')
