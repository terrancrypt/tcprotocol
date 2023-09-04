import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CollateralInfo } from "../../services/collateralRenderServices";

const initialState: CollateralInfo = {};

export const collateralSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCollateralList: (state, action: PayloadAction<CollateralInfo>) => {
      return action.payload;
    },
  },
});

export const { addCollateralList } = collateralSlice.actions;
export default collateralSlice.reducer;
