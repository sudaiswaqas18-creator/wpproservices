# WPProServices — WordPress Development Agency

A modern, full-stack web application for **WPProServices** (wpproservices.com) — a WordPress development agency site with an integrated admin panel for content management.

---

## 🛠 Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React 18, TypeScript, Vite 6, TailwindCSS 3, Framer Motion |
| Backend    | Node.js (ES Modules), Express 4                          |
| Database   | MySQL 8.x (via `mysql2`)                                 |
| Auth       | JWT (jsonwebtoken) + bcryptjs                            |
| Deployment | VPS (Ubuntu) with CloudPanel, Nginx, PM2                 |

---

## 📁 Project Structure

```
wpproservices/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── index.js            # Entry point — Express app + routes
│   │   ├── db.js               # MySQL connection pool
│   │   ├── ensureDb.js         # Auto-bootstrap tables if empty
│   │   ├── schema.sql          # Legacy schema (see database/ instead)
│   │   ├── seed.js             # Full seed data
│   │   ├── seed-extended.js    # Extended seed data
│   │   ├── utils.js            # slugify, parseJsonField
│   │   ├── validation.js       # Contact form server-side validation
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT auth middleware + signToken
│   │   └── routes/
│   │       └── admin.js        # All admin CRUD endpoints
│   ├── .env.example            # ← Environment variable template
│   ├── package.json
│   ├── railway.json            # Railway deploy config (optional)
│   └── setup-db.ps1            # Windows PowerShell DB setup script
│
├── frontend/                   # React + Vite SPA
│   ├── public/                 # Static assets, favicons, logos
│   ├── scripts/                # Favicon generation scripts
│   ├── src/
│   │   ├── App.tsx             # Router + route definitions
│   │   ├── main.tsx            # React entry point
│   │   ├── index.css           # Global styles
│   │   ├── api/                # API client (client.ts, admin.ts, fallback.ts)
│   │   ├── components/         # 40+ UI components
│   │   │   ├── admin/          # Admin panel components
│   │   │   ├── layout/         # Layout wrapper
│   │   │   ├── legal/          # Legal page layout
│   │   │   ├── seo/            # SEO + structured data
│   │   │   └── ui/             # Reusable UI primitives
│   │   ├── config/             # API URL, SEO, site constants
│   │   ├── context/            # AuthContext (React Context)
│   │   ├── data/               # Static enrichment data
│   │   ├── hooks/              # Custom hooks (useApiData)
│   │   ├── pages/              # 19 page components
│   │   │   └── admin/          # 13 admin page components
│   │   ├── styles/             # Font imports
│   │   └── utils/              # Client-side utilities
│   ├── .env.example            # ← Environment variable template
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── database/
│   └── schema.sql              # Production-ready DB schema (15 tables)
│
├── .gitignore
├── package.json                # Root workspace (npm workspaces)
├── DEPLOYMENT.md               # VPS deployment guide
├── HANDOVER.md                 # Developer handover notes
└── README.md                   # ← You are here
```

---

## 📋 Prerequisites

| Requirement | Minimum Version |
| ----------- | --------------- |
| Node.js     | 18.x LTS+      |
| npm         | 9.x+           |
| MySQL       | 8.0+           |
| Git         | 2.x+           |

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/wpproservices.git
cd wpproservices
```

### 2. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MySQL credentials

# Frontend
cp frontend/.env.example frontend/.env.development
# For local dev, set: VITE_API_URL=http://localhost:5002
# Or leave empty to use Vite proxy (recommended)
```

### 3. Create the database

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS wpservices_agency;"
mysql -u root -p wpservices_agency < database/schema.sql
```

### 4. Install dependencies

```bash
npm install          # Installs root + all workspaces
```

### 5. Seed the database

```bash
npm run seed         # Populates tables with initial data
```

### 6. Start development servers

```bash
npm run dev          # Starts backend (port 5002) + frontend (port 5173)
```

Visit: **http://localhost:5173**
Admin panel: **http://localhost:5173/admin**

---

## 🗄 Database Tables

The app uses **15 MySQL tables**:

| Table             | Purpose                           |
| ----------------- | --------------------------------- |
| `admins`          | Admin user accounts (hashed pass) |
| `blog_posts`      | Blog articles                     |
| `case_studies`    | Client case studies               |
| `contact_leads`   | Contact form submissions          |
| `faqs`            | FAQ entries (per page)            |
| `guidebooks`      | Downloadable guidebooks           |
| `industries`      | Industry categories               |
| `portfolio_items` | Portfolio showcase items          |
| `pricing_plans`   | Service pricing tiers             |
| `products`        | Digital products                  |
| `services`        | Service offerings                 |
| `site_stats`      | Homepage statistics               |
| `testimonials`    | Client testimonials               |
| `tools`           | Tools & utilities                 |
| `awards`          | Company awards/badges             |

---

## 🔐 Environment Variables Reference

### Backend (`backend/.env`)

| Variable         | Description                     | Example                         |
| ---------------- | ------------------------------- | ------------------------------- |
| `PORT`           | API server port                 | `5002`                          |
| `DB_HOST`        | MySQL host                      | `localhost`                     |
| `DB_USER`        | MySQL username                  | `wpservices_user`               |
| `DB_PASSWORD`    | MySQL password                  | `strong_password_here`          |
| `DB_NAME`        | Database name                   | `wpservices_agency`             |
| `DB_PORT`        | MySQL port                      | `3306`                          |
| `DB_SSL`         | Enable SSL for DB               | `false`                         |
| `JWT_SECRET`     | JWT signing secret (64+ chars)  | `crypto.randomBytes(64)...`     |
| `ADMIN_EMAIL`    | Default admin email (for seed)  | `admin@wpproservices.com`       |
| `ADMIN_PASSWORD` | Default admin password (seed)   | `YourStrongPass!2024`           |
| `FRONTEND_URL`   | Allowed CORS origins (comma-sep)| `https://wpproservices.com`     |

