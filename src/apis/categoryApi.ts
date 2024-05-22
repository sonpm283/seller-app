import { CATEGORY_API } from '~/constants'
import { Category } from '~/types/category.type'
import axiosClient from '~/utils/httpClient'

const categoryApi = {
  getCategoryList() {
    const url = CATEGORY_API.CATEGORIES
    return axiosClient.get<Category[]>(url)
  },
}

export default categoryApi
