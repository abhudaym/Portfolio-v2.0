import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { NAV, SITE } from "../lib/site";

const score = (q, t) => {
  q = q.toLowerCase(); t = t.toLowerCase();
  if (!q) return 1;
  if (t.includes(q)) return 100 - t.indexOf(q);
  let i = 0, s = 0;
  for (const c of t) { if (c === q[i]) { i++; s++; } }
  return i === q.length ? s : 0;
};

export default function CommandPalette({ open, onClose, toggleTheme, email }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [remote, setRemote] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    setTimeout(() => input.current && input.current.focus(), 10);
    if (remote === null) {
      fetch("/api/search").then((r) => r.json()).then(setRemote).catch(() => setRemote([]));
    }
  }, [open]); // eslint-disable-line

  const go = useCallback((href) => { onClose(); router.push(href); }, [onClose, router]);

  const items = useMemo(() => {
    const base = [
      ...NAV.map((n) => ({ t: "Go to " + n.label, k: "page", run: () => go(n.href) })),
      { t: "Toggle light / dark theme", k: "action", run: () => { toggleTheme(); onClose(); } },
      { t: "Take the typing test", k: "action", run: () => { go("/"); setTimeout(() => { const i = document.getElementById("inp"); i && i.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }, 400); } },
      { t: "Copy email address", k: "action", run: () => { try { navigator.clipboard.writeText(email || SITE.email); } catch (e) {} onClose(); } },
      { t: "sudo hire abhuday", k: "easter egg", run: () => { window.location.href = "mailto:" + (email || SITE.email) + "?subject=" + encodeURIComponent("Let's talk (sudo)"); onClose(); } },
    ];
    const rem = (remote || []).map((r) => ({ t: r.title, k: r.type, run: () => go(r.href) }));
    return [...base, ...rem].map((i) => ({ ...i, s: score(q, i.t) })).filter((i) => i.s > 0).sort((a, b) => b.s - a.s).slice(0, 30);
  }, [q, remote, go, toggleTheme, onClose, email]);

  useEffect(() => setSel(0), [q]);

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(items.length - 1, s + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === "Enter" && items[sel]) items[sel].run();
  };

  if (!open) return null;
  return (
    <div className="pal-back" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="pal" onMouseDown={(e) => e.stopPropagation()}>
        <input ref={input} autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Jump to a page, post or action..." aria-label="Search" />
        <ul>
          {items.map((it, i) => (
            <li key={it.k + it.t} className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={it.run}>
              <span>{it.t}</span><small>{it.k}</small>
            </li>
          ))}
        </ul>
        {!items.length && <div className="empty">Nothing matches. Try &quot;rca&quot; or &quot;resume&quot;.</div>}
        <div className="foot"><span>↑↓ move</span><span>↵ open</span><span>esc close</span></div>
      </div>
    </div>
  );
}
