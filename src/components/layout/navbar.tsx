import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  showHomeLink?: boolean;
}

export default function Navbar({ showHomeLink = false }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between pb-4 tracking-tight">
      {showHomeLink && (
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
        <Link
          href="/thoughts"
          className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
        >
          thoughts
        </Link>
        {/*<Link
          href="/colophon"
          className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
        >
          colophon
        </Link>*/}
        <Link
          href="/ai"
          className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
        >
          prarthan://ai
        </Link>
      </div>
    </nav>
  );
}
