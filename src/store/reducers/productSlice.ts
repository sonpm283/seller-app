import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productApi from '~/apis/productsApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { CreateProduct, Product } from '~/types/product.type'

interface ProductState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listProductIds: string[]
  listProduct: { [key: string]: Product }
  productEditing: Product | null
  error: string | null
}

// Get the list of products
export const getProductList = createAsyncThunk(ACTIONS.GET_PRODUCT_LIST, async () => {
  const response = await productApi.getProductList()
  return (response.data as Product[]) || []
})

// Create a new product
export const createProduct = createAsyncThunk(ACTIONS.CREATE_PRODUCT, async (newProduct: CreateProduct) => {
  const response = await productApi.addProduct(newProduct)
  return (response.data as Product) || {}
})

// Update product
export const updateProduct = createAsyncThunk(
  ACTIONS.UPDATE_PRODUCT,
  async ({ id, productUpdate }: { id: string; productUpdate: CreateProduct }) => {
    const response = await productApi.updateProduct(id, productUpdate)

    return response?.data || []
  },
)

// Delete product
export const deleteProduct = createAsyncThunk(ACTIONS.DELETE_PRODUCT, async (productId: string, thunkApi) => {
  if (productId === null) {
    return thunkApi.rejectWithValue('Failed to delete product!')
  }

  const response = await productApi.deleteProduct(productId)
  return (response.data as Product) || {}
})

const pendingListType = [getProductList.pending.type, createProduct.pending.type, deleteProduct.pending.type]
const rejectedListType = [getProductList.rejected.type, createProduct.rejected.type, deleteProduct.rejected.type]

// Initial State
const initialState: ProductState = {
  stage: 'idle',
  listProductIds: [],
  listProduct: {},
  productEditing: null,
  error: null,
}

const productSlice = createSlice({
  name: REDUCERS.PRODUCTS,
  initialState: initialState,
  reducers: {
    setEditingProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      const foundProduct = state.listProduct[productId] || null
      state.productEditing = foundProduct
    },
    cancelEditingProduct: (state) => {
      state.productEditing = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.stage = 'succeeded'
        if (action.payload) {
          const convertData = action.payload.reduce(
            (acc: { listIds: string[]; listProduct: Record<string, Product> }, product: Product) => {
              acc.listIds.push(product.id)
              acc.listProduct[product.id] = product
              return acc
            },
            { listIds: [], listProduct: {} },
          )

          state.listProductIds = convertData.listIds
          state.listProduct = convertData.listProduct
        }
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.stage = 'succeeded'
        if (action.payload) {
          state.listProductIds.push(action.payload.id)
          state.listProduct = { ...state.listProduct, [action.payload.id]: action.payload }
        }
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.listProduct[action.payload.id] = action.payload
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.stage = 'succeeded'
        state.listProductIds = state.listProductIds.filter((id) => id !== action.payload.id)

        state.listProduct = state.listProductIds.reduce((acc: Record<string, Product>, id) => {
          if (state.listProduct[id]) {
            acc[id] = state.listProduct[id]
          }

          return acc
        }, {})
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

export const { setEditingProduct, cancelEditingProduct } = productSlice.actions
export default productSlice.reducer
