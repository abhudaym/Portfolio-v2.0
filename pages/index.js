import Head from "next/head";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import NextLink from "next/link";
import PipelineHero from "../components/PipelineHero";
import Reveal from "../components/Reveal";
import Timeline from "../components/Timeline";
import Spot from "../components/Spot";
import { getProfile, getExperiences, getSkills, getVolunteer, getPublishedWorks, getPublishedBlogs } from "../lib/sanity";
import { SITE, ABOUT, EXPERIENCE, VOLUNTEER, SKILLS, INTERESTS, SOCIALS } from "../lib/site";
import { LEGACY_WORKS } from "../lib/legacyWorks";
import { enhancementFor } from "../lib/enhancements";
import { track } from "../lib/track";

export default function Home({ profile, experiences, skills, volunteer, works, latest }) {
  const p = profile || {};
  const exp = experiences && experiences.length ? experiences : EXPERIENCE;
  const vol = volunteer && volunteer.length ? volunteer : VOLUNTEER;
  const sk = skills && skills.length ? skills : SKILLS;
  const love = p.interests && p.interests.length ? p.interests : INTERESTS;
  const socials = p.socials && p.socials.length ? p.socials : SOCIALS;
  const email = p.email || SITE.email;
  const target = p.typingChallenge || SITE.typingChallenge;

  return (
    <>
      <Head><title>{SITE.name}</title></Head>
      <PipelineHero
        kicker={p.kicker || SITE.kicker}
        name={SITE.name}
        tagline={p.tagline || SITE.tagline}
        now={p.now || SITE.now}
        target={target}
        bestWpm={p.bestWpm || SITE.bestWpm}
        rate={p.heroRate || SITE.heroRate}
        lines={p.heroLines && p.heroLines.length ? p.heroLines : SITE.heroLines}
      />

      <Reveal as="section" className="s" id="work">
        <h2>Work</h2>
        {p.about ? (
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{p.about}</Markdown>
        ) : (
          ABOUT.map((t, i) => <p key={i}>{t}</p>)
        )}
        <div className="work-teasers">
          {works.map((w) => (
            <Spot key={w.id} href={"/works/" + w.id}>
              <div className="thumb" style={{ backgroundImage: `url(${w.thumbnail})` }} />
              <div className="body"><span className="tag">{w.stack ? w.stack.split(",")[0] : "project"}</span><h3>{w.title}</h3><p>{w.description}</p></div>
            </Spot>
          ))}
        </div>
        <p style={{ marginTop: 18 }}><NextLink href="/works" className="go mono">All works →</NextLink></p>
      </Reveal>

      {latest && (
        <Reveal as="section" className="s" id="latest">
          <h2>Latest report</h2>
          <NextLink href={"/blogs/" + latest.slug} className="report" onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px"); e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px"); }}>
            <div className="tagrow">{latest.date && <span className="tag">{new Date(latest.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>}{(latest.badges || []).map((b) => <span key={b.label} className={"tag " + (b.kind || "win")}>{b.label}</span>)}</div>
            <h3>{latest.title}</h3>
            <p>{latest.description}</p>
            <span className="go">Read the report →</span>
          </NextLink>
        </Reveal>
      )}

      <Reveal as="section" className="s" id="experience">
        <h2>Experience</h2>
        <Timeline items={exp} />
      </Reveal>

      <Reveal as="section" className="s" id="skills">
        <h2>Skills</h2>
        <div className="chips">{sk.map((s) => <span className="chip" key={s._id}>{s.name}</span>)}</div>
      </Reveal>

      <Reveal as="section" className="s" id="volunteer">
        <h2>Volunteer Experience</h2>
        <Timeline items={vol} />
      </Reveal>

      <Reveal as="section" className="s love" id="love">
        <h2>I ❤</h2>
        <div className="chips">{love.map((i) => <span className="chip" key={i.label}>{i.label}{i.note ? " · " + i.note : ""}</span>)}</div>
      </Reveal>

      <Reveal as="section" className="s" id="web">
        <h2>On the web</h2>
        <div className="rows">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={() => track("social_click", { site: s.label })}><small>{s.kind}</small>{s.label} <span className="aside">{s.handle}</span></a>
          ))}
        </div>
        <p className="mail">Get in touch › <a href={"mailto:" + email} onClick={() => track("email_click", { from: "home" })}>{email}</a></p>
      </Reveal>
    </>
  );
}

export async function getStaticProps() {
  const [profile, experiences, skills, volunteer, sanityWorks, blogs] = await Promise.all([
    getProfile(), getExperiences(), getSkills(), getVolunteer(), getPublishedWorks(), getPublishedBlogs(),
  ]);
  const works = [...sanityWorks, ...LEGACY_WORKS.filter((l) => !sanityWorks.some((w) => w.id === l.id))].slice(0, 3);
  const feat = blogs.find((b) => b.featured) || blogs[0] || null;
  return {
    props: {
      profile: profile || null,
      experiences: experiences || [],
      skills: skills || [],
      volunteer: volunteer || [],
      works: works.map((w) => ({ id: w.id, title: w.title, description: w.description || "", stack: w.stack || "", thumbnail: w.thumbnail })),
      latest: feat ? { slug: feat.slug, title: feat.title, description: feat.description, date: feat.date || null, badges: (feat.badges && feat.badges.length ? feat.badges : (enhancementFor(feat.title) || {}).badges || []) } : null,
    },
    revalidate: 60,
  };
}
