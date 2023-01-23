import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    // id: "",
    // username: "",
    // cart: [],
    // favorites: [],
  },
  reducers: {
    signIn: (state, action) => {
      state = {
        isSignedIn: true,
        // id: action.payload.uid,
        // username: action.payload.username,
        // cart: [],
        // favorites: [],
      };
    },
    signOut: (state) => {
      state = {
        isSignedIn: false,
        // uid: "",
        // username: "",
        // cart: [],
        // favorites: [],
      };
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
