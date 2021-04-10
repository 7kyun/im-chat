<template>
  <a-spin :spinning="loading">
    <div class="app">
      <router-view />
    </div>
    <join
      :show="!user.id && !loading"
    ></join>
  </a-spin>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { Store, useStore } from 'vuex'

import Join from './components/Join.vue'

async function getInfo(store: Store<any>, loading: Ref<boolean>) {
  try {
    loading.value = true
    await store.dispatch('app/getInfo')
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

export default defineComponent({
  name: 'App',
  components: { Join },
  setup() {
    const loading = ref(false)
    const store = useStore()
    // 设置用户信息
    getInfo(store, loading)
    const user = computed(() => store.state.app.user)
    
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

  background-image: url('/@/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>