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
  ElSelectV2,
  ElMenuItem,
  ElTable,
  ElTag,
  ElUpload,
  ElDialog,
  ElDivider,
  ElSwitch,
  ElPopover,
  ElDropdown,
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
  ElSelectV2,
  ElSelect.Option,
  ElSlider,
  ElMenu,
  ElMenu.MenuItem,

  ElTable,
  ElTable.TableColumn,
  ElTag,

  ElUpload,
  ElDialog,
  ElSwitch,
  ElPopover,
  ElDivider,

  ElDropdown,
  ElDropdown.DropdownMenu,
  ElDropdown.DropdownItem,
];

export default function (app: any) {
  for (const component of components) {
    app.component(component.name, component);
  }

  for (const name in Icons) {
    app.component(name, (Icons as any)[name]);
  }
}
