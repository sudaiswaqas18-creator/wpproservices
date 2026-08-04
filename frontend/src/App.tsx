import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const QuotesPage = lazy(() => import('./pages/QuotesPage'));
const ToolsListPage = lazy(() => import('./pages/ToolsPages').then((m) => ({ default: m.ToolsListPage })));
const ToolDetailPage = lazy(() => import('./pages/ToolsPages'));
const GuidebooksListPage = lazy(() => import('./pages/GuidebooksPages').then((m) => ({ default: m.GuidebooksListPage })));
const GuidebookDetailPage = lazy(() => import('./pages/GuidebooksPages'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));
const AdminCaseStudies = lazy(() => import('./pages/admin/AdminCaseStudies'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio'));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));
const AdminTools = lazy(() => import('./pages/admin/AdminTools'));
const AdminGuidebooks = lazy(() => import('./pages/admin/AdminGuidebooks'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="quotes" element={<QuotesPage />} />
        <Route path="resources/tools" element={<ToolsListPage />} />
        <Route path="resources/tools/:slug" element={<ToolDetailPage />} />
        <Route path="resources/guidebooks" element={<GuidebooksListPage />} />
        <Route path="resources/guidebooks/:slug" element={<GuidebookDetailPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-of-service" element={<TermsOfServicePage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="case-studies" element={<AdminCaseStudies />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="tools" element={<AdminTools />} />
        <Route path="guidebooks" element={<AdminGuidebooks />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="faqs" element={<AdminFaqs />} />
        <Route path="leads" element={<AdminLeads />} />
      </Route>
    </Routes>
  );
}
