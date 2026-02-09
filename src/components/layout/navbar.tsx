"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  showHomeLink?: boolean;
}

const navLinks = [
  { href: '/projects', label: 'projects' },
  { href: '/thoughts', label: 'vichaar' },
  { href: '/bucket-list', label: 'bucket list' },
  { href: '/my-corner', label: 'my corner' },
  { href: '/ai', label: 'prarthan://ai' },
] as const;

export default function Navbar({ showHomeLink = false }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-4 tracking-tight">
      {showHomeLink && pathname !== '/' && (
        <div>
          <Link
            href="/"
            className="text-sm sm:text-base md:text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline flex items-center gap-1"
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
      <div
        className={`flex flex-wrap items-center gap-2 sm:gap-3 ${
          !showHomeLink ? "sm:ml-auto" : "sm:ml-0 sm:justify-end"
        } ${showHomeLink ? "mt-1 sm:mt-0" : ""}`}
      >
        {navLinks.map(({ href, label }) =>
          pathname !== href ? (
            <Link
              key={href}
              href={href}
              className="text-sm sm:text-base md:text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline relative pl-2 before:content-['·'] first:before:content-none before:mr-1 sm:before:hidden"
            >
              {label}
            </Link>
          ) : null
        )}
      </div>
    </nav>
  );
}
