import Head from "next/head";
import NextLink from "next/link";
import { getPublishedBlogs } from "../lib/sanity";
import { enhancementFor } from "../lib/enhancements";
import { fmtDate } from "../lib/site";

export async function getStaticProps() {
  const posts = (await getPublishedBlogs()).map((b) => {
    const badges = b.badges && b.badges.length ? b.badges : (enhancementFor(b.title) || {}).badges || [];
    return { slug: b.slug, title: b.title, description: b.description, date: b.date || null, note: badges.map((x) => x.label).join(", ") };
  });
  return { props: { posts }, revalidate: 60 };
}

export default function Blogs({ posts }) {
  return (
    <>
      <Head><title>Writing - Abhuday Mishra</title></Head>
      <header className="col">
        <h1 className="title">Writing</h1>
        <p className="sub">Notes from building AI systems in production: what I measured, what failed, and what I would do differently.</p>
      </header>
      <div className="list" style={{ borderTop: "1px solid var(--ink)" }}>
        {posts.length === 0 && <p className="grey" style={{ padding: "12px 0" }}>Nothing published yet.</p>}
        {posts.map((b) => (
          <div className="entry" key={b.slug}>
            <span className="d">{fmtDate(b.date)}</span>
            <span className="t"><NextLink href={"/blogs/" + b.slug}>{b.title}</NextLink>{b.description && <small>{b.description}</small>}</span>
            <span className="n">{b.note}</span>
          </div>
        ))}
      </div>
    </>
  );
}
