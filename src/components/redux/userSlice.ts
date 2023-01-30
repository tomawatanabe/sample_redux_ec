import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    id: "",
  },
  reducers: {
    signIn: (state, action) => {
      state = {
        isSignedIn: true,
        id: action.payload.uid,
      };
    },
    signOut: (state) => {
      state = {
        isSignedIn: false,
        id: "",
      };
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
