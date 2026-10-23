import { useEffect, useRef, useState } from "react";
import { track } from "../lib/track";

const LANES = [
  { label: "CRIS 2.0 · ingestion", color: "teal", rate: 13, failAt: 3, nodes: [
    { n: "Sources", d: "Records arrive from many places, in many shapes." },
    { n: "Validate", d: "Bad records get caught before they cost anything downstream." },
    { n: "Normalise", d: "One clean shape per tenant, so everything after stays simple." },
    { n: "Score", d: "Climate-risk models run on the cleaned records. Sometimes this step fails, and the record gets retried." },
    { n: "Serve", d: "Results land where enterprise clients can use them." },
  ] },
  { label: "WMP Copilot · RAG", color: "pink", rate: 6, failAt: 2, nodes: [
    { n: "Documents", d: "Wildfire mitigation plans, one set per tenant." },
    { n: "Chunk", d: "Split into pieces that still make sense on their own." },
    { n: "Embed", d: "Turned into vectors. A call that can fail, so it gets retried." },
    { n: "Retrieve", d: "Finds the passages that matter for the question." },
    { n: "Answer", d: "Grounded in the retrieved passages." },
  ] },
];

export default function PipelineHero({ kicker, name, tagline, now, target, bestWpm = 130, rate = 88.9, lines = [] }) {
  const heroRef = useRef(null), cvRef = useRef(null), titleRef = useRef(null), termRef = useRef(null);
  const tipRef = useRef(null), cntRef = useRef(null), retRef = useRef(null), inpRef = useRef(null);
  const sim = useRef(null);
  const typing = useRef({ started: 0, keys: 0, errs: 0, prev: 0 });
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null); // {w, acc}
  const [live, setLive] = useState(null);
  const [bars, setBars] = useState(false);

  /* ---------- simulation ---------- */
  useEffect(() => {
    const cv = cvRef.current, hero = heroRef.current, title = titleRef.current, term = termRef.current, tip = tipRef.current;
    const ctx = cv.getContext("2d");
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, col = {}, tenant = [];
    const P = [], pulses = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], ripples = [];
    const mouse = { x: -999, y: -999, on: false };
    let retries = 0, extra = 0, hot = null, running = true, raf = 0, destroyed = false;
    const acc = [0, 0];
    const t0 = performance.now();
    let lastT = t0, lastUi = 0;

    const readColors = () => {
      const s = getComputedStyle(root), g = (n) => s.getPropertyValue(n).trim();
      col = { teal: g("--teal"), pink: g("--pink"), amber: g("--amber"), red: g("--red"), ink: g("--ink"), muted: g("--muted"), line: g("--line"), node: g("--node"), glow: g("--glow") === "1" };
      tenant = [col.pink, "#a78bfa", col.teal, col.amber, "#60a5fa", "#f472b6"];
    };
    const layout = () => {
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const top = title.offsetHeight + 14, bot = term.offsetHeight + 34, free = Math.max(160, H - top - bot);
      const ys = [top + free * 0.3, top + free * 0.72], pad = Math.max(28, W * 0.07), span = W - pad * 2;
      LANES.forEach((L, i) => { L.y = ys[i]; L.nodes.forEach((nd, k) => { nd.x = pad + (span * k) / 4; nd.y = L.y; }); });
    };
    const spawn = (li, opt = {}) => {
      P.push({ li, s: opt.s || 0, v: (0.34 + Math.random() * 0.22) * (reduce ? 0.4 : 1), dy: (Math.random() - 0.5) * 20, ox: 0, oy: 0,
        c: opt.you ? col.ink : li === 1 ? tenant[(Math.random() * tenant.length) | 0] : col.teal,
        you: !!opt.you, retry: !!opt.retry, fail: false, a: 1, vy: 0, fx: 0, fy: 0 });
    };
    const pos = (p) => {
      const L = LANES[p.li], i = Math.min(L.nodes.length - 2, Math.floor(p.s)), f = p.s - i, a = L.nodes[i], b = L.nodes[i + 1];
      const k = 0.35 + 0.65 * Math.abs(Math.sin(Math.PI * f));
      return [a.x + (b.x - a.x) * f + p.ox, L.y + p.dy * k + p.oy];
    };
    const step = (dt) => {
      for (let li = 0; li < 2; li++) {
        acc[li] += LANES[li].rate * dt * (reduce ? 0.4 : 1);
        while (acc[li] >= 1 && P.length < 650) { acc[li]--; spawn(li); }
        if (acc[li] > 5) acc[li] = 0;
      }
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i], L = LANES[p.li];
        if (p.fail) {
          p.fy += p.vy * dt; p.vy += 300 * dt; p.a -= dt * 0.85;
          if (p.a <= 0) { retries++; spawn(p.li, { s: L.failAt - 1, retry: true }); P.splice(i, 1); }
          continue;
        }
        const prev = Math.floor(p.s); p.s += p.v * dt; const now = Math.floor(p.s);
        if (now > prev && now < 5) {
          pulses[p.li][now] = 1;
          if (now === L.failAt && !p.you && !p.retry && Math.random() < 0.06) { const q = pos(p); p.fail = true; p.fx = q[0]; p.fy = q[1]; p.vy = -30; }
        }
        if (p.s >= 4) { P.splice(i, 1); continue; }
        p.ox *= Math.pow(0.02, dt); p.oy *= Math.pow(0.02, dt);
        if (mouse.on) {
          const q2 = pos(p), dx = q2[0] - mouse.x, dy = q2[1] - mouse.y, d = Math.hypot(dx, dy);
          if (d < 80 && d > 0.1) { const f = (80 - d) / 80; p.ox += (dx / d) * f * 26 * dt * 8; p.oy += (dy / d) * f * 26 * dt * 8; }
        }
      }
      for (let a = 0; a < 2; a++) for (let k = 0; k < 5; k++) pulses[a][k] = Math.max(0, pulses[a][k] - dt * 2.2);
      for (let r = ripples.length - 1; r >= 0; r--) { ripples[r].t += dt; if (ripples[r].t > 1) ripples.splice(r, 1); }
    };
    const dot = (x, y, r, c, a) => {
      ctx.globalAlpha = a;
      if (col.glow) { ctx.globalAlpha = a * 0.16; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r * 2.8, 0, 6.283); ctx.fill(); ctx.globalAlpha = a; }
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const small = W < 560;
      LANES.forEach((L) => {
        const c = col[L.color];
        ctx.lineWidth = 1; ctx.strokeStyle = col.line; ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.moveTo(L.nodes[0].x, L.y); ctx.lineTo(L.nodes[4].x, L.y); ctx.stroke();
        ctx.font = "500 " + (small ? 10 : 11) + "px 'JetBrains Mono',monospace"; ctx.textAlign = "left"; ctx.fillStyle = c; ctx.globalAlpha = 0.9;
        ctx.fillText(L.label.toUpperCase(), L.nodes[0].x - (small ? 6 : 8), L.y - (small ? 26 : 32));
      });
      if (col.glow) ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        if (p.fail) { dot(p.fx, p.fy, 2.6, col.red, Math.max(0, p.a)); continue; }
        const q = pos(p);
        dot(q[0], q[1], p.you ? 3.2 : 2.2, p.retry ? col.amber : p.c, 0.95);
        if (p.retry) { ctx.globalAlpha = 0.7; ctx.strokeStyle = col.amber; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(q[0], q[1], 5, 0, 6.283); ctx.stroke(); }
      }
      ctx.globalCompositeOperation = "source-over";
      LANES.forEach((L, li) => {
        const c = col[L.color];
        L.nodes.forEach((nd, k) => {
          const pu = pulses[li][k], rad = (small ? 7 : 9) + pu * 3, h = hot && hot.li === li && hot.k === k;
          if (col.glow && (pu > 0 || h)) { ctx.globalAlpha = 0.12 + pu * 0.18; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(nd.x, nd.y, rad + 6 + pu * 4, 0, 6.283); ctx.fill(); }
          ctx.globalAlpha = 1; ctx.fillStyle = col.node; ctx.strokeStyle = c; ctx.lineWidth = h ? 3 : 2; ctx.beginPath(); ctx.arc(nd.x, nd.y, rad, 0, 6.283); ctx.fill(); ctx.stroke();
          ctx.font = "400 " + (small ? 10 : 12) + "px 'JetBrains Mono',monospace"; ctx.textAlign = "center"; ctx.fillStyle = h ? col.ink : col.muted; ctx.fillText(nd.n, nd.x, nd.y + (small ? 24 : 28));
        });
      });
      ripples.forEach((r) => { ctx.globalAlpha = (1 - r.t) * 0.5; ctx.strokeStyle = col.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(r.x, r.y, r.t * 140, 0, 6.283); ctx.stroke(); });
      ctx.globalAlpha = 1;
    };
    const frame = (now) => {
      if (!running || destroyed) return;
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      step(dt); draw();
      if (now - lastUi > 120) {
        lastUi = now;
        if (cntRef.current) cntRef.current.textContent = Math.floor(((now - t0) / 1000) * rate + extra).toLocaleString("en-IN");
        if (retRef.current) retRef.current.textContent = retries;
      }
      raf = requestAnimationFrame(frame);
    };
    const nearNode = (x, y) => {
      let best = null, bd = 26;
      LANES.forEach((L, li) => L.nodes.forEach((nd, k) => { const d = Math.hypot(nd.x - x, nd.y - y); if (d < bd) { bd = d; best = { li, k, nd }; } }));
      return best;
    };
    const showTip = (h) => {
      hot = h;
      if (!h) { tip.style.opacity = 0; return; }
      tip.textContent = "";
      const b = document.createElement("b"); b.textContent = LANES[h.li].label + " · " + h.nd.n;
      const t = document.createElement("div"); t.textContent = h.nd.d; tip.append(b, t);
      const x = Math.min(Math.max(8, h.nd.x - 115), W - 238); let y = h.nd.y + 40;
      if (y + 90 > H - term.offsetHeight - 20) y = h.nd.y - 100;
      tip.style.left = x + "px"; tip.style.top = y + "px"; tip.style.opacity = 1;
    };
    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = e.pointerType === "mouse"; if (e.pointerType === "mouse") showTip(nearNode(mouse.x, mouse.y)); };
    const onLeave = () => { mouse.on = false; showTip(null); };
    const onClick = (e) => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, h = nearNode(x, y);
      if (h) { showTip(h); return; }
      const li = Math.abs(y - LANES[0].y) < Math.abs(y - LANES[1].y) ? 0 : 1;
      for (let i = 0; i < 45; i++) spawn(li);
      extra += 45; ripples.push({ x, y, t: 0 });
    };
    cv.addEventListener("pointermove", onMove); cv.addEventListener("pointerleave", onLeave); cv.addEventListener("click", onClick);

    const io = new IntersectionObserver((en) => {
      const v = en[0].isIntersecting;
      if (v && !running) { running = true; lastT = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!v) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(hero);

    readColors(); layout();
    for (let k = 0; k < 60; k++) step(0.05);
    const onResize = () => { layout(); draw(); };
    window.addEventListener("resize", onResize);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener && mq.addEventListener("change", readColors);
    const mo = new MutationObserver(readColors); mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!destroyed) layout(); });
    raf = requestAnimationFrame(frame);

    sim.current = { spawn, inject: (li, n) => { for (let i = 0; i < n; i++) spawn(li, { you: true }); } };
    return () => {
      destroyed = true; cancelAnimationFrame(raf); io.disconnect(); mo.disconnect();
      window.removeEventListener("resize", onResize);
      mq.removeEventListener && mq.removeEventListener("change", readColors);
      cv.removeEventListener("pointermove", onMove); cv.removeEventListener("pointerleave", onLeave); cv.removeEventListener("click", onClick);
    };
  }, [rate]);

  /* ---------- typing challenge ---------- */
  const wpm = (len, now) => { const m = (now - typing.current.started) / 60000; return m > 0 ? Math.round(len / 5 / m) : 0; };
  const onInput = (e) => {
    if (result) return;
    let v = e.target.value;
    if (v.length > target.length) { v = v.slice(0, target.length); e.target.value = v; }
    const T = typing.current, now = performance.now();
    if (!T.started && v.length) { T.started = now; track("typing_test_start"); }
    if (v.length > T.prev) {
      T.keys++;
      for (let i = T.prev; i < v.length; i++) if (v[i] !== target[i]) T.errs++;
      sim.current && sim.current.inject(1, 1);
    }
    T.prev = v.length;
    setVal(v);
    if (T.started) setLive(wpm(v.length, now));
    if (v === target) {
      const w = wpm(target.length, now), accuracy = Math.max(0, Math.round(100 * (1 - T.errs / Math.max(1, T.keys))));
      setResult({ w, acc: accuracy });
      track("typing_test_done", { wpm: w, accuracy });
      requestAnimationFrame(() => setBars(true));
      sim.current && sim.current.inject(1, 30);
      inpRef.current && inpRef.current.blur();
    }
  };
  const again = (e) => {
    e.stopPropagation();
    typing.current = { started: 0, keys: 0, errs: 0, prev: 0 };
    setVal(""); setResult(null); setLive(null); setBars(false);
    if (inpRef.current) { inpRef.current.value = ""; inpRef.current.focus(); }
  };
  const msg = result && (result.w >= bestWpm ? "Okay, you win. Email me, we should talk." : (result.w >= 90 ? "Fast. Not " + bestWpm + " fast, but fast. " : "Not bad. ") + result.acc + "% accuracy.");

  return (
    <header id="hero" ref={heroRef}>
      <canvas id="cv" ref={cvRef} aria-hidden="true" />
      <div id="title" ref={titleRef}>
        <div className="k">{kicker}</div>
        <h1>{name}</h1>
        <p>{tagline}</p>
        {now && <div className="now"><i /> now: {now}</div>}
      </div>
      <div id="stats" aria-hidden="true">
        <span>since you arrived</span><b ref={cntRef}>0</b><span>records processed</span>
        {lines[0] && <span className="rate">{lines[0]}</span>}
        <span>retries recovered: <span ref={retRef} style={{ color: "var(--amber)" }}>0</span></span>
        {lines[1] && <span>{lines[1]}</span>}
      </div>
      <div id="tip" ref={tipRef} role="tooltip" />
      <div id="term" ref={termRef} className={result ? "done" : ""} aria-label="Typing challenge" onClick={() => !result && inpRef.current && inpRef.current.focus()}>
        <div className="hd">
          <span>type this · every key sends a query into the pipeline</span>
          <span>{live !== null && !result ? <>you: <b>{live} WPM</b> · </> : null}best: <b>{bestWpm} WPM</b></span>
        </div>
        <div id="txt">
          {target.split("").map((ch, i) => (
            <span key={i} className={i < val.length ? (val[i] === ch ? "ok" : "bad") : i === val.length ? "cur" : undefined}>{ch}</span>
          ))}
        </div>
        <div id="res">
          <div className="msg">{msg}</div>
          <div className="rrow"><span>you</span><div className="bar"><i style={{ width: bars && result ? Math.min(100, (result.w / 150) * 100) + "%" : 0 }} /></div><span>{result ? result.w + " WPM" : ""}</span></div>
          <div className="rrow"><span>abhuday</span><div className="bar me"><i style={{ width: bars ? (bestWpm / 150) * 100 + "%" : 0 }} /></div><span>{bestWpm} WPM</span></div>
          <button type="button" onClick={again}>Try again</button>
        </div>
        <input id="inp" ref={inpRef} type="text" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} onInput={onInput} onPaste={(e) => e.preventDefault()} aria-label="Type the sentence shown to test your typing speed" />
      </div>
      <ul className="sr">
        <li>CRIS 2.0 ingestion pipeline: sources, validate, normalise, score, serve.</li>
        <li>WMP Copilot RAG pipeline: documents, chunk, embed, retrieve, answer.</li>
      </ul>
    </header>
  );
}
