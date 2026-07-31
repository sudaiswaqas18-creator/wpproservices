CREATE DATABASE IF NOT EXISTS wpservices_agency;
USE wpservices_agency;

CREATE TABLE IF NOT EXISTS contact_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(150) NOT NULL,
  budget VARCHAR(50) NOT NULL,
  project_details TEXT NOT NULL,
  privacy_accepted TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  company VARCHAR(150) NOT NULL,
  country VARCHAR(80) NOT NULL,
  quote TEXT NOT NULL,
  metric_label VARCHAR(100),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS case_studies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  client VARCHAR(150) NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  full_content TEXT,
  image_url VARCHAR(300),
  metric1_label VARCHAR(80),
  metric1_value VARCHAR(30),
  metric2_label VARCHAR(80),
  metric2_value VARCHAR(30),
  metric3_label VARCHAR(80),
  metric3_value VARCHAR(30),
  slug VARCHAR(200) UNIQUE,
  is_featured TINYINT(1) DEFAULT 0,
  tech_stack VARCHAR(200),
  result_summary VARCHAR(300),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  subtitle VARCHAR(200),
  description TEXT NOT NULL,
  hero_title VARCHAR(250),
  hero_description TEXT,
  full_content TEXT,
  features JSON,
  icon VARCHAR(50) DEFAULT 'code',
  image_url VARCHAR(300),
  category_group VARCHAR(20) DEFAULT 'build',
  category_section VARCHAR(30) DEFAULT 'setup',
  is_new TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tagline TEXT,
  price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50),
  discount_label VARCHAR(50),
  is_best_seller TINYINT(1) DEFAULT 0,
  features JSON NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  page_slug VARCHAR(100) DEFAULT 'home',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(100) DEFAULT 'WPProServices Team',
  image_url VARCHAR(300),
  published_at DATE,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS industries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  has_case_study TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(80),
  image_url VARCHAR(300),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  subtitle VARCHAR(200),
  description TEXT NOT NULL,
  full_content TEXT,
  features JSON,
  category VARCHAR(40) DEFAULT 'conversion',
  price VARCHAR(50),
  rating VARCHAR(20),
  rating_count VARCHAR(30),
  image_url VARCHAR(300),
  buy_url VARCHAR(300),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  full_content TEXT,
  icon VARCHAR(50) DEFAULT 'wrench',
  is_new TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS guidebooks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  download_url VARCHAR(300),
  image_url VARCHAR(300),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS awards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  organization VARCHAR(100) NOT NULL,
  year VARCHAR(40),
  badge_label VARCHAR(50),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stat_key VARCHAR(50) UNIQUE NOT NULL,
  stat_value VARCHAR(30) NOT NULL,
  stat_label VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);
