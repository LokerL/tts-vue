<template>
  <div class="donate">
    <div class="des">
      <h3>{{ t('donate.appreciation') }}</h3>
      <h3>
        {{ t('donate.encouragement') }}
      </h3>
      <p style="margin: 0 10px; font-size: 11px">
        <p>{{ t('donate.guideReminder') }}</p>
        <p>{{ t('donate.feedback') }}</p>
      </p>
    </div>

    <div class="btns"><GiteeBtn></GiteeBtn> <GithubBtn></GithubBtn></div>
    <div class="card">
      <div class="content">
        <div class="front">
          <h3 class="title">{{ t('donate.buyCoffeeTitle') }}</h3>
          <h3 class="title-pay">
            {{ t('donate.wechatPayment') }} <span>{{ t('donate.hoverForAlipay') }}</span>
          </h3>
          <img
            class="subtitle-img"
            src="https://cdn.staticaly.com/gh/LokerL/picx-images-hosting@master/wx.webp"
            alt=""
            srcset=""
          />
        </div>

        <div class="back">
          <h3 class="title">{{ t('donate.buyDrinkTitle') }}</h3>
          <h3 class="title-pay">
            {{ t('donate.alipayPayment') }} <span>{{ t('donate.hoverForWechat') }}</span>
          </h3>
          <img
            class="subtitle-img"
            src="https://cdn.staticaly.com/gh/LokerL/picx-images-hosting@master/zfb.webp"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GiteeBtn from "./GiteeBtn.vue";
import GithubBtn from "./GithubBtn.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();  
</script>

<style scoped>
.donate {
  width: 400px;
  margin-bottom: 1px;
}
.donate .des {
  margin-bottom: 10px;
}
h3 {
  margin: 1px 10px;
  font-size: 1em;
}
.des p {
  margin: 0;
}
.btns {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* From uiverse.io by @JoseIsra */
.card {
  margin-top: 10px;
  height: 32vh;
  width: 38vw;
  max-width: 450px;
  cursor: pointer;
}

.content {
  border-radius: 10px;
  text-align: center;
  position: relative;
  transition: all 2.25s;
  background-color: #00c250;
  padding: 5em;
  transform-style: preserve-3d;
  height: 100%;
  margin-left: 15px;
}

.card:hover .content {
  transform: rotateY(0.5turn);
}

.front,
.back {
  border-radius: 10px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.title {
  transform: translateZ(5rem);
  font-size: 1.7rem;
}
.subtitle-img {
  transform: translateZ(2rem);
  margin-top: 15px;
  border-radius: 10px;
  width: 28vw;
  max-width: 360px;
  height: 38vh;
  max-height: 380px;
}
.subtitle {
  transform: translateZ(2rem);
}

.back {
  transform: rotateY(0.5turn);
  background-color: #1677ff;
}

.title-pay {
  transform: translateZ(3rem);
}
.title-pay span {
  transform: translateZ(3rem);
  font-size: 0.7em;
}
</style>
