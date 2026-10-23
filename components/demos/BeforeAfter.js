import { useEffect, useRef, useState } from "react";

export default function BeforeAfter() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <div className="ba" ref={ref}>
        <div className="r b"><span>before</span><div className="t"><i style={{ width: on ? "92%" : 0 }} /></div><span>hours of manual correlation</span></div>
        <div className="r a"><span>after</span><div className="t"><i style={{ width: on ? "14%" : 0 }} /></div><span>minutes, with suggested fixes</span></div>
      </div>
      <div className="fig-cap">Bar lengths are illustrative.</div>
    </>
  );
}
