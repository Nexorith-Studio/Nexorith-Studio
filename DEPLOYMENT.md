# Nexorith Deployment Guide

This comprehensive guide will walk you through deploying the **Nexorith Full-Stack Application** to production. Deploying this application requires three main steps:
1. Setting up the Database (**MongoDB Atlas**)
2. Deploying the API Backend (**Render**)
3. Deploying the Frontend (**Vercel**)

---

## Part 1: Setting up MongoDB Atlas (Database)

We use MongoDB Atlas for a free, fully-managed cloud database.

1. **Create an Account / Log In:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2. **Create a Cluster:** Click **"Build a Database"** and select the **Shared (Free)** tier. Choose a provider (e.g., AWS) and region close to your target users.
3. **Database Access:** 
   - On the left sidebar, click **"Database Access"**.
   - Click **"Add New Database User"**.
   - Select "Password", create a **Username** and a **secure password**. Keep this password handy.
4. **Network Access:**
   - On the left sidebar, click **"Network Access"**.
   - Click **"Add IP Address"**.
   - Choose **"Allow Access from Anywhere"** (`0.0.0.0/0`). *(Note: For tighter security, you can lock this down to your backend server's IP later).*
5. **Get Connection String:**
   - Go to **"Database"** on the left sidebar and click **"Connect"** on your cluster.
   - Choose **"Drivers"** and copy the Connection String.
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **Important:** Replace `<password>` with the password you generated, and append your database name before the `?` (e.g., `...mongodb.net/nexorithProd?retryWrites...`).

---

## Part 2: Deploying the Backend (Render)

Render is an excellent platform for hosting Node.js applications with a generous free tier.

**Prerequisites:** Push your entire repository to GitHub.

1. **Create an Account:** Go to [Render](https://render.com/) and sign up using GitHub.
2. **Create a Web Service:**
   - Click **"New +"** and select **"Web Service"**.
   - Connect your GitHub repository.
3. **Configure the Service:**
   - **Name:** `nexorith-api` (or similar)
   - **Root Directory:** `backend` (⚠️ **CRITICAL: Ensure you set this to `backend`**)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Environment Variables:**
   Scroll down to the **"Environment Variables"** section and add the following:

   | Key | Value | Notes |
   | --- | --- | --- |
   | `NODE_ENV` | `production` | Ensures secure cookies for auth |
   | `MONGODB_URI` | `mongodb+srv://...` | The connection string from Step 1 |
   | `JWT_SECRET` | `your-super-long-random-string` | Used to sign admin tokens |
   | `ADMIN_EMAIL` | `admin@nexorith.io` | Your admin login email |
   | `ADMIN_PASSWORD_HASH`| `$2b$10$xxxx...` | Hash of your password (use `npm run hash-password`) |
   | `FRONTEND_ORIGIN` | *Leave blank for now* | We'll update this after deploying the frontend |

5. **Deploy:** Click **"Create Web Service"**. Render will start building and deploying your API.
6. **Get API URL:** Once deployed, copy your API URL (e.g., `https://nexorith-api.onrender.com`).

---

## Part 3: Deploying the Frontend (Vercel)

Vercel is the creator of Next.js and the best place to host the frontend.

1. **Create an Account:** Go to [Vercel](https://vercel.com/) and sign up using GitHub.
2. **Create a New Project:**
   - Click **"Add New..."** -> **"Project"**.
   - Import your GitHub repository.
3. **Configure the Project:**
   - **Project Name:** `nexorith`
   - **Framework Preset:** `Next.js` (Usually auto-detected)
   - **Root Directory:** Edit this and select `frontend` (⚠️ **CRITICAL: Set this to `frontend`**)
   - **Build and Output Settings:** Leave default (`npm run build`).
4. **Environment Variables:**
   Open the "Environment Variables" toggle and add:

   | Name | Value | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_API_URL` | `https://nexorith-api.onrender.com` | Your Rentder API URL. **No trailing slash!** |
   | `NEXT_PUBLIC_SITE_URL` | `https://nexorith.vercel.app` | *Skip if you don't know it yet, standard SEO fallback. Update later.* |

5. **Deploy:** Click **"Deploy"**. Vercel will build and serve your Next.js application.
6. **Get Frontend URL:** Once done, Vercel will give you a domain (e.g., `https://nexorith-abc123.vercel.app`).

---

## Part 4: Finalizing CORS & Authentication Connection

Because the frontend and backend are hosted on different domains, we need to explicitly tell the backend to accept requests and cookies from the Vercel frontend.

1. **Go Back to Render (Backend):**
2. Open your `nexorith-api` Web Service.
3. Go to **"Environment"**.
4. Add or update the `FRONTEND_ORIGIN` variable to match your exact Vercel URL:
   - **Key:** `FRONTEND_ORIGIN`
   - **Value:** `https://nexorith-abc123.vercel.app` (⚠️ **NO trailing slash! It must perfectly match the origin.**)
5. **Save Changes** and wait for Render to automatically redeploy the service.

---

## Post-Deployment Troubleshooting Checklist

If things aren't working smoothly in production, check these common culprits:

- [ ] **Admin Login fails silently / Nothing happens?** 
   - Open Browser Developer Tools -> Network tab. Look for the `/api/auth/login` request. 
   - Is it pointing to `localhost` by mistake? Ensure `NEXT_PUBLIC_API_URL` is set correctly in Vercel.
   - If you get a CORS error, your `FRONTEND_ORIGIN` in Render does not exactly match your Vercel URL.
- [ ] **Leads aren't showing up in Google Search?**
   - Ensure you update `NEXT_PUBLIC_SITE_URL` in Vercel. 
- [ ] **Can't log in due to password errors?**
   - Make sure you copied the full `bcrypt` hash (including `$2b$...`) into Render's `ADMIN_PASSWORD_HASH` variable.

## Custom Domains (Optional)
If you buy a domain (e.g., `nexorith.com`):
1. **Frontend:** Point it to Vercel via Vercel Settings -> Domains.
2. **Update Env Vars:** Update `NEXT_PUBLIC_SITE_URL` on Vercel and `FRONTEND_ORIGIN` on Render to use the new `https://nexorith.com`.
