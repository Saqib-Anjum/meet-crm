import React from 'react';

export default function GoogleAuthIframe() {
  // Construct your OAuth URL with your client_id, redirect_uri, scopes, etc.
  const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  oauthUrl.searchParams.set('client_id', import.meta.env.VITE_GOOGLE_CLIENT_ID);
  oauthUrl.searchParams.set('redirect_uri', 'http://localhost:5173/oauth-callback');
  oauthUrl.searchParams.set('response_type', 'token');      // or "code"
  oauthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.events');
  oauthUrl.searchParams.set('prompt', 'consent');

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <iframe
        title="Google OAuth"
        src={oauthUrl.toString()}
        sandbox="allow-scripts" 
        className="w-full h-full"
      />
    </div>
  );
}
