// src/utils/pkce.js
// ———————————————————————————————————————————————————————————————
// RFC 7636 – PKCE helpers for generating code_verifier & code_challenge
export function base64urlEncode(str) {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sha256(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(buffer));
  return String.fromCharCode(...new Uint8Array(digest));
}

export async function generatePKCE() {
  const verifier = base64urlEncode(crypto.getRandomValues(new Uint8Array(32)).reduce((s, b) => s + String.fromCharCode(b), ""));
  const challenge = base64urlEncode(await sha256(verifier));
  return { verifier, challenge };
}
