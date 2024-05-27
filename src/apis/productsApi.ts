import axiosClient from '~/utils/httpClient'
import { CreateProduct, Product } from '~/types/product.type'
import { PRODUCT_API } from '~/constants'

const productApi = {
  getProductList() {
    const url = PRODUCT_API.PRODUCTS
    return axiosClient.get<Product[]>(url)
  },
  addProduct(data: CreateProduct) {
    const url = PRODUCT_API.PRODUCTS
    return axiosClient.post<Product>(url, { ...data, sold: 0 })
  },
  updateProduct(productId: string, data: Product) {
    const url = `${PRODUCT_API.PRODUCTS}/${productId}`
    return axiosClient.put<Product>(url, data)
  },
  deleteProduct(id: string) {
    const url = `${PRODUCT_API.PRODUCTS}/${id}`
    return axiosClient.delete<Product>(url)
  },
}

export default productApi
