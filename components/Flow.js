import { useEffect, useRef, useState } from "react";

/*
  Animated flow diagram written as plain text in Sanity markdown:

  ```flow
  Ingestion (once per document)
  Documents -> Parser (turns PDFs into text) -> Chunker -> Embedder -> Vector store

  Query (every question)
  Question -> Embedder -> Vector search -> Top-k chunks -> LLM -> Answer + citations
  ```

  - A line with "->" is a row of steps. A line without one is the title of the next row.
  - "Step (note)" adds a note that shows when the step is tapped or hovered.
*/
export function parseFlow(src) {
  const groups = [];
  let title = null;
  src.split("\n").map((l) => l.trim()).forEach((line) => {
    if (!line) return;
    if (line.includes("->")) {
      const steps = line.split("->").map((s) => s.trim()).filter(Boolean).map((s) => {
        const m = /^(.*?)\s*\((.+)\)\s*$/.exec(s);
        return m ? { name: m[1], note: m[2] } : { name: s, note: "" };
      });
      groups.push({ title, steps });
      title = null;
    } else {
      title = line;
    }
  });
  return groups;
}

const STEP = 700; // ms a packet spends on each hop

function Row({ group, gi, play }) {
  const [sel, setSel] = useState(null);
  const [at, setAt] = useState(-1);
  const [brk, setBrk] = useState([]);
  const cells = useRef([]);
  const n = group.steps.length;

  // hide the arrow after a step when the next step wrapped onto a new line
  useEffect(() => {
    const measure = () => {
      const c = cells.current;
      const out = [];
      for (let i = 0; i < n - 1; i++) if (c[i] && c[i + 1] && c[i + 1].offsetTop > c[i].offsetTop + 4 && c[i + 1].offsetLeft < c[i].offsetLeft) out.push(i);
      setBrk((prev) => (prev.join() === out.join() ? prev : out));
    };
    measure();
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro && cells.current[0] && ro.observe(cells.current[0].parentNode);
    return () => ro && ro.disconnect();
  }, [n]);
  const note = sel !== null ? group.steps[sel] : null;

  useEffect(() => {
    if (!play || matchMedia("(prefers-reduced-motion: reduce)").matches) { setAt(-1); return; }
    let t = -1 - gi; // offset each row a little
    const id = setInterval(() => { t = t >= n + 1 ? -1 : t + 1; setAt(t); }, STEP);
    return () => clearInterval(id);
  }, [play, n, gi]);

  return (
    <div className="flow-group" style={{ "--step": STEP + "ms" }}>
      {group.title && <div className="flow-title">{group.title}</div>}
      <div className="flow-row">
        {group.steps.map((s, i) => (
          <div className="flow-cell" key={i} ref={(el) => (cells.current[i] = el)}>
            <button
              type="button"
              className={"flow-node" + (sel === i ? " sel" : "") + (s.note ? " has-note" : "") + (at === i ? " hit" : "")}
              onClick={() => setSel(sel === i ? null : i)}
              onMouseEnter={() => s.note && setSel(i)}
              aria-pressed={sel === i}
            >
              <span className="flow-i">{String(i + 1).padStart(2, "0")}</span>
              {s.name}
            </button>
            {i < n - 1 && (
              <div className={"flow-link" + (brk.includes(i) ? " brk" : "")} aria-hidden="true">
                {at === i && !brk.includes(i) && <i key={"p" + i} />}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flow-note" aria-live="polite">
        {note ? <><b>{note.name}</b> {note.note || ""}</> : group.steps.some((s) => s.note) ? "Tap a step for details." : ""}
      </div>
    </div>
  );
}

export default function Flow({ source }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  const groups = parseFlow(source || "");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setPlay(true); return; }
    const io = new IntersectionObserver((en) => setPlay(en[0].isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!groups.length) return null;
  return (
    <figure className={"flow" + (play ? " play" : "")} ref={ref}>
      {groups.map((g, i) => <Row key={i} group={g} gi={i} play={play} />)}
      <figcaption className="sr">{groups.map((g) => (g.title ? g.title + ": " : "") + g.steps.map((s) => s.name).join(", then ")).join(". ")}</figcaption>
    </figure>
  );
}
