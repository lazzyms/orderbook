import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice";

function loadFromBrowser() {
  try {
    const serialisedState = localStorage.getItem("persistentBook");
    if (serialisedState === null) return undefined;
    const user = JSON.parse(serialisedState);
    const data = {
      book: { data: user, token: user.token, isLoggedIn: true },
    };
    return data;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export default configureStore({
  reducer: {
    book: bookReducer,
  },
  preloadedState: loadFromBrowser(),
});
