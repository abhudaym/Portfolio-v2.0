import Head from "next/head";
import NextLink from "next/link";
import Markdown from "../../components/Markdown";
import Figure, { Facts } from "../../components/Figure";
import Diagram from "../../components/Diagram";
import { getPublishedWorks, getWorkBySlug } from "../../lib/sanity";
import { CASE_STUDIES, caseStudy } from "../../lib/caseStudies";
import { track } from "../../lib/track";

export async function getStaticPaths() {
  const works = await getPublishedWorks();
  const ids = new Set([...CASE_STUDIES.map((c) => c.id), ...works.map((w) => String(w.id))]);
  return { paths: [...ids].map((id) => ({ params: { id } })), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const cs = caseStudy(params.id);
  if (cs) return { props: { cs }, revalidate: 60 };
  const data = await getWorkBySlug(params.id);
  if (!data) return { notFound: true };
  return { props: { work: { ...data.frontMatter, content: data.content || "" } }, revalidate: 60 };
}

const fmt = (d) => (/^\d{4}$/.test(String(d)) ? d : d ? new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "");
const Back = () => <NextLink href="/works" className="back">← All work</NextLink>;

function CaseStudy({ cs }) {
  return (
    <>
      <Head><title>{cs.title + " - Abhuday Mishra"}</title><meta name="description" content={cs.summary} /></Head>
      <article className="row">
        <div className="col" style={{ gap: 22 }}>
          <Back />
          <h1 className="title">{cs.title} <i style={{ fontWeight: 400, display: "block" }}>{cs.kind}</i></h1>
          <p className="sub">{cs.summary}</p>
          {cs.diagram ? <Diagram n={1} {...cs.diagram} /> : cs.steps && <Figure n={1} steps={cs.steps} caption={cs.caption} />}
          <div className="md">
            {cs.sections.map((s) => (
              <section key={s.h} className="md">
                <h2>{s.h}</h2>
                {(s.p || []).map((t, i) => <p key={i}>{t}</p>)}
                {s.table && (
                  <div className="tablewrap">
                    <table>
                      <thead><tr>{s.table.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
                      <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {s.list && <ul>{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
                {(s.after || []).map((t, i) => <p key={"a" + i}>{t}</p>)}
              </section>
            ))}
            {cs.related && (
              <section className="md">
                <h2>Related writing</h2>
                <ul>{cs.related.map((r) => <li key={r.href}><NextLink href={r.href}>{r.label}</NextLink></li>)}</ul>
              </section>
            )}
          </div>
          <Back />
        </div>
        <Facts items={[{ k: "When", v: cs.period }, ...cs.facts]} />
      </article>
    </>
  );
}

export default function Work({ work, cs }) {
  if (cs) return <CaseStudy cs={cs} />;
  const facts = [
    work.date && { k: "Year", v: fmt(work.date) },
    work.platform && { k: "Platform", v: work.platform },
    work.stack && { k: "Stack", v: work.stack },
    work.website && { k: "Website", v: <a href={work.website} target="_blank" rel="noreferrer" onClick={() => track("work_link", { work: work.title, kind: "website" })}>Open the site</a> },
    work.source && { k: "Source", v: <a href={work.source} target="_blank" rel="noreferrer" onClick={() => track("work_link", { work: work.title, kind: "source" })}>GitHub</a> },
  ].filter(Boolean);
  return (
    <>
      <Head><title>{work.title + " - Abhuday Mishra"}</title><meta name="description" content={work.description} /></Head>
      <article className="row">
        <div className="col" style={{ gap: 22 }}>
          <Back />
          <h1 className="title">{work.title}</h1>
          {work.description && <p className="sub">{work.description}</p>}
          {work.thumbnail && !work.content && <img src={work.thumbnail} alt={work.title} style={{ width: "100%", border: "1px solid var(--rule)" }} />}
          {work.content && <Markdown playbackRate={2}>{work.content}</Markdown>}
          <Back />
        </div>
        {facts.length > 0 && <Facts items={facts} />}
      </article>
    </>
  );
}
