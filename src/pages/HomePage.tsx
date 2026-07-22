import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import { PhilosophySection, ServiceCategoriesHome, AwardsSection, FeaturedCases, StatsBar } from '../components/HomeSections';
import ProductsSection from '../components/ProductsSection';
import Testimonials from '../components/Testimonials';
import ToolsSection from '../components/ToolsSection';
import Blog from '../components/Blog';
import CTA from '../components/CTA';
import HomeStructuredData from '../components/seo/HomeStructuredData';

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <Hero />
      <TrustBadges />
      <PhilosophySection />
      <ServiceCategoriesHome />
      <AwardsSection />
      <FeaturedCases />
      <ProductsSection />
      <Testimonials />
      <StatsBar />
      <ToolsSection />
      <Blog limit={5} />
      <CTA />
    </>
  );
}
