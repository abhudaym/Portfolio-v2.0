// A small architecture diagram: boxes on a grid, joined by straight arrows.
// nodes: [{ id, label, sub, col, row }]   edges: [{ from, to, label, side }]
// An edge must join two boxes in the same row or the same column.
const W = 150, H = 54, GX = 44, GY = 48;

export default function Diagram({ n, nodes, edges, caption, alt }) {
  const cols = Math.max(...nodes.map((d) => d.col)) + 1;
  const rows = Math.max(...nodes.map((d) => d.row)) + 1;
  const width = cols * W + (cols - 1) * GX;
  const height = rows * H + (rows - 1) * GY;
  const x = (c) => c * (W + GX);
  const y = (r) => r * (H + GY);
  const byId = Object.fromEntries(nodes.map((d) => [d.id, d]));

  return (
    <figure className="fig">
      <div className="diagram">
        <svg viewBox={`-1 -1 ${width + 2} ${height + 2}`} width={width} role="img" aria-label={alt}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
          </defs>
          {edges.map((e) => {
            const a = byId[e.from], b = byId[e.to];
            let x1, y1, x2, y2, lx, ly, anchor = "middle";
            if (a.row === b.row) {
              const right = b.col > a.col;
              x1 = x(a.col) + (right ? W : 0); x2 = x(b.col) + (right ? 0 : W);
              y1 = y2 = y(a.row) + H / 2;
              lx = (x1 + x2) / 2; ly = y1 - 8;
            } else {
              const down = b.row > a.row;
              y1 = y(a.row) + (down ? H : 0); y2 = y(b.row) + (down ? 0 : H);
              x1 = x2 = x(a.col) + W / 2;
              const left = e.side === "left";
              lx = x1 + (left ? -10 : 10); ly = (y1 + y2) / 2 + 4; anchor = left ? "end" : "start";
            }
            return (
              <g key={e.from + e.to}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" />
                {e.label && <text x={lx} y={ly} textAnchor={anchor} className="dg-edge">{e.label}</text>}
              </g>
            );
          })}
          {nodes.map((d) => (
            <g key={d.id}>
              <rect x={x(d.col)} y={y(d.row)} width={W} height={H} fill="none" stroke="currentColor" strokeWidth="1" />
              <text x={x(d.col) + W / 2} y={y(d.row) + (d.sub ? 23 : 32)} textAnchor="middle" className="dg-label">{d.label}</text>
              {d.sub && <text x={x(d.col) + W / 2} y={y(d.row) + 40} textAnchor="middle" className="dg-sub">{d.sub}</text>}
            </g>
          ))}
        </svg>
      </div>
      {caption && <figcaption>{n ? "Fig. " + n + ". " : ""}{caption}</figcaption>}
    </figure>
  );
}
