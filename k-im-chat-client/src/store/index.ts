import { createStore, ModuleTree } from 'vuex'

// app
import app from './modules/app';
import { AppState } from './modules/app/state';

export type RootState = {
  app: AppState;
};

const modules: ModuleTree<RootState> = {
  app
}

const store = createStore({
  modules
})


export default store