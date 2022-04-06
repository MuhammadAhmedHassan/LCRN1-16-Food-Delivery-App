import {configureStore} from '@reduxjs/toolkit';
import tabsSlice from './tabs/tabs.slice';

// Thunk already exists in default middlewares
export const store = configureStore({
  reducer: {
    tabs: tabsSlice,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
