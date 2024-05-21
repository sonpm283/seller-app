import axiosClient from '~/utils/httpClient'
import { Product } from '~/types/product.type'
import { PRODUCT_API } from '~/constants'

const productApi = {
  getProductList() {
    const url = PRODUCT_API.PRODUCTS
    return axiosClient.get<Product[]>(url)
  },
}

export default productApi
