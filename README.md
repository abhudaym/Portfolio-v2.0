# Portfolio v2

Next.js (pages router) + Sanity. Everything on the site is content from Sanity with built-in fallbacks in `lib/site.js`, so nothing breaks while a field is still empty.

## What's in it

- **Living pipeline hero** (`components/PipelineHero.js`): a canvas of two data pipelines (CRIS 2.0 and WMP Copilot). Hover a stage, click empty space for a traffic spike, type the sentence to send your own records through.
- **Command palette** (`⌘K` / `Ctrl+K` / `/`): jump to pages, posts and works (fed by `/api/search`), toggle theme, copy email.
- **Reports, not blog posts** (`pages/blogs*`): tag filters, headline-number tiles, reading progress, table of contents, copy-able code blocks.
- **Interactive blocks inside Sanity markdown**: write a code block with language `demo` and a single line with the demo name. Available: `rca`, `arch-mcp`, `pick-source`, `before-after`. Add new ones in `components/demos/`.
- **Scroll-drawn timelines**, cursor-spotlight cards, light/dark themes without flash.

## Sanity fields added

Redeploy the studio (`cd studio && npx sanity deploy`) to get them:

- `profile`: kicker, tagline, now, email, typingChallenge, bestWpm, heroRate, heroLines, interests, socials
- `blog`: tags, readTime, featured, badges, stats (animated number tiles)
- `experience`: location, current, highlights
- new `volunteer` document type

`lib/enhancements.js` is a small bridge that gives the existing RCA post its stats, tags, badge and demos until those fields are filled in Sanity.

## Develop

```
npm ci
npm run dev
```

No access to Sanity (CI, offline)? `SANITY_OFFLINE=1 npm run build` uses `content/blogs/*.md` as fixtures.

## Analytics

Page views per page come from Vercel Web Analytics (already wired in `_app.js`). Custom events go through `lib/track.js`:

`resume_open`, `resume_download`, `social_click` (site), `email_click`, `typing_test_start`, `typing_test_done` (wpm, accuracy), `rca_demo_run`, `palette_open`, `palette_go` (to), `sudo_hire`, `work_link` (work, kind), `post_read_50` / `post_read_90` (post).

See them in Vercel → your project → Analytics → Events. Custom events need a Pro plan; page views work on the free plan.
