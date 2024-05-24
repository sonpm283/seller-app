import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import productApi from '~/apis/productsApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { CreateProduct, Product } from '~/types/product.type'

interface ProductState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listProductIds: string[]
  listProduct: { [key: string]: Product }
  error: string | null
}

// Get the list of products
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

// Create a new product
export const createProduct = createAsyncThunk(
  ACTIONS.CREATE_PRODUCT,
  async (newProduct: CreateProduct, thunkApi) => {
    try {
      const response = await productApi.addProduct(newProduct)
      return (response.data as Product) || {}
    } catch (error) {
      // If the request was rejected, return the error messageProduct
      let errorMessage = 'Unknown error occurred'
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || 'Unknown error occurred'
      }
      // Return the error message as the rejected value
      return thunkApi.rejectWithValue(errorMessage)
    }
  },
)

const pendingListType = [getProductList.pending.type, createProduct.pending.type]
const rejectedListType = [getProductList.rejected.type, createProduct.rejected.type]

// Initial State
const inititalState: ProductState = {
  stage: 'idle',
  listProductIds: [],
  listProduct: {},
  error: null,
}

const productSlice = createSlice({
  name: REDUCERS.PRODUCTS,
  initialState: inititalState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.stage = 'succeeded'
        if (action.payload) {
          // process data
          const convertData = action.payload.reduce(
            (
              acc: { listIds: string[]; listProduct: Record<string, Product> },
              product: Product,
            ) => {
              acc.listIds.push(product.id)
              acc.listProduct[product.id] = product
              return acc
            },
            { listIds: [], listProduct: {} },
          )

          // update state
          state.listProductIds = convertData.listIds
          state.listProduct = convertData.listProduct
        }
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.stage = 'succeeded'
        if (action.payload) {
          // update state
          state.listProductIds.push(action.payload.id)
          state.listProduct = { ...state.listProduct, [action.payload.id]: action.payload }
        }
      })
      .addMatcher(
        (action) => pendingListType.includes(action.type),
        (state) => {
          state.stage = 'loading'
        },
      )
      .addMatcher(
        (action) => rejectedListType.includes(action.type),
        (state, action: PayloadAction<string>) => {
          state.stage = 'failed'
          state.error = action.payload
        },
      )
  },
})

// export const { increment } = productSlice.actions
export default productSlice.reducer
