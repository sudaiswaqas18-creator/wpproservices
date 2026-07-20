import { API_BASE } from '../config/api';

const TOKEN_KEY = 'pf_admin_token';
const ADMIN_KEY = 'pf_admin_user';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function adminFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/admin${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

export const adminApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Login failed');
    localStorage.setItem(TOKEN_KEY, json.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(json.admin));
    return json.admin as AdminUser;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  },

  getStoredAdmin: (): AdminUser | null => {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getToken,

  me: () => adminFetch<AdminUser>('/me'),
  stats: () => adminFetch<Record<string, number>>('/stats'),

  // Blogs
  getBlogs: () => adminFetch<BlogRow[]>('/blogs'),
  createBlog: (data: BlogForm) => adminFetch('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: number, data: BlogForm) => adminFetch(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: number) => adminFetch(`/blogs/${id}`, { method: 'DELETE' }),

  // Case Studies
  getCaseStudies: () => adminFetch<CaseStudyRow[]>('/case-studies'),
  createCaseStudy: (data: CaseStudyForm) => adminFetch('/case-studies', { method: 'POST', body: JSON.stringify(data) }),
  updateCaseStudy: (id: number, data: CaseStudyForm) => adminFetch(`/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCaseStudy: (id: number) => adminFetch(`/case-studies/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => adminFetch<ServiceRow[]>('/services'),
  createService: (data: ServiceForm) => adminFetch('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: number, data: ServiceForm) => adminFetch(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: number) => adminFetch(`/services/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => adminFetch<TestimonialRow[]>('/testimonials'),
  createTestimonial: (data: TestimonialForm) => adminFetch('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: number, data: TestimonialForm) => adminFetch(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: number) => adminFetch(`/testimonials/${id}`, { method: 'DELETE' }),

  // Portfolio
  getPortfolio: () => adminFetch<PortfolioRow[]>('/portfolio'),
  createPortfolio: (data: PortfolioForm) => adminFetch('/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  updatePortfolio: (id: number, data: PortfolioForm) => adminFetch(`/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePortfolio: (id: number) => adminFetch(`/portfolio/${id}`, { method: 'DELETE' }),

  // FAQs
  getFaqs: () => adminFetch<FaqRow[]>('/faqs'),
  createFaq: (data: FaqForm) => adminFetch('/faqs', { method: 'POST', body: JSON.stringify(data) }),
  updateFaq: (id: number, data: FaqForm) => adminFetch(`/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFaq: (id: number) => adminFetch(`/faqs/${id}`, { method: 'DELETE' }),

  // Leads
  getLeads: () => adminFetch<LeadRow[]>('/leads'),
  deleteLead: (id: number) => adminFetch(`/leads/${id}`, { method: 'DELETE' }),

  // Products
  getProducts: () => adminFetch<ProductRow[]>('/products'),
  createProduct: (data: ProductForm) => adminFetch('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: number, data: ProductForm) => adminFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: number) => adminFetch(`/products/${id}`, { method: 'DELETE' }),

  // Tools
  getTools: () => adminFetch<ToolRow[]>('/tools'),
  createTool: (data: ToolForm) => adminFetch('/tools', { method: 'POST', body: JSON.stringify(data) }),
  updateTool: (id: number, data: ToolForm) => adminFetch(`/tools/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTool: (id: number) => adminFetch(`/tools/${id}`, { method: 'DELETE' }),

  // Guidebooks
  getGuidebooks: () => adminFetch<GuidebookRow[]>('/guidebooks'),
  createGuidebook: (data: GuidebookForm) => adminFetch('/guidebooks', { method: 'POST', body: JSON.stringify(data) }),
  updateGuidebook: (id: number, data: GuidebookForm) => adminFetch(`/guidebooks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGuidebook: (id: number) => adminFetch(`/guidebooks/${id}`, { method: 'DELETE' }),
};

export interface BlogRow {
  id: number; title: string; slug: string; excerpt: string; content: string;
  author: string; image_url: string; published_at: string; sort_order: number;
}
export type BlogForm = Omit<BlogRow, 'id'>;

export interface CaseStudyRow {
  id: number; title: string; client: string; challenge: string; solution: string;
  full_content: string; image_url: string; slug: string; sort_order: number;
  metric1_label: string; metric1_value: string; metric2_label: string; metric2_value: string;
  metric3_label: string; metric3_value: string;
}
export type CaseStudyForm = Omit<CaseStudyRow, 'id'>;

export interface ServiceRow {
  id: number; title: string; slug: string; subtitle: string; description: string;
  hero_title: string; hero_description: string; full_content: string;
  features: string[]; icon: string; image_url: string; sort_order: number;
}
export type ServiceForm = Omit<ServiceRow, 'id'>;

export interface TestimonialRow {
  id: number; name: string; company: string; country: string; quote: string; metric_label: string; sort_order: number;
}
export type TestimonialForm = Omit<TestimonialRow, 'id'>;

export interface PortfolioRow {
  id: number; title: string; category: string; image_url: string; sort_order: number;
}
export type PortfolioForm = Omit<PortfolioRow, 'id'>;

export interface FaqRow {
  id: number; question: string; answer: string; page_slug: string; sort_order: number;
}
export type FaqForm = Omit<FaqRow, 'id'>;

export interface LeadRow {
  id: number; name: string; phone: string; email: string; budget: string;
  project_details: string; created_at: string;
}

export interface ProductRow {
  id: number; title: string; slug: string; subtitle: string; description: string;
  full_content: string; features: string[]; price: string; rating: string;
  rating_count: string; image_url: string; buy_url: string; sort_order: number;
}
export type ProductForm = Omit<ProductRow, 'id'>;

export interface ToolRow {
  id: number; title: string; slug: string; description: string; full_content: string;
  icon: string; is_new: boolean | number; sort_order: number;
}
export type ToolForm = Omit<ToolRow, 'id'>;

export interface GuidebookRow {
  id: number; title: string; slug: string; description: string; content: string;
  download_url: string; image_url: string; sort_order: number;
}
export type GuidebookForm = Omit<GuidebookRow, 'id'>;
