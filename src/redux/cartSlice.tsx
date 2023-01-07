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

const updateStorage = (state: cartState) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

const updateTotalPrice = (state: cartState) => {
  state.totalPrice = state.items.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);
};

const removeFromCart = (
  state: cartState,
  action: PayloadAction<cartProduct>
) => {
  state.items = state.items.filter((item) => item.id !== action.payload.id);
};

const findProduct = (state: cartState, action: PayloadAction<cartProduct>) => {
  return state.items.find((item) => item.id === action.payload.id)!;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cartProduct>) => {
      state.items.push(action.payload);
      updateTotalPrice(state);
      updateStorage(state);
    },
    removeProduct: (state, action: PayloadAction<cartProduct>) => {
      removeFromCart(state, action);
      updateTotalPrice(state);
      updateStorage(state);
    },
    incrementProductCount: (state, action: PayloadAction<cartProduct>) => {
      const founded = findProduct(state, action);
      if (founded.count < founded.stock) {
        founded.count += 1;
      }
      updateTotalPrice(state);
      updateStorage(state);
    },
    decrementProductCount: (state, action: PayloadAction<cartProduct>) => {
      const founded = findProduct(state, action);
      if (founded.count === 1) {
        removeFromCart(state, action);
        localStorage.setItem("cartState", JSON.stringify(state));
      } else {
        founded.count -= 1;
      }
      updateTotalPrice(state);
      updateStorage(state);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementProductCount,
  decrementProductCount,
} = cartSlice.actions;

export default cartSlice.reducer;
