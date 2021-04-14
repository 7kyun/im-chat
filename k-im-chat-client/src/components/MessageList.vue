<!-- 消息列表（群组、好友） -->
<template>
  <div class="message-list">
    <div class="search-wrap">
      <a-input-search
        v-model:value="keyword"
        placeholder="列表内搜索"
        style="width: 200px"
        @search="onSearch"
      />
    </div>

    <div class="main">
      <div v-for="item in list" :key="item.id" :class="{ msg: true, active: item.id == 1 }">
        <a-badge class="msg-badge" :dot="true">
          <img class="avatar" :src="item.avatar" alt="" />
        </a-badge>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="content" v-if="item.msg">
            <span v-if="item.id % 2 == 1" class="text" >{{ item.msg }}</span>
            <span v-else class="image">[图片]</span>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'MessageList',
  setup() {
    const keyword = ref<string>('')
    const onSearch = () => {
      if (!keyword.value.trim()) return
      console.log(keyword.value)
    }

    const list = reactive([
      { id: 0, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&0', name: '000', msg: 'chjjkxzhgkjxchkj' },
      { id: 1, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&1', name: '111', msg: 'chjjkxzhgkjxchkj' },
      { id: 2, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&2', name: '222', msg: 'chjjkxzhgkjxchkj' },
      { id: 3, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&3', name: '333', msg: 'chjjkxzhgkjxchkj' },
      { id: 4, avatar: 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&4', name: '444', msg: 'chjjkxzhgkjxchkj' },
    ])


    return {
      keyword,
      onSearch,
      list
    }
  }
})
</script>
<style lang='scss'>
.message-list {
  background-color: rgba($color: #000000, $alpha: .4);

  .search-wrap {
    padding: 10px;
  }

  .main {
    display: flex;
    flex-direction: column;
    width: 100%;

    .msg {
      position: relative;
      min-height: 60px;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 5px 10px;
      text-align: left;
      transition: all 0.2s linear;
      cursor: pointer;

      &.active {
        background-color: rgba(0, 0, 0, 0.3);
      }
      
      .msg-badge {
        // position: absolute;
        // right: 10px;
        // top: 10px;
        margin-right: 10px;
        ::v-deep.ant-badge-count {
          box-shadow: none;
        }
      }
      .avatar {
        width: 35px;
        height: 35px;
        // border-radius: 50%;
        object-fit: contain;
        &.offLine {
          filter: grayscale(90%);
        }
      }
      
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 75%;
        .name {
          font-size: 14px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .content {
          color: rgb(255, 255, 255, 0.6);
          font-size: 12px;
          > * {
            display: block;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
  }
}
</style>