import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Markdown from "../../components/Markdown";
import { getPublishedBlogs, getBlogBySlug } from "../../lib/sanity";
import { enhancementFor } from "../../lib/enhancements";
import { extractToc, readMinutes } from "../../lib/md";
import { fmtDate } from "../../lib/site";
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
  const content = data.content || "";
  return {
    props: {
      fm: {
        ...fm,
        badges: fm.badges && fm.badges.length ? fm.badges : e.badges || [],
        stats: fm.stats && fm.stats.length ? fm.stats : e.stats || [],
        readTime: fm.readTime || readMinutes(content),
      },
      content,
      toc: extractToc(content),
    },
    revalidate: 60,
  };
}

export default function Post({ fm, content, toc }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sent = {};
    const on = () => {
      const h = document.documentElement, max = h.scrollHeight - innerHeight;
      const pct = max > 0 ? (scrollY / max) * 100 : 0;
      [50, 90].forEach((m) => { if (pct >= m && !sent[m]) { sent[m] = true; track("post_read_" + m, { post: fm.title }); } });
      let best = null;
      toc.forEach((t) => { const el = document.getElementById(t.id); if (el && el.getBoundingClientRect().top < innerHeight * 0.35) best = t.id; });
      setActive(best);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [fm.title, toc]);

  const body = useMemo(() => <Markdown>{content}</Markdown>, [content]);
  const meta = [fmtDate(fm.date), fm.readTime + " min read", ...fm.badges.map((b) => b.label)].filter(Boolean).join(" · ");
  const hasMargin = fm.stats.length > 0 || toc.length > 0;

  return (
    <>
      <Head>
        <title>{fm.title + " - Abhuday Mishra"}</title>
        <meta name="description" content={fm.description} />
        <meta property="og:title" content={fm.title} />
        {fm.image && <meta property="og:image" content={fm.image} />}
      </Head>
      <header className="col">
        <NextLink href="/blogs" className="back">{"<-"} All writing</NextLink>
        <p className="mono grey" style={{ maxWidth: "none" }}>{meta}</p>
        <h1 className="title" style={{ maxWidth: "22em" }}>{fm.title}</h1>
        {fm.description && <p className="sub">{fm.description}</p>}
      </header>
      <div className="row" style={{ marginTop: -24 }}>
        {hasMargin && (
          <aside className="margin first sticky">
            {fm.stats.length > 0 && (
              <dl className="col" style={{ gap: 12 }}>
                {fm.stats.map((s) => (
                  <div key={s.label}><dt>{s.label}</dt><dd className="mono">{s.to != null ? s.to + (s.suf || "") : s.text}</dd></div>
                ))}
              </dl>
            )}
            {toc.length > 0 && (
              <nav className="toc" aria-label="On this page">
                <span className="sc grey">Contents</span>
                {toc.map((t) => <a key={t.id} href={"#" + t.id} className={active === t.id ? "on" : ""}>{t.text}</a>)}
              </nav>
            )}
          </aside>
        )}
        <article className="col" style={{ gap: 28 }}>
          {fm.image && <img src={fm.image} alt="" style={{ width: "100%", border: "1px solid var(--rule)" }} />}
          {body}
          <NextLink href="/blogs" className="back">{"<-"} All writing</NextLink>
        </article>
      </div>
    </>
  );
}
