// src/App.js (or wherever you need it)
import GoogleAuthIframe from './GoogleAuthIframe';

function Google() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-2xl font-semibold mb-6">Connect Your Google Account</h1>
      <GoogleAuthIframe />
    </div>
  );
}

export default Google;

