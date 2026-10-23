import Head from "next/head";
import { getProfile } from "../lib/sanity";
import { track } from "../lib/track";

export async function getStaticProps() {
  const profile = await getProfile();
  return { props: { pdfUrl: (profile && profile.resumeUrl) || "/resume.pdf" }, revalidate: 60 };
}

export default function Resume({ pdfUrl }) {
  return (
    <div className="wrap" style={{ maxWidth: 900 }}>
      <Head><title>Resume - Abhuday Mishra</title></Head>
      <div className="bh" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
        <div><div className="k">Resume</div><h1 style={{ margin: "8px 0 0" }}>The short version.</h1></div>
        <div className="tagrow">
          <a className="btn ghost" href={pdfUrl} target="_blank" rel="noreferrer" onClick={() => track("resume_open")}>Open PDF</a>
          <a className="btn" href={pdfUrl} download="Abhuday_Mishra_Resume.pdf" onClick={() => track("resume_download")}>Download PDF</a>
        </div>
      </div>
      <div className="pdf" style={{ marginTop: 28 }}><iframe src={pdfUrl} title="Resume PDF" /></div>
    </div>
  );
}
