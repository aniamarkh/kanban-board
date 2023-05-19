import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import './assets/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('board', JSON.stringify(state.board));
  },
  { deep: true }
);
