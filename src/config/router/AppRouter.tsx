import { LoadingFallback } from '@/components/common/Layouts/LoadingFallback'
import { useAuthContext } from '@/features/auth/contexts/AuthContext'
import { Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTES } from './routeConstants'
import { routes } from './routes'

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return <LoadingFallback />
  }

  const router = createBrowserRouter([
    ...routes.publicRoutes,

    isAuthenticated
      ? routes.privateRoutes
      : {
        path: '*',
        element: (
          <Navigate
            to={ROUTES.AUTH.LOGIN}
            replace
            state={{ from: window.location.pathname }}
          />
        ),
      }
  ])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter
