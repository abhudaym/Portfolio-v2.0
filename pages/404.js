import NextLink from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <div className="wrap">
      <Head><title>404 - Abhuday Mishra</title></Head>
      <div className="bh" style={{ paddingTop: 96 }}>
        <div className="k" style={{ color: "var(--red)" }}>Error 404 · record dropped</div>
        <h1>This page failed validation.</h1>
        <p>It never made it past the second stage. Press <b>/</b> to search, or go back to where the data is still flowing.</p>
        <p style={{ marginTop: 22 }}><NextLink href="/" className="btn">Return to home</NextLink></p>
      </div>
    </div>
  );
}
