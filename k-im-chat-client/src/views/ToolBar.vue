<!-- 左侧工具栏 -->
<template>
  <div class="tool-bar">
    <div v-if="user.id" class="info">
      <img :src="user.avatar" alt="头像" class="avatar" />
      <span class="name">{{ user.username }}</span>
    </div>

    <div class="tool-list">
      <SmileOutlined class="tool-icon" />
      <GithubOutlined class="tool-icon" />
      <PoweroffOutlined class="tool-icon" />
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import {
  PoweroffOutlined,
  GithubOutlined,
  SmileOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'ToolBar',
  components: {
    PoweroffOutlined,
    GithubOutlined,
    SmileOutlined
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.app.user)

    return {
      user
    }
  }
})
</script>
<style lang='scss'>
.tool-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 75px;
  padding: 20px 10px;
  background-color: rgba($color: #000000, $alpha: .6);

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
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
    font-size: 30px;

    .tool-icon {
      margin: 20px 0 10px;
      cursor: pointer;
    }
  }
}
</style>