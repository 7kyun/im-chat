import { Friend, FriendMap, Group, GroupMap } from "/@/types/chat";

export interface ChatState {
  socket: any;
  dropped: boolean; // 掉线
  activeRoom: Friend | Group | null,
  friendMap: FriendMap,
  groupMap: GroupMap
}

const chatState: ChatState = {
  socket: null,
  dropped: false,
  activeRoom: null,
  friendMap: [],
  groupMap: []
};

export default chatState;
