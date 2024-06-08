import { createSlice } from '@reduxjs/toolkit'
interface AuthState {
  stage: 'idle' | 'loading' | 'succedded' | 'failed'
  user: string
}

const initialState: AuthState = {
  stage: 'idle',
  user: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.stage = 'succedded'
      console.log(action.payload)

      if (action.payload) {
        state.user = action.payload.email
      }
    },
    logout: (state) => {
      state.stage = 'idle'
      state.user = ''
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
