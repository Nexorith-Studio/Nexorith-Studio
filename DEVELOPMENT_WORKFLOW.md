# Development Workflow

This project uses two long-lived branches, each mapped to its own domain and
backend service, so development never touches production.

| Branch | Frontend (Vercel)        | Backend (Render)      | Database          |
| ------ | ------------------------- | ---------------------- | ------------------ |
| `main` | `nexorith.tech`            | `nexorith-api`          | production cluster/DB |
| `dev`  | `dev.nexorith.tech`        | `nexorith-api-dev`      | separate dev DB     |

Production is never affected by work on `dev` until that work is merged into
`main` via a pull request.

---

## 1. Working on `dev`

```bash
git checkout dev
git pull origin dev
# ...make changes...
git add <files>
git commit -m "..."
git push origin dev
```

Feature work should branch off `dev` (e.g. `feature/xyz`), then be merged
into `dev` via PR — keep `main` reserved for tested, release-ready code.

Running locally:

```bash
# frontend
cd frontend
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at the dev API
npm install
npm run dev

# backend
cd backend
cp .env.example .env
npm install
npm run dev
```

## 2. Deploying to `dev.nexorith.tech`

A push (or merge) to `dev` deploys automatically:

- **Frontend:** Vercel's Git integration builds and deploys every push to
  `dev`. The `dev.nexorith.tech` domain is configured (see manual steps
  below) to always point at the latest deployment of the `dev` branch —
  it never serves builds from any other branch, including `main`.
- **Backend:** Render redeploys the `nexorith-api-dev` service on every push
  to `dev` (see `render.yaml` and manual steps below).

No action beyond `git push origin dev` is required once the one-time setup
below is complete.

## 3. Promoting `dev` to production

Once changes on `dev` are verified at `dev.nexorith.tech`:

```bash
git checkout main
git pull origin main
git merge --no-ff dev
git push origin main
```

Prefer opening a pull request (`dev` → `main`) on GitHub instead of merging
locally, so CI (`.github/workflows/ci.yml`) runs lint/build checks before the
merge lands. A push to `main` triggers Vercel and Render to redeploy
`nexorith.tech` and `nexorith-api` — production only ever moves forward from
tested `dev` code.

---

## What's automated in this repo

- **`.github/workflows/ci.yml`** — runs `next lint` + `next build` for the
  frontend and a syntax check for the backend on every push/PR to `main` or
  `dev`, catching build breaks before they reach Vercel/Render.
- **`backend/src/index.js`** — CORS now allows the `FRONTEND_ORIGIN` env var
  (set per-service below) in addition to `nexorith.tech` and
  `dev.nexorith.tech`, so the dev backend accepts requests from the dev
  frontend without opening CORS to production.
- **`frontend/src/app/robots.ts` and `layout.tsx`** — any deployment where
  Vercel's built-in `VERCEL_ENV` isn't `production` (i.e. the `dev` branch
  and preview deployments) automatically gets `noindex, nofollow` and an
  empty sitemap reference, so `dev.nexorith.tech` never gets indexed by
  search engines or shows up as duplicate content alongside `nexorith.tech`.
- **`render.yaml`** — documents both backend services as code (see caveat
  in the file: the existing production service was created manually, so
  this is a reference for the new dev service, not something to blueprint-sync
  over the existing prod service).

---

## Manual setup required (one-time, cannot be done from code)

### Vercel — dev domain

1. In the Vercel dashboard, open the `nexorith` project → **Settings → Git**.
   Confirm **Production Branch** is set to `main` (this is what guarantees
   `nexorith.tech` only ever serves `main`).
2. Go to **Settings → Domains** → **Add** → enter `dev.nexorith.tech`.
3. When prompted for the assignment, choose **"Assign to a Git branch"** and
   select `dev` (not "Production"). This makes `dev.nexorith.tech` always
   serve the latest deployment of the `dev` branch only.
4. Go to **Settings → Environment Variables** and add, scoped to the
   **Preview** environment and restricted to the `dev` git branch:
   - `NEXT_PUBLIC_API_URL` = `https://nexorith-api-dev.onrender.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://dev.nexorith.tech`
   (Production values for `main` should already be set under the
   **Production** environment.)

### DNS — dev subdomain

5. At your domain registrar / DNS provider for `nexorith.tech`, add the CNAME
   record Vercel shows you in step 3 (typically `dev` → `cname.vercel-dns.com`).
   Do not touch the existing record for the apex domain / `www` used by
   production.

### Render — dev backend service

6. In the Render dashboard, click **New +** → **Web Service**, connect the
   same GitHub repo, and configure:
   - **Name:** `nexorith-api-dev`
   - **Branch:** `dev`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Add environment variables (mirroring `backend/.env.example`, but pointing
   at dev resources):
   - `NODE_ENV=development`
   - `MONGODB_URI` — a **separate** dev database (see step 8)
   - `FRONTEND_ORIGIN=https://dev.nexorith.tech`
   - `JWT_SECRET` — a different secret from production
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` — can reuse or set separately
   - `SMTP_*` — optional; leave blank to silently skip emails in dev

### MongoDB Atlas — dev database

8. In the same (or a separate free) Atlas cluster, create a new database,
   e.g. `nexorithDev`, and use its connection string for
   `MONGODB_URI` on `nexorith-api-dev`. This keeps dev/test data and admin
   accounts fully isolated from production data.

### GitHub — branch protection (recommended)

9. Under the repo's **Settings → Branches**, add a protection rule for
   `main` requiring the `CI / Frontend lint & build` and `CI / Backend
   install check` status checks to pass before merging, and require PRs
   (no direct pushes) for extra safety.

Once steps 1–9 are done, the workflow is fully self-serve: push to `dev` to
update `dev.nexorith.tech`, open a PR into `main` when ready to ship.

---

## Troubleshooting: Vercel domain shows "No Deployment"

This means Vercel has never recorded a build for the branch bound to that
domain — it's not a build failure, there's simply nothing built yet. Fix:

1. Push any commit to `dev` (even a docs-only change) to force a new build.
2. In the Vercel dashboard, go to the project's **Deployments** tab and
   filter by branch `dev` — confirm a new deployment appears and reaches
   **Ready**.
3. If nothing appears within a minute of the push, check
   **Settings → Git**: confirm the repository is connected and that no
   branch restriction / Ignored Build Step is skipping `dev`.
4. Also check the GitHub repo's **Settings → Webhooks** → the Vercel webhook
   → **Recent Deliveries** for failed pushes (non-2xx responses), which
   would explain builds never starting despite the push landing on GitHub.
