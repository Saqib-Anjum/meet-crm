 import React from 'react';
import './App.css'
import { createHashRouter } from "react-router-dom";
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import Login from './components/Auth/Login';
import DashboardLayout from './pages/DashboardLayout';
import User from './pages/User';
import DashboardPage from './pages/DashboardPage';
import UsersDetail from './pages/UsersDetail';

const router = createHashRouter([
  {
    path: "/login",
    element:  <Login /> ,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/users-detail",
        element: <UsersDetail />,
      },
    ]}
  // {
  //   path: "/signup",
  //   element: <PublicRoute> <SignupForm /> </PublicRoute>,
  // },
  // {
  //   path: "/forget-password",
  //   element: <PublicRoute> <ForgetPassword /> </PublicRoute>,
  // },
  // {
  //   path: "/verify-otp",
  //   element: <PublicRoute> <VerifyOtp /> </PublicRoute>,
  // },
  // {
  //   path: "/change-password",
  //   element: <PublicRoute> <ChangePassword /> </PublicRoute>,
  // },

  
  
]);


export default router;