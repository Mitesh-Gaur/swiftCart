import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  updated: Date;
  created: Date;
  brand: number;
  category: number;
}

// Define the initial state using that type
const initialState = {
  cart: [] as CartItem[],
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = [...state, action.payload]
    },
    clearCart: (state) => {
      state.cart = []
    }
  },
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer