import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function Timeline({ items }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const on = () => {
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.6 - r.top) / r.height;
      setH(Math.max(0, Math.min(1, p)) * 100);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [items]);
  return (
    <div className="tl" ref={ref}>
      <div className="fill" style={{ height: h + "%" }} />
      {items.map((it, i) => (
        <Reveal key={it._id || i} className={"it" + (it.current || i === 0 ? " now" : "")}>
          <div className="d">{(it.period || "").toUpperCase()}</div>
          <div className="r">
            {it.role} {it.company ? "at " : it.org ? "at " : ""}
            <b>{it.companyUrl ? <a href={it.companyUrl} target="_blank" rel="noreferrer">{it.company}</a> : it.company || it.org}</b>
            {it.location && <span className="loc"> · {it.location}</span>}
          </div>
          {it.highlights && it.highlights.length > 0 && <ul>{it.highlights.map((x, k) => <li key={k}>{x}</li>)}</ul>}
        </Reveal>
      ))}
    </div>
  );
}
