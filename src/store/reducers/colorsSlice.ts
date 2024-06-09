import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import colorApi from '~/apis/colorApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { Color, CreateColor } from '~/types/color.type'

interface ColorState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listColorsIds: number[]
  listColor: { [key: string]: Color }
  error: string | null
}

// Define the async action
export const getColorList = createAsyncThunk(ACTIONS.GET_COLOR_LIST, async () => {
  const response = await colorApi.getColorList()
  return (response.data as Color[]) || []
})

export const createColor = createAsyncThunk(ACTIONS.CREATE_COLOR, async (newColor: CreateColor) => {
  const response = await colorApi.addColor(newColor)
  return (response.data as Color) || []
})

export const deleteColor = createAsyncThunk(ACTIONS.DELETE_COLOR, async (colorId: number) => {
  const response = await colorApi.deleteColor(colorId)
  return (response.data as Color) || {}
})

// Define the initial state for the slice
const inititalState: ColorState = {
  stage: 'idle',
  listColorsIds: [],
  listColor: {},
  error: null,
}

const pendingListType = [getColorList.pending.type, deleteColor.pending.type]
const rejectedListType = [getColorList.rejected.type, deleteColor.rejected.type]

const colorSlice = createSlice({
  name: REDUCERS.COLORS,
  initialState: inititalState,
  // Define reducers for the synchronous action
  reducers: {},

  // Define reducers for the asynchronous action
  extraReducers: (builder) => {
    builder
      .addCase(getColorList.fulfilled, (state, action: PayloadAction<Color[]>) => {
        state.stage = 'succeeded'

        if (action.payload) {
          const convertData = action.payload.reduce(
            (acc: { listColorsIds: number[]; listColor: Record<string, Color> }, color: Color) => {
              acc.listColorsIds.push(color.id)
              acc.listColor[color.id] = color
              return acc
            },
            { listColorsIds: [], listColor: {} },
          )

          state.listColorsIds = convertData.listColorsIds
          state.listColor = convertData.listColor
        }
      })
      .addCase(deleteColor.fulfilled, (state, action: PayloadAction<Color>) => {
        state.stage = 'succeeded'
        state.listColorsIds = state.listColorsIds.filter((id) => id !== action.payload.id)

        state.listColor = state.listColorsIds.reduce((acc: Record<string, Color>, id) => {
          if (state.listColor[id]) {
            acc[id] = state.listColor[id]
          }

          return acc
        }, {})
      })
      .addCase(createColor.fulfilled, (state, action: PayloadAction<Color>) => {
        state.stage = 'succeeded'
        if (action.payload) {
          state.listColorsIds.push(action.payload.id)
          state.listColor = { ...state.listColor, [action.payload.id]: action.payload }
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

// Export action from slice
export default colorSlice.reducer
