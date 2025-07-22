// import React, { useEffect, useState } from 'react';

// export default function TranscriptViewer({ meetingId, zoomToken }) {
//   const [transcript, setTranscript] = useState([]);

//   useEffect(() => {
//     if (!meetingId || !zoomToken) return;

//     // 1) Fetch the recordings metadata (with your token)
//     fetch(`https://api.zoom.us/v2/meetings/83904180522/recordings`, {
//       headers: {
//         'Authorization': `Bearer "eyJ0a192IjoiMi4wIiwiayI6Ii9sVGNxOEpTIiwiYWxnIjoiRVMyNTYiLCJ2IjoiMi4wIiwia2lkIjoiM2Y2MmI1NDQtNzA3ZS00NTMwLTk1OTItZjlmMjgzN2NkZmNkIn0.eyJleHQiOnsicm9sZSI6MCwiX2F0dHJfYmF1X21heF9jb3VudCI6NSwiX2F0dHJfaXNfcGFpZF9hY2NvdW50Ijp0cnVlLCJkdF9fYXR0cl9sb2dpbl91c2VyX2Zvcm1hdCI6eyJoaG1tIjoiaGg6bW0gYSIsImhobW1zcyI6ImhoOm1tOnNzIGEifSwiX2F0dHJfYV9jbGlwc19sZXZlbCI6MCwiX2F0dHJfZW5hYmxlX2NsaXBzIjoidHJ1ZSIsImR0X19hdHRyX2xvZ2luX3VzZXJfbG9jYWwiOiJlbi1VUyIsInNuc1R5cGUiOjEwMCwiZHRfX2F0dHJfc291cmNlX2Zyb20iOjAsIl9hdHRyX2Nhbl9lZGl0X2JpbGxpbmciOnRydWUsInByZW1pdW1UeXBlIjowLCJ1c2VyS2V5Ijo2NTY3MTgzNjA1NTg5MjU0NDU3LCJfYXR0cl9hY2NvdW50X3R5cGUiOjMsImR0X19hdHRyX2xvZ2luX3VzZXJfem9uZV9pZCI6IkFtZXJpY2EvTG9zX0FuZ2VsZXMiLCJfYXR0cl9iaWxsaW5nX3Blcm1pc3Npb24iOjIsIl9hdHRyX2lzX2FjY291bnRfc3VzcGVuZCI6ZmFsc2UsIl9hdHRyX2NsaXBzX2xldmVsIjowLCJQcmVtaXVtVHlwZSI6MCwidXNlclR5cGUiOjIsImR0X19hdHRyX29wX3JvbGVfaWQiOm51bGwsImJ1cy10eXBlIjoiMDAwMSIsImVtYWlsIjoiZmRjdGhlcmFweUBnbWFpbC5jb20iLCJkdF9fYXR0cl9wZXJtaXNzaW9ubGV2ZWwiOjB9LCJldWlkIjoiflVTRVJfQ1JZUFRPfkRQLUNMRjZhOGpLd0xRdGhEZ0FBRmdBQUFMajVCSlVHc3FPX3dXU1Ywckxvbk9xMVByWHMxNlhBeWZ6U3BRd1YwT1ZNV1hCUWNpN1BNREF3TURBeCIsImlzcyI6IndlYiIsInR5cCI6InptX3VzZXIiLCJzaWQiOiJlb0dEV3RwN2R1Tnh4cDEzVEVpZzVNd1VhQTkyYTM2dkRramFuNlk2bmw4IiwiYXVkIjoibndzIiwidWlkIjoicDRnOXZ0YkhTOEs1dmgyWkFBN3I5dyIsIm5iZiI6MTc1MzEyNzY4MiwicG1zIjpbIkNsaXA6RWRpdCIsIkNsaXA6UmVhZCIsIlJlY29yZGluZzpFZGl0IiwiUmVjb3JkaW5nQ29udGVudDpSZWFkIiwiUmVjb3JkaW5nOlJlYWQiLCJSZWNvcmRpbmc6aGFzQ01SUGxhbiIsIlJlY29yZGluZzppc1BhaWRBY2NvdW50IiwiQ2xpcDpoYXNDbGlwUGxhbiIsIkNsaXA6YWNjb3VudFNob3duQ2xpcHNUYWIiXSwic2siOiI2NTY3MTgzNjA1NTg5MjU0NDU3Iiwic3R5IjoxMDAsIndjZCI6InVzMDYiLCJleHAiOjE3NTMxMzEyODIsImlhdCI6MTc1MzEyNzY4MiwiYWlkIjoiZU5TNU43MzZSRjIxYk42V3AwSXh2ZyIsImp0aSI6ImNhOTQ1YmE5LTUyNjgtNDM4ZS05YzQ0LWY1YTg2NjY0ZWZkNiIsInVmcCI6IjUyRTY2Mjk0RkY5N0UzNEMxOENCRTBGMDU0NEMxQTAzM0NBMDRCOTM2ODk4MTQ4MzJEMDBDQTE2NkMwNTIxOTYifQ.yERUC1QtRwjRT9QYNW81_BB2-BJF6kapWuCr5CsDkrZMq10vHKyUQC7ULZlzs-iOA2mKXO0M6_7oJkmxqrCgdQ" `,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => {
//         if (!res.ok) throw new Error(`Zoom API error ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         // 2) Find the VTT transcript file
//         const vttFile = data.recording_files.find(
//           f => f.file_type === 'TRANSCRIPT' || f.file_extension === 'VTT'
//         );
//         if (!vttFile) throw new Error('No transcript found');

