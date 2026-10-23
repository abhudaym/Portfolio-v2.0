import Head from "next/head";
import Spot from "../components/Spot";
import Reveal from "../components/Reveal";
import { getPublishedWorks } from "../lib/sanity";
import { LEGACY_WORKS } from "../lib/legacyWorks";

export async function getStaticProps() {
  const sanity = await getPublishedWorks();
  const works = [
    ...sanity.map((w) => ({ id: w.id, title: w.title, description: w.description, year: w.date ? String(w.date).slice(0, 4) : "", stack: w.stack || "", thumbnail: w.thumbnail })),
    ...LEGACY_WORKS.filter((l) => !sanity.some((w) => w.id === l.id)).map((l) => ({ id: l.id, title: l.title, description: l.description, year: l.year, stack: l.stack, thumbnail: l.thumbnail })),
  ];
  return { props: { works }, revalidate: 60 };
}

export default function Works({ works }) {
  return (
    <div className="wrap">
      <Head><title>Works - Abhuday Mishra</title></Head>
      <div className="bh">
        <div className="k">Works · case files</div>
        <h1>Things I&apos;ve built.</h1>
        <p>From college side projects to production pipelines. Hover a card.</p>
      </div>
      <div className="works-grid" style={{ marginTop: 34 }}>
        {works.map((w) => (
          <Reveal key={w.id}>
            <Spot href={"/works/" + w.id}>
              <div className="thumb" style={{ backgroundImage: `url(${w.thumbnail})` }} />
              <div className="body">
                <div className="tagrow">{w.year && <span className="tag">{w.year}</span>}{w.stack && w.stack.split(",").slice(0, 2).map((s) => <span className="tag" key={s}>{s.trim()}</span>)}</div>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
              </div>
            </Spot>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
