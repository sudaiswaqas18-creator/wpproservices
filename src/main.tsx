import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import AnimatedScrollbar from './components/AnimatedScrollbar';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedScrollbar />
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
              <App />
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
