import { createApp } from "vue";
import App from "./App.vue";
import { globalRegister } from "./global";

createApp(App)
  .use(globalRegister)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
