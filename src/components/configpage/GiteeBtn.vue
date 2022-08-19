<template>
  <div>
    <button @click="gitee">
      <div class="svg-wrapper-1">
        <div class="svg-wrapper">
          <img
            width="25"
            height="25"
            src="https://gitee.com/assets/favicon.ico"
            alt=""
          />
        </div>
      </div>
      <span style="font-weight: 700">Gitee</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { shell } = require("electron");
const gitee = () => {
  shell.openExternal("https://gitee.com/LGW_space/tts-vue");
};
</script>

<style scoped>
/* From uiverse.io by @adamgiebl */
button {
  font-family: inherit;
  font-size: 25px;
  background: #fff;
  color: rgb(199, 29, 35);
  padding: 0.1em 0.4em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  border: 3px solid rgb(199, 29, 35);
}

button span {
  display: block;
  margin-left: 0.25em;
  transition: all 0.3s ease-in-out;
}

button img {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover img {
  transform: translateX(1.2em) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.9);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
