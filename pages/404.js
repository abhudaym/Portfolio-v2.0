import NextLink from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head><title>404 - Abhuday Mishra</title></Head>
      <header className="col" style={{ padding: "48px 0" }}>
        <p className="mono grey">404</p>
        <h1 className="title">There is no page here.</h1>
        <p className="sub">The link may be old. <NextLink href="/">Go back to the front page</NextLink>.</p>
      </header>
    </>
  );
}
