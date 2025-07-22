// // RecordingsList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function RecordingsList() {
//   const [recordings, setRecordings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         const { data } = await axios.get('http://localhost:3060/api/recordings');
//         setRecordings(data.recordings);
//       } catch (err) {
//         setError('Could not load recordings.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   if (loading) return <p>Loading recordings…</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!recordings.length) return <p>No recordings found.</p>;

//   return (
//     <div>
//       <h2>All Zoom Recordings</h2>
//       <ul>
//         {recordings.map((m) => (
//           <li key={m.uuid}>
//             <strong>{m.topic}</strong> — {new Date(m.start_time).toLocaleString()}
//             <br />
//             <a href={m.recording_files?.[0]?.download_url}>
//               ▶ Download
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// RecordingsList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function RecordingsList() {
//   const [recordings, setRecordings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // State for transcript
//   const [transcriptLines, setTranscriptLines] = useState([]);
//   const [loadingTranscript, setLoadingTranscript] = useState(false);
//   const [transcriptError, setTranscriptError] = useState('');
//   const [activeMeetingId, setActiveMeetingId] = useState(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         const { data } = await axios.get('http://localhost:3060/api/recordings');
//         setRecordings(data.recordings);
//       } catch (err) {
//         setError('Could not load recordings.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   // Fetch transcript when a meeting is selected
//   useEffect(() => {
//     if (!activeMeetingId) return;

//     setLoadingTranscript(true);
//     setTranscriptError('');
//     axios.get(`http://localhost:3060/api/meetings/${activeMeetingId}/transcript`)
//       .then(res => {
//         const vttText = res.data;
//         const blocks = vttText.trim().split(/\r?\n\r?\n/).slice(1);
//         const lines = blocks.map(block => {
//           const [, ...textLines] = block.split(/\r?\n/);
//           return textLines.join(' ');
//         });
//         setTranscriptLines(lines);
//       })
//       .catch(err => {
//         console.error(err);
//         setTranscriptError(err.response?.data?.error || err.message);
//       })
//       .finally(() => {
//         setLoadingTranscript(false);
//       });
//   }, [activeMeetingId]);

//   if (loading) return <p>Loading recordings…</p>;
//   if (error)   return <p style={{ color: 'red' }}>{error}</p>;
//   if (!recordings.length) return <p>No recordings found.</p>;

//   return (
//     <div>
//       <h2>All Zoom Recordings</h2>
//       <ul>
//         {recordings.map((m) => (
//           <li key={m.uuid} style={{ marginBottom: '1em' }}>
//             <strong>{m.topic}</strong> — {new Date(m.start_time).toLocaleString()}
//             <br />
//             {/* <a href={m.recording_files?.[0]?.download_url} target="_blank" rel="noopener noreferrer">
//               ▶ Download
//             </a> */}
//             {' '}
//             <button
//               onClick={() => setActiveMeetingId(m.uuid)}
//               style={{ marginLeft: '1em' }}
//             >
//               Show Transcript
//             </button>
//             {/* If this recording is active, display transcript */}
//             {activeMeetingId === m.uuid && (
//               <div style={{ marginTop: '0.5em', paddingLeft: '1em', borderLeft: '2px solid #ddd' }}>
//                 <h3>Transcript</h3>
//                 {loadingTranscript && <p>Loading transcript…</p>}
//                 {transcriptError && <p style={{ color: 'red' }}>Error: {transcriptError}</p>}
//                 {!loadingTranscript && !transcriptError && transcriptLines.length === 0 && (
//                   <p>No transcript available.</p>
//                 )}
//                 {!loadingTranscript && transcriptLines.map((line, idx) => (
//                   <p key={idx}>{line}</p>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// RecordingsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecordingsList() {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for transcript
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState('');
  const [activeMeetingId, setActiveMeetingId] = useState(null);

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

  // Fetch transcript when a meeting is selected
  useEffect(() => {
    if (!activeMeetingId) return;

    setLoadingTranscript(true);
    setTranscriptError('');
    axios.get(`http://localhost:3060/api/meetings/${activeMeetingId}/transcript`)
      .then(res => {
        const vttText = res.data;
        const blocks = vttText.trim().split(/\r?\n\r?\n/).slice(1);
        const lines = blocks.map(block => {
          // Split into lines and remove cue number and timestamp
          const parts = block.split(/\r?\n/);
          const textLines = parts.slice(2);
          return textLines.join(' ');
        });
        setTranscriptLines(lines);
      })
      .catch(err => {
        console.error(err);
        setTranscriptError(err.response?.data?.error || err.message);
      })
      .finally(() => {
        setLoadingTranscript(false);
      });
  }, [activeMeetingId]);

  if (loading) return <p>Loading Transcripts…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;
  if (!recordings.length) return <p>No Transcript found.</p>;

  return (
    <div>
      <h2 className=''>All Zoom Recordings</h2>
      <ul>
        {recordings.map((m) => (
          <li key={m.uuid} style={{ marginBottom: '1em' }}>
            <strong>{m.topic}</strong> — {new Date(m.start_time).toLocaleString()}
            <br />
            {/* <a href={m.recording_files?.[0]?.download_url} target="_blank" rel="noopener noreferrer">
              ▶ Download
            </a> */}
            {' '}
            <button
              onClick={() => setActiveMeetingId(m.uuid)}
              style={{ marginLeft: '1em' }}
            >
              Show Transcript
            </button>
            {activeMeetingId === m.uuid && (
              <div style={{ marginTop: '0.5em', paddingLeft: '1em', borderLeft: '2px solid #ddd' }}>
                <h3>Transcript</h3>
                {loadingTranscript && <p>Loading transcript…</p>}
                {/* {transcriptError && <p style={{ color: 'red' }}>Error: {transcriptError}</p>} */}
                {!loadingTranscript && !transcriptError && transcriptLines.length === 0 && (
                  <p>No transcript available.</p>
                )}
                {!loadingTranscript && transcriptLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
