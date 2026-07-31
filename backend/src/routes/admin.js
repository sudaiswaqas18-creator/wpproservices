import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { authMiddleware, signToken } from '../middleware/auth.js';
import { slugify, parseJsonField } from '../utils.js';
import { syncSiteContent } from '../ensureDb.js';

const router = Router();

// ─── Auth ───────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email.trim()]);
  if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

  const admin = rows[0];
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({
    token: signToken(admin),
    admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  });
});

router.get('/me', authMiddleware, async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, role FROM admins WHERE id = ?', [req.admin.id]);
  if (!rows.length) return res.status(404).json({ error: 'Admin not found' });
  res.json(rows[0]);
});

// ─── Dashboard Stats ────────────────────────────────
router.get('/stats', authMiddleware, async (_req, res) => {
  const tables = ['blog_posts', 'case_studies', 'services', 'testimonials', 'portfolio_items', 'faqs', 'contact_leads', 'products', 'tools', 'guidebooks'];
  const stats = {};
  for (const t of tables) {
    const [[{ count }]] = await pool.query(`SELECT COUNT(*) as count FROM ${t}`);
    stats[t] = count;
  }
  res.json(stats);
});

// Sync WooCommerce plugins + clear placeholder testimonials (Railway + local)
router.post('/sync-plugin-catalog', authMiddleware, async (_req, res) => {
  await syncSiteContent();
  const [[{ count }]] = await pool.query('SELECT COUNT(*) as count FROM products');
  const [[{ testimonials }]] = await pool.query('SELECT COUNT(*) as testimonials FROM testimonials');
  res.json({ message: 'Plugin catalog synced', products: count, testimonials });
});

// ─── Blog CRUD ──────────────────────────────────────
router.get('/blogs', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY sort_order, published_at DESC');
  res.json(rows);
});

