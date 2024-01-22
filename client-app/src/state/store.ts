import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Api/agent";
import newsReducer from "./newsSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    news: newsReducer,
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
