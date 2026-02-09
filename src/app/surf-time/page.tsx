"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function SurfTimePage() {
  return (
    <main className="font-sans pt-8 max-w-4xl mx-auto px-4">
      <Navbar showHomeLink={true} />
      
      <div className="mt-12 mb-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/logo/surf-time.webp"
            alt="Surf Time Logo"
            width={120}
            height={120}
            className="mb-6"
            loading="lazy"
            decoding="async"
            sizes="120px"
          />
          <h1 className="text-4xl font-serif tracking-tight text-primary mb-4">Surf Time</h1>
          <p className="text-xl text-body text-center max-w-2xl">
            Your Digital Time Tracker - A beautiful way to understand your browsing habits
          </p>
        </div>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-primary mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-hoverColor/10 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Real-Time Wave Tracking</h3>
              <ul className="list-disc list-inside text-body space-y-2">
                <li>Interactive, visually rich charts of daily browsing patterns</li>
                <li>Weekly summaries to understand your digital flow</li>
                <li>Per-site tracking mapped like waves on a beach</li>
              </ul>
            </div>
            <div className="p-6 bg-hoverColor/10 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Smart Insights</h3>
              <ul className="list-disc list-inside text-body space-y-2">
                <li>AI-powered analysis of browsing behavior</li>
                <li>Lighthearted, metaphorical feedback</li>
                <li>Weekly "surf reports" for digital wellness</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Privacy First */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-primary mb-2">Privacy First</h2>
          <div className="bg-hoverColor/10 p-6 rounded-lg">
            <ul className="list-disc list-inside text-body space-y-2">
              <li>All data is stored locally—nothing leaves your device</li>
              <li>No trackers, no data harvesting</li>
              <li>You're the only one who sees your waves</li>
            </ul>
            <Link 
              href="/surf-time-privacy-policy.md"
              className="inline-block mt-6 text-primary hover:underline"
            >
              Read our Privacy Policy →
            </Link>
          </div>
        </section>

        {/* Download Section */}
        <section className="text-center">
          <h2 className="text-2xl font-serif text-primary mb-6">Get Started</h2>
          <div className="space-y-4">
            <a
              href="https://github.com/PrarthanAgarwal/surf-time"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mr-4"
            >
              View on GitHub
            </a>
            <a
              href="#" // TODO: Add Chrome Web Store link when available
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-hoverColor/20 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Get it on Chrome Web Store
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
} 