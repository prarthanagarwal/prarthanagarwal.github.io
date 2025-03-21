"use client";

import Link from 'next/link';
import Image from 'next/image';

interface ThoughtCardProps {
  thought: {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
  };
}

export default function ThoughtCard({ thought }: ThoughtCardProps) {
  return (
    <Link
      href={`/thoughts/${thought.slug}`}
      className="group -mx-3 mt-2 flex w-full gap-2.5 overflow-hidden rounded-xl px-3 py-3 transition-all duration-300 ease-in-out md:items-start md:hover:scale-105 md:hover:bg-hoverColor"
    >
      {thought.image && (
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={thought.image}
            alt={thought.title}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <h2 className="flex items-center justify-between font-medium tracking-tight text-title group-hover:text-primary">
            <span>{thought.title}</span>
            <Image
              src="https://ext.same-assets.com/937924524/504589632.svg"
              alt=""
              width={16}
              height={16}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 ml-1"
            />
          </h2>
          <p className="text-sm font-normal text-body">
            {thought.date}
          </p>
        </div>
        <p className="pt-0.5 text-sm font-normal text-body max-w-[90%] truncate">
          {thought.description}
        </p>
      </div>
    </Link>
  );
}
