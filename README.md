# Mo Benet — Portfolio

Personal portfolio site. Single-scroll experience with a generative curl noise flow field as a living background.

Contact via the site's contact section.

## Stack

- Next.js 16 (Turbopack)
- Framer Motion
- Canvas 2D (curl noise particle system)
- Tailwind CSS v4 (design tokens live in `src/app/globals.css` via `@theme`)
- Lenis (smooth scroll)
- MediaPipe Hand Landmarker (camera gesture control: point to move, pinch to
  click, wrist swipe to scroll, open palm to scatter particles)
- Anthropic API — `/api/poem` generates the poetic interstitial fragment

## Run locally

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY (optional)
npm run dev
```

Without `ANTHROPIC_API_KEY` the poetic interstitial silently falls back to a
built-in archive of fragments. Set `NEXT_PUBLIC_SITE_URL` in production so
metadata, sitemap and robots point at the right domain.

## License

All content, design and code in this repository is personal work. All rights reserved.
