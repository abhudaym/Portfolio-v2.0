import { useEffect, useRef, useState } from "react";

export default function CountUp({ to, suf = "", ms = 1100 }) {
  const ref = useRef(null);
  const dec = (String(to).split(".")[1] || "").length;
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, io;
    const run = () => {
      const t0 = performance.now();
      const f = (n) => {
        const k = Math.min(1, (n - t0) / ms);
        setV(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) raf = requestAnimationFrame(f);
      };
      raf = requestAnimationFrame(f);
    };
    if (!("IntersectionObserver" in window)) { setV(to); return; }
    io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io && io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);
  return <b ref={ref}>{v.toFixed(dec)}{suf}</b>;
}
