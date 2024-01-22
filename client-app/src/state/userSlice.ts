import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/user";

const initialState: UserState = {
  username: "",
  omittedSources: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload.username;
      state.omittedSources = action.payload.omittedSources;
    },
    removeSource(state, action) {
      const source = action.payload;
      const newArray = state.omittedSources.filter(
        (oldSource) => oldSource !== source
      );
      state.omittedSources = newArray;
      console.log("removed source");
    },
    addSource(state, action) {
      const newSource = action.payload;
      const newArray = state.omittedSources;
      newArray.push(newSource);
      state.omittedSources = newArray;
      console.log("added source");
    },
  },
});

export const { updateUser, removeSource, addSource } = userSlice.actions;

export default userSlice.reducer;
