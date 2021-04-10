import { SET_USER, CLEAR_USER, SET_TOKEN } from './mutation-types';
import { AppState } from './state';
import cookie from 'js-cookie';
import { MutationTree } from 'vuex';

const mutations: MutationTree<AppState> = {
  [SET_USER](state, payload: User) {
    state.user = payload;
    // 数据持久化
    cookie.set('user', payload, { expires: 3650 });
  },

  [CLEAR_USER](state) {
    state.user = {
      id: '',
      username: '',
      avatar: '',
      createAt: '',
      updateAt: '',
      version: '',
    };
    cookie.set('user', '');
  },

  [SET_TOKEN](state, payload) {
    state.token = payload;
    cookie.set('token', payload, { expires: 3 });
  },
};

export default mutations;
