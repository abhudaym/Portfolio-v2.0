import { useState } from "react";

const MAP = { npe: ["cw", "pg"], lag: ["kf", "cw"], slow: ["pg"] };
const NOTE = { npe: "queried 2 of 3", lag: "queried 2 of 3", slow: "queried 1 of 3" };
const ERR = [["npe", "NullPointerException"], ["lag", "Consumer lag spike"], ["slow", "Slow query"]];
const SRC = [["cw", "CloudWatch"], ["pg", "PostgreSQL"], ["kf", "Kafka"]];

export default function PickSource() {
  const [e, setE] = useState("npe");
  return (
    <div className="pick">
      <div className="row" role="group" aria-label="Error type">
        {ERR.map(([k, l]) => <button key={k} type="button" aria-pressed={e === k} onClick={() => setE(k)}>{l}</button>)}
      </div>
      <div className="pills">
        {SRC.map(([k, l]) => <span key={k} className={"pill " + (MAP[e].includes(k) ? "on" : "off")}>{l}</span>)}
        <span className="cap">{NOTE[e]} · illustrative mapping</span>
      </div>
    </div>
  );
}
