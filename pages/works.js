import Head from "next/head";
import NextLink from "next/link";
import { getPublishedWorks } from "../lib/sanity";
import { LEGACY_WORKS } from "../lib/legacyWorks";
import { CASE_STUDIES } from "../lib/caseStudies";

export async function getStaticProps() {
  const sanity = await getPublishedWorks();
  const side = [
    ...sanity.map((w) => ({ id: w.id, title: w.title, description: w.description, year: w.date ? String(w.date).slice(0, 4) : "", stack: w.stack || "" })),
    ...LEGACY_WORKS.filter((l) => !sanity.some((w) => w.id === l.id)).map((l) => ({ id: l.id, title: l.title, description: l.description, year: l.year, stack: l.stack })),
  ].filter((w) => !CASE_STUDIES.some((c) => c.id === w.id));
  return { props: { side }, revalidate: 60 };
}

export default function Works({ side }) {
  return (
    <>
      <Head><title>Work - Abhuday Mishra</title></Head>
      <header className="col">
        <h1 className="title">Work</h1>
        <p className="sub">Production systems first. The side projects from college are further down, kept for the record.</p>
      </header>

      <section className="sec" style={{ gap: 12 }}>
        <h2><span className="accent">§1</span>&ensp;At AiDash</h2>
        <div className="list">
          {CASE_STUDIES.map((c) => (
            <div className="entry" key={c.id}>
              <span className="d">{c.period}</span>
              <span className="t"><NextLink href={"/works/" + c.id}>{c.title}</NextLink><small>{c.summary}</small></span>
              <span className="n">{c.facts[0].k}: {c.facts[0].v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ gap: 12 }}>
        <h2><span className="accent">§2</span>&ensp;Side projects</h2>
        <div className="list">
          {side.map((w) => (
            <div className="entry" key={w.id}>
              <span className="d">{w.year}</span>
              <span className="t"><NextLink href={"/works/" + w.id}>{w.title}</NextLink><small>{w.description}</small></span>
              <span className="n">{w.stack.split(",").slice(0, 3).map((s) => s.trim()).join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
