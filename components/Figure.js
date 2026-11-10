// A pipeline drawn the plain way: boxed steps in a row, with a numbered caption.
export default function Figure({ n, steps, caption }) {
  return (
    <figure className="fig">
      <ol className="steps">{steps.map((s) => <li key={s}><span>{s}</span></li>)}</ol>
      {caption && <figcaption>{n ? "Fig. " + n + ". " : ""}{caption}</figcaption>}
    </figure>
  );
}

export function Facts({ items }) {
  return (
    <dl className="margin">
      {items.map((f) => (
        <div key={f.k}><dt>{f.k}</dt><dd className={f.mono ? "mono" : undefined}>{f.v}</dd></div>
      ))}
    </dl>
  );
}
