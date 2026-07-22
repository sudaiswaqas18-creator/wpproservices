import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import SkipToContent from '../SkipToContent';
import RouteSEO from '../seo/RouteSEO';
import PageProgressBar from '../PageProgressBar';
import CookieConsent from '../CookieConsent';
import BackToTop from '../BackToTop';
import NewsletterSignup from '../NewsletterSignup';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <PageProgressBar />
      <RouteSEO />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <NewsletterSignup />
      <Footer />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}
