import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productSlice'
import categorySlice from './reducers/categorySlice'
import colorsSlice from './reducers/colorsSlice'
import authSlice from './reducers/authSlice'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  products: productSlice,
  categories: categorySlice,
  colors: colorsSlice,
  auth: authSlice,
})

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
}

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
