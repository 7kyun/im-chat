import { createStore } from 'vuex'
import cookie from 'js-cookie'

interface State {
  user: User;
  token: string;
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
      token: ''
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
    }
  },
  actions: {
  }
})

export default store