"use client";

import MainLayout from '@/components/layout/main-layout';
import ThoughtCard from '@/components/ui/thought-card';
import { useEffect } from 'react';
import { getAllThoughts } from '@/lib/thoughts-data';

export default function Vichaar() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const thoughts = getAllThoughts();

  return (
    <MainLayout showHomeLink hideFooter>
      <h1 className="font-serif text-[2.5rem] tracking-tight text-primary">vichaar</h1>
      <h2 className="text-base font-medium tracking-tight text-title">
        some thoughts on design, code, and life.
      </h2>

      <section className="pt-4">
        <div className="flex flex-col">
          {thoughts.map((thought) => (
            <ThoughtCard key={thought.slug} thought={thought} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
