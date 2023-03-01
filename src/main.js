import { createApp } from 'vue'
import App from './App.vue'



import '@/scss/index_style.scss'
import '@/scss/qa_style.scss'
import '@/scss/signIn_style.scss'
import '@/scss/admin_style.scss'
import '@/scss/news_style.scss'
import '@/scss/news_info_style.scss'
import '@/scss/contant_style.scss'
import '@/scss/order_style.scss'
import '@/scss/cart_style.scss'
import '@/scss/accont_style.scss'
import '@/scss/checkout_style.scss'
import '@/scss/aboutus_style.scss'
import '@/scss/productsIntroduce_style.scss'
import { registerPlugins } from '@/plugins'

(async () => {
    const app = createApp(App)

    await registerPlugins(app)

    app.mount('#app')
})()


