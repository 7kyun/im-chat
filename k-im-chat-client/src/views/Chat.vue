<!-- Home -->
<template>
  <div class="chat-main">
    <tool-bar />
    <message-list />
    <message-wrap />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import ToolBar from '../components/ToolBar.vue'
import MessageList from '../components/MessageList.vue'
import MessageWrap from '../components/MessageWrap.vue'

export default defineComponent({
  name: 'Chat',
  components: { ToolBar, MessageList, MessageWrap },
  setup() {
    const store = useStore()

    return {
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
  margin: 20px;

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
}
</style>