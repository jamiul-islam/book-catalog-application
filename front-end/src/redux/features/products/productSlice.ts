import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  filterYear: number;
}

const initialState: IProduct = {
  status: false,
  filterYear: 2023,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setYearRange: (state, action: PayloadAction<number>) => {
      state.filterYear = action.payload;
    },
  },
});

export const { toggleState, setYearRange } = productSlice.actions;

export default productSlice.reducer;
