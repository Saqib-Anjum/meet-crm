 import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import WeeklyReports from '../components/WeeklyReports';
import UpdatingMonitoring from '../components/UpdatingMonitoring';
import OtherFunctions from '../components/OtherFunctions';
import StatisticsCleaning from '../components/StatisticsCleaning';
import Login from '../components/Auth/Login';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {

   return (
     <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <main>
        <Outlet />
        </main>

      </div>
    </div>
   );
 }


 export default DashboardLayout;
