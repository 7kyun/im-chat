import { GetterTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
const getters: GetterTree<ChatState, RootState> = {
  socket(state) {
    return state.socket
  },
  activeRoom(state) {
    return state.activeRoom
  },
  friendGather(state) {
    return state.friendMap
  },
  groupGather(state) {
    return state.groupMap
  },
};

export default getters;
