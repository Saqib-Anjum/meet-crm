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
import MeetPage from './pages/MeetPage';
import RecordingsList from './pages/RecordingsList';
import Zoom from './pages/Zoom';
import ZoomLaunchButton from './pages/ZoomLaunchButton';
import MeetingList from './pages/MeetingList';
// import GoogleCalendar from './pages/GoogleCalendar';
// import OAuthCallback from './components/Google/OAuthCallback';
// import Google from './components/Google/Google';
import GoogleCalendar from './components/Google/GoogleCalendar';

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
        element: <UsersDetail />,
      },
      {
        path: "/meet",
        element: <MeetPage />,
      },
       {
        path: "/transcript-record",
        element: <RecordingsList />,
      },
      {
        path: "/zoom",
        element: <Zoom />,
      },
        {
        path: "/zooms",
        element: <ZoomLaunchButton />,
      },
      {
        path: "/meets",
        element: <MeetingList  />,
      },
      // {
      //   path: "/google-calendar",
      //   element: <GoogleCalendar  />,
      // },
      {
        path: "/google",
        element: <GoogleCalendar  />,
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