export const slugify = (s) =>
  String(s).toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");

const stripFences = (md) => md.replace(/```[\s\S]*?```/g, "");

export function extractToc(md) {
  const out = [];
  stripFences(md || "").split("\n").forEach((line) => {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[1].replace(/[*_`]/g, "");
      out.push({ id: slugify(text), text });
    }
  });
  return out;
}

export const readMinutes = (md) =>
  Math.max(1, Math.round(stripFences(md || "").split(/\s+/).filter(Boolean).length / 220));
