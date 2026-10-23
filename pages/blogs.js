import { useMemo, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Reveal from "../components/Reveal";
import RcaDemo from "../components/demos/RcaDemo";
import { track } from "../components/Spot";
import { getPublishedBlogs } from "../lib/sanity";
import { enhancementFor } from "../lib/enhancements";

export async function getStaticProps() {
  const blogs = (await getPublishedBlogs()).map((b) => {
    const e = enhancementFor(b.title) || {};
    return {
      ...b,
      tags: b.tags && b.tags.length ? b.tags : e.tags || [],
      badges: b.badges && b.badges.length ? b.badges : e.badges || [],
      stats: b.stats && b.stats.length ? b.stats : e.stats || [],
    };
  });
  return { props: { blogs }, revalidate: 60 };
}

const fmt = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "");

export default function Blogs({ blogs }) {
  const [tag, setTag] = useState(null);
  const tags = useMemo(() => [...new Set(blogs.flatMap((b) => b.tags))], [blogs]);
  const list = blogs.filter((b) => !tag || b.tags.includes(tag));
  const hasDemo = blogs.some((b) => /rca/i.test(b.title));

  return (
    <div className="wrap">
      <Head><title>Blogs - Abhuday Mishra</title></Head>
      <div className="bh">
        <div className="k" style={{ color: "var(--pink)" }}>Blogs · incident reports</div>
        <h1>The unglamorous reality of AI in production.</h1>
        <p>Evaluation, failure modes, and the decisions that move outcomes. Filed like postmortems, because that&apos;s what they are.</p>
      </div>

      {hasDemo && <RcaDemo />}

      <div className="filters">
        <span className="sec-h">Reports · {blogs.length} filed</span>
        {tags.length > 0 && <button type="button" aria-pressed={!tag} onClick={() => setTag(null)}>All</button>}
        {tags.map((t) => <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>{t}</button>)}
      </div>

      {blogs.length === 0 && <div className="slot">No reports yet. Publish one in Sanity and it shows up here within a minute.</div>}

      <div className="reports">
        {list.map((b) => (
          <Reveal key={b.id}>
            <NextLink href={"/blogs/" + b.slug} className="report" onPointerMove={track}>
              <div className="tagrow">
                <span className="tag ok">Resolved</span>
                {b.date && <span className="tag">{fmt(b.date)}</span>}
                {b.readTime && <span className="tag">{b.readTime} min</span>}
                {b.badges.map((x) => <span key={x.label} className={"tag " + (x.kind || "win")}>{x.label}</span>)}
              </div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              {b.stats.filter((s) => s.to).length > 0 && (
                <div className="mets">{b.stats.filter((s) => s.to).slice(0, 3).map((s) => <div key={s.label}><b>{s.to}{s.suf}</b>{s.label}</div>)}</div>
              )}
              {b.tags.length > 0 && <div className="tagrow" style={{ marginBottom: 14 }}>{b.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>}
              <span className="go">Read the report →</span>
            </NextLink>
          </Reveal>
        ))}
      </div>
      <div className="slot" style={{ marginTop: 14 }}>next incident: not filed yet</div>
    </div>
  );
}
