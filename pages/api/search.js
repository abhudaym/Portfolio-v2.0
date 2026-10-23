import { getPublishedBlogs, getPublishedWorks } from "../../lib/sanity";
import { LEGACY_WORKS } from "../../lib/legacyWorks";

export default async function handler(req, res) {
  const [blogs, works] = await Promise.all([getPublishedBlogs(), getPublishedWorks()]);
  const out = [
    ...blogs.map((b) => ({ type: "blog", title: b.title, href: "/blogs/" + b.slug })),
    ...works.map((w) => ({ type: "work", title: w.title, href: "/works/" + w.id })),
    ...LEGACY_WORKS.filter((l) => !works.some((w) => w.id === l.id)).map((l) => ({ type: "work", title: l.title, href: "/works/" + l.id })),
  ];
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.status(200).json(out);
}
