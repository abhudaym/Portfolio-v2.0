// Bridge for posts that don't have the new Sanity fields filled in yet (stats, tags, demos).
// Once `stats`, `tags`, `badges` or inline ```demo blocks exist in Sanity, those win.
// Entries for posts whose Sanity fields aren't filled yet. Delete an entry once its post has them.
const RULES = [
  {
    match: /rca/i,
    stats: [
      { to: 85, suf: "%", label: "less data-fetching time" },
      { to: 75, suf: "%", label: "faster root-cause identification" },
      { text: "5-10", label: "log sources per incident, before" },
      { text: "2nd", label: "place at the hackathon" },
    ],
    tags: ["MCP", "FastAPI", "React", "LLM agents"],
    badges: [{ label: "2nd place · AiDash Hack(AI)thon", kind: "win" }],
    inject: [
      { afterHeading: /problem/i, demo: "rca" },
      { afterHeading: /architecture|mcp advantage/i, demo: "arch-mcp" },
      { afterHeading: /innovation|source selection|smart/i, demo: "pick-source" },
      { afterHeading: /impact|results|outcome/i, demo: "before-after" },
    ],
  },
  {
    match: /decisions that actually mattered/i,
    stats: [
      { to: 40, suf: "%", label: "lower query cost from retrieving fewer chunks" },
      { text: "~1¢", label: "per page for a parser that keeps tables" },
      { text: "1/3-1/2", label: "of my documents are tables" },
      { text: "Days", label: "to a working first version" },
    ],
    tags: ["RAG", "Architecture", "LLMs"],
    badges: [{ label: "Part 1 of 2", kind: "pink" }],
    inject: [],
  },
  {
    match: /measure whether a rag system works/i,
    stats: [
      { to: 49, suf: "%", label: "of questions had poor retrieval on the first run" },
      { to: 3.06, suf: "/5", label: "average retrieval score" },
      { to: 3.77, suf: "/5", label: "average generation score" },
      { to: 35, label: "questions in the evaluation set" },
    ],
    tags: ["RAG", "Evaluation", "LLMs"],
    badges: [{ label: "Part 2 of 2", kind: "pink" }],
    inject: [],
  },
];

export function enhancementFor(title = "") {
  const r = RULES.find((x) => x.match.test(title));
  if (!r) return null;
  return { ...r, inject: r.inject.map((i) => ({ ...i })) };
}
