import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import HomePage from '@/pages/home/HomePage';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ResetPassword from '@/pages/ResetPassword';
// import Dashboard from '@/pages/Dashboard';
// import WorkoutPlans from '@/pages/WorkoutPlans';
// import Progress from '@/pages/Progress';
// import Profile from '@/pages/Profile';

export const publicRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
    {
        path: '/',
        element: <HomePage />
    }
];

export const privateRoutes = {
    element: <MainLayout children={undefined} />,
    // children: [
    //     {
    //         path: '/dashboard',
    //         element: <Dashboard />
    //     },
    //     {
    //         path: '/workout-plans',
    //         element: <WorkoutPlans />
    //     },
    //     {
    //         path: '/progress',
    //         element: <Progress />
    //     },
    //     {
    //         path: '/profile',
    //         element: <Profile />
    //     },
    //     {
    //         path: '*',
    //         element: <Navigate to="/dashboard" replace />
    //     }
    // ]
};