import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../models/search";

const initialState: SearchState = {
  searchResults: [],
  possiblePages: 0,
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch(state, action) {
      state.searchResults = action.payload;
    },
    updateQuery(state, action) {
      state.query = action.payload;
    },
    updatePossiblePages(state, action) {
      state.possiblePages = action.payload;
    },
  },
});

export const { updateSearch, updatePossiblePages, updateQuery } =
  searchSlice.actions;

export default searchSlice.reducer;
