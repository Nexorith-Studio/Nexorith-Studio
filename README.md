# Nexorith

Ultra-premium scrollytelling marketing site and lead pipeline for **Nexorith** — a futuristic web and AI solutions studio.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router), React, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger |
| API | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Admin | JWT in httpOnly cookie, protected dashboard |

## Project layout

- `frontend/` — Next.js site (landing + `/admin`)
- `backend/` — Express API (`/api/leads`, `/api/auth`, `/api/admin`)

## Prerequisites

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas URI

## Backend setup (local)

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

- `MONGODB_URI` — connection string (e.g. `mongodb://127.0.0.1:27017/nexorith`)
- `JWT_SECRET` — long random string
- `ADMIN_EMAIL` — admin login email
- `ADMIN_PASSWORD_HASH` — bcrypt hash of your password

Generate a password hash:

```bash
cd backend
npm run hash-password -- "your-secure-password"
```

Paste the printed hash into `ADMIN_PASSWORD_HASH`.

Start the API:

```bash
npm run dev
```

API defaults to `http://localhost:4000`. Health check: `GET /api/health`.

## Frontend setup (local)

```bash
cd frontend
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_API_URL` to your API origin (default `http://localhost:4000`).

```bash
npm run dev
```

Site: `http://localhost:3000` · Admin login: `http://localhost:3000/admin/login`

## Push this code to GitHub

If this folder is not a Git repo yet, run **on your machine** (replace nothing if you use this exact remote):

```bash
cd /path/to/nexorith-website

git init
git add .
git commit -m "Initial commit: Nexorith (Next.js + Express + MongoDB)"

git branch -M main
git remote add origin https://github.com/suraj721/Nexorith.git
git push -u origin main
```

If the remote already exists and you need to set the URL:

```bash
git remote set-url origin https://github.com/suraj721/Nexorith.git
git push -u origin main
```

If GitHub shows an empty repo with a README and push is rejected, either pull first (`git pull origin main --rebase`) or follow GitHub’s “push an existing repository” instructions.

**Authentication:** GitHub no longer accepts account passwords for HTTPS Git. Use a [Personal Access Token](https://github.com/settings/tokens) (classic: `repo` scope) or [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

**Secrets:** `backend/.env` and `frontend/.env.local` are listed in `.gitignore` — do not commit them.

---

## Deployment guide

You deploy **three pieces**: MongoDB (Atlas), the **Express API**, and the **Next.js frontend**. The frontend calls the API using `NEXT_PUBLIC_API_URL`.

### 1. MongoDB Atlas

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Database Access → add a database user.
3. Network Access → allow `0.0.0.0/0` (or your host IPs only for stricter security).
4. Connect → Drivers → copy the **connection string** (replace `<password>`).
5. Example: `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/nexorith?retryWrites=true&w=majority`

### 2. Deploy the API (Express)

Use any Node host that supports long-running processes and env vars, for example **Render**, **Railway**, **Fly.io**, or a **VPS**.

**Build / start (typical):**

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Listen on the port the platform provides (`PORT` is usually injected automatically).

**Required environment variables (production):**

| Variable | Example | Purpose |
| --- | --- | --- |
| `PORT` | `4000` or platform default | HTTP port |
| `NODE_ENV` | `production` | Secure cookies |
| `MONGODB_URI` | Atlas URI | Database |
| `JWT_SECRET` | long random string | Admin JWT signing |
| `ADMIN_EMAIL` | `you@domain.com` | Admin login |
| `ADMIN_PASSWORD_HASH` | output of `npm run hash-password` | Admin password |
| `FRONTEND_ORIGIN` | `https://your-app.vercel.app` | CORS + cookie policy |

After deploy, note the public API URL, e.g. `https://nexorith-api.onrender.com`.

**Health check:** configure your host to hit `GET /api/health` if supported.

### 3. Deploy the frontend (Next.js)

**Vercel** (common for Next.js):

1. Import the GitHub repo `suraj721/Nexorith`.
2. Set **Root Directory** to `frontend`.
3. Framework: Next.js (auto-detected). Build: `npm run build`, Output: default.
4. Add **Environment Variables**:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://your-api-host.example.com` (no trailing slash) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-domain.vercel.app` (your real site URL) |

5. Deploy. Open the Vercel URL and test the contact form and admin login.

**Important:** Update **`FRONTEND_ORIGIN`** on the API to match your **exact** production site URL (including `https://` and no trailing slash). After changing env vars, redeploy or restart the API.

### 4. Admin login and cookies in production

- The API sets an **httpOnly** cookie on **login**. With `NODE_ENV=production`, cookies use `Secure` and `SameSite=None` so the browser can send them on cross-site requests to your API domain when the frontend uses `fetch(..., { credentials: "include" })` (already implemented).
- The **frontend** and **API** can be on different domains (e.g. Vercel + Render) as long as CORS and `FRONTEND_ORIGIN` are correct and both use **HTTPS**.

### 5. Custom domains

- Point your domain to **Vercel** for the marketing site.
- Optionally put the API behind `api.yourdomain.com` on your host’s custom domain settings.
- Set `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, and `FRONTEND_ORIGIN` to the final URLs.

### 6. Post-deploy checklist

- [ ] `GET https://your-api/api/health` returns `{"ok":true,...}`
- [ ] Contact form submits without CORS errors (browser devtools → Network)
- [ ] Admin login works; dashboard loads leads
- [ ] Atlas shows new `Lead` documents after a test submission

## Production notes (summary)

- Set `FRONTEND_ORIGIN` on the API to your deployed site URL (CORS + cookies).
- Use HTTPS everywhere in production.
- Never commit `.env` files; use host-provided secret storage.

## Features

- **Landing:** Hero, vision (GSAP line reveals + ecosystem illustration), services (stagger + 3D tilt), tech stack, masonry portfolio, scroll-scrubbed process timeline, infinite testimonial marquee, luxury contact form.
- **Leads:** `POST /api/leads` persists inquiries to MongoDB.
- **Admin:** Login, list leads, sort by date, toggle “contacted”, delete rows, full message view.

## Scripts

From repo root, run each app in its own terminal:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Or use a process manager / your hosting platform to run both services.

## Troubleshooting

### "Failed to fetch query"
If the inquiry form shows "failed to fetch", ensure the **backend server** is running (`npm run dev` in `backend`) and that `NEXT_PUBLIC_API_URL` in the frontend matches the API origin.
