// Bridge for posts that don't have the new Sanity fields filled in yet (stats, tags, demos).
// Once `stats`, `tags`, `badges` or inline ```demo blocks exist in Sanity, those win.
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
];

export function enhancementFor(title = "") {
  const r = RULES.find((x) => x.match.test(title));
  if (!r) return null;
  return { ...r, inject: r.inject.map((i) => ({ ...i })) };
}
