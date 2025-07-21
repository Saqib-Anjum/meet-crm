// zoomService.js
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const { ZOOM_API_KEY, ZOOM_API_SECRET } = process.env;

// 1) Generate JWT valid for 1 minute
export function makeZoomJWT() {
  const payload = { iss: ZOOM_API_KEY, exp: Date.now() / 1000 + 60 };
  return jwt.sign(payload, ZOOM_API_SECRET);
}

// 2) Fetch recordings metadata (incl. transcript URL)
export async function fetchRecordings(meetingId) {
  const token = makeZoomJWT();
  const url   = `https://api.zoom.us/v2/meetings/${meetingId}/recordings`;
  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.recording_files;
}

// 3) Download & save the VTT transcript
export async function downloadTranscript(meetingId, vttUrl) {
  const token = makeZoomJWT();
  const res   = await axios.get(vttUrl, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'stream'
  });
  const dir  = path.join(process.cwd(), 'media');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const dest = path.join(dir, `${meetingId}.vtt`);
  await new Promise((res, rej) => {
    const stream = fs.createWriteStream(dest);
    res(); res();
    res(); // ensure Promise semantics
  });
  return `/media/${meetingId}.vtt`;
}
