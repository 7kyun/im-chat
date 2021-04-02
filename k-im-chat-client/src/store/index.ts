import { createStore } from 'vuex'
import cookie from 'js-cookie'

interface State {
  user: User;
  token: string;
  loading: boolean
}

const store = createStore({
  state(): State {
    return {
      user: {
        id: '',
        name: '',
        avatar: '',
        createAt: '',
        updateAt: ''
      },
      token: '',
      loading: true
    }
  },
  mutations: {
    'SET_USER': (state: State, user: User) => {
      state.user = user
      cookie.set('user', user, { expires: 3650 })
    },
    'CLEAR_USER': (state: State, user: User) => {
      state.user = user
      cookie.set('user', '')
    },
    'SET_TOKEN': (state: State, token: string) => {
      state.token = token
      cookie.set('token', token, { expires: 3 })
    },
    'SET_LOADING': (state: State, loading: boolean) => {
      state.loading = loading
    }
  },
  actions: {
  }
})

export default store