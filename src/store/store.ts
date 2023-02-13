/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './notificationSlice';
import taskReducer from './taskSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    task: taskReducer,
    notification: notificationsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
