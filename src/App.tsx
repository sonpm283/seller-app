import MainLayout from './components/Layout/MainLayout'
import ProductList from './pages/ProductList'
import Categories from './pages/Categories'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    ),
  },
  {
    path: 'seller',
    children: [
      {
        path: 'products',
        element: (
          <MainLayout>
            <ProductList />
          </MainLayout>
        ),
      },
      {
        path: 'categories',
        element: (
          <MainLayout>
            <Categories />
          </MainLayout>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
