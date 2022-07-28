import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import { globalRegister } from "./global";

const app = createApp(App) as any;
app.use(globalRegister);
app.config.globalProperties.$mitt = mitt();
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
