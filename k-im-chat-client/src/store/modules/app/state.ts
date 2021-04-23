import { User } from "/@/types/user";

export interface AppState {
  user: User;
  token: string;
  loading: boolean;
}

const appState: AppState = {
  user: {
    id: '',
    username: '',
    avatar: '',
    createAt: '',
    updateAt: '',
    version: '',
  },
  token: '',
  loading: false
};

export default appState;
