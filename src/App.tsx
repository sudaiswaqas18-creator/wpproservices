import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import { ToolsListPage, default as ToolDetailPage } from './pages/ToolsPages';
import { GuidebooksListPage, default as GuidebookDetailPage } from './pages/GuidebooksPages';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCaseStudies from './pages/admin/AdminCaseStudies';
import AdminServices from './pages/admin/AdminServices';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminFaqs from './pages/admin/AdminFaqs';
import AdminLeads from './pages/admin/AdminLeads';
import AdminProducts from './pages/admin/AdminProducts';
import AdminTools from './pages/admin/AdminTools';
import AdminGuidebooks from './pages/admin/AdminGuidebooks';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="resources" element={<ResourcesPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="case-studies" element={<AdminCaseStudies />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="products" element={<AdminProducts />} />
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
