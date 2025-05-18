import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import App from './App.vue'
import router from './router'

// PrimeVue styles are now imported in App.vue

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

// Register PrimeVue components globally
app.component('PButton', Button)
app.component('PInputText', InputText)
app.component('PCard', Card)
app.component('PDataTable', DataTable)
app.component('PColumn', Column)
app.component('PDropdown', Dropdown)
app.component('PMessage', Message)
app.component('PToast', Toast)

app.mount('#app') 