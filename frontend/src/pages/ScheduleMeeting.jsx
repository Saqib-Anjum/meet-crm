import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScheduleMeeting() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3060/api/zoom/scheduler/events')
      .then((res) => {
        setEvents(res.data.events || []);
      })
      .catch((err) => {
        setError('Failed to load events');
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scheduled Events</h2>
      {error && <p className="text-red-600">{error}</p>}

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="border p-2 rounded shadow-sm">
              <p><strong>{event.topic}</strong></p>
              <p>{new Date(event.start_time).toLocaleString()}</p>
              <p>{event.duration} minutes</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
