import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'

const AppRouter = () => {
  const { isAuthenticated } = useAuthContext()

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(isAuthenticated
      ? [privateRoutes]
      : [
        {
          path: '*',
          element: <Navigate to="/login" replace />,
        },
      ]),
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
