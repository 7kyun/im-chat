// 所有好友
interface FriendMap {
  [fuid: number]: Friend
}

// 好友
interface Friend {
  id: number;
  username: string;
  avatar: string;
  messages: FriendMessage[];
  createdAt: number;
  updatedAt: number;
}

// 好友消息
interface FriendMessage {
  uid: number;
  fuid: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

// 所有群组
interface GroupMap {
  [gid: number]: Group
}

// 群组
interface Group {
  id: number;
  uid: number; // 群主id
  groupName: string;
  notice: string;
  messages: GroupMessage[];
  createdAt: number;
  updatedAt: number;
}

// 群消息
interface GroupMessage {
  uid: number;
  gid: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}
