<template>
  <a-spin :spinning="loading">
    <div class="app">
      <router-view />
    </div>
    <join :show="!user.id" />
  </a-spin>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Store, useStore } from 'vuex'
import { User } from './types/index'
import io from 'socket.io-client'

import Join from './components/Join.vue'

async function getInfo(store: Store<any>) {
  await store.dispatch('app/getInfo')
}

export default defineComponent({
  name: 'App',
  components: { Join },
  setup() {
    const store = useStore()
    // 设置用户信息
    getInfo(store)
    const loading = computed<boolean>(() => store.state.app.loading)
    const user = computed<User>(() => store.state.app.user)

    const socket = io.connect('ws://localhost:3001')
    // console.log(11111, socket)
    socket.on('connect', () => {
      console.log('连接成功!')

      socket.on('message', msg => console.log(msg))
    })
    
    return {
      loading,
      user
    }
  }
})
</script>

<style lang="scss">
@import url('/@/styles/reset.scss');
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  
  min-width: 100vw;
  min-height: 100vh;

  color: hsla(0,0%,100%,.85);

  background-image: url('/@/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>