# TTS-Vue

🎤 微软语音合成工具，使用 `Electron` + `Vue` + `ElementPlus` + `Vite` 构建.


## 开始使用

### 1. 下载安装
* 方法1：直接下载安装包：
    [下载地址Gitee](https://gitee.com/LGW_space/tts-vue/attach_files/1142731/download/vue-tts.zip)	
    [下载地址GitHub](https://github.com/LokerL/tts-vue/releases/download/untagged-18f6b9dc2aafce098458/vue-tts.zip)	
    [下载地址lanzou云](https://wwn.lanzoul.com/iOOza08rnzed)	
     ![tts-vue.zip](http://pic.rmb.bdstatic.com/bjh/50c9038bab1165bce67cf26b763be521.png)
    解压压缩包得到安装程序`tts-vue_1.0.0.exe`
    双击安装程序`tts-vue_1.0.0.exe`，选择安装位置，点击安装。
    ![安装结束](http://pic.rmb.bdstatic.com/bjh/226a11ce4887c21429d0ad1da1dd5d69.png)
    
* 方法2：通过源码编译：（适合有开发能力的小伙伴）
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
`文本`菜单的`SSML`标签页：可以输入要转换为语音的SSML标签语言。

在设置区域，可以设置语音的`语言`，`语音`，` 说话风格`，`角色扮演`，`语速`，`音调`选项。

语速默认为`1`，为正常语速；音调默认为`1`，为正常音调；

点击`保存配置`可以保存当前设置区域的配置，并在下方的下拉选择框中选择已保存的配置。

打开软件默认选择`默认配置`。想要修改默认配置，可以在`保存配置`时，给配置起名为`默认`即可替换默认配置。

点击**开始转换**即可通过中间文本/SSML区域内容以及右侧配置选项生成语音。

语音生成成功后，即可在下方点击播放进行试听。

播放按钮右侧绿色下载按钮，点击可以下载当前试听的声音为.mp3，默认保存位置为桌面。
#### 2.2 文本批量转语音

![](http://pic.rmb.bdstatic.com/bjh/2af8a0096632014b50ce6a8176a5e8f6.png)

在`批量`菜单中，可以批量的将多个.txt文件转为.mp3文件。

点击选择文件可以选择多个文本文件，选择完成后，可以看到文件的路径、字数以及当前为`ready`状态。

不需要的文件可以点击同行的`删除`按钮。

在右侧的设置区域配置好相应的选项后，点击**开始转换**，即可转换多个文件为mp3。默认保存路径为桌面。

#### 2.3 程序设置

![](http://pic.rmb.bdstatic.com/bjh/ec364eb5f5551e4cd581272bd02fa8f8.png)

在`设置`菜单中，可以进行以下设置：

* 文件保存路径：修改文件保存路径并点击`确认`。

* 是否自动播放：配置为`是`时，文本转为语音后，可以自动播放。批量转换时无效。

* 配置模板编辑：保存的模板可以在这里查看或删除。鼠标放在配置名字上可以显示全部配置内容。

  ![](http://pic.rmb.bdstatic.com/bjh/dabc0e3200b44c0c3c1f65cfca586160.png)

修改完成后其实已经自动保存完成，可以点击`刷新配置`以立即应用。

#### 2.3 其他说明
关闭软件：左上角红色圆圈按钮
最小化：左上角绿色圆圈按钮