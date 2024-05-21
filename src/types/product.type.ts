export interface Auth {
  email: string
  password: string
}

export interface Category {
  id: string
  name: string
}

export interface Color {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  available: number
  sold: number
  categoryId: number
  colorIds?: number[]
  colors?: number[]
  price: number
}

export interface ProductList {
  products: Product[]
}
