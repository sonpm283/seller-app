export interface Product {
  id: number
  name: string
  available: number
  sold: number
  categoryId: number
  colorIds?: number[]
  price: number
}
