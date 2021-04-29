<!-- 消息容器 -->
<template>
  <div class="message-wrap">
    <div class="header">
      <span v-if="activeRoom">{{ activeRoom.groupName || activeRoom.username }}</span>
      <span v-else>k-im-chat</span>
    </div>
    <div class="main">
      <ul v-if="activeRoom && activeRoom.messages && activeRoom.messages.length" class="content">
        <li v-for="item in activeRoom.messages" :key="item.id" :class="{ msg: true, myself: item.uid === user.id }">
          <div class="ctx">
            <div class="info">
              <span v-if="item.uid === user.id" class="name">{{ item.user.username }}</span>
              <img :src="`${OSS_URL}/${item.user.avatar}`" class="avatar">
              <span v-if="item.uid !== user.id" class="name">{{ item.user.username }}</span>
            </div>
            <div class="detail">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input"></div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { OSS_URL } from '../utils/config'

export default defineComponent({
  name: 'MessageWrap',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.app.user)
    const activeRoom = computed(() => store.state.chat.activeRoom)

    return {
      OSS_URL,
      user,
      activeRoom
    }
  }
})
</script>
<style lang='scss'>
.message-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba($color: #000000, $alpha: .2);

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    line-height: 52px;
    background-color: rgba($color: #000000, $alpha: .6);
  }

  // 消息视图区
  .main {
    overflow-y: scroll;
    flex: 1;
    // 消息容器
    .content {
      list-style: none;
      padding: 20px;

      // 单条消息
      .msg {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        .ctx {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;

          // 头像、姓名
          .info {
            display: flex;
            align-items: center;
            cursor: pointer;

            .avatar {
              width: 35px;
              height: 35px;
              object-fit: contain;
            }

            .name {
              max-width: 200px;
              margin: 0 10px;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
          // 消息主体
          .detail {
            word-break: break-all;
            max-width: 60%;
            min-height: 40px;
            padding: 6px 10px;
            margin: 10px 0;
            line-height: 28px;
            font-size: 16px;
            background-color: rgba($color: #000000, $alpha: .6);
            border-radius: 5px;
          }
        }

        &.myself {
          justify-content: flex-end;

          .ctx {
            align-items: flex-end;
          }
        }
      }
    }
  }

  .input {
    height: 50px;
    background-color: #fff;
  }
}
</style>