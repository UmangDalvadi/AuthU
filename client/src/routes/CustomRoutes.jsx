import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Register from '../pages/Register';
import VerifyOtp from '../pages/VerifyOtp';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import UpdatePassword from '../pages/UpdatePassword';

import { useUserContext } from '../context/userContext';

const CustomRoutes = () => {

    const { userRole } = useUserContext();

    return (
        <Router>
            <Routes>

                <Route
                    path='/register'
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/verifyOtp'
                    element={
                        <PublicRoute>
                            <VerifyOtp />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/login'
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/forget-password'
                    element={
                        <PublicRoute>
                            <ForgetPassword />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/reset-password/:token'
                    element={
                        <PublicRoute>
                            <UpdatePassword />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/'
                    element={
                        userRole == 'admin' ?
                            <ProtectedRoute role="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                            :
                            <ProtectedRoute role="user">
                                <UserDashboard />
                            </ProtectedRoute >
                    }
                />

            </Routes>
        </Router>
    )
}

export default CustomRoutes
