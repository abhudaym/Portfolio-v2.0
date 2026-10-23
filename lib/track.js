import { track as vercelTrack } from "@vercel/analytics";

// Safe wrapper: never throws, does nothing on the server.
// Events show up in Vercel -> Analytics -> Events (custom events need a Pro plan).
export function track(name, props) {
  try {
    if (typeof window === "undefined") return;
    vercelTrack(name, props);
  } catch (e) {}
}
