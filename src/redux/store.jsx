import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "./slices/apiSlice"; 

export const store = configureStore({
  reducer: {
    coindata: apiSlice,
  },
});
