import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productSlice'
import categorySlice from './reducers/categorySlice'
import colorsSlice from './reducers/colorsSlice'

const rootReducer = {
  products: productSlice,
  categories: categorySlice,
  colors: colorsSlice,
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
