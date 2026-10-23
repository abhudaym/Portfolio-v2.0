import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Markdown from "../../components/Markdown";
import CountUp from "../../components/CountUp";
import { getPublishedBlogs, getBlogBySlug } from "../../lib/sanity";
import { enhancementFor } from "../../lib/enhancements";
import { extractToc, injectDemos, readMinutes } from "../../lib/md";
import { track } from "../../lib/track";

export async function getStaticPaths() {
  const blogs = await getPublishedBlogs();
  return { paths: blogs.map((b) => ({ params: { id: b.slug } })), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await getBlogBySlug(params.id);
  if (!data) return { notFound: true };
  const fm = data.frontMatter;
  const e = enhancementFor(fm.title) || {};
  let content = data.content || "";
  // only add bridge demos if the author hasn't placed any ```demo block themselves
  if (e.inject && !/```demo/.test(content)) content = injectDemos(content, e.inject);
  return {
    props: {
      fm: {
        ...fm,
        tags: fm.tags && fm.tags.length ? fm.tags : e.tags || [],
        badges: fm.badges && fm.badges.length ? fm.badges : e.badges || [],
        stats: fm.stats && fm.stats.length ? fm.stats : e.stats || [],
        readTime: fm.readTime || readMinutes(data.content || ""),
      },
      content,
      toc: extractToc(content),
    },
    revalidate: 60,
  };
}

const fmt = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "");

export default function Post({ fm, content, toc }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sent = {};
    const on = () => {
      const h = document.documentElement, max = h.scrollHeight - innerHeight;
      const pct = max > 0 ? scrollY / max : 0;
      [50, 90].forEach((m) => { if (pct * 100 >= m && !sent[m]) { sent[m] = true; track("post_read_" + m, { post: fm.title }); } });
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [fm.title]);

  useEffect(() => {
    const on = () => {
      let best = null;
      toc.forEach((t) => { const el = document.getElementById(t.id); if (el && el.getBoundingClientRect().top < innerHeight * 0.35) best = t.id; });
      setActive(best);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [toc]);

  const body = useMemo(() => <Markdown>{content}</Markdown>, [content]);

  return (
    <div className="post">
      <Head>
        <title>{fm.title} - Abhuday Mishra</title>
        <meta name="description" content={fm.description} />
        {fm.image && <meta property="og:image" content={fm.image} />}
      </Head>
      <article>
        <NextLink href="/blogs" className="back">← All reports</NextLink>
        <div className="tagrow">
          <span className="tag ok">Resolved</span>
          {fm.date && <span className="tag">{fmt(fm.date)}</span>}
          <span className="tag">{fm.readTime} min read</span>
          {fm.badges.map((b) => <span key={b.label} className={"tag " + (b.kind || "win")}>{b.label}</span>)}
        </div>
        <h1>{fm.title}</h1>
        {fm.description && <p className="sub">{fm.description}</p>}
        {fm.stats.length > 0 && (
          <div className="stats4">
            {fm.stats.map((s) => (
              <div key={s.label}>
                {s.to ? <CountUp to={s.to} suf={s.suf || ""} /> : <b>{s.text}</b>}
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {fm.image && <img src={fm.image} alt="" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--line)", margin: "22px 0 0" }} />}
        {body}
        <p style={{ marginTop: 40 }}><NextLink href="/blogs" className="back">← All reports</NextLink></p>
      </article>
      {toc.length > 0 && (
        <nav className="toc" aria-label="On this page">
          {toc.map((t) => <a key={t.id} href={"#" + t.id} className={active === t.id ? "on" : ""}>{t.text}</a>)}
        </nav>
      )}
    </div>
  );
}
