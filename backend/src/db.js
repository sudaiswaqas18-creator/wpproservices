import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'wpservices_agency',
  port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

export default pool;
