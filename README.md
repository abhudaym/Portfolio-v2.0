# Portfolio v2

Next.js (pages router) + Sanity. Writing and side projects come from Sanity; the rest is in `lib/`.

## Design

A typeset-paper look: one serif (EB Garamond) for text, one mono (IBM Plex Mono) for dates and numbers, rules instead of cards, a single accent colour. Dark mode follows the system setting. All of it lives in `styles/globals.css`.

## Where content lives

- **Production case studies** (CRIS 2.0, WMP Copilot, data archival, Lambda ingestion): `lib/caseStudies.js`. They render on the home page, `/works` and `/works/<id>`.
- **Home page copy, education, contact links**: `lib/site.js`.
- **Sanity**: blog posts, side-project works, experience and the resume PDF. `lib/site.js` has an experience fallback.
- **Old side projects**: `lib/legacyWorks.js`.
- `lib/enhancements.js` gives posts their stats and badges until those fields are filled in Sanity.
- `/type` is the typing test, linked from the footer.

Sanity `profile` fields from the old design (kicker, tagline, now, typingChallenge, heroRate, heroLines, interests, socials), the `skill` and `volunteer` types and `blog.tags` are no longer read by the site. Only `profile.resume` is.

## Develop

```
npm ci
npm run dev
```

No access to Sanity (CI, offline)? `SANITY_OFFLINE=1 npm run build` uses `content/blogs/*.md` as fixtures.

## Analytics

Page views per page come from Vercel Web Analytics (already wired in `_app.js`). Custom events go through `lib/track.js`:

`resume_open`, `resume_download`, `social_click` (site), `email_click`, `typing_done` (wpm), `work_link` (work, kind), `post_read_50` / `post_read_90` (post).

See them in Vercel → your project → Analytics → Events. Custom events need a Pro plan; page views work on the free plan.

## Flow diagrams in posts

Write a code block with language `flow` in Sanity markdown:

    ```flow
    Ingestion (once per document)
    Documents -> Parser (turns PDFs into text) -> Chunker -> Embedder -> Vector store
    ```

A line with `->` is a row of steps, a line without one titles the next row, and `(text)` after a step becomes a note printed under the row.
