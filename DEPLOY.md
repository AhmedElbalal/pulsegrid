# PulseGrid — Render.com Deployment Guide

This guide deploys the API (Express + Socket.IO + Prisma) and four frontends (Shell host + 3 MFEs) to **Render.com**.

## 0) Prereqs
- Node 22+, npm 10+
- Docker (optional, for local dev only)
- A GitHub account connected to Render

## 1) Get the code into GitHub
```bash
unzip pulsegrid.zip
cd pulsegrid
npm i
git init
git add .
git commit -m "Initial commit"
git branch -M main
# requires GitHub CLI; otherwise create repo manually
gh repo create pulsegrid --public --source=. --remote=origin
git push -u origin main
```

## 2) Create Managed Postgres on Render
- In Render, click **New → PostgreSQL**.
- Name: `pulsegrid-db`
- After creation, copy the **Internal Connection String** as `DATABASE_URL`.

## 3) Deploy the API
- **New → Web Service**
- Connect GitHub repo → `pulsegrid`
- **Name**: `pulsegrid-api`
- **Root Directory**: `api`
- **Build Command**:
  ```bash
  npm install && npx prisma generate --schema=api/prisma/schema.prisma && npm run build --workspace=@pulsegrid/api
  ```
- **Start Command**:
  ```bash
  npm run start --workspace=@pulsegrid/api
  ```
- **Environment Variables**:
  ```
  DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/pulsegrid
  JWT_SECRET=your_secret
  CORS_ORIGIN=https://<your-shell>.onrender.com,https://<your-dashboard>.onrender.com,https://<your-reports>.onrender.com,https://<your-collab>.onrender.com
  PORT=3001
  ```
- Click **Create Web Service**.
- After first build, run migrations via Render **Shell**:
  ```bash
  npx prisma migrate deploy --schema=api/prisma/schema.prisma
  ```
- (Optional) Seed sample data:
  ```bash
  node -e "console.log('Set API_URL and run from local: npm run -w scripts seed (requires DB access)')"
  ```

## 4) Deploy the MFEs (Static Sites)
For each app below, create a **Static Site**.

### 4.1 Shell
- **Name**: `pulsegrid-shell`
- **Root Directory**: `shell`
- **Build Command**:
  ```bash
  npm install && npm run build --workspace=@pulsegrid/shell
  ```
- **Publish Directory**: `shell/dist`
- **Environment Variables**:
  ```
  VITE_API_URL=https://<your-api>.onrender.com
  VITE_SOCKET_URL=https://<your-api>.onrender.com
  ```

### 4.2 Dashboard
- **Root**: `apps/dashboard`
- **Build**:
  ```bash
  npm install && npm run build --workspace=@pulsegrid/app-dashboard
  ```
- **Publish**: `apps/dashboard/dist`
- **Env**:
  ```
  VITE_API_URL=https://<your-api>.onrender.com
  VITE_SOCKET_URL=https://<your-api>.onrender.com
  ```

### 4.3 Reports
- **Root**: `apps/reports`
- **Build**:
  ```bash
  npm install && npm run build --workspace=@pulsegrid/app-reports
  ```
- **Publish**: `apps/reports/dist`
- **Env**:
  ```
  VITE_API_URL=https://<your-api>.onrender.com
  ```

### 4.4 Collab
- **Root**: `apps/collab`
- **Build**:
  ```bash
  npm install && npm run build --workspace=@pulsegrid/app-collab
  ```
- **Publish**: `apps/collab/dist`
- **Env**:
  ```
  VITE_SOCKET_URL=https://<your-api>.onrender.com
  ```

## 5) Wire Shell → Remotes in Production
Update `shell/vite.config.ts` in a follow-up commit to point at your deployed remotes, e.g.:
```ts
remotes: {
  dashboard: "https://<dashboard>.onrender.com/assets/remoteEntry.js",
  reports: "https://<reports>.onrender.com/assets/remoteEntry.js",
  collab: "https://<collab>.onrender.com/assets/remoteEntry.js"
}
```
Then rebuild the shell static site.

## 6) Smoke Test
```bash
curl https://<your-api>.onrender.com/api/health
# open shell site and navigate to /dashboard, /reports, /collab
```

## 7) Notes
- Render serves static sites from a CDN; Socket.IO works over HTTPS via the API URL.
- Keep JWT secrets rotated. Never commit `.env` to git.
- Prisma client is generated during API build; migrations are run once on deploy.
