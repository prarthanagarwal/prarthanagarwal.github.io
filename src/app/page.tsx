"use client";

import Footer from '@/components/layout/footer';
import ProjectCard from '@/components/ui/project-card';
import OptimizedImage from '@/components/ui/optimized-image';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@phosphor-icons/react';

const projects = [
  {
    id: 1,
    title: "craftads-ai",
    description: "an AI-powered tool to create ads that convert-fast, simple, and stress-free.",
    link: "https://craftads.live/"
  },
  {
    id: 2,
    title: "CryBaby",
    description: "a mobile app to track & enjoy your emotional moments :)",
    link: "https://crybaby.app/"
  },
];

const TooltipIcon = ({ icon: Icon, tooltip, color, weight, size }: { 
  icon: Icon, 
  tooltip: string, 
  color: string, 
  weight: "fill" | "duotone", 
  size: number 
}) => (
  <div className="group relative inline-block -ml-1.5 first:ml-1">
    <Icon 
      size={size}
      className="inline-block opacity-80" 
      weight={weight}
      color={color}
    />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
      {tooltip}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="font-sans pt-8">
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16 mx-auto">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2">
      <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">
        Prarthan Agarwal
      </h1>
          {/*<div className="flex items-center gap-1.5 font-medium tracking-tight">
          {" • "}<h2 className="text-base text-title">designer</h2>
          {" • "}<h2 className="text-base text-title">developer</h2>
          </div>*/}
          <p className="pt-4 text-md">
            Hi there, I'm Prarthan. Welcome to my {" "} 
            <span className="text-black">digital hangout</span>. 
            This is where I let the world know a bit about me and what keeps me wired and wide awake.{" "}
            When I'm not coding, I'm diving into research, cinema and new ideas.
          </p>

          {/* Summary Section */}
          <section className="pt-6">
            <h2 className="font-medium tracking-tight text-title">Summary</h2>
            <ul className="pt-2 text-base list-disc pl-5 space-y-2">
              <li>21 years old, from Surat.</li>
              <li>I like to build apps, games and media.</li>
              <li>Worked with clients across 18+ domains.
                <div className="group relative inline-block -ml-1.5 first:ml-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-hoverColor">
                    <Image
                      src="/icons/palette-duotone.svg"
                      alt="Graphic Design"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Graphic Design
                  </div>
                </div>
                <div className="group relative inline-block -ml-1.5 first:ml-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-hoverColor">
                    <Image
                      src="/icons/film-slate-duotone.svg"
                      alt="Promo Videos"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Promo Videos
                  </div>
                </div>
                <div className="group relative inline-block -ml-1.5 first:ml-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-hoverColor">
                    <Image
                      src="/icons/package-duotone.svg"
                      alt="Package Design"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Package Design
                  </div>
                </div>
                <div className="group relative inline-block -ml-1.5 first:ml-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-hoverColor">
                    <Image
                      src="/icons/hoodie-duotone.svg"
                      alt="Merch Design"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Merch Design
                  </div>
                </div>
                <div className="group relative inline-block -ml-1.5 first:ml-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-hoverColor">
                    <Image
                      src="/icons/browsers-duotone.svg"
                      alt="Web Design"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Web Design
                  </div>
                </div>
              </li>
              <li>Currently selling time as a developer and building my own AI assistant, inspired by Tony Stark.</li>
              <li>Cinema shapes me, I would like to give back.</li>
            </ul>
          </section>

      <section className="pt-8">
        <h2 className="font-medium tracking-tight text-title">Actively Building:</h2>
        <div className="pt-1.5">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="group">
          <p className="mt-4 w-fit rounded-md border border-body/20 bg-hoverColor/60 px-2 py-1 text-xs text-body transition-all duration-300 ease-in-out">
            Feel free to explore my{" "}
            <a
              href="https://github.com/prarthanagarwal?tab=repositories"
              rel="noopenner noreferrer"
              target="_blank"
              className="font-medium text-body underline underline-offset-2 transition-all duration-150 ease-in-out md:hover:text-primary md:group-hover:text-primary"
            >
              GitHub
            </a>{" "}
            for more projects. Most of them are open-source.
          </p>
        </div>
      </section>
        </div>

        {/* Right Column - Image and Links */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex flex-col items-center md:pt-[2rem]">
        
          {/* Navigation Links */}
          <div className="flex items-center gap-4 mb-4 tracking-tight w-full max-w-[22rem] justify-end">
            <Link
              href="/projects"
              className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              projects
            </Link>
            <Link
              href="/thoughts"
              className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              thoughts
            </Link>
            <Link
              href="/ai"
              className="text-lg hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              prarthan://ai
            </Link>
          </div>
          
          {/* Profile Image with rounded edges and blur-to-load effect */}
          <div className="overflow-hidden rounded-2xl shadow-md w-full max-w-sm">
            <OptimizedImage
              src="/profile_2.jpg"
              alt="Prarthan Agarwal"
              width={400}
              height={500}
              className="object-cover w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Social Links below image */}
          <div className="w-full grid grid-cols-3 gap-4 pt-6 tracking-tight md:flex md:flex-row md:justify-center md:items-start md:gap-6">
            <Link
              href="/resume"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/icons_extra/document.svg" 
                alt="Resume" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">resume</span>
            </Link>
            <a
              href="https://www.linkedin.com/in/prarthanagarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/icons_extra/linkedin.svg" 
                alt="LinkedIn" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">linkedin</span>
            </a>
            <a
              href="https://x.com/prarthanagarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/icons_extra/twitter_bird.svg" 
                alt="Twitter" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">twitter</span>
            </a>
            <a
              href="https://github.com/PrarthanAgarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/icons_extra/github.svg" 
                alt="GitHub" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">github</span>
            </a>
            <a
              href="mailto:workforprarthan@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
        <Image
                src="/icons_extra/email.svg" 
                alt="Email" 
                width={16} 
                height={16} 
          className="opacity-80"
        />
              <span className="text-sm">email</span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full pr-[5%] pl-0">
        <Footer />
      </div>
    </main>
  );
}
