import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/site';

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
};

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:scale-105 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
