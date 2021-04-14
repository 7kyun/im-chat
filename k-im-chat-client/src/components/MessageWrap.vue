<!-- 消息容器 -->
<template>
  <div class="message-wrap">
    <div class="header">
      <span>k-im-chat</span>
    </div>
    <div class="main">
      <ul class="content">
        <li v-for="item in list" :key="item.id" :class="{ msg: true, myself: item.id % 3 == 0 }">
          <div class="ctx">
            <div class="info">
              <span v-if="item.id % 3 == 0" class="name">{{ item.name }}</span>
              <img :src="item.avatar" class="avatar">
              <span v-if="item.id % 3 !== 0" class="name">{{ item.name }}</span>
            </div>
            <div class="detail">{{ item.msg }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'MessageWrap',
  setup() {
    const list = reactive([
      { id: 0, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&0', name: '000', msg: 'chjjkxzhgkjxchkj' },
      { id: 1, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&1', name: '111', msg: 'sadgdbvxbcvgdt3452' },
      { id: 2, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&2', name: '222', msg: 'cxvbxcvbxcvbdxfgdxcbcvxbxcvbxdfgser534623456ergdfcxvbxcvbxcvbdxfgdxcbcvxbxcvbxdfgser534623456ergdfcxvbxcvbxcvbdxfgdxcbcvxbxcvbxdfgser534623456ergdf' },
      { id: 3, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&3', name: '333', msg: 'sadgdbvxbcvgdt3452sadgdbvxbcvgdt3452' },
      { id: 4, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&4', name: '444', msg: 'asdasdqw4' },
    ])

    return {
      list
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
            padding: 6px;
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