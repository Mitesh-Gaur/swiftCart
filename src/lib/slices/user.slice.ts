import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface UserState {
  user: object | null,
  token: string | null
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  token: null
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
    setLogout: (state) => {
      state.token = null
      state.user = null
    }
  },
})

export const { setUser, setAuthToken, setLogout } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user

export default counterSlice.reducer