import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from './services/authApi';
import { channelsApi } from './services/channelsApi';
import { messagesApi } from './services/messagesApi';
import currentChannelReducer from './slices/currentChannelSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentChannel: currentChannelReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([authApi.middleware, channelsApi.middleware, messagesApi.middleware]),
});

export default store;
