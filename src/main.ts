import { createApp } from "vue";
import App from "./App.vue";
import { globalRegister } from "./global";
import { createPinia } from "pinia";
import i18n from './assets/i18n/i18n';

const app = createApp(App) as any;
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(globalRegister);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
