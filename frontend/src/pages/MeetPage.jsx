// src/App.js
import React, { useState } from 'react';
import TranscriptViewer from './TranscriptViewer';

function MeetPage() {
  const [meetingId, setMeetingId] = useState('');
  return (
    <div style={{ padding: 20 }}>
      <h1>Zoom Transcript Portal</h1>
      <input
        placeholder="Enter Zoom meeting ID"
        value={meetingId}
        onChange={e => setMeetingId(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={() => setMeetingId(meetingId)}>Load Transcript</button>
      {meetingId && <TranscriptViewer meetingId={meetingId} />}
    </div>
  );
}

export default MeetPage;
