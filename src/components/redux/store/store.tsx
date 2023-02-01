import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import searchSlice from "../searchSlice";
import cartSlice from "../cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const reducers = combineReducers({
  users: userSlice,
  search: searchSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
