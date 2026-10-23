import { useState } from "react";

const NODES = [
  { x: 30, y: 30, w: 120, label: "CloudWatch", c: "CloudWatch: application logs and traces. An adapter turns its results into one common shape." },
  { x: 30, y: 105, w: 120, label: "PostgreSQL", c: "PostgreSQL: query and lock history. Same adapter idea, same common shape." },
  { x: 30, y: 180, w: 120, label: "Kafka", c: "Kafka: consumer and message-queue events. A new source only needs a new adapter." },
  { x: 250, y: 95, w: 140, h: 60, hub: true, label: "MCP server", c: "MCP server: one interface in front of every source. Agents ask it for context instead of integrating with each system." },
  { x: 470, y: 30, w: 140, label: "Cluster", c: "Error clustering agent: groups similar errors so one incident is not fifty alerts." },
  { x: 470, y: 105, w: 140, label: "Root cause", c: "Root cause agent: suggests probable causes from the aggregated logs." },
  { x: 470, y: 180, w: 140, label: "Summarise", c: "Summarization agent: writes the readable triage summary that non-technical stakeholders can follow." },
];

export default function ArchMcp() {
  const [cap, setCap] = useState("Hover or tab through a box to see what it does.");
  return (
    <>
      <div className="arch">
        <svg viewBox="0 0 640 250" role="img" aria-label="Architecture: three log sources feed an MCP server, which feeds three AI agents">
          <g>
            <path className="fl" d="M150 50 C200 50 200 125 250 125" /><path className="fl" d="M150 125 L250 125" /><path className="fl" d="M150 200 C200 200 200 125 250 125" />
            <path className="fl" d="M390 125 C430 125 430 50 470 50" /><path className="fl" d="M390 125 L470 125" /><path className="fl" d="M390 125 C430 125 430 200 470 200" />
          </g>
          {NODES.map((n) => {
            const h = n.h || 40;
            return (
              <g key={n.label} className={"nd" + (n.hub ? " hub" : "")} tabIndex={0} onMouseEnter={() => setCap(n.c)} onFocus={() => setCap(n.c)} onClick={() => setCap(n.c)}>
                <rect x={n.x} y={n.y} width={n.w} height={h} rx={n.hub ? 10 : 8} />
                <text x={n.x + n.w / 2} y={n.y + h / 2 + 5} textAnchor="middle">{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="archcap">{cap}</div>
    </>
  );
}
