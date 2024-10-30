import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AES } from 'crypto-js';

const Api = "https://apidev-hunterfinancial.oneteamus.com/api/1.0/Token";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(Api, { username: email, password });
      const token = response.data.data.token;
      const secretKey = "bibin_2001";
      const encryptedData = AES.encrypt(token, secretKey).toString();
      localStorage.setItem("token", encryptedData);
      return { role: response.data.role, token: token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: null, error: null },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

