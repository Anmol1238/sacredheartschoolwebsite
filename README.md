# Sacred Heart School Website

Modern rebuild of [sacredheartschool.org.in](https://sacredheartschool.org.in) with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and a file-based admin CMS.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment

| Variable | Required | Notes |
|----------|----------|--------|
| `ADMIN_PASSWORD` | Yes (production) | Admin login password |
| `ADMIN_SESSION_SECRET` | Yes (production) | Cookie signing secret |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Public URL, e.g. `https://your-app.onrender.com` |

See `.env.example`.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # production server
npm run lint     # eslint
```

## Deploy on Render (demo)

1. Push this repo to GitHub.
2. Create a **Web Service** from the repo (or use `render.yaml`).
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Set env vars: `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
6. Node version: **20+**

### Demo note

Content (`src/data/site.json`) and uploads (`public/uploads`) are stored on disk. On Render free tier the filesystem is ephemeral — admin edits/uploads may reset after redeploy or idle sleep. Fine for a visual demo; use a persistent disk or object storage for production CMS durability.

## Features

- Public pages: Home, About, Academics, Admission, Fees, Events, Disclosure, Homework, TC, Gallery, Videos, Contact
- Homepage campus slideshow (admin-managed)
- Graphical fee structure dashboard
- Password-protected admin CMS (leaders, media, gallery, fees, pages, inquiries, …)
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots
- UI states: empty, loading, error, offline, slow network, validation, success, buffering

## Tech

| Area | Choice |
|------|--------|
| Framework | Next.js App Router |
| UI | Tailwind CSS 4 + accessible components |
| CMS | JSON file + local uploads (swapable later) |
| Auth | Signed HTTP-only admin session cookie |
