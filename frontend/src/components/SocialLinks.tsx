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
  variant?: 'light' | 'dark';
}

export default function SocialLinks({ className = '', variant = 'light' }: SocialLinksProps) {
  const isDark = variant === 'dark';

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
            className={
              isDark
                ? 'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition hover:scale-105 hover:border-secondary hover:bg-secondary/20 hover:text-secondary'
                : 'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-light transition hover:scale-105 hover:border-accent/30 hover:bg-accent-soft hover:text-accent'
            }
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
