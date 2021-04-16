import { SET_USER, SET_TOKEN } from './mutation-types';
import { ActionTree } from 'vuex';
import { AppState } from './state';
import { RootState } from '../../index';
import { login, regist, getInfo } from '/@/api/modules/auth';

const actions: ActionTree<AppState, RootState> = {
  async regist({ commit }, payload) {
    try {
      const { data } = await regist(payload)
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    } catch (e) {
      throw e
    }
  },
  async login({ commit }, payload) {
    try {
      const { data } = await login(payload)
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    } catch (e) {
      throw e
    }
  },
  async getInfo({ commit }) {
    try {
      const { data } = await getInfo()
      commit(SET_USER, data);
      return data;
    } catch (e) {
      throw e
    }
  }
};

export default actions;
