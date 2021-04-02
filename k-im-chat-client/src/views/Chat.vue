<!-- Home -->
<template>
  <div class="chat-main">
    <transition name="popup">
      <login v-if="show"></login>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import Login from '../components/Login.vue'

export default defineComponent({
  name: 'Chat',
  components: { Login },
  setup() {
    const store = useStore()

    const show = ref(false)
    return {
      show
    }
  }
})
</script>

<style lang="scss">
.chat-main {
  z-index: 999;
  overflow: hidden;
  position: relative;
  display: flex;

  max-width: 1000px;
  min-width: 800px;
  width: 100%;
  max-height: 900px;
  min-height: 600px;
  height: 80%;
  margin: auto 20px;
  padding: 10px;

  font-size: 16px;

  box-shadow: 10px 20px 80px rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  &::after {
    content: '';
    background: url('../assets/images/bg.png') 0 / cover fixed;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    transform: scale(1.08);
    z-index: -1;
  }

  
  .popup-leave-active {
    animation: fade 1s;
  }
  .popup-enter-active {
    animation: fade 1s reverse;
  }
}

@keyframes fade {
  from {
    transform: translate(100%);
    opacity: 1;
  }
  to {
    transform: translate(0);
    opacity: 0;
  }
}
</style>