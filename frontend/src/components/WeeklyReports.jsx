import React from 'react';
import { HiOutlineServer, HiOutlineMusicNote, HiOutlineTrash, HiOutlinePhotograph  } from 'react-icons/hi';
import { FaUserAlt, FaUsers  } from "react-icons/fa";

const reports = [
  { title: 'Today Session', icon: HiOutlineServer, value: '10', highlight: true },
  { title: 'Last Month Session', icon: FaUsers , value: '160' },
  { title: 'Total Users Session', icon: FaUserAlt, value: '3666' },
  { title: 'Photo Session', icon: HiOutlinePhotograph , value: '0' },
];

function WeeklyReports() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Weekly Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map(({ title, icon: Icon, value, highlight }) => (
          <div key={title} className={`flex flex-col items-center p-4 rounded-xl shadow bg-white`}>
            <Icon className="w-6 h-6 mb-2 text-gray-500" />
            <span className="text-sm text-gray-600">{title}</span>
            <span className={`mt-2 text-lg font-semibold ${highlight ? 'text-yellow-500' : 'text-gray-800'}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyReports;