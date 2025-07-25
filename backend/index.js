// // server.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import usersRouter from './routes/users.js';
// import { connectDB } from './db.js';
// import {
//   fetchRecordings,
//   downloadTranscript
// } from './controllers/zoomService.js';
// import path from 'path';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import minMax from 'dayjs/plugin/minMax.js';
// dayjs.extend(minMax);

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use('/users', usersRouter);
// app.get('/', (_, res) => res.send('API is running'));



// // app.use('/media', express.static(path.join(process.cwd(), 'media')));

// // // API: get (or fetch+cache) transcript URL for a meeting
// // app.get('/api/meetings/:id/transcript', async (req, res) => {
// //   try {
// //     const meetingId = req.params.id;
// //     const files     = await fetchRecordings(meetingId);

// //     // find the VTT file
// //     const vttFile = files.find(f => f.file_type === 'TRANSCRIPT' || f.file_extension === 'VTT');
// //     if (!vttFile) return res.status(404).json({ error: 'No transcript found' });

// //     // download (if not exists) and return public path
// //     const localPath = await downloadTranscript(meetingId, vttFile.download_url);
// //     res.json({ transcriptUrl: localPath });
// //   } catch (e) {
// //     console.error(e);
// //     res.status(500).json({ error: e.message });
// //   }
// // });



// async function getZoomAccessToken() {
//   const creds = Buffer.from(
//     `${'cgHkkyCvTNuRlPphwjK98Q'}:${'q9qjEhkLhPMBYdzMAY4AMYgrjFjy2wZx'}`
//   ).toString('base64');

//   const resp = await axios.post(
//     'https://zoom.us/oauth/token',
//     null,
//     {
//       params: {
//         grant_type: 'account_credentials',
//         account_id: 'eNS5N736RF21bN6Wp0Ixvg'
//       },
//       headers: {
//         Authorization: `Basic ${creds}`
//       }
//     }
//   );

//   return resp.data.access_token; 
// }


// // Serve static media (if you cache transcripts locally)
// app.use('/media', express.static(path.join(process.cwd(), 'media')));

// // 1) Proxy to fetch recording metadata + transcript
// app.get('/api/meetings/:meetingId/transcript', async (req, res) => {
//   try {
//     const { meetingId } = req.params;
//     const token = await getZoomAccessToken();
//     console.log("token",token)

//     // 2) Get recording files list
//     const recRes = await axios.get(
//       `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // 3) Find the VTT (transcript)
//     const vttFile = recRes.data.recording_files.find(
//       f => f.file_extension === 'vtt' || f.file_type === 'TRANSCRIPT'
//     );
//     if (!vttFile) return res.status(404).json({ error: 'No transcript found' });

//     // 4) Stream the VTT back to client
//     const transcriptStream = await axios.get(vttFile.download_url, {
//       headers: { Authorization: `Bearer ${token}` },
//       responseType: 'stream'
//     });
//     res.setHeader('Content-Type', 'text/vtt');
//     transcriptStream.data.pipe(res);

//   } catch (err) {
//     console.error(err);
//     res.status(err.response?.status || 500).json({ error: err.message });
//   }
// });


// // Recording List API
// const MAX_DAYS_PER_CHUNK = 90;


// const ZOOM_USER_ID = 'fdctherapy@gmail.com'
// /**
//  * Fetch recordings for a single date window, paging until exhausted.
//  */
// async function fetchRecordingsInRange(userId, fromDate, toDate) {
//   let allMeetings = [];
//   let nextPageToken = '';

//   do {
//         const token = await getZoomAccessToken();

//     const res = await axios.get(
//       `https://api.zoom.us/v2/users/${userId}/recordings`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           from:                 fromDate,
//           to:                   toDate,
//           page_size:            300,            // max allowed
//           next_page_token:      nextPageToken,
//         }
//       }
//     );
//     allMeetings = allMeetings.concat(res.data.meetings);
//     nextPageToken = res.data.next_page_token;
//   } while (nextPageToken);

//   return allMeetings;
// }

// /**
//  * Fetch *all* recordings by sliding through your entire history
//  * in MAX_DAYS_PER_CHUNK‑day increments.
//  */
// async function fetchAllRecordings(userId) {
//   // 1. Zoom’s archive goes back as far as the account exists.
//   //    You could pull the account‐creation date via Zoom’s Account API,
//   //    but here we’ll just go back 5 years as an example.
//   let start = dayjs().subtract(5, 'year').startOf('day');
//   const end   = dayjs().endOf('day');

//   const allRecordings = [];

//   // Slide window forward until we cover “now”
//   while (start.isBefore(end)) {
//     const chunkEnd = dayjs.min(
//       start.add(MAX_DAYS_PER_CHUNK, 'day'),
//       end
//     );
//     // Zoom requires dates in YYYY-MM-DD
//     const from = start.format('YYYY-MM-DD');
//     const to   = chunkEnd.format('YYYY-MM-DD');

//     console.log(`Fetching recordings from ${from} to ${to}`);
//     const chunkRecs = await fetchRecordingsInRange(userId, from, to);
//     allRecordings.push(...chunkRecs);

//     // Advance window
//     start = chunkEnd.add(1, 'day');
//   }

//   return allRecordings;
// }

