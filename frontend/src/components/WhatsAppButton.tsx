import { MessageCircle } from 'lucide-react';
import { SITE } from '../config/site';

export default function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi WPServices, I would like to discuss a WordPress project.')}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl max-sm:bottom-36"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us"
    >
      <MessageCircle size={22} />
    </a>
  );
}
