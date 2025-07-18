// import React, { useState, useEffect } from 'react';
// import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

// function Calendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Get Monday of the current week
//   const getWeekStart = (date) => {
//     const day = date.getDay(); // 0 (Sun) - 6 (Sat)
//     const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
//     return new Date(date.setDate(diff));
//   };

//   const weekStart = getWeekStart(new Date(currentDate));
//   const weekDays = Array.from({ length: 7 }).map((_, idx) => {
//     const d = new Date(weekStart);
//     d.setDate(weekStart.getDate() + idx);
//     return d;
//   });

//   // Format header like "July 14-20"
//   const formatHeader = (days) => {
//     const options = { month: 'long' };
//     const startMonth = days[0].toLocaleString('default', options);
//     const endMonth = days[6].toLocaleString('default', options);
//     const startDay = days[0].getDate();
//     const endDay = days[6].getDate();
//     return startMonth === endMonth
//       ? `${startMonth} ${startDay}-${endDay}`
//       : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
//   };

//   const headerText = formatHeader(weekDays);

//   // Handlers for prev/next week
//   const prevWeek = () => {
//     const prev = new Date(currentDate);
//     prev.setDate(currentDate.getDate() - 7);
//     setCurrentDate(prev);
//   };

//   const nextWeek = () => {
//     const next = new Date(currentDate);
//     next.setDate(currentDate.getDate() + 7);
//     setCurrentDate(next);
//   };

//   const isToday = (date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   return (
//     <div className="mt-6 bg-white rounded-xl p-6 shadow">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-medium">{headerText}</h2>
//         <div className="space-x-2">
//           <button onClick={prevWeek} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
//             <HiOutlineChevronLeft className="w-5 h-5" />
//           </button>
//           <button onClick={nextWeek} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
//             <HiOutlineChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//         <button className="px-4 py-2 bg-gray-100 rounded-full" onClick={() => setCurrentDate(new Date())}>
//           Month
//         </button>
//       </div>

//       <div className="mt-4 grid grid-cols-7 text-center">
//         {weekDays.map((date, idx) => (
//           <div key={idx} className="py-2">
//             <div className="text-sm font-medium">
//               {date.toLocaleString('default', { weekday: 'short' })}
//             </div>
//             <div
//               className={`mt-1 mx-auto w-8 h-8 rounded-full flex items-center justify-center shadow \${
//                 isToday(date) ? 'bg-red-400 text-white' : 'text-gray-500'
//               }`}
//             >
//               {date.getDate()}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 flex justify-end space-x-4 text-gray-500">
//         {['Today', 'Week', 'Month'].map((label) => (
//           <span
//             key={label}
//             className={
//               label === 'Week' ? 'font-semibold text-gray-800' : ''
//             }
//           >
//             {label}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Calendar;




import React, { useState } from 'react';

function Calendar() {

 

  return (
    <div className="mt-6 bg-white rounded-xl p-6 shadow">
      {/* Header and navigation */}


      {/* Embedded Google Calendar */}
      <div className="mt-6">
        <iframe
          title="Google Calendar"
          src="https://calendar.google.com/calendar/embed?src=frank.dicostanzo%40gmail.com&ctz=America%2FLos_Angeles"
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
          className="w-full max-w-full"
        />
      </div>
    </div>
  );
}

export default Calendar;
