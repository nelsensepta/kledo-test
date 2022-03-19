import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const cartSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : undefined,
    user: localStorage.getItem("username")
      ? JSON.parse(localStorage.getItem("username"))
      : undefined,
  },
  reducers: {
    addUser: (state, action) => {
      const { name, email, phone_number, is_active } = action.payload.data.user;
      const newState = {
        token: { ...action.payload.data.data },
        user: { name, email, phone_number, is_active },
      };
      state = newState;
      localStorage.setItem("token", JSON.stringify(action.payload.data.data));
      localStorage.setItem("username", JSON.stringify(newState.user));
    },
    clearAll: (state, action) => {
      localStorage.clear();
    },
  },
});

export const { addUser, clearAll } = cartSlice.actions;
export default cartSlice.reducer;
