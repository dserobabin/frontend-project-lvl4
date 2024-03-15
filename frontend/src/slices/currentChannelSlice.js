import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const currentChannelAdapter = createEntityAdapter();
const initialState = currentChannelAdapter.getInitialState({ currentChannelId: '1' });
const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    changeCurrentChannelId: (state, action) => {
      const temp = state.currentChannelId;
      state.currentChannelId = action.payload;
      if (action.payload === temp) {
        state.currentChannelId = '1';
      }
    },
  },
});

export const { actions } = currentChannelSlice;
export default currentChannelSlice.reducer;
