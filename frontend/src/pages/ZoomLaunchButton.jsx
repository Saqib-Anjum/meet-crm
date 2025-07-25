
// import React, { useEffect, useState } from 'react';

// export default function ZoomLaunchButton({ meetingNumber, userName, userEmail, passWord, role }) {
//   const [ZoomMtg, setZoomMtg] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.ZoomMtg) {
//       // Use global ZoomMtg loaded via CDN
//       const ClientZoomMtg = window.ZoomMtg;
//       ClientZoomMtg.setZoomJSLib('https://source.zoom.us/2.14.0/lib', '/av');
//       ClientZoomMtg.preLoadWasm();
//       ClientZoomMtg.prepareJssdk();
//       setZoomMtg(ClientZoomMtg);
//     } else {
//       console.error('ZoomMtg not available on window. Ensure CDN script tags are in index.html.');
//     }
//     setLoading(false);
//   }, []);

//   const getSignature = async () => {
//     const res = await fetch('http://localhost:3060/api/zoom/signature', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ meetingNumber, role }),
//     });
//     const { signature } = await res.json();
//     return signature;
//   };

//   const handleLaunch = async () => {
//     if (!ZoomMtg) return;
//     try {
//       const signature = await getSignature();
//       ZoomMtg.init({
//         leaveUrl: window.location.origin,
//         isSupportAV: true,
//         success: () => {
//           ZoomMtg.join({
//             signature,
//             meetingNumber,
//             userName,
//             apiKey: 'cgHkkyCvTNuRlPphwjK98Q',
//             userEmail,
//             passWord,
//             success: () => console.log('Joined successfully'),
//             error: (err) => console.error(err),
//           });
//         },
//         error: (err) => console.error(err),
//       });
//     } catch (e) {
//       console.error('Error launching meeting', e);
//     }
//   };

//   return (
//     <button
//       onClick={handleLaunch}
//       className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
//       disabled={loading || !ZoomMtg}
//     >
//       {loading ? 'Loading Zoom SDK...' : 'Launch Zoom Meeting'}
//     </button>
//   );
// }



// src/components/ZoomLaunchButton.jsx
import React, { useEffect, useState } from 'react';

export default function ZoomLaunchButton({
  meetingNumber,
  userName,
  userEmail,
  passWord,
  role = 0, // 0 = attendee, 1 = host
}) {
  const [ZoomMtg, setZoomMtg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.ZoomMtg) {
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/2.14.0/lib', '/av');
      window.ZoomMtg.preLoadWasm();
      window.ZoomMtg.prepareJssdk();
      setZoomMtg(window.ZoomMtg);
      setLoading(false);
    } else {
      console.error('ZoomMtg not found on window.');
    }
  }, []);

  const getSignature = async () => {
    const res = await fetch('/api/zoom/signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingNumber, role }),
    });
    const data = await res.json();
    return data.signature;
  };

  const launchMeeting = async () => {
    if (!ZoomMtg) return;
    const signature = await getSignature();

    ZoomMtg.init({
      leaveUrl: window.location.origin,
      success: () => {
        ZoomMtg.join({
          signature,
          meetingNumber,
          userName,
          sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY, // your SDK Key
          userEmail,
          passWord,
          success: () => console.log('Zoom meeting joined'),
          error: (err) => console.error('Join error:', err),
        });
      },
      error: (err) => console.error('Init error:', err),
    });
  };

  return (
    <button
      onClick={launchMeeting}
      disabled={loading}
      style={{
        padding: '10px 20px',
        backgroundColor: '#0e71eb',
        color: '#fff',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {loading ? 'Loading Zoom...' : 'Launch Zoom Meeting'}
    </button>
  );
}
