// src/App.js
import React, { useEffect, useState } from "react";

const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function GoogleCalendar() {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [eventData, setEventData] = useState({
    summary: "",
    location: "",
    description: "",
    start: "",
    end: "",
  });

  // 1. Load and initialize gapi
  useEffect(() => {
    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: "", // optional, not needed for OAuth-only flows
          clientId: "223342436536-h50fbpc7c3ede8p92h99195v7nkf5eea.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(setIsSignedIn);
          // Handle the initial sign-in state
          setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          setGapiLoaded(true);
        });
    };

    window.gapi.load("client:auth2", initClient);
  }, []);

  // 2. Handlers for auth
  const handleAuthClick = () =>
    window.gapi.auth2.getAuthInstance().signIn();
  const handleSignoutClick = () =>
    window.gapi.auth2.getAuthInstance().signOut();

  // 3. Form change handler
  const handleChange = (e) =>
    setEventData((d) => ({ ...d, [e.target.name]: e.target.value }));

  // 4. Submit new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      summary: eventData.summary,
      location: eventData.location,
      description: eventData.description,
      start: { dateTime: new Date(eventData.start).toISOString() },
      end: { dateTime: new Date(eventData.end).toISOString() },
    };
    try {
      await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      alert("Event created successfully!");
      setEventData({ summary: "", location: "", description: "", start: "", end: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating event: " + err.result.error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Add Google Calendar Event</h1>

        {/* Auth Buttons */}
        {!gapiLoaded ? (
          <p>Loading Google API…</p>
        ) : !isSignedIn ? (
          <button
            onClick={handleAuthClick}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        ) : (
          <button
            onClick={handleSignoutClick}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 mb-4"
          >
            Sign out
          </button>
        )}

        {/* Event Form */}
        {isSignedIn && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="summary"
              value={eventData.summary}
              onChange={handleChange}
              type="text"
              placeholder="Event title"
              required
              className="w-full p-2 border rounded-lg"
            />
            <input
              name="location"
              value={eventData.location}
              onChange={handleChange}
              type="text"
              placeholder="Location"
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm">Start</label>
                <input
                  name="start"
                  value={eventData.start}
                  onChange={handleChange}
                  type="datetime-local"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm">End</label>
                <input
                  name="end"
                  value={eventData.end}
                  onChange={handleChange}
                  type="datetime-local"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
            >
              Create Event
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoogleCalendar;
