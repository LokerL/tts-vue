import { createApp } from "vue";
import App from "./App.vue";
import { globalRegister } from "./global";
import { createPinia } from "pinia";
import i18n from './assets/i18n/i18n';
// import { useI18n } from 'vue-i18n';

// const App = {
//   setup() {
//     const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
//     return { t } // return render context that included `t`
//   }
// }
const app = createApp(App) as any;
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(globalRegister);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
