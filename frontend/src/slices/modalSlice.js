import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalAdapter = createEntityAdapter();
const initialState = modalAdapter.getInitialState({
  isOpened: false,
  type: null,
  extra: null,
});
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpened = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
