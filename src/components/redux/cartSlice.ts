import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuestCart } from "./types/types";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    guestCart: [],
  },
  reducers: {
    add: (state: GuestCart, action: PayloadAction<number>) => {
      state.guestCart = Array.from(
        new Set([...state.guestCart, action.payload]) //重複データが入らないようにするための対応
      );
    },
    remove: (state: GuestCart, action: PayloadAction<number>) => {
      state.guestCart = state.guestCart.filter((v) => v !== action.payload);
    },
    clear: (state) => {
      state.guestCart = [];
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
