import React from 'react';
import { HiOutlineChartBar, HiOutlineWifi, HiOutlineCheckCircle, HiOutlineRefresh } from 'react-icons/hi';

const funcs = [
  { title: 'Optimization', icon: HiOutlineChartBar, bg: 'bg-red-400', toggled: true },
  { title: 'Smart Scan', icon: HiOutlineWifi, bg: 'bg-yellow-400', toggled: true },
  { title: 'Malware', icon: HiOutlineCheckCircle, bg: 'bg-blue-200', toggled: true },
  { title: 'Updater', icon: HiOutlineRefresh, bg: 'bg-gray-200', toggled: false },
];

function OtherFunctions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-4">Other Functions</h3>
      <div className="grid grid-cols-2 gap-4">
        {funcs.map(({ title, icon: Icon, bg, toggled }) => (
          <div key={title} className={`${bg} rounded-xl p-4 flex justify-between items-center`}>            
            <div className="flex items-center space-x-2">
              <Icon className="w-6 h-6 text-white" />
              <span className="text-white font-medium">{title}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" defaultChecked={toggled} /><div className="w-10 h-4 bg-white rounded-full peer-checked:bg-gray-300"></div></label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherFunctions;
