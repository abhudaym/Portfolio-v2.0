/*
  Flow diagram written as plain text in Sanity markdown:

  ```flow
  Ingestion (once per document)
  Documents -> Parser (turns PDFs into text) -> Chunker -> Embedder -> Vector store

  Query (every question)
  Question -> Embedder -> Vector search -> Top-k chunks -> LLM -> Answer + citations
  ```

  - A line with "->" is a row of steps. A line without one is the title of the next row.
  - "Step (note)" adds a note, printed under the row.
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

export default function Flow({ source }) {
  const groups = parseFlow(source || "");
  if (!groups.length) return null;
  return (
    <figure className="fig">
      {groups.map((g, i) => {
        const notes = g.steps.filter((s) => s.note);
        return (
          <div key={i} className="col" style={{ gap: 8 }}>
            {g.title && <div className="gt">{g.title}</div>}
            <ol className="steps">{g.steps.map((s, j) => <li key={j}><span>{s.name}</span></li>)}</ol>
            {notes.length > 0 && <ul className="notes">{notes.map((s) => <li key={s.name}><i>{s.name}:</i> {s.note}</li>)}</ul>}
          </div>
        );
      })}
    </figure>
  );
}
