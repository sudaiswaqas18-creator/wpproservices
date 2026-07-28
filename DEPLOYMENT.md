# WPProServices — VPS Deployment Guide (CloudPanel + Ubuntu)

> Step-by-step guide to deploy the full-stack app on a VPS running Ubuntu with CloudPanel.

---

## 📋 Table of Contents

1. [Server Requirements](#1-server-requirements)
2. [CloudPanel Site Setup](#2-cloudpanel-site-setup)
3. [Database Setup](#3-database-setup)
4. [Backend Deployment](#4-backend-deployment)
5. [Frontend Deployment](#5-frontend-deployment)
6. [Nginx Configuration](#6-nginx-configuration)
7. [PM2 Process Manager](#7-pm2-process-manager)
8. [SSL Certificate](#8-ssl-certificate)
9. [DNS Configuration](#9-dns-configuration)
10. [Post-Deployment Checklist](#10-post-deployment-checklist)

---

## 1. Server Requirements

| Requirement   | Minimum     | Recommended  |
| ------------- | ----------- | ------------ |
| OS            | Ubuntu 22.04| Ubuntu 24.04 |
| RAM           | 1 GB        | 2 GB+        |
| Disk          | 10 GB       | 20 GB+       |
| Node.js       | 18.x        | 20.x LTS     |
| MySQL         | 8.0         | 8.0+         |
| Nginx         | Included    | via CloudPanel |
| PM2           | Latest      | Latest       |

---

## 2. CloudPanel Site Setup

1. Login to CloudPanel at `https://your-server-ip:8443`
2. Create a new **Node.js site**:
   - **Domain**: `wpproservices.com`
   - **Node.js Version**: 20 LTS
   - **App Port**: `5002`
3. Note the site user and home directory (typically `/home/wpproservices/htdocs/wpproservices.com/`)

---

## 3. Database Setup

### 3a. Create Database via CloudPanel

1. Go to **Databases** → **Add Database**
2. Create:
   - **Database Name**: `wpservices_agency`
   - **Database User**: `wpservices_user`
   - **Password**: (generate a strong password — save it!)

### 3b. Import Schema

```bash
# SSH into your server
ssh your-user@your-server-ip

# Import the schema
mysql -u wpservices_user -p wpservices_agency < /home/wpproservices/htdocs/wpproservices.com/database/schema.sql
```

---

## 4. Backend Deployment

### 4a. Clone the Repository

```bash
cd /home/wpproservices/htdocs/wpproservices.com/
git clone https://github.com/YOUR_USERNAME/wpproservices.git .
# OR if the directory must be empty first:
# git init && git remote add origin ... && git pull origin main
```

### 4b. Configure Environment Variables

```bash
# Create backend .env from the example
cp backend/.env.example backend/.env
nano backend/.env
```

Fill in the production values:

```env
PORT=5002
DB_HOST=localhost
DB_USER=wpservices_user
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=wpservices_agency
DB_PORT=3306
DB_SSL=false
JWT_SECRET=GENERATE_64_CHAR_RANDOM_STRING
ADMIN_EMAIL=admin@wpproservices.com
ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
FRONTEND_URL=https://wpproservices.com,https://www.wpproservices.com
```

Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4c. Install Dependencies

```bash
# Install all dependencies (root workspaces + backend + frontend)
npm install --production=false
```

### 4d. Seed the Database

```bash
npm run seed -w backend
```

### 4e. Test the Backend

```bash
node backend/src/index.js
# Should print: WPServices API running on port 5002
# Test: curl http://localhost:5002/api/health
# Press Ctrl+C to stop
```

---

## 5. Frontend Deployment

### 5a. Configure Frontend Environment

```bash
cp frontend/.env.example frontend/.env.production
nano frontend/.env.production
```

Set the production API URL:
```env
VITE_API_URL=https://api.wpproservices.com
```

> **Option A (subdomain API)**: Use `https://api.wpproservices.com` — requires a separate Nginx server block.
>
> **Option B (same-domain API)**: Use an empty value and let Nginx proxy `/api` to the backend — simpler setup.

If using **Option B** (recommended), set:
```env
VITE_API_URL=
```

### 5b. Build the Frontend

```bash
cd frontend
npm run build
cd ..
```

The build output will be in `frontend/dist/`.

---

## 6. Nginx Configuration

### Option B: Single Domain (Recommended)

This serves the frontend and proxies `/api` requests to the backend on the same domain.

Create or edit the Nginx config in CloudPanel → Vhost:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name wpproservices.com www.wpproservices.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name wpproservices.com www.wpproservices.com;

    # SSL certificates (managed by CloudPanel / Let's Encrypt)
    ssl_certificate     /etc/letsencrypt/live/wpproservices.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wpproservices.com/privkey.pem;

    # Frontend (static files)
    root /home/wpproservices/htdocs/wpproservices.com/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # API proxy → Backend on port 5002
    location /api/ {
        proxy_pass http://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
    }

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### Option A: Subdomain API

If using `api.wpproservices.com`, add a second server block:

```nginx
server {
    listen 443 ssl http2;
    server_name api.wpproservices.com;

    ssl_certificate     /etc/letsencrypt/live/api.wpproservices.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.wpproservices.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After editing, test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. PM2 Process Manager

### Install PM2 globally

```bash
npm install -g pm2
```

### Start the backend

```bash
cd /home/wpproservices/htdocs/wpproservices.com/
pm2 start backend/src/index.js --name "wpproservices-api" --cwd .
```

### PM2 Useful Commands

```bash
pm2 status                          # Check running processes
pm2 logs wpproservices-api          # View logs
pm2 restart wpproservices-api       # Restart
pm2 stop wpproservices-api          # Stop
pm2 delete wpproservices-api        # Remove
```

### Auto-start on reboot

```bash
pm2 startup
pm2 save
```

---

## 8. SSL Certificate

### Via CloudPanel (easiest)

1. Go to CloudPanel → Your Site → **SSL/TLS**
2. Click **Actions** → **New Let's Encrypt Certificate**
3. Enter domains: `wpproservices.com`, `www.wpproservices.com`
4. If using subdomain API, also add: `api.wpproservices.com`

### Via Certbot (manual)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d wpproservices.com -d www.wpproservices.com
sudo certbot renew --dry-run
```

---

## 9. DNS Configuration

Add these DNS records at your domain registrar:

| Type  | Name  | Value             | TTL  |
| ----- | ----- | ----------------- | ---- |
| A     | @     | YOUR_SERVER_IP    | 3600 |
| A     | www   | YOUR_SERVER_IP    | 3600 |
| A     | api   | YOUR_SERVER_IP    | 3600 |

---

## 10. Post-Deployment Checklist

```
[ ] Database imported and tables exist
[ ] Backend .env configured with production values
[ ] Backend starts without errors (pm2 logs)
[ ] Frontend built successfully (dist/ exists)
[ ] Frontend .env.production configured
[ ] Nginx config tested (nginx -t passes)
[ ] SSL certificate installed
[ ] DNS records pointing to server
[ ] https://wpproservices.com loads the frontend
[ ] https://wpproservices.com/api/health returns { "status": "ok" }
[ ] Admin login works at /admin
[ ] Contact form submits successfully
[ ] PM2 auto-start configured (pm2 save + pm2 startup)
[ ] www → non-www redirect working (or vice versa)
```

---

## 🔄 Updating the Site

When pushing new code:

```bash
cd /home/wpproservices/htdocs/wpproservices.com/

# Pull latest code
git pull origin main

# If backend code changed:
npm install -w backend
pm2 restart wpproservices-api

# If frontend code changed:
npm install -w frontend
cd frontend && npm run build && cd ..

# If database schema changed:
mysql -u wpservices_user -p wpservices_agency < database/schema.sql
```

---

*Document prepared for Zain — VPS deployment of wpproservices.com*
