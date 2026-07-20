import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="section-container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-brand-600">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  );
}
