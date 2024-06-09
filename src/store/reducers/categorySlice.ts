import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryApi from '~/apis/categoryApi'
import { ACTIONS, REDUCERS } from '~/constants'
import { Category } from '~/types/category.type'

interface CategoryState {
  stage: 'idle' | 'loading' | 'succeeded' | 'failed'
  listCategoryIds: number[]
  listCategory: { [key: string]: Category }
  error: string | null
}

export const getCategoryList = createAsyncThunk(ACTIONS.GET_CATEGORY_LIST, async () => {
  const response = await categoryApi.getCategoryList()
  return (response.data as Category[]) || []
})

const initialState: CategoryState = {
  stage: 'idle',
  listCategoryIds: [],
  listCategory: {},
  error: null,
}

const categorySlice = createSlice({
  name: REDUCERS.CATEGORIES,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.stage = 'loading'
      })
      .addCase(getCategoryList.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.stage = 'succeeded'
        const converData = action.payload.reduce(
          (
            acc: { listCategoryIds: number[]; listCategory: Record<number, Category> },
            category: Category,
          ) => {
            acc.listCategoryIds.push(Number(category.id))
            acc.listCategory[Number(category.id)] = category

            return acc
          },
          { listCategoryIds: [], listCategory: {} },
        )

        state.listCategoryIds = converData.listCategoryIds
        state.listCategory = converData.listCategory
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.stage = 'failed'
        state.error = action.payload as string
      })
  },
})

export default categorySlice.reducer
