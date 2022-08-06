import { createApp } from "vue";
import App from "./App.vue";
import { globalRegister } from "./global";
import { createPinia } from "pinia";

const app = createApp(App) as any;
const pinia = createPinia();

app.use(pinia);
app.use(globalRegister);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
