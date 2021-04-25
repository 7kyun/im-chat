import {
  SET_SOCKET,
  SET_DROPPED,
  SET_ACTIVE_ROOM,
  SET_FRIEND_MAP,
  ADD_FRIEND_MESSAGE,
  SET_FRIEND_MESSAGES,
  SET_GROUP_MAP,
  ADD_GROUP_MESSAGE,
  SET_GROUP_MESSAGES
} from './mutation-types';
import { ChatState } from './state';
import { MutationTree } from 'vuex';
import { User } from '/@/types/user';

import store from '/@/store'

const mutations: MutationTree<ChatState> = {
  // 设置 socket
  [SET_SOCKET](state, payload) {
    state.socket = payload;
  },

  // 设置用户是否处于掉线重连状态
  [SET_DROPPED](state, payload: boolean) {
    state.dropped = payload;
  },

  // 设置所有的好友的用户详细信息(头像,昵称等)
  [SET_FRIEND_MAP](state, payload: Friend) {
    state.friendMap[payload.id] = payload
  },

  // 新增一条私聊消息
  [ADD_FRIEND_MESSAGE] (state, payload: FriendMessage) {
    let user: User = store.getters['app/user']
    if(payload.fuid === user.id) {
      if(state.friendMap[payload.uid].messages) {
        state.friendMap[payload.uid].messages.push(payload)
      } else {
        state.friendMap[payload.uid].messages = [payload]
      }
    } else {
      if(state.friendMap[payload.fuid].messages) {
        state.friendMap[payload.fuid].messages.push(payload)
      } else {
        state.friendMap[payload.fuid].messages = [payload]
      }
    }

  },

  // 设置私聊记录
  [SET_FRIEND_MESSAGES](state, payload: FriendMessage[]) {
    let user: User = store.getters['app/user']
    if(payload.length) {
      if(payload[0].fuid === user.id) {
        state.friendMap[payload[0].uid].messages = payload
      } else {
        state.friendMap[payload[0].fuid].messages = payload
      }
    }
  },
};

export default mutations;
