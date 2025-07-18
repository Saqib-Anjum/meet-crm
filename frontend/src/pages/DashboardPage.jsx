 import React from 'react';
import Calendar from '../components/Calendar';
import WeeklyReports from '../components/WeeklyReports';
import StatisticsCleaning from '../components/StatisticsCleaning';
function DashboardPage() {

   return (
     <div className="">
  
        <Calendar />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyReports />
          </div>
          <div className="space-y-6">
            <StatisticsCleaning />
          </div>
        </div>
      </div>
   );
 }


 export default DashboardPage;
