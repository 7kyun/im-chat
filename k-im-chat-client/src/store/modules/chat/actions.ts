import {
  SET_SOCKET,
  SET_ACTIVE_ROOM,
  SET_FRIEND_MAP,
  ADD_FRIEND_MESSAGE,
  SET_FRIEND_MESSAGES,
  SET_GROUP_MAP,
  ADD_GROUP_MESSAGE,
  SET_GROUP_MESSAGES
} from './mutation-types';
import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
import io from 'socket.io-client'
import { message } from 'ant-design-vue';

const actions: ActionTree<ChatState, RootState> = {
  // 初始化socket连接和监听socket事件
  async connectSocket({commit, state, dispatch, rootState}, callback) {
    let user = rootState.app.user
    let friendMap = state.friendMap
    
    let socket: SocketIOClient.Socket = io.connect(`http://localhost:3001/chat?uid=${user.id}`, { reconnection: true, transports: ['websocket'] })

    // console.log(socket)
    // socket.emit('message', 'hello')

    socket.on('connect', () => {
      console.log('连接成功')
      // 先保存好socket对象

      commit(SET_SOCKET, socket)
    })
    
    socket.on('addFriend', (res: any) => {
      console.log('添加好友', res)
    })
  },
};

export default actions;
