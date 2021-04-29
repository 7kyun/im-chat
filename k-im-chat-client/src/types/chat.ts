// 所有好友
export interface FriendMap {
  [fuid: number]: Friend
}

// 好友
export interface Friend {
  id: number;
  username: string;
  avatar: string;
  messages: FriendMessage[];
  fuid: number;
}

// 好友消息
export interface FriendMessage {
  uid: number;
  fuid: number;
  content: string;
  createdAt: number;
}

// 所有群组
export interface GroupMap {
  [gid: number]: Group
}

// 群组
export interface Group {
  id: number;
  uid: number; // 群主id
  groupName: string;
  notice: string;
  messages: GroupMessage[];
  createdAt: number;
  gid: number;
}

// 群消息
export interface GroupMessage {
  uid: number;
  gid: number;
  content: string;
  createdAt: number;
}
