import { API_BASE } from '../config/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json();
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  country: string;
  quote: string;
  metric_label: string | null;
}

export interface CaseStudy {
  id: number;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  full_content?: string;
  image_url?: string;
  metric1_label: string;
  metric1_value: string;
  metric2_label: string;
  metric2_value: string;
  metric3_label: string;
  metric3_value: string;
  slug: string;
}

export type CaseStudyDetail = CaseStudy;

export interface Service {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  hero_title?: string;
  hero_description?: string;
  full_content?: string;
  features?: string[];
  icon: string;
  image_url?: string;
}

export type ServiceDetail = Service;

export interface PricingPlan {
  id: number;
  name: string;
  tagline: string;
  price: string;
  original_price: string;
  discount_label: string;
  is_best_seller: boolean;
  features: string[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  published_at: string;
  author?: string;
}

export interface BlogPostDetail extends BlogPost {
  content: string;
  author: string;
}

export interface Industry {
  id: number;
  title: string;
  description: string;
  has_case_study: boolean;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

export interface ContactPayload {
  name: string;
  phone?: string;
  email: string;
  budget: string;
  project_details: string;
  privacy_accepted: boolean;
}

export const api = {
  getTestimonials: () => fetchApi<Testimonial[]>('/testimonials'),
  getCaseStudies: () => fetchApi<CaseStudy[]>('/case-studies'),
  getCaseStudy: (slug: string) => fetchApi<CaseStudyDetail>(`/case-studies/${slug}`),
  getServices: () => fetchApi<Service[]>('/services'),
  getService: (slug: string) => fetchApi<ServiceDetail>(`/services/${slug}`),
  getPricing: () => fetchApi<PricingPlan[]>('/pricing'),
  getFaqs: (page = 'home') => fetchApi<FAQ[]>(`/faqs?page=${page}`),
  getBlog: () => fetchApi<BlogPost[]>('/blog'),
  getBlogPost: (slug: string) => fetchApi<BlogPostDetail>(`/blog/${slug}`),
  getIndustries: () => fetchApi<Industry[]>('/industries'),
  getPortfolio: () => fetchApi<PortfolioItem[]>('/portfolio'),
  submitContact: async (data: ContactPayload) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Submission failed');
    return json;
  },
};
