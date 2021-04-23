<template>
  <a-spin :spinning="loading">
    <div class="app">
      <router-view />
      <button @click="add">添加</button>
    </div>
    <join :show="!user.id" />
  </a-spin>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Store, useStore } from 'vuex'
import { User } from './types/user'

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

    const ws = computed<any>(() => store.state.chat.socket)

    const add = () => {
      const socket = ws.value
      if (!socket) return
      socket.emit('addFriend', {
        uid: user.value.id,
        fuid: 2
      })
    }

    return {
      loading,
      user,
      add
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