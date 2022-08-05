# TTS-Vue

🎤 微软语音合成工具，使用 `Electron` + `Vue` + `ElementPlus` + `Vite` 构建.

## 开始使用

### 1. 下载安装

- 方法 1：直接下载安装包：
  [下载地址 Gitee](https://gitee.com/LGW_space/tts-vue/attach_files/1142731/download/vue-tts.zip)
  [下载地址 GitHub](https://github.com/LokerL/tts-vue/releases/download/untagged-18f6b9dc2aafce098458/vue-tts.zip)
  [下载地址 lanzou 云](https://wwn.lanzoul.com/iOOza08rnzed)
  ![tts-vue.zip](http://pic.rmb.bdstatic.com/bjh/50c9038bab1165bce67cf26b763be521.png)
  解压压缩包得到安装程序`tts-vue_1.0.0.exe`
  双击安装程序`tts-vue_1.0.0.exe`，选择安装位置，点击安装。
  ![安装结束](http://pic.rmb.bdstatic.com/bjh/226a11ce4887c21429d0ad1da1dd5d69.png)
- 方法 2：通过源码编译：（适合有开发能力的小伙伴）
  GitHub: https://github.com/LokerL/tts-vue
  Gitee: https://gitee.com/LGW_space/tts-vue
  下载源码后运行
  ```shell
  # npm
  npm install
  npm run dev
  npm run build
  或者
  # yarn
  yarn
  yarn dev
  yarn build
  ```

### 2. 功能介绍

#### 2.1 文本转语音

![](http://pic.rmb.bdstatic.com/bjh/f94c2d5dcdb7b038670662773c47a8eb.png)
在`文本`菜单中，有`文本`和`SSML`两个标签页面。
`文本`菜单的`文本`标签页：可以输入要转换为语音的文字。
`文本`菜单的`SSML`标签页：可以输入要转换为语音的 SSML 标签语言。

在设置区域，可以设置语音的`语言`，`语音`，` 说话风格`，`角色扮演`，`语速`，`音调`选项。

语速默认为`1`，为正常语速；音调默认为`1`，为正常音调；

点击`保存配置`可以保存当前设置区域的配置，并在下方的下拉选择框中选择已保存的配置。

打开软件默认选择`默认配置`。想要修改默认配置，可以在`保存配置`时，给配置起名为`默认`即可替换默认配置。

点击**开始转换**即可通过中间文本/SSML 区域内容以及右侧配置选项生成语音。

语音生成成功后，即可在下方点击播放进行试听。

播放按钮右侧绿色下载按钮，点击可以下载当前试听的声音为.mp3，默认保存位置为桌面。

#### 2.2 文本批量转语音

![](http://pic.rmb.bdstatic.com/bjh/2af8a0096632014b50ce6a8176a5e8f6.png)

在`批量`菜单中，可以批量的将多个.txt 文件转为.mp3 文件。

点击选择文件可以选择多个文本文件，选择完成后，可以看到文件的路径、字数以及当前为`ready`状态。

不需要的文件可以点击同行的`删除`按钮。

在右侧的设置区域配置好相应的选项后，点击**开始转换**，即可转换多个文件为 mp3。默认保存路径为桌面。

#### 2.3 程序设置

![](http://pic.rmb.bdstatic.com/bjh/ec364eb5f5551e4cd581272bd02fa8f8.png)

在`设置`菜单中，可以进行以下设置：

- 文件保存路径：修改文件保存路径并点击`确认`。

- 是否自动播放：配置为`是`时，文本转为语音后，可以自动播放。批量转换时无效。

- 配置模板编辑：保存的模板可以在这里查看或删除。鼠标放在配置名字上可以显示全部配置内容。

  ![](http://pic.rmb.bdstatic.com/bjh/dabc0e3200b44c0c3c1f65cfca586160.png)

修改完成后其实已经自动保存完成，可以点击`刷新配置`以立即应用。

#### 2.3 其他说明

关闭软件：左上角红色圆圈按钮
最小化：左上角绿色圆圈按钮

#### 更新

##### V1.5.0

- 使用 Pinia 进行状态控制，重构大部分的代码。
- `SSML`标签页可以同步`文本`标签页的内容了。
- 批量转换页面，批量转换完成后，可以`播放`和`打开所在文件夹`。
- 批量转换页面，允许`清空`当前文件表格中的内容（不会删除文件）。
- 设置页面，可以直接打开配置文件进行修改。修改完了记得`刷新配置`。
- 去除 Bilibili 按钮，添加 Gitee 按钮
- 修复了一些莫名其妙的 BUG。

#### 可能出现的问题

> **点击下载没反应，下载文件为文本文档？**

可能出现问题的原因：
1 正确的下载方法是转换完成后点击绿色的下载图标，而不是播放器控件的扩展下载，点播放器控件的下载会默认保存为 xxxx.txt。
2 点击绿色下载没反应？因为默认保存位置是桌面，所以要检查当前登录的账户有没有写入桌面文件的权限。
解决方法：
1 尝试更改默认下载位置为其他盘。
2 以管理员身份运行此软件。
3 要是想直接用播放器控件下载音乐，可以在保存的时候更改文件名后缀为.mp3 即可。（如果你已经下载完了，可以尝试更改下载的文本文档.txt 后缀名为.mp3）

### Related

- [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) - 🥳 Really simple Electron + Vite + Vue boilerplate.
- [electron](https://www.electronjs.org/) - :electron: Build cross-platform desktop apps with JavaScript, HTML, and CSS
- [electron-builder](https://github.com/electron-userland/electron-builder) - A complete solution to package and build a ready for distribution Electron app with “auto update” support out of the box
- [Vue](https://github.com/vuejs/vue) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
- [element-plus](https://github.com/element-plus/element-plus) - 🎉 A Vue.js 3 UI Library made by Element team
- [mstts.js](https://github.com/ezshine/mstts-js)
