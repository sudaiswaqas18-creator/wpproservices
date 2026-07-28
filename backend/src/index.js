import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import adminRoutes from './routes/admin.js';
import { parseJsonField } from './utils.js';
import { validateContactPayload, firstError } from './validation.js';
import { ensureDatabase } from './ensureDb.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5002;

const allowedOrigins = [
  ...(process.env.FRONTEND_URL || '').split(',').map((u) => u.trim()).filter(Boolean),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(null, false);
  },
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', message: 'WPServices API is running' });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database connection failed' });
  }
});

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.error(`[API Error ${req.path}]:`, err.message);
    res.status(503).json({ error: 'Database unavailable or query failed' });
  }
};

// Public routes
app.get('/api/testimonials', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/case-studies', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM case_studies ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/case-studies/featured/list', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM case_studies WHERE is_featured = 1 ORDER BY sort_order LIMIT 6');
  res.json(rows);
}));

app.get('/api/case-studies/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM case_studies WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Case study not found' });
  res.json(rows[0]);
}));

app.get('/api/services', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order');
  res.json(rows.map((s) => ({ ...s, features: parseJsonField(s.features) })));
}));

app.get('/api/services/grouped', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order');
  const services = rows.map((s) => ({ ...s, features: parseJsonField(s.features), is_new: Boolean(s.is_new) }));
  const grouped = { build: {}, manage: {}, enhance: {} };
  for (const s of services) {
    const g = s.category_group || 'build';
    const sec = s.category_section || 'setup';
    if (!grouped[g]) grouped[g] = {};
    if (!grouped[g][sec]) grouped[g][sec] = [];
    grouped[g][sec].push(s);
  }
  res.json(grouped);
}));

app.get('/api/services/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Service not found' });
  res.json({ ...rows[0], features: parseJsonField(rows[0].features) });
}));

app.get('/api/pricing', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM pricing_plans ORDER BY sort_order');
  res.json(rows.map((p) => ({
    ...p,
    features: parseJsonField(p.features),
    is_best_seller: Boolean(p.is_best_seller),
  })));
}));

app.get('/api/faqs', asyncHandler(async (req, res) => {
  const page = req.query.page || 'home';
  const [rows] = await pool.query('SELECT * FROM faqs WHERE page_slug = ? ORDER BY sort_order', [page]);
  res.json(rows);
}));

app.get('/api/blog', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT id, title, slug, excerpt, image_url, published_at, author FROM blog_posts ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/blog/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Post not found' });
  res.json(rows[0]);
}));

app.get('/api/industries', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM industries ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/products', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY sort_order');
  res.json(rows.map((p) => ({ ...p, features: parseJsonField(p.features) })));
}));

app.get('/api/products/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Product not found' });
  res.json({ ...rows[0], features: parseJsonField(rows[0].features) });
}));

app.get('/api/tools', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM tools ORDER BY sort_order');
  res.json(rows.map((t) => ({ ...t, is_new: Boolean(t.is_new) })));
}));

app.get('/api/tools/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tools WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Tool not found' });
  res.json({ ...rows[0], is_new: Boolean(rows[0].is_new) });
}));

app.get('/api/guidebooks', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM guidebooks ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/guidebooks/:slug', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM guidebooks WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Guidebook not found' });
  res.json(rows[0]);
}));

app.get('/api/awards', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM awards ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/site-stats', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM site_stats ORDER BY sort_order');
  res.json(rows);
}));

app.get('/api/portfolio', asyncHandler(async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM portfolio_items ORDER BY sort_order');
  res.json(rows);
}));

app.post('/api/contact', async (req, res) => {
  const fieldErrors = validateContactPayload(req.body);
  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ error: firstError(fieldErrors), errors: fieldErrors });
  }
  const { name, phone, email, budget, project_details } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO contact_leads (name, phone, email, budget, project_details, privacy_accepted) VALUES (?, ?, ?, ?, ?, ?)`,
      [name.trim(), phone?.trim() || null, email.trim(), budget, project_details.trim(), 1]
    );
    res.status(201).json({ success: true, message: 'Thank you! Our team will contact you within 24 hours.', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
});

// Admin routes (protected)
app.use('/api/admin', adminRoutes);

await ensureDatabase().catch((err) => {
  console.error('Database bootstrap failed:', err.code || err.message);
  console.error('Fix: cd backend && .\\setup-db.ps1 -Password "YOUR_MYSQL_PASSWORD"');
  console.error('API will start anyway; routes may return 500 until MySQL is configured.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`WPServices API running on port ${PORT}`);
});
