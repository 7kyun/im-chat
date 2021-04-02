<template>
  <a-spin :spinning="loading">
    <div class="app">
      <router-view />
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Store, useStore } from 'vuex'
import { getInfo } from './api/modules/user'

async function setUser(store: Store<any>) {
  const res = await getInfo()
  store.commit('SET_USER', res.data)
  store.commit('SET_LOADING', false)
}

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const loading = computed(() => {
      return store.state.loading
    })
    store.commit('SET_LOADING', false)
    // setUser(store)
    
    return {
      loading
    }
  }
})
</script>

<style lang="scss">
@import url('./styles/reset.scss');
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  
  min-width: 100vw;
  min-height: 100vh;

  background-image: url('./assets/images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>