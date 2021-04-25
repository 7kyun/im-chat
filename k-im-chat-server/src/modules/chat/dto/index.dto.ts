// 群组
interface GroupDto {
  id: number;
  uid: number; // 群主id
  groupName: string;
  notice: string;
  messages?: GroupMessageDto[];
}

// 群消息
interface GroupMessageDto {
  uid: number;
  gid: number;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  createdAt: number;
}

// 好友
interface FriendDto {
  id: number;
  username: string;
  avatar: string;
  messages?: FriendMessageDto[];
}

// 好友消息
interface FriendMessageDto {
  uid: number;
  fuid: number;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  createdAt: number;
}
