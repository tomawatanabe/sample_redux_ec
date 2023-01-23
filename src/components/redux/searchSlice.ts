import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchWord: "",
  },
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
  },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