//         // 3) Download the VTT (also with token)
//         return fetch(vttFile.download_url, {
//           headers: { 'Authorization': `Bearer "eyJ0a192IjoiMi4wIiwiayI6Ii9sVGNxOEpTIiwiYWxnIjoiRVMyNTYiLCJ2IjoiMi4wIiwia2lkIjoiM2Y2MmI1NDQtNzA3ZS00NTMwLTk1OTItZjlmMjgzN2NkZmNkIn0.eyJleHQiOnsicm9sZSI6MCwiX2F0dHJfYmF1X21heF9jb3VudCI6NSwiX2F0dHJfaXNfcGFpZF9hY2NvdW50Ijp0cnVlLCJkdF9fYXR0cl9sb2dpbl91c2VyX2Zvcm1hdCI6eyJoaG1tIjoiaGg6bW0gYSIsImhobW1zcyI6ImhoOm1tOnNzIGEifSwiX2F0dHJfYV9jbGlwc19sZXZlbCI6MCwiX2F0dHJfZW5hYmxlX2NsaXBzIjoidHJ1ZSIsImR0X19hdHRyX2xvZ2luX3VzZXJfbG9jYWwiOiJlbi1VUyIsInNuc1R5cGUiOjEwMCwiZHRfX2F0dHJfc291cmNlX2Zyb20iOjAsIl9hdHRyX2Nhbl9lZGl0X2JpbGxpbmciOnRydWUsInByZW1pdW1UeXBlIjowLCJ1c2VyS2V5Ijo2NTY3MTgzNjA1NTg5MjU0NDU3LCJfYXR0cl9hY2NvdW50X3R5cGUiOjMsImR0X19hdHRyX2xvZ2luX3VzZXJfem9uZV9pZCI6IkFtZXJpY2EvTG9zX0FuZ2VsZXMiLCJfYXR0cl9iaWxsaW5nX3Blcm1pc3Npb24iOjIsIl9hdHRyX2lzX2FjY291bnRfc3VzcGVuZCI6ZmFsc2UsIl9hdHRyX2NsaXBzX2xldmVsIjowLCJQcmVtaXVtVHlwZSI6MCwidXNlclR5cGUiOjIsImR0X19hdHRyX29wX3JvbGVfaWQiOm51bGwsImJ1cy10eXBlIjoiMDAwMSIsImVtYWlsIjoiZmRjdGhlcmFweUBnbWFpbC5jb20iLCJkdF9fYXR0cl9wZXJtaXNzaW9ubGV2ZWwiOjB9LCJldWlkIjoiflVTRVJfQ1JZUFRPfkRQLUNMRjZhOGpLd0xRdGhEZ0FBRmdBQUFMajVCSlVHc3FPX3dXU1Ywckxvbk9xMVByWHMxNlhBeWZ6U3BRd1YwT1ZNV1hCUWNpN1BNREF3TURBeCIsImlzcyI6IndlYiIsInR5cCI6InptX3VzZXIiLCJzaWQiOiJlb0dEV3RwN2R1Tnh4cDEzVEVpZzVNd1VhQTkyYTM2dkRramFuNlk2bmw4IiwiYXVkIjoibndzIiwidWlkIjoicDRnOXZ0YkhTOEs1dmgyWkFBN3I5dyIsIm5iZiI6MTc1MzEyNzY4MiwicG1zIjpbIkNsaXA6RWRpdCIsIkNsaXA6UmVhZCIsIlJlY29yZGluZzpFZGl0IiwiUmVjb3JkaW5nQ29udGVudDpSZWFkIiwiUmVjb3JkaW5nOlJlYWQiLCJSZWNvcmRpbmc6aGFzQ01SUGxhbiIsIlJlY29yZGluZzppc1BhaWRBY2NvdW50IiwiQ2xpcDpoYXNDbGlwUGxhbiIsIkNsaXA6YWNjb3VudFNob3duQ2xpcHNUYWIiXSwic2siOiI2NTY3MTgzNjA1NTg5MjU0NDU3Iiwic3R5IjoxMDAsIndjZCI6InVzMDYiLCJleHAiOjE3NTMxMzEyODIsImlhdCI6MTc1MzEyNzY4MiwiYWlkIjoiZU5TNU43MzZSRjIxYk42V3AwSXh2ZyIsImp0aSI6ImNhOTQ1YmE5LTUyNjgtNDM4ZS05YzQ0LWY1YTg2NjY0ZWZkNiIsInVmcCI6IjUyRTY2Mjk0RkY5N0UzNEMxOENCRTBGMDU0NEMxQTAzM0NBMDRCOTM2ODk4MTQ4MzJEMDBDQTE2NkMwNTIxOTYifQ.yERUC1QtRwjRT9QYNW81_BB2-BJF6kapWuCr5CsDkrZMq10vHKyUQC7ULZlzs-iOA2mKXO0M6_7oJkmxqrCgdQ" ` }
//         })
//           .then(r => {
//             if (!r.ok) throw new Error(`Transcript download error ${r.status}`);
//             return r.text();
//           });
//       })
//       .then(parseVTT)
//       .then(setTranscript)
//       .catch(err => {
//         console.error(err);
//         setTranscript([{ text: `Error: ${err.message}` }]);
//       });
//   }, [meetingId, zoomToken]);

