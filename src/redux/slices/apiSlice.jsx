import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  data: null,
  error: null,
  status: "idle",
};

const url =
  "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1877116e40msh88bb5596f4361b1p1720adjsned9fd0f3e117",
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  },
};

export const fetchCoinData = createAsyncThunk(
  "coindata/fetchCoinData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const apiSlice = createSlice({
  name: "coindata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
