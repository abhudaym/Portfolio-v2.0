import Head from "next/head";
import { getProfile } from "../lib/sanity";
import { track } from "../lib/track";

export async function getStaticProps() {
  const profile = await getProfile();
  return { props: { pdfUrl: (profile && profile.resumeUrl) || "/resume.pdf" }, revalidate: 60 };
}

export default function Resume({ pdfUrl }) {
  return (
    <>
      <Head><title>Résumé - Abhuday Mishra</title></Head>
      <header className="col">
        <h1 className="title">Résumé</h1>
        <p className="sub">
          One page. <a href={pdfUrl} download="Abhuday_Mishra_Resume.pdf" onClick={() => track("resume_download")}>Download the PDF</a> or{" "}
          <a href={pdfUrl} target="_blank" rel="noreferrer" onClick={() => track("resume_open")}>open it in a new tab</a>.
        </p>
      </header>
      <div className="pdf"><iframe src={pdfUrl} title="Résumé PDF" /></div>
    </>
  );
}
