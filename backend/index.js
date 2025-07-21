// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import { connectDB } from './db.js';
import {
  fetchRecordings,
  downloadTranscript
} from './controllers/zoomService.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dayjs from 'dayjs';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.get('/', (_, res) => res.send('API is running'));



// app.use('/media', express.static(path.join(process.cwd(), 'media')));

// // API: get (or fetch+cache) transcript URL for a meeting
// app.get('/api/meetings/:id/transcript', async (req, res) => {
//   try {
//     const meetingId = req.params.id;
//     const files     = await fetchRecordings(meetingId);

//     // find the VTT file
//     const vttFile = files.find(f => f.file_type === 'TRANSCRIPT' || f.file_extension === 'VTT');
//     if (!vttFile) return res.status(404).json({ error: 'No transcript found' });

//     // download (if not exists) and return public path
//     const localPath = await downloadTranscript(meetingId, vttFile.download_url);
//     res.json({ transcriptUrl: localPath });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: e.message });
//   }
// });



async function getZoomAccessToken() {
  const creds = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString('base64');

  const resp = await axios.post(
    'https://zoom.us/oauth/token',
    null,
    {
      params: {
        grant_type: 'account_credentials',
        account_id: process.env.ZOOM_ACCOUNT_ID
      },
      headers: {
        Authorization: `Basic ${creds}`
      }
    }
  );

  return resp.data.access_token; 
}


// Serve static media (if you cache transcripts locally)
app.use('/media', express.static(path.join(process.cwd(), 'media')));

// 1) Proxy to fetch recording metadata + transcript
app.get('/api/meetings/:meetingId/transcript', async (req, res) => {
  try {
    const { meetingId } = req.params;
    const token = await getZoomAccessToken();
    console.log("token",token)

    // 2) Get recording files list
    const recRes = await axios.get(
      `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 3) Find the VTT (transcript)
    const vttFile = recRes.data.recording_files.find(
      f => f.file_extension === 'vtt' || f.file_type === 'TRANSCRIPT'
    );
    if (!vttFile) return res.status(404).json({ error: 'No transcript found' });

    // 4) Stream the VTT back to client
    const transcriptStream = await axios.get(vttFile.download_url, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'stream'
    });
    res.setHeader('Content-Type', 'text/vtt');
    transcriptStream.data.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});


// Recording List API
const MAX_DAYS_PER_CHUNK = 90;


const ZOOM_USER_ID = process.env.ZOOM_USER_ID;      // e.g. "me" or your userId
/**
 * Fetch recordings for a single date window, paging until exhausted.
 */
async function fetchRecordingsInRange(userId, fromDate, toDate) {
  let allMeetings = [];
  let nextPageToken = '';

  do {
        const token = await getZoomAccessToken();

    const res = await axios.get(
      `https://api.zoom.us/v2/users/${userId}/recordings`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          from:                 fromDate,
          to:                   toDate,
          page_size:            300,            // max allowed
          next_page_token:      nextPageToken,
        }
      }
    );
    allMeetings = allMeetings.concat(res.data.meetings);
    nextPageToken = res.data.next_page_token;
  } while (nextPageToken);

  return allMeetings;
}

/**
 * Fetch *all* recordings by sliding through your entire history
 * in MAX_DAYS_PER_CHUNK‑day increments.
 */
async function fetchAllRecordings(userId) {
  // 1. Zoom’s archive goes back as far as the account exists.
  //    You could pull the account‐creation date via Zoom’s Account API,
  //    but here we’ll just go back 5 years as an example.
  let start = dayjs().subtract(5, 'year').startOf('day');
  const end   = dayjs().endOf('day');

  const allRecordings = [];

  // Slide window forward until we cover “now”
  while (start.isBefore(end)) {
    const chunkEnd = dayjs.min(
      start.add(MAX_DAYS_PER_CHUNK, 'day'),
      end
    );
    // Zoom requires dates in YYYY-MM-DD
    const from = start.format('YYYY-MM-DD');
    const to   = chunkEnd.format('YYYY-MM-DD');

    console.log(`Fetching recordings from ${from} to ${to}`);
    const chunkRecs = await fetchRecordingsInRange(userId, from, to);
    allRecordings.push(...chunkRecs);

    // Advance window
    start = chunkEnd.add(1, 'day');
  }

  return allRecordings;
}

// Our own API endpoint
app.get('/api/recordings', async (req, res) => {
  try {
    const recordings = await fetchAllRecordings(ZOOM_USER_ID);
    console.log("recordings",recordings)
    res.json({ total: recordings.length, recordings });
  } catch (err) {
    console.error('Error fetching recordings:', err.response?.data || err);
    res.status(500).json({ error: 'Failed to fetch recordings' });
  }
});

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server up on this port ${PORT}`)
  );
});
