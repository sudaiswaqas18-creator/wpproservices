import { useNavigate, useLocation } from 'react-router-dom';

interface ContactLinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ContactLink({ children, className, onClick }: ContactLinkProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    const target = document.getElementById('contact');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (pathname !== '/contact') {
      e.preventDefault();
      navigate('/contact');
    }
  };

  return (
    <a href="/contact" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
