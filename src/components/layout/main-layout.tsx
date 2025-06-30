"use client";

import Navbar from './navbar';
import Footer from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
  showHomeLink?: boolean;
  hideFooter?: boolean;
}

export default function MainLayout({
  children,
  showHomeLink = false,
  hideFooter = false
}: MainLayoutProps) {
  return (
    <main className="font-sans py-8">
      <Navbar showHomeLink={showHomeLink} />
      {children}
      {!hideFooter && <Footer />}
    </main>
  );
}
