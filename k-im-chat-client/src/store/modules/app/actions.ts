import { SET_USER, SET_TOKEN } from './mutation-types';
import { ActionTree } from 'vuex';
import { AppState } from './state';
import { RootState } from '../../index';
import { login, regist, getInfo } from '/@/api/modules/auth';

const actions: ActionTree<AppState, RootState> = {
  async register({ commit }, payload) {
    const { data } = await regist(payload)
    if (data) {
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    }
  },
  async login({ commit }, payload) {
    const { data } = await login(payload)
    if (data) {
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    }
  },
  async getInfo({ commit }) {
    const { data } = await getInfo()
    if (data) {
      commit(SET_USER, data);
      return data;
    }
  },
};

export default actions;
