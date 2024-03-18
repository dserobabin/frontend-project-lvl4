import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({
  user: JSON.parse(localStorage.getItem('user')) || {},
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.user.username = payload.username;
      state.user.token = payload.token;
    },
    removeCredentials: (state) => {
      localStorage.removeItem('user');
      state.user = {};
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
