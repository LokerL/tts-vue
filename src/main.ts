import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import { globalRegister } from "./global";
import { createPinia } from "pinia";

const app = createApp(App) as any;
const pinia = createPinia();

app.use(pinia);
app.config.globalProperties.$mitt = mitt();
app.use(globalRegister);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
