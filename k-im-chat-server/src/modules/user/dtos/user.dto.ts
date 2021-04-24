export class UserDto {
  id: number;
  username: string;
  avatar: string;
  createdAt: number;
  version: number;
}

export class UserList {
  page: number;
  size: number;
  keyword: string;
}
