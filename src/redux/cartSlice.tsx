import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface cartProduct {
  description: string;
  discountPercentage: number;
  id: number;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  count: number;
}

export interface cartState {
  totalPrice: number;
  items: cartProduct[];
}

const initialState: cartState = JSON.parse(
  localStorage.getItem("cartState")!
) || {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cartProduct>) => {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((total, product) => {
        return total + product.price * product.count;
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeProduct: (state, action: PayloadAction<cartProduct>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= action.payload.price;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
