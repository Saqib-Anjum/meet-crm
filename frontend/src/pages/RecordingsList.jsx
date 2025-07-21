// RecordingsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecordingsList() {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get('http://localhost:3060/api/recordings');
        setRecordings(data.recordings);
      } catch (err) {
        setError('Could not load recordings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading recordings…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!recordings.length) return <p>No recordings found.</p>;

  return (
    <div>
      <h2>All Zoom Recordings</h2>
      <ul>
        {recordings.map((m) => (
          <li key={m.uuid}>
            <strong>{m.topic}</strong> — {new Date(m.start_time).toLocaleString()}
            <br />
            <a href={m.recording_files?.[0]?.download_url + `?access_token=${process.env.REACT_APP_ZOOM_JWT_TOKEN}`}>
              ▶ Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
