import { RouteObject } from 'react-router-dom'
import MainLayout from '@/components/Layout/MainLayout'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import ResetPassword from '@/pages/ResetPassword'
import { PlanSelectionPage } from '@/pages/workout/PlanSelectionPage'
import { PlanDetailsPage } from '@/pages/workout/PlanDetailsPage'
import { ExerciseListPage } from '@/pages/ExerciseListPage'

export const publicRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
]

export const privateRoutes: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: 'plan',
            element: <PlanSelectionPage />,
        },
        {
            path: '/plan/:planId',
            element: <PlanDetailsPage />,
        },
        {
            path: '/plan/:planId/day/:dayId',
            element: <ExerciseListPage />
        }
    ],
}