### Frontend (`frontend/.env.production`)

| Variable       | Description               | Example                            |
| -------------- | ------------------------- | ---------------------------------- |
| `VITE_API_URL` | Backend API base URL      | `https://api.wpproservices.com`    |

---

## 🖥 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full VPS deployment guide with:
- Server requirements
- Nginx configuration
- PM2 process management
- SSL setup
- Database import

---

## 🔑 Admin Panel

- **URL**: `https://wpproservices.com/admin`
- **Default credentials** are set via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env` before running `npm run seed`.
- Manages: Blogs, Services, Products, Case Studies, Testimonials, Portfolio, FAQs, Tools, Guidebooks, Contact Leads

---

## 🧪 API Endpoints

### Public Endpoints
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/api/health`                  | Health check                 |
| GET    | `/api/services`                | All services                 |
| GET    | `/api/services/grouped`        | Services grouped by category |
| GET    | `/api/services/:slug`          | Single service               |
| GET    | `/api/blog`                    | All blog posts               |
| GET    | `/api/blog/:slug`              | Single blog post             |
| GET    | `/api/case-studies`            | All case studies             |
| GET    | `/api/case-studies/:slug`      | Single case study            |
| GET    | `/api/testimonials`            | All testimonials             |
| GET    | `/api/pricing`                 | Pricing plans                |
| GET    | `/api/faqs?page=home`          | FAQs by page                 |
| GET    | `/api/products`                | All products                 |
| GET    | `/api/products/:slug`          | Single product               |
| GET    | `/api/tools`                   | All tools                    |
| GET    | `/api/tools/:slug`             | Single tool                  |
| GET    | `/api/guidebooks`              | All guidebooks               |
| GET    | `/api/guidebooks/:slug`        | Single guidebook             |
| GET    | `/api/industries`              | All industries               |
| GET    | `/api/portfolio`               | All portfolio items          |
| GET    | `/api/awards`                  | All awards                   |
| GET    | `/api/site-stats`              | Site statistics              |
| POST   | `/api/contact`                 | Submit contact form          |

### Admin Endpoints (JWT required)
| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| POST   | `/api/admin/login`             | Admin login          |
| GET    | `/api/admin/me`                | Current admin info   |
| GET    | `/api/admin/stats`             | Dashboard statistics |
| CRUD   | `/api/admin/blogs`             | Blog management      |
| CRUD   | `/api/admin/services`          | Service management   |
| CRUD   | `/api/admin/case-studies`      | Case study mgmt      |
| CRUD   | `/api/admin/testimonials`      | Testimonial mgmt     |
| CRUD   | `/api/admin/portfolio`         | Portfolio mgmt       |
| CRUD   | `/api/admin/faqs`              | FAQ management       |
| CRUD   | `/api/admin/products`          | Product mgmt         |
| CRUD   | `/api/admin/tools`             | Tool management      |
| CRUD   | `/api/admin/guidebooks`        | Guidebook mgmt       |
| GET/DEL| `/api/admin/leads`             | Contact leads        |

---

## 🐛 Troubleshooting

| Problem                        | Solution                                                |
| ------------------------------ | ------------------------------------------------------- |
| `ECONNREFUSED` on API calls    | Check MySQL is running and `.env` credentials are correct |
| CORS errors in browser         | Add your frontend URL to `FRONTEND_URL` in backend `.env` |
| `ER_NO_SUCH_TABLE`             | Run `mysql -u root -p wpservices_agency < database/schema.sql` |
| Empty pages / no data          | Run `npm run seed -w backend` to populate tables        |
| Frontend build fails           | Check TypeScript errors: `npx tsc -b` in `frontend/`   |
| Port 5002 already in use       | Change `PORT` in `backend/.env` or kill the process     |
| Admin login fails              | Re-run seed: `npm run seed -w backend`                  |

---

## 📞 Contact

- **Project Owner**: [M.Sudais]
- **Email**: info@technogiallc.com
- **Domain**: wpproservices.com

---

*Built with ❤️ by WPProServices*
