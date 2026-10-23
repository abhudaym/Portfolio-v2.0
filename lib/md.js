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

// Insert demo fences (```demo + name on the next line + ```) after the first paragraph under a matching "##" heading.
export function injectDemos(md, rules = []) {
  if (!rules.length) return md;
  const lines = md.split("\n");
  const inserts = [];
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence;
    if (inFence) return;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) return;
    rules.forEach((r) => {
      if (r.done || !r.afterHeading.test(m[1])) return;
      r.done = true;
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      while (j < lines.length && lines[j].trim() && !/^#{1,6}\s/.test(lines[j]) && !/^```/.test(lines[j])) j++;
      inserts.push([j, r.demo]);
    });
  });
  inserts.sort((a, b) => b[0] - a[0]).forEach(([at, demo]) => lines.splice(at, 0, "", "```demo", demo, "```", ""));
  return lines.join("\n");
}
