import MainLayout from '@/components/layout/main-layout';
import Link from 'next/link';
import { getThoughtBySlug, getAllThoughts } from '@/lib/thoughts-data';

// Generate static paths for all thoughts
export async function generateStaticParams() {
  const thoughts = getAllThoughts();
  
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

interface ThoughtPageProps {
  params: {
    slug: string;
  };
}

export default function ThoughtPage({ params }: ThoughtPageProps) {
  const { slug } = params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    return (
      <MainLayout showHomeLink>
        <div className="flex flex-col items-start">
          <Link 
            href="/thoughts" 
            className="flex items-center text-sm text-body hover:text-primary transition-colors duration-200 mb-8"
          >
            ← Writing
          </Link>
          <h1 className="font-serif text-[2.5rem] tracking-tight text-primary">
            Thought not found
          </h1>
          <p className="text-base text-body mt-4">
            The thought you're looking for doesn't exist.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showHomeLink hideFooter>
      <article className="max-w-2xl mx-auto">
        {/* Date */}
        <div className="mb-4">
          <span className="text-sm text-body">
            {thought.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[2.5rem] leading-tight tracking-tight text-primary mb-8">
          {thought.title}
        </h1>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-base leading-relaxed text-body whitespace-pre-line">
            {thought.content}
          </div>
        </div>
      </article>
    </MainLayout>
  );
} 