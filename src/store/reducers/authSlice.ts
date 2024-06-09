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
    updateCurrentUser: (state, action) => {
      state.stage = 'succedded'

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

export const { updateCurrentUser, logout } = authSlice.actions

export default authSlice.reducer
