import React, { useState, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

// Load and initialize Google API client
const CLIENT_ID = '223342436536-h50fbpc7c3ede8p92h99195v7nkf5eea.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAYQwxTVjv3-qpmY7ji3yXrzjzf_T8WAFE';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly';

function GoogleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Initialize GAPI client
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);

    function initClient() {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setGapiLoaded(true);
        })
        .catch((err) => console.error('GAPI init error', err));
    }
  }, []);

  // Sign in helper
  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  // Get Monday of the current week
  const getWeekStart = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const weekStart = getWeekStart(new Date(currentDate));
  const weekDays = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + idx);
    return d;
  });

  // Format header like "July 14-20"
  const formatHeader = (days) => {
    const options = { month: 'long' };
    const startMonth = days[0].toLocaleString('default', options);
    const endMonth = days[6].toLocaleString('default', options);
    const startDay = days[0].getDate();
    const endDay = days[6].getDate();
    return startMonth === endMonth
      ? `${startMonth} ${startDay}-${endDay}`
      : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  const headerText = formatHeader(weekDays);

  // navigation
  const prevWeek = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7));
  const nextWeek = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7));

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Fetch events for selected date
  const fetchEvents = (date) => {
    if (!gapiLoaded) return;
    if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      handleAuthClick();
      return;
    }

    const timeMin = new Date(date);
    timeMin.setHours(0, 0, 0);
    const timeMax = new Date(date);
    timeMax.setHours(23, 59, 59);

    window.gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      })
      .then(response => {
        setEvents(response.result.items);
        setSelectedDate(date);
      })
      .catch(err => console.error('Error fetching events', err));
  };

  return (
    <div className="mt-6 bg-white rounded-xl p-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{headerText}</h2>
        <div className="space-x-2">
          <button onClick={prevWeek} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <HiOutlineChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextWeek} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <HiOutlineChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-gray-100 rounded-full">
          Today
        </button>
      </div>

      {/* Week Days */}
      <div className="mt-4 grid grid-cols-7 text-center">
        {weekDays.map((date, idx) => (
          <div
            key={idx}
            className="py-2 cursor-pointer"
            onClick={() => fetchEvents(date)}
          >
            <div className="text-sm font-medium">
              {date.toLocaleString('default', { weekday: 'short' })}
            </div>
            <div
              className={`mt-1 mx-auto w-8 h-8 rounded-full flex items-center justify-center shadow ${
                isToday(date) ? 'bg-red-400 text-white' : 'text-gray-500'
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="mt-4 flex justify-end space-x-4 text-gray-500">
        <span className="hover:underline cursor-pointer" onClick={() => setCurrentDate(new Date())}>Today</span>
        <span className="font-semibold">Week</span>
        <span className="hover:underline cursor-pointer" onClick={() => {/* handle Month view if needed */}}>Month</span>
      </div>

      {/* Events Modal/List */}
      {selectedDate && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-2">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          {events.length ? (
            <ul className="space-y-2">
              {events.map((evt) => (
                <li key={evt.id} className="p-2 bg-white rounded shadow">
                  <div className="font-medium">{evt.summary || 'No Title'}</div>
                  <div className="text-sm text-gray-600">
                    {evt.start.dateTime
                      ? new Date(evt.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'All-day'}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events for this day.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default GoogleCalendar;
