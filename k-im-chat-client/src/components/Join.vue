<!-- Login -->
<template>
  <div class="join">
    <a-modal 
      header=''
      footer=''
      :visible="visible"
      :closable='false'
    >
    <a-tabs v-model:activeKey="tabKey">
      <a-tab-pane key="login" tab="登录" force-render>
        <a-form
          :form="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <a-form-item>
            <a-input placeholder="Username" >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" placeholder="Password" >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="login-form-button">登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="regist" tab="注册" force-render>
        <a-form
          :form="registForm"
          :rules="registRules"
          class="login-form"
        >
          <a-form-item>
            <a-input placeholder="Username" >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" placeholder="Password" >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" placeholder="Comfirm Password" >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="login-form-button">注册</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs, UnwrapRef, watchEffect } from 'vue'

interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  name: 'Join',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props, ctx) {
    // 控制弹窗的显隐
    const { show } = toRefs(props)
    const visible = ref(false)
    const visibleWatch = watchEffect(() => {
      visible.value = show.value
    })

    // tab标签的参数
    const tabKey = ref('login')
    const tabChange = (key: string) => {
      tabKey.value = key
    }

    const loginFormRef = ref()
    const loginForm: UnwrapRef<FormState> = reactive({
      username: '',
      password: ''
    })
    const loginRules = {
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 2, max: 12, message: '用户名介于2-12位之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码介于6-16位之间', trigger: 'blur' }
      ]
    }

    const registFormRef = ref()
    const registForm: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
      comfirmPass: ''
    })
    const registRules = {
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 2, max: 12, message: '用户名介于2-12位之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码介于6-16位之间', trigger: 'blur' }
      ],
      comfirmPass: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码介于6-16位之间', trigger: 'blur' }
      ]
    }

    return {
      visible,
      tabKey,
      tabChange,
      loginFormRef,
      loginForm,
      loginRules,
      registFormRef,
      registForm,
      registRules
    }
  }
})
</script>
<style lang="scss">
.join {
  min-width: 300px
}
</style>