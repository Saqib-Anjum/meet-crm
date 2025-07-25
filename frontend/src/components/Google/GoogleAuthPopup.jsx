// // src/components/GoogleAuthPopup.jsx
// import React, { useEffect } from "react";
// import { generatePKCE } from "../../utils/pkce";

// export default function GoogleAuthPopup() {
//   useEffect(() => {
//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, []);

//   const handleMessage = (e) => {
//     if (e.origin !== window.location.origin) return;
//     if (e.data.type === "GOOGLE_OAUTH") {
//       const { token, error } = e.data;
//       if (token) {
//         localStorage.setItem("google_access_token", token);
//         alert("Signed in!");
//       } else {
//         console.error("OAuth error", error);
//       }
//     }
//   };

//   const startOAuth = async () => {
//     const { verifier, challenge } = await generatePKCE();
//     sessionStorage.setItem("pkce_verifier", verifier);

//     const params = new URLSearchParams({
//       client_id: '223342436536-hlild6q9me5dshdq3b1gnl2sg6nc8trj.apps.googleusercontent.com',
//       redirect_uri: `${window.location.origin}/oauth-callback`,
//       response_type: "code",
//       scope: "https://www.googleapis.com/auth/calendar.events",
//       code_challenge: challenge,
//       code_challenge_method: "S256",
//       prompt: "consent",
//     });

//     window.open(
//       `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
//       "googleOAuth",
//       "width=500,height=600"
//     );
//   };

//   return (
//     <button
//       onClick={startOAuth}
//       className="py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
//     >
//       Sign in with Google
//     </button>
//   );
// }



// src/components/GoogleAuthPopup.jsx
import { generatePKCE } from "../../utils/pkce";

export default function GoogleAuthPopup() {
  const startOAuth = async () => {
    const { verifier, challenge } = await generatePKCE();
    sessionStorage.setItem("pkce_verifier", verifier);


    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth-callback.html`,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/calendar.events",
      code_challenge: challenge,
      code_challenge_method: "S256",
      access_type: "offline",
      prompt: "consent",
    });

    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
      "googleOAuth",
      "width=500,height=600"
    );
  };

  return (
    <button onClick={startOAuth} className="…">
      Sign in with Google
    </button>
  );
}
