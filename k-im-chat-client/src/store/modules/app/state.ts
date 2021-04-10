export interface AppState {
  user: User;
  token: string;
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
  token: ''
};

export default appState;
