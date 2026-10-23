import { useEffect, useRef, useState } from "react";
import { track } from "../../lib/track";

const POOL = {
  cw: ["INFO  GET /health 200 4ms", "INFO  order.created id=88213", "WARN  slow response 812ms /api/orders", "INFO  cache hit ratio 0.93", "INFO  GET /api/risk 200 61ms", "INFO  worker heartbeat ok"],
  pg: ["LOG   checkpoint complete", "LOG   duration: 3.2 ms  SELECT ...", "LOG   autovacuum: orders", "LOG   connection authorized", "LOG   duration: 8.7 ms  UPDATE ..."],
  kf: ["INFO  group ingest lag=12", "INFO  partition 3 offset committed", "INFO  rebalance not required", "INFO  produced batch size=500", "INFO  group risk lag=3"],
};
const NAMES = { cw: "CloudWatch", pg: "PostgreSQL", kf: "Kafka" };
const ts = () => { const d = new Date(), z = (n) => ("0" + n).slice(-2); return z(d.getHours()) + ":" + z(d.getMinutes()) + ":" + z(d.getSeconds()); };
let uid = 0;
const mk = (txt, rel) => ({ id: ++uid, txt: ts() + " " + txt, rel, cls: /^ERROR/.test(txt) ? "err" : /^WARN/.test(txt) ? "warn" : "" });

export default function RcaDemo() {
  const [logs, setLogs] = useState({ cw: [], pg: [], kf: [] });
  const [off, setOff] = useState({});
  const [out, setOut] = useState(null);
  const [busy, setBusy] = useState(false);
  const rootRef = useRef(null);
  const visible = useRef(false);
  const timers = useRef([]);

  const add = (src, line) => setLogs((l) => ({ ...l, [src]: [...l[src], line].slice(-16) }));
  const noise = () => ["cw", "pg", "kf"].forEach((s) => { if (Math.random() < (s === "kf" ? 0.55 : 0.8)) { const p = POOL[s]; add(s, mk(p[(Math.random() * p.length) | 0])); } });

  useEffect(() => {
    for (let i = 0; i < 10; i++) noise();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((en) => { visible.current = en[0].isIntersecting; }, { threshold: 0.05 });
    io.observe(rootRef.current);
    const tick = reduce ? null : setInterval(() => { if (!document.hidden && visible.current) noise(); }, 520);
    return () => { io.disconnect(); tick && clearInterval(tick); timers.current.forEach(clearTimeout); };
  }, []); // eslint-disable-line

  const say = (node) => setOut((o) => [...(o || []), node]);
  const run = () => {
    if (busy) return;
    track("rca_demo_run");
    setBusy(true); setOut([]); setOff({});
    setLogs((l) => Object.fromEntries(Object.entries(l).map(([k, v]) => [k, v.map((x) => ({ ...x, rel: false }))])));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, f = reduce ? 0.25 : 1;
    const q = [
      [0, () => { add("cw", mk("ERROR NullPointerException: customer is null at OrderService.java:142", true)); say(<><span className="p">▸ error received</span> NullPointerException @ OrderService:142{"\n"}</>); }],
      [1100, () => say(<><span className="p">▸ agent</span> picking sources for this error…{"\n"}</>)],
      [2200, () => { say(<>  CloudWatch  <span className="g">✓ relevant</span>{"\n"}  PostgreSQL  <span className="g">✓ relevant</span>{"\n"}  Kafka       <span className="d">✗ skipped (no link to this error)</span>{"\n"}</>); setOff({ kf: true }); }],
      [3200, () => { add("pg", mk("ERROR lock wait timeout on relation orders (migration 0142 holding lock)", true)); add("pg", mk("WARN  statement timeout: customer_id write skipped", true)); }],
      [4100, () => say(<><span className="p">▸ cluster</span> 3 related events across 2 sources{"\n"}</>)],
      [5000, () => say(<><span className="p">▸ root cause (probable)</span> migration 0142 held a lock on orders, so writes timed out and the customer was never set. The later read hit null.{"\n"}</>)],
      [6100, () => say(<><span className="p">▸ suggested fix</span> run the migration off-peak, add a null guard, retry the failed writes.{"\n"}</>)],
      [7000, () => { say(<><span className="g">✔ done</span> <span className="d">2 of 3 sources queried · simulated, not real logs</span></>); setBusy(false); }],
    ];
    timers.current = q.map(([t, fn]) => setTimeout(fn, t * f));
  };

  return (
    <div className="rca" ref={rootRef}>
      <div className="rhd"><span>Live demo · simulated incident · no real logs</span><button className="btn" type="button" onClick={run} disabled={busy}>{busy ? "Analysing…" : out ? "↻ Run again" : "▶ Run RCA"}</button></div>
      <div className="cols">
        {Object.keys(NAMES).map((s) => (
          <div key={s} className={"col" + (off[s] ? " off" : "")}>
            <h4><span>{NAMES[s]}</span><b>{off[s] ? "skipped" : ""}</b></h4>
            <div className="lines">{logs[s].map((l) => <div key={l.id} className={[l.cls, l.rel ? "rel" : ""].join(" ").trim()}>{l.txt}</div>)}</div>
          </div>
        ))}
      </div>
      <pre className="rout">{out ? out : <span className="d">Logs are scattered across systems. Press Run RCA to see what an AI-assisted root cause analysis does with one error.</span>}</pre>
    </div>
  );
}
