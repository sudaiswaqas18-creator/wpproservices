# 🚀 Quick Start Guide — WPProServices

Welcome! This guide walks you through running **WPProServices** on your local machine in 3 simple steps.

---

## ⚡ Option A: Local Frontend + Live/Remote API (Fastest — No MySQL needed!)

If you just want to run and test the frontend UI without setting up MySQL locally:

1. **Edit `frontend/.env.development`**:
   ```env
   VITE_API_URL=https://pixelforge-api-production.up.railway.app
   ```
2. **Start the frontend**:
   ```bash
   npm run dev:frontend
   ```
3. Open **`http://localhost:5173`** in your browser.

---

## 💻 Option B: Full-Stack Local Development (Frontend + Express + MySQL)

### Step 1: Install Dependencies
From the project root directory:
```bash
npm install
```

### Step 2: Configure Environment & Database
1. Copy the backend environment template:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Open `backend/.env` and enter your local MySQL credentials:
   ```env
   PORT=5002
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD
   DB_NAME=wpservices_agency
   JWT_SECRET=your_local_secret_key_12345
   ```
3. Create & seed the database:
   ```bash
   # Create database and tables
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS wpservices_agency;"
   mysql -u root -p wpservices_agency < database/schema.sql

   # Seed sample data
   npm run seed
   ```

### Step 3: Start Development Servers
Run both backend (port 5002) and frontend (port 5173) concurrently:
```bash
npm run dev
```
Visit **`http://localhost:5173`**

---

## ❓ Troubleshooting & Common Errors

| Error / Symptom | Cause | Solution |
| --------------- | ----- | -------- |
| **`[vite] http proxy error: /api/... ECONNREFUSED`** | Local backend server (port 5002) is NOT running or crashed. | Start backend with `npm run dev:backend` OR set `VITE_API_URL=https://pixelforge-api-production.up.railway.app` in `frontend/.env.development`. |
| **`Access denied for user 'root'@'localhost'`** | Incorrect MySQL username/password in `backend/.env`. | Update `DB_PASSWORD` in `backend/.env` to match your local MySQL installation. |
| **`ER_NO_SUCH_TABLE`** | Database exists but schema is not imported. | Run: `mysql -u root -p wpservices_agency < database/schema.sql` |
| **Port 5002 already in use** | Another process is using port 5002. | Change `PORT=5003` in `backend/.env` and update port in `frontend/vite.config.ts`. |
| **Admin login fails** | Database seed hasn't been executed. | Run `npm run seed` to generate default admin credentials. |

---

## 🛠 Useful Commands

```bash
npm run dev          # Run frontend + backend concurrently
npm run dev:frontend # Run frontend only
npm run dev:backend  # Run backend only
npm run build        # Build frontend for production (tsc -b + vite build)
npm run seed         # Populate MySQL database with fresh seed data
```
