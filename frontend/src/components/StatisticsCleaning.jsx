import React from 'react';

const days = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const values = [30, 40, 50, 58, 45, 50, 48];

function StatisticsCleaning() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium">Statistics of Session</h3>
      <div className="mt-4 text-2xl font-semibold">58%</div>
      <div className="mt-6 flex justify-between items-end h-40">
        {values.map((v,i)=>(            
          <div key={i} className={
            `flex-1 mx-1 flex flex-col justify-end items-center ${i===3? 'text-yellow-400' : 'text-blue-400'}`
          }>
            <div className="w-full bg-gray-200 rounded-t-lg" style={{height: `${100-v}px`}}></div>
            <div className="w-full rounded-b-lg" style={{height: `${v}px`}}></div>
            <span className="mt-1 text-xs text-gray-500">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsCleaning;
