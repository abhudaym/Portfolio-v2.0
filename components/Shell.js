import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { NAV, SITE } from "../lib/site";
import useTheme from "./useTheme";
import CommandPalette from "./CommandPalette";
import { track } from "../lib/track";

export default function Shell({ children }) {
  const router = useRouter();
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test((e.target && e.target.tagName) || "");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => { if (!o) track("palette_open"); return !o; }); }
      else if (e.key === "/" && !typing) { e.preventDefault(); track("palette_open"); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const bar = document.getElementById("scrollbar");
    const on = () => {
      const h = document.documentElement, max = h.scrollHeight - innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (scrollY / max) * 100) : 0) + "%";
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [router.asPath]);

  const active = (href) => (href === "/" ? router.pathname === "/" : router.asPath.startsWith(href));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{SITE.name}</title>
        <meta name="description" content={SITE.tagline} />
      </Head>
      <div id="scrollbar" aria-hidden="true" />
      <nav className="nav" aria-label="Main">
        <NextLink href="/" className="brand"><i />{SITE.name}</NextLink>
        <div className="links">
          {NAV.filter((n) => n.href !== "/").map((n) => (
            <NextLink key={n.href} href={n.href} className={"l" + (active(n.href) ? " on" : "")}>{n.label}</NextLink>
          ))}
          <button type="button" className="kbd-btn" onClick={() => { track("palette_open"); setOpen(true); }} aria-label="Open command palette">
            <span>search</span><kbd>⌘K</kbd>
          </button>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title={"Theme: " + theme}>
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>
      </nav>
      <main key={router.asPath} className="page-in">{children}</main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>press <b>/</b> or ⌘K to jump anywhere</span>
      </footer>
      <CommandPalette open={open} onClose={close} toggleTheme={toggleTheme} />
    </>
  );
}