router.post('/blogs', authMiddleware, async (req, res) => {
  const { title, slug, excerpt, content, author, image_url, published_at, sort_order } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
  const finalSlug = slug?.trim() || slugify(title);
  const [result] = await pool.query(
    `INSERT INTO blog_posts (title, slug, excerpt, content, author, image_url, published_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [title.trim(), finalSlug, excerpt || '', content || '', author || 'WPProServices Team', image_url || '', published_at || new Date().toISOString().slice(0, 10), sort_order || 0]
  );
  res.status(201).json({ id: result.insertId, message: 'Blog post created' });
});

router.put('/blogs/:id', authMiddleware, async (req, res) => {
  const { title, slug, excerpt, content, author, image_url, published_at, sort_order } = req.body;
  await pool.query(
    `UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, author=?, image_url=?, published_at=?, sort_order=? WHERE id=?`,
    [title, slug || slugify(title), excerpt, content, author, image_url, published_at, sort_order || 0, req.params.id]
  );
  res.json({ message: 'Blog post updated' });
});

router.delete('/blogs/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
  res.json({ message: 'Blog post deleted' });
});

// ─── Case Studies CRUD ──────────────────────────────
router.get('/case-studies', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM case_studies ORDER BY sort_order');
  res.json(rows);
});

router.post('/case-studies', authMiddleware, async (req, res) => {
  const b = req.body;
  if (!b.title?.trim()) return res.status(400).json({ error: 'Title required' });
  const [result] = await pool.query(
    `INSERT INTO case_studies (title, client, challenge, solution, full_content, image_url, metric1_label, metric1_value, metric2_label, metric2_value, metric3_label, metric3_value, slug, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [b.title, b.client, b.challenge, b.solution, b.full_content, b.image_url, b.metric1_label, b.metric1_value, b.metric2_label, b.metric2_value, b.metric3_label, b.metric3_value, b.slug || slugify(b.title), b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/case-studies/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE case_studies SET title=?, client=?, challenge=?, solution=?, full_content=?, image_url=?, metric1_label=?, metric1_value=?, metric2_label=?, metric2_value=?, metric3_label=?, metric3_value=?, slug=?, sort_order=? WHERE id=?`,
    [b.title, b.client, b.challenge, b.solution, b.full_content, b.image_url, b.metric1_label, b.metric1_value, b.metric2_label, b.metric2_value, b.metric3_label, b.metric3_value, b.slug, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/case-studies/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM case_studies WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Services CRUD ──────────────────────────────────
router.get('/services', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order');
  res.json(rows.map((s) => ({ ...s, features: parseJsonField(s.features) })));
});

router.post('/services', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO services (title, slug, subtitle, description, hero_title, hero_description, full_content, features, icon, image_url, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [b.title, b.slug || slugify(b.title), b.subtitle, b.description, b.hero_title, b.hero_description, b.full_content, JSON.stringify(b.features || []), b.icon || 'code', b.image_url, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/services/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE services SET title=?, slug=?, subtitle=?, description=?, hero_title=?, hero_description=?, full_content=?, features=?, icon=?, image_url=?, sort_order=? WHERE id=?`,
    [b.title, b.slug, b.subtitle, b.description, b.hero_title, b.hero_description, b.full_content, JSON.stringify(b.features || []), b.icon, b.image_url, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/services/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Testimonials CRUD ──────────────────────────────
router.get('/testimonials', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY sort_order');
  res.json(rows);
});

router.post('/testimonials', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO testimonials (name, company, country, quote, metric_label, sort_order) VALUES (?,?,?,?,?,?)`,
    [b.name, b.company, b.country, b.quote, b.metric_label, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/testimonials/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE testimonials SET name=?, company=?, country=?, quote=?, metric_label=?, sort_order=? WHERE id=?`,
    [b.name, b.company, b.country, b.quote, b.metric_label, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Portfolio CRUD ───────────────────────────────────
router.get('/portfolio', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM portfolio_items ORDER BY sort_order');
  res.json(rows);
});

router.post('/portfolio', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO portfolio_items (title, category, image_url, sort_order) VALUES (?,?,?,?)`,
    [b.title, b.category, b.image_url, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/portfolio/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE portfolio_items SET title=?, category=?, image_url=?, sort_order=? WHERE id=?`,
    [b.title, b.category, b.image_url, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/portfolio/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM portfolio_items WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── FAQs CRUD ──────────────────────────────────────
router.get('/faqs', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM faqs ORDER BY sort_order');
  res.json(rows);
});

router.post('/faqs', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO faqs (question, answer, page_slug, sort_order) VALUES (?,?,?,?)`,
    [b.question, b.answer, b.page_slug || 'home', b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/faqs/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE faqs SET question=?, answer=?, page_slug=?, sort_order=? WHERE id=?`,
    [b.question, b.answer, b.page_slug, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/faqs/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Contact Leads (read + delete) ────────────────────
router.get('/leads', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM contact_leads ORDER BY created_at DESC');
  res.json(rows);
});

router.delete('/leads/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM contact_leads WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Products CRUD ────────────────────────────────────
router.get('/products', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY sort_order');
  res.json(rows.map((p) => ({ ...p, features: parseJsonField(p.features) })));
});

router.post('/products', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO products (title, slug, subtitle, description, full_content, features, category, price, rating, rating_count, image_url, buy_url, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [b.title, b.slug || slugify(b.title), b.subtitle, b.description, b.full_content, JSON.stringify(b.features || []), b.category || 'conversion', b.price, b.rating, b.rating_count, b.image_url, b.buy_url, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/products/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE products SET title=?, slug=?, subtitle=?, description=?, full_content=?, features=?, category=?, price=?, rating=?, rating_count=?, image_url=?, buy_url=?, sort_order=? WHERE id=?`,
    [b.title, b.slug, b.subtitle, b.description, b.full_content, JSON.stringify(b.features || []), b.category || 'conversion', b.price, b.rating, b.rating_count, b.image_url, b.buy_url, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/products/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Tools CRUD ───────────────────────────────────────
router.get('/tools', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM tools ORDER BY sort_order');
  res.json(rows);
});

router.post('/tools', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO tools (title, slug, description, full_content, icon, is_new, sort_order) VALUES (?,?,?,?,?,?,?)`,
    [b.title, b.slug || slugify(b.title), b.description, b.full_content, b.icon || 'wrench', b.is_new ? 1 : 0, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/tools/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE tools SET title=?, slug=?, description=?, full_content=?, icon=?, is_new=?, sort_order=? WHERE id=?`,
    [b.title, b.slug, b.description, b.full_content, b.icon, b.is_new ? 1 : 0, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/tools/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM tools WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// ─── Guidebooks CRUD ──────────────────────────────────
router.get('/guidebooks', authMiddleware, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM guidebooks ORDER BY sort_order');
  res.json(rows);
});

router.post('/guidebooks', authMiddleware, async (req, res) => {
  const b = req.body;
  const [result] = await pool.query(
    `INSERT INTO guidebooks (title, slug, description, content, download_url, image_url, sort_order) VALUES (?,?,?,?,?,?,?)`,
    [b.title, b.slug || slugify(b.title), b.description, b.content, b.download_url, b.image_url, b.sort_order || 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/guidebooks/:id', authMiddleware, async (req, res) => {
  const b = req.body;
  await pool.query(
    `UPDATE guidebooks SET title=?, slug=?, description=?, content=?, download_url=?, image_url=?, sort_order=? WHERE id=?`,
    [b.title, b.slug, b.description, b.content, b.download_url, b.image_url, b.sort_order || 0, req.params.id]
  );
  res.json({ message: 'Updated' });
});

router.delete('/guidebooks/:id', authMiddleware, async (req, res) => {
  await pool.query('DELETE FROM guidebooks WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

export default router;
