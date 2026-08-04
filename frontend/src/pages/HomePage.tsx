import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import {
  PhilosophySection,
  ServiceCategoriesHome,
  AwardsSection,
  FeaturedCases,
  StatsBar,
} from '../components/HomeSections';
import HomeStructuredData from '../components/seo/HomeStructuredData';

const WPEstimatorSection = lazy(() => import('../components/WPEstimatorSection'));
const DeliverySystemsSection = lazy(() => import('../components/DeliverySystemsSection'));
const WordPressFitSection = lazy(() => import('../components/WordPressFitSection'));
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const Blog = lazy(() => import('../components/Blog'));
const CTA = lazy(() => import('../components/CTA'));

function BelowFoldFallback() {
  return <div className="min-h-[80px]" aria-hidden="true" />;
}

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
      <Suspense fallback={<BelowFoldFallback />}>
        <WPEstimatorSection />
        <DeliverySystemsSection />
        <WordPressFitSection />
        <StatsBar />
        <ToolsSection />
        <Blog limit={4} featuredOnly />
        <CTA />
      </Suspense>
    </>
  );
}
