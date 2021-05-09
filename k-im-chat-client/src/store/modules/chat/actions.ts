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
} from './mutation-types'
import { ActionTree } from 'vuex'
import { ChatState } from './state'
import { RootState } from '../../index'
import io from 'socket.io-client'
import { message } from 'ant-design-vue'
import { IResponse } from '/@/types/http'
import { Friend, Group } from '/@/types/chat'

const actions: ActionTree<ChatState, RootState> = {
  // 初始化socket连接和监听socket事件
  async connectSocket({commit, state, dispatch, rootState}, callback) {
    let user = rootState.app.user
    
    let socket: SocketIOClient.Socket = io.connect(`http://localhost:3001/chat?uid=${user.id}`, { reconnection: true, transports: ['websocket'] })

    // console.log(socket)
    // socket.emit('message', 'hello')

    socket.on('connect', () => {
      console.log('连接成功')

      // 获取聊天室所需所有信息
      socket.emit('allData', user.id)

      // 先保存好socket对象
      commit(SET_SOCKET, socket)
    })

    // 获取所有数据
    socket.on('allData', (res: IResponse) => {
      // console.log(res)
      if (res.code !== 200) {
        message.error(res.msg)
      }
      dispatch('getChatData', res.data)
      commit(SET_DROPPED, false)
    });
    
    socket.on('addFriend', (res: IResponse) => {
      console.log('添加好友', res)
      if (res.code === 200) {
        commit(SET_FRIEND_MAP, res.data)
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })
  },

  getChatData({ commit, dispatch, state, rootState }, payload) {
    let user = rootState.app.user
    let socket = state.socket
    let groupArr = payload.groupData
    let friendArr = payload.friendData
    if (groupArr.length) {
      groupArr.map((group: Group) => {
        socket.emit('joinGroup', {
          gid: group.id,
          uid: user.id,
        })
        group.gid = group.id
        commit(SET_GROUP_MAP, group)
      })
    }
    if (friendArr.length) {
      friendArr.map((friend: Friend) => {
        socket.emit('joinFriend', {
          uid: user.id,
          fuid: friend.id,
        })
        friend.fuid = friend.id
        commit(SET_FRIEND_MAP, friend)
      })
    }

    let activeRoom = state.activeRoom;
    let groupMap = state.groupMap;
    let friendMap = state.friendMap;
    if (!activeRoom) {
      // 更新完数据没有默认activeRoom
      return commit(SET_ACTIVE_ROOM, groupMap[1])
    }
    commit(SET_ACTIVE_ROOM, groupMap[activeRoom.id] || friendMap[activeRoom.id])
  }
}

export default actions;