// // Our own API endpoint
// app.get('/api/recordings', async (req, res) => {
//   try {
//     const recordings = await fetchAllRecordings('fdctherapy@gmail.com');
//     console.log("recordings",recordings)
//     res.json({ total: recordings.length, recordings });
//   } catch (err) {
//     console.error('Error fetching recordings:', err.response?.data || err);
//     res.status(500).json({ error: 'Failed to fetch recordings' });
//   }
// });

// connectDB().then(() => {
//   app.listen(PORT, () =>
//     console.log(`🚀 Server up on this port ${PORT}`)
//   );
// });






import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
// import dayjs from 'dayjs';
// import minMax from 'dayjs/plugin/minMax.js';
// import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import usersRouter from './routes/users.js';
import { connectDB } from './db.js';
import { userSignup, signin } from './controllers/auth.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// dayjs.extend(minMax);

const {
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
  ZOOM_ACCOUNT_ID,
  ZOOM_USER_ID,
  PORT = 3060
} = process.env;

// fail fast if creds missing
if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET || !ZOOM_ACCOUNT_ID || !ZOOM_USER_ID) {
  console.error('Missing one or more ZOOM_… environment variables.');
  process.exit(1);
}

// serve your React build or any other static files here if needed
// app.use(express.static(path.join(process.cwd(), 'client', 'build')));

app.use('/users', usersRouter);
app.use('/media', express.static(path.resolve('media')));

app.get('/', (_req, res) => res.send('API is running'));

async function getZoomAccessToken() {
  const creds = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
  ).toString('base64');

  const resp = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    null,
    {
      headers: {
        Authorization: `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return resp.data.access_token;
}

// app.get('/api/meetings/:meetingId/transcript', async (req, res) => {
//   try {
//     const { meetingId } = req.params;
//     const token = await getZoomAccessToken();

//     // fetch recordings metadata
//     const recRes = await axios.get(
//       `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const vttFile = recRes.data.recording_files.find(
//       f => f.file_extension === 'vtt' || f.file_type === 'TRANSCRIPT'
//     );
//     if (!vttFile) {
//       return res.status(404).json({ error: 'No transcript found' });
//     }

//     // stream transcript back
//     const transcriptStream = await axios.get(vttFile.download_url, {
//       headers: { Authorization: `Bearer ${token}` },
//       responseType: 'stream'
//     });
//     res.setHeader('Content-Type', 'text/vtt');
//     transcriptStream.data.pipe(res);

//   } catch (err) {
//     console.error(err.response?.data || err);
//     res.status(err.response?.status || 500)
//        .json({ error: err.message || 'Transcript fetch failed' });
//   }
// });

// const MAX_DAYS_PER_CHUNK = 90;

// async function fetchRecordingsInRange(from, to, pageToken = '') {
//   const token = await getZoomAccessToken();
//   const res = await axios.get(
//     `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/recordings`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//       params: {
//         from,
//         to,
//         page_size: 300,
//         next_page_token: pageToken
//       }
//     }
//   );
//   return {
//     meetings: res.data.meetings,
//     next_page_token: res.data.next_page_token
//   };
// }

// async function fetchAllRecordings() {
//   const all = [];
//   let start = dayjs().subtract(5, 'year').startOf('day');
//   const end = dayjs().endOf('day');

//   while (start.isBefore(end)) {
//     const chunkEnd = dayjs.min(start.add(MAX_DAYS_PER_CHUNK, 'day'), end);
//     const from = start.format('YYYY-MM-DD');
//     const to = chunkEnd.format('YYYY-MM-DD');
//     console.log(`Fetching recordings from ${from} to ${to}`);

//     let token = '';
//     do {
//       const { meetings, next_page_token } =
//         await fetchRecordingsInRange(from, to, token);
//       all.push(...meetings);
//       token = next_page_token;
//     } while (token);

//     start = chunkEnd.add(1, 'day');
//   }

//   return all;
// }

// app.get('/api/recordings', async (_req, res) => {
//   try {
//     const recordings = await fetchAllRecordings();
//     res.json({ total: recordings.length, recordings });
//   } catch (err) {
//     console.error('Error fetching recordings:', err);
//     res.status(500).json({ error: 'Failed to fetch recordings' });
//   }
// });



      
    // const token = await getZoomAccessToken();

// app.get('/api/zoom/scheduler/events', async (req, res) => {
//   try {
//     const token = generateJWT();

//     const { data } = await axios.get('https://api.zoom.us/v2/scheduler/events', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     res.json(data);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to fetch scheduler events' });
//   }
// });







function generateZoomJWT() {
  return jwt.sign(
    { iss: ZOOM_CLIENT_ID, exp: Math.floor(Date.now() / 1000) + 60 },
    ZOOM_CLIENT_SECRET,
    { algorithm: 'HS256' }
  );
}

// Proxy endpoint to list meetings for a user
app.get('/api/zoom/users/:userId/meetings', async (req, res) => {
  const userId = 'p4g9vtbHS8K5vh2ZAA7r9w';
  const token = generateZoomJWT();

  try {
    const response = await axios.get(
      `https://api.zoom.us/v2/users/${userId}/meetings`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Zoom API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});









app.post('/signin', signin)
app.post('/signup', userSignup)




connectDB()
  .then(() => {
    app.listen(PORT, () => 
      console.log(`🚀 Server listening on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
