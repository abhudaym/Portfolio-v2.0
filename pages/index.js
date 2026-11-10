import Head from "next/head";
import NextLink from "next/link";
import Figure, { Facts } from "../components/Figure";
import { getExperiences, getPublishedBlogs } from "../lib/sanity";
import { SITE, EXPERIENCE, EDUCATION, prettyPeriod, fmtDate } from "../lib/site";
import { CASE_STUDIES } from "../lib/caseStudies";
import { enhancementFor } from "../lib/enhancements";

const Sec = ({ n, title, id, children }) => (
  <section className="sec" id={id}>
    <h2><span className="accent">§{n}</span>&ensp;{title}</h2>
    {children}
  </section>
);

export default function Home({ experiences, posts }) {
  const exp = experiences.length ? experiences : EXPERIENCE;
  const featured = CASE_STUDIES.filter((c) => c.featured);
  const rest = CASE_STUDIES.filter((c) => !c.featured);

  return (
    <>
      <Head><title>{SITE.name}</title></Head>

      <section className="row">
        <div className="col letter">
          <h1 className="lede">Hello,</h1>
          <p>
            I build data pipelines and RAG systems for power utilities at AiDash. One ingests 320k+ records an hour. Another answers
            questions for 100+ tenants. I write about <s>everything</s> what breaks in between.
          </p>
          <p>
            This page was typed at {SITE.bestWpm} WPM with <s>no</s> few mistakes. <NextLink href="/type">Race me</NextLink>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
        <aside className="margin grey">
          <p><span className="sc accent">Now</span><br />{SITE.now}</p>
        </aside>
      </section>

      <Sec n={1} title="Selected work" id="work">
        {featured.map((c, i) => (
          <article className="row work" key={c.id}>
            <div className="col">
              <h3><NextLink href={"/works/" + c.id}>{c.title} <i>{c.kind}</i></NextLink></h3>
              <p>{c.summary}</p>
              <Figure n={i + 1} steps={c.steps} caption={c.caption} />
              <NextLink href={"/works/" + c.id} className="more">Read the case study {"->"}</NextLink>
            </div>
            <Facts items={c.facts} />
          </article>
        ))}
        <div className="list">
          {rest.map((c) => (
            <div className="entry" key={c.id}>
              <span className="d">{c.period}</span>
              <span className="t"><NextLink href={"/works/" + c.id}>{c.title}</NextLink></span>
              <span className="n">{c.facts[0].k}: {c.facts[0].v}</span>
            </div>
          ))}
        </div>
        <NextLink href="/works" className="more" style={{ marginTop: -16 }}>All work, including the old side projects {"->"}</NextLink>
      </Sec>

      {posts.length > 0 && (
        <Sec n={2} title="Writing" id="writing">
          <div className="list">
            {posts.map((b) => (
              <div className="entry" key={b.slug}>
                <span className="d">{fmtDate(b.date)}</span>
                <span className="t"><NextLink href={"/blogs/" + b.slug}>{b.title}</NextLink></span>
                <span className="n">{b.note}</span>
              </div>
            ))}
          </div>
        </Sec>
      )}

      <Sec n={posts.length > 0 ? 3 : 2} title="Record" id="record">
        <div className="list plain">
          {exp.map((e) => (
            <div className="entry two" key={e._id}>
              <span className="d">{prettyPeriod(e.period)}</span>
              <span className="t">{e.role}, {e.companyUrl ? <a href={e.companyUrl} target="_blank" rel="noreferrer">{e.company}</a> : e.company}</span>
            </div>
          ))}
          <div className="entry two">
            <span className="d">{prettyPeriod(EDUCATION.period)}</span>
            <span className="t">{EDUCATION.what}, {EDUCATION.where}<small>{EDUCATION.note}</small></span>
          </div>
        </div>
        <p className="measure grey" style={{ marginTop: -12 }}>{SITE.tools}</p>
      </Sec>
    </>
  );
}

export async function getStaticProps() {
  const [experiences, blogs] = await Promise.all([getExperiences(), getPublishedBlogs()]);
  const posts = blogs.slice(0, 5).map((b) => {
    const badges = b.badges && b.badges.length ? b.badges : (enhancementFor(b.title) || {}).badges || [];
    return { slug: b.slug, title: b.title, date: b.date || null, note: badges.map((x) => x.label).join(", ") };
  });
  return { props: { experiences: experiences || [], posts }, revalidate: 60 };
}
