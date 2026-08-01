import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SkipToContent from '../SkipToContent';
import RouteSEO from '../seo/RouteSEO';
import PageProgressBar from '../PageProgressBar';
import CookieConsent from '../CookieConsent';
import BackToTop from '../BackToTop';
import NewsletterSignup from '../NewsletterSignup';
import { BreadcrumbProvider } from '../SiteBreadcrumbs';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <PageProgressBar />
      <RouteSEO />
      <Header />
      <BreadcrumbProvider>
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Outlet />
        </main>
      </BreadcrumbProvider>
      <NewsletterSignup />
      <Footer />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}
