import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Layout, Menu, List, Space } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html'
import '@kangc/v-md-editor/lib/style/preview-html.css'

import formatDate from './common/formatDate'
import login from './common/login'

const pinia = createPinia()

VMdPreview.use(githubTheme, {
    extend(md:any){
        md.renderer.rules.image
    }
})
const app = createApp(App)
app.config.globalProperties.$login = login
app.config.globalProperties.$formatDate = formatDate
app.use(router)
.use(pinia)
.use(VMdPreview)
.use(VMdPreviewHtml)
.use(Layout)
.use(Menu)
.use(List)
.use(Space)
.mount('#app')
