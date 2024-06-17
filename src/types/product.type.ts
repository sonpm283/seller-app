export interface Product {
  id: string
  name: string
  available: number
  sold: number
  categoryId: number
  colorIds?: string[]
  price: number
}

export interface CreateProduct {
  name: string
  available: number
  categoryId: number
  colorIds: string[]
  price: number
}
