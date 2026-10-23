import "../styles/globals.css";
import Shell from "../components/Shell";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Website({ Component, pageProps }) {
  return (
    <>
      <Shell>
        <Component {...pageProps} />
      </Shell>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
