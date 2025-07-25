import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MeetingList({ userId }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMeetings() {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`http://localhost:3060/api/zoom/users/${userId}/meetings`);
        setMeetings(data.meetings || []);
      } catch (err) {
        setError('Could not load meetings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
  }, [userId]);

  if (loading) return <p className="p-4">Loading meetings…</p>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Zoom Meetings</h1>
      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Topic</th>
              <th className="border p-2 text-left">Start Time</th>
              <th className="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="border p-2">{m.topic}</td>
                <td className="border p-2">
                  {new Date(m.start_time).toLocaleString()}
                </td>
                <td className="border p-2">{m.duration} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
