import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    data: []
  },
  reducers: {
    updateOrderBook: (state, action) => {
      state.data = action.payload;
      saveToLocalStorage(action.payload);
    },
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

function deleteFromLocalStorage() {
  try {
    localStorage.removeItem('persistentBook');
  } catch (e) {
    console.warn(e);
  }
}

export const { updateOrderBook } = bookSlice.actions;
export const selectBook = (state) => state.book.data;

export default bookSlice.reducer;
