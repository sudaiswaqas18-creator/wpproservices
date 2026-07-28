import pool from './db.js';
import { runSeed } from './seed.js';

export async function ensureDatabase() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM products');
    if (Number(rows[0]?.count) > 0) return;
  } catch (err) {
    if (err.code !== 'ER_NO_SUCH_TABLE' && err.code !== 'ER_BAD_DB_ERROR') throw err;
  }

  console.log('Database tables missing — running bootstrap seed...');
  await runSeed({ fresh: true });
  console.log('Bootstrap seed complete.');
}
