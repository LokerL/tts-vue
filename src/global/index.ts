import { App } from "vue";
import registerElement from "./registerElement";
import initLocalStore from "./initLocalStore";

export function globalRegister(app: App) {
  initLocalStore();
  app.use(registerElement);
}