//   function parseVTT(vttText) {
//     return vttText
//       .trim()
//       .split(/\r?\n\r?\n/)
//       .slice(1)  // drop the WEBVTT header
//       .map(block => {
//         const [timeLine, ...lines] = block.split(/\r?\n/);
//         return { text: lines.join(' ') };
//       });
//   }

//   return (
//     <div>
//       <h2>Transcript for Meeting {meetingId}</h2>
//       {transcript.map((cue, i) => (
//         <p key={i}>{cue.text}</p>
//       ))}
//     </div>
//   );
// }



// TranscriptViewer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TranscriptViewer({ meetingId }) {
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!meetingId) return;

    axios.get(`http://localhost:3060/api/meetings/${meetingId}/transcript`)
      .then(res => {
        // res.data is the raw VTT text
        const vttText = res.data;
        const blocks = vttText.trim().split(/\r?\n\r?\n/).slice(1);
        const lines = blocks.map(block => {
          const [, ...textLines] = block.split(/\r?\n/);
          return textLines.join(' ');
        });
        setTranscriptLines(lines);
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || err.message);
      });
  }, [meetingId]);

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Transcript for Meeting {meetingId}</h2>
      <p>Now add a button to show the transcript of recording, do you understand? </p>
      {transcriptLines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}
