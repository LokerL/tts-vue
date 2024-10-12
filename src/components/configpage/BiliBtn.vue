<template>
  <div>
    <button @click="bilibili">
      <div class="svg-wrapper-1">
        <div class="svg-wrapper">
          <img src="https://www.bilibili.com/favicon.ico?v=1" alt="" />
        </div>
      </div>
      <span style="font-weight: 700">{{ t('bilibtn.goToBilibili') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { shell } = require("electron");
const { t } = useI18n();
const bilibili = () => {
  shell.openExternal("https://space.bilibili.com/19149591");
};
</script>

<style scoped>
button {
  font-family: inherit;
  font-size: 20px;
  background: #fff;
  color: rgb(0, 161, 214);
  padding: 0.2em 0.8em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  border: 3px solid rgb(0, 161, 214);
}

button span {
  display: block;
  margin-left: 0.3em;
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
  transform: translateX(2em) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.95);
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
