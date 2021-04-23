import { createStore, ModuleTree } from 'vuex'

// app
import app from './modules/app';
import { AppState } from './modules/app/state';
// chat
import chat from './modules/chat';
import { ChatState } from './modules/chat/state';

export type RootState = {
  app: AppState;
  chat: ChatState;
};

const modules: ModuleTree<RootState> = {
  app, chat
}

const store = createStore({
  modules
})


export default store