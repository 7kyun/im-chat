<!-- 左侧工具栏 -->
<template>
  <div class="tool-bar">
    <div class="tool-bar-main">
      <div v-if="user.id" class="info">
        <img :src="user.avatar" alt="头像" class="avatar" />
        <!-- <span class="name">{{ user.username }}</span> -->
      </div>

      <div class="tool-list">
        <PlusCircleOutlined class="tool-icon" @click="() => { addDialogShow = true }" />
        <SmileOutlined class="tool-icon" />
        <GithubOutlined class="tool-icon" />
        <PoweroffOutlined class="tool-icon" />
      </div>
    </div>

    <div class="tool-bar-children">
      <add
        :show="addDialogShow"
        @close="addDialogShow = false"
      ></add>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import {
  PoweroffOutlined,
  GithubOutlined,
  SmileOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons-vue'

import Add from './Add.vue'

export default defineComponent({
  name: 'ToolBar',
  components: {
    PoweroffOutlined,
    GithubOutlined,
    SmileOutlined,
    PlusCircleOutlined,
    Add
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.app.user)
    const socket = computed(() => store.state.chat.socket)
    const addFriend = () => {
      // console.log(user.value)
      // console.log(socket.value)
      socket.value.emit('addFriend', { uid: 1, fuid: 2 })
    }

    // 添加 好友/群组
    const addDialogShow = ref(false)

    return {
      user,
      addFriend,
      addDialogShow
    }
  }
})
</script>
<style lang='scss'>
.tool-bar {
  width: 75px;
  padding: 20px 10px;
  background-color: rgba($color: #000000, $alpha: .6);

  .tool-bar-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: 100%;

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: 50px;
        height: 50px;
        object-fit: contain;
        line-height: 55px;
        font-size: 14px;
        color: #fff;
        background-color: #A9A9A9;
        border-radius: 50%;
      }

      .name {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
        line-height: 1.5em;
      }
    }

    .tool-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      font-size: 25px;

      .tool-icon {
        margin: 20px 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>