import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CartItem {
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

// Define a type for the slice state
interface UserState {
  user: object | null;
  token: string | null;
  cart: string;  // Change cart state to string
  newCart: any[] | null;
  orderCart: any[] | null 
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  token: null,
  cart: JSON.stringify([]),  // Initialize as an empty JSON string
  newCart: null,
  orderCart: null
}

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setCart: (state, action: PayloadAction<string>) => {
      state.cart = action.payload  // Store the stringified cart
    },
    setNewCart: (state, action) => {
      state.newCart = action.payload
    },
    setOrderCart: (state, action) => {
      state.orderCart = action.payload
    },
    setLogout: (state) => {
      state.token = null
      state.user = null
    }
  },
})

export const { setUser, setAuthToken, setLogout, setCart, setNewCart, setOrderCart } = counterSlice.actions
export default counterSlice.reducer