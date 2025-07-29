 import React from 'react';
import './App.css'
import { createHashRouter } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import Login from './components/Auth/Login';
import DashboardLayout from './pages/DashboardLayout';
import User from './pages/User';
import DashboardPage from './pages/DashboardPage';
import UsersDetail from './pages/UsersDetail';
import PatientDetails from './pages/patientDetails';

const router = createHashRouter([
  {
    path: "/login",
    element: <PublicRoute> <Login /> </PublicRoute>,
  },
  {
    path: "/",
    element: <DashboardLayout /> ,
        // element: <ProtectedRoute> <DashboardLayout /> </ProtectedRoute>,

    children: [
      {
        path: "/user",
        element: (<ProtectedRoute> <User /> </ProtectedRoute>),
      },
      {
        path: "/",
        element: (<ProtectedRoute> <DashboardPage /> </ProtectedRoute>),
      },
      {
        path: "/users-detail",
        element: (<ProtectedRoute> <UsersDetail /> </ProtectedRoute>),
      },
      {
        path: "/patient-detail",
        element: (<ProtectedRoute> <PatientDetails /> </ProtectedRoute>),
      },

    ]}
  
  
]);


export default router;