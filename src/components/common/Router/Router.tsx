import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { publicRoutes, privateRoutes } from '@/config/routes';

const Router = () => {
    const { isAuthenticated } = useAuth();

    const router = createBrowserRouter([
        ...publicRoutes,
        isAuthenticated ? privateRoutes : {
            path: '*',
            element: <Navigate to="/login" replace />
        }
    ]);

    return <RouterProvider router={router} />;
};

export default Router;