// oauthService.js
import axios from 'axios';
const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID } = process.env;

export async function getZoomAccessToken() {
  const creds = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
  ).toString('base64');

  const resp = await axios.post(
    'https://zoom.us/oauth/token',
    null,
    {
      params: { grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID },
      headers: {
        Authorization: `Basic ${creds}`,
      }
    }
  );

  return resp.data.access_token;  // expires in resp.data.expires_in seconds
}
