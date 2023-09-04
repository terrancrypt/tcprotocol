import { configureStore } from "@reduxjs/toolkit";
import collateralSlice from "./slices/collateralSlice";

export const store = configureStore({
  reducer: {
    collateralSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
