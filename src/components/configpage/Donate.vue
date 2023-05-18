<template>
  <div class="donate">
    <div class="des">
      <h3>如果你觉得这个项目还不错，</h3>
      <h3>
        欢迎<span>Star</span>、<span>Fork</span>和<span>PR</span>。你的Star是对作者最好的鼓励：）
      </h3>
      <p style="margin: 0 10px; font-size: 11px">
        <p>使用遇到问题请仔细阅读【文档】→【使用指南】中的【功能介绍】和【常见问题】。</p>
        <p>其他意见或建议可以在【文档】→【加入Q群】中艾特或私聊群主或者管理，也可以在github或者gitee提出issues。</p>
      </p>
    </div>

    <div class="btns"><GiteeBtn></GiteeBtn> <GithubBtn></GithubBtn></div>
    <div class="card">
      <div class="content">
        <div class="front">
          <h3 class="title">请作者喝杯冰阔落🍻</h3>
          <h3 class="title-pay">
            使用微信支付 <span>鼠标悬停使用支付宝支付</span>
          </h3>
          <img
            class="subtitle-img"
            src="../../assets/wx.jpg"
            alt=""
            srcset=""
          />
        </div>

        <div class="back">
          <h3 class="title">请作者喝杯咖啡☕️</h3>
          <h3 class="title-pay">
            使用支付宝支付 <span>移开鼠标使用微信支付</span>
          </h3>
          <img
            class="subtitle-img"
            src="../../assets/zfb.jpg"
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
</script>

<style scoped>
.donate {
  width: 400px;
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
