import {
  ElContainer,
  ElIcon,
  ElButton,
  ElButtonGroup,
  ElMenu,
  ElInput,
  ElForm,
  ElSelect,
  ElSlider,
  ElOption,
} from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import * as Icons from "@element-plus/icons-vue";

const components = [
  ElContainer,
  ElContainer.Header,
  ElContainer.Main,
  ElContainer.Aside,
  ElContainer.Footer,

  ElIcon,
  ElButton,
  ElButtonGroup,
  ElMenu,
  ElMenu.MenuItem,

  ElInput,
  ElForm,
  ElForm.FormItem,
  ElSelect,
  ElSelect.Option,
  ElSlider,
];

export default function (app: any) {
  for (const component of components) {
    app.component(component.name, component);
  }

  for (const name in Icons) {
    app.component(name, (Icons as any)[name]);
  }
}
