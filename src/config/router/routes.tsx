import { LoadingFallback } from '@/components/common/Layouts/LoadingFallback'
import { MainLayout } from '@/components/Layout'
import { ErrorBoundary } from '@/features/errorHandling/components/ErrorBoundary'
import StatisticsPage from '@/pages/StatisticsPage'
import { lazy, Suspense } from 'react'
import { ROUTES } from './routeConstants'

// Lazy loaded components
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const PlanPage = lazy(() => import('@/pages/plans/PlanPage'))
const PlanDayPage = lazy(() => import('@/pages/plans/PlanDayPage'))
const PlanExercisePage = lazy(() => import('@/pages/plans/PlanExercisePage'))
const HistoryPage = lazy(() => import('@/pages/HistoryPage'))
const ExercisesPage = lazy(() => import('@/pages/ExercisesPage'))
const ProgressPage = lazy(() => import('@/pages/ProgressPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'))

const withSuspense = (Component: React.ComponentType) => (
    <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
            <Component />
        </Suspense>
    </ErrorBoundary>
)

export const routes = {
    publicRoutes: [
        {
            path: ROUTES.AUTH.LOGIN,
            element: withSuspense(Login),
            title: 'Login'
        },
        {
            path: ROUTES.AUTH.SIGNUP,
            element: withSuspense(Signup),
            title: 'Sign Up'
        },
        {
            path: ROUTES.AUTH.RESET_PASSWORD,
            element: withSuspense(ResetPassword),
            title: 'Reset Password'
        }
    ],
    privateRoutes: {
        path: ROUTES.MAIN.HOME,
        element: <MainLayout />,
        children: [
            {
                path: ROUTES.MAIN.HOME,
                element: withSuspense(HomePage),
                title: 'Home'
            },
            {
                path: ROUTES.MAIN.PLAN.ROOT,
                element: withSuspense(PlanPage),
                title: 'Plans'
            },
            {
                path: ROUTES.MAIN.PLAN.DETAIL,
                element: withSuspense(PlanDayPage),
                title: 'Plan Details'
            },
            {
                path: ROUTES.MAIN.PLAN.DAY,
                element: withSuspense(PlanExercisePage),
                title: 'Plan Exercises'
            },
            {
                path: ROUTES.MAIN.HISTORY,
                element: withSuspense(HistoryPage),
                title: 'History'
            },
            {
                path: ROUTES.MAIN.EXERCISES,
                element: withSuspense(ExercisesPage),
                title: 'Exercises'
            },
            {
                path: ROUTES.MAIN.PROGRESS,
                element: withSuspense(ProgressPage),
                title: 'Progress'
            },
            {
                path: ROUTES.MAIN.PROFILE,
                element: withSuspense(ProfilePage),
                title: 'Profile'
            },
            {
                path: '/statistics',
                element: <StatisticsPage />,
                title: 'Stats'
            },
            // Coming soon pages
            ...[
                ROUTES.MAIN.CALENDAR,
                ROUTES.MAIN.COMMUNITY,
                ROUTES.MAIN.SHOP
            ].map(path => ({
                path,
                element: withSuspense(ComingSoonPage),
                title: path.slice(1).charAt(0).toUpperCase() + path.slice(2)
            }))
        ]
    }
}
