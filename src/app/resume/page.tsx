"use client";

import MainLayout from '@/components/layout/main-layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Resume() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // PDF path
  const resumePdfPath = "/Resume.pdf";
  
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate appropriate width for the PDF viewer
  const getViewerWidth = () => {
    if (windowWidth > 1024) return 800;  // Large screens
    if (windowWidth > 768) return 700;   // Medium screens
    if (windowWidth > 640) return 500;   // Small screens
    return windowWidth - 40;             // Mobile with padding
  };
  
  return (
    <MainLayout showHomeLink>
      <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">Resume</h1>
      
      <div className="mt-4 mb-6">
        <p className="text-sm font-normal text-body mb-6">
        here's a brief overview of my professional experience. 
        </p>
      </div>

      {/* PDF Viewer */}
      {mounted && (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white my-4">
          <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
            <div className="flex items-center space-x-2">
              <button className="hover:bg-gray-700 p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="hover:bg-gray-700 p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="text-xs">1 of 1</div>
            <div className="flex items-center space-x-2">
              <button className="hover:bg-gray-700 p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="hover:bg-gray-700 p-1 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <iframe
            src={`${resumePdfPath}#toolbar=0`}
            width={getViewerWidth()}
            height="800"
            className="mx-auto"
            title="Resume PDF"
            style={{ border: "none" }}
          />
        </div>
      )}
      
      <div className="mt-4 mb-6">
        <p className="text-sm font-normal text-body mb-6">
        If you prefer a more traditional format, you can download the pdf version of my resume by clicking the button below. 
        </p>
      </div>
      
      <div className="mt-6 flex">
        <a
          href={resumePdfPath}
          download="Resume.pdf"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 3V16M12 16L7 11M12 16L17 11M3 20H21" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Download PDF
        </a>
      </div>
    </MainLayout>
  );
}
