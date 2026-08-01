import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const host = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
const useSsl =
  process.env.DB_SSL === 'true' ||
  (Boolean(host) && host !== 'localhost' && host !== '127.0.0.1');

const pool = mysql.createPool({
  host,
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'wpservices_agency',
  port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
  waitForConnections: true,
  // Serverless (Vercel) should keep pools tiny; local/Railway can use more.
  connectionLimit: process.env.VERCEL ? 1 : 10,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

export default pool;
