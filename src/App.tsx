import MainLayout from './components/Layout/MainLayout'
import ProductList from './pages/ProductList'
import Categories from './pages/Categories'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './pages/404'
import Auth from './pages/Auth/Auth'
import { useAppSelector } from './hooks/useTypeSelector'

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth)
  if (!user) return <Navigate to="/login" replace={true} />

  return <Outlet />
}

const UnauthoziedRoute = () => {
  const { user } = useAppSelector((state) => state.auth)
  if (user) return <Navigate to="/" replace={true} />

  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/seller/products" replace={true} />,
  },
  {
    path: '',
    element: <UnauthoziedRoute />, 
    children: [
      {
        path: 'login',
        element: <Auth />,
      },
    ],
  },
  {
    path: 'seller',
    element: <ProtectedRoute />,
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
  {
    path: '*',
    element: <NotFound />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
