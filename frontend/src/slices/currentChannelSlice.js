import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const currentChannelAdapter = createEntityAdapter();
const initialState = currentChannelAdapter.getInitialState({
  currentChannel: null,
});
const channelsSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    changeCurrentChannelId: (state, action) => {
      const temp = state.currentChannelId;
      state.currentChannelId = action.payload;
      if (action.payload === temp) {
        state.currentChannelId = 1;
      }
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
