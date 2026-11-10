import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { NAV, SITE, SOCIALS } from "../lib/site";
import { track } from "../lib/track";

export default function Shell({ children }) {
  const router = useRouter();
  const active = (href) => router.asPath === href || router.asPath.startsWith(href + "/");

  return (
    <div className="page">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{SITE.name}</title>
        <meta name="description" content={SITE.description} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:type" content="website" />
      </Head>
      <header className="masthead">
        <NextLink href="/" className="name">{SITE.name}</NextLink>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <NextLink key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>{n.label}</NextLink>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="colophon">
        <p className="measure">
          {SITE.offClock} <NextLink href="/type">Typing test</NextLink>, if you think you&apos;re faster.
        </p>
        <nav aria-label="Contact">
          <a href={"mailto:" + SITE.email} onClick={() => track("email_click")}>{SITE.email}</a>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={() => track("social_click", { site: s.label })}>{s.label}</a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
