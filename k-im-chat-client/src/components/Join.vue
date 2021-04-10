<!-- 登录注册 -->
<template>
  <div class="join">
    <a-modal 
      header=''
      footer=''
      :visible="visible"
      :closable='false'
    >
      <a-tabs v-model:activeKey="tabKey" @change="tabChange">
        <a-tab-pane key="login" tab="登录" />
        <a-tab-pane key="regist" tab="注册" />
      </a-tabs>
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="form"
      >
        <a-form-item name="username">
          <a-input  v-model:value="formData.username" placeholder="Username" >
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="formData.password" type="password" placeholder="Password" >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-show="tabKey === 'regist'" name="rePassword">
          <a-input v-model:value="formData.rePassword" type="password" placeholder="Check Password" >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button v-show="tabKey === 'login'" type="primary" class="form-button" @click="onLogin">登录</a-button>
          <a-button v-show="tabKey === 'regist'" type="primary" class="form-button" @click="onRegist">注册</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs, UnwrapRef, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

interface FormState {
  username: string;
  password: string;
  rePassword: string;
}

export default defineComponent({
  name: 'Join',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  components: { UserOutlined, LockOutlined },
  setup(props) {
    const store = useStore()

    // 监听控制弹窗的显隐
    const { show } = toRefs(props)
    const visible = ref(false)
    watchEffect(() => {
      visible.value = show.value
    })

    // tab标签的参数
    const tabKey = ref('login')
    const tabChange = (key: string) => {
      formRef.value.resetFields()
      tabKey.value = key
    }

    // 登录注册表单
    const formRef = ref()
    const formData: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
      rePassword: ''
    })
    // 再次输入密码的验证规则
    const validateRePass = async (rule: RuleObject, value: string) => {
      // 登录直接通过 注册才需要验证
      if (tabKey.value === 'login') return Promise.resolve()

      if (!value) {
        return Promise.reject('请再次输入密码')
      } else if (value !== formData.password) {
        return Promise.reject('两次输入的密码不一致')
      } else {
        return Promise.resolve()
      }
    }
    // 表单验证规则
    const rules = {
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 2, max: 12, message: '用户名介于2-12位之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码介于6-16位之间', trigger: 'blur' }
      ],
      rePassword: [{ validator: validateRePass, trigger: 'blur' }]
    }

    // 登录
    async function onLogin() {
      try {
        const form: FormState = await formRef.value.validate()
        await store.dispatch('app/login', form)
        message.success('注册成功')
      } catch (e) {}
    }

    // 注册
    async function onRegist() {
      try {
        const form: FormState = await formRef.value.validate()
        await store.dispatch('app/regist', form)
        message.success('注册成功')
      } catch (e) {}
    }

    return {
      visible,
      tabKey,
      tabChange,
      formRef,
      formData,
      rules,
      onLogin,
      onRegist
    }
  }
})
</script>
<style lang="scss">
.form {
  max-width: 300px;

  .form-button {
    width: 100%;
  }
}
</style>