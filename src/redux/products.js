import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutProducts: [],
};

export const appSlice = createSlice({
  name: "ProductState",
  initialState,
  reducers: {
    resetCheckoutProducts: (state) => {
      Object.assign(state, initialState);
    },
    addToCheckoutProducts: (state, action) => {
      state.checkoutProducts = [...state.checkoutProducts, action.payload];
    },
    removeFromCheckoutProducts: (state, action) => {
      const stateProducts = state.checkoutProducts;

      const index = stateProducts.findIndex(
        (product) => product.sku == action.payload,
      );

      stateProducts.splice(index, 1);

      state.checkoutProducts = stateProducts;
    },
  },
});

export const {
  resetCheckoutProducts,
  addToCheckoutProducts,
  removeFromCheckoutProducts,
} = appSlice.actions;

export default appSlice.reducer;
