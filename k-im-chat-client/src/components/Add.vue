<!-- 添加 好友/群组 -->
<template>
  <div class="add">
    <a-modal
      v-model:visible="visible"
      :afterClose="onClose"
      destroyOnClose
      header=''
      footer=''
    >
      <div class="add-main">
        <!-- 标签栏 -->
        <a-tabs v-model:activeKey="tabKey" @change="tabChange">
          <a-tab-pane key="user" tab="用户" />
          <a-tab-pane key="group" tab="群组" />
        </a-tabs>

        <!-- 搜索栏 -->
        <a-input-search
          v-model:value="params.keyword"
          placeholder="请搜索..."
          style="width: 200px"
          @search="onSearch"
        />

        <div class="list">
          <!-- 列表 -->
          <a-list
            :loading="loading"
            :grid="{ gutter: 16, column: 4 }"
            :data-source="list"
            :pagination="pagination"
            item-layout="horizontal"
            class="demo-loadmore-list"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card hoverable >
                  <div class="user-info">
                    <a-avatar :src="`http://api.btstu.cn/sjtx/api.php?lx=c1&format=images&${item.id}`" />
                    <span>{{ item.username }}</span>
                    <a-button type="primary" size="small" @click="add(item.id)">添加好友</a-button>
                  </div>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { message } from 'ant-design-vue'
import {
  PlusCircleOutlined, UserOutlined
} from '@ant-design/icons-vue'
import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { getUserList, SearchParams, SearchUser } from '../api/modules/user'

interface Pagination {
  hideOnSinglePage: boolean;
  total: number;
  pageSize: number;
  size: string;
  onChange: (page: number, size: number) => void 
}

export default defineComponent({
  name: 'Add',
  components: { PlusCircleOutlined, UserOutlined },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props, ctx) {
    const store = useStore()
    const user = computed(() => store.state.app.user)
    const socket = computed(() => store.state.chat.socket)
    // 监听控制弹窗的显隐
    const { show } = toRefs(props)
    const visible = ref<boolean>(false)
    watchEffect(() => {
      visible.value = show.value
    })
    // 关闭的回调
    const onClose = () => {
      ctx.emit('close')
    }
    
    // tab标签的参数
    const tabKey = ref<string>('user')
    const tabChange = (key: string) => {
      tabKey.value = key
      list.value = []
    }

    const loading = ref(false)
    const hasMore = ref(false)
    // 搜索参数
    const params = reactive<SearchParams>({
      page: 1,
      size: 8,
      keyword: '',
    })
    let list = ref<SearchUser[]>([])
    const getList = async () => {
      try {
        loading.value = true
        const { data } = await getUserList(params)
        pagination.total = data.total
        list.value = data.list
        loading.value = false
      } catch (e) {
        loading.value = false
      }
    }
    // 页数改变
    const onPageChange = (page: number, size: number) => {
      Object.assign(params, { page, size })
      getList()
    }
    // 分页参数
    const pagination = reactive<Pagination>({
      hideOnSinglePage: true,
      total: 0,
      pageSize: 8,
      size: 'small',
      onChange: onPageChange
    })
    // 搜索
    const onSearch = async (val: string) => {
      const keyword = val.trim()
      params.keyword = keyword
      if (!keyword) {
        message.error('请输入关键词搜索')
        return
      }
      switch (tabKey.value) {
        case 'user':
          getList()
          break
        case 'group':
          //
          break
      }
    }
    // 点击添加好友
    const add = (fuid: number) => {
      socket.value.emit('addFriend', { uid: user.value.id, fuid })
      // console.log(id)
    }

    return {
      visible,
      onClose,
      tabKey,
      tabChange,
      onSearch,
      params,
      list,
      loading,
      hasMore,
      pagination,
      add
    }
  }
})
</script>
<style lang="scss">
.add-main {
  .list {
    user-select: none;
    padding-top: 20px;

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>