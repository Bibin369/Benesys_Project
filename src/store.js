import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: null },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
