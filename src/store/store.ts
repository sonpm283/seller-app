import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productSlice'

const rootReducer = {
  products: productSlice,
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
