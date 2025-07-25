// src/components/OAuthCallback.jsx
// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function OAuthCallback() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // For implicit flow, response comes back in the URL hash:
//     const hashParams = new URLSearchParams(location.hash.replace(/^#/, ''));
//     const accessToken = hashParams.get('access_token');

//     if (accessToken) {
//       // Persist the token and redirect home
//       localStorage.setItem('google_access_token', accessToken);
//       navigate('/', { replace: true });
//     } else {
//       // Handle errors or auth code flows here
//       console.error('No access token found in URL');
//     }
//   }, [location, navigate]);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <p className="text-lg">Finalizing sign‑in…</p>
//     </div>
//   );
// }


// src/App.jsx  (or wherever you want the button)
import React, { useEffect } from 'react';

function OAuthCallback() {
  // 1) define the global callback exactly once when the component mounts
  useEffect(() => {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, 
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large' }
      );
    };

    return () => {
      // cleanup if needed
      delete window.onGoogleLibraryLoad;
    };
  }, []);

  // 2) handle the JWT credential response here
  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    // send it to your backend or decode it directly...
  };

  return (
    <div className="App">
      <h1>Sign in with Google</h1>
      {/* this is where the button will render */}
      <div id="g_id_signin"></div>
    </div>
  );
}

export default OAuthCallback;