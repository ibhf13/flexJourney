import MainLayout from '@/components/Layout/MainLayout'
import { ExercisesListPage } from '@/pages/ExercisesListPage'
import { HistoryPage } from '@/pages/HistoryPage'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/Login'
import { ExercisePage } from '@/pages/plans/ExercisePage'
import { PlanDayPage } from '@/pages/plans/PlanDayPage'
import { PlanPage } from '@/pages/plans/PlanPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import ResetPassword from '@/pages/ResetPassword'
import Signup from '@/pages/Signup'
import { RouteObject } from 'react-router-dom'

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
            element: <PlanPage />,
        },
        {
            path: '/plan/:planId',
            element: <PlanDayPage />,
        },
        {
            path: '/plan/:planId/day/:dayId',
            element: <ExercisePage />
        },
        {
            path: '/history',
            element: <HistoryPage />
        },
        {
            path: '/exercises',
            element: <ExercisesListPage />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        },
    ],
}
