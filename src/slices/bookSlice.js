import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    buy: [],
    sell: []
  },
  reducers: {
    updateBuy: (state, action) => {
      console.log('BUY', action.payload);
      state.buy = action.payload;
      saveToLocalStorage(state);
    },
    updateSell: (state, action) => {
      state.sell = action.payload;
      saveToLocalStorage(state);
    }
  }
});

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistentBook', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export const { updateBuy, updateSell } = bookSlice.actions;
export const selectBook = (state) => state.book;

export default bookSlice.reducer;
