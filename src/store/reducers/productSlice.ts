import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import productApi from '~/apis/productsApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { Product } from '~/types/product.type'

interface ProductState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listProductIds: number[]
  listProduct: { [key: number]: Product }
  error: string | null
}

// Define the async action
export const getProductList = createAsyncThunk(ACTIONS.GET_PRODUCT_LIST, async (_, thunkApi) => {
  try {
    const response = await productApi.getProductList()
    return (response.data as Product[]) || []
  } catch (error) {
    // If the request was rejected, return the error message
    let errorMessage = 'Unknown error occurred'
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || 'Unknown error occurred'
    }
    // Return the error message as the rejected value
    return thunkApi.rejectWithValue(errorMessage)
  }
})

// Define the initial state for the slice
const inititalState: ProductState = {
  stage: 'idle',
  listProductIds: [],
  listProduct: {},
  error: null,
}

const productSlice = createSlice({
  name: REDUCERS.PRODUCTS,
  initialState: inititalState,
  // Define reducers for the synchronous action
  reducers: {},

  // Define reducers for the asynchronous action
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.stage = 'loading'
      })
      .addCase(getProductList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.stage = 'succeeded'

        if (action.payload) {
          // process data
          const convertData = action.payload.reduce(
            (
              acc: { listIds: number[]; listProduct: Record<number, Product> },
              product: Product,
            ) => {
              acc.listIds.push(Number(product.id))
              acc.listProduct[Number(product.id)] = product
              return acc
            },
            { listIds: [], listProduct: {} },
          )

          // update state
          state.listProductIds = convertData.listIds
          state.listProduct = convertData.listProduct
        }
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.stage = 'failed'
        state.error = action.payload as string
      })
  },
})

// Export action from slice
// export const { increment } = productSlice.actions
export default productSlice.reducer
