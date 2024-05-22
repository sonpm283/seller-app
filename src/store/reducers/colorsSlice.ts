import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import colorApi from '~/apis/colorApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { Color } from '~/types/color.type'

interface ColorState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listColorsIds: number[]
  listColor: { [key: number]: Color }
  error: string | null
}

// Define the async action
export const getColorList = createAsyncThunk(ACTIONS.GET_COLOR_LIST, async (_, thunkApi) => {
  try {
    const response = await colorApi.getColorList()
    return (response.data as Color[]) || []
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
const inititalState: ColorState = {
  stage: 'idle',
  listColorsIds: [],
  listColor: {},
  error: null,
}

const productSlice = createSlice({
  name: REDUCERS.COLORS,
  initialState: inititalState,
  // Define reducers for the synchronous action
  reducers: {
    // increment: (state, action: PayloadAction<number>) => {
    //   state.count += action.payload
    // },
  },

  // Define reducers for the asynchronous action
  extraReducers: (builder) => {
    builder
      .addCase(getColorList.pending, (state) => {
        state.stage = 'loading'
      })
      .addCase(getColorList.fulfilled, (state, action: PayloadAction<Color[]>) => {
        state.stage = 'succeeded'

        if (action.payload) {
          const convertData = action.payload.reduce(
            (acc: { listIds: number[]; listProduct: Record<number, Color> }, product: Color) => {
              acc.listIds.push(Number(product.id))
              acc.listProduct[Number(product.id)] = product
              return acc
            },
            { listIds: [], listProduct: {} },
          )

          state.listColorsIds = convertData.listIds
          state.listColor = convertData.listProduct
        }
      })
      .addCase(getColorList.rejected, (state, action) => {
        state.stage = 'failed'
        state.error = action.payload as string
      })
  },
})

// Export action from slice
export default productSlice.reducer
