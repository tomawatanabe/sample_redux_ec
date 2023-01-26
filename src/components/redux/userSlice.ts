import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    // id: "",
    // username: "",
    // favorites: [],
  },
  reducers: {
    signIn: (state, action) => {
      state = {
        isSignedIn: true,
        // id: action.payload.uid,
        // username: action.payload.username,
        // favorites: [],
      };
    },
    signOut: (state) => {
      state = {
        isSignedIn: false,
        // uid: "",
        // username: "",
        // favorites: [],
      };
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
