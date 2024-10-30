import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";


const DataApi = "https://apidev-hunterfinancial.oneteamus.com/api/1.0/Application/List";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const encryptedToken = localStorage.getItem("token");
      const secretKey = "bibin_2001";
      const token = AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8);
      const DatatoPass = {
        businessId: "",
        pageNumber: 0,
        pageSize: 25,
        searchText: "",
        startDate: "",
        endDate: "",
        statusfilter: "",
      };

      const response = await axios.post(DataApi, DatatoPass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: { items: [], error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
