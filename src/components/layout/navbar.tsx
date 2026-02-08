"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  showHomeLink?: boolean;
}

const navLinks = [
  { href: '/projects', label: 'projects' },
  { href: '/thoughts', label: 'thoughts' },
  { href: '/bucket-list', label: 'bucket list' },
  { href: '/my-corner', label: 'my corner' },
  { href: '/ai', label: 'prarthan://ai' },
] as const;

export default function Navbar({ showHomeLink = false }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between pb-4 tracking-tight">
      {showHomeLink && pathname !== '/' && (
        <div>
          <Link
            href="/"
            className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline flex items-center gap-1"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>home</span>
          </Link>
        </div>
      )}
      <div className={`flex items-center gap-4 ${!showHomeLink ? "ml-auto" : ""}`}>
        {navLinks.map(({ href, label }) =>
          pathname !== href ? (
            <Link
              key={href}
              href={href}
              className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              {label}
            </Link>
          ) : null
        )}
      </div>
    </nav>
  );
}
