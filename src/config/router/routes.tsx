import MainLayout from '@/components/Layout/MainLayout'
import ComingSoonPage from '@/pages/ComingSoonPage'
import { ExercisesPage } from '@/pages/ExercisesPage'
import { HistoryPage } from '@/pages/HistoryPage'
import HomePage from '@/pages/HomePage'
import Login from '@/pages/Login'
import { PlanDayPage } from '@/pages/plans/PlanDayPage'
import { PlanExercisePage } from '@/pages/plans/PlanExercisePage'
import { PlanPage } from '@/pages/plans/PlanPage'
import ProfilePage from '@/pages/ProfilePage'
import { ProgressPage } from '@/pages/ProgressPage'
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
            element: <PlanExercisePage />
        },
        {
            path: '/history',
            element: <HistoryPage />
        },
        {
            path: '/exercises',
            element: <ExercisesPage />
        },
        {
            path: '/progress',
            element: <ProgressPage />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        },
        {
            path: '/statistics',
            element: <ComingSoonPage />
        },
        {
            path: '/Calendar',
            element: <ComingSoonPage />
        },
        {
            path: '/community',
            element: <ComingSoonPage />
        },
        {
            path: '/shop',
            element: <ComingSoonPage />
        },
    ],
}
