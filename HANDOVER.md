# WPProServices — Developer Handover Document

> **To**: Zain (Deployer)
> **From**: [Project Owner]
> **Date**: July 28, 2026
> **Domain**: wpproservices.com

---

## 📦 What's Included in This Repository

| Item                           | Location                                        | Status   |
| ------------------------------ | ----------------------------------------------- | -------- |
| React + TypeScript frontend    | `frontend/`                                     | ✅ Ready |
| Node.js + Express API backend  | `backend/`                                      | ✅ Ready |
| Database schema (15 tables)    | `database/schema.sql`                           | ✅ Ready |
| Seed data script               | `backend/src/seed.js`                           | ✅ Ready |
| Environment variable templates | `backend/.env.example`, `frontend/.env.example` | ✅ Ready |
| Nginx configuration example    | `DEPLOYMENT.md`                                 | ✅ Ready |
| Full deployment instructions   | `DEPLOYMENT.md`                                 | ✅ Ready |
| API documentation              | `README.md`                                     | ✅ Ready |

---

## 🚀 What You (Zain) Need to Do

### High-Level Steps

1. **Set up the VPS** — Ubuntu + CloudPanel, Node.js 20, MySQL 8
2. **Clone the repo** from GitHub
3. **Create the MySQL database** (`wpservices_agency`)
4. **Import the schema** from `database/schema.sql`
5. **Configure environment variables** in `backend/.env` and `frontend/.env.production`
6. **Install dependencies** — `npm install`
7. **Seed the database** — `npm run seed -w backend`
8. **Build the frontend** — `cd frontend && npm run build`
9. **Set up PM2** for the backend process
10. **Configure Nginx** to serve frontend + proxy API
11. **Install SSL** certificate (Let's Encrypt)
12. **Point DNS** to the server

> 📖 Detailed commands for every step are in [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🔑 What You Need From Me (Project Owner)

Before deploying, ask me for:

| Item                    | Why You Need It                           |
| ----------------------- | ----------------------------------------- |
| GitHub repo access      | To clone the code                         |
| Database password       | To set in `backend/.env` DB_PASSWORD      |
| Admin email & password  | To set in `backend/.env` for first admin  |
| JWT secret              | Or generate one with `crypto.randomBytes` |
| Domain registrar access | To update DNS A records                   |
| CloudPanel login        | If I need to grant you access             |

---

## 🔒 Security Notes

1. **Never commit `.env` files** — they are in `.gitignore`
2. **Change the JWT_SECRET** — generate a 64+ character random string
3. **Change ADMIN_PASSWORD** — use a strong password before seeding
4. **CORS is configured** — make sure `FRONTEND_URL` in backend `.env` matches your domain
5. **The fallback JWT secret** (`pixelforge_secret`) in code is only a dev fallback — always set `JWT_SECRET` in `.env`

---

## ✅ Testing Checklist After Deployment

Run through these checks after deploying:

```
Public Pages:
[ ] Homepage loads with all sections (hero, services, testimonials, etc.)
[ ] Services page loads and individual service detail pages work
[ ] Blog page loads and individual blog posts work
[ ] Case studies page loads and detail pages work
[ ] Products page loads and detail pages work
[ ] Tools and Guidebooks pages work
[ ] Pricing page displays plans
[ ] Contact form submits successfully
[ ] About page loads
[ ] Privacy Policy, Terms of Service, Cookie Policy pages load
[ ] 404 page shows for invalid URLs

API Health:
[ ] GET /api/health returns { "status": "ok" }
[ ] All public API endpoints return data (not errors)

Admin Panel:
[ ] /admin redirects to login
[ ] Login works with configured credentials
[ ] Dashboard shows correct counts
[ ] Can create, edit, delete blog posts
[ ] Can create, edit, delete services
[ ] Can view and delete contact leads
[ ] All admin CRUD operations work

Infrastructure:
[ ] HTTPS works (no mixed content warnings)
[ ] www redirects to non-www (or vice versa)
[ ] API proxy works through Nginx
[ ] PM2 auto-restart is configured
[ ] Site loads on mobile devices
```

---

## 🏗 Architecture Overview

```
Browser → Nginx (port 443)
             ├── Static files → frontend/dist/ (React SPA)
             └── /api/* → proxy_pass → Node.js (port 5002)
                                         └── MySQL (port 3306)
```

- **Frontend** is a static SPA — Nginx serves the built `dist/` folder
- **Backend** is a Node.js Express server running on port 5002
- **Nginx** handles SSL, static files, and reverse-proxies API requests
- **PM2** keeps the backend alive and auto-restarts on crash

---

## 📞 Contact If Issues

If you encounter problems during deployment:

- **Email**: info@technogiallc.com
- **Phone**: +1 (904) 243-5044

Common issues and solutions are documented in the [README.md troubleshooting section](./README.md#-troubleshooting).

---

_Thank you, Zain!_
