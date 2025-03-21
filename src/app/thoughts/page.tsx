"use client";

import MainLayout from '@/components/layout/main-layout';
import ThoughtCard from '@/components/ui/thought-card';

const thoughts = [
  {
    slug: "swift-challenge",
    title: "first and final submission",
    description: "The story of my Swift Student Challenge.",
    date: "Feb 14, 2025",
    image: "/images/swift_challenge.png"
  },
];

export default function Thoughts() {
  return (
    <MainLayout showHomeLink>
      <h1 className="font-serif text-[2.5rem] tracking-tight text-primary">Thoughts</h1>
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
