export interface ChatState {
  socket: any;
  activeRoom: Friend | Group | null,
  friendMap: FriendMap,
  groupMap: GroupMap
}

const chatState: ChatState = {
  socket: null,
  activeRoom: null,
  friendMap: [],
  groupMap: []
};

export default chatState;
