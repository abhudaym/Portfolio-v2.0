import Head from "next/head";
import NextLink from "next/link";
import Markdown from "../../components/Markdown";
import { getPublishedWorks, getWorkBySlug } from "../../lib/sanity";
import { LEGACY_WORKS } from "../../lib/legacyWorks";

export async function getStaticPaths() {
  const works = await getPublishedWorks();
  const ids = new Set([...works.map((w) => String(w.id)), ...LEGACY_WORKS.map((l) => l.id)]);
  return { paths: [...ids].map((id) => ({ params: { id } })), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await getWorkBySlug(params.id);
  if (data) return { props: { work: { ...data.frontMatter, content: data.content || "", images: [] } }, revalidate: 60 };
  const l = LEGACY_WORKS.find((x) => x.id === params.id);
  if (!l) return { notFound: true };
  return { props: { work: { title: l.title, description: l.description, date: l.year, platform: l.platform, stack: l.stack, website: l.website, source: l.source, thumbnail: null, content: l.body, images: l.images } }, revalidate: 60 };
}

const Row = ({ k, children }) => children ? <li><span className="tag">{k}</span><span>{children}</span></li> : null;
const fmt = (d) => (/^\d{4}$/.test(String(d)) ? d : d ? new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "");

export default function Work({ work }) {
  return (
    <div className="post" style={{ gridTemplateColumns: "minmax(0, 720px)" }}>
      <Head><title>{work.title} - Abhuday Mishra</title><meta name="description" content={work.description} /></Head>
      <article>
        <NextLink href="/works" className="back">← All works</NextLink>
        <h1>{work.title}</h1>
        {work.description && <p className="sub">{work.description}</p>}
        <ul className="meta-list">
          <Row k="Year">{fmt(work.date)}</Row>
          <Row k="Platform">{work.platform}</Row>
          <Row k="Stack">{work.stack}</Row>
          <Row k="Website">{work.website && <a href={work.website} target="_blank" rel="noreferrer">{work.website}</a>}</Row>
          <Row k="Source">{work.source && <a href={work.source} target="_blank" rel="noreferrer">{work.source}</a>}</Row>
        </ul>
        {work.thumbnail && !work.content && <img src={work.thumbnail} alt={work.title} style={{ width: "100%", borderRadius: 12 }} />}
        {work.content && <Markdown playbackRate={2}>{work.content}</Markdown>}
        {work.images.length > 0 && <div className="shots">{work.images.map((src) => <img key={src} src={src} alt={work.title} loading="lazy" />)}</div>}
      </article>
    </div>
  );
}
