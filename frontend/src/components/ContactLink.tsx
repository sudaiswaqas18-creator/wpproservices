import { useNavigate, useLocation } from 'react-router-dom';

interface ContactLinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Always go to /contact unless already there (then scroll to the form).
 * Do not scroll to other pages' #contact anchors (e.g. homepage CTA).
 */
export default function ContactLink({ children, className, onClick }: ContactLinkProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    e.preventDefault();

    if (pathname === '/contact') {
      const target = document.getElementById('contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    navigate('/contact');
  };

  return (
    <a href="/contact" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
