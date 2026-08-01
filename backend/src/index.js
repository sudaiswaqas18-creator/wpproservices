import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { ensureDatabase } from './ensureDb.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5002;

await ensureDatabase().catch((err) => {
  console.error('Database bootstrap failed:', err.code || err.message);
  console.error('Fix: cd backend && .\\setup-db.ps1 -Password "YOUR_MYSQL_PASSWORD"');
  console.error('API will start anyway; routes may return 500 until MySQL is configured.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`WPServices API running on port ${PORT}`);
});
