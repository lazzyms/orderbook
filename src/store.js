import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';

function loadFromBrowser() {
  try {
    const serialisedState = localStorage.getItem('persistentBook');
    if (serialisedState === null) return undefined;
    const book = JSON.parse(serialisedState);
    return { book };
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export default configureStore({
  reducer: {
    book: bookReducer
  },
  preloadedState: loadFromBrowser()
});
